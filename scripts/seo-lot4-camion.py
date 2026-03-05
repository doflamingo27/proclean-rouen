#!/usr/bin/env python3
"""SEO Phase B - Lot 4 - Page 20: nettoyage-camion-rouen (5 bolds + 3 links)"""
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
    print('=== nettoyage-camion-rouen ===')
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

    # Bold 1: cabines poids lourds (L1485, h3 Connaissance p1)
    ("l\\'entretien des cabines poids lourds",
     "l\\'entretien des <strong>cabines poids lourds</strong>",
     'Bold: cabines poids lourds'),

    # Bold 2: désinfections adaptées (L1493, h3 Protocoles p1)
    ("de désinfections adaptées aux particules chimiques",
     "de <strong>désinfections adaptées</strong> aux particules chimiques",
     'Bold: désinfections adaptées'),

    # Bold 3: couchettes intégrées (L1494, h3 Protocoles p2)
    ("aux couchettes intégrées, tandis",
     "aux <strong>couchettes intégrées</strong>, tandis",
     'Bold: couchettes intégrées'),

    # Bold 4: métropole rouennaise (L1515, h3 Distribution p1)
    ("dans la métropole rouennaise (centre",
     "dans la <strong>métropole rouennaise</strong> (centre",
     'Bold: métropole rouennaise'),

    # Bold 5: flottes premium (L1631, h3 Excellence p1)
    ("aux flottes premium et aux",
     "aux <strong>flottes premium</strong> et aux",
     'Bold: flottes premium'),

    # === LINKS (3) ===

    # Link 1: voiture (append to L1472 end)
    ("l\\'environnement d\\'utilisation spécifique.'",
     "l\\'environnement d\\'utilisation spécifique. Nous proposons aussi le <a href=\"/nettoyage-voiture-rouen\">nettoyage de voiture à Rouen</a> pour vos véhicules légers et utilitaires.'",
     'Link: voiture'),

    # Link 2: bureaux (append to L1486 end)
    ("les contraintes opérationnelles.'",
     "les contraintes opérationnelles. Notre expertise couvre également le <a href=\"/nettoyage-bureaux-rouen\">nettoyage de bureaux à Rouen</a> pour vos locaux administratifs.'",
     'Link: bureaux'),

    # Link 3: devis f2 (append to L1831 end)
    ("flottes de transport longue distance.'",
     "flottes de transport longue distance. Pour <a href=\"/devis-gratuit-rouen\">obtenir votre devis personnalisé</a>, contactez notre équipe spécialisée transport.'",
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
