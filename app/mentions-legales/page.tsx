import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/data/siteConfig';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generatePageMetadata({
  title: 'Mentions Légales | ProClean Rouen',
  description:
    'Mentions légales du site societe-nettoyage-rouen.fr — ProClean, entreprise de nettoyage professionnel.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions légales', href: '/mentions-legales' },
        ]}
      />
      <article className="py-12 md:py-20">
        <div className="container-main max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text mb-10">
            Mentions légales
          </h1>

          <div className="space-y-8 text-gray-text dark:text-dark-text-secondary leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Éditeur du site
              </h2>
              <p>
                <strong>Raison sociale :</strong> {siteConfig.legalName}
                <br />
                <strong>SIRET :</strong> {siteConfig.siret}
                <br />
                <strong>Adresse :</strong> {siteConfig.address.street},{' '}
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                <strong>Téléphone :</strong>{' '}
                <a
                  href={`tel:${siteConfig.phoneFormatted}`}
                  className="text-proclean-blue hover:underline"
                >
                  {siteConfig.phone}
                </a>
                <br />
                <strong>Email :</strong>{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-proclean-blue hover:underline"
                >
                  {siteConfig.email}
                </a>
                <br />
                <strong>Directeur de la publication :</strong> Le gérant de{' '}
                {siteConfig.legalName}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Hébergement
              </h2>
              <p>
                <strong>Hébergeur :</strong> Contabo GmbH
                <br />
                <strong>Adresse :</strong> Aschauer Straße 32a, 81549 München,
                Allemagne
                <br />
                <strong>Site web :</strong>{' '}
                <a
                  href="https://contabo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-proclean-blue hover:underline"
                >
                  contabo.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur le site
                societe-nettoyage-rouen.fr (textes, images, graphismes, logo,
                icônes) est la propriété exclusive de {siteConfig.legalName}, sauf
                mention contraire. Toute reproduction, distribution,
                modification, adaptation, retransmission ou publication, même
                partielle, de ces différents éléments est strictement interdite
                sans l&apos;accord écrit de {siteConfig.legalName}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Limitation de responsabilité
              </h2>
              <p>
                {siteConfig.legalName} ne pourra être tenu responsable des
                dommages directs et indirects causés au matériel de
                l&apos;utilisateur lors de l&apos;accès au site
                societe-nettoyage-rouen.fr. {siteConfig.legalName} décline toute
                responsabilité quant à l&apos;utilisation qui pourrait être faite
                des informations et contenus présents sur le site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Cookies
              </h2>
              <p>
                Le site societe-nettoyage-rouen.fr n&apos;utilise pas de cookies
                de suivi ou publicitaires. Seuls des cookies techniques
                strictement nécessaires au fonctionnement du site peuvent être
                utilisés.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français.
                En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
