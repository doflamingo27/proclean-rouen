#!/usr/bin/env python3
"""SEO Phase B - Fix: 5 missing bolds across 4 pages.

Root cause: re.search finds the FIRST match in the file.
When identical text appears in multiple sections, bolds
landed in the wrong section or were overwritten.

Fix: use highly specific search strings unique to each location.
"""
import re

FILEPATH = 'content/rouen-sections.ts'

def smart_replace(content, old, new):
    """Replace old->new treating NBSP and regular space as equivalent."""
    parts = old.split(' ')
    escaped_parts = [re.escape(p) for p in parts]
    pattern = '[ \u00a0]'.join(escaped_parts)
    match = re.search(pattern, content)
    if match:
        matched_text = content[match.start():match.end()]
        return content[:match.start()] + new + content[match.end():], True
    return content, False

def process(content, replacements):
    print('=== FIX: missing bolds ===')
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

# Pre-check: verify these bolds are actually missing
checks = [
    ('moisissures et acariens</strong>', 'tapis: moisissures'),
    ('traitements anti-pollution renforcés</strong>', 'tapis: anti-pollution'),
    ('savoir-faire spécialisé</strong>', 'immeubles: savoir-faire'),
    ('intervention <strong>ProClean</strong>', 'bureaux: ProClean'),
    ('12 ans, <strong>ProClean</strong> incarne', 'vitres: ProClean'),
]
print('=== Pre-checks (should all be MISSING) ===')
for check_str, label in checks:
    if check_str in content:
        print(f'  ALREADY PRESENT: {label} — skipping')
    else:
        print(f'  MISSING (will fix): {label}')

content, fails = process(content, [
    # === Fix 1: tapis "moisissures et acariens" (L2316) ===
    # Unique context: "Seine qui favorise moisissures et acariens"
    ("Seine qui favorise moisissures et acariens",
     "Seine qui favorise <strong>moisissures et acariens</strong>",
     'tapis: moisissures et acariens (L2316)'),

    # === Fix 2: tapis "traitements anti-pollution renforcés" (L2324) ===
    # Only 1 occurrence without <strong> left in file
    ("de traitements anti-pollution renforcés adaptés aux particules chimiques et industrielles",
     "de <strong>traitements anti-pollution renforcés</strong> adaptés aux particules chimiques et industrielles",
     'tapis: traitements anti-pollution (L2324)'),

    # === Fix 3: immeubles "savoir-faire spécialisé" (L1043) ===
    # Unique context: "savoir-faire spécialisé, destiné aux bâtiments"
    ("notre savoir-faire spécialisé, destiné aux bâtiments",
     "notre <strong>savoir-faire spécialisé</strong>, destiné aux bâtiments",
     'immeubles: savoir-faire spécialisé (L1043)'),

    # === Fix 4: bureaux "ProClean" (L859) ===
    # Unique context: "ProClean à Rouen débute systématiquement par un audit professionnel complet et expert"
    ("intervention ProClean à Rouen débute systématiquement par un audit professionnel complet et expert",
     "intervention <strong>ProClean</strong> à Rouen débute systématiquement par un audit professionnel complet et expert",
     'bureaux: ProClean (L859)'),

    # === Fix 5: vitres "ProClean" (L3011) ===
    # Unique context: "ProClean incarne" + "techniques de nettoyage les plus innovantes"
    ("12 ans, ProClean incarne l\\'excellence du savoir-faire normand appliqué aux techniques de nettoyage",
     "12 ans, <strong>ProClean</strong> incarne l\\'excellence du savoir-faire normand appliqué aux techniques de nettoyage",
     'vitres: ProClean (L3011)'),
])

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

if fails:
    print(f'\nFAILED: {len(fails)}')
    for f in fails:
        print(f'  - {f}')
else:
    print('\nAll 5 fixes applied!')
