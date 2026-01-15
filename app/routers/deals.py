from fastapi import APIRouter, HTTPException
from typing import List
from app.models import Deal, DealCreate

router = APIRouter(
    prefix="/deals",
    tags=["deals"],
)

# In-memory storage
deals_db = []
current_id = 0

@router.get("/", response_model=List[Deal])
def get_deals():
    return deals_db

@router.get("/{deal_id}", response_model=Deal)
def get_deal(deal_id: int):
    for deal in deals_db:
        if deal.id == deal_id:
            return deal
    raise HTTPException(status_code=404, detail="Deal not found")

@router.post("/", response_model=Deal)
def create_deal(deal: DealCreate):
    global current_id
    current_id += 1
    new_deal = Deal(id=current_id, **deal.model_dump())
    deals_db.append(new_deal)
    return new_deal

@router.put("/{deal_id}", response_model=Deal)
def update_deal(deal_id: int, deal_update: DealCreate):
    for i, deal in enumerate(deals_db):
        if deal.id == deal_id:
            updated_deal = Deal(id=deal_id, **deal_update.model_dump())
            deals_db[i] = updated_deal
            return updated_deal
    raise HTTPException(status_code=404, detail="Deal not found")

@router.delete("/{deal_id}")
def delete_deal(deal_id: int):
    global deals_db
    for i, deal in enumerate(deals_db):
        if deal.id == deal_id:
            del deals_db[i]
            return {"message": "Deal deleted"}
    raise HTTPException(status_code=404, detail="Deal not found")
