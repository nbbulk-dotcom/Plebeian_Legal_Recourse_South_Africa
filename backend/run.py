#!/usr/bin/env python3
import os
import sys
import uvicorn

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_MODULE = "app.main:app"

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    main_py = os.path.join(REPO_ROOT, "app", "main.py")
    if not os.path.isfile(main_py):
        sys.stderr.write(f"Missing expected file: {main_py}\n")
        sys.exit(2)
    uvicorn.run(APP_MODULE, host=host, port=port, reload=os.getenv("DEV_RELOAD", "false").lower() == "true")
