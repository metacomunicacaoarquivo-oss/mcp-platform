 export function dashboardPage() {
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
    content="Central de Performance da Meta Comunicação"
  >

  <title>Central de Performance</title>

  <style>
    :root {
      --background: #f4f6fa;
      --surface: #ffffff;
      --surface-soft: #f8fafc;
      --surface-hover: #f1f5f9;

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
      --header-height: 76px;

      --radius-small: 10px;
      --radius-medium: 14px;
      --radius-large: 20px;

      --shadow-small:
        0 2px 8px rgba(16, 24, 40, 0.05);

      --shadow-medium:
        0 12px 35px rgba(16, 24, 40, 0.08);
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

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .app-shell {
      min-height: 100vh;
    }

    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 40;
      width: var(--sidebar-width);
      display: flex;
      flex-direction: column;
      background: #111827;
      color: #ffffff;
      border-right:
        1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.25s ease;
    }

    .sidebar-brand {
      min-height: var(--header-height);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 22px;
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
      box-shadow:
        0 8px 20px rgba(37, 99, 235, 0.35);
    }

    .brand-text strong {
      display: block;
      font-size: 15px;
      line-height: 1.25;
    }

    .brand-text span {
      display: block;
      margin-top: 2px;
      color: rgba(255, 255, 255, 0.56);
      font-size: 11px;
    }

    .sidebar-navigation {
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
      width: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 13px;
      color: rgba(255, 255, 255, 0.68);
      text-align: left;
      background: transparent;
      border: 0;
      border-radius: 11px;
      transition:
        background 0.18s ease,
        color 0.18s ease;
    }

    .navigation-item:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.07);
    }

    .navigation-item.active {
      color: #ffffff;
      font-weight: 700;
      background: rgba(37, 99, 235, 0.9);
    }

    .navigation-item.disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    .navigation-icon {
      width: 22px;
      flex-shrink: 0;
      text-align: center;
      font-size: 17px;
    }

    .navigation-text {
      flex: 1;
      font-size: 14px;
    }

    .navigation-status {
      padding: 3px 7px;
      color: rgba(255, 255, 255, 0.75);
      font-size: 9px;
      font-weight: 800;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
    }

    .sidebar-footer {
      padding: 16px;
      border-top:
        1px solid rgba(255, 255, 255, 0.08);
    }

    .system-card {
      padding: 13px;
      background: rgba(255, 255, 255, 0.05);
      border:
        1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
    }

    .system-status {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 11px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow:
        0 0 0 4px rgba(34, 197, 94, 0.13);
    }

    .system-card strong {
      display: block;
      margin-top: 8px;
      font-size: 12px;
    }

    .main-area {
      min-height: 100vh;
      margin-left: var(--sidebar-width);
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      min-height: var(--header-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      padding: 12px 28px;
      background: rgba(255, 255, 255, 0.94);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(16px);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .mobile-menu-button {
      width: 42px;
      height: 42px;
      display: none;
      place-items: center;
      color: var(--text);
      background: var(--surface-soft);
      border: 1px solid var(--border);
      border-radius: 11px;
    }

    .page-heading h1 {
      margin: 0;
      font-size: 20px;
      letter-spacing: -0.025em;
    }

    .page-heading p {
      margin: 4px 0 0;
      color: var(--text-soft);
      font-size: 12px;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon-button {
      position: relative;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      color: var(--text-soft);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 11px;
    }

    .icon-button:hover {
      color: var(--text);
      background: var(--surface-soft);
    }

    .ai-button {
      width: auto;
      padding: 0 14px;
      gap: 8px;
      display: flex;
      font-size: 12px;
      font-weight: 800;
    }

    .ai-button span:last-child {
      padding: 3px 6px;
      color: var(--primary);
      font-size: 9px;
      background: var(--primary-soft);
      border-radius: 999px;
    }

    .content {
      width: min(1560px, 100%);
      margin: 0 auto;
      padding: 28px;
    }

    .welcome-panel {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 22px;
    }

    .welcome-copy h2 {
      margin: 0;
      font-size: clamp(25px, 3vw, 34px);
      letter-spacing: -0.045em;
    }

    .welcome-copy p {
      max-width: 650px;
      margin: 8px 0 0;
      color: var(--text-soft);
      line-height: 1.6;
    }

    .period-panel {
      display: flex;
      align-items: end;
      gap: 10px;
      padding: 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-medium);
      box-shadow: var(--shadow-small);
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field label {
      color: var(--text-soft);
      font-size: 11px;
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
      font-size: 13px;
      font-weight: 800;
      background: var(--primary);
      border: 0;
      border-radius: var(--radius-small);
      transition:
        background 0.18s ease,
        transform 0.18s ease;
    }

    .primary-button:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }

    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
      transform: none;
    }

    .feedback {
      display: none;
      align-items: flex-start;
      gap: 11px;
      margin-bottom: 20px;
      padding: 14px 16px;
      font-size: 13px;
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

    .feedback-icon {
      flex-shrink: 0;
      margin-top: 1px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns:
        repeat(5, minmax(0, 1fr));
      gap: 15px;
      margin-bottom: 24px;
    }

    .metric-card {
      position: relative;
      overflow: hidden;
      min-height: 145px;
      padding: 19px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-large);
      box-shadow: var(--shadow-small);
    }

    .metric-card::after {
      content: "";
      position: absolute;
      right: -24px;
      bottom: -28px;
      width: 95px;
      height: 95px;
      background: var(--metric-glow, var(--primary-soft));
      border-radius: 50%;
      opacity: 0.85;
    }

    .metric-top {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .metric-label {
      color: var(--text-soft);
      font-size: 12px;
      font-weight: 700;
    }

    .metric-icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      color: var(--metric-color, var(--primary));
      background: var(--metric-background, var(--primary-soft));
      border-radius: 11px;
    }

    .metric-value {
      position: relative;
      z-index: 1;
      display: block;
      margin-top: 19px;
      font-size: clamp(23px, 2.4vw, 31px);
      letter-spacing: -0.045em;
    }

    .metric-note {
      position: relative;
      z-index: 1;
      display: block;
      margin-top: 8px;
      color: var(--text-light);
      font-size: 10px;
    }

    .dashboard-row {
      display: grid;
      grid-template-columns:
        minmax(0, 1.45fr)
        minmax(300px, 0.55fr);
      gap: 18px;
      margin-bottom: 25px;
    }

    .panel {
      padding: 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-large);
      box-shadow: var(--shadow-small);
    }

    .panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
    }

    .panel-header h3 {
      margin: 0;
      font-size: 17px;
      letter-spacing: -0.025em;
    }

    .panel-header p {
      margin: 5px 0 0;
      color: var(--text-soft);
      font-size: 11px;
    }

    .scope-summary {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .scope-card {
      padding: 18px;
      background: var(--surface-soft);
      border: 1px solid var(--border);
      border-radius: var(--radius-medium);
    }

    .scope-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .scope-card span {
      color: var(--text-soft);
      font-size: 11px;
      font-weight: 700;
    }

    .scope-card strong {
      display: block;
      margin-top: 13px;
      font-size: 27px;
      letter-spacing: -0.04em;
    }

    .scope-card small {
      display: block;
      margin-top: 6px;
      color: var(--text-light);
      font-size: 10px;
    }

    .ranking-list {
      display: grid;
      gap: 9px;
    }

    .ranking-item {
      display: grid;
      grid-template-columns:
        32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: var(--surface-soft);
      border-radius: 11px;
    }

    .ranking-position {
      width: 29px;
      height: 29px;
      display: grid;
      place-items: center;
      color: var(--primary);
      font-size: 11px;
      font-weight: 900;
      background: var(--primary-soft);
      border-radius: 9px;
    }

    .ranking-name {
      overflow: hidden;
      font-size: 11px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ranking-value {
      color: var(--text-soft);
      font-size: 11px;
      font-weight: 700;
    }

    .section {
      margin-top: 26px;
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 15px;
    }

    .section-title h2 {
      margin: 0;
      font-size: 21px;
      letter-spacing: -0.035em;
    }

    .section-title p {
      margin: 6px 0 0;
      color: var(--text-soft);
      font-size: 12px;
    }

    .campaign-controls {
      display: flex;
      align-items: center;
      gap: 9px;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
    }

    .search-box input {
      width: 235px;
      height: 40px;
      padding: 0 12px 0 37px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
      outline: none;
    }

    .search-box span {
      position: absolute;
      top: 50%;
      left: 13px;
      color: var(--text-light);
      transform: translateY(-50%);
    }

    .compact-select {
      height: 40px;
      padding: 0 30px 0 11px;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-small);
      outline: none;
    }

    .campaign-group {
      margin-bottom: 30px;
    }

    .campaign-group-header {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 13px;
    }

    .campaign-group-header h3 {
      margin: 0;
      font-size: 15px;
    }

    .campaign-count {
      min-width: 27px;
      height: 24px;
      display: inline-grid;
      place-items: center;
      padding: 0 8px;
      color: var(--text-soft);
      font-size: 10px;
      font-weight: 800;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
    }

    .campaigns-grid {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 17px;
    }

    .campaign-card {
      overflow: hidden;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-large);
      box-shadow: var(--shadow-small);
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
    }

    .campaign-card:hover {
      transform: translateY(-3px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-medium);
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
      display: block;
      object-fit: cover;
    }

    .campaign-cover-placeholder {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: 20px;
      color: var(--text-light);
      font-size: 12px;
      text-align: center;
    }

    .campaign-badges {
      position: absolute;
      inset: 12px 12px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 27px;
      padding: 0 9px;
      color: #ffffff;
      font-size: 9px;
      font-weight: 900;
      background: rgba(17, 24, 39, 0.82);
      border-radius: 999px;
      backdrop-filter: blur(8px);
    }

    .badge.active {
      background: rgba(22, 163, 74, 0.9);
    }

    .badge.ended {
      background: rgba(71, 85, 105, 0.9);
    }

    .campaign-content {
      padding: 17px;
    }

    .campaign-name {
      min-height: 45px;
      margin: 0;
      display: -webkit-box;
      overflow: hidden;
      font-size: 15px;
      line-height: 1.45;
      letter-spacing: -0.015em;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .campaign-location {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 8px 0 15px;
      color: var(--text-soft);
      font-size: 11px;
    }

    .campaign-metrics {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
      gap: 9px;
    }

    .campaign-metric {
      padding: 11px;
      background: var(--surface-soft);
      border-radius: 11px;
    }

    .campaign-metric span {
      display: block;
      color: var(--text-soft);
      font-size: 9px;
      font-weight: 700;
    }

    .campaign-metric strong {
      display: block;
      margin-top: 5px;
      font-size: 13px;
    }

    .campaign-metric.coverage {
      grid-column: 1 / -1;
      background: var(--primary-soft);
    }

    .coverage-progress {
      height: 5px;
      overflow: hidden;
      margin-top: 9px;
      background: #dbeafe;
      border-radius: 999px;
    }

    .coverage-progress div {
      height: 100%;
      min-width: 0;
      max-width: 100%;
      background: var(--primary);
      border-radius: inherit;
    }

    .campaign-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 14px;
      padding-top: 13px;
      color: var(--text-light);
      font-size: 9px;
      border-top: 1px solid var(--border);
    }

    .empty-state {
      grid-column: 1 / -1;
      min-height: 180px;
      display: grid;
      place-items: center;
      padding: 35px;
      color: var(--text-soft);
      text-align: center;
      background: var(--surface);
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-large);
    }

    .empty-state strong {
      display: block;
      margin-bottom: 7px;
      color: var(--text);
    }

    .skeleton {
      position: relative;
      overflow: hidden;
      background: #edf0f4;
    }

    .skeleton::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.75),
          transparent
        );
      transform: translateX(-100%);
      animation: shimmer 1.35s infinite;
    }

    .skeleton-card {
      min-height: 145px;
      border-radius: var(--radius-large);
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      z-index: 35;
      display: none;
      background: rgba(15, 23, 42, 0.55);
    }

    @keyframes shimmer {
      to {
        transform: translateX(100%);
      }
    }

    @media (max-width: 1280px) {
      .metrics-grid {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
      }

      .campaigns-grid {
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

      .main-area {
        margin-left: 0;
      }

      .mobile-menu-button {
        display: grid;
      }

      .dashboard-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 780px) {
      .topbar {
        padding: 11px 16px;
      }

      .ai-button {
        width: 42px;
        padding: 0;
        justify-content: center;
      }

      .ai-button .ai-label,
      .ai-button span:last-child {
        display: none;
      }

      .content {
        padding: 20px 15px 45px;
      }

      .welcome-panel {
        align-items: stretch;
        flex-direction: column;
      }

      .period-panel {
        align-items: stretch;
        flex-wrap: wrap;
      }

      .period-panel .field {
        flex: 1;
      }

      .period-panel .field input {
        width: 100%;
        min-width: 130px;
      }

      .period-panel .primary-button {
        flex: 1;
        min-width: 120px;
      }

      .metrics-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }

      .section-header {
        align-items: stretch;
        flex-direction: column;
      }

      .campaign-controls {
        width: 100%;
      }

      .search-box {
        flex: 1;
      }

      .search-box input {
        width: 100%;
      }
    }

    @media (max-width: 580px) {
      .page-heading p {
        display: none;
      }

      .metrics-grid,
      .campaigns-grid,
      .scope-summary {
        grid-template-columns: 1fr;
      }

      .metric-card {
        min-height: 125px;
      }

      .campaign-controls {
        display: grid;
        grid-template-columns: 1fr;
      }

      .compact-select {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">M</div>

        <div class="brand-text">
          <strong>Central de Performance</strong>
          <span>Meta Comunicação</span>
        </div>
      </div>

      <nav class="sidebar-navigation">
        <p class="navigation-label">Visão geral</p>

        <div class="navigation-group">
          <button
            type="button"
            class="navigation-item active"
          >
            <span class="navigation-icon">⌂</span>
            <span class="navigation-text">Dashboard</span>
          </button>
        </div>

        <p class="navigation-label">Desempenho</p>

        <div class="navigation-group">
          <button
            type="button"
            class="navigation-item"
          >
            <span class="navigation-icon">◉</span>
            <span class="navigation-text">Meta Ads</span>
          </button>

          <button
            type="button"
            class="navigation-item disabled"
            title="Disponível em uma próxima atualização"
          >
            <span class="navigation-icon">◎</span>
            <span class="navigation-text">
              Instagram e Facebook
            </span>
            <span class="navigation-status">Em breve</span>
          </button>
        </div>

        <p class="navigation-label">Análises</p>

        <div class="navigation-group">
          <button
            type="button"
            class="navigation-item disabled"
            title="Disponível em uma próxima atualização"
          >
            <span class="navigation-icon">▦</span>
            <span class="navigation-text">Emendas x Votos</span>
            <span class="navigation-status">Em breve</span>
          </button>

          <button
            type="button"
            class="navigation-item disabled"
            title="Disponível em uma próxima atualização"
          >
            <span class="navigation-icon">⌖</span>
            <span class="navigation-text">IBGE x Votos</span>
            <span class="navigation-status">Em breve</span>
          </button>
        </div>

        <p class="navigation-label">Inteligência</p>

        <div class="navigation-group">
          <button
            type="button"
            class="navigation-item disabled"
            title="A IA será implantada futuramente"
          >
            <span class="navigation-icon">✦</span>
            <span class="navigation-text">
              Assistente de IA
            </span>
            <span class="navigation-status">Futuro</span>
          </button>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="system-card">
          <div class="system-status">
            <span class="status-dot"></span>
            <span>Sistema disponível</span>
          </div>

          <strong>Central v3.0</strong>
        </div>
      </div>
    </aside>

    <div
      class="sidebar-overlay"
      id="sidebarOverlay"
    ></div>

    <div class="main-area">
      <header class="topbar">
        <div class="topbar-left">
          <button
            type="button"
            class="mobile-menu-button"
            id="mobileMenuButton"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <div class="page-heading">
            <h1>Meta Ads</h1>
            <p>
              Acompanhamento das campanhas e resultados.
            </p>
          </div>
        </div>

        <div class="topbar-actions">
          <button
            type="button"
            class="icon-button ai-button"
            title="Recurso preparado para implantação futura"
          >
            <span>✦</span>
            <span class="ai-label">Assistente de IA</span>
            <span>Futuro</span>
          </button>
        </div>
      </header>

      <main class="content">
        <section class="welcome-panel">
          <div class="welcome-copy">
            <h2>Central de Performance</h2>

            <p>
              Uma visão clara dos investimentos, alcance,
              visualizações e resultados das campanhas.
            </p>
          </div>

          <form
            class="period-panel"
            id="filtersForm"
          >
            <div class="field">
              <label for="since">
                Data inicial
              </label>

              <input
                type="date"
                id="since"
                name="since"
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
                name="until"
                required
              >
            </div>

            <button
              type="submit"
              class="primary-button"
              id="submitButton"
            >
              <span>↻</span>
              <span>Atualizar</span>
            </button>
          </form>
        </section>

        <div
          class="feedback loading visible"
          id="feedback"
        >
          <span class="feedback-icon">◌</span>
          <span id="feedbackText">
            Carregando informações do período...
          </span>
        </div>

        <section
          class="metrics-grid"
          id="metricsGrid"
        ></section>

        <section
          class="dashboard-row"
          id="dashboardSummary"
        >
          <article class="panel">
            <div class="panel-header">
              <div>
                <h3>Distribuição das campanhas</h3>

                <p>
                  Campanhas municipais e estaduais.
                </p>
              </div>
            </div>

            <div
              class="scope-summary"
              id="scopeSummary"
            ></div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h3>Maiores alcances</h3>

                <p>
                  Campanhas de maior alcance no período.
                </p>
              </div>
            </div>

            <div
              class="ranking-list"
              id="rankingList"
            ></div>
          </article>
        </section>

        <section class="section">
          <div class="section-header">
            <div class="section-title">
              <h2>Campanhas</h2>

              <p>
                Acompanhe campanhas ativas e encerradas.
              </p>
            </div>

            <div class="campaign-controls">
              <div class="search-box">
                <span>⌕</span>

                <input
                  type="search"
                  id="campaignSearch"
                  placeholder="Pesquisar campanha"
                >
              </div>

              <select
                class="compact-select"
                id="scopeFilter"
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

              <select
                class="compact-select"
                id="statusFilter"
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
            </div>
          </div>

          <div
            id="campaignGroups"
          ></div>
        </section>
      </main>
    </div>
  </div>

  <script>
    const state = {
      campaigns: [],
      summary: {},
      ranking: {},
      geography: {}
    };

    const sidebar =
      document.getElementById("sidebar");

    const sidebarOverlay =
      document.getElementById("sidebarOverlay");

    const mobileMenuButton =
      document.getElementById("mobileMenuButton");

    const filtersForm =
      document.getElementById("filtersForm");

    const sinceInput =
      document.getElementById("since");

    const untilInput =
      document.getElementById("until");

    const submitButton =
      document.getElementById("submitButton");

    const feedback =
      document.getElementById("feedback");

    const feedbackText =
      document.getElementById("feedbackText");

    const metricsGrid =
      document.getElementById("metricsGrid");

    const scopeSummary =
      document.getElementById("scopeSummary");

    const rankingList =
      document.getElementById("rankingList");

    const campaignGroups =
      document.getElementById("campaignGroups");

    const campaignSearch =
      document.getElementById("campaignSearch");

    const scopeFilter =
      document.getElementById("scopeFilter");

    const statusFilter =
      document.getElementById("statusFilter");

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

    function renderLoadingSkeleton() {
      metricsGrid.innerHTML = [
        1,
        2,
        3,
        4,
        5
      ].map(function () {
        return (
          '<div class="skeleton skeleton-card"></div>'
        );
      }).join("");

      scopeSummary.innerHTML =
        '<div class="skeleton skeleton-card"></div>' +
        '<div class="skeleton skeleton-card"></div>';

      rankingList.innerHTML =
        '<div class="skeleton" style="height:49px;border-radius:11px"></div>' +
        '<div class="skeleton" style="height:49px;border-radius:11px"></div>' +
        '<div class="skeleton" style="height:49px;border-radius:11px"></div>';

      campaignGroups.innerHTML =
        '<div class="campaigns-grid">' +
          '<div class="skeleton" style="height:410px;border-radius:20px"></div>' +
          '<div class="skeleton" style="height:410px;border-radius:20px"></div>' +
          '<div class="skeleton" style="height:410px;border-radius:20px"></div>' +
        '</div>';
    }

    function renderMetrics(summary) {
      const metrics = [
        {
          label: "Investimento",
          value: formatCurrency(
            summary.totalSpend
          ),
          icon: "R$",
          note: "Valor aplicado no período",
          color: "#2563eb",
          background: "#eff6ff",
          glow: "#dbeafe"
        },
        {
          label: "Alcance",
          value: formatNumber(
            summary.totalReach
          ),
          icon: "◎",
          note: "Pessoas alcançadas",
          color: "#7c3aed",
          background: "#f5f3ff",
          glow: "#ede9fe"
        },
        {
          label: "Visualizações",
          value: formatNumber(
            summary.totalViews
          ),
          icon: "◉",
          note: "Exibições dos anúncios",
          color: "#0891b2",
          background: "#ecfeff",
          glow: "#cffafe"
        },
        {
          label: "Engajamentos",
          value: formatNumber(
            summary.totalEngagement
          ),
          icon: "♥",
          note: "Interações com o conteúdo",
          color: "#db2777",
          background: "#fdf2f8",
          glow: "#fce7f3"
        },
        {
          label: "Campanhas",
          value: formatNumber(
            summary.totalCampaigns
          ),
          icon: "▦",
          note: "Campanhas analisadas",
          color: "#d97706",
          background: "#fffbeb",
          glow: "#fef3c7"
        }
      ];

      metricsGrid.innerHTML = metrics
        .map(function (metric) {
          return (
            '<article class="metric-card"' +
              ' style="' +
                '--metric-color:' +
                metric.color +
                ';--metric-background:' +
                metric.background +
                ';--metric-glow:' +
                metric.glow +
              '">' +
              '<div class="metric-top">' +
                '<span class="metric-label">' +
                  escapeHtml(metric.label) +
                '</span>' +
                '<span class="metric-icon">' +
                  escapeHtml(metric.icon) +
                '</span>' +
              '</div>' +
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

    function renderScopeSummary(
      geography,
      summary
    ) {
      const municipal =
        Number(
          summary.municipalCampaigns ??
          geography.municipalCampaigns ??
          0
        );

      const stateCampaigns =
        Number(
          summary.stateCampaigns ??
          geography.stateCampaigns ??
          0
        );

      scopeSummary.innerHTML =
        '<article class="scope-card">' +
          '<div class="scope-card-top">' +
            '<span>Campanhas municipais</span>' +
            '<span>⌖</span>' +
          '</div>' +
          '<strong>' +
            formatNumber(municipal) +
          '</strong>' +
          '<small>' +
            'Município identificado no nome' +
          '</small>' +
        '</article>' +

        '<article class="scope-card">' +
          '<div class="scope-card-top">' +
            '<span>Campanhas estaduais</span>' +
            '<span>◈</span>' +
          '</div>' +
          '<strong>' +
            formatNumber(stateCampaigns) +
          '</strong>' +
          '<small>' +
            'Campanhas sem município identificado' +
          '</small>' +
        '</article>';
    }

    function renderRanking(ranking) {
      const reachRanking =
        ranking.reach ||
        ranking.alcance ||
        [];

      const topItems =
        reachRanking.slice(0, 5);

      if (!topItems.length) {
        rankingList.innerHTML =
          '<div class="empty-state" style="min-height:120px">' +
            '<div>' +
              '<strong>Ranking indisponível</strong>' +
              '<span>Não há dados no período.</span>' +
            '</div>' +
          '</div>';

        return;
      }

      rankingList.innerHTML =
        topItems
          .map(function (item, index) {
            return (
              '<div class="ranking-item">' +
                '<span class="ranking-position">' +
                  (index + 1) +
                '</span>' +
                '<span class="ranking-name" title="' +
                  escapeHtml(
                    item.campaignName ||
                    item.name ||
                    "Campanha"
                  ) +
                '">' +
                  escapeHtml(
                    item.campaignName ||
                    item.name ||
                    "Campanha"
                  ) +
                '</span>' +
                '<span class="ranking-value">' +
                  formatNumber(item.value) +
                '</span>' +
              '</div>'
            );
          })
          .join("");
    }

    function getFilteredCampaigns() {
      const searchTerm =
        campaignSearch.value
          .trim()
          .toLowerCase();

      const selectedScope =
        scopeFilter.value;

      const selectedStatus =
        statusFilter.value;

      return state.campaigns.filter(
        function (campaign) {
          const campaignName =
            String(
              campaign.name || ""
            ).toLowerCase();

          const campaignScope =
            campaign.geographicScope
              ?.type || "state";

          const active =
            isCampaignActive(campaign);

          const matchesSearch =
            !searchTerm ||
            campaignName.includes(searchTerm);

          const matchesScope =
            selectedScope === "all" ||
            campaignScope === selectedScope;

          const matchesStatus =
            selectedStatus === "all" ||
            (
              selectedStatus === "active" &&
              active
            ) ||
            (
              selectedStatus === "ended" &&
              !active
            );

          return (
            matchesSearch &&
            matchesScope &&
            matchesStatus
          );
        }
      );
    }

    function createCampaignCard(campaign) {
      const performance =
        campaign.performance || {};

      const geographicScope =
        campaign.geographicScope || {};

      const ibge =
        campaign.ibge || {};

      const summary =
        campaign.summary || {};

      const active =
        isCampaignActive(campaign);

      const location =
        geographicScope.type === "municipal"
          ? geographicScope.municipality
          : "Tocantins";

      const coverage =
        Number(
          ibge.coveragePercentage
        );

      const coverageWidth =
        Number.isFinite(coverage)
          ? Math.max(
              0,
              Math.min(100, coverage)
            )
          : 0;

      const coverContent =
        campaign.cover?.url
          ? (
              '<img' +
                ' src="' +
                escapeHtml(campaign.cover.url) +
                '"' +
                ' alt="Capa da campanha"' +
                ' loading="lazy"' +
                ' referrerpolicy="no-referrer"' +
              '>'
            )
          : (
              '<div class="campaign-cover-placeholder">' +
                '<div>' +
                  '<strong>Capa não disponível</strong><br>' +
                  'O criativo poderá ser atualizado pela Meta.' +
                '</div>' +
              '</div>'
            );

      return (
        '<article class="campaign-card">' +
          '<div class="campaign-cover">' +
            coverContent +

            '<div class="campaign-badges">' +
              '<span class="badge">' +
                escapeHtml(
                  geographicScope.label ||
                  "Estadual"
                ) +
              '</span>' +

              '<span class="badge ' +
                (active ? "active" : "ended") +
              '">' +
                (active ? "Ativa" : "Encerrada") +
              '</span>' +
            '</div>' +
          '</div>' +

          '<div class="campaign-content">' +
            '<h3 class="campaign-name">' +
              escapeHtml(
                campaign.name ||
                "Campanha sem nome"
              ) +
            '</h3>' +

            '<div class="campaign-location">' +
              '<span>⌖</span>' +
              '<span>' +
                escapeHtml(location || "Tocantins") +
              '</span>' +
            '</div>' +

            '<div class="campaign-metrics">' +
              '<div class="campaign-metric">' +
                '<span>Investimento</span>' +
                '<strong>' +
                  formatCurrency(
                    performance.spend
                  ) +
                '</strong>' +
              '</div>' +

              '<div class="campaign-metric">' +
                '<span>Alcance</span>' +
                '<strong>' +
                  formatNumber(
                    performance.reach
                  ) +
                '</strong>' +
              '</div>' +

              '<div class="campaign-metric">' +
                '<span>Visualizações</span>' +
                '<strong>' +
                  formatNumber(
                    performance.views
                  ) +
                '</strong>' +
              '</div>' +

              '<div class="campaign-metric">' +
                '<span>Engajamentos</span>' +
                '<strong>' +
                  formatNumber(
                    performance.engagement
                  ) +
                '</strong>' +
              '</div>' +

              '<div class="campaign-metric coverage">' +
                '<span>' +
                  'Cobertura estimada da população' +
                '</span>' +

                '<strong>' +
                  formatPercentage(
                    ibge.coveragePercentage
                  ) +
                '</strong>' +

                '<div class="coverage-progress">' +
                  '<div style="width:' +
                    coverageWidth +
                    '%"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="campaign-footer">' +
              '<span>' +
                formatNumber(
                  summary.totalAds
                ) +
                ' anúncios' +
              '</span>' +

              '<span>' +
                (
                  ibge.population
                    ? (
                        'População: ' +
                        formatNumber(
                          ibge.population
                        )
                      )
                    : 'População não informada'
                ) +
              '</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    function createCampaignGroup(
      title,
      campaigns
    ) {
      if (!campaigns.length) {
        return "";
      }

      return (
        '<section class="campaign-group">' +
          '<div class="campaign-group-header">' +
            '<h3>' +
              escapeHtml(title) +
            '</h3>' +
            '<span class="campaign-count">' +
              campaigns.length +
            '</span>' +
          '</div>' +

          '<div class="campaigns-grid">' +
            campaigns
              .map(createCampaignCard)
              .join("") +
          '</div>' +
        '</section>'
      );
    }

    function renderCampaigns() {
      const filteredCampaigns =
        getFilteredCampaigns();

      if (!filteredCampaigns.length) {
        campaignGroups.innerHTML =
          '<div class="empty-state">' +
            '<div>' +
              '<strong>Nenhuma campanha encontrada</strong>' +
              '<span>' +
                'Revise o período ou os filtros selecionados.' +
              '</span>' +
            '</div>' +
          '</div>';

        return;
      }

      const activeCampaigns =
        filteredCampaigns.filter(
          isCampaignActive
        );

      const endedCampaigns =
        filteredCampaigns.filter(
          function (campaign) {
            return !isCampaignActive(campaign);
          }
        );

      campaignGroups.innerHTML =
        createCampaignGroup(
          "Campanhas ativas",
          activeCampaigns
        ) +
        createCampaignGroup(
          "Campanhas encerradas e inativas",
          endedCampaigns
        );
    }

    async function loadDashboard(
      since,
      until
    ) {
      submitButton.disabled = true;

      setFeedback(
        "loading",
        "Carregando informações do período selecionado..."
      );

      renderLoadingSkeleton();

      try {
        const endpoint =
          "/meta-ads/dashboard" +
          "?since=" +
          encodeURIComponent(since) +
          "&until=" +
          encodeURIComponent(until);

        const response =
          await fetch(endpoint, {
            headers: {
              Accept: "application/json"
            },
            cache: "no-store"
          });

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.error ||
            "Não foi possível carregar os dados."
          );
        }

        state.campaigns =
          result.data?.campaigns || [];

        state.summary =
          result.data?.summary || {};

        state.ranking =
          result.data?.ranking || {};

        state.geography =
          result.data?.geography || {};

        renderMetrics(state.summary);

        renderScopeSummary(
          state.geography,
          state.summary
        );

        renderRanking(state.ranking);

        renderCampaigns();

        setFeedback(
          "success",
          "Dados atualizados para o período de " +
            since +
            " a " +
            until +
            "."
        );

        window.setTimeout(
          hideFeedback,
          3500
        );
      } catch (error) {
        state.campaigns = [];

        metricsGrid.innerHTML = "";

        scopeSummary.innerHTML = "";

        rankingList.innerHTML = "";

        campaignGroups.innerHTML =
          '<div class="empty-state">' +
            '<div>' +
              '<strong>' +
                'Não foi possível carregar o Dashboard' +
              '</strong>' +
              '<span>' +
                'Atualize o token de acesso da Meta e tente novamente.' +
              '</span>' +
            '</div>' +
          '</div>';

        setFeedback(
          "error",
          error.message ||
          "Ocorreu um erro ao carregar os dados."
        );
      } finally {
        submitButton.disabled = false;
      }
    }

    mobileMenuButton.addEventListener(
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

    filtersForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        loadDashboard(
          sinceInput.value,
          untilInput.value
        );
      }
    );

    campaignSearch.addEventListener(
      "input",
      renderCampaigns
    );

    scopeFilter.addEventListener(
      "change",
      renderCampaigns
    );

    statusFilter.addEventListener(
      "change",
      renderCampaigns
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
        "no-store, no-cache, must-revalidate"
    }
  });
}
