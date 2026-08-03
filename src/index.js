import { instagramDashboard } from "./routes/instagram.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        success: true,
        status: "online",
        api: "Central de Performance",
        version: "2.0.0",
        timestamp: new Date().toISOString()
      });
    }

    if (url.pathname === "/instagram/dashboard") {
      return instagramDashboard(env);
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
