#!/usr/bin/env python3
"""SEO Phase B - Pages 6-10: Add <strong> and <a> tags."""
import re

FILEPATH = 'content/rouen-sections.ts'

def smart_replace(content, old, new):
    parts = old.split(' ')
    escaped_parts = [re.escape(p) for p in parts]
    pattern = '[ \u00a0]'.join(escaped_parts)
    match = re.search(pattern, content)
    if match:
        return content[:match.start()] + new + content[match.end():], True
    return content, False

def process(content, page_name, replacements):
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

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

total_ok = 0
all_fails = []

# === PAGE 6: nettoyage-voiture-rouen (NOT ProClean conversion) ===
content, ok, fails = process(content, 'PAGE 6: nettoyage-voiture-rouen', [
    # Bold 1: nettoyage intérieur voiture (section 1, para 1)
    ('au nettoyage intérieur voiture à domicile à Rouen',
     'au <strong>nettoyage intérieur voiture</strong> à domicile à Rouen',
     'Bold: nettoyage interieur voiture'),
    # Bold 2: injection-extraction (complet section, para 2)
    ("techniques d'injection-extraction, le shampoing",
     "techniques d\\'<strong>injection-extraction</strong>, le shampoing",
     'Bold: injection-extraction'),
    # Bold 3: traitement anti-odeurs (anti-odeurs section, para 1)
    ("Notre expertise rouennaise en élimination d'odeurs",
     "Notre expertise rouennaise en <strong>élimination d\\'odeurs</strong>",
     'Bold: elimination odeurs'),
    # Bold 4: sellerie automobile (complet section, para 2)
    ('cuir naturel, simili-cuir, tissu, alcantara',
     '<strong>cuir naturel, simili-cuir, tissu, alcantara</strong>',
     'Bold: materiaux sieges'),
    # Bold 5: environnement rouennais (spécificités section, para 3)
    ('expertise territoriale rouennaise nous permet',
     '<strong>expertise territoriale rouennaise</strong> nous permet',
     'Bold: expertise territoriale'),
    # Link: canape (complet section, para 2) - natural transition about upholstery
    ("d'injection-extraction</strong>, le shampoing intégral des tapis",
     "d'injection-extraction</strong>, le shampoing intégral des tapis",
     'SKIP'),
    # Link: canape - add at end of a clean paragraph
    ("dans tous les environnements.',",
     "dans tous les environnements. La technique est similaire à notre <a href=\"/nettoyage-canape-rouen\">nettoyage de canapé à Rouen</a>, adaptée aux tissus automobiles.',",
     'Link: canape'),
    # Link: camion (partenaire section, para 3)
    ("ProClean a la solution technique parfaitement adaptée à votre situation spécifique.',",
     "ProClean a la solution technique parfaitement adaptée à votre situation spécifique. Notre <a href=\"/nettoyage-camion-rouen\">nettoyage intérieur camion</a> complète cette offre pour les véhicules utilitaires et poids lourds.',",
     'Link: camion'),
    # Link: devis (formulation 2: obtenez un devis personnalisé)
    ("votre devis gratuit et personnalisé !',",
     "votre devis gratuit et personnalisé ! <a href=\"/devis-gratuit-rouen\">Obtenez un devis personnalisé</a>.',",
     'Link: devis'),
])
total_ok += ok
all_fails.extend(fails)

