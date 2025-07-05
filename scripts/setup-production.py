#!/usr/bin/env python3
"""
Setup script for production builds
This script helps prepare the Python environment for Electron packaging
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def main():
    print("Setting up production environment...")
    
    # Get the backend directory
    backend_dir = Path(__file__).parent.parent / "backend"
    
    # Check if virtual environment exists
    venv_path = backend_dir / "venv"
    if not venv_path.exists():
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", str(venv_path)], check=True)
        print("Virtual environment created successfully!")
    
    # Determine Python executable
    if os.name == 'nt':  # Windows
        python_exe = venv_path / "Scripts" / "python.exe"
        pip_exe = venv_path / "Scripts" / "pip.exe"
    else:  # Unix/Linux/macOS
        python_exe = venv_path / "bin" / "python"
        pip_exe = venv_path / "bin" / "pip"
    
    # Verify the executables exist
    if not python_exe.exists():
        print(f"Error: Python executable not found at {python_exe}")
        return
    if not pip_exe.exists():
        print(f"Error: Pip executable not found at {pip_exe}")
        return
    
    # Install requirements
    print("Installing Python dependencies...")
    requirements_file = backend_dir / "requirements.txt"
    
    if not requirements_file.exists():
        print(f"Error: Requirements file not found at {requirements_file}")
        return
    
    try:
        subprocess.run([str(pip_exe), "install", "-r", str(requirements_file)], check=True)
        print("Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error installing dependencies: {e}")
        print("Trying alternative approach...")
        
        # Try using python -m pip instead
        try:
            subprocess.run([str(python_exe), "-m", "pip", "install", "-r", str(requirements_file)], check=True)
            print("Dependencies installed successfully using python -m pip!")
        except subprocess.CalledProcessError as e2:
            print(f"Failed to install dependencies: {e2}")
            return
    
    # Create a minimal requirements file for production
    print("Creating production requirements file...")
    production_requirements = [
        "Flask==3.1.1",
        "flask-cors==6.0.1",
        "torch==2.7.1",
        "numpy==2.3.0"
    ]
    
    with open(backend_dir / "requirements-prod.txt", "w") as f:
        f.write("\n".join(production_requirements))
    
    print("Production setup complete!")
    print("\nNext steps:")
    print("1. Run: npm run build (to build frontend)")
    print("2. Run: npm run dist (to build Windows executable)")

if __name__ == "__main__":
    main() 