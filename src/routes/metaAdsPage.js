export function metaAdsPage() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="description"
    content="Módulo Meta Ads da Central de Performance"
  >

  <title>Meta Ads | Central de Performance</title>

  <style>
    :root {
      --background: #f4f6fa;
      --surface: #ffffff;
      --surface-soft: #f8fafc;

      --text: #172033;
      --text-soft: #667085;
      --text-light: #98a2b3;

      --border: #e4e7ec;
      --border-strong: #d0d5dd;

      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --primary-soft: #eff6ff;

      --success: #16a34a;
      --success-soft: #f0fdf4;

      --warning: #d97706;
      --warning-soft: #fffbeb;

      --danger: #dc2626;
      --danger-soft: #fef2f2;

      --sidebar-width: 252px;
      --topbar-height: 76px;

      --radius-small: 10px;
      --radius-medium: 14px;
      --radius-large: 20px;

      --shadow:
        0 8px 24px rgba(16, 24, 40, 0.06);
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text);
      background: var(--background);
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

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .app {
      min-height: 100vh;
    }

    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 40;
      width: var(--sidebar-width);
      display: flex;
      flex-direction: column;
      color: #ffffff;
      background: #111827;
      border-right:
        1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.25s ease;
    }

    .sidebar-brand {
      min-height: var(--topbar-height);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
      border-bottom:
        1px solid rgba(255, 255, 255, 0.08);
    }

    .brand-mark {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      font-size: 17px;
      font-weight: 900;
      background:
        linear-gradient(
          135deg,
          #3b82f6,
          #2563eb
        );
      border-radius: 12px;
    }

    .brand-text strong {
      display: block;
      font-size: 14px;
      line-height: 1.25;
    }

    .brand-text span {
      display: block;
      margin-top: 3px;
      color: rgba(255, 255, 255, 0.55);
      font-size: 10px;
    }

    .navigation {
      flex: 1;
      overflow-y: auto;
      padding: 22px 14px;
    }

    .navigation-label {
      margin: 0 10px 9px;
      color: rgba(255, 255, 255, 0.38);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .navigation-group {
      display: grid;
      gap: 5px;
      margin-bottom: 24px;
    }

    .navigation-item {
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 13px;
      color: rgba(255, 255, 255, 0.68);
      background: transparent;
      border: 0;
      border-radius: 11px;
      transition:
        color 0.18s ease,
        background 0.18s ease;
    }

    .navigation-item:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.07);
    }

    .navigation-item.active {
      color: #ffffff;
      font-weight: 700;
      background: rgba(37, 99, 235, 0.92);
    }

    .navigation-item.disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    .navigation-icon {
      width: 22px;
      text-align: center;
      flex-shrink: 0;
    }

    .navigation-text {
      flex: 1;
      font-size: 13px;
    }

    .navigation-status {
      padding: 3px 7px;
      color: rgba(255, 255, 255, 0.75);
      font-size: 8px;
      font-weight: 800;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
    }

    .sidebar-footer {
      padding: 14px;
      border-top:
        1px solid rgba(255, 255, 255, 0.08);
    }

    .system-card {
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border:
        1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
    }

    .developer-credit {
      display: block;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.82);
      font-size: 9px;
      font-weight: 700;
    }

    .system-status {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 10px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      flex-shrink: 0;
      background: #22c55e;
      border-radius: 50%;
      box-shadow:
        0 0 0 4px rgba(34, 197, 94, 0.13);
    }

    .main {
      min-height: 100vh;
      margin-left: var(--sidebar-width);
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      min-height: var(--topbar-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 12px 28px;
      background: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(14px);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .menu-button {
      width: 42px;
      height: 42px;
      display: none;
      place-items: center;
      color: var(--text);
      background: var(--surface-soft);
      border: 1px solid var(--border);
      border-radius: 11px;
    }

.performance-header {
  display: grid;
  gap: 3px;
}

.performance-eyebrow {
  color: #f97316;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.performance-header h1 {
  margin: 0;
  color: var(--text);
  font-size: 22px;
  letter-spacing: -0.04em;
}

.performance-header h1 strong {
  color: #f97316;
}

.performance-header p {
  margin: 2px 0 0;
  color: var(--text-soft);
  font-size: 10px;
}

    .topbar-title h1 {
      margin: 0;
      font-size: 20px;
      letter-spacing: -0.03em;
    }

    .topbar-title p {
      margin: 4px 0 0;
      color: var(--text-soft);
      font-size: 11px;
    }

    .topbar-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      color: var(--primary);
      font-size: 11px;
      font-weight: 800;
      background: var(--primary-soft);
      border: 1px solid #dbeafe;
      border-radius: 999px;
    }

    .content {
      width: min(1560px, 100%);
      margin: 0 auto;
      padding: 28px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 22px;
    }

    .page-copy h2 {
      margin: 0;
      font-size: clamp(26px, 3vw, 36px);
      letter-spacing: -0.045em;
    }

    .page-copy p {
      max-width: 680px;
      margin: 8px 0 0;
      color: var(--text-soft);
      line-height: 1.6;
    }

    .period-form {
      display: flex;
      align-items: end;
      gap: 10px;
      padding: 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-medium);
      box-shadow: var(--shadow);
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field label {
      color: var(--text-soft);
      font-size: 10px;
      font-weight: 700;
    }

    .field input,
    .field select {
      height: 42px;
      min-width: 145px;
      padding: 0 11px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
      outline: none;
    }

    .field input:focus,
    .field select:focus {
      border-color: var(--primary);
      box-shadow:
        0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .primary-button {
      height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 17px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 800;
      background: var(--primary);
      border: 0;
      border-radius: var(--radius-small);
    }

    .primary-button:hover {
      background: var(--primary-dark);
    }

    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    .feedback {
      display: none;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 20px;
      padding: 14px 16px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: var(--radius-medium);
    }

    .feedback.visible {
      display: flex;
    }

    .feedback.loading {
      color: var(--primary-dark);
      background: var(--primary-soft);
      border: 1px solid #bfdbfe;
    }

    .feedback.success {
      color: #166534;
      background: var(--success-soft);
      border: 1px solid #bbf7d0;
    }

    .feedback.error {
      color: #991b1b;
      background: var(--danger-soft);
      border: 1px solid #fecaca;
    }

    .tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      margin-bottom: 20px;
      padding-bottom: 2px;
    }

    .tab-button {
      min-height: 40px;
      padding: 0 14px;
      color: var(--text-soft);
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
    }

    .tab-button.active {
      color: #ffffff;
      background: var(--primary);
      border-color: var(--primary);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns:
        repeat(6, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 22px;
    }

    .metric-card {
  min-width: 0;
  min-height: 132px;
  overflow: hidden;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow);
}

    .metric-label {
      display: block;
      color: var(--text-soft);
      font-size: 11px;
      font-weight: 700;
    }

    .metric-value {
  display: block;
  width: 100%;
  min-width: 0;
  margin-top: 17px;
  font-size: clamp(17px, 1.55vw, 26px);
  line-height: 1.15;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

    .metric-note {
      display: block;
      margin-top: 8px;
      color: var(--text-light);
      font-size: 9px;
    }

    .panel {
      margin-bottom: 20px;
      padding: 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-large);
      box-shadow: var(--shadow);
    }

    .panel-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 16px;
    }

    .panel-title h3 {
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.025em;
    }

    .panel-title p {
      margin: 5px 0 0;
      color: var(--text-soft);
      font-size: 11px;
    }

    .panel-controls {
      display: flex;
      align-items: center;
      gap: 9px;
      flex-wrap: wrap;
    }

    .search-input {
      width: 240px;
      height: 40px;
      padding: 0 12px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
      outline: none;
    }

    .filter-select {
      height: 40px;
      padding: 0 30px 0 11px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
      outline: none;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: var(--radius-medium);
    }

    table {
      width: 100%;
      min-width: 1050px;
      border-collapse: collapse;
    }

    th {
      padding: 13px 14px;
      color: var(--text-soft);
      font-size: 10px;
      font-weight: 800;
      text-align: left;
      background: var(--surface-soft);
      border-bottom: 1px solid var(--border);
    }

    td {
      padding: 14px;
      font-size: 11px;
      vertical-align: middle;
      border-bottom: 1px solid var(--border);
    }

    tbody tr:last-child td {
      border-bottom: 0;
    }

    tbody tr:hover {
      background: #fbfcfe;
    }

