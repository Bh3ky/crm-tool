from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_contact():
    response = client.post("/contacts/", json={"name": "Alice", "email": "alice@example.com"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Alice"
    assert data["email"] == "alice@example.com"
    assert "id" in data

def test_get_contacts():
    response = client.get("/contacts/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_deal():
    # Ensure a contact exists first
    client.post("/contacts/", json={"name": "Bob", "email": "bob@example.com", "id": 2})
    
    response = client.post("/deals/", json={
        "title": "Big Sale",
        "value": 1000.0,
        "contact_id": 2
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Big Sale"
    assert data["value"] == 1000.0

def test_create_task():
    response = client.post("/tasks/", json={
        "title": "Call Client",
        "status": "Todo"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Call Client"
    assert data["status"] == "Todo"
