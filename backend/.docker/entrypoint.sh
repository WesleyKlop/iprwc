#!/usr/bin/env sh

set -eu

if [ -z "${DATABASE_URL:-}" ]; then
  >&2 echo "Please set DATABASE_URL first"
  exit 1
fi

npx prisma generate

echo "Migrating database"
npx prisma migrate deploy

exec "src/bin/$1.mjs"
