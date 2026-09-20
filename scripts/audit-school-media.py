"""Inventory official school pages. Run before selecting and importing assets."""
import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup

ROOT = 'https://smkn3jogja.sch.id/'
CACHE = Path('.cache/school')
CACHE.mkdir(parents=True, exist_ok=True)

def read(url):
    name = urlparse(url).path.strip('/').replace('/', '_') or 'home'
    dest = CACHE / (name + '.html')
    if not dest.exists():
        response = requests.get(url, timeout=45)
        response.raise_for_status()
        dest.write_text(response.text, encoding='utf-8')
    soup = BeautifulSoup(dest.read_text(encoding='utf-8'), 'html.parser')
    content = soup.select_one('.entry-content') or soup
    images = []
    for img in content.select('img'):
        url_img = img.get('src', '')
        if not url_img.startswith(ROOT):
            continue
        images.append({'src': url_img, 'srcset': img.get('srcset', ''), 'alt': img.get('alt', '')})
    return {'url': url, 'title': soup.title.get_text() if soup.title else '', 'images': images,
            'videos': [i.get('src') for i in content.select('iframe')],
            'text': content.get_text(' ', strip=True),
            'links': list(dict.fromkeys(a.get('href', '') for a in content.select('a[href]')))}

home = read(ROOT)
soup = BeautifulSoup((CACHE / 'home.html').read_text(encoding='utf-8'), 'html.parser')
urls = list(dict.fromkeys([ROOT] + [a['href'] for a in soup.select('a[href]')
        if a['href'].startswith(ROOT) and '/wp-' not in a['href']]))
def safe_read(url):
    try:
        return read(url)
    except Exception as err:
        return {'url': url, 'error': str(err)}
with ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(safe_read, urls))
(CACHE / 'inventory.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
for p in pages:
    print(p['url'], len(p.get('images', [])), p.get('error', ''))
