#!/usr/bin/env python3
"""SEO Phase B - Lot 3 - Page 14: entretien-immeubles-rouen (5 bolds + 3 links)"""
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
    print('=== entretien-immeubles-rouen ===')
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

    # Bold 1: entretien d'immeubles (L1021, para 1 of section 1)
    ("l\\'entretien d\\'immeubles à Rouen en apportant",
     "l\\'<strong>entretien d\\'immeubles</strong> à Rouen en apportant",
     "Bold: entretien d'immeubles"),

    # Bold 2: savoir-faire spécialisé (L1043, para 1 of h3 Patrimoniaux)
    ("notre expertise technique et de notre savoir-faire spécialisé",
     "notre expertise technique et de notre <strong>savoir-faire spécialisé</strong>",
     "Bold: savoir-faire spécialisé"),

    # Bold 3: copropriétés modernes (L1052, para 1 of h3 Résidentiels)
    ("des copropriétés modernes",
     "des <strong>copropriétés modernes</strong>",
     "Bold: copropriétés modernes"),

    # Bold 4: valorisation immobilière (L1063, para 3 of h3 Décontamination)
    ("la valorisation immobilière rouennaise",
     "la <strong>valorisation immobilière</strong> rouennaise",
     "Bold: valorisation immobilière"),

    # Bold 5: performance économique (L1072, para 3 of h3 Commerciaux)
    ("votre performance économique dans l\\'environnement",
     "votre <strong>performance économique</strong> dans l\\'environnement",
     "Bold: performance économique"),

    # === LINKS (3) ===

    # Link 1: parking (append to L1054 end)
    ("dans l\\'environnement métropolitain rouennais compétitif.'",
     "dans l\\'environnement métropolitain rouennais compétitif. Nous assurons aussi le <a href=\"/nettoyage-parking-rouen\">nettoyage de parking à Rouen</a> pour vos espaces de stationnement.'",
     'Link: parking'),

    # Link 2: vitres (append to L1072 end)
    ("commercial rouennais dynamique.'",
     "commercial rouennais dynamique. Nous intervenons également pour le <a href=\"/nettoyage-vitres-rouen\">nettoyage de vitres à Rouen</a> de vos façades.'",
     'Link: vitres'),

    # Link 3: devis f5 (append to L1079 end)
    ("votre environnement immobilier métropolitain.'",
     "votre environnement immobilier métropolitain. Faites votre <a href=\"/devis-gratuit-rouen\">demande de devis</a> pour un entretien adapté à votre immeuble.'",
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
