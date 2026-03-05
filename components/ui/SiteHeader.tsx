'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import Button from './Button';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const pathname = usePathname();

  // Pages with light background (no dark hero) — all other pages have dark hero
  const lightPages = ['/mentions-legales', '/politique-de-confidentialite'];
  const hasDarkHero = !lightPages.includes(pathname);

  // Text color: white on dark hero pages when not scrolled, navy otherwise
  const textColor = !scrolled && hasDarkHero
    ? 'text-white/90 hover:text-white'
    : 'text-navy/80 hover:text-proclean-blue dark:text-dark-text-secondary dark:hover:text-proclean-blue-light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft dark:bg-dark-bg/95'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo — CLean.png sur fond sombre, logo.png sur fond blanc */}
          <Link href="/" className="relative z-50 flex-shrink-0">
            <Image
              src={!scrolled && hasDarkHero ? '/images/CLean.png' : '/images/logo.png'}
              alt="ProClean - Société de nettoyage Rouen"
              width={200}
              height={70}
              className="h-[72px] md:h-[90px] w-auto transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.mainMenu.map((item, idx) =>
              item.children && item.children.length > 0 ? (
                /* Dropdown item */
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${textColor}`}
                    aria-expanded={openDropdown === idx}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 pt-2 min-w-[260px]"
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-gray-border/50 py-2 dark:bg-dark-bg-secondary dark:border-gray-border/10">
                          {item.children.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-4 py-2.5 text-sm text-navy/80 hover:text-proclean-blue hover:bg-proclean-blue/5 transition-colors dark:text-dark-text-secondary dark:hover:text-proclean-blue-light"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Direct link item */
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${textColor}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phoneFormatted}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${textColor}`}
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
            </a>
            <Button href={navigation.ctaButton.href} size="sm">
              {navigation.ctaButton.label}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden z-50 p-2 ${!scrolled && hasDarkHero ? 'text-white' : 'text-navy dark:text-dark-text'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-dark-bg z-40 lg:hidden"
          >
            <nav className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              {navigation.mainMenu.map((item, idx) =>
                item.children && item.children.length > 0 ? (
                  /* Dropdown accordion */
                  <div key={item.label} className="border-b border-gray-border/50 dark:border-gray-border/10">
                    <button
                      className="flex items-center justify-between w-full py-4 text-lg font-display font-semibold text-navy dark:text-dark-text"
                      onClick={() =>
                        setMobileAccordion(mobileAccordion === idx ? null : idx)
                      }
                      aria-expanded={mobileAccordion === idx}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileAccordion === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-4 space-y-1">
                            {item.children.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="block py-2 text-gray-text dark:text-dark-text-secondary hover:text-proclean-blue transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Direct link */
                  <div key={item.label} className="border-b border-gray-border/50 dark:border-gray-border/10">
                    <Link
                      href={item.href}
                      className="block py-4 text-lg font-display font-semibold text-navy dark:text-dark-text hover:text-proclean-blue transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              )}

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${siteConfig.phoneFormatted}`}
                  className="flex items-center justify-center gap-2 py-3 text-lg font-medium text-navy dark:text-dark-text"
                >
                  <Phone className="w-5 h-5" />
                  {siteConfig.phone}
                </a>
                <Button href={navigation.ctaButton.href} size="lg" className="w-full">
                  {navigation.ctaButton.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
