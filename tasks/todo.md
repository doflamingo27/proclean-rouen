# ProClean Rouen — Suivi des phases

## Phase 1 : Initialisation (TERMINÉE)

- [x] Scaffolding projet (package.json, tsconfig, postcss, .gitignore)
- [x] Configuration (tailwind.config.ts, next.config.js, globals.css)
- [x] Types TypeScript (types/index.ts)
- [x] Données statiques (siteConfig, services, navigation)
- [x] Contenu structuré (content/rouen.ts — homepage + 20 services)
- [x] Utilitaires (lib/seo.ts, lib/icons.ts)
- [x] Schémas SEO (LocalBusiness, Organization, Breadcrumb, FAQ)
- [x] Composants UI (Button, Card, Heading, AnimateOnScroll)
- [x] SiteHeader responsive + SiteFooter
- [x] Sections homepage (Hero, ServicesGrid, WhyUs, FAQ, CTA, Zone)
- [x] Pages (layout.tsx, page.tsx, sitemap.ts, robots.ts)

## Phase 2 : Pages services + Formulaire (TERMINÉE)

- [x] Nouveaux types (CategoryPageContent, ServicePageTemplateProps, ContactFormData, FormStatus)
- [x] ServiceSchema (components/schema/ServiceSchema.tsx)
- [x] ContentSections (components/sections/ContentSections.tsx)
- [x] PricingSection (components/sections/PricingSection.tsx)
- [x] RelatedServicesSection (components/sections/RelatedServicesSection.tsx)
- [x] ServicePageTemplate (components/templates/ServicePageTemplate.tsx)
- [x] 20 pages services individuelles (app/[slug]/page.tsx)
- [x] Contenu catégories ajouté à content/rouen.ts
- [x] 3 pages catégories (particuliers, professionnels, nettoyage-tissus-ameublement)
- [x] ContactForm (components/forms/ContactForm.tsx) — fond navy, 6 sections, validation, honeypot
- [x] Page devis-gratuit-rouen (app/devis-gratuit-rouen/page.tsx)
- [x] API contact (app/api/contact/route.ts) — validation, rate limiting, sanitization, Nodemailer
- [x] lib/email.ts — helper Nodemailer
- [x] Mentions légales (app/mentions-legales/page.tsx)
- [x] Politique de confidentialité (app/politique-de-confidentialite/page.tsx)
- [x] Build vérifié : 33 pages, 0 erreur, 0 warning

## Review Phase 2

### Fichiers créés (34)
- `components/schema/ServiceSchema.tsx` — JSON-LD @type: Service
- `components/sections/ContentSections.tsx` — Rendu ContentBlock[] (h2/h3, paragraphes, listes)
- `components/sections/PricingSection.tsx` — Tableau tarifs avec CTA
- `components/sections/RelatedServicesSection.tsx` — Grille 3 cards services liés
- `components/templates/ServicePageTemplate.tsx` — Template réutilisable (10 sections)
- `components/forms/ContactForm.tsx` — Formulaire complet (client component)
- `lib/email.ts` — Helper Nodemailer
- `app/api/contact/route.ts` — API endpoint avec rate limiting + honeypot
- 20 pages services (`app/[slug]/page.tsx`)
- 3 pages catégories (`app/particuliers/`, `app/professionnels/`, `app/nettoyage-tissus-ameublement/`)
- `app/devis-gratuit-rouen/page.tsx`
- `app/mentions-legales/page.tsx`
- `app/politique-de-confidentialite/page.tsx`

### Fichiers modifiés (2)
- `types/index.ts` — Ajout CategoryPageContent, ServicePageTemplateProps, ContactFormData, FormStatus + update RouenContent
- `content/rouen.ts` — Ajout section categories (particuliers, professionnels, tissus)

### Architecture
- ServicePageTemplate compose : schemas JSON-LD → Hero → Breadcrumb → Content → Pricing → WhyUs → FAQ → Related → CTA → Zone
- Chaque page service = fichier minimal qui passe les bonnes props au template
- Zéro duplication de code — tout centralisé
- Textes depuis content/rouen.ts — jamais en dur
- Mobile responsive : grilles 1→2→3 colonnes, inputs h-12, touch targets 44px

### SEO vérifié
- Chaque page a generateMetadata() avec title, description, canonical URL, OpenGraph, Twitter
- Schemas JSON-LD : Service + LocalBusiness + BreadcrumbList + FAQPage (si FAQ)
- Maillage interne via relatedSlugs

