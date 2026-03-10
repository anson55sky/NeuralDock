#!/bin/bash
# Build NeuralDock desktop app (Mac & Windows)
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DESKTOP_DIR="$SCRIPT_DIR/../desktop"

echo "📦 Installing Electron dependencies..."
cd "$DESKTOP_DIR"
npm install

echo ""
echo "🔨 Building desktop app..."

if [[ "$1" == "mac" ]]; then
    npm run build:mac
    echo "✅ Mac build complete! Check desktop/dist/"
elif [[ "$1" == "win" ]]; then
    npm run build:win
    echo "✅ Windows build complete! Check desktop/dist/"
else
    npm run build:all
    echo "✅ All builds complete! Check desktop/dist/"
fi
