#!/usr/bin/env python3
"""
Defensive entrypoint that handles platform command overrides
This script intercepts any platform-forced commands and ensures uvicorn is used
"""
import os
import sys
import subprocess

def main():
    cmd_args = sys.argv[1:] if len(sys.argv) > 1 else []
    
    if any("fastapi" in arg for arg in cmd_args) or not cmd_args:
        print("Platform override detected - redirecting to uvicorn")
        port = os.getenv("PORT", "8000")
        os.execvp("uvicorn", [
            "uvicorn", "app.main:app", 
            "--host", "0.0.0.0", 
            "--port", port,
            "--proxy-headers"
        ])
    else:
        os.execvp(cmd_args[0], cmd_args)

if __name__ == "__main__":
    main()
