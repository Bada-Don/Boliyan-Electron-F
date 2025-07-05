@echo off
echo Setting up Boliyan production environment for Windows...

cd /d "%~dp0.."

echo Creating Python virtual environment...
python -m venv backend\venv

echo Activating virtual environment...
call backend\venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r backend\requirements.txt

echo Creating production requirements file...
echo Flask==3.1.1 > backend\requirements-prod.txt
echo flask-cors==6.0.1 >> backend\requirements-prod.txt
echo torch==2.7.1 >> backend\requirements-prod.txt
echo numpy==2.3.0 >> backend\requirements-prod.txt

echo.
echo Production setup complete!
echo.
echo Next steps:
echo 1. Run: npm run build (to build frontend)
echo 2. Run: npm run dist (to build Windows executable)
echo.
pause 