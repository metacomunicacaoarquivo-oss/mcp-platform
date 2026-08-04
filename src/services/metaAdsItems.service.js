import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

function toNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getActionValue(actions, actionType) {
  if (!Array.isArray(actions)) {
    return 0;
  }

  const action = actions.find(
    (item) => item.action_type === actionType
  );

  return toNumber(action?.value);
}

function getFirstActionValue(actions) {
  if (!Array.isArray(actions) || actions.length === 0) {
    return 0;
  }

  return actions.reduce(
    (total, item) => total + toNumber(item.value),
    0
  );
}

function calculateCost(spend, result) {
  if (result <= 0) {
    return 0;
  }

  return Number((spend / result).toFixed(4));
}

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
  "actions",
  "cost_per_action_type",
  "video_play_actions",
  "video_15_sec_watched_actions",
  "video_thruplay_watched_actions",
  "video_p95_watched_actions",
  "video_p100_watched_actions"
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

    const spend = toNumber(insights?.spend);
    const reach = toNumber(insights?.reach);
    const impressions = toNumber(
      insights?.impressions
    );
    const clicks = toNumber(insights?.clicks);

    const actions = insights?.actions || [];

    const engagement = getActionValue(
      actions,
      "post_engagement"
    );

    const videoViews3s = getActionValue(
      actions,
      "video_view"
    );

    const thruplay = getFirstActionValue(
      insights?.video_thruplay_watched_actions
    );

    const videoViews15s = getFirstActionValue(
      insights?.video_15_sec_watched_actions
    );

    const videoViews95 = getFirstActionValue(
      insights?.video_p95_watched_actions
    );

    const videoViews100 = getFirstActionValue(
      insights?.video_p100_watched_actions
    );

    const videoPlays = getFirstActionValue(
      insights?.video_play_actions
    );

    const costPerEngagement =
      getActionValue(
        insights?.cost_per_action_type,
        "post_engagement"
      ) || calculateCost(spend, engagement);

    const costPerVideoView3s =
      getActionValue(
        insights?.cost_per_action_type,
        "video_view"
      ) || calculateCost(spend, videoViews3s);

    const costPerThruplay =
      calculateCost(spend, thruplay);

    return {
      ...ad,

      period: {
        since,
        until
      },

      delivery: {
        deliveredInPeriod:
          spend > 0 ||
          reach > 0 ||
          impressions > 0,

        spend: Number(spend.toFixed(2)),
        reach: Math.round(reach),

        impressions:
          Math.round(impressions),

        views:
          Math.round(impressions),

        clicks:
          Math.round(clicks),

        ctr:
          toNumber(insights?.ctr),

        cpc:
          toNumber(insights?.cpc),

        cpm:
          toNumber(insights?.cpm),

        frequency:
          toNumber(insights?.frequency),

        engagement:
          Math.round(engagement),

        costPerEngagement:
          Number(costPerEngagement.toFixed(4)),

        videoPlays:
          Math.round(videoPlays),

        videoViews3s:
          Math.round(videoViews3s),

        costPerVideoView3s:
          Number(costPerVideoView3s.toFixed(4)),

        videoViews15s:
          Math.round(videoViews15s),

        videoViews95:
          Math.round(videoViews95),

        videoViews100:
          Math.round(videoViews100),

        thruplay:
          Math.round(thruplay),

        costPerThruplay:
          Number(costPerThruplay.toFixed(4))
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
