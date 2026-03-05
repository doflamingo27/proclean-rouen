'use client';

import Link from 'next/link';
import type { ServiceDefinition } from '@/types';
import { getIcon } from '@/lib/icons';
import Heading from '@/components/ui/Heading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function RelatedServicesSection({
  services,
}: {
  services: ServiceDefinition[];
}) {
  if (services.length === 0) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="container-main">
        <AnimateOnScroll>
          <Heading as="h2" className="text-center mb-10">
            Services complémentaires
          </Heading>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = getIcon(service.icon);
            return (
              <AnimateOnScroll key={service.slug} delay={idx * 0.1}>
                <Link
                  href={`/${service.slug}`}
                  className="relative block bg-white dark:bg-dark-bg-secondary rounded-xl border border-gray-border/60 dark:border-gray-border/10 p-6 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-proclean-blue to-proclean-blue-light" />

                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-proclean-blue dark:text-proclean-blue-light shrink-0" />
                    <h3 className="font-display text-lg font-semibold text-navy dark:text-dark-text">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-text dark:text-dark-text-secondary leading-relaxed">
                    {service.shortDescription}
                  </p>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