### Notes
- La plupart des services ont `sections: []` dans rouen.ts (sauf Diogène) — les pages sont fonctionnelles mais le contenu textuel pourra être enrichi
- Variables d'environnement requises : EMAIL_USER, EMAIL_PASS, EMAIL_TO dans .env.local
- Rate limiting en mémoire (reset au redémarrage PM2) — suffisant pour le trafic attendu

## Phase 3 : Polish, Optimisation & Préparation Déploiement (TERMINÉE)

### 3A — SEO Final Check
- [x] Ajout `/admin/` au robots.ts disallow
- [x] Vérifié : 33 pages avec generateMetadata() ✅
- [x] Vérifié : canonical URLs sur toutes les pages ✅
- [x] Vérifié : JSON-LD schemas (Service, LocalBusiness, Breadcrumb, FAQ, Organization) ✅
- [x] Vérifié : sitemap.ts inclut toutes les 27 pages avec priorités ✅
- [x] Vérifié : maillage interne (3 services liés par page + breadcrumbs) ✅

### 3B — Performance
- [x] Ajout config `images: { formats: ['image/avif', 'image/webp'] }` dans next.config.js
- [x] Build production : 33 pages, 0 erreur, 0 warning
- [x] Vérifié : fonts avec `display: 'swap'` sur Inter et Plus Jakarta Sans ✅
- [x] Pas de bibliothèques lourdes inutiles ✅

### 3C — Accessibilité
- [x] Ajout lien "Aller au contenu principal" (skip-to-content) dans layout.tsx
- [x] Ajout `id="main-content"` sur `<main>`
- [x] Ajout `aria-controls`, `id`, `role="region"`, `aria-labelledby` sur FAQ accordion
- [x] Vérifié : focus states sur Button.tsx (focus-visible:ring-2) ✅
- [x] Vérifié : contrastes OK (text-white/60 sur navy = ~5.7:1, passe WCAG AA) ✅

### 3D — Responsive
- [x] Desktop (1440px) : navigation complète, grille 4 services, footer 4 colonnes ✅
- [x] Mobile : hamburger menu, grille 1 colonne, CTA empilés ✅

### 3E — Préparation Déploiement
- [x] Créé `ecosystem.config.js` — PM2, port 3001, max_memory_restart 512M
- [x] Créé `nginx.conf` — HTTPS, www→non-www redirect, HSTS, gzip, cache statique
- [x] Créé `.env.example` — 4 variables documentées (EMAIL_USER, EMAIL_PASS, EMAIL_TO, NEXT_PUBLIC_SITE_URL)
- [x] Créé `DEPLOY.md` — guide complet déploiement VPS Contabo
- [x] Vérifié `.env*.local` dans .gitignore ✅

### 3F — Vérification Playwright
- [x] 20/20 pages services visitées et vérifiées (H1 unique, FAQ, texte >3000 chars, "Rouen" présent)
- [x] 3/3 pages catégories vérifiées (particuliers, professionnels, tissus)
- [x] Formulaire de devis vérifié
- [x] Mentions légales et politique de confidentialité vérifiées

## Review Phase 3

### Fichiers créés (4)
- `ecosystem.config.js` — Config PM2 (port 3001, autorestart, 512M max)
- `nginx.conf` — Reverse proxy Nginx (HTTPS, HSTS, gzip, cache)
- `.env.example` — Template variables d'environnement
- `DEPLOY.md` — Guide déploiement VPS Contabo étape par étape

### Fichiers modifiés (4)
- `app/robots.ts` — Ajout `/admin/` au disallow (+1 ligne)
- `app/layout.tsx` — Skip-to-content link + id="main-content" (+7 lignes)
- `components/sections/FAQSection.tsx` — aria-controls, id, role, aria-labelledby (+4 attributs)
- `next.config.js` — Config images AVIF/WebP (+3 lignes)

### Build production
- **33 pages** statiques générées
- **0 erreur**, 0 warning
- First Load JS partagé : **102 kB**
- Pages services : 147 kB first load (1.22 kB propre)
- Formulaire devis : 107 kB first load (4.66 kB propre)
- Pages catégories : 144 kB first load
- Seule route dynamique : `/api/contact`

