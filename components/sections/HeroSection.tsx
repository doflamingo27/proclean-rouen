'use client';

import Image from 'next/image';
import { Phone } from 'lucide-react';
import type { HeroSectionProps } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function HeroSection({
  title,
  subtitle,
  ctaText = 'Devis Gratuit',
  ctaHref = '/devis-gratuit-rouen',
  secondaryCtaText,
  secondaryCtaHref,
  variant = 'homepage',
  heroImage,
}: HeroSectionProps) {
  if (variant === 'service') {
    return (
      <section className="bg-navy dark:bg-dark-bg pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
        <div className="container-main">
          <AnimateOnScroll>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight text-center">
              {title}
            </h1>
          </AnimateOnScroll>

          {heroImage && (
            <AnimateOnScroll delay={0.1}>
              <div className="mt-8 mx-auto max-w-5xl">
                <Image
                  src={heroImage}
                  alt={title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[400px] object-cover rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={0.2}>
            <p className="mt-8 text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white max-w-4xl mx-auto text-center leading-tight">
              {subtitle}
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-bg.webp"
        alt="Nettoyage professionnel de bureaux et espaces commerciaux à Rouen"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/45 to-navy/20"
        aria-hidden="true"
      />

      {/* Top gradient for header readability */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent z-[1] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-main relative z-10 py-20 md:py-28">
        <AnimateOnScroll>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-proclean-green animate-pulse" />
            Nettoyage professionnel à {siteConfig.city}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl leading-[1.1]">
            {title}
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <Button href={ctaHref} size="lg">
              {ctaText}
            </Button>
            {secondaryCtaText && secondaryCtaHref ? (
              <Button href={secondaryCtaHref} variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                {secondaryCtaText}
              </Button>
            ) : (
              <a
                href={`tel:${siteConfig.phoneFormatted}`}
                className="inline-flex items-center gap-2 px-6 py-4 text-white/80 font-medium hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.phone}
              </a>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
