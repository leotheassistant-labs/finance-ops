# Backend

FastAPI service handling data ingestion, processing, reconciliation, and reporting APIs.

## Layout
- `app/core` – config, logging, security helpers
- `app/models` – Pydantic schemas + ORM models
- `app/api` – routers for ingestion triggers, summaries, exports

## Getting started
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment variables
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `FX_API_URL`
- `FX_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
```
