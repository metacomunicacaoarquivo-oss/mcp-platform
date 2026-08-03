import { META_CONFIG } from "../config/meta.js";

export async function getInstagramDashboard(accessToken) {
  const endpoint =
    `https://graph.facebook.com/${META_CONFIG.graphVersion}/` +
    `${META_CONFIG.instagramUserId}/insights` +
    `?metric=views&period=day&metric_type=total_value` +
    `&access_token=${encodeURIComponent(accessToken)}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Falha ao consultar os dados do Instagram.");
    error.status = response.status;
    error.meta = data.error || data;
    throw error;
  }

  return data;
}
