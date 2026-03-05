'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useInView, useMotionValue, animate } from 'framer-motion';
import type { AboutSectionProps } from '@/types';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

function CounterValue({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    const unsubscribe = count.on('change', (v) => {
      setDisplay(`${Math.round(v)}${suffix}`);
    });
    return unsubscribe;
  }, [count, suffix]);

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, value, count]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl font-bold text-navy dark:text-dark-text"
    >
      {display}
    </span>
  );
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Titre centré au-dessus de la grid */}
        <AnimateOnScroll>
          <Heading as="h2" className="text-center">{content.heading}</Heading>
          <p className="mt-2 text-proclean-blue font-medium text-lg text-center">
            {content.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: Text */}
          <div>
            <AnimateOnScroll delay={0.1}>
              <p className="mt-6 text-gray-text dark:text-dark-text-secondary leading-relaxed">
                {content.paragraph}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <ul className="mt-8 space-y-4">
                {content.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-proclean-green/15 text-proclean-green">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-gray-text dark:text-dark-text-secondary">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {content.counters.map((counter) => (
                  <div key={counter.label} className="text-center">
                    <CounterValue value={counter.value} suffix={counter.suffix} />
                    <p className="mt-1 text-sm text-gray-text dark:text-dark-text-secondary">
                      {counter.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.25}>
              <Button href="/devis-gratuit-rouen" variant="outline" className="mt-8">
                En savoir plus
              </Button>
            </AnimateOnScroll>
          </div>

          {/* Right column: Images */}
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="relative h-[400px] md:h-[500px]">
              {/* Large image */}
              <div className="relative w-[75%] h-[80%] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/about/about-1.webp"
                  alt="Équipe ProClean en intervention de nettoyage professionnel à Rouen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 75vw, 35vw"
                />
              </div>
              {/* Small overlapping image */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-dark-bg">
                <Image
                  src="/images/about/about-2.webp"
                  alt="Résultat nettoyage professionnel bureaux Rouen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 55vw, 25vw"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
