'use client';

import { Phone } from 'lucide-react';
import type { CTASectionProps } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function CTASection({
  heading = 'Demandez votre devis gratuit',
  description = 'Nos experts vous répondent sous 24h. Intervention rapide sur Rouen et toute la Seine-Maritime.',
  ctaText = 'Devis Gratuit',
  ctaHref = '/devis-gratuit-rouen',
  phone = siteConfig.phone,
}: CTASectionProps) {
  return (
    <section className="relative bg-cta-gradient overflow-hidden">
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-main section-padding relative z-10 text-center">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            {heading}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            {description}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={ctaHref}
              variant="secondary"
              size="lg"
              className="!bg-white !text-proclean-blue hover:!bg-white/90 shadow-lg"
            >
              {ctaText}
            </Button>
            <a
              href={`tel:${siteConfig.phoneFormatted}`}
              className="inline-flex items-center gap-2 px-6 py-4 text-white font-medium hover:text-white/80 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {phone}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
