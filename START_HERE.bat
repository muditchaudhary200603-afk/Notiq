@echo off
title Notiq — Smart Study App
color 0A
echo.
echo  =========================================
echo    Notiq — AI Study Assistant
echo  =========================================
echo.

node --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Installing dependencies...
    npm install
    echo.
    echo  Starting Notiq server...
    echo  Opening http://localhost:3000 ...
    start "" "http://localhost:3000"
    node server.js
    goto end
)

echo  ERROR: Node.js is required.
echo  Download from https://nodejs.org/
pause
:end
