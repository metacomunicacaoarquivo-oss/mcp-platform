import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getMetaAdsItems(
  accessToken,
  {
    since,
    until,
    campaignId = null,
    adSetId = null
  }
) {
  if (!since || !until) {
    const error = new Error(
      "As datas de início e fim do período são obrigatórias."
    );

    error.status = 400;
    throw error;
  }

  const [adsResponse, insightsResponse] = await Promise.all([
    metaRequest({
      path: `${META_CONFIG.adAccountId}/ads`,
      accessToken,
      params: {
        fields: [
          "id",
          "name",
          "campaign_id",
          "adset_id",
          "status",
          "effective_status",
          "created_time",
          "updated_time",
          "creative{id,name}"
        ].join(","),
        limit: 500
      }
    }),

    metaRequest({
      path: `${META_CONFIG.adAccountId}/insights`,
      accessToken,
      params: {
        level: "ad",
        fields: [
          "campaign_id",
          "campaign_name",
          "adset_id",
          "adset_name",
          "ad_id",
          "ad_name",
          "spend",
          "reach",
          "impressions",
          "clicks",
          "ctr",
          "cpc",
          "cpm",
          "frequency"
        ].join(","),
        time_range: JSON.stringify({
          since,
          until
        }),
        limit: 500
      }
    })
  ]);

  const insightsByAd = new Map(
    (insightsResponse.data || []).map((item) => [
      item.ad_id,
      item
    ])
  );

  let ads = (adsResponse.data || []).map((ad) => {
    const insights = insightsByAd.get(ad.id) || null;

    const spend = Number(insights?.spend || 0);
    const reach = Number(insights?.reach || 0);
    const impressions = Number(insights?.impressions || 0);

    return {
      ...ad,

      period: {
        since,
        until
      },

      delivery: {
        deliveredInPeriod:
          spend > 0 || reach > 0 || impressions > 0,

        spend,
        reach,
        impressions,
        clicks: Number(insights?.clicks || 0),
        ctr: Number(insights?.ctr || 0),
        cpc: Number(insights?.cpc || 0),
        cpm: Number(insights?.cpm || 0),
        frequency: Number(insights?.frequency || 0)
      }
    };
  });

  if (campaignId) {
    ads = ads.filter(
      (ad) => ad.campaign_id === campaignId
    );
  }

  if (adSetId) {
    ads = ads.filter(
      (ad) => ad.adset_id === adSetId
    );
  }

  return {
    period: {
      since,
      until
    },

    filters: {
      campaignId,
      adSetId
    },

    summary: {
      totalAds: ads.length,

      deliveredInPeriod: ads.filter(
        (ad) => ad.delivery.deliveredInPeriod
      ).length,

      active: ads.filter(
        (ad) => ad.effective_status === "ACTIVE"
      ).length,

      otherStatuses: ads.filter(
        (ad) => ad.effective_status !== "ACTIVE"
      ).length
    },

    ads
  };
}
