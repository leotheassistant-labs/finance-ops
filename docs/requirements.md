# Finance Tracking Platform — Requirements v0.1

## 1. Objectives
- Consolidate personal finances across HSBC UAE, Wio, ADCB, and Sarwa (USD) with at least 12 months of history at launch.
- Classify every transaction (income, expenses, transfers, investments) with configurable categories and manual overrides.
- Normalize all amounts in AED with configurable FX feeds (default: end-of-day rates, transaction-day locked).
- Provide monthly (and eventually weekly) insights across net cash flow, category breakdowns, investments, and reconciliation status.
- Automate imports (preferred) via secure web scraping; support CSV uploads as fallback.
- Deliver reports through a responsive web dashboard, optional email/PDF/CSV attachments, Google Sheets export, and Telegram notifications.
- Maintain strong security: encrypted credentials, least-privilege secrets storage, audit logging, and deployable locally first with a path to cloud hosting.

## 2. Personas & Use Cases
- **Xavier (primary user)**: reviews monthly summary, drills into categories, verifies transfers, exports data for accountants, receives Telegram/email digests.
- **Automation agent (Leo)**: runs nightly ingestion + processing, flags reconciliation issues, triggers notifications, updates GitHub CI pipelines.

## 3. Functional Requirements
### 3.1 Data Ingestion
1. **Sources**: HSBC, Wio, ADCB (banking/loan), Sarwa (investments).
2. **Acquisition modes**:
   - Secure credential vault for scripted Playwright sessions (headless) per institution.
   - CSV import pipeline (schema detection + mapping) for manual uploads.
3. **History**: fetch last 12 months on first run; incremental thereafter.
4. **Transfer handling**: do **not** drop intra-account transfers; flag them so the net effect across internal accounts equals zero.
5. **Logging**: every ingestion run captures input metadata, result counts, errors, and is auditable.

### 3.2 Data Model
- **Accounts**: `id`, `institution`, `account_type`, `currency`, `mask`, `ingestion_method`, `status`.
- **Transactions**: `id`, `account_id`, `date`, `posted_date`, `description`, `amount_original`, `currency_original`, `amount_aed`, `category`, `subcategory`, `tags`, `source_ref`, `is_transfer`, `transfer_group_id`, `confidence`, `last_reviewed_by`, `last_reviewed_at`.
- **Categories**: hierarchical taxonomy (Income/Salary, Expenses/Housing, Investments/Contributions, Transfers, etc.) with user-editable mappings.
- **FX Rates**: transaction-day rate per currency (default EOD). Historical values are locked once stored.
- **Audit Log**: table capturing manual edits, re-categorizations, reconciliations.

### 3.3 Processing Pipeline
1. Nightly schedule (cron/worker) orchestrates:
   - Scraping / CSV import jobs per bank.
   - FX refresh (EOD rate for each currency encountered that day).
   - Auto-categorization (rules + ML-lite). Manual overrides persist.
   - Transfer reconciliation engine (match debits/credits by amount/date/window/permutation).
   - Generation of summary metrics and scheduled exports.
2. Fallback manual run (CLI) for ad-hoc ingestion.
3. Config-driven connectors (YAML/JSON) to enable/disable banks, set MFA prompts, and credential references.

### 3.4 Reporting & UX
- **Dashboard (Phase 1 Web)**: built with Next.js (React) + Tailwind, mobile-friendly. Widgets include:
  - Portfolio overview (deposits, loans, investments) with sparkline trends.
  - Net cash flow gauge per month vs. prior.
  - Category heat map + drill-down list.
  - Transfer reconciliation panel with outstanding mismatches.
  - Investment summary (Sarwa) converted to AED with contributions vs. returns.
- **Exports**: CSV download per account/date range; Google Sheets sync option via service account.
- **Notifications**:
  - Monthly email (not at night) summarizing KPIs, with optional CSV/PDF attachments and dashboard link.
  - Telegram bot push for the same summary; future weekly/anomaly alerts.

### 3.5 Integrations
- **Email**: reuse existing SMTP skill (gmail-ops) for scheduled summaries.
- **Telegram**: leverage current bot credentials + chat ID (no new bot for now).
- **Google Sheets**: service account credentials stored securely; push summary tab and transaction tab snapshots.

### 3.6 Security & Compliance
- Local deployment initially (Docker). Plan for future cloud move with secrets in Vault/Secret Manager.
- Encrypt stored credentials & tokens (e.g., libsodium). Use `.env` templates with no secrets committed.
- 2FA enforced on GitHub repo + CI secrets.
- No regulatory retention requirements yet, but design to keep raw data for at least 24 months with deletion controls.

### 3.7 Delivery & DevOps
- GitHub org `leotheassistant-*` (final name TBD) with repo for this project.
- CI/CD (GitHub Actions) running lint, tests, security scans, container build, and optionally deploy script.
- Use latest Codex-capable model for coding tasks.
- Issue templates + project board to track phases (Ingestion, Processing, Reporting, Notifications, Hardening).

## 4. Non-Functional Requirements
- **Performance**: ingest + process nightly run under 15 minutes for first 12 months; incremental runs <5 minutes.
- **Scalability**: architecture supports adding new banks/currencies with minimal code changes.
- **Reliability**: retries + alerting if scraping/import fails; manual override UI for missing data.
- **Extensibility**: plugin-like connectors for future vendors, support for receipt attachments in later phase.

## 5. Future Enhancements
- Weekly insight email + anomaly detection (Outlier spend, missed salary, etc.).
- Mobile app or PWA with notifications.
- Receipt/invoice attachment workflow.
- Budgeting & forecasting with scenario planning.
- Cloud multitenancy (if shared with others) with stronger RBAC.

---
_Last updated: 2026-02-17 by Leo._
