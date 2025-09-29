import os
from typing import Generator

from fastapi import HTTPException
from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:password@localhost:5432/constitutional_platform",
)

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = None
SessionLocal = None
Base = declarative_base()
metadata = MetaData()

def get_engine():
    global engine
    if engine is None:
        engine = create_engine(
            DATABASE_URL,
            poolclass=StaticPool,
            connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
            echo=True,
        )
    return engine

def get_session_local():
    global SessionLocal
    if SessionLocal is None:
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=get_engine())
    return SessionLocal


def get_db() -> Generator:
    try:
        session_local = get_session_local()
        db = session_local()
        yield db
    except Exception as e:
        print(f"Database session creation failed: {e}")
        raise HTTPException(status_code=503, detail="Database unavailable")
    finally:
        if 'db' in locals():
            db.close()


def create_tables():
    try:
        engine = get_engine()
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Database connection failed: {e}")
        raise e
