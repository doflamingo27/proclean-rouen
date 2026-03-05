'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ServicesGridProps } from '@/types';
import { getIcon } from '@/lib/icons';
import Heading from '@/components/ui/Heading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const BAND_COLORS = ['bg-navy', 'bg-proclean-blue', 'bg-navy', 'bg-proclean-blue'];
const LINK_COLORS = [
  'text-navy hover:text-proclean-blue',
  'text-proclean-blue hover:text-navy',
  'text-navy hover:text-proclean-blue',
  'text-proclean-blue hover:text-navy',
];

export default function ServicesGrid({ heading, services }: ServicesGridProps) {
  return (
    <section className="bg-gray-bg dark:bg-dark-bg section-padding">
      <div className="container-main">
        {/* Header */}
        <AnimateOnScroll>
          <Heading as="h2" className="text-center mb-3">
            {heading}
          </Heading>
          <div className="w-16 h-1 bg-gradient-to-r from-proclean-blue to-proclean-green mx-auto mb-12" />
        </AnimateOnScroll>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, idx) => {
            const Icon = getIcon(service.icon);
            const bandColor = BAND_COLORS[idx] || 'bg-navy';
            const linkColor = LINK_COLORS[idx] || 'text-navy hover:text-proclean-blue';

            return (
              <AnimateOnScroll key={service.href} delay={idx * 0.1}>
                <Link
                  href={service.href}
                  className="block rounded-2xl overflow-hidden bg-white dark:bg-dark-bg-secondary shadow-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Header bandeau */}
                  <div className={`${bandColor} px-7 py-6 flex items-center justify-between`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white font-display leading-tight max-w-[280px]">
                        {service.title}
                      </h3>
                    </div>
                    {service.tag && (
                      <span className="hidden sm:inline-block text-[11px] font-semibold text-white/70 bg-white/10 px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0 ml-3">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="px-7 py-6">
                    <p className="text-sm text-gray-text dark:text-dark-text-secondary leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${linkColor} transition-colors`}>
                      Découvrir ce service
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/particuliers"
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-navy/90 transition-colors"
          >
            Voir toutes nos prestations
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