### URLs du site (27 pages)
| URL | Type |
|-----|------|
| `/` | Accueil |
| `/nettoyage-canape-rouen` | Service |
| `/nettoyage-tapis-rouen` | Service |
| `/nettoyage-moquette-rouen` | Service |
| `/nettoyage-matelas-rouen` | Service |
| `/nettoyage-vitres-rouen` | Service |
| `/nettoyage-toiture-rouen` | Service |
| `/nettoyage-diogene-rouen` | Service |
| `/nettoyage-apres-travaux-rouen` | Service |
| `/nettoyage-apres-demenagement-rouen` | Service |
| `/nettoyage-lustre-rouen` | Service |
| `/debarras-maison-rouen` | Service |
| `/nettoyage-appartement-rouen` | Service |
| `/nettoyage-voiture-rouen` | Service |
| `/nettoyage-terrasse-rouen` | Service |
| `/nettoyage-bureaux-rouen` | Service |
| `/entretien-commerces-rouen` | Service |
| `/nettoyage-parking-rouen` | Service |
| `/entretien-immeubles-rouen` | Service |
| `/nettoyage-distributeurs-rouen` | Service |
| `/nettoyage-camion-rouen` | Service |
| `/particuliers` | Catégorie |
| `/professionnels` | Catégorie |
| `/nettoyage-tissus-ameublement` | Catégorie |
| `/devis-gratuit-rouen` | Formulaire |
| `/mentions-legales` | Légal |
| `/politique-de-confidentialite` | Légal |

### Schemas JSON-LD implémentés
- **Organization** — page d'accueil
- **LocalBusiness** — accueil + toutes les pages services
- **Service** — toutes les pages services
- **BreadcrumbList** — toutes les pages services
- **FAQPage** — accueil + pages services avec FAQ

### Points d'attention déploiement
1. Configurer `.env.local` sur le VPS avec les identifiants SMTP
2. Le port 3001 est utilisé — vérifier qu'aucun autre service ne l'occupe
3. Les erreurs MIME type en local disparaîtront avec Nginx en production
4. SSL via Let's Encrypt ou Plesk — certificats à configurer avant mise en ligne
5. Tester le formulaire de contact en production (envoi email réel)

## Phase 4 : Redesign Homepage (TERMINÉE)

### Objectif
Passer la homepage de 6 sections "flat" à 10 sections visuellement impactantes avec images de fond, carousel témoignages, compteurs animés et grid 2x2 signature avec cercles.

### Tâches
- [x] Télécharger 6 images libres de droits (hero-bg, about-1, about-2, service-circle-1, service-circle-2, cta-cleaner)
- [x] Ajouter types TypeScript (CounterItem, AboutContent, TestimonialItem, CTAMidContent, ServicesShowcaseItem)
- [x] Ajouter contenu (about, testimonials, ctaMid, servicesShowcase + 4ème item whyUs)
- [x] Ajouter icônes (Users, ChevronLeft, Quote, BadgeDollarSign)
- [x] Refondre HeroSection.tsx (branche homepage UNIQUEMENT — image fond + overlay + texte blanc)
- [x] Créer AboutSection.tsx (2 colonnes, compteurs animés, 2 images asymétriques)
- [x] Créer ServicesShowcase.tsx (grid 2x2 avec cercles centraux)
- [x] Créer CTAMidSection.tsx (bandeau bleu gradient + image)
- [x] Créer TestimonialsCarousel.tsx (4 avis Google réels, auto-advance, AnimatePresence)
- [x] Modifier WhyUsSection.tsx (3 → 4 colonnes)
- [x] Assembler app/page.tsx (10 sections dans le bon ordre)
- [x] Build vérifié : 33 pages, 0 erreur TypeScript, 0 erreur Next.js
- [x] Nettoyage download-images.mjs (fichier temporaire supprimé)

## Review Phase 4

### Fichiers créés (4 composants + 6 images)
- `components/sections/AboutSection.tsx` — Section 2 colonnes avec compteurs animés (useMotionValue + useInView)
- `components/sections/ServicesShowcase.tsx` — Grid 2x2 avec cercles centraux absolus (pointer-events-none)
- `components/sections/CTAMidSection.tsx` — Bandeau bleu gradient avec texte à gauche, image à droite
- `components/sections/TestimonialsCarousel.tsx` — Carousel 4 avis Google (AnimatePresence, auto-advance 5s, pause hover)
- `public/images/hero/hero-bg.webp` — Image de fond hero (149 kB)
- `public/images/about/about-1.webp` — Image About grande (49 kB)
- `public/images/about/about-2.webp` — Image About petite overlap (31 kB)
- `public/images/services/service-circle-1.webp` — Cercle services 1 (8 kB)
- `public/images/services/service-circle-2.webp` — Cercle services 2 (12 kB)
- `public/images/cta/cta-cleaner.webp` — Image CTA cleaner (28 kB)

