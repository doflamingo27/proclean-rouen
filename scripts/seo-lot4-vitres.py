#!/usr/bin/env python3
"""SEO Phase B - Lot 4 - Page 18: nettoyage-vitres-rouen (5 bolds + 3 links)"""
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
    print('=== nettoyage-vitres-rouen ===')
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

    # Bold 1: lavage professionnel de vitres (L3004, intro)
    ("lavage professionnel de vitres en Seine-Maritime",
     "<strong>lavage professionnel de vitres</strong> en Seine-Maritime",
     'Bold: lavage professionnel de vitres'),

    # Bold 2: ProClean (L3011, h3 Excellence p1)
    ("12 ans, ProClean incarne",
     "12 ans, <strong>ProClean</strong> incarne",
     'Bold: ProClean'),

    # Bold 3: vitres sans la moindre trace (L3020, h3 Technologies p1)
    ("des vitres sans la moindre trace ni résidu",
     "des <strong>vitres sans la moindre trace</strong> ni résidu",
     'Bold: vitres sans traces'),

    # Bold 4: mouilleur-raclette (L3022, h3 Technologies p3)
    ("professionnelle mouilleur-raclette avec",
     "professionnelle <strong>mouilleur-raclette</strong> avec",
     'Bold: mouilleur-raclette'),

    # Bold 5: travaux en hauteur (L3095, FAQ p3)
    ("pour tous les travaux en hauteur",
     "pour tous les <strong>travaux en hauteur</strong>",
     'Bold: travaux en hauteur'),

    # === LINKS (3) ===

    # Link 1: immeubles (append to L3013 end)
    ("une précision d\\'orfèvre.'",
     "une précision d\\'orfèvre. Nous assurons également l\\'<a href=\"/entretien-immeubles-rouen\">entretien d\\'immeubles à Rouen</a> pour vos copropriétés et résidences.'",
     'Link: immeubles'),

    # Link 2: bureaux (append to L3031 end)
    ("les rythmes d\\'activité.'",
     "les rythmes d\\'activité. Découvrez aussi notre service de <a href=\"/nettoyage-bureaux-rouen\">nettoyage de bureaux à Rouen</a> pour vos locaux professionnels.'",
     'Link: bureaux'),

    # Link 3: devis f2 (append to L3035 end)
    ("un habitat sublimé par la lumière.'",
     "un habitat sublimé par la lumière. Pour <a href=\"/devis-gratuit-rouen\">obtenir votre devis personnalisé</a>, contactez notre équipe de spécialistes.'",
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
