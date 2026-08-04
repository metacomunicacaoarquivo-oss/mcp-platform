import { instagramDashboard } from "./routes/instagram.js";
import { facebookOverview } from "./routes/facebook.js";
import { metaBusinessOverview } from "./routes/metaBusiness.js";
import { metaAdsCampaigns } from "./routes/metaAds.js";
import { metaAdSets } from "./routes/metaAdSets.js";
import { metaAdsItems } from "./routes/metaAdsItems.js";
import { metaCreatives } from "./routes/metaCreatives.js";
import { metaAdsDashboard } from "./routes/metaAdsDashboard.js";
import { dashboardPage } from "./routes/dashboardPage.js";
import { metaAdsPage } from "./routes/metaAdsPage.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        success: true,
        status: "online",
        api: "Central de Performance",
        version: "2.1.0",
        timestamp: new Date().toISOString()
      });
    }

    // Dashboard principal
    if (url.pathname === "/dashboard") {
      return dashboardPage();
    }

    // Nova página Meta Ads
    if (url.pathname === "/meta-ads") {
      return metaAdsPage();
    }

    // APIs Instagram
    if (url.pathname === "/instagram/dashboard") {
      return instagramDashboard(env);
    }

    // APIs Facebook
    if (url.pathname === "/facebook/overview") {
      return facebookOverview(env);
    }

    // APIs Meta Business
    if (url.pathname === "/meta-business/overview") {
      return metaBusinessOverview(env);
    }

    // APIs Meta Ads
    if (url.pathname === "/meta-ads/campaigns") {
      return metaAdsCampaigns(env, request);
    }

    if (url.pathname === "/meta-ads/adsets") {
      return metaAdSets(env, request);
    }

    if (url.pathname === "/meta-ads/ads") {
      return metaAdsItems(env, request);
    }

    if (url.pathname === "/meta-ads/creatives") {
      return metaCreatives(env, request);
    }

    if (url.pathname === "/meta-ads/dashboard") {
      return metaAdsDashboard(env, request);
    }

    return Response.json(
      {
        success: false,
        error: "Rota não encontrada"
      },
      {
        status: 404
      }
    );
  }
};
