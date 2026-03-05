# CLAUDE.md — ProClean Rouen (societe-nettoyage-rouen.fr)

## Contexte du projet

Site vitrine SEO-first pour ProClean, entreprise de nettoyage professionnelle.
Ce site cible la ville de **Rouen** (Seine-Maritime, 76) avec un domaine exact match : `societe-nettoyage-rouen.fr`
Il fait partie d'un réseau de 20 sites locaux. C'est le premier site du réseau, il servira de **template** pour les 19 autres villes.

## Objectif principal

Générer des leads (demandes de devis) via le SEO local sur les requêtes "nettoyage + service + Rouen".
Chaque page cible un service spécifique et doit se positionner en top 3 Google sur sa requête principale.

---

## Règles de travail Claude Code

- D'abord réfléchir au problème, lire le code pour trouver les fichiers concernés, et écrire un plan dans `tasks/todo.md`.
- Le plan doit avoir une liste de tâches que tu peux cocher au fur et à mesure que tu les termines.
- Avant de commencer à coder, vérifie avec moi et je validerai le plan.
- Ensuite, travaille sur les tâches, en les marquant comme terminées au fur et à mesure.
- À chaque étape, donne-moi juste une explication rapide de ce que tu as changé.
- Chaque tâche et modification de code doit être la plus simple possible. On veut éviter les changements massifs ou complexes. Chaque modification doit impacter le moins de code possible. Tout est question de simplicité.
- À la fin, ajoute une section "review" dans le fichier `tasks/todo.md` avec un résumé des changements et toute info pertinente.
- NE SOIS PAS PARESSEUX. JAMAIS. S'il y a un bug, trouve la cause racine et corrige-la. Pas de solutions temporaires. Tu es un DÉVELOPPEUR SENIOR. Ne sois jamais paresseux.
- Toutes les corrections et modifications de code doivent être les plus simples possible. Elles ne doivent impacter QUE le code nécessaire à la tâche et rien d'autre. Ça doit toucher le moins de code possible. Ton objectif est de ne pas introduire de bugs. TOUT EST QUESTION DE SIMPLICITÉ.

---

## Stack technique

| Composant | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Langage | TypeScript | 5.x |
| Runtime | React | 19.x |
| CSS | Tailwind CSS | 3.4.x |
| Animations | Framer Motion | 12.x |
| Icônes | Lucide React | latest |
| Polices | Inter + Plus Jakarta Sans (Google Fonts via next/font) | - |
| Email formulaire | Nodemailer (SMTP Gmail) | 7.x |
| Linting | ESLint + Prettier | - |
| Déploiement | VPS Contabo (PM2 + Nginx reverse proxy) | - |

### Ce qu'on n'utilise PAS (contrairement à Free Addict)
- ❌ Prisma / PostgreSQL (pas besoin de BDD)
- ❌ Cloudinary (images locales optimisées via next/image)
- ❌ Netlify / Vercel (déploiement sur VPS propre)
- ❌ Meta Pixel / CAPI tracking
- ❌ Blog / système markdown

---

## Architecture du projet

