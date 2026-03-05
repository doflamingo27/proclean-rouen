#!/usr/bin/env python3
"""SEO Phase B - Lot 1 - Page 2: nettoyage-tapis-rouen"""
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
    print('=== nettoyage-tapis-rouen ===')
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

    # Bold 1: moisissures et acariens (L2316, para 1 of "Connaissance Approfondie")
    ("favorise moisissures et acariens",
     "favorise <strong>moisissures et acariens</strong>",
     'Bold: moisissures et acariens'),

    # Bold 2: injection-extraction (L2332, para 1 of "Equipe Experts")
    ("les protocoles d\\'injection-extraction, les traitements",
     "les protocoles d\\'<strong>injection-extraction</strong>, les traitements",
     'Bold: injection-extraction'),

    # Bold 3: fibres naturelles (L2333, para 2 of "Equipe Experts")
    ("tapis en fibres naturelles et synthétiques",
     "tapis en <strong>fibres naturelles</strong> et synthétiques",
     'Bold: fibres naturelles'),

    # Bold 4: traitements anti-pollution renforcés (L2324, para 1 of "Protocoles")
    ("de traitements anti-pollution renforcés adaptés",
     "de <strong>traitements anti-pollution renforcés</strong> adaptés",
     'Bold: traitements anti-pollution'),

    # Bold 5: tapis de collection (L2325, para 2 of "Protocoles")
    ("des tapis de collection et des",
     "des <strong>tapis de collection</strong> et des",
     'Bold: tapis de collection'),

    # === LINKS (3) ===

    # Link 1: moquette (end of L2384 - family tapis paragraph)
    ("protocoles renforcés et durables.'",
     "protocoles renforcés et durables. Pour vos sols textiles, découvrez aussi notre <a href=\"/nettoyage-moquette-rouen\">nettoyage de moquette</a>.'",
     'Link: moquette'),

    # Link 2: canape (end of L2570 - ensemble decoratif paragraph)
    ("des services d\\'ensemble urbains.'",
     "des services d\\'ensemble urbains. Nous réalisons aussi le <a href=\"/nettoyage-canape-rouen\">nettoyage de canapé</a>, pour un intérieur impeccable.'",
     'Link: canape'),

    # Link 3: devis formulation 2 (end of L2317 - quartiers paragraph)
    ("de logement et les habitudes familiales.'",
     "de logement et les habitudes familiales. Pour planifier votre entretien, vous pouvez <a href=\"/devis-gratuit-rouen\">obtenir votre devis personnalisé</a>.'",
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
