#!/usr/bin/env python3
"""SEO Phase B - Lot 3 - Page 11: nettoyage-bureaux-rouen (+1 bold, +2 links)"""
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
    print('=== nettoyage-bureaux-rouen ===')
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
    # Bold: ProClean (L859)
    ("Chaque intervention ProClean à Rouen débute",
     "Chaque intervention <strong>ProClean</strong> à Rouen débute",
     'Bold: ProClean'),

    # Link: vitres (append to L847 end)
    ("dans l\\'environnement métropolitain rouennais.'",
     "dans l\\'environnement métropolitain rouennais. Découvrez notre page dédiée au <a href=\"/nettoyage-vitres-rouen\">nettoyage de vitres à Rouen</a> pour tous vos bâtiments professionnels.'",
     'Link: vitres'),

    # Link: devis f1 (append to L860 end)
    ("dans le contexte professionnel rouennais.'",
     "dans le contexte professionnel rouennais. N\\'hésitez pas à <a href=\"/devis-gratuit-rouen\">demander un devis gratuit</a> pour vos locaux professionnels.'",
     'Link: devis'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll OK!')
