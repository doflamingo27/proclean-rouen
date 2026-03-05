#!/usr/bin/env python3
"""SEO Phase B - Lot 1 - Page 3: nettoyage-moquette-rouen"""
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
    print('=== nettoyage-moquette-rouen ===')
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

    # Bold 1: ProClean (L2749, para 1 of "Excellence et Tradition")
    ("ProClean s\\'est imposé",
     "<strong>ProClean</strong> s\\'est imposé",
     'Bold: ProClean'),

    # Bold 2: injection-extraction (L2758, para 1 of "Methode Injection-Extraction")
    ("L\\'injection-extraction représente",
     "L\\'<strong>injection-extraction</strong> représente",
     'Bold: injection-extraction'),

    # Bold 3: environnement professionnel impeccable (L2770, para 2 of "Secteurs")
    ("un environnement professionnel impeccable.",
     "un <strong>environnement professionnel impeccable</strong>.",
     'Bold: environnement professionnel'),

    # Bold 4: traitement anti-acariens (L2774, para 6 of "Secteurs")
    ("traitement anti-acariens, désodorisation",
     "<strong>traitement anti-acariens</strong>, désodorisation",
     'Bold: traitement anti-acariens'),

    # Bold 5: nettoyage en profondeur (L2812, para 1 of "Expertise Textile")
    ("un nettoyage en profondeur. Traitement",
     "un <strong>nettoyage en profondeur</strong>. Traitement",
     'Bold: nettoyage en profondeur'),

    # === LINKS (3) ===

    # Link 1: tapis (end of L2750 - philosophie paragraph)
    ("de notre belle région.'",
     "de notre belle région. Notre expertise textile couvre également le <a href=\"/nettoyage-tapis-rouen\">nettoyage de tapis à Rouen</a>.'",
     'Link: tapis'),

    # Link 2: bureaux (end of L2769 - centre historique paragraph)
    ("respectueuses du patrimoine architectural.'",
     "respectueuses du patrimoine architectural. Retrouvez nos solutions dédiées pour le <a href=\"/nettoyage-bureaux-rouen\">nettoyage de bureaux</a>.'",
     'Link: bureaux'),

    # Link 3: devis formulation 1 (end of L2795 - nuisances olfactives paragraph)
    ("sans masquage artificiel.'",
     "sans masquage artificiel. Pour bénéficier de ce traitement, il suffit de <a href=\"/devis-gratuit-rouen\">demander un devis gratuit</a>.'",
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
