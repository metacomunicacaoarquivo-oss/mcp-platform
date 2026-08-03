// src/index.js
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        success: true,
        status: "online",
        api: "Central de Performance",
        version: "1.0.0",
        timestamp: new Date().toISOString()
      });
    }

    if (url.pathname === "/instagram/dashboard") {
      const igUserId = "17841400813120157";
      const graphVersion = "v26.0";

      const endpoint =
        `https://graph.facebook.com/${graphVersion}/${igUserId}/insights` +
        `?metric=views&period=day&metric_type=total_value` +
        `&access_token=${encodeURIComponent(env.META_ACCESS_TOKEN)}`;

      try {
        const metaResponse = await fetch(endpoint);
        const metaData = await metaResponse.json();

        if (!metaResponse.ok) {
          return Response.json(
            {
              success: false,
              source: "Meta Graph API",
              error: metaData.error || metaData
            },
            {
              status: metaResponse.status
            }
          );
        }

        return Response.json({
          success: true,
          module: "Instagram",
          metric: "views",
          data: metaData.data
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Falha ao consultar a Meta Graph API",
            details: error.message
          },
          {
            status: 500
          }
        );
      }
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

export {
  index_default as default
};
