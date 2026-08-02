export default {
  async fetch(request) {
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
