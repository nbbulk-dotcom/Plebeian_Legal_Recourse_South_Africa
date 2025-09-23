from pydantic import BaseSettings

class Settings(BaseSettings):
    ENV: str = "development"
    POSTGRES_DSN: str = "postgresql://postgres:password@localhost:5432/constitutional_platform"
    AI_ENABLED: bool = False
    REQUEST_TIMEOUT_SECONDS: int = 20

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
