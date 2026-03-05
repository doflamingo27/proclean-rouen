'use client';

import type { PricingItem } from '@/types';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';

export default function PricingSection({ items }: { items: PricingItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-gray-bg dark:bg-dark-bg-secondary">
      <div className="container-main max-w-3xl">
        <AnimateOnScroll>
          <Heading as="h2" className="text-center mb-10">
            Nos tarifs indicatifs
          </Heading>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-white rounded-xl shadow-soft border border-gray-border/50 overflow-hidden dark:bg-dark-bg dark:border-gray-border/10">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-6 py-4 gap-1 sm:gap-4 ${
                  idx !== items.length - 1
                    ? 'border-b border-gray-border/50 dark:border-gray-border/10'
                    : ''
                }`}
              >
                <span className="text-navy dark:text-dark-text font-medium text-base">
                  {item.label}
                </span>
                <span className="text-proclean-blue font-bold text-lg whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="mt-6 text-center text-sm text-gray-text dark:text-dark-text-secondary">
            Tarifs indicatifs TTC. Chaque projet est unique, demandez votre devis
            personnalisé gratuit.
          </p>
          <div className="mt-4 text-center">
            <Button href="/devis-gratuit-rouen">Demander un devis gratuit</Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