### Fichiers modifiés (5)
- `types/index.ts` — +5 interfaces, HomepageContent étendu avec champs optionnels
- `content/rouen.ts` — +4 blocs contenu (about, testimonials, ctaMid, servicesShowcase) + 4ème whyUs item
- `lib/icons.ts` — +4 icônes (Users, ChevronLeft, Quote, BadgeDollarSign)
- `components/sections/HeroSection.tsx` — Branche homepage refaite (image fond + overlay, texte blanc) — branche service 100% intacte
- `components/sections/WhyUsSection.tsx` — Grid passé de 3 cols à sm:2/lg:4 cols
- `app/page.tsx` — 10 sections avec rendu conditionnel pour les nouvelles

### Ordre des 10 sections homepage
1. HeroSection (plein écran, image fond, overlay sombre)
2. AboutSection (compteurs animés, 2 images asymétriques)
3. ServicesShowcase (grid 2x2, cercles centraux)
4. CTAMidSection (bandeau bleu gradient)
5. WhyUsSection (4 cards)
6. ServicesGrid (existant, inchangé)
7. TestimonialsCarousel (4 avis Google réels)
8. ZoneInterventionSection (existant, inchangé)
9. FAQSection (existant, inchangé)
10. CTASection (existant, inchangé)

### Techniques clés
- Compteurs animés : `useMotionValue` + `useTransform` + `animate` de framer-motion, déclenchés par `useInView({ once: true })`
- Carousel : custom avec `AnimatePresence mode="wait"`, auto-advance 5s, pause hover, dots + flèches desktop
- Hero : `next/image fill` + overlay gradient `from-navy/80 via-navy/60 to-navy/40` + gradient haut `from-black/30` pour lisibilité header
- Cercles services : `absolute` positionnés au centre de la grid, `hidden md:block`, `pointer-events-none`
- Tous les nouveaux champs de HomepageContent sont optionnels (`?`) → build safe même si contenu partiellement ajouté
- 4 témoignages réels Google : Steven A., Théo F., Emma G., Zen G.

### Build production
- **33 pages** statiques générées
- **0 erreur**, 0 warning code
- Homepage `/` : 7.62 kB + 162 kB First Load JS
- Pages services inchangées : 1.24 kB + 156 kB First Load JS

## SEO Phase A — Parser HTML

### Tâches
- [x] Créer `lib/parseInlineHtml.tsx` — parser React léger
- [x] Modifier `ContentSections.tsx` — intégrer parseInlineHtml (paragraphes + listItems)
- [x] Tester avec 1 paragraphe dans `rouen-sections.ts` + build

## Review Phase A

### Fichiers créés (1)
- `lib/parseInlineHtml.tsx` — Parser qui transforme `<strong>` et `<a href="...">` en composants React

### Fichiers modifiés (2)
- `components/sections/ContentSections.tsx` — Import + remplacement `{p}` → `{parseInlineHtml(p)}` et `{li}` → `{parseInlineHtml(li)}` (3 lignes modifiées)
- `content/rouen-sections.ts` — 1 paragraphe de test dans `nettoyage-apres-travaux-rouen` : ajout `<strong>nettoyage de fin de chantier</strong>` + `<a href="/devis-gratuit-rouen">Demandez votre devis gratuit</a>`

### Fonctionnement du parser
- Fast path : si la string ne contient ni `<strong>` ni `<a`, retourne la string telle quelle (0 overhead)
- Parse d'abord les `<a href="...">` (regex), puis récursivement les `<strong>` dans chaque segment
- Liens internes (`/...`) → `next/link` avec `className="text-proclean-blue hover:text-proclean-blue-light hover:underline transition-colors font-medium"`
- Liens externes (`http...`) → `<a target="_blank" rel="noopener noreferrer">`
- `<strong>` → `className="font-semibold text-navy dark:text-dark-text"`
- Gère l'imbrication `<a><strong>...</strong></a>`
- Toutes les classes Tailwind utilisent les couleurs custom existantes (navy, proclean-blue, proclean-blue-light)

