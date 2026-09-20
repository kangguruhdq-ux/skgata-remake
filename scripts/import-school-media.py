"""Download verified school media and produce small, local WebP assets.

Requires requests, beautifulsoup4 and pillow. Run audit-school-media.py first.
Only URLs actually present in the inventory are imported (YouTube posters are
from the school's own embedded videos). Original files stay in ignored .cache.
"""
import hashlib, io, json, re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageOps

ROOT = 'https://smkn3jogja.sch.id/'
CACHE = Path('.cache/school')
OUT = Path('public/media/school')
OUT.mkdir(parents=True, exist_ok=True)
pages = json.loads((CACHE / 'inventory.json').read_text(encoding='utf-8'))
jobs = {}
aliases = {}

def add(key, img, page, label, portrait=False):
    candidates = [(img['src'], 0)]
    for item in img.get('srcset', '').split(','):
        parts = item.strip().split()
        if len(parts) == 2 and parts[1].endswith('w'):
            candidates.append((parts[0], int(parts[1][:-1])))
    limit = 700 if portrait else 1280
    under = [c for c in candidates if c[1] <= limit]
    source = max(under, key=lambda c: c[1])[0]
    aliases[key] = source
    if source not in jobs:
        jobs[source] = dict(key=key, source=source, sourcePage=page, label=label,
                            variants=[c[0] for c in candidates], portrait=portrait)

def page(path):
    return next(p for p in pages if p['url'].rstrip('/') == (ROOT + path).rstrip('/'))

home = page('')
add('logo', next(i for i in home['images'] if i['src'].endswith('/logosmk3yk.png')), ROOT, 'Lambang SMKN 3 Yogyakarta')
for key, path in [('gerbang', 'sejarah-smk-3'), ('organisasi', 'struktur-organisasi'), ('pendidik', 'tenaga-pendidik-kependidikan')]:
    p = page(path)
    add(key, p['images'][0], p['url'], p['title'])

major_pages = ['multimedia', 'teknik-komputer-jaringan', 'teknik-gambar-bangunan', 'teknik-konstruksi-kayu', 'teknik-audio-video', 'tiptl', 'teknik-kendaraan-ringan', 'teknik-pemesinan']
major_keys = ['bp', 'tjkt', 'dpib', 'tkp', 'elektronika', 'listrik', 'otomotif', 'mesin']
for key, path in zip(major_keys, major_pages):
    p = page(path)
    for index, img in enumerate(p['images']):
        add(f'{key}-info-{index + 1}', img, p['url'], f'Dokumentasi program {key.upper()}')
for key, filename in [('bp', 'MM_up'), ('tjkt', 'KJ_up'), ('dpib', 'GB_up'), ('tkp', 'GB_up'), ('elektronika', 'AV_up'), ('listrik', 'TL_up'), ('otomotif', 'OTO_up'), ('mesin', 'TP_up')]:
    p = page('program-keahlian')
    add(f'{key}-cover', next(i for i in p['images'] if filename in i['src']), p['url'], f'Foto program {key.upper()}')

news_keys = [
    ('jepang', 'perluas-akses-kebekerjaan'), ('budaya', 'hidupkan-nilai-keistimewaan'),
    ('festa', 'festa-mangajapa'), ('modena', 'perkuat-kemitraan-industri'),
    ('krida', 'jumat-krida-skagata'), ('paskibraka', 'lima-murid'),
    ('spmb', 'pengumuman-hasil-akhir-seleksi'), ('lks', 'jadi-tuan-rumah-lks'),
    ('karir', 'career-day-smkn'), ('workshop-bp', 'adakan-workshop-guru-broadcasting')]
for key, fragment in news_keys:
    p = next(p for p in pages if fragment in p['url'])
    for index, img in enumerate(p['images']):
        add(f'{key}-{index + 1}', img, p['url'], p['title'])

teachers = []
for slug, dept in [('daftar-tenaga-pendidik-smk-negeri-3-yogyakarta', 'Pendidik'), ('daftar-tenaga-kependidikan-smk-negeri-3-yogyakarta', 'Tenaga Kependidikan')]:
    soup = BeautifulSoup((CACHE / f'{slug}.html').read_text(encoding='utf-8'), 'html.parser')
    for row in soup.select('.entry-content tbody tr'):
        desc = row.select_one('.column-2')
        img = row.find('img')
        if not desc or not img:
            continue
        lines = list(desc.stripped_strings)
        if not lines:
            continue
        key = 'staff-' + hashlib.sha256(lines[0].encode()).hexdigest()[:10]
        add(key, {'src': img['src'], 'srcset': img.get('srcset', '')}, ROOT + slug + '/', lines[0], True)
        teachers.append(dict(id=key, name=lines[0], role=' · '.join(lines[1:]) or dept, department=dept,
                             nip='', photoKey=key))

for key, video in [('video-profil', 'tJhzVg7Nq4g'), ('video-taruna-1', '7OoOmmRb5Ek'), ('video-taruna-2', 'URLFZN5JZUg'), ('sultan', 'o3Kzq2jUre0'), ('wikan', '72o_zv3jei4'), ('hanung', '-_1paxlaUfE')]:
    add(key, {'src': f'https://i.ytimg.com/vi/{video}/hqdefault.jpg'}, ROOT, f'Poster video resmi {key}')

def download(job):
    raw_path = CACHE / (hashlib.sha256(job['source'].encode()).hexdigest() + '.original')
    if not raw_path.exists():
        response = requests.get(job['source'], timeout=45)
        response.raise_for_status()
        raw_path.write_bytes(response.content)
    raw = raw_path.read_bytes()
    img = ImageOps.exif_transpose(Image.open(io.BytesIO(raw)))
    img = img.convert('RGBA' if 'A' in img.getbands() else 'RGB')
    max_size = 480 if job['portrait'] else 1280
    if job['key'] == 'logo':
        max_size = 256
    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    filename = job['key'] + '.webp'
    img.save(OUT / filename, 'WEBP', quality=80, method=6)
    small = img.copy()
    small.thumbnail((480, 480), Image.Resampling.LANCZOS)
    small.save(OUT / (job['key'] + '-480.webp'), 'WEBP', quality=76, method=6)
    return {**job, 'local': '/media/school/' + filename, 'width': img.width, 'height': img.height,
            'originalBytes': len(raw), 'bytes': (OUT / filename).stat().st_size}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(download, jobs.values()))
by_source = {r['source']: r for r in results}
assets = {key: by_source[source]['local'] for key, source in aliases.items()}
for teacher in teachers:
    teacher['photo'] = assets[teacher.pop('photoKey')]
snapshot = {'assets': assets, 'teachers': teachers}
Path('src/lib/school-media.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding='utf-8')
Path('data/school-media-manifest.json').write_text(json.dumps({'checkedAt': '2026-09-20', 'pages': [p['url'] for p in pages], 'assets': results}, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Imported {len(results)} assets and {len(teachers)} staff records.')
print(f'Original: {sum(r["originalBytes"] for r in results):,} bytes; WebP: {sum(r["bytes"] for r in results):,} bytes')
