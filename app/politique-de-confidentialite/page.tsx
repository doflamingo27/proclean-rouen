import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/data/siteConfig';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

export const metadata = generatePageMetadata({
  title: 'Politique de Confidentialité | ProClean Rouen',
  description:
    'Politique de confidentialité et de protection des données personnelles — ProClean, entreprise de nettoyage à Rouen.',
  path: '/politique-de-confidentialite',
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Accueil', href: '/' },
          {
            label: 'Politique de confidentialité',
            href: '/politique-de-confidentialite',
          },
        ]}
      />
      <article className="py-12 md:py-20">
        <div className="container-main max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text mb-10">
            Politique de confidentialité
          </h1>

          <div className="space-y-8 text-gray-text dark:text-dark-text-secondary leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données personnelles est{' '}
                {siteConfig.legalName}, {siteConfig.address.street},{' '}
                {siteConfig.address.postalCode} {siteConfig.address.city}.
                <br />
                Contact :{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-proclean-blue hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Données collectées
              </h2>
              <p>
                Via le formulaire de contact, nous collectons les informations
                suivantes :
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Nom complet</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Ville d&apos;intervention</li>
                <li>Type de prestation souhaitée</li>
                <li>
                  Informations sur le lieu (type de local, surface, fréquence)
                </li>
                <li>Date et créneau souhaités</li>
                <li>Commentaires éventuels</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Finalité du traitement
              </h2>
              <p>
                Les données collectées sont utilisées exclusivement pour :
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  Répondre à votre demande de devis et vous fournir une
                  proposition commerciale personnalisée
                </li>
                <li>Vous recontacter par email ou téléphone</li>
                <li>Planifier une intervention de nettoyage</li>
              </ul>
              <p className="mt-2">
                Vos données ne sont jamais transmises à des tiers à des fins
                commerciales ou publicitaires.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Base légale
              </h2>
              <p>
                Le traitement de vos données repose sur votre consentement
                explicite, recueilli via la case à cocher obligatoire du
                formulaire de contact (Article 6.1.a du RGPD).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Durée de conservation
              </h2>
              <p>
                Vos données personnelles sont conservées pendant une durée
                maximale de 3 ans à compter de votre dernière interaction avec
                {' '}{siteConfig.legalName}. Passé ce délai, elles sont
                automatiquement supprimées.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Vos droits
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  <strong>Droit d&apos;accès :</strong> obtenir la confirmation que vos
                  données sont traitées et en recevoir une copie
                </li>
                <li>
                  <strong>Droit de rectification :</strong> demander la
                  correction de données inexactes ou incomplètes
                </li>
                <li>
                  <strong>Droit à l&apos;effacement :</strong> demander la suppression
                  de vos données personnelles
                </li>
                <li>
                  <strong>Droit à la limitation :</strong> demander la limitation
                  du traitement de vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> recevoir vos données
                  dans un format structuré
                </li>
                <li>
                  <strong>Droit d&apos;opposition :</strong> vous opposer au
                  traitement de vos données
                </li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à :{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-proclean-blue hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-2">
                En cas de litige, vous pouvez introduire une réclamation auprès
                de la Commission Nationale de l&apos;Informatique et des Libertés
                (CNIL) :{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-proclean-blue hover:underline"
                >
                  www.cnil.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Sécurité des données
              </h2>
              <p>
                {siteConfig.legalName} met en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre l&apos;accès non autorisé, la modification, la
                divulgation ou la destruction. Les données transmises via le
                formulaire sont chiffrées par le protocole HTTPS.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy dark:text-dark-text mb-3">
                Mise à jour
              </h2>
              <p>
                Cette politique de confidentialité peut être mise à jour à tout
                moment. La date de dernière mise à jour est indiquée ci-dessous.
              </p>
              <p className="mt-2 text-sm text-gray-text/60 dark:text-dark-text-secondary/60">
                Dernière mise à jour : février 2026
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
