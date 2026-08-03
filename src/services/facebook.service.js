import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getFacebookOverview(accessToken) {
  const [profile, insights] = await Promise.all([
    metaRequest({
      path: META_CONFIG.pageId,
      accessToken,
      params: {
        fields: "id,name,fan_count,followers_count"
      }
    }),

    metaRequest({
      path: `${META_CONFIG.pageId}/insights`,
      accessToken,
      params: {
        metric: "page_media_view",
        period: "day"
      }
    })
  ]);

  return {
    profile,
    insights
  };
}
