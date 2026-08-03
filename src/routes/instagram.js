import { getInstagramDashboard } from "../services/instagram.service.js";

export async function instagramDashboard(env) {
  try {
    const data = await getInstagramDashboard(env.META_ACCESS_TOKEN);

    return Response.json({
      success: true,
      module: "Instagram",
      metric: "views",
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
