#!/usr/bin/env python3
"""SEO Phase B - Lot 1 - Page 4: nettoyage-matelas-rouen"""
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
    print('=== nettoyage-matelas-rouen ===')
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

    # Bold 1: sommeil réparateur (L2876, para 2 of "Heritage Normand")
    ("perturbations du sommeil réparateur.",
     "perturbations du <strong>sommeil réparateur</strong>.",
     'Bold: sommeil réparateur'),

    # Bold 2: injection-extraction (L2884, para 1 of "Technologie")
    ("L\\'injection-extraction constitue",
     "L\\'<strong>injection-extraction</strong> constitue",
     'Bold: injection-extraction'),

    # Bold 3: literie familiale (L2896, para 1 of "Domaines Excellence")
    ("de la literie familiale complète",
     "de la <strong>literie familiale</strong> complète",
     'Bold: literie familiale'),

    # Bold 4: stérilisation hospitalière (L2899, para 4 of "Domaines Excellence")
    ("stérilisation hospitalière des matelas",
     "<strong>stérilisation hospitalière</strong> des matelas",
     'Bold: stérilisation hospitalière'),

    # Bold 5: traitement en profondeur (L2920, para 3 of "Bénéfices")
    ("Notre traitement en profondeur neutralise",
     "Notre <strong>traitement en profondeur</strong> neutralise",
     'Bold: traitement en profondeur'),

    # === LINKS (3) ===

    # Link 1: canape (end of L2877 - expertise régionale paragraph)
    ("pathogènes dans les foyers normands.'",
     "pathogènes dans les foyers normands. Cette technique est aussi employée pour le <a href=\"/nettoyage-canape-rouen\">nettoyage de canapé</a>, autre textile essentiel du foyer.'",
     'Link: canape'),

    # Link 2: appartement (end of L2898 - locations saisonnières paragraph)
    ("vos plannings de rotation serrés.'",
     "vos plannings de rotation serrés. Consultez aussi notre <a href=\"/nettoyage-appartement-rouen\">nettoyage d\\'appartement à Rouen</a> pour une remise en état complète.'",
     'Link: appartement'),

    # Link 3: devis formulation 2 (end of L2922 - durabilité paragraph)
    ("la régularité d\\'entretien professionnel.'",
     "la régularité d\\'entretien professionnel. Pour protéger votre investissement, vous pouvez <a href=\"/devis-gratuit-rouen\">obtenir votre devis personnalisé</a>.'",
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
