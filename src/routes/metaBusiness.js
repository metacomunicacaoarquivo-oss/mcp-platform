import { getMetaBusinessOverview } from "../services/metaBusiness.service.js";

export async function metaBusinessOverview(env) {
  try {
    const data = await getMetaBusinessOverview({
      instagramAccessToken: env.META_ACCESS_TOKEN,
      pageAccessToken: env.META_PAGE_ACCESS_TOKEN
    });

    return Response.json({
      success: true,
      module: "Meta Business",
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
        status: error.status || 500
      }
    );
  }
}
