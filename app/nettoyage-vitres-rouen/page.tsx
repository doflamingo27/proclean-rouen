import { rouenContent } from '@/content/rouen';
import { getServiceBySlug } from '@/data/services';
import { generatePageMetadata } from '@/lib/seo';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

const slug = 'nettoyage-vitres-rouen';
const content = rouenContent.services[slug];
const service = getServiceBySlug(slug)!;

export const metadata = generatePageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: `/${slug}`,
});

export default function Page() {
  const relatedServices = content.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <ServicePageTemplate
      service={service}
      content={content}
      relatedServices={relatedServices}
    />
  );
}
