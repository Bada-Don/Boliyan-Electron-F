#!/usr/bin/env python3
"""
Simple icon preparation for Electron build
Just copies the PNG icon to the right location
"""

import shutil
from pathlib import Path

def main():
    print("Preparing icons for Electron build...")
    
    # Get the build-assets directory
    build_assets = Path(__file__).parent.parent / "build-assets"
    icon_png = build_assets / "icon.png"
    
    if not icon_png.exists():
        print(f"Error: {icon_png} not found!")
        return False
    
    # Copy the icon to ensure it's in the right place
    icon_copy = build_assets / "icon-copy.png"
    shutil.copy2(icon_png, icon_copy)
    
    print(f"Copied icon to {icon_copy}")
    print("Icon is ready for Electron build!")
    
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        exit(1) 