# === PAGE 7: nettoyage-terrasse-rouen (NOT ProClean conversion) ===
content, ok, fails = process(content, 'PAGE 7: nettoyage-terrasse-rouen', [
    # Bold 1: nettoyage de terrasse (section 1, para 2)
    ('adaptation parfaite aux spécificités architecturales',
     'adaptation parfaite aux <strong>spécificités architecturales</strong>',
     'Bold: specificites architecturales'),
    # Bold 2: haute pression (étape 4, para 1)
    ('les salissures incrustées par',
     'les <strong>salissures incrustées</strong> par',
     'Bold: salissures incrustees'),
    # Bold 3: anti-mousses (traitements section, para 1)
    ('les agressions climatiques futures typiques',
     'les <strong>agressions climatiques</strong> futures typiques',
     'Bold: agressions climatiques'),
    # Bold 4: environnement séquanais (spécificités section, para 1)
    ('ultra-respectueuses des matériaux anciens',
     '<strong>ultra-respectueuses des matériaux anciens</strong>',
     'Bold: respectueuses materiaux'),
    # Bold 5: dalles et pierres (restauration section, para 1)
    ('résidus atmosphériques concentrés par les inversions thermiques',
     '<strong>résidus atmosphériques</strong> concentrés par les inversions thermiques',
     'Bold: residus atmospheriques'),
    # Link: toiture (spécificités section, para 2)
    ("des centres historiques rouennais.',",
     "des centres historiques rouennais. Les mêmes techniques de nettoyage extérieur sont utilisées pour notre <a href=\"/nettoyage-toiture-rouen\">nettoyage de toiture à Rouen</a>.',",
     'Link: toiture'),
    # Link: vitres (étape 7, para 1)
    ("les cycles climatiques rouennais.',",
     "les cycles climatiques rouennais. Nos équipes interviennent aussi pour le <a href=\"/nettoyage-vitres-rouen\">nettoyage de vitres</a> des baies donnant sur vos espaces extérieurs.',",
     'Link: vitres'),
    # Link: devis (formulation 2: obtenez un devis personnalisé)
    ("votre devis gratuit, détaillé et entièrement personnalisé !',",
     "votre devis gratuit, détaillé et entièrement personnalisé ! <a href=\"/devis-gratuit-rouen\">Obtenez un devis personnalisé</a>.',",
     'Link: devis'),
])
total_ok += ok
all_fails.extend(fails)

# === PAGE 8: nettoyage-bureaux-rouen (ProClean conversion: YES) ===
content, ok, fails = process(content, 'PAGE 8: nettoyage-bureaux-rouen', [
    # Bold 1: nettoyage de bureaux (section 1, para 1)
    ('au nettoyage de bureaux à domicile à Rouen',
     'au <strong>nettoyage de bureaux</strong> à domicile à Rouen',
     'Bold: nettoyage de bureaux (attempt 1)'),
    # Try alternative if first fails
    ('au nettoyage de bureaux à Rouen',
     'au <strong>nettoyage de bureaux</strong> à Rouen',
     'Bold: nettoyage de bureaux (attempt 2)'),
    # Bold 2: ProClean (section 1, para 2)
    ('adaptations techniques que seule notre expérience régionale',
     'adaptations techniques que seule notre <strong>expérience régionale</strong>',
     'Bold: experience regionale'),
    # Bold 3: désinfection des surfaces (quotidien section, para 1)
    ('exemplaire dans',
     '<strong>exemplaire</strong> dans',
     'Bold: exemplaire'),
    # Bold 4: environnement de travail (quotidien section, para 3)
    ("ultra-compétitif rouennais.',",
     "<strong>ultra-compétitif rouennais</strong>.',",
     'Bold: ultra-competitif'),
    # Link: vitres (vitres section, para 1)
    ('Nettoyage Vitres Professionnelles : Expertise Hauteur Rouennaise',
     'Nettoyage Vitres Professionnelles : Expertise Hauteur Rouennaise',
     'SKIP heading'),
    # Link: vitres (vitres section, para 3 end)
    ("dans l'environnement métropolitain rouennais.',",
     "dans l\\'environnement métropolitain rouennais. Pour les surfaces vitrées de vos locaux, notre <a href=\"/nettoyage-vitres-rouen\">service de nettoyage de vitres à Rouen</a> garantit un résultat sans traces.',",
     'Link: vitres'),
    # Link: commerces (partenaire section, para 1)
    ("à tous vos besoins sectoriels spécifiques.',",
     "à tous vos besoins sectoriels spécifiques. Ce savoir-faire professionnel se décline aussi pour l\\' <a href=\"/entretien-commerces-rouen\">entretien de commerces à Rouen</a>.',",
     'Link: commerces'),
    # Link: devis (formulation 2: obtenez un devis personnalisé)
    ("environnement professionnel métropolitain.',",
     "environnement professionnel métropolitain. <a href=\"/devis-gratuit-rouen\">Obtenez un devis personnalisé</a> pour vos locaux.',",
     'Link: devis'),
])
total_ok += ok
all_fails.extend(fails)

