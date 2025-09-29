#!/usr/bin/env python3
import os
import sys
import subprocess
import uvicorn

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_MODULE = "app.main:app"

def validate_environment():
    """Validate that required files exist before starting"""
    main_py = os.path.join(REPO_ROOT, "app", "main.py")
    if not os.path.isfile(main_py):
        sys.stderr.write(f"FATAL: Missing expected file: {main_py}\n")
        sys.exit(2)
    print(f"✓ Validated main.py exists at: {main_py}")

if __name__ == "__main__":
    validate_environment()
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"Starting uvicorn server on {host}:{port}")
    uvicorn.run(APP_MODULE, host=host, port=port, reload=os.getenv("DEV_RELOAD", "false").lower() == "true")
