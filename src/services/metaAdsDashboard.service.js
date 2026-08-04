import { getMetaAdsDashboard } from "../services/metaAdsDashboard.service.js";

export async function metaAdsDashboard(env, request) {
  try {
    const url = new URL(request.url);

    const since = url.searchParams.get("since");
    const until = url.searchParams.get("until");

    const data = await getMetaAdsDashboard(
      env.META_ACCESS_TOKEN,
      {
        since,
        until
      }
    );

    return Response.json({
      success: true,
      module: "Meta Ads",
      type: "Dashboard",
      data
    });
  } catch (error) {
    console.error("Erro no Dashboard Meta Ads:", {
      message: error?.message,
      stack: error?.stack,
      meta: error?.meta
    });

    return Response.json(
      {
        success: false,
        error: error?.message || "Erro desconhecido",
        errorName: error?.name || null,
        stack: error?.stack || null,
        details: error?.meta ?? null
      },
      {
        status: error?.status ?? 500
      }
    );
  }
}
