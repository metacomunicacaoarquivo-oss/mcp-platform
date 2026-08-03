import { getFacebookOverview } from "../services/facebook.service.js";

export async function facebookOverview(env) {
  try {
    const data = await getFacebookOverview(
      env.META_PAGE_ACCESS_TOKEN
    );

    return Response.json({
      success: true,
      module: "Facebook",
      data
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
        details: error.meta || null
      },
      {
        status: error.status || 500
      }
    );
  }
}
