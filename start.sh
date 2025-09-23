#!/usr/bin/env bash
set -euo pipefail
REPO_ROOT=/app/backend
PYTHON_BIN=$(which python)
if [ ! -f "${REPO_ROOT}/app/main.py" ]; then
  echo "ERROR: missing ${REPO_ROOT}/app/main.py" >&2
  exit 1
fi
exec "$PYTHON_BIN" "${REPO_ROOT}/run.py"
