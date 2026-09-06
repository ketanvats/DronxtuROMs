import os
import json

def get_images(folder_name):
    try:
        files = os.listdir(folder_name)
        # Filter only jpg/png
        images = [f"{folder_name}/{f}" for f in files if f.endswith(('.jpg', '.png', '.jpeg')) and not f.startswith('post_')]
        # Sort them for consistent order
        images.sort()
        return images
    except:
        return []

rom_data = [
    {
        "id": 1461,
        "title": "Reborn UI Extended",
        "url": "https://t.me/mt6833unified_updates/1461",
        "meta": ["HyperOS", "Android 14", "Hybrid Rom"],
        "desc": "The ultimate HyperOS experience for POCO M4 Pro 5G. Extended edition by dronxtu.",
        "images": get_images("Reborn ui extended screenshot")
    },
    {
        "id": 1472,
        "title": "Xiaomi HyperOS 3.1",
        "url": "https://t.me/mt6833unified_updates/1472",
        "meta": ["HyperOS 3.1", "Android 16", "Hybrid Rom"],
        "desc": "Ported from Device: Redmi note 14 5g(beryl)\nVersion: OS3.0.301.0.WOQINXM Indian Global Hybrid Rom",
        "images": get_images("Xiaomi HyperOS 3.1 Screenshot")
    },
    {
        "id": 1445,
        "title": "MemeOS | Evergo",
        "url": "https://t.me/mt6833unified_updates/1445",
        "meta": ["MIUI 14", "Android 13", "MemeOS"],
        "desc": "Release Date : 02/07/2026\nBase Rom : MIUI 14.0.8.0.TKTCNXM\nRom Credit: @Rolex040623\nMaintainer: @dronxtu",
        "images": get_images("Meme os screenshot")
    },
    {
        "id": 1433,
        "title": "Reborn UI 2.0 A16",
        "url": "https://t.me/mt6833unified_updates/1433",
        "meta": ["HyperOS", "Android 16", "Hybrid Rom"],
        "desc": "Next generation Reborn UI on Android 16. Hybrid Rom for Evergo, Evergreen, Opal.",
        "images": ["Reborn ui extended screenshot/post_1433_0.jpg"]
    },
    {
        "id": 1400,
        "title": "Reborn UI",
        "url": "https://t.me/mt6833unified_updates/1400",
        "meta": ["OS 3.0.7", "Android 15", "CN Base"],
        "desc": "Released: 08/06/2026\nBase: OS3.0.7.0 VLNCNXM | A15 | CN ROM\nFlashing Type: Hybrid Rom",
        "images": get_images("Reborn UI screenshot")
    }
]

# Read original script.js
with open("script.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the romData array in script.js
import re
new_json = json.dumps(rom_data, indent=4)
new_content = re.sub(r'const romData = \[.*?\];', f'const romData = {new_json};', content, flags=re.DOTALL)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated script.js successfully!")
