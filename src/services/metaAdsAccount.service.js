import { META_CONFIG } from "../config/meta.js";
import { metaRequest } from "../lib/metaClient.js";

function toNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function convertMoneyValue(value) {
  return Number(
    (
      toNumber(value) / 100
    ).toFixed(2)
  );
}

function calculateAverageDailySpend(
  dailyInsights = []
) {
  const daysWithSpend =
    dailyInsights.filter(
      (item) =>
        toNumber(item.spend) > 0
    );

  if (!daysWithSpend.length) {
    return 0;
  }

  const totalSpend =
    daysWithSpend.reduce(
      (total, item) =>
        total +
        toNumber(item.spend),
      0
    );

  return Number(
    (
      totalSpend /
      daysWithSpend.length
    ).toFixed(2)
  );
}

function createBalanceStatus(
  balance,
  averageDailySpend
) {
  if (
    balance <= 0 ||
    averageDailySpend <= 0
  ) {
    return {
      estimatedDaysRemaining: 0,
      trafficLight: "red",
      label: "Saldo insuficiente"
    };
  }

  const estimatedDaysRemaining =
    Number(
      (
        balance /
        averageDailySpend
      ).toFixed(1)
    );

  if (estimatedDaysRemaining <= 3) {
    return {
      estimatedDaysRemaining,
      trafficLight: "red",
      label: "Saldo acabando"
    };
  }

  if (estimatedDaysRemaining <= 7) {
    return {
      estimatedDaysRemaining,
      trafficLight: "yellow",
      label: "Atenção ao saldo"
    };
  }

  return {
    estimatedDaysRemaining,
    trafficLight: "green",
    label: "Saldo suficiente"
  };
}

export async function getMetaAdsAccountStatus(
  accessToken
) {
  const [
    accountResponse,
    todayInsightsResponse,
    recentInsightsResponse
  ] = await Promise.all([
    metaRequest({
      path:
        META_CONFIG.adAccountId,

      accessToken,

      params: {
        fields: [
          "id",
          "account_id",
          "name",
          "currency",
          "account_status",
          "amount_spent",
          "balance",
          "spend_cap",
          "is_prepay_account",
          "timezone_name"
        ].join(",")
      }
    }),

    metaRequest({
      path:
        `${META_CONFIG.adAccountId}/insights`,

      accessToken,

      params: {
        level: "account",

        fields: [
          "spend",
          "reach",
          "impressions",
          "clicks"
        ].join(","),

        date_preset: "today"
      }
    }),

    metaRequest({
      path:
        `${META_CONFIG.adAccountId}/insights`,

      accessToken,

      params: {
        level: "account",

        fields: [
          "spend"
        ].join(","),

        date_preset: "last_7d",
        time_increment: 1
      }
    })
  ]);

  const todayInsights =
    todayInsightsResponse.data?.[0] ||
    {};

  const recentDailyInsights =
    recentInsightsResponse.data || [];

  const isPrepayAccount =
    Boolean(
      accountResponse.is_prepay_account
    );

  /*
   * Os campos financeiros da conta
   * são devolvidos pela Meta em centavos.
   */
  const accountBalance =
    convertMoneyValue(
      accountResponse.balance
    );

  const amountSpent =
    convertMoneyValue(
      accountResponse.amount_spent
    );

  const spendCap =
    convertMoneyValue(
      accountResponse.spend_cap
    );

  const amountSpentToday =
    Number(
      toNumber(
        todayInsights.spend
      ).toFixed(2)
    );

  const averageDailySpend =
    calculateAverageDailySpend(
      recentDailyInsights
    );

  /*
   * A previsão usa o campo balance
   * apenas quando a conta é pré-paga.
   *
   * Em contas pós-pagas, balance pode
   * representar um valor devido, não
   * necessariamente crédito disponível.
   */
  const balanceStatus =
    isPrepayAccount
      ? createBalanceStatus(
          accountBalance,
          averageDailySpend
        )
      : {
          estimatedDaysRemaining: null,
          trafficLight: "neutral",
          label:
            "Conta com cobrança pós-paga"
        };

  return {
    account: {
      id:
        accountResponse.id || null,

      accountId:
        accountResponse.account_id ||
        null,

      name:
        accountResponse.name || null,

      currency:
        accountResponse.currency ||
        "BRL",

      accountStatus:
        accountResponse.account_status ??
        null,

      timezone:
        accountResponse.timezone_name ||
        null,

      isPrepayAccount
    },

    financial: {
      balance:
        accountBalance,

      amountSpent,

      spendCap,

      amountSpentToday,

      averageDailySpend,

      estimatedDaysRemaining:
        balanceStatus
          .estimatedDaysRemaining,

      trafficLight:
        balanceStatus.trafficLight,

      statusLabel:
        balanceStatus.label
    },

    today: {
      spend:
        amountSpentToday,

      reach:
        Math.round(
          toNumber(
            todayInsights.reach
          )
        ),

      impressions:
        Math.round(
          toNumber(
            todayInsights.impressions
          )
        ),

      views:
        Math.round(
          toNumber(
            todayInsights.impressions
          )
        ),

      clicks:
        Math.round(
          toNumber(
            todayInsights.clicks
          )
        )
    },

    recentDailySpend:
      recentDailyInsights.map(
        (item) => ({
          date:
            item.date_start || null,

          spend:
            Number(
              toNumber(
                item.spend
              ).toFixed(2)
            )
        })
      ),

    updatedAt:
      new Date().toISOString()
  };
}
