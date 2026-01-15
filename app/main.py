from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import contacts, deals, tasks

app = FastAPI(title="CRM Tool API", version="0.1.0")

app.include_router(contacts.router)
app.include_router(deals.router)
app.include_router(tasks.router)

# CORS Configuration
origins = ["*"] # Adjust in production

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}
