import { siteConfig } from '@/data/siteConfig';

export default function LocalBusinessSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['CleaningService', 'LocalBusiness'],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.slogan,
    url: siteConfig.url,
    telephone: siteConfig.phoneFormatted,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
    paymentAccepted: siteConfig.paymentMethods.join(', '),
    priceRange: '€€',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
