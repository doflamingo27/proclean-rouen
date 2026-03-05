import type { RouenContent } from '@/types';
import { serviceSections } from './rouen-sections';

const ZONE_CITIES = [
  'Sotteville-lès-Rouen',
  'Mont-Saint-Aignan',
  'Bois-Guillaume',
  'Canteleu',
  'Grand-Quevilly',
  'Petit-Quevilly',
  'Déville-lès-Rouen',
  'Maromme',
  'Notre-Dame-de-Bondeville',
  'Darnétal',
  'Saint-Étienne-du-Rouvray',
];

const PAYMENT_METHODS = 'Chèque, Virement bancaire, Espèces';

export const rouenContent: RouenContent = {
  homepage: {
    h1: 'ProClean - Votre partenaire nettoyage de référence à Rouen',
    subtitle:
      'Experts en nettoyage professionnel de la cathédrale Notre-Dame aux quartiers de la rive droite',
    introSection: {
      heading:
        'Services de nettoyage personnalisés pour Rouennais particuliers et professionnels',
      paragraph:
        'ProClean vous propose des solutions de nettoyage adaptées à Rouen et son agglomération. Établie au cœur de la Seine-Maritime, notre équipe comprend les enjeux spécifiques du patrimoine rouennais. Du vieux Rouen historique aux nouveaux quartiers de Saint-Sever, nous maîtrisons les techniques préservant l\'architecture normande traditionnelle face à l\'humidité de la Seine.',
    },
    whyUs: {
      heading: 'Les atouts ProClean à Rouen',
      items: [
        {
          title: 'Savoir-faire patrimonial',
          description:
            'Depuis notre installation rouennaise, ProClean excelle dans la régénération des tissus d\'ameublement, la maintenance des espaces professionnels et la gestion des situations délicates comme le syndrome de Diogène. Nos spécialistes allient respect du patrimoine et méthodes modernes pour des résultats exceptionnels et pérennes.',
          icon: 'Shield',
          stat: '15+',
          statLabel: "ans d'expérience",
        },
        {
          title: 'Service rapide - Estimation en 24h',
          description:
            'Disponibilité assurée dans toute la métropole rouennaise : Rive Gauche, Rive Droite, Saint-Sever, Grammont. Nos techniciens interviennent promptement, en situation d\'urgence comme pour vos rendez-vous programmés.',
          icon: 'Clock',
          stat: '24h',
          statLabel: 'délai de réponse',
        },
        {
          title: 'Excellence client - Notre promesse',
          description:
            'Toute intervention fait l\'objet d\'un contrôle qualité minutieux assorti de garanties fermes. Votre sérénité constitue notre objectif principal.',
          icon: 'Star',
          stat: '98%',
          statLabel: 'clients satisfaits',
        },
        {
          title: 'Tarifs transparents',
          description:
            'Devis gratuit et détaillé sous 24h. Aucun frais caché, aucune surprise. Vous savez exactement ce que vous payez avant chaque intervention.',
          icon: 'BadgeDollarSign',
          stat: '0€',
          statLabel: 'frais cachés',
        },
      ],
    },
    servicesOverview: {
      heading: 'Nos prestations de nettoyage à Rouen',
      services: [
        {
          emoji: '🛋️',
          title: 'Restauration Canapés et Tissus d\'ameublement',
          description:
            'Révélez la beauté de vos textiles avec notre expertise rouennaise confirmée. Notre méthode exclusive élimine taches persistantes, allergènes et acariens en préservant l\'intégrité des matières. Transformation visible dès la première séance pour canapés, fauteuils et matelas.',
          slug: 'nettoyage-canape-rouen',
        },
        {
          emoji: '📦',
          title: 'Remise en État Après Déménagement',
          description:
            'Facilitez votre installation à Rouen. Nos équipes réalisent un nettoyage complet irréprochable sécurisant la restitution de votre dépôt de garantie. Sols, baies vitrées, surfaces, sanitaires - élimination totale des traces avec matériel professionnel spécialisé.',
          slug: 'nettoyage-apres-demenagement-rouen',
        },
        {
          emoji: '🏢',
          title: 'Entretien Bureaux et Espaces Professionnels',
          description:
            'Optimisez votre cadre de travail pour vos collaborateurs rouennais. Notre maîtrise de l\'entretien d\'espaces professionnels garantit des lieux impeccables stimulant performance et confort. Plannings souples, équipes qualifiées, efficacité immédiate.',
          slug: 'nettoyage-bureaux-rouen',
        },
        {
          emoji: '🏠',
          title: 'Traitement Syndrome de Diogène et Locaux Insalubres',
          description:
            'Pour les situations complexes, notre équipe rouennaise agit avec empathie et confidentialité. Spécialisés dans le syndrome de Diogène, nos techniciens emploient des méthodes éprouvées pour rétablir des espaces de vie salubres. Suivi individualisé en toute discrétion.',
          slug: 'nettoyage-diogene-rouen',
        },
      ],
    },
    zone: {
      heading: 'Secteur d\'intervention autour de Rouen',
      paragraph:
        'Nous opérons dans toute la métropole rouennaise et villes proches.',
      cities: ZONE_CITIES,
      paymentMethods: PAYMENT_METHODS,
    },
    about: {
      heading: 'ProClean, l\'excellence du nettoyage à Rouen',
      subtitle: 'Des espaces transformés, une propreté irréprochable',
      paragraph:
        'Implantés en Seine-Maritime, nous proposons des solutions de nettoyage sur mesure alliant techniques modernes et respect du patrimoine normand. Notre équipe de techniciens qualifiés intervient avec rigueur et discrétion pour sublimer vos espaces.',
      bulletPoints: [
        'Assurance qualité sur chaque intervention',
        'Large gamme de services pour tous les besoins',
        'Solutions sur-mesure adaptées à votre situation',
        'Sécurité & confidentialité garanties',
      ],
      counters: [
        { value: 5, suffix: '+', label: 'Années d\'expérience' },
        { value: 98, suffix: '%', label: 'Clients satisfaits' },
        { value: 530, suffix: '+', label: 'Interventions réalisées' },
      ],
    },
    testimonials: [
      {
        name: 'Steven A.',
        rating: 5,
        text: 'J\'ai fait appel à ProClean pour le nettoyage de mon appartement pour la remise des clés et je suis entièrement satisfait. Équipe très réactive, échanges simples et fluides, grande disponibilité et surtout un travail impeccable. L\'appartement était parfaitement propre. Je recommande ProClean sans hésitation !',
      },
      {
        name: 'Théo F.',
        rating: 5,
        text: 'Travail minutieux sur mon canapé qui était très taché, facture par mail, personne sérieuse et ponctuelle. Je ne peux que recommander ProClean ! Je n\'hésiterais pas à le recontacter dans le futur.',
      },
      {
        name: 'Emma G.',
        rating: 5,
        text: 'Mon canapé est redevenu comme neuf ! On m\'a même contacté 2-3 jours après pour savoir si le séchage c\'était bien passé et que les taches étaient bien parties. Entreprise très sérieuse, la personne qui est venue était très sympa. Je recommande.',
      },
      {
        name: 'Zen G.',
        rating: 5,
        text: 'J\'ai fait appel à ProClean pour le nettoyage de l\'appartement suite à un déménagement, et j\'ai été ravie. Le contact téléphonique est rapide, agréable, fluide. Les prix sont raisonnables. La prestation impeccable. Bref, que du positif !',
      },
    ],
    ctaMid: {
      heading: 'Prêt pour des locaux impeccables ? Planifiez votre nettoyage dès maintenant !',
      ctaText: 'Demander un devis',
      ctaHref: '/devis-gratuit-rouen',
    },
    servicesShowcase: {
      heading: 'Nos Services',
      subtitle: 'Des prestations complètes pour particuliers et professionnels',
      services: [
        {
          title: 'Nettoyage de Bureaux',
          description: 'Des espaces de travail impeccables pour le bien-être de vos collaborateurs.',
          icon: 'Briefcase',
          href: '/nettoyage-bureaux-rouen',
        },
        {
          title: 'Nettoyage Après Travaux',
          description: 'Remise en état complète de vos locaux après chantier ou rénovation.',
          icon: 'Hammer',
          href: '/nettoyage-apres-travaux-rouen',
        },
        {
          title: 'Entretien de Commerces',
          description: 'Un environnement propre et accueillant pour vos clients et visiteurs.',
          icon: 'Store',
          href: '/entretien-commerces-rouen',
        },
        {
          title: 'Débarras Maison',
          description: 'Évacuation, tri et nettoyage complet en toute discrétion.',
          icon: 'Home',
          href: '/debarras-maison-rouen',
        },
      ],
    },
    faq: [
      {
        question: 'Quels secteurs de Rouen desservez-vous ?',
        answer:
          'Nous couvrons l\'intégralité du territoire rouennais : centre historique, Rive Droite, Rive Gauche, Saint-Sever, Grammont, Darnétal, Saint-Clément, quartier Jardin des Plantes. Nos professionnels maîtrisent les particularités de chaque zone, des maisons à colombages du vieux Rouen aux immeubles contemporains des nouveaux quartiers.',
      },
      {
        question:
          'Vos produits préservent-ils le patrimoine architectural ?',
        answer:
          'Parfaitement. Nos agents de nettoyage sont rigoureusement choisis pour respecter les matériaux anciens. Sur les pierres et boiseries des demeures rouennaises, nous privilégions des solutions douces non agressives. Les tissus délicats reçoivent des soins enzymatiques spécialisés adaptés à l\'humidité de la vallée de Seine.',
      },
      {
        question:
          'Organisez-vous des contrats de maintenance pour les sociétés ?',
        answer:
          'Nos programmes "Propreté Pro Rouen" se calibrent selon vos espaces d\'activité. Abonnement trimestriel avec interventions hebdomadaires : revêtements, sanitaires, menuiseries, zones de travail. Les commerces du centre bénéficient de créneaux personnalisés. Package intégral avec approvisionnement produits et tri des déchets.',
      },
    ],
  },

  services: {
    'nettoyage-diogene-rouen': {
      slug: 'nettoyage-diogene-rouen',
      h1: 'Nettoyage syndrome de Diogène à Rouen : retrouvez votre dignité en toute confidentialité',
      subtitle: 'Experts en décontamination de logements insalubres dans toute la métropole rouennaise',
      metaTitle: 'Nettoyage Syndrome de Diogène Rouen | ProClean - Expert Décontamination',
      metaDescription: 'Nettoyage syndrome de Diogène à Rouen. Débarras, désinfection et décontamination de logements insalubres. Intervention confidentielle, devis gratuit sous 24h.',
      sections: [
        {
          heading: 'Qu\'est-ce que le syndrome de Diogène ?',
          headingLevel: 3,
          paragraphs: [
            'Le <strong>syndrome de Diogène</strong> se caractérise par plusieurs éléments majeurs. Contrairement aux idées reçues, ce syndrome touche tous les milieux sociaux à Rouen, des maisons à colombages du vieux Rouen aux appartements modernes de la Rive Gauche.',
          ],
          listItems: [
            'Une négligence extrême de l\'hygiène corporelle et domestique',
            'Une tendance pathologique à l\'<strong>accumulation d\'objets</strong> inutiles (syllogomanie)',
            'Une absence de conscience du trouble',
            'Une rupture avec les normes sociales',
            'Un isolement profond',
          ],
        },
        {
          heading: 'ProClean, votre entreprise de nettoyage syndrome de Diogène à Rouen',
          headingLevel: 3,
          paragraphs: [
            'La société <strong>ProClean</strong> est à votre service lorsque vous êtes confronté au syndrome de Diogène à Rouen. Nous proposons le débarras et nettoyage après syndrome de Diogène dans toute la métropole rouennaise avec une équipe de professionnels qualifiés.',
            'ProClean est une entreprise spécialisée en nettoyage de syndrome de Diogène à Rouen qui vous propose un <strong>service global</strong> : tri des affaires, évacuation des déchets, débarras de mobilier, désinfection et nettoyage syndrome de Diogène. Notre équipe assure aussi le <a href="/debarras-maison-rouen">débarras de maison à Rouen</a> dans les situations d\'encombrement sévère.',
          ],
        },
        {
          heading: 'Comment détecter un syndrome de Diogène à Rouen ?',
          headingLevel: 2,
          paragraphs: [
            'Le syndrome de Diogène est généralement découvert à l\'insu de la personne concernée qui essaie de nier et dissimuler son problème. Il est souvent suspecté par le voisinage rouennais. Après notre intervention, un <a href="/nettoyage-appartement-rouen">nettoyage d\'appartement complet</a> finalise la remise en état.',
          ],
          listItems: [
            'Comportement inhabituel de la personne atteinte',
            'Personnes renfermées et isolées, fuyant le contact',
            'Négligence de l\'hygiène corporelle',
            'Mauvaises odeurs émanant du logement',
            'Présence inhabituelle d\'insectes',
          ],
        },
        {
          heading: 'Désinfection et décontamination après syndrome de Diogène',
          headingLevel: 3,
          paragraphs: [
            'La prolifération bactérienne en milieu humide rouennais nécessite une <strong>désinfection renforcée</strong>. Pour les cas de nettoyage après décès syndrome de Diogène, élimination des fluides corporels selon normes DASRI avec certificat de désinfection. Pour planifier votre intervention confidentielle, demandez une <a href="/devis-gratuit-rouen">estimation gratuite et sans engagement</a>.',
          ],
          listItems: [
            'Désinfection par voie aérienne (fumigène)',
            'Nettoyage minutieux de toutes surfaces',
            'Traitement anti-moisissures spécifique au climat de Seine',
          ],
        },
      ],
      pricing: [
        { label: 'Studio/T1 syndrome de Diogène léger', price: '900€ - 1.400€' },
        { label: 'Appartement T2/T3 syndrome de Diogène modéré', price: '1.400€ - 2.600€' },
        { label: 'Appartement T4+ syndrome de Diogène sévère', price: '2.600€ - 4.200€' },
        { label: 'Situations extrêmes avec décès', price: '4.200€ - 8.500€' },
      ],
      zone: {
        paragraph: 'Nous opérons pour le nettoyage syndrome de Diogène dans toute la métropole.',
        cities: ZONE_CITIES,
        paymentMethods: PAYMENT_METHODS,
      },
      faq: [
        { question: 'Quels sont les signes précurseurs du syndrome de Diogène à identifier ?', answer: 'Isolement social, négligence hygiène, accumulation objets, odeurs persistantes du logement, refus de laisser entrer autrui, comportement inhabituel. Souvent découvert par voisinage ou lors d\'intervention technique.' },
        { question: 'Comment gérer l\'humidité spécifique à la vallée de Seine dans ces logements ?', answer: 'L\'humidité rouennaise aggrave moisissures et prolifération bactérienne. Nous utilisons déshumidificateurs industriels, traitements anti-fongiques renforcés et désinfection prolongée adaptée au climat fluvial.' },
        { question: 'Intervenez-vous dans le patrimoine historique rouennais ?', answer: 'Oui, expérience confirmée dans maisons à colombages et bâtiments anciens. Respect des contraintes architecturales, produits adaptés aux matériaux historiques, coordination avec ABF si nécessaire.' },
        { question: 'Quelle est la durée d\'intervention pour un syndrome de Diogène à Rouen ?', answer: '1-2 jours pour cas légers, 3-7 jours pour situations complexes. Dépend encombrement, insalubrité, accessibilité. Planning adapté aux contraintes du logement et de l\'occupant.' },
        { question: 'Proposez-vous un accompagnement avec les services sociaux rouennais ?', answer: 'Coordination possible avec métropole Rouen Normandie, CCAS, services départementaux. Accompagnement dans démarches administratives, orientation vers structures d\'aide appropriées.' },
        { question: 'Comment assurez-vous la discrétion dans les quartiers rouennais ?', answer: 'Véhicules banalisés, interventions discrètes, équipes réduites. Respect total intimité, aucune information divulguée. Adaptation horaires selon quartier et sensibilité situation.' },
      ],
      relatedSlugs: ['debarras-maison-rouen', 'nettoyage-appartement-rouen', 'nettoyage-apres-travaux-rouen'],
    },

    'nettoyage-apres-travaux-rouen': {
      slug: 'nettoyage-apres-travaux-rouen',
      h1: 'Nettoyage après travaux à Rouen : révélez l\'éclat de vos espaces transformés',
      subtitle: 'Société de nettoyage de fin de chantier et ménage après travaux dans toute la métropole rouennaise',
      metaTitle: 'Nettoyage Après Travaux Rouen | ProClean - Fin de Chantier Expert',
      metaDescription: 'Nettoyage après travaux à Rouen. Remise en état complète de locaux après chantier, respect du patrimoine. Devis gratuit sous 24h.',
      sections: [],
      pricing: [
        { label: 'Appartement standard après travaux', price: '9€ - 14€/m²' },
        { label: 'Logement patrimonial après rénovation', price: '15€ - 22€/m²' },
        { label: 'Maison à colombages', price: '18€ - 28€/m²' },
        { label: 'Locaux commerciaux centre historique', price: '12€ - 18€/m²' },
      ],
      zone: { paragraph: 'Nous opérons pour le nettoyage de fin de chantier dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Comment traitez-vous les matériaux anciens des bâtiments rouennais ?', answer: 'Produits spécialisés non abrasifs pour pierre, bois anciens. Techniques douces respectant colombages, enduits traditionnels. Séchage contrôlé adapté à l\'humidité de la vallée de Seine.' },
        { question: 'Intervenez-vous dans les monuments historiques de Rouen ?', answer: 'Oui, expérience confirmée dans bâtiments classés. Respect contraintes ABF, produits agréés patrimoine. Coordination avec architectes des monuments historiques si nécessaire.' },
        { question: 'Proposez-vous des interventions urgentes à Rouen ?', answer: 'Service d\'urgence sous 24-48h disponible. Mobilisation rapide pour livraisons importantes. Supplément 20% interventions express.' },
      ],
      relatedSlugs: ['nettoyage-appartement-rouen', 'nettoyage-vitres-rouen', 'nettoyage-apres-demenagement-rouen'],
    },

    'nettoyage-lustre-rouen': {
      slug: 'nettoyage-lustre-rouen',
      h1: 'Nettoyage Lustres et Luminaires Rouen - ProClean',
      subtitle: 'Expert Nettoyage de Lustres et Luminaires à Rouen',
      metaTitle: 'Nettoyage Lustres et Luminaires Rouen | ProClean - Expert Éclairage',
      metaDescription: 'Nettoyage professionnel de lustres et luminaires à Rouen. Cristal, bronze, verre soufflé. Intervention sécurisée, devis gratuit.',
      sections: [],
      pricing: [
        { label: 'Lustre classique (5-10 branches)', price: '115€ - 175€' },
        { label: 'Lustre élaboré (10-20 branches)', price: '175€ - 270€' },
        { label: 'Lustre exceptionnel (>20 branches)', price: '270€ - 430€' },
        { label: 'Suspension contemporaine', price: '75€ - 135€' },
        { label: 'Appliques murales (paire)', price: '55€ - 95€' },
      ],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de lustres dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quelle est la fréquence idéale pour le nettoyage de lustres à Rouen ?', answer: 'Semestrielle pour les luminaires en centre historique, annuelle pour les quartiers résidentiels. Les lustres en cristal nécessitent une attention particulière.' },
        { question: 'ProClean peut-il intervenir sur des lustres anciens et fragiles ?', answer: 'Absolument, le nettoyage de pièces patrimoniales constitue notre spécialité. Nos techniciens sont formés aux techniques de conservation adaptées au patrimoine rouennais.' },
      ],
      relatedSlugs: ['nettoyage-appartement-rouen', 'nettoyage-vitres-rouen', 'nettoyage-apres-travaux-rouen'],
    },

    'nettoyage-apres-demenagement-rouen': {
      slug: 'nettoyage-apres-demenagement-rouen',
      h1: 'Nettoyage Après Déménagement et Fin de Bail à Rouen',
      subtitle: 'Expert nettoyage après déménagement et fin de bail dans toute la métropole rouennaise',
      metaTitle: 'Nettoyage Après Déménagement Rouen | ProClean - Fin de Bail Expert',
      metaDescription: 'Nettoyage après déménagement à Rouen. Récupérez votre caution avec un état des lieux impeccable. Devis gratuit sous 24h.',
      sections: [],
      pricing: [
        { label: 'Studio 20-30m²', price: '175€ - 245€' },
        { label: 'T2 30-50m²', price: '245€ - 340€' },
        { label: 'T3 50-70m²', price: '340€ - 470€' },
        { label: 'T4 70-90m²', price: '470€ - 630€' },
        { label: 'T5 et plus 90-120m²', price: '630€ - 820€' },
        { label: 'Maison individuelle 100-150m²', price: '720€ - 1.150€' },
      ],
      zone: { paragraph: 'Nous intervenons pour le nettoyage après déménagement dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quel délai prévoir pour un nettoyage après déménagement à Rouen ?', answer: 'Pour un T3 standard, comptez 6 à 8 heures. Planifiez l\'intervention 48 à 72h avant l\'état des lieux.' },
        { question: 'Proposez-vous une garantie sur la récupération de caution ?', answer: 'Reprise gratuite sous 48h si l\'état des lieux révèle des défauts imputables à notre intervention.' },
      ],
      relatedSlugs: ['nettoyage-appartement-rouen', 'nettoyage-apres-travaux-rouen', 'nettoyage-vitres-rouen'],
    },

    'debarras-maison-rouen': {
      slug: 'debarras-maison-rouen',
      h1: 'Débarras de Maison à Rouen - ProClean',
      subtitle: 'Expert débarras de maison et locaux professionnels dans toute la métropole rouennaise',
      metaTitle: 'Débarras Maison Rouen | ProClean - Débarras Complet Expert',
      metaDescription: 'Débarras de maison à Rouen. Évacuation complète, tri sélectif, nettoyage après débarras. Devis gratuit sous 24h.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le débarras dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quels types de biens débarrassez-vous ?', answer: 'Maisons, appartements, caves, greniers, garages, locaux commerciaux, bureaux et entrepôts dans toute la métropole rouennaise.' },
      ],
      relatedSlugs: ['nettoyage-diogene-rouen', 'nettoyage-appartement-rouen', 'nettoyage-apres-demenagement-rouen'],
    },

    'nettoyage-appartement-rouen': {
      slug: 'nettoyage-appartement-rouen',
      h1: 'Nettoyage d\'Appartements et Maisons à Rouen',
      subtitle: 'Excellence et proximité en Seine-Maritime pour l\'entretien résidentiel',
      metaTitle: 'Nettoyage Appartement Maison Rouen | ProClean - Ménage Professionnel',
      metaDescription: 'Nettoyage professionnel d\'appartements et maisons à Rouen. Ménage régulier, grand nettoyage, état des lieux. Devis gratuit sous 24h.',
      sections: [],
      pricing: [
        { label: 'Studio/T1 ménage régulier', price: 'à partir de 28€/séance' },
        { label: 'T2 ménage régulier', price: 'à partir de 38€/séance' },
        { label: 'T3 ménage régulier', price: 'à partir de 48€/séance' },
        { label: 'Grand ménage T1/T2', price: '130€ - 190€' },
        { label: 'Grand ménage T3/T4', price: '190€ - 270€' },
        { label: 'Grand ménage Maison 100-150m²', price: '270€ - 380€' },
      ],
      zone: { paragraph: 'Nous intervenons sur l\'ensemble de la métropole rouennaise et ses communes associées.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quel est le coût moyen d\'un nettoyage complet d\'appartement à Rouen ?', answer: 'Pour un T3 standard de 70m², comptez entre 48€ pour un ménage régulier et 190€ pour un grand nettoyage de printemps.' },
        { question: 'Proposez-vous des services adaptés aux logements anciens du centre historique ?', answer: 'Absolument ! Nos équipes sont formées aux matériaux anciens : colombages, tomettes, parquets classés. Produits et techniques respectueux du patrimoine.' },
        { question: 'Comment gérez-vous l\'humidité des logements rouennais ?', answer: 'Produits anti-humidité préventifs, techniques de séchage accéléré, traitement curatif des zones affectées, conseils personnalisés pour l\'aération.' },
      ],
      relatedSlugs: ['nettoyage-apres-demenagement-rouen', 'nettoyage-apres-travaux-rouen', 'nettoyage-vitres-rouen'],
    },

    'nettoyage-voiture-rouen': {
      slug: 'nettoyage-voiture-rouen',
      h1: 'Nettoyage Intérieur Voiture à Rouen - ProClean',
      subtitle: 'Expert nettoyage et désinfection de l\'intérieur de véhicules à Rouen',
      metaTitle: 'Nettoyage Intérieur Voiture Rouen | ProClean - Détailing Auto Expert',
      metaDescription: 'Nettoyage intérieur voiture à Rouen. Sièges, moquettes, tableaux de bord, désinfection complète. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage intérieur de voitures dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Combien coûte un nettoyage intérieur de voiture à Rouen ?', answer: 'Nos tarifs varient selon le type de véhicule et le niveau de nettoyage souhaité. Contactez-nous pour un devis personnalisé.' },
      ],
      relatedSlugs: ['nettoyage-canape-rouen', 'nettoyage-tapis-rouen', 'nettoyage-moquette-rouen'],
    },

    'nettoyage-terrasse-rouen': {
      slug: 'nettoyage-terrasse-rouen',
      h1: 'Nettoyage Balcon et Terrasse à Rouen - ProClean',
      subtitle: 'Excellence mobile au cœur de la Normandie pour l\'entretien de vos espaces extérieurs',
      metaTitle: 'Nettoyage Terrasse Balcon Rouen | ProClean - Haute Pression Expert',
      metaDescription: 'Nettoyage terrasse et balcon à Rouen. Décapage haute pression, traitement anti-mousse, protection longue durée. Devis gratuit.',
      sections: [],
      pricing: [
        { label: 'Balcon jusqu\'à 5m²', price: '35€' },
        { label: 'Balcon 6-10m²', price: '55€' },
        { label: 'Balcon 11-20m²', price: '85€' },
        { label: 'Terrasse jusqu\'à 15m²', price: '75€' },
        { label: 'Terrasse 16-30m²', price: '125€' },
        { label: 'Terrasse 31-50m²', price: '185€' },
      ],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de terrasses et balcons dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quel est le prix d\'un nettoyage de terrasse à Rouen ?', answer: 'De 75€ (15m²) à 185€ (50m²) selon surface. Traitements spécifiques +25-45€. Aucun frais de déplacement.' },
        { question: 'Traitez-vous l\'humidité et les mousses ?', answer: 'Expertise spécialisée climat Seine, produits anti-humidité longue durée. Élimination définitive mousses et lichens.' },
      ],
      relatedSlugs: ['nettoyage-toiture-rouen', 'nettoyage-vitres-rouen', 'nettoyage-appartement-rouen'],
    },

    'nettoyage-bureaux-rouen': {
      slug: 'nettoyage-bureaux-rouen',
      h1: 'Nettoyage de Bureaux à Rouen - ProClean',
      subtitle: 'Excellence métropolitaine normande pour l\'entretien professionnel d\'espaces de travail',
      metaTitle: 'Nettoyage Bureaux Rouen | ProClean - Entretien Professionnel Expert',
      metaDescription: 'Nettoyage de bureaux à Rouen. Entretien quotidien, hebdomadaire ou mensuel. Espaces de travail impeccables. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de bureaux dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Proposez-vous des contrats d\'entretien régulier ?', answer: 'Oui, nous proposons des contrats quotidiens, hebdomadaires ou mensuels adaptés à vos besoins et horaires.' },
      ],
      relatedSlugs: ['entretien-commerces-rouen', 'nettoyage-vitres-rouen', 'nettoyage-moquette-rouen'],
    },

    'entretien-commerces-rouen': {
      slug: 'entretien-commerces-rouen',
      h1: 'Entretien de Commerces à Rouen - ProClean',
      subtitle: 'Nettoyage professionnel de boutiques et surfaces commerciales à Rouen',
      metaTitle: 'Entretien Commerces Rouen | ProClean - Nettoyage Boutiques Expert',
      metaDescription: 'Entretien de commerces à Rouen. Nettoyage régulier de boutiques, magasins et surfaces commerciales. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour l\'entretien de commerces dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Intervenez-vous en dehors des heures d\'ouverture ?', answer: 'Oui, nous planifions les interventions selon vos horaires commerciaux pour ne pas perturber votre activité.' },
      ],
      relatedSlugs: ['nettoyage-bureaux-rouen', 'nettoyage-vitres-rouen', 'entretien-immeubles-rouen'],
    },

    'nettoyage-parking-rouen': {
      slug: 'nettoyage-parking-rouen',
      h1: 'Nettoyage de Parking à Rouen - ProClean',
      subtitle: 'Entretien professionnel de parkings souterrains et extérieurs à Rouen',
      metaTitle: 'Nettoyage Parking Rouen | ProClean - Entretien Parking Expert',
      metaDescription: 'Nettoyage de parking à Rouen. Balayage, lavage, désinfection de parkings souterrains et extérieurs. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de parkings dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Nettoyez-vous les parkings souterrains ?', answer: 'Oui, nous intervenons dans tous types de parkings : souterrains, couverts et extérieurs, avec du matériel adapté.' },
      ],
      relatedSlugs: ['entretien-immeubles-rouen', 'nettoyage-bureaux-rouen', 'entretien-commerces-rouen'],
    },

    'entretien-immeubles-rouen': {
      slug: 'entretien-immeubles-rouen',
      h1: 'Entretien d\'Immeubles à Rouen - ProClean',
      subtitle: 'Nettoyage des parties communes d\'immeubles et copropriétés à Rouen',
      metaTitle: 'Entretien Immeubles Rouen | ProClean - Parties Communes Expert',
      metaDescription: 'Entretien d\'immeubles à Rouen. Nettoyage parties communes, cages d\'escalier, halls d\'entrée. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour l\'entretien d\'immeubles dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Proposez-vous des contrats pour les copropriétés ?', answer: 'Oui, nous proposons des contrats réguliers adaptés aux besoins des copropriétés rouennaises.' },
      ],
      relatedSlugs: ['nettoyage-parking-rouen', 'nettoyage-bureaux-rouen', 'nettoyage-vitres-rouen'],
    },

    'nettoyage-distributeurs-rouen': {
      slug: 'nettoyage-distributeurs-rouen',
      h1: 'Nettoyage Équipements Libre-Service à Rouen - ProClean',
      subtitle: 'Nettoyage et désinfection de distributeurs automatiques et bornes à Rouen',
      metaTitle: 'Nettoyage Distributeurs Rouen | ProClean - Équipements Libre-Service',
      metaDescription: 'Nettoyage d\'équipements libre-service à Rouen. Distributeurs, bornes, laveries automatiques. Désinfection professionnelle. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage d\'équipements libre-service dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quels types d\'équipements nettoyez-vous ?', answer: 'Distributeurs automatiques, bornes de paiement, laveries automatiques, et tout équipement en libre-service.' },
      ],
      relatedSlugs: ['entretien-commerces-rouen', 'nettoyage-bureaux-rouen', 'entretien-immeubles-rouen'],
    },

    'nettoyage-camion-rouen': {
      slug: 'nettoyage-camion-rouen',
      h1: 'Nettoyage Cabine Poids Lourds à Rouen - ProClean',
      subtitle: 'Nettoyage intérieur et désinfection de cabines de poids lourds à Rouen',
      metaTitle: 'Nettoyage Cabine Poids Lourds Rouen | ProClean - Nettoyage Camion Expert',
      metaDescription: 'Nettoyage cabine poids lourds à Rouen. Intérieur, sièges, tableau de bord, désinfection complète. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de cabines de poids lourds dans toute la métropole.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Intervenez-vous sur les flottes de véhicules ?', answer: 'Oui, nous proposons des contrats d\'entretien pour les flottes de poids lourds avec tarifs dégressifs.' },
      ],
      relatedSlugs: ['nettoyage-voiture-rouen', 'nettoyage-bureaux-rouen', 'entretien-commerces-rouen'],
    },

    'nettoyage-canape-rouen': {
      slug: 'nettoyage-canape-rouen',
      h1: 'Nettoyage de Canapés à Rouen - ProClean',
      subtitle: 'Expert en rénovation et nettoyage professionnel de canapés et fauteuils à Rouen',
      metaTitle: 'Nettoyage Canapé Rouen | ProClean - Rénovation Tissus Expert',
      metaDescription: 'Nettoyage de canapés à Rouen. Détachage, désinfection, rénovation de canapés, fauteuils et tissus d\'ameublement. Devis gratuit sous 24h.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de canapés dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quels types de canapés nettoyez-vous ?', answer: 'Tous types : tissu, cuir, microfibre, velours, alcantara. Nos techniques s\'adaptent à chaque matière pour un résultat optimal.' },
      ],
      relatedSlugs: ['nettoyage-tapis-rouen', 'nettoyage-matelas-rouen', 'nettoyage-moquette-rouen'],
    },

    'nettoyage-tapis-rouen': {
      slug: 'nettoyage-tapis-rouen',
      h1: 'Nettoyage de Tapis à Rouen - ProClean',
      subtitle: 'Nettoyage en profondeur et traitement anti-acariens de tapis à Rouen',
      metaTitle: 'Nettoyage Tapis Rouen | ProClean - Nettoyage Tapis Expert',
      metaDescription: 'Nettoyage de tapis à Rouen. Shampooing, détachage, traitement anti-acariens pour tous types de tapis. Devis gratuit sous 24h.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de tapis dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Nettoyez-vous les tapis orientaux et précieux ?', answer: 'Oui, nous maîtrisons les techniques adaptées aux tapis orientaux, persans et précieux avec des produits respectueux des fibres naturelles.' },
      ],
      relatedSlugs: ['nettoyage-canape-rouen', 'nettoyage-moquette-rouen', 'nettoyage-matelas-rouen'],
    },

    'nettoyage-moquette-rouen': {
      slug: 'nettoyage-moquette-rouen',
      h1: 'Nettoyage de Moquette à Rouen - ProClean',
      subtitle: 'Shampooing et injection-extraction professionnelle de moquettes à Rouen',
      metaTitle: 'Nettoyage Moquette Rouen | ProClean - Shampooing Moquette Expert',
      metaDescription: 'Nettoyage de moquette à Rouen. Injection-extraction, shampooing professionnel, traitement anti-acariens. Devis gratuit sous 24h.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de moquettes dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quelle technique utilisez-vous pour les moquettes ?', answer: 'Injection-extraction à l\'eau chaude avec shampooing professionnel. Séchage rapide en 4-6h.' },
      ],
      relatedSlugs: ['nettoyage-tapis-rouen', 'nettoyage-canape-rouen', 'nettoyage-bureaux-rouen'],
    },

    'nettoyage-matelas-rouen': {
      slug: 'nettoyage-matelas-rouen',
      h1: 'Nettoyage de Matelas à Rouen - ProClean',
      subtitle: 'Désinfection et nettoyage professionnel de matelas à Rouen',
      metaTitle: 'Nettoyage Matelas Rouen | ProClean - Désinfection Matelas Expert',
      metaDescription: 'Nettoyage de matelas à Rouen. Élimination acariens, allergènes, taches. Désinfection en profondeur. Devis gratuit sous 24h.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de matelas dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Le nettoyage de matelas élimine-t-il les acariens ?', answer: 'Oui, notre traitement professionnel élimine 99% des acariens et allergènes, idéal pour les personnes asthmatiques ou allergiques.' },
      ],
      relatedSlugs: ['nettoyage-canape-rouen', 'nettoyage-tapis-rouen', 'nettoyage-appartement-rouen'],
    },

    'nettoyage-vitres-rouen': {
      slug: 'nettoyage-vitres-rouen',
      h1: 'Nettoyage de Vitres à Rouen - ProClean',
      subtitle: 'Lavage professionnel de vitres et baies vitrées à Rouen',
      metaTitle: 'Nettoyage Vitres Rouen | ProClean - Lavage Vitres Expert',
      metaDescription: 'Nettoyage de vitres à Rouen. Vitres, baies vitrées, vérandas pour particuliers et professionnels. Résultat sans traces. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de vitres dans toute la métropole rouennaise.', cities: ZONE_CITIES, paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Nettoyez-vous les vitres en hauteur ?', answer: 'Oui, nous disposons d\'équipements professionnels (perches télescopiques, nacelles) pour nettoyer les vitres en hauteur en toute sécurité.' },
      ],
      relatedSlugs: ['nettoyage-appartement-rouen', 'nettoyage-bureaux-rouen', 'nettoyage-lustre-rouen'],
    },

    'nettoyage-toiture-rouen': {
      slug: 'nettoyage-toiture-rouen',
      h1: 'Nettoyage Toiture, Façade et Gouttières à Rouen - ProClean',
      subtitle: 'Expert démoussage, traitement hydrofuge et nettoyage de façades en Seine-Maritime',
      metaTitle: 'Nettoyage Toiture Façade Rouen | ProClean - Démoussage Expert Normandie',
      metaDescription: 'Nettoyage toiture, façade et gouttières à Rouen. Démoussage basse pression, traitement hydrofuge, entretien gouttières. Devis gratuit.',
      sections: [],
      zone: { paragraph: 'Nous intervenons pour le nettoyage de toitures et façades dans toute la métropole rouennaise et la Seine-Maritime.', cities: [...ZONE_CITIES, 'Petit-Couronne', 'Grand-Couronne', 'Bonsecours', 'Franqueville-Saint-Pierre', 'Barentin', 'Elbeuf'], paymentMethods: PAYMENT_METHODS },
      faq: [
        { question: 'Quelle technique utilisez-vous pour les toitures ?', answer: 'Nettoyage basse pression respectueux des matériaux, suivi d\'un traitement hydrofuge pour une protection durable.' },
        { question: 'Proposez-vous le nettoyage de gouttières ?', answer: 'Oui, débouchage et nettoyage complet des gouttières avec test d\'écoulement. Service indispensable pour prévenir les infiltrations.' },
      ],
      relatedSlugs: ['nettoyage-terrasse-rouen', 'nettoyage-vitres-rouen', 'nettoyage-apres-travaux-rouen'],
    },
  },

  categories: {
    particuliers: {
      h1: 'Nettoyage pour Particuliers à Rouen',
      subtitle: 'Services de nettoyage professionnel adaptés aux besoins des particuliers rouennais',
      metaTitle: 'Nettoyage Particuliers Rouen | ProClean - Services à Domicile',
      metaDescription: 'Services de nettoyage professionnel pour particuliers à Rouen. Appartements, maisons, après déménagement, syndrome de Diogène. Devis gratuit sous 24h.',
      introText: 'ProClean accompagne les particuliers rouennais avec des services de nettoyage professionnel complets. De l\'entretien régulier de votre appartement au nettoyage après déménagement, en passant par les situations complexes comme le syndrome de Diogène, nos équipes interviennent avec professionnalisme et discrétion dans toute la métropole rouennaise. Chaque prestation est réalisée avec du matériel professionnel et des produits adaptés au patrimoine architectural normand.',
    },
    professionnels: {
      h1: 'Nettoyage pour Professionnels à Rouen',
      subtitle: 'Solutions d\'entretien sur mesure pour bureaux, commerces et locaux professionnels',
      metaTitle: 'Nettoyage Professionnels Rouen | ProClean - Entretien Entreprises',
      metaDescription: 'Services de nettoyage professionnel pour entreprises à Rouen. Bureaux, commerces, immeubles, parkings. Contrats sur mesure, devis gratuit sous 24h.',
      introText: 'ProClean propose aux professionnels rouennais des solutions d\'entretien sur mesure. Bureaux, commerces, immeubles ou parkings : nos équipes qualifiées garantissent des espaces de travail impeccables. Contrats flexibles adaptés à vos horaires et besoins spécifiques, interventions en dehors des heures d\'ouverture possibles. Faites confiance à notre expertise pour valoriser l\'image de votre entreprise.',
    },
    tissus: {
      h1: 'Nettoyage Tissus & Ameublement à Rouen',
      subtitle: 'Expert en nettoyage de canapés, tapis, moquettes et matelas à Rouen',
      metaTitle: 'Nettoyage Tissus Ameublement Rouen | ProClean - Expert Textile',
      metaDescription: 'Nettoyage professionnel de tissus d\'ameublement à Rouen. Canapés, tapis, moquettes, matelas. Techniques douces, résultats garantis. Devis gratuit sous 24h.',
      introText: 'ProClean est votre expert en nettoyage de tissus d\'ameublement à Rouen. Canapés, tapis, moquettes et matelas retrouvent leur éclat grâce à nos techniques professionnelles d\'injection-extraction et de traitement enzymatique. Nos méthodes respectent les fibres tout en éliminant taches, acariens et allergènes. Idéal pour les personnes sensibles et les familles avec enfants.',
    },
  },
};

// Inject auto-generated content sections from rouen-sections.ts
for (const slug of Object.keys(rouenContent.services)) {
  const svc = rouenContent.services[slug];
  if (svc.sections.length === 0 && serviceSections[slug]) {
    svc.sections = serviceSections[slug];
  }
}
