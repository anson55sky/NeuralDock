#!/bin/bash
# NeuralDock - Quick Start Script (macOS / Linux)
set -e

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║        NeuralDock Quick Start        ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

# Check llmfit
if ! command -v llmfit &> /dev/null; then
    echo "❌ llmfit not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install llmfit
    else
        echo "Please install llmfit first: https://github.com/AlexsJones/llmfit"
        exit 1
    fi
fi
echo "✅ llmfit $(llmfit --version 2>/dev/null || echo 'found')"

# Check Python
PYTHON=""
for p in python3 python; do
    if command -v $p &> /dev/null; then
        PYTHON=$p
        break
    fi
done
if [ -z "$PYTHON" ]; then
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi
echo "✅ $($PYTHON --version)"

# Create venv if needed
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
if [ ! -d "$VENV_DIR" ]; then
    echo "📦 Creating virtual environment..."
    $PYTHON -m venv "$VENV_DIR"
fi

# Install dependencies
echo "📦 Installing dependencies..."
"$VENV_DIR/bin/pip" install -q -r "$SCRIPT_DIR/requirements.txt"

# Start server
echo ""
echo "🚀 Starting NeuralDock..."
"$VENV_DIR/bin/python" "$SCRIPT_DIR/app/server.py"