```
proclean-rouen/
├── app/
│   ├── layout.tsx                    # Layout global (fonts, metadata, header, footer)
│   ├── globals.css                   # Styles globaux Tailwind
│   ├── page.tsx                      # Page d'accueil
│   ├── sitemap.ts                    # Sitemap dynamique
│   ├── robots.ts                     # Robots.txt dynamique
│   ├── devis-gratuit-rouen/
│   │   └── page.tsx                  # Page formulaire de devis
│   ├── nettoyage-canape-rouen/
│   │   └── page.tsx                  # Service : canapé
│   ├── nettoyage-tapis-rouen/
│   │   └── page.tsx
│   ├── nettoyage-moquette-rouen/
│   │   └── page.tsx
│   ├── nettoyage-matelas-rouen/
│   │   └── page.tsx
│   ├── nettoyage-vitres-rouen/
│   │   └── page.tsx
│   ├── nettoyage-toiture-rouen/
│   │   └── page.tsx
│   ├── nettoyage-diogene-rouen/
│   │   └── page.tsx
│   ├── nettoyage-apres-travaux-rouen/
│   │   └── page.tsx
│   ├── nettoyage-apres-demenagement-rouen/
│   │   └── page.tsx
│   ├── nettoyage-lustre-rouen/
│   │   └── page.tsx
│   ├── debarras-maison-rouen/
│   │   └── page.tsx
│   ├── nettoyage-appartement-rouen/
│   │   └── page.tsx
│   ├── nettoyage-voiture-rouen/
│   │   └── page.tsx
│   ├── nettoyage-terrasse-rouen/
│   │   └── page.tsx
│   ├── nettoyage-bureaux-rouen/
│   │   └── page.tsx
│   ├── entretien-commerces-rouen/
│   │   └── page.tsx
│   ├── nettoyage-parking-rouen/
│   │   └── page.tsx
│   ├── entretien-immeubles-rouen/
│   │   └── page.tsx
│   ├── nettoyage-distributeurs-rouen/
│   │   └── page.tsx
│   ├── nettoyage-camion-rouen/
│   │   └── page.tsx
│   ├── nettoyage-tissus-ameublement/
│   │   └── page.tsx                  # Page catégorie tissus
│   ├── particuliers/
│   │   └── page.tsx                  # Page catégorie particuliers
│   ├── professionnels/
│   │   └── page.tsx                  # Page catégorie professionnels
│   ├── mentions-legales/
│   │   └── page.tsx
│   ├── politique-de-confidentialite/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts              # API endpoint formulaire de contact
├── components/
│   ├── ui/                           # Composants UI réutilisables
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Heading.tsx
│   ├── sections/                     # Sections de pages
│   │   ├── HeroSection.tsx           # Hero paramétrable (PAS de duplication par ville)
│   │   ├── ServicesGrid.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── ZoneInterventionSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── forms/
│   │   └── ContactForm.tsx           # Formulaire de devis
│   └── schema/                       # JSON-LD structured data
│       ├── LocalBusinessSchema.tsx
│       ├── ServiceSchema.tsx
│       ├── FAQSchema.tsx
│       ├── BreadcrumbSchema.tsx
│       └── OrganizationSchema.tsx
├── content/
│   └── rouen.ts                      # TOUS les textes SEO centralisés ici
├── data/
│   ├── services.ts                   # Liste des services avec slugs, titres, descriptions
│   ├── siteConfig.ts                 # Config du site (nom, URL, email, téléphone, adresse)
│   └── navigation.ts                 # Structure de navigation
├── lib/
│   ├── seo.ts                        # Helpers SEO (generateMetadata, etc.)
│   └── email.ts                      # Config Nodemailer
├── public/
│   ├── images/                       # Images optimisées (WebP)
│   │   ├── logo.webp
│   │   ├── logo-white.webp
│   │   ├── hero/
│   │   └── services/
│   └── favicon.ico
├── types/
│   └── index.ts                      # Types TypeScript
├── tasks/
│   └── todo.md                       # Fichier de suivi des tâches
├── CLAUDE.md                         # CE FICHIER
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                        # Variables d'environnement (NE PAS COMMIT)
```

---

## Design System — Palette ProClean

### Couleurs
```
Bleu Navy (principal)    : #0A2540  → textes, headers, fonds dark
Bleu ProClean            : #2196F3  → boutons principaux, liens
Bleu clair               : #64B5F6  → hover, splash, accents
Vert lime (logo "Pro")   : #8BC34A  → accents secondaires, badges
Blanc                    : #FFFFFF  → fond principal
Gris très clair          : #F5F7FA  → fond sections alternées
Gris texte               : #4B5563  → paragraphes
Gris bordure             : #E5E7EB  → séparateurs
```

### Couleurs dark mode
```
Fond principal dark      : #0B1426
Fond secondaire dark     : #0E1C33
Texte principal dark     : #F1F5F9
Texte secondaire dark    : #94A3B8
```

### Polices
- **Inter** : corps de texte (--font-inter)
- **Plus Jakarta Sans** : titres, display (--font-jakarta)
- Utiliser `font-display: swap` pour la performance

