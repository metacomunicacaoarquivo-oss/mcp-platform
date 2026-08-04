export function dashboardPage() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Central de Performance</title>

  <style>
    :root {
      --background: #f4f6f8;
      --surface: #ffffff;
      --surface-secondary: #f8fafc;
      --text: #172033;
      --text-secondary: #667085;
      --border: #e4e7ec;
      --primary: #2563eb;
      --success: #16a34a;
      --warning: #d97706;
      --danger: #dc2626;
      --radius: 18px;
      --shadow:
        0 10px 30px rgba(16, 24, 40, 0.07);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: var(--background);
      color: var(--text);
      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    button,
    input,
    select {
      font: inherit;
    }

    .container {
      width: min(1440px, calc(100% - 32px));
      margin: 0 auto;
      padding: 28px 0 60px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 28px;
    }

    .header h1 {
      margin: 0;
      font-size: clamp(26px, 4vw, 38px);
      letter-spacing: -0.04em;
    }

    .header p {
      margin: 8px 0 0;
      color: var(--text-secondary);
    }

    .filters {
      display: flex;
      align-items: end;
      gap: 12px;
      flex-wrap: wrap;
      padding: 16px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field label {
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 600;
    }

    .field input {
      height: 42px;
      padding: 0 12px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      outline: none;
    }

    .field input:focus {
      border-color: var(--primary);
    }

    .button {
      height: 42px;
      padding: 0 18px;
      color: #ffffff;
      font-weight: 700;
      background: var(--primary);
      border: 0;
      border-radius: 10px;
      cursor: pointer;
    }

    .button:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    .status {
      margin: 0 0 18px;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .status.error {
      color: var(--danger);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns:
        repeat(5, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 30px;
    }

    .metric-card {
      padding: 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .metric-card span {
      display: block;
      margin-bottom: 12px;
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 600;
    }

    .metric-card strong {
      display: block;
      font-size: clamp(22px, 3vw, 30px);
      letter-spacing: -0.04em;
    }

    .section-header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 18px;
      margin: 30px 0 16px;
    }

    .section-header h2 {
      margin: 0;
      font-size: 24px;
      letter-spacing: -0.03em;
    }

    .section-header p {
      margin: 5px 0 0;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .campaigns-grid {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .campaign-card {
      overflow: hidden;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .campaign-cover {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background:
        linear-gradient(
          135deg,
          #e2e8f0,
          #f8fafc
        );
    }

    .campaign-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .campaign-cover-placeholder {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: 20px;
      color: var(--text-secondary);
      text-align: center;
      font-size: 14px;
    }

    .scope-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 7px 10px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 800;
      background: rgba(23, 32, 51, 0.82);
      border-radius: 999px;
      backdrop-filter: blur(8px);
    }

    .campaign-content {
      padding: 18px;
    }

    .campaign-content h3 {
      margin: 0;
      font-size: 18px;
      line-height: 1.35;
    }

    .campaign-location {
      margin: 8px 0 18px;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .campaign-metrics {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .campaign-metric {
      padding: 12px;
      background: var(--surface-secondary);
      border-radius: 12px;
    }

    .campaign-metric span {
      display: block;
      margin-bottom: 5px;
      color: var(--text-secondary);
      font-size: 12px;
    }

    .campaign-metric strong {
      font-size: 16px;
    }

    .campaign-metric.coverage {
      grid-column: 1 / -1;
    }

    .empty-state {
      grid-column: 1 / -1;
      padding: 50px 20px;
      color: var(--text-secondary);
      text-align: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }

    @media (max-width: 1100px) {
      .metrics-grid {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
      }

      .campaigns-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .container {
        width: min(100% - 20px, 1440px);
        padding-top: 18px;
      }

      .header {
        flex-direction: column;
      }

      .filters {
        width: 100%;
      }

      .field {
        flex: 1;
        min-width: 130px;
      }

      .metrics-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }

      .campaigns-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 440px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .button {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <main class="container">
    <header class="header">
      <div>
        <h1>Central de Performance</h1>

        <p>
          Visão consolidada das campanhas de Meta Ads.
        </p>
      </div>

      <form class="filters" id="filtersForm">
        <div class="field">
          <label for="since">Data inicial</label>

          <input
            type="date"
            id="since"
            name="since"
            required
          >
        </div>

        <div class="field">
          <label for="until">Data final</label>

          <input
            type="date"
            id="until"
            name="until"
            required
          >
        </div>

        <button
          class="button"
          id="submitButton"
          type="submit"
        >
          Atualizar
        </button>
      </form>
    </header>

    <p class="status" id="status">
      Carregando informações...
    </p>

    <section
      class="metrics-grid"
      id="metricsGrid"
    ></section>

    <div class="section-header">
      <div>
        <h2>Campanhas</h2>

        <p>
          Indicadores simplificados para acompanhamento.
        </p>
      </div>
    </div>

    <section
      class="campaigns-grid"
      id="campaignsGrid"
    ></section>
  </main>

  <script>
    const filtersForm =
      document.getElementById("filtersForm");

    const sinceInput =
      document.getElementById("since");

    const untilInput =
      document.getElementById("until");

    const submitButton =
      document.getElementById("submitButton");

    const statusElement =
      document.getElementById("status");

    const metricsGrid =
      document.getElementById("metricsGrid");

    const campaignsGrid =
      document.getElementById("campaignsGrid");

    function formatNumber(value) {
      return new Intl.NumberFormat(
        "pt-BR"
      ).format(Number(value || 0));
    }

    function formatCurrency(value) {
      return new Intl.NumberFormat(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL"
        }
      ).format(Number(value || 0));
    }

    function formatPercentage(value) {
      const number = Number(value);

      if (!Number.isFinite(number)) {
        return "Não disponível";
      }

      return new Intl.NumberFormat(
        "pt-BR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      ).format(number) + "%";
    }

    function getDefaultPeriod() {
      const currentDate = new Date();

      const year =
        currentDate.getFullYear();

      const month = String(
        currentDate.getMonth() + 1
      ).padStart(2, "0");

      const lastDay = new Date(
        year,
        currentDate.getMonth() + 1,
        0
      ).getDate();

      return {
        since:
          year + "-" + month + "-01",

        until:
          year +
          "-" +
          month +
          "-" +
          String(lastDay).padStart(2, "0")
      };
    }

    function renderMetrics(summary = {}) {
      const metrics = [
        {
          label: "Investimento",
          value: formatCurrency(
            summary.totalSpend
          )
        },
        {
          label: "Alcance",
          value: formatNumber(
            summary.totalReach
          )
        },
        {
          label: "Visualizações",
          value: formatNumber(
            summary.totalViews
          )
        },
        {
          label: "Engajamentos",
          value: formatNumber(
            summary.totalEngagement
          )
        },
        {
          label: "Campanhas",
          value: formatNumber(
            summary.totalCampaigns
          )
        }
      ];

      metricsGrid.innerHTML = metrics
        .map(
          (metric) => \`
            <article class="metric-card">
              <span>\${metric.label}</span>
              <strong>\${metric.value}</strong>
            </article>
          \`
        )
        .join("");
    }

    function renderCampaigns(campaigns = []) {
      if (!campaigns.length) {
        campaignsGrid.innerHTML = \`
          <div class="empty-state">
            Nenhuma campanha foi encontrada
            no período selecionado.
          </div>
        \`;

        return;
      }

      campaignsGrid.innerHTML = campaigns
        .map((campaign) => {
          const performance =
            campaign.performance || {};

          const geographicScope =
            campaign.geographicScope || {};

          const ibge =
            campaign.ibge || {};

          const location =
            geographicScope.type === "municipal"
              ? geographicScope.municipality
              : "Tocantins";

          const cover =
            campaign.cover?.url
              ? \`
                <img
                  src="\${campaign.cover.url}"
                  alt="Capa da campanha"
                  loading="lazy"
                >
              \`
              : \`
                <div
                  class="campaign-cover-placeholder"
                >
                  Capa não disponível
                </div>
              \`;

          return \`
            <article class="campaign-card">
              <div class="campaign-cover">
                \${cover}

                <span class="scope-badge">
                  \${geographicScope.label ||
                    "Estadual"}
                </span>
              </div>

              <div class="campaign-content">
                <h3>
                  \${campaign.name ||
                    "Campanha sem nome"}
                </h3>

                <p class="campaign-location">
                  \${location || "Tocantins"}
                </p>

                <div class="campaign-metrics">
                  <div class="campaign-metric">
                    <span>Investimento</span>

                    <strong>
                      \${formatCurrency(
                        performance.spend
                      )}
                    </strong>
                  </div>

                  <div class="campaign-metric">
                    <span>Alcance</span>

                    <strong>
                      \${formatNumber(
                        performance.reach
                      )}
                    </strong>
                  </div>

                  <div class="campaign-metric">
                    <span>Visualizações</span>

                    <strong>
                      \${formatNumber(
                        performance.views
                      )}
                    </strong>
                  </div>

                  <div class="campaign-metric">
                    <span>Engajamentos</span>

                    <strong>
                      \${formatNumber(
                        performance.engagement
                      )}
                    </strong>
                  </div>

                  <div
                    class="
                      campaign-metric
                      coverage
                    "
                  >
                    <span>
                      Cobertura estimada da população
                    </span>

                    <strong>
                      \${formatPercentage(
                        ibge.coveragePercentage
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          \`;
        })
        .join("");
    }

    async function loadDashboard(
      since,
      until
    ) {
      submitButton.disabled = true;

      statusElement.className = "status";

      statusElement.textContent =
        "Carregando informações...";

      try {
        const endpoint =
          "/meta-ads/dashboard" +
          "?since=" +
          encodeURIComponent(since) +
          "&until=" +
          encodeURIComponent(until);

        const response = await fetch(endpoint);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
            "Não foi possível carregar o Dashboard."
          );
        }

        renderMetrics(
          result.data?.summary || {}
        );

        renderCampaigns(
          result.data?.campaigns || []
        );

        statusElement.textContent =
          "Dados atualizados para o período de " +
          since +
          " a " +
          until +
          ".";
      } catch (error) {
        metricsGrid.innerHTML = "";

        campaignsGrid.innerHTML = "";

        statusElement.className =
          "status error";

        statusElement.textContent =
          error.message ||
          "Ocorreu um erro ao carregar os dados.";
      } finally {
        submitButton.disabled = false;
      }
    }

    filtersForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        loadDashboard(
          sinceInput.value,
          untilInput.value
        );
      }
    );

    const defaultPeriod =
      getDefaultPeriod();

    sinceInput.value =
      defaultPeriod.since;

    untilInput.value =
      defaultPeriod.until;

    loadDashboard(
      defaultPeriod.since,
      defaultPeriod.until
    );
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type":
        "text/html; charset=UTF-8",

      "cache-control":
        "no-store"
    }
  });
}
