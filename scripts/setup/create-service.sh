#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <service-name> [services-root]" >&2
  exit 1
fi

SERVICE_NAME="$1"
SERVICES_ROOT="${2:-services}"
SERVICE_ROOT="$SERVICES_ROOT/$SERVICE_NAME"

if [[ ! "$SERVICE_NAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Error: service name must be kebab-case: $SERVICE_NAME" >&2
  exit 1
fi

if [[ -e "$SERVICE_ROOT" ]]; then
  echo "Error: target service path already exists: $SERVICE_ROOT" >&2
  exit 1
fi

mkdir -p "$SERVICE_ROOT"/{src,tests,contracts,configs}

cat > "$SERVICE_ROOT/package.json" <<JSON
{
  "name": "@oneeloom/$SERVICE_NAME",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./contracts": "./contracts/index.ts",
    "./configs": "./configs/index.ts"
  },
  "scripts": {
    "dev": "echo \\"define dev later\\"",
    "build": "echo \\"define build later\\"",
    "test": "bun test tests",
    "check": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@oneeloom/env": "workspace:*",
    "@oneeloom/report": "workspace:*",
    "zenums": "^0.1.6"
  },
  "devDependencies": {
    "@oneeloom/tsconfig": "workspace:*"
  }
}
JSON

cat > "$SERVICE_ROOT/tsconfig.json" <<'JSON'
{
  "extends": "@oneeloom/tsconfig/configs/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src", "tests", "contracts", "configs"],
  "exclude": ["dist", "node_modules"]
}
JSON

cat > "$SERVICE_ROOT/README.md" <<MD
# $SERVICE_NAME

\`$SERVICE_NAME\` is a service in the Oneeloom platform.

It follows the standard service outer structure:

- \`src/\` — runtime implementation area;
- \`tests/\` — service-level validation surface;
- \`contracts/\` — service-owned contracts and external-facing definitions;
- \`configs/\` — service-owned configuration inputs and config-related structures;
- \`.env\` — local raw environment input file.

The service does not expose business runtime logic yet.
MD

touch "$SERVICE_ROOT/.env"

cat > "$SERVICE_ROOT/src/index.ts" <<'TS'
export {}
TS

cat > "$SERVICE_ROOT/contracts/index.ts" <<'TS'
export {}
TS

cat > "$SERVICE_ROOT/configs/index.ts" <<'TS'
export {}
TS

cat > "$SERVICE_ROOT/tests/smoke.test.ts" <<'TS'
import { describe, expect, test } from 'bun:test'

// Smoke coverage for the service boundary before runtime logic is added.
describe('service entrypoint', () => {
  test('keeps the source entrypoint importable', async () => {
    const module = await import('../src/index')

    expect(module).toBeDefined()
  })
})
TS

echo "Service structure created successfully in: $SERVICE_ROOT"