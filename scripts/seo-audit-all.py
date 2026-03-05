#!/usr/bin/env python3
"""SEO Phase B - Global audit of all 20 pages"""
import re

def audit_sections_file(filepath):
    """Parse rouen-sections.ts: 'slug': [ ... ] structure."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match top-level keys: '  'slug-name': ['
    key_pattern = re.compile(r"^\s+'([a-z0-9-]+)':\s*\[", re.MULTILINE)
    keys = [(m.start(), m.group(1)) for m in key_pattern.finditer(content)]

    results = []
    for i, (pos, slug) in enumerate(keys):
        end = keys[i+1][0] if i+1 < len(keys) else len(content)
        section = content[pos:end]
        strongs = len(re.findall(r'<strong>', section))
        links = len(re.findall(r'<a\s+href=', section))
        proclean = '<strong>ProClean</strong>' in section
        devis_matches = re.findall(r'<a\s+href=["\\\'/]*devis-gratuit-rouen["\\\'/]*>([^<]+)</a>', section)
        devis_anchor = devis_matches[0] if devis_matches else 'NONE'
        results.append((slug, strongs, links, proclean, devis_anchor))
    return results

def audit_rouen_ts(filepath):
    """Parse rouen.ts for diogene page."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    strongs = len(re.findall(r'<strong>', content))
    links = len(re.findall(r'<a\s+href=', content))
    proclean = '<strong>ProClean</strong>' in content
    devis_matches = re.findall(r'<a\s+href=["\\\'/]*devis-gratuit-rouen["\\\'/]*>([^<]+)</a>', content)
    devis_anchor = devis_matches[0] if devis_matches else 'NONE'
    return [('nettoyage-diogene-rouen', strongs, links, proclean, devis_anchor)]

# Collect all results
results = audit_sections_file('content/rouen-sections.ts')
results += audit_rouen_ts('content/rouen.ts')

# Print table
print(f'{"#":<4} {"Page":<45} {"<strong>":>8} {"<a>":>5} {"PC":>4} Devis anchor')
print('-' * 115)

total_s = 0
total_l = 0
total_pc = 0
devis_set = {}

for idx, (slug, strongs, links, proclean, devis) in enumerate(results, 1):
    total_s += strongs
    total_l += links
    if proclean: total_pc += 1
    if devis != 'NONE':
        devis_set[devis] = devis_set.get(devis, 0) + 1
    pc_str = 'oui' if proclean else '-'
    flag = ''
    if strongs > 6: flag = ' !!OVER-S!!'
    if links > 4: flag += ' !!OVER-L!!'
    print(f'{idx:<4} {slug:<45} {strongs:>8} {links:>5} {pc_str:>4} {devis}{flag}')

print('-' * 115)
print(f'     {"TOTAL":<45} {total_s:>8} {total_l:>5} {total_pc:>4}')
print()
print(f'Pages: {len(results)}')
print(f'ProClean bold: {total_pc} pages')
print()
print('Devis anchor distribution:')
for anchor, count in sorted(devis_set.items(), key=lambda x: -x[1]):
    print(f'  [{count}x] {anchor}')

# Warnings
print()
warns = []
for slug, strongs, links, proclean, devis in results:
    if strongs < 4: warns.append(f'{slug}: only {strongs} strongs')
    if strongs > 6: warns.append(f'{slug}: {strongs} strongs OVER LIMIT')
    if links < 3: warns.append(f'{slug}: only {links} links')
    if links > 4: warns.append(f'{slug}: {links} links OVER LIMIT')
    if devis == 'NONE': warns.append(f'{slug}: NO devis link')

if warns:
    print('WARNINGS:')
    for w in warns:
        print(f'  ! {w}')
else:
    print('All pages within limits!')
