#!/usr/bin/env python3
"""
Defensive entrypoint that handles platform command overrides
This script ensures uvicorn is always used regardless of platform commands
"""
import os
import sys
import subprocess

def main():
    print("=== Constitutional Liberation Platform Backend Starting ===")
    print(f"Command args: {sys.argv}")
    print(f"Environment PORT: {os.getenv('PORT', '8000')}")
    
    port = os.getenv("PORT", "8000")
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"Starting uvicorn on {host}:{port}")
    
    backend_dir = "/app/backend"
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)
        print(f"Changed directory to: {backend_dir}")
    
    main_py = os.path.join(os.getcwd(), "app", "main.py")
    if not os.path.exists(main_py):
        print(f"ERROR: Missing {main_py}")
        sys.exit(1)
    
    print(f"Validated main.py exists at: {main_py}")
    
    os.execvp("uvicorn", [
        "uvicorn", "app.main:app", 
        "--host", host, 
        "--port", port,
        "--proxy-headers",
        "--limit-concurrency", "200"
    ])

if __name__ == "__main__":
    main()