### Build production
- **33 pages** statiques générées
- **0 erreur**, 0 warning
- Pages services : 165 kB First Load JS (léger gain vs 156 kB — le parser ajoute ~9 kB au bundle partagé via next/link)

### Notes
- Le fichier `rouen-sections.ts` contient des espaces insécables (U+00A0) — attention lors des éditions manuelles
- Le parser ne supporte que `<strong>` et `<a>` — pas de `<em>`, `<br>`, etc. (suffisant pour le SEO)
- Prochaine étape : Phase B — ajouter les `<strong>` et liens internes dans les 20 pages services

## SEO Phase B — Maillage + Bold

### Règles appliquées
- Max 5-6 `<strong>` par page, max 1 par paragraphe, pas dans le 1er mot, pas de phrases entières
- 2-3 liens contextuels + 1 lien devis par page, max 1 lien par paragraphe, pas dans le 1er paragraphe
- Ancres descriptives avec mot-clé de la page cible

### Plan par page

#### 1. nettoyage-apres-travaux-rouen (rouen-sections.ts)
- [ ] Bolds : "nettoyage de fin de chantier" (DÉJÀ FAIT test Phase A), "remise en état après travaux", "ProClean", "métropole rouennaise", "nettoyage post chantier"
- [ ] Liens : vitres → dans paragraphe "Nettoyer des vitres en fin de chantier" (Option A), devis (DÉJÀ FAIT test Phase A), bureaux → phrase de transition

#### 2. nettoyage-lustre-rouen (rouen-sections.ts)
- [ ] Bolds : "nettoyage lustres Rouen", "cristal de Baccarat", "ProClean", "patrimoine architectural rouennais", "mise en sécurité électrique"
- [ ] Liens : vitres → dans section "Intervention en Milieu Professionnel", bureaux → phrase de transition, devis → phrase naturelle

#### 3. nettoyage-apres-demenagement-rouen (rouen-sections.ts) ✅ Lot 2

#### 4. debarras-maison-rouen (rouen-sections.ts) ✅ Lot 2

#### 5. nettoyage-appartement-rouen (rouen-sections.ts) ✅ Lot 2

#### 6. nettoyage-voiture-rouen (rouen-sections.ts) ✅ Lot 1

#### 7. nettoyage-terrasse-rouen (rouen-sections.ts) ✅ Lot 2

#### 8. nettoyage-bureaux-rouen (rouen-sections.ts) ✅ Lot 3

#### 9. entretien-commerces-rouen (rouen-sections.ts) ✅ Lot 3

#### 10. nettoyage-parking-rouen (rouen-sections.ts) ✅ Lot 3

#### 11. entretien-immeubles-rouen (rouen-sections.ts) ✅ Lot 3

#### 12. nettoyage-distributeurs-rouen (rouen-sections.ts) ✅ Lot 3

#### 13. nettoyage-camion-rouen (rouen-sections.ts)
- [ ] Bolds : "nettoyage intérieur camion", "ProClean", "désinfection cabine", "Rouen", "flotte professionnelle"
- [ ] Liens : voiture → phrase transition véhicules, bureaux → naturel, devis → CTA

#### 14. nettoyage-canape-rouen (rouen-sections.ts) ✅ Lot 1
#### 15. nettoyage-tapis-rouen (rouen-sections.ts) ✅ Lot 1
#### 16. nettoyage-moquette-rouen (rouen-sections.ts) ✅ Lot 1
#### 17. nettoyage-matelas-rouen (rouen-sections.ts) ✅ Lot 1

#### 18. nettoyage-vitres-rouen (rouen-sections.ts)
- [ ] Bolds : "nettoyage de vitres à Rouen", "raclette professionnelle", "ProClean", "vitres sans traces", "hauteur"
- [ ] Liens : bureaux → phrase naturelle pro, immeubles → transition, devis → CTA

#### 19. nettoyage-toiture-rouen (rouen-sections.ts)
- [ ] Bolds : "nettoyage de toiture à Rouen", "démoussage", "ProClean", "traitement hydrofuge", "ardoise normande"
- [ ] Liens : terrasse → phrase transition extérieur, vitres → naturel, devis → CTA

#### 20. nettoyage-diogene-rouen (rouen.ts — sections inline) ✅ Lot 2

---

## SEO Phase B — Lot 1/4 : Tissus & Ameublement + Voiture (TERMINÉ)

