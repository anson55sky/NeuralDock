<div align="center">

# 🧠 NeuralDock

**本地大模型硬件适配分析工具**

*为你的硬件找到最合适的大模型 — 优雅而直观。*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/平台-macOS%20%7C%20Windows%20%7C%20Linux-brightgreen)]()
[![Powered by llmfit](https://img.shields.io/badge/基于-llmfit-purple)](https://github.com/AlexsJones/llmfit)

[English](README.md) | [中文](README_CN.md)

</div>

---

## NeuralDock 是什么？

NeuralDock 是一个精美的中英双语 Web UI 和桌面应用，基于 [llmfit](https://github.com/AlexsJones/llmfit) 构建。它会自动扫描你的本地硬件（CPU、GPU、内存），并提供一个全面的、可排序、可筛选的仪表盘，展示 **500+ 大语言模型** 在你机器上的适配情况。

### 核心特性

- **硬件自动检测** — 自动识别 CPU、GPU、内存及后端（Metal/CUDA/CPU）
- **500+ 模型** — 浏览全面的模型数据库，附带兼容性评分
- **智能评分** — 每个模型基于质量、速度、适配度、上下文四个维度获得综合评分
- **中英双语界面** — 完整的中文和英文界面，一键切换
- **强大的筛选** — 按适配度（完美/良好/勉强/不适合）、类别（通用/编程/对话/推理/多模态/嵌入）和自由文本搜索
- **列排序** — 点击任意表头即可排序
- **详情弹窗** — 点击任意模型查看评分细项、内存需求、备注等详细信息
- **桌面应用** — 提供原生 Mac（.dmg）和 Windows（.exe）桌面应用，基于 Electron
- **暗色主题** — 为开发者设计的精美暗色界面

## 截图预览

| 硬件信息卡片 | 模型列表 | 详情弹窗 |
|:-:|:-:|:-:|
| ![](docs/screenshot-cards.png) | ![](docs/screenshot-table.png) | ![](docs/screenshot-modal.png) |

## 快速开始

### 前置要求

- **llmfit** — 通过 Homebrew（macOS）或 Cargo 安装：
  ```bash
  brew install llmfit        # macOS
  # 或
  cargo install llmfit       # 任何有 Rust 的平台
  ```
- **Python 3.8+**（附带 pip）

### 方式一：Web UI（推荐）

```bash
git clone https://github.com/anson55sky/NeuralDock.git
cd NeuralDock
chmod +x start.sh
./start.sh
```

脚本会自动创建虚拟环境、安装 Flask，并在 `http://localhost:18090` 打开界面。

**Windows 用户：**
```cmd
git clone https://github.com/anson55sky/NeuralDock.git
cd NeuralDock
start.bat
```

### 方式二：手动启动

```bash
pip install flask
python app/server.py
```

### 方式三：桌面应用（Electron）

```bash
cd desktop
npm install
npm start
```

构建可分发安装包：

```bash
# macOS .dmg
npm run build:mac

# Windows .exe 安装程序
npm run build:win

# 同时构建两个平台
npm run build:all
```

构建产物在 `desktop/dist/` 目录下。

## 项目结构

```
NeuralDock/
├── app/
│   ├── server.py              # Flask 后端（API + 静态文件）
│   └── templates/
│       └── index.html         # 完整的中英双语单页应用
├── desktop/
│   ├── main.js                # Electron 主进程
│   ├── preload.js             # 安全桥接
│   └── package.json           # Electron + 构建配置
├── scripts/
│   └── build-desktop.sh       # 桌面构建辅助脚本
├── start.sh                   # 快速启动（macOS/Linux）
├── start.bat                  # 快速启动（Windows）
├── requirements.txt           # Python 依赖
├── README.md                  # 英文文档
├── README_CN.md               # 中文文档
└── LICENSE
```

## API 接口

| 接口 | 说明 |
|---|---|
| `GET /` | 主界面 |
| `GET /api/system` | 硬件信息（JSON） |
| `GET /api/models` | 完整模型列表及评分（JSON） |
| `GET /api/recommend?limit=N` | 推荐的前 N 个模型（JSON） |
| `GET /api/health` | 健康检查 |

## 配置项

| 环境变量 | 默认值 | 说明 |
|---|---|---|
| `NEURALDOCK_PORT` | `18090` | 服务端口 |

## 技术栈

- **后端**：Python + Flask
- **前端**：原生 HTML/CSS/JS（无需构建、无框架依赖）
- **桌面端**：Electron + electron-builder
- **数据来源**：[llmfit](https://github.com/AlexsJones/llmfit) CLI
- **国际化**：客户端 JavaScript 字典

## 参与贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m '添加某个特性'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

## 许可证

本项目基于 MIT 许可证开源 — 详见 [LICENSE](LICENSE) 文件。

## 致谢

- [llmfit](https://github.com/AlexsJones/llmfit)（Alex Jones 开发）— 提供硬件分析和模型评分的强大 CLI 工具
- 为本地大模型社区用 ❤️ 构建
