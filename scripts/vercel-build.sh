#!/bin/bash
set -e

# Run the Nuxt build
pnpm build

# If .vercel/output already exists at root, we're done
if [ -d ".vercel/output" ]; then
  echo "✓ .vercel/output found at repo root"
  exit 0
fi

# Try to find it and copy to root
echo "Looking for .vercel/output..."
FOUND=$(find . -path '*/.vercel/output/config.json' 2>/dev/null | head -1)

if [ -n "$FOUND" ]; then
  SRC=$(dirname "$FOUND")
  echo "Found at: $SRC — copying to .vercel/output"
  mkdir -p .vercel
  cp -r "$SRC" .vercel/output
  exit 0
fi

# Debug: show what exists
echo "ERROR: .vercel/output not found anywhere"
echo "--- Searching for .vercel directories ---"
find . -name '.vercel' -type d 2>/dev/null || echo "(none)"
echo "--- Searching for Nitro output ---"
find . -name '.output' -type d -maxdepth 4 2>/dev/null || echo "(none)"
echo "--- CWD ---"
pwd
echo "--- ls packages/blog ---"
ls -la packages/blog/ 2>/dev/null | head -20
exit 1
