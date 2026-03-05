'use client';

import { MapPin } from 'lucide-react';
import type { ZoneInterventionSectionProps } from '@/types';
import Heading from '@/components/ui/Heading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function ZoneInterventionSection({
  heading = "Zone d'intervention",
  paragraph,
  cities,
  paymentMethods,
}: ZoneInterventionSectionProps) {
  return (
    <section className="section-padding bg-gray-bg dark:bg-dark-bg-secondary">
      <div className="container-main">
        <AnimateOnScroll>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-proclean-blue" />
            <Heading as="h2">{heading}</Heading>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="text-center text-gray-text dark:text-dark-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            {paragraph}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1.5 text-sm rounded-full bg-white border border-gray-border/50 text-navy dark:bg-dark-bg dark:border-gray-border/10 dark:text-dark-text"
              >
                {city}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        {paymentMethods && (
          <AnimateOnScroll delay={0.3}>
            <p className="mt-10 text-center text-sm text-gray-text dark:text-dark-text-secondary">
              <span className="font-semibold text-navy dark:text-dark-text">
                Moyens de paiement acceptés :
              </span>{' '}
              {paymentMethods}
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
