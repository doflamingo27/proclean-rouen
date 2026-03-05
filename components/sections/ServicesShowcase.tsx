'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ServicesShowcaseProps } from '@/types';

import Heading from '@/components/ui/Heading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Each card gets a quarter-circle image in its inner corner.
// Together the 4 quarters form a complete circle at the grid center.
const quarterConfig = [
  // Card 0 (top-left): quarter in bottom-right → text stays left
  {
    position: 'bottom-0 right-0',
    radius: 'rounded-tl-full',
    contentPad: 'md:pb-24 lg:pb-28',
    contentShift: 'md:max-w-[65%]',
    image: '/images/services/service-circle-1.webp',
    alt: 'Nettoyage de bureaux professionnels à Rouen',
  },
  // Card 1 (top-right): quarter in bottom-left → text shifts right
  {
    position: 'bottom-0 left-0',
    radius: 'rounded-tr-full',
    contentPad: 'md:pb-24 lg:pb-28',
    contentShift: 'md:ml-[35%]',
    image: '/images/services/service-circle-2.webp',
    alt: 'Nettoyage après travaux à Rouen',
  },
  // Card 2 (bottom-left): quarter in top-right → text stays left
  {
    position: 'top-0 right-0',
    radius: 'rounded-bl-full',
    contentPad: 'md:pt-24 lg:pt-28',
    contentShift: 'md:max-w-[65%]',
    image: '/images/services/service-circle-3.webp',
    alt: 'Entretien de commerces à Rouen',
  },
  // Card 3 (bottom-right): quarter in top-left → text shifts right
  {
    position: 'top-0 left-0',
    radius: 'rounded-br-full',
    contentPad: 'md:pt-24 lg:pt-28',
    contentShift: 'md:ml-[35%]',
    image: '/images/services/service-circle-4.webp',
    alt: 'Débarras maison à Rouen',
  },
];

export default function ServicesShowcase({
  heading,
  subtitle,
  services,
}: ServicesShowcaseProps) {
  return (
    <section className="section-padding bg-gray-bg dark:bg-dark-bg-secondary">
      <div className="container-main">
        <AnimateOnScroll>
          <Heading as="h2" className="text-center mb-4">
            {heading}
          </Heading>
          {subtitle && (
            <p className="text-center text-gray-text dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </AnimateOnScroll>

        {/* 2x2 Grid - small gap so quarters form a tight circle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-5">
          {services.map((service, idx) => {
            const quarter = quarterConfig[idx];
            return (
              <AnimateOnScroll key={service.href} delay={idx * 0.1}>
                <Link
                  href={service.href}
                  className="group relative block overflow-hidden rounded-xl bg-white dark:bg-dark-bg shadow-soft border border-gray-border/50 dark:border-gray-border/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Card content - padded & shifted away from quarter circle */}
                  <div className={`relative z-10 p-6 lg:p-8 ${quarter ? `${quarter.contentPad} ${quarter.contentShift}` : ''}`}>
                    <h3 className="font-display text-xl font-semibold text-navy dark:text-dark-text">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-gray-text dark:text-dark-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-proclean-blue font-medium text-sm group-hover:gap-2 transition-all">
                      En savoir plus
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Quarter-circle image - desktop only */}
                  {quarter && (
                    <div
                      className={`hidden md:block absolute ${quarter.position} w-36 h-36 lg:w-44 lg:h-44 ${quarter.radius} overflow-hidden`}
                      aria-hidden="true"
                    >
                      <Image
                        src={quarter.image}
                        alt={quarter.alt}
                        fill
                        className="object-cover"
                        sizes="176px"
                      />
                    </div>
                  )}
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
