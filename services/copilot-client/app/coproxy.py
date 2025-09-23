import asyncio
import httpx
from tenacity import retry, stop_after_attempt, wait_fixed
from app.config import settings


class CopilotProxy:
    def __init__(self):
        self.base = str(settings.COPILOT_BASE_URL)
        self.timeout = settings.REQUEST_TIMEOUT_SECONDS

    async def _get_token(self) -> str | None:
        if settings.COPILOT_CLIENT_SECRET and settings.COPILOT_CLIENT_ID:
            return f"token-for-{settings.COPILOT_CLIENT_ID}"
        return None

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(1))
    async def call(self, path: str, payload: dict) -> dict:
        token = await self._get_token()
        headers = {"Authorization": f"Bearer {token}"} if token else {}
        url = self.base.rstrip("/") + "/" + path.lstrip("/")
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            resp = await client.post(url, json=payload, headers=headers)
            resp.raise_for_status()
            return resp.json()
