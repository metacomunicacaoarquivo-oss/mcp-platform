import { getMetaCreatives } from "../services/metaCreatives.service.js";

export async function metaCreatives(env, request) {
  try {
    const url = new URL(request.url);

    const campaignId = url.searchParams.get("campaign_id");
    const adSetId = url.searchParams.get("adset_id");
    const adId = url.searchParams.get("ad_id");

    const data = await getMetaCreatives(
      env.META_ACCESS_TOKEN,
      {
        campaignId,
        adSetId,
        adId
      }
    );

    return Response.json({
      success: true,
      module: "Meta Ads",
      type: "Creatives",
      data
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
        details: error.meta ?? null
      },
      {
        status: error.status ?? 500
      }
    );
  }
}
