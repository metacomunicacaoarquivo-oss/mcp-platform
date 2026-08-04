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
      result.clicks += toNumber(delivery.clicks);

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
    .filter((municipality) =>
      String(municipality.municipalityCode || "")
        .startsWith("17")
    )
    .sort(
      (municipalityA, municipalityB) =>
        municipalityB.normalizedName.length -
        municipalityA.normalizedName.length
    );

  const statePopulation =
    tocantinsMunicipalities.reduce(
      (total, municipality) =>
        total + toNumber(municipality.population),
      0
    );

  return {
    municipalities: tocantinsMunicipalities,
    statePopulation: Math.round(statePopulation)
  };
}

function identifyCampaignLocation(
  campaignName,
  tocantinsPopulationData
) {
  const normalizedCampaignName =
    ` ${normalizeText(campaignName)} `;

  const municipality =
    tocantinsPopulationData.municipalities.find(
      (item) => {
        const normalizedMunicipality =
          ` ${item.normalizedName} `;

        return normalizedCampaignName.includes(
          normalizedMunicipality
        );
      }
    );

  if (municipality) {
    return {
      scope: "municipal",
      scopeLabel: "Municipal",
      municipalityCode:
        municipality.municipalityCode,
      municipality:
        municipality.municipalityName,
      state: "Tocantins",
      stateCode: "TO",
      population:
        Math.round(
          toNumber(municipality.population)
        ),
      referenceYear:
        municipality.referenceYear,
      source:
        municipality.source,
      table:
        municipality.table,
      detectionRule:
        "Município identificado no nome da campanha"
    };
  }

  return {
    scope: "state",
    scopeLabel: "Estadual",
    municipalityCode: null,
    municipality: null,
    state: "Tocantins",
    stateCode: "TO",
    population:
      tocantinsPopulationData.statePopulation,
    referenceYear:
      tocantinsPopulationData
        .municipalities[0]
        ?.referenceYear || 2025,
    source: "IBGE/SIDRA",
    table: "6579",
    detectionRule:
      "Nenhum município foi identificado no nome da campanha"
  };
}

function createIbgeData(
  campaignName,
  reach,
  tocantinsPopulationData
) {
  const location = identifyCampaignLocation(
    campaignName,
    tocantinsPopulationData
  );

  return {
    ...location,

    reach:
      Math.round(toNumber(reach)),

    coveragePercentage:
      calculatePopulationCoverage(
        reach,
        location.population
      ),

    coverageLabel:
      "Cobertura estimada da população",

    warning:
      "O alcance da Meta representa contas únicas estimadas e não confirma residência individual."
  };
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

  /*
   * Relaciona cada anúncio ao seu criativo.
   */
  const creativeByAdId = new Map();

  for (const creative of creativesData.creatives || []) {
    for (const linkedAd of creative.ads || []) {
      creativeByAdId.set(linkedAd.id, {
        id: creative.id,
        name: creative.name,
        thumbnailUrl:
          creative.thumbnailUrl,
        imageUrl:
          creative.imageUrl,
        effectiveObjectStoryId:
          creative.effectiveObjectStoryId,
        objectStorySpec:
          creative.objectStorySpec,
        assetFeedSpec:
          creative.assetFeedSpec
      });
    }
  }

  /*
   * Agrupa os anúncios pelo conjunto de anúncios.
   */
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

  /*
   * Agrupa os conjuntos pela campanha.
   */
  const adSetsByCampaignId = new Map();

  for (const adSet of adSetsData.adSets || []) {
    const ads =
      adsByAdSetId.get(adSet.id) || [];

    const normalizedAdSet = {
      ...adSet,

      summary: {
        totalAds: ads.length,

        deliveredAds: ads.filter(
          (ad) =>
            ad.delivery?.deliveredInPeriod
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

  /*
   * Monta cada campanha com conjuntos, anúncios,
   * criativos, capas e métricas consolidadas.
   */
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
          (adA, adB) =>
            toNumber(adB.delivery?.reach) -
            toNumber(adA.delivery?.reach)
        )[0] || null;

    const performance =
      calculateCampaignPerformance(adSets);

    const ibge =
      createIbgeData(
        campaign.name,
        performance.reach,
        tocantinsPopulationData
      );

    return {
      ...campaign,

      geographicScope: {
        type: ibge.scope,
        label: ibge.scopeLabel,
        municipality: ibge.municipality,
        state: ibge.state,
        stateCode: ibge.stateCode
      },

      ibge,

      cover: mainAd
        ? {
            adId: mainAd.id,
            adName: mainAd.name,
            url: mainAd.coverUrl,
            selectionRule:
              "Anúncio com maior alcance no período"
          }
        : null,

      performance,

      summary: {
        totalAdSets:
          adSets.length,

        totalAds:
          allAds.length,

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

  /*
   * Gera o ranking das campanhas.
   */
  const rankingResult =
    generateMetaAdsRanking(campaigns);

  const rankingByCampaignId = new Map(
    (rankingResult.campaigns || []).map(
      (campaign) => [
        campaign.id,
        campaign.ranking || {}
      ]
    )
  );

  const campaignsWithRanking = campaigns.map(
    (campaign) => ({
      ...campaign,

      ranking:
        rankingByCampaignId.get(campaign.id) || {}
    })
  );

  /*
   * Consolida as métricas gerais.
   */
  const totals = campaignsWithRanking.reduce(
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

  const averageCtr =
    totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0;

  const averageCpc =
    totals.clicks > 0
      ? totals.spend / totals.clicks
      : 0;

  const averageCpm =
    totals.impressions > 0
      ? (totals.spend / totals.impressions) * 1000
      : 0;

  const costPerEngagement =
    totals.engagement > 0
      ? totals.spend / totals.engagement
      : 0;

  const costPerThruplay =
    totals.thruplay > 0
      ? totals.spend / totals.thruplay
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
        tocantinsPopulationData.statePopulation,
      referenceYear:
        tocantinsPopulationData
          .municipalities[0]
          ?.referenceYear || 2025,
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
