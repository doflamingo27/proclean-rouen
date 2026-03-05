import { siteConfig } from '@/data/siteConfig';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  slug: string;
}

export default function ServiceSchema({ serviceName, description, slug }: ServiceSchemaProps) {
  // All data is from trusted static sources (siteConfig, content/rouen.ts) — no user input
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    url: `${siteConfig.url}/${slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phoneFormatted,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        postalCode: siteConfig.address.postalCode,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