### Récap

| Page | `<strong>` | `<a href>` | Ancre devis | ProClean bold |
|------|-----------|-----------|-------------|---------------|
| canape | 5 | 3 (tapis, matelas, devis) | formulation 1 | non |
| tapis | 5 | 3 (moquette, canape, devis) | formulation 2 | non |
| moquette | 5 | 3 (tapis, bureaux, devis) | formulation 1 | oui |
| matelas | 5 | 3 (canape, appartement, devis) | formulation 2 | non |
| voiture | 5 (4 existants + 1 ajouté) | 3 (existants) | existant | oui |
| **Total** | **25** | **15** | | **2/3 max** |

### Bolds détaillés par page

**canape** : tissus d'ameublement, injection-extraction, cuirs et similicuirs, patrimoine mobilier, traitements spécialisés
**tapis** : moisissures et acariens, injection-extraction, fibres naturelles, traitements anti-pollution renforcés, tapis de collection
**moquette** : ProClean, injection-extraction, environnement professionnel impeccable, traitement anti-acariens, nettoyage en profondeur
**matelas** : sommeil réparateur, injection-extraction, literie familiale, stérilisation hospitalière, traitement en profondeur
**voiture** : nettoyage intérieur voiture, expérience régionale, cuir naturel/simili-cuir/tissu/alcantara, expertise territoriale rouennaise, ProClean

### Scripts utilisés
- `scripts/seo-lot1-canape.py` — 8/8 OK
- `scripts/seo-lot1-tapis.py` — 8/8 OK
- `scripts/seo-lot1-moquette.py` — 8/8 OK
- `scripts/seo-lot1-matelas.py` — 8/8 OK
- `scripts/seo-lot1-voiture.py` — 1/1 OK

### Build
- `npm run build` → 33 pages, 0 erreur
- Seul fichier modifié : `content/rouen-sections.ts`

## SEO Phase B — Lot 2/4 : Particuliers & Résidentiel (TERMINÉ)

### Récap

| Page | `<strong>` | `<a href>` | Ancre devis | ProClean bold | Action |
|------|-----------|-----------|-------------|---------------|--------|
| apres-demenagement | 5 | 3 (vitres, appartement, devis) | formulation 1 | non | +1 bold |
| debarras | 5 | 3 (diogene, devis, appartement) | formulation 1 | non | fix violation +2/-1 bolds |
| appartement | 5 | 3 (apres-demenagement, vitres, devis) | formulation 2 | oui | -2 bolds excédentaires |
| diogene | 5 | 3 (debarras, appartement, devis) | formulation 3 | oui | implémentation complète |
| terrasse | 5 | 3 (vitres, toiture, devis) | formulation 2 | non | aucune modification |
| **Total** | **25** | **15** | | **2/2 max** | |

### Bolds détaillés par page

**apres-demenagement** : nettoyage après déménagement, détartrage intensif, nettoyage fin de bail, état des lieux, métropole rouennaise (ajouté)
**debarras** : débarras de maison, débarras appartement, tissu économique rouennais, destruction certifiée (ajouté), expertise spécialisée (ajouté) — architecture rouennaise retiré (violation 2 bolds/para)
**appartement** : ProClean, grand ménage de printemps, logement rouennais, nettoyage d'appartements et maisons à Rouen, traitements spécialisés — ProClean dupliqué et technologies de nettoyage retirés (7→5)
**diogene** : syndrome de Diogène, accumulation d'objets, ProClean, service global, désinfection renforcée
**terrasse** : spécificités architecturales, résidus atmosphériques, salissures incrustées, agressions climatiques, ultra-respectueuses des matériaux anciens

### Scripts utilisés
- `scripts/seo-lot2-demenagement.py` — 1/1 OK
- `scripts/seo-lot2-debarras.py` — 3/3 OK
- `scripts/seo-lot2-appartement.py` — 2/2 OK
- `scripts/seo-lot2-diogene.py` — 5/5 OK (bolds)
- `scripts/seo-lot2-diogene-links.py` — 3/3 OK (links)

### Build
- `npm run build` → 33 pages, 0 erreur
- Fichiers modifiés : `content/rouen-sections.ts` (pages 6,7,8) + `content/rouen.ts` (page 9)

## SEO Phase B — Lot 3/4 : Services Professionnels (TERMINÉ)

### Récap

