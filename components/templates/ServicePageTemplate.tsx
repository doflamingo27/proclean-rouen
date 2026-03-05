import Link from 'next/link';
import type { ServicePageTemplateProps } from '@/types';

import ServiceSchema from '@/components/schema/ServiceSchema';
import LocalBusinessSchema from '@/components/schema/LocalBusinessSchema';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';
import FAQSchema from '@/components/schema/FAQSchema';

import HeroSection from '@/components/sections/HeroSection';
import ContentSections from '@/components/sections/ContentSections';
import PricingSection from '@/components/sections/PricingSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import FAQSection from '@/components/sections/FAQSection';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import CTASection from '@/components/sections/CTASection';
import ZoneInterventionSection from '@/components/sections/ZoneInterventionSection';

const categoryLabels: Record<string, string> = {
  particuliers: 'Particuliers',
  professionnels: 'Professionnels',
  tissus: 'Tissus & Ameublement',
};

const categoryPaths: Record<string, string> = {
  particuliers: '/particuliers',
  professionnels: '/professionnels',
  tissus: '/nettoyage-tissus-ameublement',
};

const whyUsItems = [
  {
    title: 'Expertise certifiée',
    description:
      'Techniciens qualifiés avec matériel professionnel de dernière génération. Résultats garantis sur chaque intervention.',
    icon: 'Shield',
  },
  {
    title: 'Devis gratuit sous 24h',
    description:
      'Réponse rapide et intervention sur toute la métropole rouennaise. Disponibilité assurée, urgences prises en charge.',
    icon: 'Clock',
  },
  {
    title: 'Satisfaction garantie',
    description:
      'Contrôle qualité systématique et reprise gratuite si nécessaire. Votre sérénité est notre priorité.',
    icon: 'Star',
  },
];

export default function ServicePageTemplate({
  service,
  content,
  relatedServices,
}: ServicePageTemplateProps) {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    {
      label: categoryLabels[service.category] || service.category,
      href: categoryPaths[service.category] || '/',
    },
    { label: service.title, href: `/${service.slug}` },
  ];

  return (
    <article>
      {/* JSON-LD Schemas */}
      <ServiceSchema
        serviceName={service.title}
        description={content.metaDescription}
        slug={service.slug}
      />
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      {content.faq.length > 0 && <FAQSchema items={content.faq} />}

      {/* Hero avec image */}
      <HeroSection
        title={content.h1}
        subtitle={content.subtitle || service.shortDescription}
        variant="service"
        heroImage={service.heroImage}
      />

      {/* Breadcrumb visuel + badge catégorie */}
      <nav
        className="bg-gray-bg dark:bg-dark-bg-secondary border-b border-gray-border/50 dark:border-gray-border/10"
        aria-label="Fil d'Ariane"
      >
        <div className="container-main py-3 flex items-center gap-2 text-sm text-gray-text dark:text-dark-text-secondary overflow-x-auto">
          {breadcrumbItems.map((item, idx) => (
            <span key={item.href} className="flex items-center gap-2 whitespace-nowrap">
              {idx > 0 && (
                <span aria-hidden="true" className="text-gray-border">
                  /
                </span>
              )}
              {idx === breadcrumbItems.length - 1 ? (
                <span className="text-navy dark:text-dark-text font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-proclean-blue transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </span>
          ))}
          <span className="ml-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-proclean-blue/10 text-proclean-blue dark:bg-proclean-blue/20">
              {categoryLabels[service.category] || service.category}
            </span>
          </span>
        </div>
      </nav>

      {/* Contenu principal */}
      {content.sections.length > 0 && (
        <ContentSections
          sections={content.sections}
          contentImage={service.contentImage}
          contentImageAlt={`${service.title} à Rouen - ProClean`}
        />
      )}

      {/* Tarifs */}
      {content.pricing && content.pricing.length > 0 && (
        <PricingSection items={content.pricing} />
      )}

      {/* Pourquoi ProClean */}
      <WhyUsSection heading="Pourquoi choisir ProClean ?" items={whyUsItems} />

      {/* FAQ */}
      {content.faq.length > 0 && (
        <FAQSection heading="Questions fréquentes" items={content.faq} />
      )}

      {/* Services liés */}
      <RelatedServicesSection services={relatedServices} />

      {/* CTA */}
      <CTASection />

      {/* Zone d'intervention */}
      <ZoneInterventionSection
        paragraph={content.zone.paragraph}
        cities={content.zone.cities}
        paymentMethods={content.zone.paymentMethods}
      />
    </article>
  );
}
