import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200

def test_query_when_disabled():
    payload = {"request_id": "req-12345", "prompt": "Test prompt", "user_id": "u1"}
    r = client.post("/query", json=payload)
    assert r.status_code == 503
