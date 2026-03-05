#!/usr/bin/env python3
"""SEO Phase B - Lot 2 - Page 9: nettoyage-diogene-rouen (full implementation, rouen.ts)"""
import re

FILEPATH = 'content/rouen.ts'

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
    print('=== nettoyage-diogene-rouen ===')
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
    # === BOLDS (5) ===

    # Bold 1: syndrome de Diogène (L207, para 1 of section 1)
    ("Le syndrome de Diogène se caractérise",
     "Le <strong>syndrome de Diogène</strong> se caractérise",
     'Bold: syndrome de Diogène'),

    # Bold 2: accumulation d'objets (L211, listItem in section 1)
    ("à l\\'accumulation d\\'objets inutiles",
     "à l\\'<strong>accumulation d\\'objets</strong> inutiles",
     "Bold: accumulation d'objets"),

    # Bold 3: ProClean (L221, para 1 of section 2)
    ("La société ProClean est à votre",
     "La société <strong>ProClean</strong> est à votre",
     'Bold: ProClean'),

    # Bold 4: service global (L222, para 2 of section 2)
    ("un service global",
     "un <strong>service global</strong>",
     'Bold: service global'),

    # Bold 5: désinfection renforcée (L243, para 1 of section 4)
    ("une désinfection renforcée",
     "une <strong>désinfection renforcée</strong>",
     'Bold: désinfection renforcée'),

    # === LINKS (3) ===

    # Link 1: debarras (append to end of L222 - para 2 of section 2)
    ("nettoyage syndrome de Diogène.'",
     "nettoyage syndrome de Diogène. Notre équipe assure aussi le <a href=\"/debarras-maison-rouen\">débarras de maison à Rouen</a> dans les situations d\\'encombrement sévère.'",
     'Link: debarras'),

    # Link 2: appartement (append to end of L229 - para 1 of section 3)
    ("par le voisinage rouennais.'",
     "par le voisinage rouennais. Après notre intervention, un <a href=\"/nettoyage-appartement-rouen\">nettoyage d\\'appartement complet</a> finalise la remise en état.'",
     'Link: appartement'),

    # Link 3: devis formulation 3 (append to end of L243 - para 1 of section 4)
    ("certificat de désinfection.'",
     "certificat de désinfection. Pour planifier votre intervention confidentielle, demandez une <a href=\"/devis-gratuit-rouen\">estimation gratuite et sans engagement</a>.'",
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
