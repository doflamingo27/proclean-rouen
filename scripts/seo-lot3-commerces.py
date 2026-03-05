#!/usr/bin/env python3
"""SEO Phase B - Lot 3 - Page 12: entretien-commerces-rouen (+1 bold, +1 link)"""
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
    print('=== entretien-commerces-rouen ===')
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
    # Bold: centres commerciaux (L907)
    ("entretien premium centres commerciaux à Rouen",
     "entretien premium <strong>centres commerciaux</strong> à Rouen",
     'Bold: centres commerciaux'),

    # Link: vitres (append to L918 end)
    ("la satisfaction de votre clientèle.'",
     "la satisfaction de votre clientèle. Nos techniciens assurent également le <a href=\"/nettoyage-vitres-rouen\">nettoyage de vitres à Rouen</a> pour sublimer vos devantures.'",
     'Link: vitres'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll OK!')
