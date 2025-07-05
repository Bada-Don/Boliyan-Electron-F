@echo off
echo Building Boliyan with portable Python environment...

cd /d "%~dp0.."

echo.
echo Step 0: Preparing icons...
python scripts\prepare-icons-simple.py

if %errorlevel% neq 0 (
    echo Failed to prepare icons, continuing with PNG...
)

echo.
echo Step 1: Creating portable Python environment...
python scripts\create-portable-python.py

if %errorlevel% neq 0 (
    echo ❌ Failed to create portable Python environment
    pause
    exit /b 1
)

echo.
echo Step 2: Building frontend...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    pause
    exit /b 1
)

echo.
echo Step 3: Building Electron app...
npm run dist

if %errorlevel% neq 0 (
    echo ❌ Failed to build Electron app
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo Your app is ready in the dist_electron folder:
echo - Boliyan Setup.exe (Windows installer)
echo - win-unpacked/ (Portable version)
echo.
pause 