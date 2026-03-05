'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TestimonialsCarouselProps } from '@/types';
import Heading from '@/components/ui/Heading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function TestimonialsCarousel({
  heading = 'Ce que disent nos clients',
  testimonials,
}: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const current = testimonials[activeIndex];

  return (
    <section
      className="section-padding"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-main">
        <AnimateOnScroll>
          <Heading as="h2" className="text-center mb-4">
            {heading}
          </Heading>
          <p className="text-center text-proclean-blue font-medium mb-12">
            5/5 sur Google — 98% de satisfaction client
          </p>
        </AnimateOnScroll>

        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-white dark:bg-dark-bg-secondary rounded-2xl p-8 shadow-soft border border-gray-border/50 dark:border-gray-border/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-navy dark:text-dark-text leading-relaxed">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-proclean-blue/10 dark:bg-proclean-blue/20 flex items-center justify-center text-proclean-blue font-bold font-display">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-navy dark:text-dark-text">
                    {current.name}
                  </p>
                  <p className="text-sm text-gray-text dark:text-dark-text-secondary">
                    Avis Google
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows - desktop */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-dark-bg-secondary shadow-soft border border-gray-border/50 dark:border-gray-border/10 text-navy dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-dark-bg-secondary shadow-soft border border-gray-border/50 dark:border-gray-border/10 text-navy dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === activeIndex
                  ? 'bg-proclean-blue'
                  : 'bg-gray-border dark:bg-gray-border/30'
              }`}
              aria-label={`Témoignage ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
