from fastapi import APIRouter

router = APIRouter()

@router.get("/summary", tags=["reports"])
async def summary_preview():
    return {"message": "Summary endpoint placeholder"}
