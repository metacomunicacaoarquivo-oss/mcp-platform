import { getMetaAdsCampaigns } from "./metaAds.service.js";
import { getMetaAdSets } from "./metaAdSets.service.js";
import { getMetaAdsItems } from "./metaAdsItems.service.js";
import { getMetaCreatives } from "./metaCreatives.service.js";
import { generateMetaAdsRanking } from "./metaRanking.service.js";

import {
  getIbgeMunicipalPopulations,
  calculatePopulationCoverage
} from "./ibge.service.js";

function toNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function roundMoney(value) {
  return Number(toNumber(value).toFixed(2));
}

function roundMetric(value, decimals = 4) {
  return Number(toNumber(value).toFixed(decimals));
}

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMunicipalityName(value = "") {
  return normalizeText(value)
    .replace(/\bmunicipio de\b/g, "")
    .replace(/\bmunicipio do\b/g, "")
    .replace(/\bmunicipio da\b/g, "")
    .replace(/\bto\b$/g, "")
    .replace(/\btocantins\b$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateCampaignPerformance(adSets = []) {
  const ads = adSets.flatMap(
    (adSet) => adSet.ads || []
  );

  const deliveredAds = ads.filter(
    (ad) => ad.delivery?.deliveredInPeriod
  );

  const totals = deliveredAds.reduce(
    (result, ad) => {
      const delivery = ad.delivery || {};

      result.spend += toNumber(delivery.spend);
      result.reach += toNumber(delivery.reach);

      result.impressions += toNumber(
        delivery.impressions
      );

      result.clicks += toNumber(
        delivery.clicks
      );

      result.engagement += toNumber(
        delivery.engagement
      );

      result.videoPlays += toNumber(
        delivery.videoPlays
      );

      result.videoViews3s += toNumber(
        delivery.videoViews3s
      );

      result.videoViews15s += toNumber(
        delivery.videoViews15s
      );

      result.videoViews95 += toNumber(
        delivery.videoViews95
      );

      result.videoViews100 += toNumber(
        delivery.videoViews100
      );

      result.thruplay += toNumber(
        delivery.thruplay
      );

      return result;
    },
    {
      spend: 0,
      reach: 0,
      impressions: 0,
      clicks: 0,
      engagement: 0,
      videoPlays: 0,
      videoViews3s: 0,
      videoViews15s: 0,
      videoViews95: 0,
      videoViews100: 0,
      thruplay: 0
    }
  );

  const ctr =
    totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0;

  const cpc =
    totals.clicks > 0
      ? totals.spend / totals.clicks
      : 0;

  const cpm =
    totals.impressions > 0
      ? (totals.spend / totals.impressions) * 1000
      : 0;

  const costPerEngagement =
    totals.engagement > 0
      ? totals.spend / totals.engagement
      : 0;

  const costPerVideoView3s =
    totals.videoViews3s > 0
      ? totals.spend / totals.videoViews3s
      : 0;

  const costPerThruplay =
    totals.thruplay > 0
      ? totals.spend / totals.thruplay
      : 0;

  return {
    spend: roundMoney(totals.spend),

    reach: Math.round(totals.reach),

    impressions:
      Math.round(totals.impressions),

    views:
      Math.round(totals.impressions),

    clicks:
      Math.round(totals.clicks),

    ctr:
      roundMetric(ctr),

    cpc:
      roundMetric(cpc),

    cpm:
      roundMetric(cpm),

    engagement:
      Math.round(totals.engagement),

    costPerEngagement:
      roundMetric(costPerEngagement),

    videoPlays:
      Math.round(totals.videoPlays),

    videoViews3s:
      Math.round(totals.videoViews3s),

    costPerVideoView3s:
      roundMetric(costPerVideoView3s),

    videoViews15s:
      Math.round(totals.videoViews15s),

    videoViews95:
      Math.round(totals.videoViews95),

    videoViews100:
      Math.round(totals.videoViews100),

    thruplay:
      Math.round(totals.thruplay),

    costPerThruplay:
      roundMetric(costPerThruplay)
  };
}

function prepareTocantinsPopulationData(
  municipalities = []
) {
  const tocantinsMunicipalities = municipalities
    .filter((municipality) => {
      const code = String(
        municipality.municipalityCode || ""
      );

      return code.startsWith("17");
    })
    .map((municipality) => ({
      ...municipality,

      searchableName:
        normalizeMunicipalityName(
          municipality.municipalityName
        )
    }))
    .filter(
      (municipality) =>
        municipality.municipalityCode &&
        municipality.municipalityName &&
        municipality.searchableName &&
        toNumber(municipality.population) > 0
    )
    .sort(
      (municipalityA, municipalityB) =>
        municipalityB.searchableName.length -
        municipalityA.searchableName.length
    );

  const statePopulation =
    tocantinsMunicipalities.reduce(
      (total, municipality) =>
        total +
        toNumber(municipality.population),
      0
    );

  return {
    municipalities:
      tocantinsMunicipalities,

    statePopulation:
      Math.round(statePopulation)
  };
}

function findMunicipalityInCampaign(
  campaignName,
  municipalities = []
) {
  const normalizedCampaignName =
    normalizeText(campaignName);

  if (!normalizedCampaignName) {
    return null;
  }

  const campaignWithBoundaries =
    ` ${normalizedCampaignName} `;

  return (
    municipalities.find((municipality) => {
      const municipalityName =
        municipality.searchableName;

      if (!municipalityName) {
        return false;
      }

      const municipalityWithBoundaries =
        ` ${municipalityName} `;

      return campaignWithBoundaries.includes(
        municipalityWithBoundaries
      );
    }) || null
  );
}

function createGeographicData(
  campaignName,
  reach,
  tocantinsPopulationData
) {
  const municipality =
    findMunicipalityInCampaign(
      campaignName,
      tocantinsPopulationData.municipalities
    );

  if (municipality) {
    const population = Math.round(
      toNumber(municipality.population)
    );

    return {
      geographicScope: {
        type: "municipal",
        label: "Municipal",

        municipality:
          municipality.municipalityName,

        municipalityCode:
          municipality.municipalityCode,

        state: "Tocantins",
        stateCode: "TO"
      },

      ibge: {
        scope: "municipal",

        municipality:
          municipality.municipalityName,

        municipalityCode:
          municipality.municipalityCode,

        state: "Tocantins",
        stateCode: "TO",

        population,

        reach:
          Math.round(toNumber(reach)),

        coveragePercentage:
          calculatePopulationCoverage(
            reach,
            population
          ),

        coverageLabel:
          "Cobertura estimada da população",

        referenceYear:
          municipality.referenceYear || 2025,

        source:
          municipality.source ||
          "IBGE/SIDRA",

        table:
          municipality.table || "6579",

        detectionRule:
          "Município identificado no nome da campanha",

        warning:
          "O alcance da Meta representa contas únicas estimadas e não confirma residência individual."
      }
    };
  }

  const statePopulation =
    tocantinsPopulationData.statePopulation;

  return {
    geographicScope: {
      type: "state",
      label: "Estadual",
      municipality: null,
      municipalityCode: null,
      state: "Tocantins",
      stateCode: "TO"
    },

    ibge: {
      scope: "state",
      municipality: null,
      municipalityCode: null,
      state: "Tocantins",
      stateCode: "TO",

      population:
        statePopulation,

      reach:
        Math.round(toNumber(reach)),

      coveragePercentage:
        calculatePopulationCoverage(
          reach,
          statePopulation
        ),

      coverageLabel:
        "Cobertura estimada da população estadual",

      referenceYear: 2025,
      source: "IBGE/SIDRA",
      table: "6579",

      detectionRule:
        "Nenhum município foi identificado no nome da campanha; campanha classificada como estadual",

      warning:
        "O alcance da Meta representa contas únicas estimadas e não confirma residência individual."
    }
  };
}

function createCreativeMaps(
  creatives = []
) {
  const creativeByAdId = new Map();
  const creativeByCreativeId = new Map();

  for (const creative of creatives) {
        const normalizedCreative = {
      id:
        creative.id || null,

      name:
        creative.name || null,

      thumbnailUrl:
        creative.thumbnailUrl ||
        creative.thumbnail_url ||
        null,

      imageUrl:
        creative.imageUrl ||
        creative.image_url ||
        null,

      videoId:
        creative.videoId ||
        creative.video_id ||
        null,

      videoUrl:
        creative.videoUrl ||
        creative.video_url ||
        null,

      videoThumbnail:
        creative.videoThumbnail ||
        creative.video_thumbnail ||
        null,

      effectiveObjectStoryId:
        creative.effectiveObjectStoryId ||
        creative.effective_object_story_id ||
        null,

      objectStorySpec:
        creative.objectStorySpec ||
        creative.object_story_spec ||
        null,

      assetFeedSpec:
        creative.assetFeedSpec ||
        creative.asset_feed_spec ||
        null
    };

    if (normalizedCreative.id) {
      creativeByCreativeId.set(
        String(normalizedCreative.id),
        normalizedCreative
      );
    }

    for (const linkedAd of creative.ads || []) {
      if (!linkedAd?.id) {
        continue;
      }

      creativeByAdId.set(
        String(linkedAd.id),
        normalizedCreative
      );
    }
  }

  return {
    creativeByAdId,
    creativeByCreativeId
  };
}

function createAdsByAdSetIdMap(
  ads = [],
  creativeMaps
) {
  const adsByAdSetId = new Map();

  const {
    creativeByAdId,
    creativeByCreativeId
  } = creativeMaps;

  for (const ad of ads) {
    const adId =
      String(ad.id || "");

    const creativeId =
      String(
        ad.creative?.id ||
        ad.creative_id ||
        ""
      );

    const creative =
      creativeByAdId.get(adId) ||
      creativeByCreativeId.get(
        creativeId
      ) ||
      ad.creative ||
      null;

    const coverUrl =
      ad.coverUrl ||
      ad.cover_url ||
      ad.thumbnailUrl ||
      ad.thumbnail_url ||
      ad.imageUrl ||
      ad.image_url ||
      creative?.thumbnailUrl ||
      creative?.thumbnail_url ||
      creative?.imageUrl ||
      creative?.image_url ||
      null;

    const normalizedAd = {
      ...ad,

      creative,

      coverUrl
    };

    const adSetId =
      String(
        ad.adset_id ||
        ad.adSetId ||
        ""
      );

    if (!adSetId) {
      continue;
    }

    if (!adsByAdSetId.has(adSetId)) {
      adsByAdSetId.set(
        adSetId,
        []
      );
    }

    adsByAdSetId
      .get(adSetId)
      .push(normalizedAd);
  }

  return adsByAdSetId;
}

      function createAdSetsByCampaignIdMap(
  adSets = [],
  adsByAdSetId
) {
  const adSetsByCampaignId = new Map();

  for (const adSet of adSets) {
    const adSetId =
      String(adSet.id || "");

    const campaignId =
      String(
        adSet.campaign_id ||
        adSet.campaignId ||
        ""
      );

    if (!adSetId || !campaignId) {
      continue;
    }

    const ads =
      adsByAdSetId.get(adSetId) || [];

    const normalizedAdSet = {
      ...adSet,

      summary: {
        totalAds:
          ads.length,

        deliveredAds:
          ads.filter(
            (ad) =>
              ad.delivery?.deliveredInPeriod
          ).length,

        adsWithCover:
          ads.filter(
            (ad) => Boolean(ad.coverUrl)
          ).length
      },

      ads
    };

    if (
      !adSetsByCampaignId.has(
        campaignId
      )
    ) {
      adSetsByCampaignId.set(
        campaignId,
        []
      );
    }

    adSetsByCampaignId
      .get(campaignId)
      .push(normalizedAdSet);
  }

  return adSetsByCampaignId;
}

function buildCampaigns({
  campaigns,
  adSetsByCampaignId,
  tocantinsPopulationData
}) {
  return campaigns.map((campaign) => {
    const adSets =
      adSetsByCampaignId.get(
        String(campaign.id)
      ) || [];

    const allAds = adSets.flatMap(
      (adSet) => adSet.ads || []
    );

    const adsWithCover = allAds.filter(
      (ad) => Boolean(ad.coverUrl)
    );

    const deliveredAdsWithCover =
      adsWithCover.filter(
        (ad) =>
          ad.delivery?.deliveredInPeriod
      );

    const coverCandidates =
      deliveredAdsWithCover.length
        ? deliveredAdsWithCover
        : adsWithCover;

    const mainAd =
      coverCandidates
        .slice()
        .sort(
          (adA, adB) =>
            toNumber(
              adB.delivery?.reach
            ) -
            toNumber(
              adA.delivery?.reach
            )
        )[0] || null;

    const performance =
      calculateCampaignPerformance(adSets);

    const geographicData =
      createGeographicData(
        campaign.name,
        performance.reach,
        tocantinsPopulationData
      );

    return {
      ...campaign,

      geographicScope:
        geographicData.geographicScope,

      ibge:
        geographicData.ibge,

           cover: mainAd
        ? {
            adId:
              mainAd.id,

            adName:
              mainAd.name,

            type:
              mainAd.creative?.videoUrl
                ? "video"
                : "image",

            url:
              mainAd.creative?.imageUrl ||
              mainAd.creative
                ?.videoThumbnail ||
              mainAd.coverUrl,

            thumbnail:
              mainAd.creative
                ?.videoThumbnail ||
              mainAd.creative
                ?.imageUrl ||
              mainAd.coverUrl,

            videoUrl:
              mainAd.creative
                ?.videoUrl ||
              null,

            selectionRule:
              deliveredAdsWithCover.length
                ? "Anúncio entregue com maior alcance no período"
                : "Primeiro anúncio com mídia disponível"
          }
        : null,

      performance,

      summary: {
        totalAdSets:
          adSets.length,

        totalAds:
          allAds.length,

        deliveredAds:
          allAds.filter(
            (ad) =>
              ad.delivery?.deliveredInPeriod
          ).length,

        adsWithCover:
          adsWithCover.length
      },

      adSets
    };
  });
}

function addRankingToCampaigns(
  campaigns,
  rankingResult
) {
  const rankingByCampaignId = new Map(
    (rankingResult.campaigns || []).map(
      (campaign) => [
        campaign.id,
        campaign.ranking || {}
      ]
    )
  );

  return campaigns.map((campaign) => ({
    ...campaign,

    ranking:
      rankingByCampaignId.get(
        campaign.id
      ) || {}
  }));
}

function calculateGeneralTotals(
  campaigns = []
) {
  return campaigns.reduce(
    (result, campaign) => {
      const performance =
        campaign.performance || {};

      result.spend += toNumber(
        performance.spend
      );

      result.reach += toNumber(
        performance.reach
      );

      result.views += toNumber(
        performance.views
      );

      result.impressions += toNumber(
        performance.impressions
      );

      result.clicks += toNumber(
        performance.clicks
      );

      result.engagement += toNumber(
        performance.engagement
      );

      result.videoPlays += toNumber(
        performance.videoPlays
      );

      result.videoViews3s += toNumber(
        performance.videoViews3s
      );

      result.videoViews15s += toNumber(
        performance.videoViews15s
      );

      result.videoViews95 += toNumber(
        performance.videoViews95
      );

      result.videoViews100 += toNumber(
        performance.videoViews100
      );

      result.thruplay += toNumber(
        performance.thruplay
      );

      return result;
    },
    {
      spend: 0,
      reach: 0,
      views: 0,
      impressions: 0,
      clicks: 0,
      engagement: 0,
      videoPlays: 0,
      videoViews3s: 0,
      videoViews15s: 0,
      videoViews95: 0,
      videoViews100: 0,
      thruplay: 0
    }
  );
}

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
    creativesData,
    ibgeMunicipalities
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

    getMetaCreatives(accessToken),

    getIbgeMunicipalPopulations()
  ]);

  const tocantinsPopulationData =
    prepareTocantinsPopulationData(
      ibgeMunicipalities
    );

    const creativeMaps =
    createCreativeMaps(
      creativesData.creatives || []
    );

  const adsByAdSetId =
    createAdsByAdSetIdMap(
      adsData.ads || [],
      creativeMaps
    );

  const adSetsByCampaignId =
    createAdSetsByCampaignIdMap(
      adSetsData.adSets || [],
      adsByAdSetId
    );

  const campaigns =
  buildCampaigns({
    campaigns:
      campaignsData.campaigns || [],

    adSetsByCampaignId,

    tocantinsPopulationData
  });

  const rankingResult =
    generateMetaAdsRanking(campaigns);

  const campaignsWithRanking =
    addRankingToCampaigns(
      campaigns,
      rankingResult
    );

  const totals =
    calculateGeneralTotals(
      campaignsWithRanking
    );

  const averageCtr =
    totals.impressions > 0
      ? (
          totals.clicks /
          totals.impressions
        ) * 100
      : 0;

  const averageCpc =
    totals.clicks > 0
      ? totals.spend /
        totals.clicks
      : 0;

  const averageCpm =
    totals.impressions > 0
      ? (
          totals.spend /
          totals.impressions
        ) * 1000
      : 0;

  const costPerEngagement =
    totals.engagement > 0
      ? totals.spend /
        totals.engagement
      : 0;

  const costPerThruplay =
    totals.thruplay > 0
      ? totals.spend /
        totals.thruplay
      : 0;

  const municipalCampaigns =
    campaignsWithRanking.filter(
      (campaign) =>
        campaign.geographicScope?.type ===
        "municipal"
    ).length;

  const stateCampaigns =
    campaignsWithRanking.filter(
      (campaign) =>
        campaign.geographicScope?.type ===
        "state"
    ).length;

  return {
    period: {
      since,
      until
    },

    geography: {
      state: "Tocantins",
      stateCode: "TO",

      statePopulation:
        tocantinsPopulationData
          .statePopulation,

      referenceYear: 2025,

      totalMunicipalities:
        tocantinsPopulationData
          .municipalities.length,

      municipalCampaigns,

      stateCampaigns
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

      municipalCampaigns,

      stateCampaigns,

      totalSpend:
        roundMoney(totals.spend),

      totalReach:
        Math.round(totals.reach),

      totalViews:
        Math.round(totals.views),

      totalImpressions:
        Math.round(totals.impressions),

      totalClicks:
        Math.round(totals.clicks),

      totalEngagement:
        Math.round(totals.engagement),

      costPerEngagement:
        roundMetric(costPerEngagement),

      totalVideoPlays:
        Math.round(totals.videoPlays),

      totalVideoViews3s:
        Math.round(totals.videoViews3s),

      totalVideoViews15s:
        Math.round(totals.videoViews15s),

      totalVideoViews95:
        Math.round(totals.videoViews95),

      totalVideoViews100:
        Math.round(totals.videoViews100),

      totalThruplay:
        Math.round(totals.thruplay),

      costPerThruplay:
        roundMetric(costPerThruplay),

      averageCtr:
        roundMetric(averageCtr),

      averageCpc:
        roundMetric(averageCpc),

      averageCpm:
        roundMetric(averageCpm)
    },

    ranking:
      rankingResult.ranking,

    campaigns:
      campaignsWithRanking
  };
}
