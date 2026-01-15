from fastapi import APIRouter, HTTPException
from typing import List
from app.models import Contact, ContactCreate

router = APIRouter(
    prefix="/contacts",
    tags=["contacts"],
)

# In-memory storage
contacts_db = []
current_id = 0

@router.get("/", response_model=List[Contact])
def get_contacts():
    return contacts_db

@router.get("/{contact_id}", response_model=Contact)
def get_contact(contact_id: int):
    for contact in contacts_db:
        if contact.id == contact_id:
            return contact
    raise HTTPException(status_code=404, detail="Contact not found")

@router.post("/", response_model=Contact)
def create_contact(contact: ContactCreate):
    global current_id
    current_id += 1
    new_contact = Contact(id=current_id, **contact.model_dump())
    contacts_db.append(new_contact)
    return new_contact

@router.put("/{contact_id}", response_model=Contact)
def update_contact(contact_id: int, contact_update: ContactCreate):
    for i, contact in enumerate(contacts_db):
        if contact.id == contact_id:
            updated_contact = Contact(id=contact_id, **contact_update.model_dump())
            contacts_db[i] = updated_contact
            return updated_contact
    raise HTTPException(status_code=404, detail="Contact not found")

@router.delete("/{contact_id}")
def delete_contact(contact_id: int):
    global contacts_db
    for i, contact in enumerate(contacts_db):
        if contact.id == contact_id:
            del contacts_db[i]
            return {"message": "Contact deleted"}
    raise HTTPException(status_code=404, detail="Contact not found")
