@echo off
REM NeuralDock - Quick Start Script (Windows)
title NeuralDock

echo.
echo   ========================================
echo        NeuralDock Quick Start
echo   ========================================
echo.

REM Check llmfit
where llmfit >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] llmfit not found.
    echo Please install llmfit first: https://github.com/AlexsJones/llmfit
    echo   scoop install llmfit
    echo   -- or --
    echo   cargo install llmfit
    pause
    exit /b 1
)
echo [OK] llmfit found

REM Check Python
set PYTHON=
where python3 >nul 2>nul && set PYTHON=python3
if "%PYTHON%"=="" (where python >nul 2>nul && set PYTHON=python)
if "%PYTHON%"=="" (
    echo [ERROR] Python 3 not found. Please install Python 3.8+
    pause
    exit /b 1
)
echo [OK] %PYTHON% found

REM Create venv if needed
set SCRIPT_DIR=%~dp0
set VENV_DIR=%SCRIPT_DIR%.venv
if not exist "%VENV_DIR%" (
    echo [INFO] Creating virtual environment...
    %PYTHON% -m venv "%VENV_DIR%"
)

REM Install dependencies
echo [INFO] Installing dependencies...
"%VENV_DIR%\Scripts\pip" install -q -r "%SCRIPT_DIR%requirements.txt"

REM Start server
echo.
echo Starting NeuralDock...
"%VENV_DIR%\Scripts\python" "%SCRIPT_DIR%app\server.py"
pause
