#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""NeuralDock - Local LLM Hardware Compatibility Analyzer
A beautiful bilingual (EN/CN) web UI for llmfit.
"""

import json
import subprocess
import sys
import os
import webbrowser
import threading
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder="templates")

PORT = int(os.environ.get("NEURALDOCK_PORT", 18090))


def run_llmfit(*args):
    """Execute llmfit CLI command and return parsed JSON."""
    try:
        result = subprocess.run(
            ["llmfit"] + list(args),
            capture_output=True, text=True, timeout=60
        )
        return json.loads(result.stdout)
    except FileNotFoundError:
        return {"error": "llmfit not found. Please install: brew install llmfit"}
    except json.JSONDecodeError:
        return {"error": "Failed to parse llmfit output"}
    except subprocess.TimeoutExpired:
        return {"error": "llmfit command timed out"}
    except Exception as e:
        return {"error": str(e)}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/system")
def api_system():
    return jsonify(run_llmfit("system", "--json"))


@app.route("/api/models")
def api_models():
    return jsonify(run_llmfit("--cli", "--json"))


@app.route("/api/recommend")
def api_recommend():
    limit = request.args.get("limit", "50")
    use_case = request.args.get("use_case", "")
    args = ["recommend", "--json", "--limit", limit]
    if use_case:
        args += ["--use-case", use_case]
    return jsonify(run_llmfit(*args))


@app.route("/api/health")
def api_health():
    return jsonify({"status": "ok", "version": "1.0.0"})


def open_browser():
    """Open browser after a short delay."""
    import time
    time.sleep(1.5)
    webbrowser.open(f"http://localhost:{PORT}")


def main():
    print(r"""
    _   _                      _ ____             _    
   | \ | | ___ _   _ _ __ __ _| |  _ \  ___   ___| | __
   |  \| |/ _ \ | | | '__/ _` | | | | |/ _ \ / __| |/ /
   | |\  |  __/ |_| | | | (_| | | |_| | (_) | (__|   < 
   |_| \_|\___|\__,_|_|  \__,_|_|____/ \___/ \___|_|\_\
    """)
    print(f"  🚀 NeuralDock v1.0.0")
    print(f"  🌐 http://localhost:{PORT}")
    print(f"  📖 Press Ctrl+C to quit\n")

    if "--no-browser" not in sys.argv:
        threading.Thread(target=open_browser, daemon=True).start()

    app.run(host="127.0.0.1", port=PORT, debug=False)


if __name__ == "__main__":
    main()
