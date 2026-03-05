'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { CTAMidSectionProps } from '@/types';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';

export default function CTAMidSection({
  heading = 'Prêt pour des locaux impeccables ? Planifiez votre nettoyage dès maintenant !',
  ctaText = 'Demander un devis',
  ctaHref = '/devis-gratuit-rouen',
}: CTAMidSectionProps) {
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

      <div className="container-main section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <AnimateOnScroll>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              {heading}
            </h2>
            <div className="mt-6">
              <Button
                href={ctaHref}
                variant="secondary"
                size="lg"
                className="bg-navy text-white hover:bg-navy/90 shadow-lg inline-flex items-center gap-2"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </AnimateOnScroll>

          {/* Right: Image */}
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="relative h-[300px] lg:h-[380px] rounded-2xl overflow-hidden">
              <Image
                src="/images/cta/cta-cleaner.webp"
                alt="Professionnel de nettoyage ProClean à Rouen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