.campaign-cell {
  min-width: 330px;
}

.campaign-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.campaign-thumbnail {
  width: 52px;
  height: 52px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.campaign-thumbnail img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.campaign-thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-light);
  font-size: 16px;
}

.campaign-text {
  min-width: 0;
}

.campaign-text strong {
  display: block;
  max-width: 330px;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-text span {
  display: block;
  margin-top: 5px;
  color: var(--text-light);
  font-size: 9px;
}

.ranking-list {
  display: grid;
  gap: 14px;
}

.ranking-card {
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
}

.ranking-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.ranking-position {
  min-width: 42px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ea580c;
  font-size: 12px;
  font-weight: 900;
  background: #ffedd5;
  border-radius: 8px;
}

.ranking-campaign {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ranking-thumbnail {
  width: 58px;
  height: 58px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.ranking-thumbnail img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.ranking-thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-light);
  font-size: 18px;
}

.ranking-campaign-text {
  min-width: 0;
}

.ranking-campaign-text strong {
  display: block;
  overflow: hidden;
  color: var(--text);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-campaign-text span {
  display: block;
  margin-top: 5px;
  color: var(--text-soft);
  font-size: 9px;
}

.ranking-metrics {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.ranking-metric {
  min-height: 68px;
  display: grid;
  place-content: center;
  padding: 10px;
  text-align: center;
  background: var(--surface-soft);
  border-radius: 9px;
}

.ranking-metric strong {
  color: var(--text);
  font-size: 14px;
}

.ranking-metric span {
  margin-top: 4px;
  color: var(--text-soft);
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.ranking-coverage strong {
  color: #ea580c;
}

.ranking-population-note {
  margin-top: 10px;
  color: var(--text-light);
  font-size: 8px;
  line-height: 1.5;
}

@media (max-width: 780px) {
  .ranking-metrics {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .ranking-card-header {
    align-items: flex-start;
  }

  .ranking-campaign {
    align-items: flex-start;
  }

  .ranking-thumbnail {
    width: 50px;
    height: 50px;
  }

  .ranking-campaign-text strong {
    white-space: normal;
  }

  .ranking-metrics {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

.daily-summary-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.daily-summary-card {
  min-width: 0;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow);
}

.daily-summary-card span {
  display: block;
  color: var(--text-soft);
  font-size: 10px;
  font-weight: 700;
}

.daily-summary-card strong {
  display: block;
  margin-top: 12px;
  overflow: hidden;
  font-size: clamp(18px, 2vw, 27px);
  line-height: 1.15;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.daily-account-table table {
  min-width: 520px;
}

.daily-ad-name {
  min-width: 300px;
}

.daily-ad-name strong {
  display: block;
  color: var(--text);
  font-size: 11px;
}

.daily-ad-name span {
  display: block;
  max-width: 330px;
  margin-top: 5px;
  overflow: hidden;
  color: var(--text-light);
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1020px) {
  .daily-summary-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .daily-summary-grid {
    grid-template-columns: 1fr;
  }
}

.balance-status-card {
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
}

.balance-status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-bottom: 1px solid var(--border);
}

.balance-status-header strong {
  display: block;
  font-size: 15px;
}

.balance-status-header span {
  display: block;
  margin-top: 4px;
  color: var(--text-soft);
  font-size: 10px;
}

.balance-light {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: var(--text-light);
  border-radius: 50%;
  box-shadow:
    0 0 0 6px rgba(152, 162, 179, 0.14);
}

.balance-status-card.green
.balance-light {
  background: var(--success);
  box-shadow:
    0 0 0 6px rgba(22, 163, 74, 0.14);
}

.balance-status-card.yellow
.balance-light {
  background: var(--warning);
  box-shadow:
    0 0 0 6px rgba(217, 119, 6, 0.14);
}

.balance-status-card.red
.balance-light {
  background: var(--danger);
  box-shadow:
    0 0 0 6px rgba(220, 38, 38, 0.14);
}

.balance-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
}

.balance-metric {
  min-width: 0;
  padding: 18px;
  background: var(--surface);
}

.balance-metric span {
  display: block;
  color: var(--text-soft);
  font-size: 10px;
  font-weight: 700;
}

.balance-metric strong {
  display: block;
  margin-top: 10px;
  overflow: hidden;
  font-size: clamp(17px, 2vw, 25px);
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.balance-footer {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 13px 18px;
  color: var(--text-light);
  font-size: 9px;
  background: var(--surface-soft);
}

@media (max-width: 780px) {
  .balance-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .balance-footer {
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .balance-grid {
    grid-template-columns: 1fr;
  }
}

    .status-badge {
      display: inline-flex;
      align-items: center;
      min-height: 26px;
      padding: 0 9px;
      font-size: 9px;
      font-weight: 900;
      border-radius: 999px;
    }

    .status-badge.active {
      color: #166534;
      background: var(--success-soft);
    }

    .status-badge.ended {
      color: #475569;
      background: #f1f5f9;
    }

    .scope-badge {
      display: inline-flex;
      align-items: center;
      min-height: 25px;
      padding: 0 8px;
      color: var(--primary);
      font-size: 9px;
      font-weight: 800;
      background: var(--primary-soft);
      border-radius: 999px;
    }

    .empty-state {
      min-height: 220px;
      display: grid;
      place-items: center;
      padding: 35px;
      color: var(--text-soft);
      text-align: center;
    }

    .empty-state strong {
      display: block;
      margin-bottom: 7px;
      color: var(--text);
    }

    .section-content {
      display: none;
    }

    .section-content.active {
      display: block;
    }

    .placeholder-grid {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 15px;
    }

    .placeholder-card {
      min-height: 150px;
      padding: 18px;
      background: var(--surface-soft);
      border: 1px solid var(--border);
      border-radius: var(--radius-medium);
    }

    .placeholder-card strong {
      display: block;
      font-size: 13px;
    }

    .placeholder-card p {
      margin: 8px 0 0;
      color: var(--text-soft);
      font-size: 10px;
      line-height: 1.5;
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      z-index: 35;
      display: none;
      background: rgba(15, 23, 42, 0.55);
    }

    @media (max-width: 1280px) {
      .metrics-grid {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
      }

      .placeholder-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 1020px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-overlay.visible {
        display: block;
      }

      .main {
        margin-left: 0;
      }

      .menu-button {
        display: grid;
      }
    }

    @media (max-width: 780px) {
      .topbar {
        padding: 11px 16px;
      }

      .content {
        padding: 20px 15px 45px;
      }

      .page-header {
        align-items: stretch;
        flex-direction: column;
      }

      .period-form {
        width: 100%;
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        align-items: end;
        gap: 12px;
      }

      .period-form .field,
      .period-form input {
        width: 100%;
        min-width: 0;
      }

      .period-form .primary-button {
        width: 100%;
        grid-column: 1 / -1;
      }

      .metrics-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }

      .panel-header {
        align-items: stretch;
        flex-direction: column;
      }

      .panel-controls {
        display: grid;
        grid-template-columns: 1fr;
      }

      .search-input,
      .filter-select {
        width: 100%;
      }
    }

    @media (max-width: 520px) {
      .topbar-title p,
      .topbar-badge {
        display: none;
      }

      .period-form {
        grid-template-columns: 1fr;
      }

      .period-form .primary-button {
        grid-column: auto;
      }

      .metrics-grid,
      .placeholder-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">M</div>

        <div class="brand-text">
          <strong>Central de Performance</strong>
          <span>Meta Comunicação</span>
        </div>
      </div>

      <nav class="navigation">
        <p class="navigation-label">Visão geral</p>

        <div class="navigation-group">
          <a
            href="/dashboard"
            class="navigation-item"
          >
            <span class="navigation-icon">⌂</span>
            <span class="navigation-text">Dashboard</span>
          </a>
        </div>

        <p class="navigation-label">Desempenho</p>

        <div class="navigation-group">
          <a
            href="/meta-ads"
            class="navigation-item active"
          >
            <span class="navigation-icon">◉</span>
            <span class="navigation-text">Meta Ads</span>
          </a>

          <span class="navigation-item disabled">
            <span class="navigation-icon">◎</span>

            <span class="navigation-text">
              Instagram e Facebook
            </span>

            <span class="navigation-status">
              Em breve
            </span>
          </span>
        </div>

        <p class="navigation-label">Análises</p>

        <div class="navigation-group">
          <span class="navigation-item disabled">
            <span class="navigation-icon">▦</span>
            <span class="navigation-text">Emendas x Votos</span>
            <span class="navigation-status">Em breve</span>
          </span>

          <span class="navigation-item disabled">
            <span class="navigation-icon">⌖</span>
            <span class="navigation-text">IBGE x Votos</span>
            <span class="navigation-status">Em breve</span>
          </span>
        </div>

        <p class="navigation-label">Inteligência</p>

        <div class="navigation-group">
          <span class="navigation-item disabled">
            <span class="navigation-icon">✦</span>
            <span class="navigation-text">Assistente de IA</span>
            <span class="navigation-status">
              Em construção
            </span>
          </span>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="system-card">
          <span class="developer-credit">
            Desenvolvido por Henrique Rodrigues
          </span>

          <div class="system-status">
            <span class="status-dot"></span>
            <span>Sistema disponível</span>
          </div>
        </div>
      </div>
    </aside>

    <div
      class="sidebar-overlay"
      id="sidebarOverlay"
    ></div>

    <div class="main">
      <header class="topbar">
        <div class="topbar-left">
          <button
            type="button"
            class="menu-button"
            id="menuButton"
            aria-label="Abrir menu"
          >
            ☰
          </button>

         <div class="topbar-title performance-header">
  <span class="performance-eyebrow">
    META COMUNICAÇÃO • DOCUMENTO INTERATIVO
  </span>

  <h1>
    Central de
    <strong>Performance</strong>
  </h1>

  <p>
    Acompanhamento de campanhas, resultados e análises.
            </p>
          </div>
        </div>

        <span class="topbar-badge">
          ◉ Integração Meta
        </span>
      </header>

      <main class="content">
        <section class="page-header">
          <div class="page-copy">
            <h2>Desempenho de anúncios</h2>

            <p>
              Consulte os principais resultados das campanhas,
              conjuntos, anúncios e criativos da conta.
            </p>
          </div>

          <form
            class="period-form"
            id="periodForm"
          >
            <div class="field">
              <label for="since">
                Data inicial
              </label>

              <input
                type="date"
                id="since"
                required
              >
            </div>

            <div class="field">
              <label for="until">
                Data final
              </label>

              <input
                type="date"
                id="until"
                required
              >
            </div>

            <button
              type="submit"
              class="primary-button"
              id="updateButton"
            >
              ↻ Atualizar
            </button>
          </form>
        </section>

        <div
          class="feedback loading visible"
          id="feedback"
        >
          <span>◌</span>

          <span id="feedbackText">
            Carregando informações...
          </span>
        </div>

              <nav class="tabs">
          <button
            type="button"
            class="tab-button active"
            data-section="overview"
          >
            Visão geral
          </button>

          <button
            type="button"
            class="tab-button"
            data-section="daily-spend"
          >
            Gasto diário
          </button>

          <button
            type="button"
            class="tab-button"
            data-section="account-balance"
          >
            Saldo da conta
          </button>

          <button
            type="button"
            class="tab-button"
            data-section="ranking"
          >
            Ranking
          </button>

          <!--
            Abas preservadas no código para uso futuro:
            Campanhas, Conjuntos, Anúncios,
            Criativos e Municípios.
          -->
        </nav>

        <section
  class="section-content active"
  id="section-overview"
>
  <div
    class="metrics-grid"
    id="metricsGrid"
  ></div>

  <article class="panel">
    <div class="panel-header">
      <div class="panel-title">
        <h3>Campanhas</h3>

        <p>
          Todas as campanhas encontradas no período selecionado.
        </p>
      </div>

      <div class="panel-controls">
        <input
          type="search"
          class="search-input"
          id="campaignSearch"
          placeholder="Pesquisar campanha"
        >

        <select
          class="filter-select"
          id="campaignStatusFilter"
        >
          <option value="all">
            Todas as situações
          </option>

          <option value="active">
            Ativas
          </option>

          <option value="ended">
            Encerradas
          </option>
        </select>

        <select
          class="filter-select"
          id="campaignScopeFilter"
        >
          <option value="all">
            Todos os âmbitos
          </option>

          <option value="municipal">
            Municipais
          </option>

          <option value="state">
            Estaduais
          </option>
        </select>
      </div>
    </div>

    <div
      class="table-wrapper"
      id="campaignsTable"
    ></div>
  </article>
</section>

        <section
          class="section-content"
          id="section-adsets"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Conjuntos de anúncios</h3>

                <p>
                  Organização dos conjuntos vinculados às campanhas.
                </p>
              </div>
            </div>

            <div
              class="placeholder-grid"
              id="adSetsSummary"
            ></div>
          </article>
        </section>

        <section
          class="section-content"
          id="section-ads"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Anúncios</h3>

                <p>
                  Visão consolidada dos anúncios encontrados.
                </p>
              </div>
            </div>

            <div
              class="placeholder-grid"
              id="adsSummary"
            ></div>
          </article>
        </section>

        <section
          class="section-content"
          id="section-creatives"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Criativos</h3>

                <p>
                  Imagens, vídeos e demais conteúdos dos anúncios.
                </p>
              </div>
            </div>

            <div
              class="placeholder-grid"
              id="creativesSummary"
            ></div>
          </article>
        </section>

        <section
          class="section-content"
          id="section-daily-spend"
        >
          <div
            class="daily-summary-grid"
            id="dailySummary"
          ></div>

          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Gasto total diário da conta</h3>

                <p>
                  Valor investido pela conta em cada dia
                  do período selecionado.
                </p>
              </div>
            </div>

            <div
              class="table-wrapper daily-account-table"
              id="dailyAccountTable"
            ></div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Gasto diário por anúncio</h3>

                <p>
                  Anúncios organizados do maior gasto
                  para o menor.
                </p>
              </div>
            </div>

            <div
              class="table-wrapper"
              id="dailyAdsTable"
            ></div>
          </article>
        </section>

               <section
          class="section-content"
          id="section-account-balance"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Saldo da conta</h3>

                <p>
                  Situação atual, consumo diário
                  e previsão de duração do saldo.
                </p>
              </div>
            </div>

            <div
              id="accountBalanceContent"
            >
              <div class="empty-state">
                <div>
                  <strong>
                    Carregando saldo da conta
                  </strong>

                  <span>
                    Aguarde a consulta à Meta.
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section
          class="section-content"
          id="section-ranking"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Ranking</h3>

                <p>
                  Campanhas com os melhores resultados do período.
                </p>
              </div>
            </div>

            <div
              class="table-wrapper"
              id="rankingTable"
            ></div>
          </article>
        </section>

        <section
          class="section-content"
          id="section-municipalities"
        >
          <article class="panel">
            <div class="panel-header">
              <div class="panel-title">
                <h3>Municípios e cobertura</h3>

                <p>
                  Comparação do alcance com a população estimada.
                </p>
              </div>
            </div>

            <div
              class="table-wrapper"
              id="municipalitiesTable"
            ></div>
          </article>
        </section>
      </main>
    </div>
  </div>

  <script>
         const state = {
      campaigns: [],
      summary: {},
      ranking: {},
      geography: {},

      daily: {
        account: [],
        ads: []
      },

      accountStatus: null
    };
    const sidebar =
      document.getElementById("sidebar");

    const sidebarOverlay =
      document.getElementById("sidebarOverlay");

    const menuButton =
      document.getElementById("menuButton");

    const periodForm =
      document.getElementById("periodForm");

    const sinceInput =
      document.getElementById("since");

    const untilInput =
      document.getElementById("until");

    const updateButton =
      document.getElementById("updateButton");

    const feedback =
      document.getElementById("feedback");

    const feedbackText =
      document.getElementById("feedbackText");

    const metricsGrid =
      document.getElementById("metricsGrid");

    const campaignsTable =
      document.getElementById("campaignsTable");

    const rankingTable =
      document.getElementById("rankingTable");

    const municipalitiesTable =
      document.getElementById("municipalitiesTable");

    const campaignSearch =
      document.getElementById("campaignSearch");

    const campaignStatusFilter =
      document.getElementById("campaignStatusFilter");

    const campaignScopeFilter =
      document.getElementById("campaignScopeFilter");

    const adSetsSummary =
      document.getElementById("adSetsSummary");

    const adsSummary =
      document.getElementById("adsSummary");

    const creativesSummary =
      document.getElementById("creativesSummary");

          const dailySummary =
      document.getElementById("dailySummary");

    const dailyAccountTable =
      document.getElementById(
        "dailyAccountTable"
      );

    const dailyAdsTable =
      document.getElementById(
        "dailyAdsTable"
      );

    const accountBalanceContent =
      document.getElementById(
        "accountBalanceContent"
      );

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

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

        function formatDate(value) {
      if (!value) {
        return "Data não disponível";
      }

      const parts =
        String(value).split("-");

      if (parts.length !== 3) {
        return String(value);
      }

      return (
        parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0]
      );
    }

    function getTodayDate() {
      const currentDate =
        new Date();

      const year =
        currentDate.getFullYear();

      const month =
        String(
          currentDate.getMonth() + 1
        ).padStart(2, "0");

      const day =
        String(
          currentDate.getDate()
        ).padStart(2, "0");

      return (
        year +
        "-" +
        month +
        "-" +
        day
      );
    }

    function formatDateTime(value) {
      if (!value) {
        return "Não disponível";
      }

      const date =
        new Date(value);

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return String(value);
      }

      return new Intl.DateTimeFormat(
        "pt-BR",
        {
          dateStyle: "short",
          timeStyle: "short",
          timeZone:
            "America/Sao_Paulo"
        }
      ).format(date);
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

    function isCampaignActive(campaign) {
      const effectiveStatus =
        String(
          campaign.effective_status || ""
        ).toUpperCase();

      const status =
        String(
          campaign.status || ""
        ).toUpperCase();

      return (
        effectiveStatus === "ACTIVE" ||
        status === "ACTIVE"
      );
    }

    function setFeedback(type, message) {
      feedback.className =
        "feedback visible " + type;

      feedbackText.textContent = message;
    }

    function hideFeedback() {
      feedback.className = "feedback";
    }

    function getDefaultPeriod() {
      const currentDate = new Date();

      const year =
        currentDate.getFullYear();

      const month =
        String(
          currentDate.getMonth() + 1
        ).padStart(2, "0");

      const lastDay =
        new Date(
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

    function renderMetrics(summary) {
      const metrics = [
        {
          label: "Investimento",
          value: formatCurrency(
            summary.totalSpend
          ),
          note: "Valor investido"
        },
        {
          label: "Alcance",
          value: formatNumber(
            summary.totalReach
          ),
          note: "Pessoas alcançadas"
        },
        {
          label: "Visualizações",
          value: formatNumber(
            summary.totalViews
          ),
          note: "Exibições dos anúncios"
        },
        {
          label: "Cliques",
          value: formatNumber(
            summary.totalClicks
          ),
          note: "Cliques registrados"
        },
        {
          label: "Engajamentos",
          value: formatNumber(
            summary.totalEngagement
          ),
          note: "Interações"
        },
        {
          label: "Campanhas",
          value: formatNumber(
            summary.totalCampaigns
          ),
          note: "Campanhas analisadas"
        }
      ];

      metricsGrid.innerHTML =
        metrics
          .map(function (metric) {
            return (
              '<article class="metric-card">' +
                '<span class="metric-label">' +
                  escapeHtml(metric.label) +
                '</span>' +
                '<strong class="metric-value">' +
                  escapeHtml(metric.value) +
                '</strong>' +
                '<span class="metric-note">' +
                  escapeHtml(metric.note) +
                '</span>' +
              '</article>'
            );
          })
          .join("");
    }

    function getCampaignLocation(campaign) {
      if (
        campaign.geographicScope?.type ===
        "municipal"
      ) {
        return (
          campaign.geographicScope
            .municipality || "Município"
        );
      }

      return "Tocantins";
    }

    function createCampaignRows(campaigns) {
      return campaigns
        .map(function (campaign) {
          const performance =
            campaign.performance || {};

          const active =
            isCampaignActive(campaign);

          const scope =
            campaign.geographicScope?.type ||
            "state";

          return (
            "<tr>" +
              '<td class="campaign-cell">' +
  '<div class="campaign-info">' +

    (
      campaign.cover?.url
        ? (
            '<div class="campaign-thumbnail">' +
              '<img' +
                ' src="' +
                escapeHtml(
                  campaign.cover.url
                ) +
                '"' +
                ' alt="Imagem da campanha"' +
                ' loading="lazy"' +
              '>' +
            '</div>'
          )
        : (
            '<div class="campaign-thumbnail">' +
              '<div class="campaign-thumbnail-placeholder">' +
                '◉' +
              '</div>' +
            '</div>'
          )
    ) +

    '<div class="campaign-text">' +
      "<strong>" +
        escapeHtml(
          campaign.name ||
          "Campanha sem nome"
        ) +
      "</strong>" +

      "<span>" +
        escapeHtml(
          getCampaignLocation(campaign)
        ) +
      "</span>" +
    "</div>" +
  "</div>" +
"</td>" +

              "<td>" +
                '<span class="status-badge ' +
                  (active ? "active" : "ended") +
                '">' +
                  (active ? "Ativa" : "Encerrada") +
                "</span>" +
              "</td>" +

              "<td>" +
                '<span class="scope-badge">' +
                  (
                    scope === "municipal"
                      ? "Municipal"
                      : "Estadual"
                  ) +
                "</span>" +
              "</td>" +

              "<td>" +
                formatCurrency(
                  performance.spend
                ) +
              "</td>" +

              "<td>" +
                formatNumber(
                  performance.reach
                ) +
              "</td>" +

              "<td>" +
                formatNumber(
                  performance.views
                ) +
              "</td>" +

              "<td>" +
                formatNumber(
                  performance.clicks
                ) +
              "</td>" +

              "<td>" +
                formatNumber(
                  performance.engagement
                ) +
              "</td>" +

              "<td>" +
                formatPercentage(
                  campaign.ibge
                    ?.coveragePercentage
                ) +
              "</td>" +
            "</tr>"
          );
        })
        .join("");
    }

    function renderCampaignTable(
      element,
      campaigns
    ) {
      if (!campaigns.length) {
        element.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Nenhuma campanha encontrada</strong>" +
              "<span>Revise o período ou os filtros.</span>" +
            "</div>" +
          "</div>";

        return;
      }

      element.innerHTML =
        "<table>" +
          "<thead>" +
            "<tr>" +
              "<th>Campanha</th>" +
              "<th>Situação</th>" +
              "<th>Âmbito</th>" +
              "<th>Investimento</th>" +
              "<th>Alcance</th>" +
              "<th>Visualizações</th>" +
              "<th>Cliques</th>" +
              "<th>Engajamentos</th>" +
              "<th>Cobertura</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            createCampaignRows(campaigns) +
          "</tbody>" +
        "</table>";
    }

    function renderFilteredCampaigns() {
      const search =
        campaignSearch.value
          .trim()
          .toLowerCase();

      const status =
        campaignStatusFilter.value;

      const scope =
        campaignScopeFilter.value;

      const filtered =
        state.campaigns.filter(
          function (campaign) {
            const name =
              String(
                campaign.name || ""
              ).toLowerCase();

            const active =
              isCampaignActive(campaign);

            const campaignScope =
              campaign.geographicScope
                ?.type || "state";

            const matchesSearch =
              !search ||
              name.includes(search);

            const matchesStatus =
              status === "all" ||
              (
                status === "active" &&
                active
              ) ||
              (
                status === "ended" &&
                !active
              );

            const matchesScope =
              scope === "all" ||
              campaignScope === scope;

            return (
              matchesSearch &&
              matchesStatus &&
              matchesScope
            );
          }
        );

      renderCampaignTable(
        campaignsTable,
        filtered
      );
    }

    function renderRanking(ranking) {
  const items =
    ranking.reach ||
    ranking.alcance ||
    [];

  if (!items.length) {
    rankingTable.innerHTML =
      '<div class="empty-state">' +
        "<div>" +
          "<strong>Ranking indisponível</strong>" +
          "<span>Não há dados para o período.</span>" +
        "</div>" +
      "</div>";

    return;
  }

  const rankingItems =
    items
      .map(function (item) {
        const campaign =
          state.campaigns.find(
            function (campaignItem) {
              return (
                String(campaignItem.id) ===
                String(item.campaignId)
              );
            }
          );

        if (!campaign) {
          return {
            position: item.position,
            campaignName:
              item.campaignName ||
              "Campanha",
            reach: Number(item.value || 0),
            views: 0,
            engagement: 0,
            population: 0,
            coveragePercentage: 0,
            scope: "Estadual",
            location: "Tocantins",
            coverUrl: null
          };
        }

        const performance =
          campaign.performance || {};

        const population =
          Number(
            campaign.ibge?.population || 0
          );

        const reach =
          Number(
            performance.reach ??
            item.value ??
            0
          );

        const calculatedCoverage =
          population > 0
            ? (reach / population) * 100
            : 0;

        const coverageFromApi =
          Number(
            campaign.ibge
              ?.coveragePercentage
          );

        const coveragePercentage =
          Number.isFinite(coverageFromApi) &&
          coverageFromApi > 0
            ? coverageFromApi
            : calculatedCoverage;

        const isMunicipal =
          campaign.geographicScope?.type ===
          "municipal";

        const coverUrl =
          campaign.cover?.url ||
          campaign.adSets?.[0]
            ?.ads?.[0]?.coverUrl ||
          campaign.adSets?.[0]
            ?.ads?.[0]
            ?.creative?.thumbnailUrl ||
          null;

        return {
          position: item.position,
          campaignName:
            campaign.name ||
            item.campaignName ||
            "Campanha",
          reach,
          views:
            Number(
              performance.views || 0
            ),
          engagement:
            Number(
              performance.engagement || 0
            ),
          population,
          coveragePercentage,
          scope:
            isMunicipal
              ? "Municipal"
              : "Estadual",
          location:
            isMunicipal
              ? (
                  campaign.geographicScope
                    ?.municipality ||
                  campaign.ibge
                    ?.municipality ||
                  "Município"
                )
              : "Tocantins",
          coverUrl
        };
      })
      .slice(0, 10);

  rankingTable.innerHTML =
    '<div class="ranking-list">' +
      rankingItems
        .map(function (item, index) {
          const position =
            item.position ||
            index + 1;

          const coverageText =
            item.population > 0
              ? formatPercentage(
                  item.coveragePercentage
                )
              : "Não disponível";

          return (
            '<article class="ranking-card">' +

              '<div class="ranking-card-header">' +

                '<div class="ranking-position">' +
                  "#" +
                  position +
                "</div>" +

                '<div class="ranking-campaign">' +

                  (
                    item.coverUrl
                      ? (
                          '<div class="ranking-thumbnail">' +
                            '<img' +
                              ' src="' +
                              escapeHtml(
                                item.coverUrl
                              ) +
                              '"' +
                              ' alt="Imagem da campanha"' +
                              ' loading="lazy"' +
                            ">" +
                          "</div>"
                        )
                      : (
                          '<div class="ranking-thumbnail">' +
                            '<div class="ranking-thumbnail-placeholder">' +
                              "◉" +
                            "</div>" +
                          "</div>"
                        )
                  ) +

                  '<div class="ranking-campaign-text">' +
                    "<strong>" +
                      escapeHtml(
                        item.campaignName
                      ) +
                    "</strong>" +

                    "<span>" +
                      escapeHtml(
                        item.scope +
                        " • " +
                        item.location
                      ) +
                    "</span>" +
                  "</div>" +

                "</div>" +

              "</div>" +

              '<div class="ranking-metrics">' +

                '<div class="ranking-metric">' +
                  "<strong>" +
                    formatNumber(
                      item.reach
                    ) +
                  "</strong>" +
                  "<span>Alcance</span>" +
                "</div>" +

                '<div class="ranking-metric">' +
                  "<strong>" +
                    formatNumber(
                      item.views
                    ) +
                  "</strong>" +
                  "<span>Visualizações</span>" +
                "</div>" +

                '<div class="ranking-metric">' +
                  "<strong>" +
                    formatNumber(
                      item.engagement
                    ) +
                  "</strong>" +
                  "<span>Engajamentos</span>" +
                "</div>" +

                '<div class="ranking-metric ranking-coverage">' +
                  "<strong>" +
                    escapeHtml(
                      coverageText
                    ) +
                  "</strong>" +
                  "<span>População atingida</span>" +
                "</div>" +

              "</div>" +

              '<div class="ranking-population-note">' +
                (
                  item.population > 0
                    ? (
                        "Base populacional do IBGE: " +
                        formatNumber(
                          item.population
                        ) +
                        ". "
                      )
                    : ""
                ) +
                "O alcance representa contas únicas estimadas pela Meta." +
              "</div>" +

            "</article>"
          );
        })
        .join("") +
    "</div>";
}

    function renderMunicipalities(campaigns) {
      const municipalCampaigns =
        campaigns.filter(
          function (campaign) {
            return (
              campaign.geographicScope?.type ===
              "municipal"
            );
          }
        );

      if (!municipalCampaigns.length) {
        municipalitiesTable.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Nenhum município encontrado</strong>" +
              "<span>Não há campanhas municipais no período.</span>" +
            "</div>" +
          "</div>";

        return;
      }

      municipalitiesTable.innerHTML =
        "<table>" +
          "<thead>" +
            "<tr>" +
              "<th>Município</th>" +
              "<th>Campanha</th>" +
              "<th>População</th>" +
              "<th>Alcance</th>" +
              "<th>Cobertura</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            municipalCampaigns
              .map(function (campaign) {
                return (
                  "<tr>" +
                    "<td>" +
                      escapeHtml(
                        campaign.ibge?.municipality ||
                        getCampaignLocation(campaign)
                      ) +
                    "</td>" +

                    '<td class="campaign-cell">' +
                      "<strong>" +
                        escapeHtml(
                          campaign.name ||
                          "Campanha"
                        ) +
                      "</strong>" +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        campaign.ibge?.population
                      ) +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        campaign.performance
                          ?.reach
                      ) +
                    "</td>" +

                    "<td>" +
                      formatPercentage(
                        campaign.ibge
                          ?.coveragePercentage
                      ) +
                    "</td>" +
                  "</tr>"
                );
              })
              .join("") +
          "</tbody>" +
        "</table>";
    }

    function renderSummaryCards() {
      const totalAdSets =
        Number(
          state.summary.totalAdSets || 0
        );

      const totalAds =
        Number(
          state.summary.totalAds || 0
        );

      const totalCreatives =
        Number(
          state.summary.totalCreatives || 0
        );

      const activeCampaigns =
        state.campaigns.filter(
          isCampaignActive
        ).length;

      const endedCampaigns =
        state.campaigns.length -
        activeCampaigns;

      adSetsSummary.innerHTML =
        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(totalAdSets) +
            " conjuntos" +
          "</strong>" +
          "<p>" +
            "Conjuntos de anúncios encontrados no período." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(activeCampaigns) +
            " campanhas ativas" +
          "</strong>" +
          "<p>" +
            "Campanhas que ainda aparecem como ativas." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(endedCampaigns) +
            " campanhas encerradas" +
          "</strong>" +
          "<p>" +
            "Campanhas encerradas ou inativas." +
          "</p>" +
        "</article>";

      adsSummary.innerHTML =
        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(totalAds) +
            " anúncios" +
          "</strong>" +
          "<p>" +
            "Total de anúncios encontrados no período." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(
              state.summary.totalClicks
            ) +
            " cliques" +
          "</strong>" +
          "<p>" +
            "Total de cliques registrados nos anúncios." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(
              state.summary.totalEngagement
            ) +
            " engajamentos" +
          "</strong>" +
          "<p>" +
            "Interações realizadas com os anúncios." +
          "</p>" +
        "</article>";

      creativesSummary.innerHTML =
        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(totalCreatives) +
            " criativos" +
          "</strong>" +
          "<p>" +
            "Total de criativos vinculados aos anúncios." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>" +
            formatNumber(
              state.summary.campaignsWithCover
            ) +
            " campanhas com capa" +
          "</strong>" +
          "<p>" +
            "Campanhas com imagem ou miniatura disponível." +
          "</p>" +
        "</article>" +

        '<article class="placeholder-card">' +
          "<strong>Galeria em construção</strong>" +
          "<p>" +
            "A visualização completa dos criativos será adicionada em uma próxima etapa." +
          "</p>" +
        "</article>";
    }

     function renderDailySpend(daily) {
      const account =
        Array.isArray(daily?.account)
          ? daily.account
          : [];

      const ads =
        Array.isArray(daily?.ads)
          ? daily.ads
          : [];

      const totalSpend =
        account.reduce(
          function (total, item) {
            return (
              total +
              Number(item.spend || 0)
            );
          },
          0
        );

      const daysWithSpend =
        account.filter(
          function (item) {
            return Number(item.spend || 0) > 0;
          }
        ).length;

      const averageDailySpend =
        daysWithSpend > 0
          ? totalSpend / daysWithSpend
          : 0;

      const adsWithSpend =
        ads.filter(
          function (item) {
            return Number(item.spend || 0) > 0;
          }
        );

      dailySummary.innerHTML =
        '<article class="daily-summary-card">' +
          "<span>Gasto no período</span>" +
          "<strong>" +
            formatCurrency(totalSpend) +
          "</strong>" +
        "</article>" +

        '<article class="daily-summary-card">' +
          "<span>Média diária</span>" +
          "<strong>" +
            formatCurrency(
              averageDailySpend
            ) +
          "</strong>" +
        "</article>" +

        '<article class="daily-summary-card">' +
          "<span>Dias com gasto</span>" +
          "<strong>" +
            formatNumber(daysWithSpend) +
          "</strong>" +
        "</article>" +

        '<article class="daily-summary-card">' +
          "<span>Anúncios com gasto</span>" +
          "<strong>" +
            formatNumber(
              new Set(
                adsWithSpend.map(
                  function (item) {
                    return item.adId;
                  }
                )
              ).size
            ) +
          "</strong>" +
        "</article>";

      if (!account.length) {
        dailyAccountTable.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Gasto diário indisponível</strong>" +
              "<span>Não há dados para o período.</span>" +
            "</div>" +
          "</div>";
      } else {
        dailyAccountTable.innerHTML =
          "<table>" +
            "<thead>" +
              "<tr>" +
                "<th>Data</th>" +
                "<th>Gasto total da conta</th>" +
              "</tr>" +
            "</thead>" +
            "<tbody>" +
              account
                .map(function (item) {
                  return (
                    "<tr>" +
                      "<td>" +
                        escapeHtml(
                          formatDate(item.date)
                        ) +
                      "</td>" +

                      "<td>" +
                        formatCurrency(
                          item.spend
                        ) +
                      "</td>" +
                    "</tr>"
                  );
                })
                .join("") +
            "</tbody>" +
          "</table>";
      }

      const orderedAds =
        adsWithSpend
          .slice()
          .sort(
            function (itemA, itemB) {
              return (
                Number(itemB.spend || 0) -
                Number(itemA.spend || 0)
              );
            }
          );

      if (!orderedAds.length) {
        dailyAdsTable.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Nenhum anúncio com gasto</strong>" +
              "<span>Não houve investimento no período.</span>" +
            "</div>" +
          "</div>";

        return;
      }

      dailyAdsTable.innerHTML =
        "<table>" +
          "<thead>" +
            "<tr>" +
              "<th>Data</th>" +
              "<th>Anúncio</th>" +
              "<th>Gasto</th>" +
              "<th>Visualizações</th>" +
              "<th>Alcance</th>" +
              "<th>Cliques</th>" +
              "<th>Seguidores</th>" +
            "</tr>" +
          "</thead>" +

          "<tbody>" +
            orderedAds
              .map(function (item) {
                return (
                  "<tr>" +
                    "<td>" +
                      escapeHtml(
                        formatDate(item.date)
                      ) +
                    "</td>" +

                    '<td class="daily-ad-name">' +
                      "<strong>" +
                        escapeHtml(
                          item.adName ||
                          "Anúncio sem nome"
                        ) +
                      "</strong>" +

                      "<span>" +
                        escapeHtml(
                          item.campaignName ||
                          "Campanha"
                        ) +
                      "</span>" +
                    "</td>" +

                    "<td>" +
                      formatCurrency(
                        item.spend
                      ) +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        item.views
                      ) +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        item.reach
                      ) +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        item.clicks
                      ) +
                    "</td>" +

                    "<td>" +
                      formatNumber(
                        item.followers
                      ) +
                    "</td>" +
                  "</tr>"
                );
              })
              .join("") +
          "</tbody>" +
        "</table>";
    }

    function renderAccountStatus(
      accountStatus
    ) {
      if (!accountStatus) {
        accountBalanceContent.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Saldo indisponível</strong>" +
              "<span>" +
                "Não foi possível consultar a conta." +
              "</span>" +
            "</div>" +
          "</div>";

        return;
      }

      const account =
        accountStatus.account || {};

      const financial =
        accountStatus.financial || {};

      const today =
        accountStatus.today || {};

      const trafficLight =
        String(
          financial.trafficLight ||
          "neutral"
        ).toLowerCase();

      const daysRemaining =
        financial.estimatedDaysRemaining;

      const daysText =
        daysRemaining === null ||
        daysRemaining === undefined
          ? "Não se aplica"
          : formatNumber(daysRemaining);

      accountBalanceContent.innerHTML =
        '<div class="balance-status-card ' +
          escapeHtml(trafficLight) +
        '">' +

          '<div class="balance-status-header">' +
            '<span class="balance-light"></span>' +

            "<div>" +
              "<strong>" +
                escapeHtml(
                  financial.statusLabel ||
                  "Situação da conta"
                ) +
              "</strong>" +

              "<span>" +
                escapeHtml(
                  account.name ||
                  "Conta Meta Ads"
                ) +
              "</span>" +
            "</div>" +
          "</div>" +

          '<div class="balance-grid">' +

            '<article class="balance-metric">' +
              "<span>Saldo atual</span>" +
              "<strong>" +
                formatCurrency(
                  financial.balance
                ) +
              "</strong>" +
            "</article>" +

            '<article class="balance-metric">' +
              "<span>Gasto de hoje</span>" +
              "<strong>" +
                formatCurrency(
                  financial.amountSpentToday ??
                  today.spend
                ) +
              "</strong>" +
            "</article>" +

            '<article class="balance-metric">' +
              "<span>Média diária</span>" +
              "<strong>" +
                formatCurrency(
                  financial.averageDailySpend
                ) +
              "</strong>" +
            "</article>" +

            '<article class="balance-metric">' +
              "<span>Dias restantes</span>" +
              "<strong>" +
                escapeHtml(daysText) +
              "</strong>" +
            "</article>" +

            '<article class="balance-metric">' +
              "<span>Total gasto</span>" +
              "<strong>" +
                formatCurrency(
                  financial.amountSpent
                ) +
              "</strong>" +
            "</article>" +

          "</div>" +

          '<div class="balance-footer">' +
            "<span>" +
              (
                account.isPrepayAccount
                  ? "Conta pré-paga"
                  : "Conta pós-paga"
              ) +
            "</span>" +

            "<span>" +
              "Última atualização: " +
              escapeHtml(
                formatDateTime(
                  accountStatus.updatedAt
                )
              ) +
            "</span>" +
          "</div>" +

        "</div>";
    }

       function renderAll() {
      renderMetrics(state.summary);

      renderFilteredCampaigns();

      renderDailySpend(state.daily);

      renderAccountStatus(
        state.accountStatus
      );

      renderRanking(state.ranking);

      renderMunicipalities(
        state.campaigns
      );

      renderSummaryCards();
    }

           async function loadData(
      since,
      until
    ) {
      updateButton.disabled = true;

      setFeedback(
        "loading",
        "Carregando informações atualizadas..."
      );

      try {
        const selectedPeriodQuery =
          "?since=" +
          encodeURIComponent(since) +
          "&until=" +
          encodeURIComponent(until);

        const today =
          getTodayDate();

        const todayQuery =
          "?since=" +
          encodeURIComponent(today) +
          "&until=" +
          encodeURIComponent(today);

        const [
          dashboardResponse,
          adsResponse,
          accountStatusResponse
        ] = await Promise.all([
          fetch(
            "/meta-ads/dashboard" +
            selectedPeriodQuery,
            {
              headers: {
                Accept: "application/json"
              },
              cache: "no-store"
            }
          ),

          fetch(
            "/meta-ads/ads" +
            todayQuery,
            {
              headers: {
                Accept: "application/json"
              },
              cache: "no-store"
            }
          ),

          fetch(
            "/meta-ads/account-status",
            {
              headers: {
                Accept: "application/json"
              },
              cache: "no-store"
            }
          )
        ]);

        const [
          dashboardResult,
          adsResult,
          accountStatusResult
        ] = await Promise.all([
          dashboardResponse.json(),
          adsResponse.json(),
          accountStatusResponse.json()
        ]);

        if (
          !dashboardResponse.ok ||
          !dashboardResult.success
        ) {
          throw new Error(
            dashboardResult.error ||
            "Não foi possível carregar o painel."
          );
        }

        if (
          !adsResponse.ok ||
          !adsResult.success
        ) {
          throw new Error(
            adsResult.error ||
            "Não foi possível carregar o gasto de hoje."
          );
        }

        if (
          !accountStatusResponse.ok ||
          !accountStatusResult.success
        ) {
          throw new Error(
            accountStatusResult.error ||
            "Não foi possível carregar o saldo da conta."
          );
        }

        state.campaigns =
          dashboardResult.data
            ?.campaigns || [];

        state.summary =
          dashboardResult.data
            ?.summary || {};

        state.ranking =
          dashboardResult.data
            ?.ranking || {};

        state.geography =
          dashboardResult.data
            ?.geography || {};

        state.daily =
          adsResult.data?.daily || {
            account: [],
            ads: []
          };

        state.accountStatus =
          accountStatusResult.data || null;

        renderAll();

        setFeedback(
          "success",
          "Dados atualizados com sucesso."
        );

        window.setTimeout(
          hideFeedback,
          3000
        );
      } catch (error) {
        state.campaigns = [];
        state.summary = {};
        state.ranking = {};
        state.geography = {};
        state.accountStatus = null;

        state.daily = {
          account: [],
          ads: []
        };

        metricsGrid.innerHTML = "";

        campaignsTable.innerHTML =
          '<div class="empty-state">' +
            "<div>" +
              "<strong>Não foi possível carregar os dados</strong>" +
              "<span>" +
                "Atualize o token da Meta e tente novamente." +
              "</span>" +
            "</div>" +
          "</div>";

        rankingTable.innerHTML =
          campaignsTable.innerHTML;

        municipalitiesTable.innerHTML =
          campaignsTable.innerHTML;

        dailyAccountTable.innerHTML =
          campaignsTable.innerHTML;

        dailyAdsTable.innerHTML =
          campaignsTable.innerHTML;

        dailySummary.innerHTML = "";

        accountBalanceContent.innerHTML =
          campaignsTable.innerHTML;

        setFeedback(
          "error",
          error.message ||
          "Ocorreu um erro ao carregar os dados."
        );
      } finally {
        updateButton.disabled = false;
      }
    }

    document
      .querySelectorAll(".tab-button")
      .forEach(function (button) {
        button.addEventListener(
          "click",
          function () {
            const section =
              button.dataset.section;

            document
              .querySelectorAll(".tab-button")
              .forEach(function (item) {
                item.classList.remove("active");
              });

            document
              .querySelectorAll(".section-content")
              .forEach(function (item) {
                item.classList.remove("active");
              });

            button.classList.add("active");

            document
              .getElementById(
                "section-" + section
              )
              .classList.add("active");
          }
        );
      });

    periodForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        loadData(
          sinceInput.value,
          untilInput.value
        );
      }
    );

    campaignSearch.addEventListener(
      "input",
      renderFilteredCampaigns
    );

    campaignStatusFilter.addEventListener(
      "change",
      renderFilteredCampaigns
    );

    campaignScopeFilter.addEventListener(
      "change",
      renderFilteredCampaigns
    );

    menuButton.addEventListener(
      "click",
      function () {
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("visible");
      }
    );

    sidebarOverlay.addEventListener(
      "click",
      function () {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("visible");
      }
    );

    const defaultPeriod =
      getDefaultPeriod();

    sinceInput.value =
      defaultPeriod.since;

    untilInput.value =
      defaultPeriod.until;

    loadData(
      defaultPeriod.since,
      defaultPeriod.until
    );
        window.setInterval(
      function () {
        loadData(
          sinceInput.value,
          untilInput.value
        );
      },
      300000
    );
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type":
        "text/html; charset=UTF-8",

      "cache-control":
        "no-store, no-cache, must-revalidate"
    }
  });
}