# === PAGE 9: entretien-commerces-rouen (ProClean conversion: YES) ===
content, ok, fails = process(content, 'PAGE 9: entretien-commerces-rouen', [
    # Bold 1: entretien de commerces (section 1, para 2)
    ('adaptation parfaite aux contraintes et aux ambitions de votre activité commerciale',
     'adaptation parfaite aux contraintes et aux ambitions de votre <strong>activité commerciale</strong>',
     'Bold: activite commerciale'),
    # Bold 2: ProClean (innovation section, para 1)
    ('défis de nettoyage ultra-spécialisés pour les façades',
     'défis de nettoyage <strong>ultra-spécialisés</strong> pour les façades',
     'Bold: ultra-specialises'),
    # Bold 3: hygiène commerciale (centres commerciaux, para 1)
    ("exemplaire dans l'environnement métropolitain rouennais spécifique.",
     "<strong>exemplaire</strong> dans l\\'environnement métropolitain rouennais spécifique.",
     'Bold: exemplaire commerces'),
    # Bold 4: image de marque (événements section, para 3)
    ("de marque après chaque événement majeur",
     "de <strong>marque</strong> après chaque événement majeur",
     'Bold: marque'),
    # Bold 5: centres commerciaux (heading reference - skip, use text)
    ("fonctionnant en horaires étendus.',",
     "fonctionnant en <strong>horaires étendus</strong>.',",
     'Bold: horaires etendus'),
    # Link: bureaux (partenaire section)
    ("environnement commercial métropolitain.',",
     "environnement commercial métropolitain. Notre expertise couvre aussi le <a href=\"/nettoyage-bureaux-rouen\">nettoyage de bureaux à Rouen</a> pour les espaces tertiaires adjacents.',",
     'Link: bureaux'),
    # Link: vitres (parkings section, para 3)
    ("dans l'environnement métropolitain rouennais.',",
     "dans l\\'environnement métropolitain rouennais. Le <a href=\"/nettoyage-vitres-rouen\">nettoyage des vitrines</a> complète notre offre pour une image commerciale impeccable.',",
     'Link: vitres'),
    # Link: devis (formulation 3: contactez-nous pour un devis)
    ("votre activité commerciale rouennaise.',",
     "votre activité commerciale rouennaise. <a href=\"/devis-gratuit-rouen\">Contactez-nous pour un devis</a> adapté à votre commerce.',",
     'Link: devis'),
])
total_ok += ok
all_fails.extend(fails)

# === PAGE 10: nettoyage-parking-rouen (NOT ProClean conversion) ===
content, ok, fails = process(content, 'PAGE 10: nettoyage-parking-rouen', [
    # Bold 1: nettoyage de parking (section 1, para 2)
    ('adaptation parfaite aux contraintes et aux ambitions de votre infrastructure automobile',
     'adaptation parfaite aux contraintes et aux ambitions de votre <strong>infrastructure automobile</strong>',
     'Bold: infrastructure automobile'),
    # Bold 2: haute pression industrielle (haute pression section, para 1)
    ('approche haute pression garantit une décontamination complète',
     'approche <strong>haute pression</strong> garantit une décontamination complète',
     'Bold: haute pression'),
    # Bold 3: copropriétés (résidentiel section, para 3)
    ("contexte urbain métropolitain rouennais ultra-compétitif.',",
     "contexte urbain métropolitain rouennais <strong>ultra-compétitif</strong>.',",
     'Bold: ultra-competitif parking'),
    # Bold 4: entretien préventif (maintenance section, para 1)
    ('approche prédictive optimise la durabilité',
     'approche <strong>prédictive</strong> optimise la durabilité',
     'Bold: predictive'),
    # Bold 5: parkings souterrains (haute pression section, para 3)
    ('la valorisation et la préservation de vos actifs immobiliers',
     'la valorisation et la <strong>préservation de vos actifs immobiliers</strong>',
     'Bold: preservation actifs'),
    # Link: immeubles (résidentiel section, para 1)
    ("dans l'environnement résidentiel rouennais spécifique.',",
     "dans l\\'environnement résidentiel rouennais spécifique. Les <a href=\"/entretien-immeubles-rouen\">parties communes des immeubles</a> bénéficient du même niveau de soin.',",
     'Link: immeubles'),
    # Link: bureaux (commercial section, para 3)
    ("à votre attractivité commerciale et à votre performance économique.',",
     "à votre attractivité commerciale et à votre performance économique. Les <a href=\"/nettoyage-bureaux-rouen\">bureaux attenants</a> profitent aussi de notre expertise en nettoyage professionnel.',",
     'Link: bureaux'),
    # Link: devis (formulation 3: contactez-nous pour un devis)
    ("environnement automobile métropolitain.',",
     "environnement automobile métropolitain. <a href=\"/devis-gratuit-rouen\">Contactez-nous pour un devis</a> adapté à votre parking.',",
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
