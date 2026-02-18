from fastapi import FastAPI

from app.api import router as api_router

app = FastAPI(
    title="Finance Ops Backend",
    version="0.1.0",
    description="APIs for ingestion, classification, reconciliation, and reporting",
)

app.include_router(api_router)


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}
