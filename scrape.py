import urllib.request
import re
import os
import json
import html

posts = [1400, 1433, 1445, 1472]
base_url = "https://t.me/mt6833unified_updates/{}?embed=1"
output = []

os.makedirs("screenshot", exist_ok=True)

for post_id in posts:
    url = base_url.format(post_id)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        html_content = response.read().decode('utf-8')
        
        # Extract text: looking for tgme_widget_message_text
        text_match = re.search(r'<div class="tgme_widget_message_text[^>]*>(.*?)</div>', html_content, re.DOTALL)
        if text_match:
            raw_text = text_match.group(1)
            # clean html tags
            clean_text = re.sub(r'<br\s*/?>', '\n', raw_text)
            clean_text = re.sub(r'<[^>]+>', '', clean_text)
            clean_text = html.unescape(clean_text)
        else:
            clean_text = "No description found."
            
        # Extract image URL
        img_urls = re.findall(r"background-image:url\('([^']+)'\)", html_content)
        downloaded_imgs = []
        for i, img_url in enumerate(img_urls):
            img_filename = f"screenshot/post_{post_id}_{i}.jpg"
            try:
                urllib.request.urlretrieve(img_url, img_filename)
                downloaded_imgs.append(img_filename)
            except Exception as e:
                print(f"Failed to download image {img_url}: {e}")
                
        output.append({
            "id": post_id,
            "url": f"https://t.me/mt6833unified_updates/{post_id}",
            "text": clean_text,
            "images": downloaded_imgs
        })
        print(f"Successfully processed post {post_id}")
    except Exception as e:
        print(f"Failed to process post {post_id}: {e}")

with open("roms_data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=4)
print("Done scraping.")
