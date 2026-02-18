# Finance Ops

Personal finance intelligence platform aggregating HSBC, Wio, ADCB, and Sarwa accounts to deliver reconciled monthly insights, exports, and alerts.

## Structure
- `docs/` – requirements + architecture
- `backend/` – FastAPI service for ingestion/processing
- `frontend/` – Next.js dashboard
- `infrastructure/` – deployment + security plan

## Quick start
```bash
# backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# frontend
cd frontend
pnpm install
pnpm dev
```

## Roadmap
1. Implement ingestion connectors + staging tables
2. Build FX + categorization pipeline
3. Wire reporting endpoints + dashboard visualizations
4. Add notifications, exports, and weekly insights
