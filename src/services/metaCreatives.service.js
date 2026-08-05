import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getMetaCreatives(
  accessToken,
  {
    campaignId = null,
    adSetId = null,
    adId = null
  } = {}
) {
  const adsResponse = await metaRequest({
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
        "creative{id,name,thumbnail_url,image_url,effective_object_story_id,object_story_spec,asset_feed_spec}"
      ].join(","),
      limit: 500
    }
  });

  let ads = adsResponse.data || [];

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

  if (adId) {
    ads = ads.filter(
      (ad) => ad.id === adId
    );
  }

  function getCreativeVideoId(
    creative
  ) {
    const objectStorySpec =
      creative?.object_story_spec || {};

    const assetFeedSpec =
      creative?.asset_feed_spec || {};

    const videoFromStory =
      objectStorySpec.video_data
        ?.video_id ||
      objectStorySpec.template_data
        ?.video_id ||
      null;

    const videoFromAssetFeed =
      assetFeedSpec.videos?.[0]
        ?.video_id ||
      null;

    return (
      videoFromStory ||
      videoFromAssetFeed ||
      null
    );
  }
  
  const creativesById = new Map();

  for (const ad of ads) {
    const creative = ad.creative;

    if (!creative?.id) {
      continue;
    }

    const existing = creativesById.get(creative.id);

    const linkedAd = {
      id: ad.id,
      name: ad.name,
      campaignId: ad.campaign_id,
      adSetId: ad.adset_id,
      status: ad.status,
      effectiveStatus: ad.effective_status
    };

    if (existing) {
      existing.ads.push(linkedAd);
      continue;
    }

       creativesById.set(creative.id, {
      id:
        creative.id,

      name:
        creative.name || null,

      thumbnailUrl:
        creative.thumbnail_url || null,

      imageUrl:
        creative.image_url || null,

      videoId:
        getCreativeVideoId(
          creative
        ),

      effectiveObjectStoryId:
        creative.effective_object_story_id ||
        null,

      objectStorySpec:
        creative.object_story_spec ||
        null,

      assetFeedSpec:
        creative.asset_feed_spec ||
        null,

      ads: [linkedAd]
    });
  }

  const creatives = Array.from(
    creativesById.values()
  );

  return {
    filters: {
      campaignId,
      adSetId,
      adId
    },

    summary: {
      totalAdsAnalyzed: ads.length,
      totalCreatives: creatives.length,
      withThumbnail: creatives.filter(
        (creative) => Boolean(creative.thumbnailUrl)
      ).length,
      withImage: creatives.filter(
        (creative) => Boolean(creative.imageUrl)
      ).length
    },

    creatives
  };
}
