import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getMetaAdsCampaigns(
  accessToken,
  { since, until }
) {
  if (!since || !until) {
    const error = new Error(
      "As datas de início e fim do período são obrigatórias."
    );

    error.status = 400;
    throw error;
  }

  const [campaignsResponse, insightsResponse] = await Promise.all([
    metaRequest({
      path: `${META_CONFIG.adAccountId}/campaigns`,
      accessToken,
      params: {
        fields: [
          "id",
          "name",
          "status",
          "effective_status",
          "objective",
          "start_time",
          "stop_time",
          "created_time",
          "updated_time",
          "daily_budget",
          "lifetime_budget"
        ].join(","),
        limit: 100
      }
    }),

    metaRequest({
      path: `${META_CONFIG.adAccountId}/insights`,
      accessToken,
      params: {
        level: "campaign",
        fields: [
          "campaign_id",
          "campaign_name",
          "spend",
          "impressions"
        ].join(","),
        time_range: JSON.stringify({
          since,
          until
        }),
        limit: 500
      }
    })
  ]);

  const insightsByCampaign = new Map(
    (insightsResponse.data || []).map((item) => [
      item.campaign_id,
      item
    ])
  );

  const campaigns = (campaignsResponse.data || []).map(
    (campaign) => {
      const insights =
        insightsByCampaign.get(campaign.id) || null;

      const spend = Number(insights?.spend || 0);
      const impressions = Number(insights?.impressions || 0);

      return {
        ...campaign,

        period: {
          since,
          until
        },

        delivery: {
          deliveredInPeriod:
            spend > 0 || impressions > 0,

          spend,
          impressions
        }
      };
    }
  );

  return {
    period: {
      since,
      until
    },

    summary: {
      totalCampaigns: campaigns.length,

      deliveredInPeriod: campaigns.filter(
        (campaign) =>
          campaign.delivery.deliveredInPeriod
      ).length,

      active: campaigns.filter(
        (campaign) =>
          campaign.effective_status === "ACTIVE"
      ).length,

      otherStatuses: campaigns.filter(
        (campaign) =>
          campaign.effective_status !== "ACTIVE"
      ).length
    },

    campaigns
  };
}
