import { rouenContent } from '@/content/rouen';
import { getServicesByCategory } from '@/data/services';
import { generatePageMetadata } from '@/lib/seo';
import { getIcon } from '@/lib/icons';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';
import HeroSection from '@/components/sections/HeroSection';
import Card from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import CTASection from '@/components/sections/CTASection';

const cat = rouenContent.categories.particuliers;

export const metadata = generatePageMetadata({
  title: cat.metaTitle,
  description: cat.metaDescription,
  path: '/particuliers',
});

export default function ParticuliersPage() {
  const services = getServicesByCategory('particuliers');
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Particuliers', href: '/particuliers' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      <HeroSection title={cat.h1} subtitle={cat.subtitle} variant="service" />

      <section className="py-12 md:py-20">
        <div className="container-main">
          <AnimateOnScroll>
            <p className="text-center text-base sm:text-lg text-gray-text dark:text-dark-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              {cat.introText}
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = getIcon(service.icon);
              return (
                <AnimateOnScroll key={service.slug} delay={idx * 0.08}>
                  <Card
                    title={service.title}
                    description={service.shortDescription}
                    href={`/${service.slug}`}
                    icon={<Icon className="w-6 h-6" />}
                  />
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
