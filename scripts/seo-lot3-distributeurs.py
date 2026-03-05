#!/usr/bin/env python3
"""SEO Phase B - Lot 3 - Page 15: nettoyage-distributeurs-rouen (5 bolds + 3 links)"""
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
    print('=== nettoyage-distributeurs-rouen ===')
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

    # Bold 1: ProClean (L1089, para 1 of section 1)
    ("Chez ProClean, nous maîtrisons",
     "Chez <strong>ProClean</strong>, nous maîtrisons",
     'Bold: ProClean'),

    # Bold 2: nettoyage préventif (L1103, para 1 of h3 Connaissance)
    ("protocoles de nettoyage préventif",
     "protocoles de <strong>nettoyage préventif</strong>",
     "Bold: nettoyage préventif"),

    # Bold 3: normes d'hygiène (L1119, para 1 of h3 Équipe)
    ("formés aux normes d\\'hygiène et de sécurité alimentaire",
     "formés aux <strong>normes d\\'hygiène</strong> et de sécurité alimentaire",
     "Bold: normes d'hygiène"),

    # Bold 4: hygiène alimentaire (L1173, para 1 of h3 Distributeurs)
    ("l\\'hygiène alimentaire et l\\'attractivité",
     "l\\'<strong>hygiène alimentaire</strong> et l\\'attractivité",
     "Bold: hygiène alimentaire"),

    # Bold 5: maintenance préventive (L1293, para 1 of h3 Formule Performance)
    ("une maintenance préventive régulière",
     "une <strong>maintenance préventive</strong> régulière",
     "Bold: maintenance préventive"),

    # === LINKS (3) ===

    # Link 1: devis f1 (append to L1090 end)
    ("l\\'environnement d\\'installation.'",
     "l\\'environnement d\\'installation. N\\'hésitez pas à <a href=\"/devis-gratuit-rouen\">demander un devis gratuit</a> adapté à vos besoins.'",
     'Link: devis'),

    # Link 2: commerces (append to L1112 end)
    ("aux pics d\\'utilisation saisonniers et événementiels.'",
     "aux pics d\\'utilisation saisonniers et événementiels. Nous assurons aussi l\\'<a href=\"/entretien-commerces-rouen\">entretien de commerces à Rouen</a> pour vos espaces de vente.'",
     'Link: commerces'),

    # Link 3: bureaux (append to L1120 end)
    ("les composants sensibles.'",
     "les composants sensibles. Notre expertise couvre également le <a href=\"/nettoyage-bureaux-rouen\">nettoyage de bureaux à Rouen</a> pour vos locaux professionnels.'",
     'Link: bureaux'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll OK!')
