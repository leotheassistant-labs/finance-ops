# Infrastructure Plan

## Local
- Docker Compose orchestrating Postgres, Redis (for jobs), backend, frontend, worker.
- `.env` template for secrets (FX tokens, Telegram, SMTP, Sarwa credentials).
- Make targets: `make up`, `make ingest`, `make test`.

## Future Cloud
- GCP preferred (Cloud SQL Postgres, Cloud Run for API + worker, Cloud Scheduler for nightly jobs).
- Secret Manager for credentials, Cloud Armor for IP restrictions.
- Terraform modules under `infrastructure/terraform/` (to be added) for reproducible deployments.

## Security Hardening
- Vault-like secret injection for scraping credentials (never stored in git).
- Encrypted S3 bucket / GCS for statement snapshots.
- Centralized logging (OpenSearch / Cloud Logging) with retention controls.
