import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { navigation } from '@/data/navigation';

export default function SiteFooter() {
  const particuliers = navigation.mainMenu.find(m => m.label === 'Particuliers');
  const professionnels = navigation.mainMenu.find(m => m.label === 'Professionnels');
  const tissus = navigation.mainMenu.find(m => m.label === 'Tissus');

  return (
    <footer className="bg-navy text-white">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Particuliers */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Particuliers
            </h3>
            <ul className="space-y-2.5">
              {particuliers?.children?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Professionnels */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Professionnels
            </h3>
            <ul className="space-y-2.5">
              {professionnels?.children?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-display text-lg font-semibold mt-8 mb-4">
              Tissus & Ameublement
            </h3>
            <ul className="space-y-2.5">
              {tissus?.children?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Infos pratiques */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Infos pratiques
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/devis-gratuit-rouen"
                  className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                >
                  Devis gratuit
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phoneFormatted}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-proclean-blue-light transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name} &mdash; SIRET{' '}
            {siteConfig.siret}
          </p>
          <p>
            Nettoyage professionnel à {siteConfig.city} et en{' '}
            {siteConfig.department}
          </p>
        </div>
      </div>
    </footer>
  );
}
