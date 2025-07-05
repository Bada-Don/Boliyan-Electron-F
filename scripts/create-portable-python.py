#!/usr/bin/env python3
"""
Create a portable Python environment for Electron packaging
This script creates a minimal Python environment with only the required packages
"""

import os
import sys
import shutil
import subprocess
import zipfile
from pathlib import Path

def main():
    print("Creating portable Python environment for Electron...")
    
    # Get the backend directory
    backend_dir = Path(__file__).parent.parent / "backend"
    portable_dir = backend_dir / "portable-python"
    
    # Clean up existing portable directory
    if portable_dir.exists():
        shutil.rmtree(portable_dir)
    
    # Create portable directory
    portable_dir.mkdir(exist_ok=True)
    
    # Copy Python executable and libraries
    python_exe = sys.executable
    python_dir = Path(python_exe).parent
    
    print(f"Copying Python from: {python_dir}")
    
    # Copy essential Python files
    essential_files = [
        "python.exe",
        "pythonw.exe",
        "python39.dll",
        "python310.dll", 
        "python311.dll",
        "python312.dll",
        "python313.dll",
        "vcruntime140.dll",
        "msvcp140.dll"
    ]
    
    for file in essential_files:
        src = python_dir / file
        if src.exists():
            shutil.copy2(src, portable_dir)
            print(f"Copied {file}")
    
    # Copy site-packages with only required packages
    site_packages = python_dir / "Lib" / "site-packages"
    if site_packages.exists():
        portable_site_packages = portable_dir / "Lib" / "site-packages"
        portable_site_packages.mkdir(parents=True, exist_ok=True)
        
        # Required packages for the app
        required_packages = [
            "flask",
            "flask_cors",
            "torch",
            "numpy",
            "werkzeug",
            "jinja2",
            "markupsafe",
            "itsdangerous",
            "click",
            "blinker"
        ]
        
        for package in required_packages:
            src = site_packages / package
            if src.exists():
                dst = portable_site_packages / package
                if src.is_dir():
                    shutil.copytree(src, dst, dirs_exist_ok=True)
                else:
                    shutil.copy2(src, dst)
                print(f"Copied {package}")
    
    # Copy Python standard library (minimal)
    stdlib_dir = python_dir / "Lib"
    portable_stdlib = portable_dir / "Lib"
    
    # Essential standard library modules
    essential_stdlib = [
        "os.py", "sys.py", "json.py", "re.py", "csv.py", "pathlib.py",
        "subprocess.py", "threading.py", "time.py", "datetime.py",
        "collections", "typing.py", "abc.py", "copy.py", "functools.py",
        "itertools.py", "operator.py", "weakref.py", "types.py",
        "builtins.py", "importlib", "encodings", "codecs.py"
    ]
    
    for module in essential_stdlib:
        src = stdlib_dir / module
        if src.exists():
            dst = portable_stdlib / module
            if src.is_dir():
                shutil.copytree(src, dst, dirs_exist_ok=True)
            else:
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
            print(f"Copied stdlib: {module}")
    
    # Create a simple requirements.txt for the portable environment
    requirements_content = """Flask==3.1.1
flask-cors==6.0.1
torch==2.7.1
numpy==2.3.0
"""
    
    with open(portable_dir / "requirements.txt", "w") as f:
        f.write(requirements_content)
    
    print(f"\nPortable Python environment created at: {portable_dir}")
    print("This can now be packaged with your Electron app!")
    
    # Create a test script
    test_script = portable_dir / "test_python.py"
    with open(test_script, "w", encoding="utf-8") as f:
        f.write("""import sys
import flask
import torch
import numpy as np
print("Portable Python environment is working!")
print(f"Python version: {sys.version}")
print(f"Flask version: {flask.__version__}")
print(f"PyTorch version: {torch.__version__}")
print(f"NumPy version: {np.__version__}")
""")
    
    print(f"Test script created: {test_script}")

if __name__ == "__main__":
    main() 