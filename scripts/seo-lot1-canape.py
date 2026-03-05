#!/usr/bin/env python3
"""SEO Phase B - Lot 1 - Page 1: nettoyage-canape-rouen"""
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
    print('=== nettoyage-canape-rouen ===')
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

    # Bold 1: tissus d'ameublement (L1876, para 1 of "Connaissance Approfondie")
    ("pour vos tissus d\\'ameublement",
     "pour vos <strong>tissus d\\'ameublement</strong>",
     'Bold: tissus ameublement'),

    # Bold 2: injection-extraction (L1892, para 1 of "Equipe Experts")
    ("protocoles d\\'injection-extraction",
     "protocoles d\\'<strong>injection-extraction</strong>",
     'Bold: injection-extraction'),

    # Bold 3: cuirs et similicuirs (L1893, para 2 of "Equipe Experts")
    ("cuirs et similicuirs",
     "<strong>cuirs et similicuirs</strong>",
     'Bold: cuirs et similicuirs'),

    # Bold 4: patrimoine mobilier (L1925, para 1 of "Canapes Anciens")
    ("du patrimoine mobilier",
     "du <strong>patrimoine mobilier</strong>",
     'Bold: patrimoine mobilier'),

    # Bold 5: traitements specialises (L2005, para 1 of "Anti-Pollution")
    ("des traitements spécialisés contre",
     "des <strong>traitements spécialisés</strong> contre",
     'Bold: traitements specialises'),

    # === LINKS (3) ===

    # Link 1: tapis (end of L1893 - expertise paragraph)
    ("d\\'endommager vos précieux meubles.'",
     "d\\'endommager vos précieux meubles. Notre savoir-faire textile couvre aussi le <a href=\"/nettoyage-tapis-rouen\">nettoyage de tapis à Rouen</a>.'",
     'Link: tapis'),

    # Link 2: matelas (end of L1885 - protocols paragraph)
    ("du mobilier design contemporain.'",
     "du mobilier design contemporain. Nous intervenons aussi pour le <a href=\"/nettoyage-matelas-rouen\">nettoyage de matelas</a>, autre textile essentiel de votre confort.'",
     'Link: matelas'),

    # Link 3: devis formulation 1 (end of L1877 - quartiers paragraph)
    ("les habitudes familiales.'",
     "les habitudes familiales. Pour obtenir une estimation, il suffit de <a href=\"/devis-gratuit-rouen\">demander un devis gratuit</a>.'",
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
