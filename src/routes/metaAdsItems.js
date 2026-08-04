import { getMetaAdsItems } from "../services/metaAdsItems.service.js";

export async function metaAdsItems(env, request) {
  try {
    const url = new URL(request.url);

    const since = url.searchParams.get("since");
    const until = url.searchParams.get("until");
    const campaignId = url.searchParams.get("campaign_id");
    const adSetId = url.searchParams.get("adset_id");

    const data = await getMetaAdsItems(
      env.META_ACCESS_TOKEN,
      {
        since,
        until,
        campaignId,
        adSetId
      }
    );

    return Response.json({
      success: true,
      module: "Meta Ads",
      type: "Ads",
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