### Gradients
```
Hero gradient light      : linear-gradient(135deg, #EAF3FF 0%, #F7FBFF 45%, #EAF6FF 100%)
Hero gradient dark       : linear-gradient(135deg, #0B1426 0%, #0E1C33 100%)
CTA gradient             : linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)
Blob décoratif           : radial-gradient(60% 60% at 30% 20%, rgba(33,150,243,0.22) 0%, rgba(139,195,74,0.18) 45%, rgba(255,255,255,0) 100%)
```

### Design guidelines
- Coins arrondis : `rounded-xl` (12px) pour les cards, `rounded-2xl` (16px) pour les sections
- Ombres : utiliser `shadow-soft` (0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04))
- Animations : Framer Motion avec `fadeInUp` et `staggerChildren` pour l'apparition des éléments
- Espacement : sections padding `py-16 md:py-24`, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Dark mode : support complet avec `class` strategy Tailwind

---

## SEO — Règles strictes

### Technique
1. **Chaque page** DOIT avoir un `generateMetadata()` unique avec title, description, canonical, openGraph, twitter
2. **Chaque page service** DOIT avoir un Schema JSON-LD `Service` + `LocalBusiness` + `BreadcrumbList`
3. **La page d'accueil** DOIT avoir un Schema `Organization` + `LocalBusiness` + `WebSite`
4. **La page FAQ** (intégrée dans l'accueil) DOIT avoir un Schema `FAQPage`
5. **Sitemap.xml** dynamique avec toutes les pages et priorités correctes
6. **Robots.txt** : Allow tout sauf /api/ et /_next/
7. **Canonical URLs** : toutes les pages pointent vers leur URL canonique (https://societe-nettoyage-rouen.fr/...)
8. **Hreflang** : `fr-FR`
9. **Images** : toutes les images DOIVENT avoir un `alt` descriptif avec mots-clés locaux

### Structure des pages service
Chaque page service suit cette structure HTML sémantique :
```
<main>
  <article>
    <h1>Titre principal avec mot-clé + "Rouen"</h1>
    <p>Introduction avec mot-clé dans les 100 premiers mots</p>
    
    <section>
      <h2>Sous-titre service</h2>
      <p>Contenu détaillé...</p>
    </section>
    
    <section>
      <h2>Pourquoi choisir ProClean...</h2>
      ...
    </section>
    
    <section> <!-- FAQ intégrée -->
      <h2>Questions fréquentes</h2>
      ...
    </section>
    
    <section> <!-- CTA -->
      <h2>Demandez votre devis gratuit</h2>
      ...
    </section>
  </article>
</main>
```

### Maillage interne
- Chaque page service doit contenir 3-5 liens vers d'autres pages services pertinentes
- La page d'accueil doit lier vers TOUTES les pages services
- Les pages catégorie (particuliers, professionnels, tissus) lient vers leurs sous-pages

---

## Formulaire de contact (page /devis-gratuit-rouen)

### Champs du formulaire
1. **Vos coordonnées** (section)
   - Nom* (text, required)
   - Email* (email, required)
   - Téléphone* (tel, required)
   - Ville d'intervention* (text, required, pré-rempli "Rouen")

2. **Type de prestation souhaitée** (section)
   - Checkboxes : Nettoyage canapés/tissus, Nettoyage après déménagement, Nettoyage bureaux/locaux pro, Syndrome de Diogène, Nettoyage vitres, Autres
   - Champ texte : "Précisez si autre prestation"

3. **Informations sur les lieux** (section)
   - Select : Type de local (Appartement, Maison, Bureau, Commerce, Immeuble, Autre)
   - Number : Surface approximative en m²
   - Select : Fréquence (Ponctuelle, Hebdomadaire, Bi-mensuelle, Mensuelle, Trimestrielle)

4. **Planification** (section)
   - Date : Date souhaitée (min: today)
   - Select : Créneau horaire (Matin 8h-12h, Après-midi 12h-17h, Soirée 17h-20h, Flexible)

5. **Commentaires** (section)
   - Textarea : Besoins spécifiques

6. **RGPD** (section)
   - Checkbox : Acceptation RGPD (required)

7. **Bouton** : "OBTENIR MON DEVIS GRATUIT"
8. **Texte** : "Nous vous répondons sous 24h avec un devis personnalisé"
9. **Badge** : 🔒 Demande 100% sécurisée et sans engagement

### API Route (/api/contact)
- Validation côté serveur de tous les champs required
- Envoi via Nodemailer SMTP vers `contact@proclean20.fr`
- Email HTML formaté avec toutes les informations
- Honeypot anti-spam (champ caché)
- Rate limiting basique (max 5 envois/minute par IP)
- Réponse JSON { success: true/false, message: string }

### Variables d'environnement (.env.local)
```
EMAIL_USER=noreply@proclean20.fr
EMAIL_PASS=xxx (mot de passe application Gmail ou SMTP)
EMAIL_TO=contact@proclean20.fr
NEXT_PUBLIC_SITE_URL=https://societe-nettoyage-rouen.fr
```

---

## Sécurité

### Headers HTTP (dans next.config.js)
```javascript
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  },
]
```

### Formulaire
- Honeypot field (champ invisible pour les bots)
- Validation côté client ET côté serveur
- Sanitization des inputs (échapper HTML)
- Rate limiting par IP

---

## Performance — Objectifs

- **Lighthouse Performance** : > 95
- **Lighthouse SEO** : 100
- **Lighthouse Accessibility** : > 95
- **Lighthouse Best Practices** : 100
- **Core Web Vitals** : LCP < 2.5s, FID < 100ms, CLS < 0.1

### Techniques
- Images : format WebP, lazy loading via next/image, dimensions explicites
- Fonts : `font-display: swap`, preload des polices critiques
- CSS : Tailwind purge en production
- JS : code splitting automatique Next.js, pas de bibliothèques lourdes inutiles
- Prefetch : liens internes avec next/link (prefetch automatique)

---

## Informations commerciales ProClean

- **Nom** : ProClean / Pro CLean
- **Slogan** : "Nettoyage de Pro pour les Pros"
- **Siège** : 7 Rue Washington, 76600 Le Havre
- **SIRET** : 93751600300012
- **Téléphone** : 07 49 13 06 83
- **Email contact** : contact@proclean20.fr
- **Moyens de paiement** : Chèque, Virement bancaire, Espèces
- **Zone Rouen** : Sotteville-lès-Rouen, Mont-Saint-Aignan, Bois-Guillaume, Canteleu, Grand-Quevilly, Petit-Quevilly, Déville-lès-Rouen, Maromme, Notre-Dame-de-Bondeville, Darnétal, Saint-Clément, quartier Jardin des Plantes

---

## Contenu des textes

Tous les textes SEO sont dans le fichier `content/rouen.ts`.
Ce fichier est importé par chaque page et contient les textes pour chaque service.
Les textes ont été rédigés par un humain et sont 100% uniques — NE PAS les modifier sans autorisation.
Le fichier source des textes bruts est dans `content/raw/rouen-textes.txt`.

---

## Git & GitHub

- **Repository** : https://github.com/doflamingo27/proclean-rouen
- **Remote** : `https://github.com/doflamingo27/proclean-rouen.git`
- **Branche principale** : `main`

### Workflow Git
- Commiter régulièrement avec des messages descriptifs en français
- Ne JAMAIS commiter `.env.local` (secrets SMTP)
- Push sur `main` après chaque lot de modifications validées
- Vérifier `git status` avant chaque commit

---

## Déploiement

Le site sera déployé sur un VPS Contabo avec :
- **Node.js** (via nvm)
- **PM2** (process manager)
- **Nginx** (reverse proxy + SSL via Let's Encrypt)
- **Plesk** (panel d'administration)

Commandes de déploiement :
```bash
npm run build     # Build production
pm2 start npm --name "proclean-rouen" -- start    # Lancer le serveur
pm2 save          # Sauvegarder la config PM2
```
