from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    ENV: str = "development"
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/constitutional_platform"
    POSTGRES_DSN: str = "postgresql://postgres:password@localhost:5432/constitutional_platform"
    AI_ENABLED: bool = False
    REQUEST_TIMEOUT_SECONDS: int = 20
    SECRET_KEY: str = "your-secret-key-change-in-production-constitutional-platform-2024"
    JWT_SECRET_KEY: str = "constitutional-platform-jwt-secret-key-2024"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Additional fields from .env
    DEV_RELOAD: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "constitutional_platform"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173"


settings = Settings()