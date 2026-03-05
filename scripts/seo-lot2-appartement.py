#!/usr/bin/env python3
"""SEO Phase B - Lot 2 - Page 8: nettoyage-appartement-rouen (remove 2 excess bolds)"""
import re

FILEPATH = 'content/rouen-sections.ts'

def smart_replace(content, old, new):
    """Replace old->new treating NBSP and regular space as equivalent."""
    parts = old.split(' ')
    escaped_parts = [re.escape(p) for p in parts]
    pattern = '[ \u00a0]'.join(escaped_parts)
    match = re.search(pattern, content)
    if match:
        return content[:match.start()] + new + content[match.end():], True
    return content, False

def process(content, replacements):
    print('=== nettoyage-appartement-rouen ===')
    ok = 0
    fails = []
    for old, new, label in replacements:
        content, found = smart_replace(content, old, new)
        if found:
            ok += 1
            print(f'  OK: {label}')
        else:
            fails.append(label)
            print(f'  FAIL: {label}')
    print(f'  Result: {ok}/{ok+len(fails)}')
    return content, fails

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

content, fails = process(content, [
    # FIX: Remove duplicate ProClean bold at L418 (keep the one at L376)
    # L418: "Chaque intervention <strong>ProClean</strong> à Rouen débute"
    ("intervention <strong>ProClean</strong> à Rouen débute",
     "intervention ProClean à Rouen débute",
     'Fix: remove duplicate ProClean bold (L418)'),

    # FIX: Remove "technologies de nettoyage" bold at L466 (7 bolds -> 5)
    # L466: "les <strong>technologies de nettoyage</strong> les plus avancées"
    ("les <strong>technologies de nettoyage</strong> les plus",
     "les technologies de nettoyage les plus",
     'Fix: remove bold technologies de nettoyage (L466)'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll OK!')
