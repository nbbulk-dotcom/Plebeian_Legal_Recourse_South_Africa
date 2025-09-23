from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    ENV: str = "development"
    POSTGRES_DSN: str = (
        "postgresql://postgres:password@localhost:5432/constitutional_platform"
    )
    AI_ENABLED: bool = False
    REQUEST_TIMEOUT_SECONDS: int = 20
    SECRET_KEY: str = "your-secret-key-change-in-production-constitutional-platform-2024"
    JWT_SECRET_KEY: str = "constitutional-platform-jwt-secret-key-2024"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Settings()
