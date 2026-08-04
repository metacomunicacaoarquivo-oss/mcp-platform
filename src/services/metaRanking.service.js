function toNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function rankByMetric(
  campaigns,
  metricName,
  getValue,
  direction = "desc"
) {
  const sortedCampaigns = campaigns
    .map((campaign) => ({
      campaignId: campaign.id,
      campaignName: campaign.name,
      value: toNumber(getValue(campaign))
    }))
    .sort((campaignA, campaignB) => {
      if (direction === "asc") {
        return campaignA.value - campaignB.value;
      }

      return campaignB.value - campaignA.value;
    });

  return sortedCampaigns.map((campaign, index) => ({
    position: index + 1,
    metric: metricName,
    campaignId: campaign.campaignId,
    campaignName: campaign.campaignName,
    value: campaign.value
  }));
}

function calculateCampaignMetrics(campaign) {
  const ads = (campaign.adSets || []).flatMap(
    (adSet) => adSet.ads || []
  );

  const deliveredAds = ads.filter(
    (ad) => ad.delivery?.deliveredInPeriod
  );

  const metrics = deliveredAds.reduce(
    (total, ad) => {
      total.spend += toNumber(ad.delivery?.spend);
      total.reach += toNumber(ad.delivery?.reach);
      total.impressions += toNumber(
        ad.delivery?.impressions
      );
      total.clicks += toNumber(ad.delivery?.clicks);

      return total;
    },
    {
      spend: 0,
      reach: 0,
      impressions: 0,
      clicks: 0
    }
  );

  const ctr =
    metrics.impressions > 0
      ? (metrics.clicks / metrics.impressions) * 100
      : 0;

  const cpc =
    metrics.clicks > 0
      ? metrics.spend / metrics.clicks
      : 0;

  const cpm =
    metrics.impressions > 0
      ? (metrics.spend / metrics.impressions) * 1000
      : 0;

  return {
    spend: Number(metrics.spend.toFixed(2)),
    reach: Math.round(metrics.reach),
    views: Math.round(metrics.impressions),
    impressions: Math.round(metrics.impressions),
    clicks: Math.round(metrics.clicks),
    ctr: Number(ctr.toFixed(4)),
    cpc: Number(cpc.toFixed(4)),
    cpm: Number(cpm.toFixed(4))
  };
}

export function generateMetaAdsRanking(campaigns = []) {
  const normalizedCampaigns = campaigns.map(
    (campaign) => ({
      ...campaign,
      performance: calculateCampaignMetrics(campaign)
    })
  );

  const ranking = {
    reach: rankByMetric(
      normalizedCampaigns,
      "reach",
      (campaign) => campaign.performance.reach
    ),

    views: rankByMetric(
      normalizedCampaigns,
      "views",
      (campaign) => campaign.performance.views
    ),

    spend: rankByMetric(
      normalizedCampaigns,
      "spend",
      (campaign) => campaign.performance.spend
    ),

    ctr: rankByMetric(
      normalizedCampaigns,
      "ctr",
      (campaign) => campaign.performance.ctr
    ),

    cpc: rankByMetric(
      normalizedCampaigns,
      "cpc",
      (campaign) => campaign.performance.cpc,
      "asc"
    ),

    cpm: rankByMetric(
      normalizedCampaigns,
      "cpm",
      (campaign) => campaign.performance.cpm,
      "asc"
    )
  };

  const rankingPositionByCampaign = new Map();

  for (const [metric, items] of Object.entries(ranking)) {
    for (const item of items) {
      if (
        !rankingPositionByCampaign.has(item.campaignId)
      ) {
        rankingPositionByCampaign.set(
          item.campaignId,
          {}
        );
      }

      rankingPositionByCampaign
        .get(item.campaignId)[metric] = item.position;
    }
  }

  const campaignsWithRanking = normalizedCampaigns.map(
    (campaign) => ({
      ...campaign,

      ranking:
        rankingPositionByCampaign.get(campaign.id) || {}
    })
  );

  return {
    ranking,
    campaigns: campaignsWithRanking
  };
}
