#!/bin/bash

set -e

APP_NAME="${APP_NAME:-api}"
echo "Running postinstall script for APP_NAME=$APP_NAME"

case "$APP_NAME" in
  "api")
    (cd apps/api && npx playwright install chromium)
    ;;
esac
