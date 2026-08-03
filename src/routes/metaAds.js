import { getMetaAdsCampaigns } from "../services/metaAds.service.js";

export async function metaAdsCampaigns(env, request) {
  try {
    const url = new URL(request.url);

    const since = url.searchParams.get("since");
    const until = url.searchParams.get("until");

    const data = await getMetaAdsCampaigns(
      env.META_ACCESS_TOKEN,
      {
        since,
        until
      }
    );

    return Response.json({
      success: true,
      module: "Meta Ads",
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
