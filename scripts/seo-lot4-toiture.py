#!/usr/bin/env python3
"""SEO Phase B - Lot 4 - Page 19: nettoyage-toiture-rouen (5 bolds + 3 links)"""
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
    print('=== nettoyage-toiture-rouen ===')
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

    # Bold 1: nettoyage et démoussage de toitures (L3138, intro)
    ("nettoyage et démoussage de toitures, façades",
     "<strong>nettoyage et démoussage de toitures</strong>, façades",
     'Bold: nettoyage et démoussage de toitures'),

    # Bold 2: mousses, lichens et algues (L3146, h3 Excellence p2)
    ("de mousses, lichens et algues sur les toitures",
     "de <strong>mousses, lichens et algues</strong> sur les toitures",
     'Bold: mousses, lichens et algues'),

    # Bold 3: traitement hydrofuge (L3171, h3 Services p2)
    ("un traitement hydrofuge haute performance après",
     "un <strong>traitement hydrofuge</strong> haute performance après",
     'Bold: traitement hydrofuge'),

    # Bold 4: toitures en ardoise (L3190, h3 Secteurs p2)
    ("sculptées, toitures en ardoise",
     "sculptées, <strong>toitures en ardoise</strong>",
     'Bold: toitures en ardoise'),

    # Bold 5: démoussage complet (L3250, h3 Processus p4)
    ("démoussage complet et durable, application",
     "<strong>démoussage complet</strong> et durable, application",
     'Bold: démoussage complet'),

    # === LINKS (3) ===

    # Link 1: terrasse (append to L3176 end)
    ("aux variations climatiques normandes.'",
     "aux variations climatiques normandes. Nous proposons aussi le <a href=\"/nettoyage-terrasse-rouen\">nettoyage de terrasse à Rouen</a> pour vos espaces extérieurs.'",
     'Link: terrasse'),

    # Link 2: vitres (append to L3192 end)
    ("d\\'usure du temps.'",
     "d\\'usure du temps. Pour vos surfaces vitrées, découvrez notre <a href=\"/nettoyage-vitres-rouen\">nettoyage de vitres à Rouen</a> réalisé par nos experts.'",
     'Link: vitres'),

    # Link 3: devis f3 (append to L3262 end)
    ("la fréquence des interventions.'",
     "la fréquence des interventions. Pour une <a href=\"/devis-gratuit-rouen\">estimation gratuite et sans engagement</a>, contactez notre équipe d\\'experts.'",
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
