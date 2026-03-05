import type { NavigationConfig } from '@/types';

export const navigation: NavigationConfig = {
  mainMenu: [
    { label: 'Devis', href: '/devis-gratuit-rouen' },
    { label: 'Vitres', href: '/nettoyage-vitres-rouen' },
    { label: 'Toiture', href: '/nettoyage-toiture-rouen' },
    {
      label: 'Tissus',
      href: '/nettoyage-tissus-ameublement',
      children: [
        { label: 'Canapés', href: '/nettoyage-canape-rouen' },
        { label: 'Tapis', href: '/nettoyage-tapis-rouen' },
        { label: 'Moquette', href: '/nettoyage-moquette-rouen' },
        { label: 'Matelas', href: '/nettoyage-matelas-rouen' },
      ],
    },
    {
      label: 'Particuliers',
      href: '/particuliers',
      children: [
        { label: 'Syndrome de Diogène', href: '/nettoyage-diogene-rouen' },
        { label: 'Après travaux', href: '/nettoyage-apres-travaux-rouen' },
        { label: 'Après déménagement', href: '/nettoyage-apres-demenagement-rouen' },
        { label: 'Lustres & luminaires', href: '/nettoyage-lustre-rouen' },
        { label: 'Débarras maison', href: '/debarras-maison-rouen' },
        { label: 'Appartement/maison', href: '/nettoyage-appartement-rouen' },
        { label: 'Intérieur voiture', href: '/nettoyage-voiture-rouen' },
        { label: 'Terrasse/balcon', href: '/nettoyage-terrasse-rouen' },
      ],
    },
    {
      label: 'Professionnels',
      href: '/professionnels',
      children: [
        { label: 'Bureaux', href: '/nettoyage-bureaux-rouen' },
        { label: 'Commerces', href: '/entretien-commerces-rouen' },
        { label: 'Parkings', href: '/nettoyage-parking-rouen' },
        { label: 'Immeubles', href: '/entretien-immeubles-rouen' },
        { label: 'Équipements libre-service', href: '/nettoyage-distributeurs-rouen' },
        { label: 'Cabines poids lourds', href: '/nettoyage-camion-rouen' },
      ],
    },
  ],
  ctaButton: {
    label: 'Devis Gratuit',
    href: '/devis-gratuit-rouen',
  },
};
