 import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

export async function getInstagramDashboard(accessToken) {
  return metaRequest({
    path: `${META_CONFIG.instagramUserId}/insights`,
    accessToken,
    params: {
      metric: "views",
      period: "day",
      metric_type: "total_value"
    }
  });
}
