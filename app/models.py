from typing import Optional, List
from pydantic import BaseModel
from enum import Enum
from datetime import date

# Usage:
# Contact Models
class ContactBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int

# Deal Models
class DealStage(str, Enum):
    LEAD = "Lead"
    QUALIFIED = "Qualified"
    PROPOSAL = "Proposal"
    NEGOTIATION = "Negotiation"
    CLOSED_WON = "Closed Won"
    CLOSED_LOST = "Closed Lost"

class DealBase(BaseModel):
    title: str
    value: float
    stage: DealStage = DealStage.LEAD
    contact_id: int

class DealCreate(DealBase):
    pass

class Deal(DealBase):
    id: int
    
    class Config:
        from_attributes = True

# Task Models
class TaskStatus(str, Enum):
    TODO = "Todo"
    IN_PROGRESS = "In Progress"
    DONE = "Done"

class TaskBase(BaseModel):
    title: str
    status: TaskStatus = TaskStatus.TODO
    due_date: Optional[date] = None
    related_to_type: Optional[str] = None # e.g. "contact", "deal"
    related_to_id: Optional[int] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
