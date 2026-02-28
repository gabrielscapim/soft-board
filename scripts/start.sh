#!/bin/bash

set -e

APP_NAME="${APP_NAME:-api}"
echo "Starting app for APP_NAME=$APP_NAME"

case "$APP_NAME" in
  "api")
    (cd apps/api && npm run start)
    ;;
esac
