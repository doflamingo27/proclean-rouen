import { generatePageMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';
import ContactForm from '@/components/forms/ContactForm';

export const metadata = generatePageMetadata({
  title: 'Devis Gratuit Nettoyage Rouen | ProClean',
  description:
    'Demandez votre devis gratuit pour tous nos services de nettoyage à Rouen. Réponse sous 24h, sans engagement.',
  path: '/devis-gratuit-rouen',
});

export default function DevisPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Devis Gratuit', href: '/devis-gratuit-rouen' },
        ]}
      />
      <ContactForm />
    </>
  );
}
