import { META_CONFIG } from "../config/meta.js";

export async function metaRequest({
  path,
  accessToken,
  params = {}
}) {
  if (!accessToken) {
    const error = new Error("Token de acesso da Meta não configurado.");
    error.status = 500;
    throw error;
  }

  const url = new URL(
    `https://graph.facebook.com/${META_CONFIG.graphVersion}/${path}`
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data?.error?.message || "Falha ao consultar a Meta Graph API."
    );

    error.status = response.status;
    error.meta = data?.error || data;

    throw error;
  }

  return data;
}
