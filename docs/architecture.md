# Architecture Blueprint

## High-Level
```
Bank portals/CSV -> Ingestion Workers -> Raw Storage (S3/GCS) -> Normalization + FX -> Postgres
                                                                      |
                                                               Reconciliation
                                                                      |
                                                         Reporting API / Export Jobs
                                                                      |
                                           Web Dashboard | Email/Telegram | Google Sheets
```

## Components
1. **Ingestion Workers (Python)**
   - Playwright-based scrapers per bank.
   - CSV parser pipeline with schema mapping + validation.
   - Store raw artifacts (encrypted) before processing.

2. **Processing Service (FastAPI background tasks / Celery)**
   - Currency conversion via EOD FX service.
   - Categorization engine (rule set + embeddings later).
   - Transfer reconciliation (matching engine with heuristics + manual overrides).
   - Audit logging + metrics.

3. **Data Platform (Postgres + DuckDB for analytics)**
   - Star schema for transactions with dimension tables (accounts, categories, vendors).
   - Materialized views for monthly summaries.

4. **Notification + Export Layer**
   - Email via Gmail SMTP skill (already working).
   - Telegram bot pushes (existing token reused).
   - Google Sheets sync (service account) for monthly snapshot.

5. **Frontend (Next.js)**
   - GraphQL/REST client hitting backend summary endpoints.
   - Real-time toast notifications for ingestion results.

## Data Flow Steps
1. Scheduler triggers ingestion job.
2. Worker logs in → downloads statements or scrapes HTML → stores raw file.
3. Normalizer loads raw data into staging tables, applies FX, categories.
4. Reconciler flags mismatched transfers & duplicates.
5. Summary generator populates monthly KPIs + exports.
6. Notifications + dashboard consume same summary API for consistency.

## Security Considerations
- Secrets pulled from `.env` locally, Secret Manager in cloud.
- Scraper credentials encrypted at rest using libsodium (key derived from environment secret).
- Role-based tokens for GitHub Actions (CI/CD) stored as org secrets.
- PAT rotation: auto-expiring tokens (30 days) for automation; long-lived tokens avoided.

## CI/CD
- GitHub Actions pipeline (to add) with jobs: lint/test/backend, lint/test/frontend, docker build, deploy (future).
- Conventional commits enforced via lint-staged/husky later.
