#!/usr/bin/env python3
"""SEO Phase B - Add <strong> and <a> tags to service pages."""
import re
import sys

FILEPATH = 'content/rouen-sections.ts'

def smart_replace(content, old, new):
    """Replace old->new treating NBSP and regular space as equivalent for matching."""
    parts = old.split(' ')
    escaped_parts = [re.escape(p) for p in parts]
    pattern = '[ \u00a0]'.join(escaped_parts)
    match = re.search(pattern, content)
    if match:
        return content[:match.start()] + new + content[match.end():], True
    return content, False

def process_page(content, page_name, replacements):
    """Apply replacements for a single page. Returns (content, ok_count, fail_list)."""
    print(f'=== {page_name} ===')
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
    return content, ok, fails

def main():
    with open(FILEPATH, 'r', encoding='utf-8') as f:
        content = f.read()

    total_ok = 0
    all_fails = []

    # Parse command line for which pages to process
    pages = sys.argv[1:] if len(sys.argv) > 1 else []

    if 'page2' in pages:
        content, ok, fails = process_page(content, 'PAGE 2: nettoyage-lustre-rouen', [
            # Bold 1: cristal de Baccarat (section 1, para 1)
            ('(cristal de Baccarat, bronze',
             '(<strong>cristal de Baccarat</strong>, bronze',
             'Bold: cristal de Baccarat'),
            # Bold 2: mise en sécurité électrique (section 1, para 2)
            ('La mise en sécurité électrique constitue',
             'La <strong>mise en sécurité électrique</strong> constitue',
             'Bold: mise en securite electrique'),
            # Bold 3: produits professionnels (étape 3, para 1)
            ('une gamme complète de produits professionnels formulés',
             'une gamme complète de <strong>produits professionnels</strong> formulés',
             'Bold: produits professionnels'),
            # Bold 4: patrimoine architectural rouennais (patrimoine section)
            ('patrimoine architectural rouennais exceptionnel',
             '<strong>patrimoine architectural rouennais</strong> exceptionnel',
             'Bold: patrimoine architectural rouennais'),
            # Bold 5: éclairages patrimoniaux (last section)
            ('de vos éclairages patrimoniaux',
             'de vos <strong>éclairages patrimoniaux</strong>',
             'Bold: eclairages patrimoniaux'),
            # Link: vitres (contrôle qualité, para 2 end)
            ("environnement rouennais parfaitement préservé après intervention.',",
             'environnement rouennais parfaitement préservé après intervention, y compris le <a href="/nettoyage-vitres-rouen">nettoyage des vitres</a> à proximité des luminaires.\',',
             'Link: vitres'),
            # Link: bureaux (milieu professionnel, para 2 end)
            ("pour garantir la sécurité totale.',",
             'pour garantir la sécurité totale. Ce savoir-faire profite aussi au <a href="/nettoyage-bureaux-rouen">nettoyage de bureaux à Rouen</a>, pour un éclairage optimal dans les espaces de travail.\',',
             'Link: bureaux'),
            # Link: devis (programme maintenance, para 2 end)
            ("la durée de vie des installations délicates.',",
             'la durée de vie des installations délicates. Pour planifier votre entretien, <a href="/devis-gratuit-rouen">demandez votre devis gratuit</a>.\',',
             'Link: devis'),
        ])
        total_ok += ok
        all_fails.extend(fails)

    if 'page3' in pages:
        content, ok, fails = process_page(content, 'PAGE 3: nettoyage-apres-demenagement-rouen', [
            # Bold 1: nettoyage après déménagement (section 1, para 2)
            ('notre nettoyage après déménagement et fin de bail Rouen tient',
             'notre <strong>nettoyage après déménagement</strong> et fin de bail Rouen tient',
             'Bold: nettoyage apres demenagement'),
            # Bold 2: état des lieux (étape 4, para 2 end)
            ('un résultat irréprochable pour votre état des lieux',
             'un résultat irréprochable pour votre <strong>état des lieux</strong>',
             'Bold: etat des lieux'),
            # Bold 3: ProClean (patrimoine section, para 1)
            ('que ProClean a spécialement développée pour',
             'que <strong>ProClean</strong> a spécialement développée pour',
             'Bold: ProClean'),
            # Bold 4: nettoyage fin de bail (étape 4, para 1)
            ('Le nettoyage fin de bail Rouen des sols',
             'Le <strong>nettoyage fin de bail</strong> Rouen des sols',
             'Bold: nettoyage fin de bail'),
            # Bold 5: détartrage intensif (étape 3, para 1)
            ('le détartrage intensif des robinets',
             'le <strong>détartrage intensif</strong> des robinets',
             'Bold: detartrage intensif'),
            # Link: appartement (patrimoine section, para 2 end)
            ("les interventions en secteur protégé.',",
             'les interventions en secteur protégé. Ce savoir-faire patrimonial se retrouve dans notre <a href="/nettoyage-appartement-rouen">entretien professionnel des appartements à Rouen</a>, adapté aux logements anciens.\',',
             'Link: appartement'),
            # Link: vitres (étape 5, para 1)
            ('Les vitres constituent un élément déterminant du nettoyage après déménagement Rouen',
             'Le <a href="/nettoyage-vitres-rouen">nettoyage des vitres</a> constitue un élément déterminant du nettoyage après déménagement Rouen',
             'Link: vitres'),
            # Link: devis (étudiant section, para 2 end)
            ("marché locatif étudiant rouennais.',",
             'marché locatif étudiant rouennais. Pour votre projet, <a href="/devis-gratuit-rouen">demandez votre devis gratuit</a>.\',',
             'Link: devis'),
        ])
        total_ok += ok
        all_fails.extend(fails)

    if 'page4' in pages:
        content, ok, fails = process_page(content, 'PAGE 4: debarras-maison-rouen', [
            # Bold 1: débarras de maison (patrimoine section, para 1)
            ('Le débarras de maison Rouen dans les bâtiments historiques',
             'Le <strong>débarras de maison</strong> Rouen dans les bâtiments historiques',
             'Bold: debarras de maison'),
            # Bold 2: architecture rouennaise (patrimoine section, para 1)
            ('architecture rouennaise exceptionnelle. Nos techniciens spécialisés',
             '<strong>architecture rouennaise</strong> exceptionnelle. Nos techniciens spécialisés',
             'Bold: architecture rouennaise'),
            # Bold 3: débarras appartement (patrimoine section, para 2)
            ('Notre débarras appartement Rouen patrimonial',
             'Notre <strong>débarras appartement</strong> Rouen patrimonial',
             'Bold: debarras appartement'),
            # Bold 4: tissu économique rouennais (pro section, para 1)
            ('du tissu économique rouennais',
             'du <strong>tissu économique rouennais</strong>',
             'Bold: tissu economique rouennais'),
            # Link: diogene (pro section, para 2 end)
            ("pour les liquidations.',",
             'pour les liquidations. Dans les cas les plus sensibles, notre <a href="/nettoyage-diogene-rouen">intervention syndrome de Diogène</a> prend le relais avec un protocole sanitaire renforcé.\',',
             'Link: diogene'),
            # Link: appartement (étudiant section, para 2 end)
            ("pour les nouveaux locataires.',",
             'pour les nouveaux locataires. La <a href="/nettoyage-appartement-rouen">remise en état complète des appartements</a> termine le processus de rotation locative.\',',
             'Link: appartement'),
            # Link: devis (étudiant section, para 1 end)
            ("des tarifs étudiés.',",
             'des tarifs étudiés. Pour toute demande, <a href="/devis-gratuit-rouen">demandez votre devis gratuit</a>.\',',
             'Link: devis'),
        ])
        total_ok += ok
        all_fails.extend(fails)

    if 'page5' in pages:
        content, ok, fails = process_page(content, 'PAGE 5: nettoyage-appartement-rouen', [
            # Bold 1: nettoyage d'appartements (spécificités section)
            ("Le nettoyage d\\'appartements et maisons à Rouen présente",
             "Le <strong>nettoyage d\\'appartements et maisons à Rouen</strong> présente",
             'Bold: nettoyage appartements'),
            # Bold 2: ProClean (ménage régulier, para 1)
            ('de ménage régulier ProClean à Rouen',
             'de ménage régulier <strong>ProClean</strong> à Rouen',
             'Bold: ProClean'),
            # Bold 3: grand ménage de printemps (section 2, para 1)
            ('Le grand ménage de printemps ProClean',
             'Le <strong>grand ménage de printemps</strong> ProClean',
             'Bold: grand menage de printemps'),
            # Bold 4: technologies de nettoyage (innovations section)
            ('dans les technologies de nettoyage les plus avancées',
             'dans les <strong>technologies de nettoyage</strong> les plus avancées',
             'Bold: technologies de nettoyage'),
            # Bold 5: logement rouennais (printemps section, para 3)
            ('beauté authentique de votre logement rouennais',
             'beauté authentique de votre <strong>logement rouennais</strong>',
             'Bold: logement rouennais'),
            # Link: apres-demenagement (déménagement section, para 1)
            ('nettoyage avant ou après déménagement ProClean à Rouen',
             'nettoyage avant ou après déménagement <a href="/nettoyage-apres-demenagement-rouen">ProClean à Rouen</a>',
             'Link: apres-demenagement'),
            # Link: vitres (services complémentaires section)
            ('Entretien des Vitres : Nettoyage intérieur et extérieur',
             'Entretien des Vitres : <a href="/nettoyage-vitres-rouen">Nettoyage intérieur et extérieur</a>',
             'Link: vitres'),
            # Link: devis (dernière section, para 4)
            ("pour votre devis gratuit et personnalisé !',",
             'pour votre devis gratuit et personnalisé ! <a href="/devis-gratuit-rouen">Obtenez un devis personnalisé</a>.\',',
             'Link: devis'),
        ])
        total_ok += ok
        all_fails.extend(fails)

    with open(FILEPATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'\n=== TOTAL: {total_ok} OK, {len(all_fails)} FAILED ===')
    if all_fails:
        for f in all_fails:
            print(f'  FAILED: {f}')

if __name__ == '__main__':
    main()
