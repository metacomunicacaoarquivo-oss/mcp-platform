import {
  getMetaAdsAccountStatus
} from "../services/metaAdsAccount.service.js";

export async function metaAdsAccountStatus(
  env
) {
  try {
    const accessToken =
      env.META_ACCESS_TOKEN;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          error:
            "Token de acesso da Meta não configurado."
        },
        {
          status: 500
        }
      );
    }

    const data =
      await getMetaAdsAccountStatus(
        accessToken
      );

    return Response.json({
      success: true,
      module: "Meta Ads",
      type: "Account Status",
      data
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error.message ||
          "Não foi possível consultar o status da conta Meta Ads."
      },
      {
        status:
          error.status || 500
      }
    );
  }
}
