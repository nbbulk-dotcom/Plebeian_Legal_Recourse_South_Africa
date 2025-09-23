from pydantic import BaseSettings, AnyUrl


class Settings(BaseSettings):
    ENV: str = "development"
    POSTGRES_DSN: str
    COPILOT_BASE_URL: AnyUrl
    COPILOT_CLIENT_ID: str | None = None
    COPILOT_CLIENT_SECRET: str | None = None
    AI_ENABLED: bool = False
    AI_AUTO_APPROVE: bool = False
    REQUEST_TIMEOUT_SECONDS: int = 20

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
