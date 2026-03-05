#!/usr/bin/env python3
"""SEO Phase B - Lot 2 - Page 7: debarras-maison-rouen (fix violation + add 2 bolds)"""
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
    print('=== debarras-maison-rouen ===')
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
    # FIX: Remove bold "architecture rouennaise" from L349 (2 bolds in same paragraph)
    ("l\\'<strong>architecture rouennaise</strong> exceptionnelle",
     "l\\'architecture rouennaise exceptionnelle",
     'Fix: remove bold architecture rouennaise'),

    # Bold: destruction certifiée (L358, para 2 of "Débarras Professionnel")
    ("destruction certifiée d\\'archives",
     "<strong>destruction certifiée</strong> d\\'archives",
     'Bold: destruction certifiée'),

    # Bold: expertise spécialisée (L365, para 1 of "Débarras Universitaire")
    ("bénéficie de notre expertise spécialisée",
     "bénéficie de notre <strong>expertise spécialisée</strong>",
     'Bold: expertise spécialisée'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll OK!')
