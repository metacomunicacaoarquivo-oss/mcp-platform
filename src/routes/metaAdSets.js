import { getMetaAdSets } from "../services/metaAdSets.service.js";

export async function metaAdSets(env, request) {
  try {
    const url = new URL(request.url);

    const since = url.searchParams.get("since");
    const until = url.searchParams.get("until");
    const campaignId = url.searchParams.get("campaign_id");

    const data = await getMetaAdSets(
      env.META_ACCESS_TOKEN,
      {
        since,
        until,
        campaignId
      }
    );

    return Response.json({
      success: true,
      module: "Meta Ads",
      type: "Ad Sets",
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
