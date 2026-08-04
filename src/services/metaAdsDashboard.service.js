import { getMetaAdsCampaigns } from "./metaAds.service.js";
import { getMetaAdSets } from "./metaAdSets.service.js";
import { getMetaAdsItems } from "./metaAdsItems.service.js";
import { getMetaCreatives } from "./metaCreatives.service.js";

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

  return {
    period: {
      since,
      until
    },

    summary: {
      totalCampaigns:
        campaigns.length,

      totalAdSets:
        adSetsData.summary?.totalAdSets || 0,

      totalAds:
        adsData.summary?.totalAds || 0,

      totalCreatives:
        creativesData.summary
          ?.totalCreatives || 0,

      campaignsWithCover:
        campaigns.filter(
          (campaign) =>
            Boolean(campaign.cover?.url)
        ).length
    },

    campaigns
  };
}
