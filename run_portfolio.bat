@echo off

cd /d "%~dp0"

start "Frontend" cmd /k "npm start"

echo Frontend iniciandose en una ventana nueva.
pause