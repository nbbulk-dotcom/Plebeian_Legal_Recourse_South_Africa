import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        r = await ac.get("/health")
        assert r.status_code == 200

@pytest.mark.asyncio
async def test_query_when_disabled():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        payload = {"request_id": "req-12345", "prompt": "Test prompt", "user_id": "u1"}
        r = await ac.post("/query", json=payload)
        assert r.status_code == 503
