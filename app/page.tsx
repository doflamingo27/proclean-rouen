import { rouenContent } from '@/content/rouen';
import { generatePageMetadata } from '@/lib/seo';
import LocalBusinessSchema from '@/components/schema/LocalBusinessSchema';
import OrganizationSchema from '@/components/schema/OrganizationSchema';
import FAQSchema from '@/components/schema/FAQSchema';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import CTAMidSection from '@/components/sections/CTAMidSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import ZoneInterventionSection from '@/components/sections/ZoneInterventionSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

export const metadata = generatePageMetadata({
  title: 'ProClean — Nettoyage professionnel à Rouen',
  description:
    'ProClean, votre expert en nettoyage professionnel à Rouen. Particuliers et professionnels : canapés, bureaux, après travaux, syndrome de Diogène. Devis gratuit.',
  path: '/',
});

const { homepage } = rouenContent;

export default function HomePage() {
  const servicesForGrid = homepage.servicesOverview.services.map((s) => ({
    title: s.title,
    description: s.description,
    icon:
      s.slug === 'nettoyage-canape-rouen'
        ? 'Sofa'
        : s.slug === 'nettoyage-apres-demenagement-rouen'
          ? 'PackageOpen'
          : s.slug === 'nettoyage-bureaux-rouen'
            ? 'Briefcase'
            : 'Home',
    href: `/${s.slug}`,
    tag:
      s.slug === 'nettoyage-bureaux-rouen'
        ? 'Professionnels'
        : s.slug === 'nettoyage-diogene-rouen'
          ? 'Spécialisé'
          : 'Particuliers',
  }));

  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <FAQSchema items={homepage.faq} />

      {/* 1. Hero - Full screen with background image */}
      <HeroSection
        title={homepage.h1}
        subtitle={homepage.subtitle}
        ctaText="Devis Gratuit"
        ctaHref="/devis-gratuit-rouen"
      />

      {/* 2. About - Company presentation with counters */}
      {homepage.about && <AboutSection content={homepage.about} />}

      {/* 3. Services Showcase - 2x2 grid with circular images */}
      {homepage.servicesShowcase && (
        <ServicesShowcase
          heading={homepage.servicesShowcase.heading}
          subtitle={homepage.servicesShowcase.subtitle}
          services={homepage.servicesShowcase.services}
        />
      )}

      {/* 4. CTA Mid-page - Blue gradient */}
      {homepage.ctaMid && (
        <CTAMidSection
          heading={homepage.ctaMid.heading}
          ctaText={homepage.ctaMid.ctaText}
          ctaHref={homepage.ctaMid.ctaHref}
        />
      )}

      {/* 5. Why Choose Us - 4 cards */}
      <WhyUsSection
        heading={homepage.whyUs.heading}
        items={homepage.whyUs.items}
      />

      {/* 6. All Services Grid */}
      <ServicesGrid
        heading={homepage.servicesOverview.heading}
        services={servicesForGrid}
      />

      {/* 7. Testimonials Carousel */}
      {homepage.testimonials && homepage.testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={homepage.testimonials} />
      )}

      {/* 8. Zone intervention */}
      <ZoneInterventionSection
        heading={homepage.zone.heading}
        paragraph={homepage.zone.paragraph}
        cities={homepage.zone.cities}
        paymentMethods={homepage.zone.paymentMethods}
      />

      {/* 9. FAQ */}
      <FAQSection items={homepage.faq} />

      {/* 10. CTA Final */}
      <CTASection />
    </>
  );
}
