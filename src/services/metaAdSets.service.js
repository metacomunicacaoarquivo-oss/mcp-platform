import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getMetaAdSets(
  accessToken,
  { since, until, campaignId = null }
) {
  if (!since || !until) {
    const error = new Error(
      "As datas de início e fim do período são obrigatórias."
    );

    error.status = 400;
    throw error;
  }

  const [adSetsResponse, insightsResponse] = await Promise.all([
    metaRequest({
      path: `${META_CONFIG.adAccountId}/adsets`,
      accessToken,
      params: {
        fields: [
          "id",
          "name",
          "campaign_id",
          "status",
          "effective_status",
          "daily_budget",
          "lifetime_budget",
          "budget_remaining",
          "optimization_goal",
          "billing_event",
          "bid_strategy",
          "start_time",
          "end_time",
          "created_time",
          "updated_time"
        ].join(","),
        limit: 500
      }
    }),

    metaRequest({
      path: `${META_CONFIG.adAccountId}/insights`,
      accessToken,
      params: {
        level: "adset",
        fields: [
          "campaign_id",
          "campaign_name",
          "adset_id",
          "adset_name",
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

  const insightsByAdSet = new Map(
    (insightsResponse.data || []).map((item) => [
      item.adset_id,
      item
    ])
  );

  let adSets = (adSetsResponse.data || []).map((adSet) => {
    const insights = insightsByAdSet.get(adSet.id) || null;

    const spend = Number(insights?.spend || 0);
    const reach = Number(insights?.reach || 0);
    const impressions = Number(insights?.impressions || 0);

    return {
      ...adSet,

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
    adSets = adSets.filter(
      (adSet) => adSet.campaign_id === campaignId
    );
  }

  return {
    period: {
      since,
      until
    },

    filters: {
      campaignId
    },

    summary: {
      totalAdSets: adSets.length,

      deliveredInPeriod: adSets.filter(
        (adSet) => adSet.delivery.deliveredInPeriod
      ).length,

      active: adSets.filter(
        (adSet) => adSet.effective_status === "ACTIVE"
      ).length,

      otherStatuses: adSets.filter(
        (adSet) => adSet.effective_status !== "ACTIVE"
      ).length
    },

    adSets
  };
}
