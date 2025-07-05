#!/usr/bin/env python3
"""
Prepare icons for Electron build
Converts PNG to ICO format for better Windows compatibility
"""

import os
from pathlib import Path
from PIL import Image

def main():
    print("Preparing icons for Electron build...")
    
    # Get the build-assets directory
    build_assets = Path(__file__).parent.parent / "build-assets"
    icon_png = build_assets / "icon.png"
    
    if not icon_png.exists():
        print(f"Error: {icon_png} not found!")
        return False
    
    # Create ICO file for Windows
    icon_ico = build_assets / "icon.ico"
    
    try:
        # Open the PNG image
        with Image.open(icon_png) as img:
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Create ICO with multiple sizes for Windows
            sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
            images = []
            
            for size in sizes:
                resized = img.resize(size, Image.Resampling.LANCZOS)
                images.append(resized)
            
            # Save as ICO
            images[0].save(
                icon_ico,
                format='ICO',
                sizes=[(img.width, img.height) for img in images],
                append_images=images[1:]
            )
        
        print(f"✅ Created {icon_ico}")
        
        # Also create a 256x256 PNG for other platforms
        icon_256 = build_assets / "icon-256.png"
        with Image.open(icon_png) as img:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            resized = img.resize((256, 256), Image.Resampling.LANCZOS)
            resized.save(icon_256, 'PNG')
        
        print(f"✅ Created {icon_256}")
        
        return True
        
    except Exception as e:
        print(f"Error creating icons: {e}")
        return False

if __name__ == "__main__":
    success = main()
    if not success:
        exit(1) 