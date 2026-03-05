'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Star, ArrowRight, Check } from 'lucide-react';
import type { HeroSectionProps } from '@/types';
import { siteConfig } from '@/data/siteConfig';
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/newhero.jpg"
        alt="Nettoyage professionnel de bureaux et espaces commerciaux à Rouen"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/65 to-navy/55 z-[1]"
        aria-hidden="true"
      />

      {/* Blob bleu subtil */}
      <div
        className="absolute top-[30%] right-[20%] w-[500px] h-[500px] rounded-full z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(33,150,243,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Blob vert subtil */}
      <div
        className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] rounded-full z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(139,195,74,0.06) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Top gradient for header readability */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content centré */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-6 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge Google */}
        <motion.div variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm mb-10">
            <div className="flex gap-0.5 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-[13px] text-white/70 font-medium">
              5/5 sur Google — 530+ interventions
            </span>
          </div>
        </motion.div>

        {/* H1 cinématique */}
        <motion.h1
          variants={fadeInUp}
          className="font-display text-[40px] md:text-[56px] lg:text-[62px] font-extrabold text-white leading-[1.08] tracking-tight mb-6"
        >
          Nettoyage de Pro pour les <span className="text-proclean-blue">Pros</span><br />
          et les Particuliers
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          variants={fadeInUp}
          className="text-lg text-white/55 leading-relaxed max-w-[520px] mx-auto mb-11"
        >
          De la cathédrale Notre-Dame aux quartiers de la rive droite,{' '}
          <span className="text-white font-bold">ProClean</span> transforme vos espaces avec expertise et passion.
        </motion.p>

        {/* Double CTA */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* CTA principal */}
          <Link
            href="/devis-gratuit-rouen"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-proclean-blue to-[#1976D2] text-white text-base font-bold px-9 py-[18px] rounded-xl shadow-[0_4px_24px_rgba(33,150,243,0.35)] hover:shadow-[0_6px_32px_rgba(33,150,243,0.45)] transition-all"
          >
            Devis Gratuit
            <ArrowRight size={18} />
          </Link>

          {/* CTA secondaire */}
          <a
            href={`tel:${siteConfig.phoneFormatted}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.06] border border-white/15 text-white text-base font-semibold px-8 py-[18px] rounded-xl hover:bg-white/10 transition-all"
          >
            <Phone size={18} />
            {siteConfig.phone}
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
