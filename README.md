<div align="center">

# 🧠 NeuralDock

**Local LLM Hardware Compatibility Analyzer**

*Find the perfect LLM for your hardware — beautifully.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-brightgreen)]()
[![Powered by llmfit](https://img.shields.io/badge/Powered%20by-llmfit-purple)](https://github.com/AlexsJones/llmfit)

[English](README.md) | [中文](README_CN.md)

</div>

---

## What is NeuralDock?

NeuralDock is a beautiful, bilingual (English/Chinese) web UI and desktop application built on top of [llmfit](https://github.com/AlexsJones/llmfit). It scans your local hardware (CPU, GPU, RAM) and provides a comprehensive, sortable, filterable dashboard of **500+ LLM models** — showing you exactly which ones will run well on your machine.

### Key Features

- **Hardware Detection** — Automatically detects CPU, GPU, RAM, and backend (Metal/CUDA/CPU)
- **500+ Models** — Browse a comprehensive database with compatibility scores
- **Smart Scoring** — Each model gets a composite score based on quality, speed, fit, and context
- **Bilingual UI** — Full English and Chinese interface with one-click toggle
- **Powerful Filters** — Filter by fit level (Perfect/Good/Marginal/Too Tight), category (General/Coding/Chat/Reasoning/Multimodal/Embedding), and free-text search
- **Sortable Columns** — Click any column header to sort
- **Detail Modal** — Click any model for a detailed breakdown with score components and notes
- **Desktop App** — Available as a native Mac (.dmg) and Windows (.exe) application via Electron
- **Dark Theme** — Gorgeous dark UI designed for developers

## Screenshots

| Hardware Cards | Model Table | Detail Modal |
|:-:|:-:|:-:|
| ![](docs/screenshot-cards.png) | ![](docs/screenshot-table.png) | ![](docs/screenshot-modal.png) |

## Quick Start

### Prerequisites

- **llmfit** — Install via Homebrew (macOS) or Cargo:
  ```bash
  brew install llmfit        # macOS
  # or
  cargo install llmfit       # Any platform with Rust
  ```
- **Python 3.8+** with pip

### Option 1: Web UI (Recommended)

```bash
git clone https://github.com/anson55sky/NeuralDock.git
cd NeuralDock
chmod +x start.sh
./start.sh
```

This will automatically create a virtual environment, install Flask, and open the UI at `http://localhost:18090`.

**Windows:**
```cmd
git clone https://github.com/anson55sky/NeuralDock.git
cd NeuralDock
start.bat
```

### Option 2: Manual Start

```bash
pip install flask
python app/server.py
```

### Option 3: Desktop App (Electron)

```bash
cd desktop
npm install
npm start
```

To build distributable packages:

```bash
# macOS .dmg
npm run build:mac

# Windows .exe installer
npm run build:win

# Both
npm run build:all
```

Built packages will be in `desktop/dist/`.

## Project Structure

```
NeuralDock/
├── app/
│   ├── server.py              # Flask backend (API + static serving)
│   └── templates/
│       └── index.html         # Full bilingual SPA (EN/CN)
├── desktop/
│   ├── main.js                # Electron main process
│   ├── preload.js             # Secure bridge
│   └── package.json           # Electron + builder config
├── scripts/
│   └── build-desktop.sh       # Desktop build helper
├── start.sh                   # Quick start (macOS/Linux)
├── start.bat                  # Quick start (Windows)
├── requirements.txt           # Python dependencies
├── README.md                  # English documentation
├── README_CN.md               # Chinese documentation
└── LICENSE
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | Main UI page |
| `GET /api/system` | Hardware information (JSON) |
| `GET /api/models` | Full model list with scores (JSON) |
| `GET /api/recommend?limit=N` | Top N recommended models (JSON) |
| `GET /api/health` | Health check |

## Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `NEURALDOCK_PORT` | `18090` | Server port |

## Tech Stack

- **Backend**: Python + Flask
- **Frontend**: Vanilla HTML/CSS/JS (no build step, no frameworks)
- **Desktop**: Electron + electron-builder
- **Data Source**: [llmfit](https://github.com/AlexsJones/llmfit) CLI
- **i18n**: Client-side JavaScript dictionary

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [llmfit](https://github.com/AlexsJones/llmfit) by Alex Jones — the powerful CLI tool that powers all hardware analysis and model scoring
- Built with ❤️ for the local LLM community