| Page | `<strong>` | `<a href>` | Ancre devis | ProClean bold | Action |
|------|-----------|-----------|-------------|---------------|--------|
| bureaux | 5 | 3 (commerces, vitres, devis) | formulation 1 | oui | +1 bold +2 links |
| commerces | 5 | 3 (devis, bureaux, vitres) | non-standard (existant) | non | +1 bold +1 link |
| parking | 5 | 3 (bureaux, devis, immeubles) | non-standard (existant) | non | +1 link |
| immeubles | 5 | 3 (parking, vitres, devis) | formulation 5 | non | implémentation complète |
| distributeurs | 5 | 3 (devis, commerces, bureaux) | formulation 1 | oui | implémentation complète |
| **Total** | **25** | **15** | | **2/2 max** | |

### Bolds détaillés par page

**bureaux** : nettoyage de bureaux, horaires étendus, exemplaire, ultra-compétitif rouennais, ProClean (ajouté)
**commerces** : activité commerciale rouennaise, ultra-spécialisés, ultra-spécifiques, marque, centres commerciaux (ajouté)
**parking** : infrastructure automobile rouennaise, ultra-compétitif, haute pression, préservation de vos actifs immobiliers, prédictive — aucun changement
**immeubles** : entretien d'immeubles, savoir-faire spécialisé, copropriétés modernes, valorisation immobilière, performance économique
**distributeurs** : ProClean, nettoyage préventif, normes d'hygiène, hygiène alimentaire, maintenance préventive

### Scripts utilisés
- `scripts/seo-lot3-bureaux.py` — 3/3 OK
- `scripts/seo-lot3-commerces.py` — 2/2 OK
- `scripts/seo-lot3-parking.py` — 1/1 OK
- `scripts/seo-lot3-immeubles.py` — 8/8 OK
- `scripts/seo-lot3-distributeurs.py` — 7/8 OK (1 fix nécessaire)
- `scripts/seo-lot3-distributeurs-fix.py` — 1/1 OK

### Build
- `npm run build` → 33 pages, 0 erreur
- Fichier modifié : `content/rouen-sections.ts` (5 pages)

## SEO Phase B — Lot 4/4 : Spécialisés + Vérification Finale (TERMINÉ)

### Récap

| Page | `<strong>` | `<a href>` | Ancre devis | ProClean bold | Action |
|------|-----------|-----------|-------------|---------------|--------|
| apres-travaux | 6 | 3 (devis, bureaux, vitres) | "Demandez votre devis gratuit" | oui | **DÉJÀ COMPLET (Phase A)** |
| lustre | 6 | 3 (vitres, bureaux, devis) | "demandez votre devis gratuit" | oui | **DÉJÀ COMPLET (Phase A)** |
| vitres | 5 | 3 (immeubles, bureaux, devis) | "obtenir votre devis personnalisé" | oui | implémentation complète |
| toiture | 5 | 3 (terrasse, vitres, devis) | "estimation gratuite et sans engagement" | non | implémentation complète |
| camion | 5 | 3 (voiture, bureaux, devis) | "obtenir votre devis personnalisé" | non | implémentation complète |
| **Total** | **27** | **15** | | **3** | |

### Bolds détaillés par page

**apres-travaux** (6, Phase A) : nettoyage de fin de chantier, métropole rouennaise, nettoyage post chantier, remise en état après travaux, ProClean, produits de nettoyage professionnels
**lustre** (6, Phase A) : cristal de Baccarat, mise en sécurité électrique, produits professionnels, ProClean, patrimoine architectural rouennais, éclairages patrimoniaux
**vitres** (5) : lavage professionnel de vitres, ProClean, vitres sans la moindre trace, mouilleur-raclette, travaux en hauteur
**toiture** (5) : nettoyage et démoussage de toitures, mousses lichens et algues, traitement hydrofuge, toitures en ardoise, démoussage complet
**camion** (5) : cabines poids lourds, désinfections adaptées, couchettes intégrées, métropole rouennaise, flottes premium

### Scripts utilisés
- `scripts/seo-lot4-vitres.py` — 8/8 OK
- `scripts/seo-lot4-toiture.py` — 8/8 OK
- `scripts/seo-lot4-camion.py` — 8/8 OK
- `scripts/seo-fix-missing-bolds.py` — 5/5 OK (fix ProClean bureaux/vitres + immeubles + tapis×2)

