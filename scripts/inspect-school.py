import json, re
from pathlib import Path
from bs4 import BeautifulSoup
home = BeautifulSoup(Path('.cache/school/home.html').read_text(encoding='utf-8'), 'html.parser')
for el in home.select('[data-settings]'):
    settings = el.get('data-settings', '')
    if 'youtu' in settings:
        print(settings)
for name in ['daftar-tenaga-pendidik-smk-negeri-3-yogyakarta', 'daftar-tenaga-kependidikan-smk-negeri-3-yogyakarta']:
    s = BeautifulSoup(Path(f'.cache/school/{name}.html').read_text(encoding='utf-8'), 'html.parser')
    for row in s.select('.entry-content tr'):
        if 'KPK' in row.get_text() or 'Waka' in row.get_text() or 'Kepala' in row.get_text():
            print(row.get_text(' ', strip=True), row.img.get('src') if row.img else '')
