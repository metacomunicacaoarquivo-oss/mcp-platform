import { getMetaAdsCampaigns } from "./metaAds.service.js";
import { getMetaAdSets } from "./metaAdSets.service.js";
import { getMetaAdsItems } from "./metaAdsItems.service.js";
import { getMetaCreatives } from "./metaCreatives.service.js";
import { generateMetaAdsRanking } from "./metaRanking.service.js";

export async function getMetaAdsDashboard(
  accessToken,
  {
    since,
    until
  }
) {
  if (!since || !until) {
    const error = new Error(
      "As datas de início e fim do período são obrigatórias."
    );

    error.status = 400;
    throw error;
  }

  const [
    campaignsData,
    adSetsData,
    adsData,
    creativesData
  ] = await Promise.all([
    getMetaAdsCampaigns(accessToken, {
      since,
      until
    }),

    getMetaAdSets(accessToken, {
      since,
      until
    }),

    getMetaAdsItems(accessToken, {
      since,
      until
    }),

    getMetaCreatives(accessToken)
  ]);

  const creativeByAdId = new Map();

  for (const creative of creativesData.creatives || []) {
    for (const linkedAd of creative.ads || []) {
      creativeByAdId.set(linkedAd.id, {
        id: creative.id,
        name: creative.name,
        thumbnailUrl: creative.thumbnailUrl,
        imageUrl: creative.imageUrl,
        effectiveObjectStoryId:
          creative.effectiveObjectStoryId,
        objectStorySpec:
          creative.objectStorySpec,
        assetFeedSpec:
          creative.assetFeedSpec
      });
    }
  }

  const adsByAdSetId = new Map();

  for (const ad of adsData.ads || []) {
    const creative =
      creativeByAdId.get(ad.id) || null;

    const normalizedAd = {
      ...ad,

      creative,

      coverUrl:
        creative?.thumbnailUrl ||
        creative?.imageUrl ||
        null
    };

    if (!adsByAdSetId.has(ad.adset_id)) {
      adsByAdSetId.set(ad.adset_id, []);
    }

    adsByAdSetId
      .get(ad.adset_id)
      .push(normalizedAd);
  }

  const adSetsByCampaignId = new Map();

  for (const adSet of adSetsData.adSets || []) {
    const ads =
      adsByAdSetId.get(adSet.id) || [];

    const normalizedAdSet = {
      ...adSet,

      summary: {
        totalAds: ads.length,

        deliveredAds: ads.filter(
          (ad) => ad.delivery?.deliveredInPeriod
        ).length,

        adsWithCover: ads.filter(
          (ad) => Boolean(ad.coverUrl)
        ).length
      },

      ads
    };

    if (!adSetsByCampaignId.has(adSet.campaign_id)) {
      adSetsByCampaignId.set(
        adSet.campaign_id,
        []
      );
    }

    adSetsByCampaignId
      .get(adSet.campaign_id)
      .push(normalizedAdSet);
  }

  const campaigns = (
    campaignsData.campaigns || []
  ).map((campaign) => {
    const adSets =
      adSetsByCampaignId.get(campaign.id) || [];

    const allAds = adSets.flatMap(
      (adSet) => adSet.ads || []
    );

    const adsWithCover = allAds.filter(
      (ad) => Boolean(ad.coverUrl)
    );

    const mainAd =
      adsWithCover
        .slice()
        .sort(
          (a, b) =>
            Number(b.delivery?.reach || 0) -
            Number(a.delivery?.reach || 0)
        )[0] || null;

    return {
      ...campaign,

      cover: mainAd
        ? {
            adId: mainAd.id,
            adName: mainAd.name,
            url: mainAd.coverUrl,
            selectionRule:
              "Anúncio com maior alcance no período"
          }
        : null,

      summary: {
        totalAdSets: adSets.length,
        totalAds: allAds.length,

        deliveredAds: allAds.filter(
          (ad) =>
            ad.delivery?.deliveredInPeriod
        ).length,

        adsWithCover:
          adsWithCover.length
      },

      adSets
    };
  });

  const rankingResult =
    generateMetaAdsRanking(campaigns);

  const campaignsWithRanking =
    rankingResult.campaigns;

  const totalSpend =
    campaignsWithRanking.reduce(
      (total, campaign) =>
        total +
        Number(campaign.performance?.spend || 0),
      0
    );

  const totalReach =
    campaignsWithRanking.reduce(
      (total, campaign) =>
        total +
        Number(campaign.performance?.reach || 0),
      0
    );

  const totalViews =
    campaignsWithRanking.reduce(
      (total, campaign) =>
        total +
        Number(campaign.performance?.views || 0),
      0
    );

  const totalClicks =
    campaignsWithRanking.reduce(
      (total, campaign) =>
        total +
        Number(campaign.performance?.clicks || 0),
      0
    );

  return {
    period: {
      since,
      until
    },

    summary: {
      totalCampaigns:
        campaignsWithRanking.length,

      totalAdSets:
        adSetsData.summary?.totalAdSets || 0,

      totalAds:
        adsData.summary?.totalAds || 0,

      totalCreatives:
        creativesData.summary?.totalCreatives || 0,

      campaignsWithCover:
        campaignsWithRanking.filter(
          (campaign) =>
            Boolean(campaign.cover?.url)
        ).length,

      totalSpend:
        Number(totalSpend.toFixed(2)),

      totalReach:
        Math.round(totalReach),

      totalViews:
        Math.round(totalViews),

      totalClicks:
        Math.round(totalClicks)
    },

    ranking:
      rankingResult.ranking,

    campaigns:
      campaignsWithRanking
  };
}