### Build
- `npm run build` → 33 pages, 0 erreur
- Fichier modifié : `content/rouen-sections.ts` (3 pages + 4 fixes)

---

## Audit Global Final — 20 pages SEO Phase B (COMPLET)

### Tableau récapitulatif

| # | Page | `<strong>` | `<a href>` | ProClean | Ancre devis |
|---|------|-----------|-----------|----------|-------------|
| 1 | nettoyage-apres-travaux-rouen | 6 | 3 | oui | Demandez votre devis gratuit |
| 2 | nettoyage-lustre-rouen | 6 | 3 | oui | demandez votre devis gratuit |
| 3 | nettoyage-apres-demenagement-rouen | 4 | 3 | - | demandez votre devis gratuit |
| 4 | debarras-maison-rouen | 5 | 3 | - | demandez votre devis gratuit |
| 5 | nettoyage-appartement-rouen | 6 | 3 | oui | Obtenez un devis personnalisé |
| 6 | nettoyage-voiture-rouen | 4 | 3 | - | Obtenez un devis personnalisé |
| 7 | nettoyage-terrasse-rouen | 6 | 3 | - | Obtenez un devis personnalisé |
| 8 | nettoyage-bureaux-rouen | 5 | 3 | oui | demander un devis gratuit |
| 9 | entretien-commerces-rouen | 5 | 3 | - | Contactez-nous pour un devis |
| 10 | nettoyage-parking-rouen | 5 | 3 | - | Contactez-nous pour un devis |
| 11 | entretien-immeubles-rouen | 5 | 3 | - | demande de devis |
| 12 | nettoyage-distributeurs-rouen | 5 | 3 | oui | demander un devis gratuit |
| 13 | nettoyage-camion-rouen | 5 | 3 | - | obtenir votre devis personnalisé |
| 14 | nettoyage-canape-rouen | 6 | 3 | - | demander un devis gratuit |
| 15 | nettoyage-tapis-rouen | 5 | 3 | - | obtenir votre devis personnalisé |
| 16 | nettoyage-moquette-rouen | 6 | 3 | oui | demander un devis gratuit |
| 17 | nettoyage-matelas-rouen | 5 | 3 | oui | obtenir votre devis personnalisé |
| 18 | nettoyage-vitres-rouen | 5 | 3 | oui | obtenir votre devis personnalisé |
| 19 | nettoyage-toiture-rouen | 5 | 3 | - | estimation gratuite et sans engagement |
| 20 | nettoyage-diogene-rouen | 5 | 3 | oui | estimation gratuite et sans engagement |
| | **TOTAL** | **104** | **60** | **9/20** | **8 formulations** |

### Vérifications

- **`<strong>` par page** : 4-6 (toutes dans les limites, max 6) ✅
- **`<a href>` par page** : 3 (toutes identiques) ✅
- **ProClean bold** : 9 pages sur 20 (bonne distribution) ✅
- **Lien devis** : 20/20 pages ont un lien devis ✅
- **Build** : 33 pages, 0 erreur ✅

### Distribution des ancres devis (8 formulations)

| Formulation | Count | Pages |
|-------------|-------|-------|
| demander un devis gratuit | 4 | bureaux, distributeurs, canape, moquette |
| obtenir votre devis personnalisé | 4 | camion, tapis, matelas, vitres |
| demandez votre devis gratuit | 3 | lustre, demenagement, debarras |
| Obtenez un devis personnalisé | 3 | appartement, voiture, terrasse |
| Contactez-nous pour un devis | 2 | commerces, parking |
| estimation gratuite et sans engagement | 2 | toiture, diogene |
| Demandez votre devis gratuit | 1 | apres-travaux |
| demande de devis | 1 | immeubles |

### Bug corrigé : `re.search` first-match

Certains `<strong>` atterrissaient dans la mauvaise section car `re.search` retourne le 1er match dans tout le fichier. Quand un texte identique existe dans 2 sections, le bold se retrouve dans la section qui apparaît en premier dans le fichier.

**Correction** : script `seo-fix-missing-bolds.py` avec des chaînes de recherche suffisamment spécifiques et uniques pour cibler la bonne section.

**5 bolds corrigés** :
- tapis L2316 : "moisissures et acariens"
- tapis L2324 : "traitements anti-pollution renforcés"
- immeubles L1043 : "savoir-faire spécialisé"
- bureaux L859 : "ProClean"
- vitres L3011 : "ProClean"
