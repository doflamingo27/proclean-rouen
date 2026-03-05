'use client';

import { useState } from 'react';
import { Check, Loader2, AlertCircle, Lock, Clock, ShieldCheck } from 'lucide-react';
import type { ContactFormData, FormStatus } from '@/types';
import { siteConfig } from '@/data/siteConfig';

const prestationOptions = [
  'Nettoyage canapés/tissus',
  'Nettoyage après déménagement',
  'Nettoyage bureaux/locaux pro',
  'Syndrome de Diogène',
  'Nettoyage vitres',
  'Autres',
];

const typeLocalOptions = [
  'Appartement',
  'Maison',
  'Bureau',
  'Commerce',
  'Immeuble',
  'Autre',
];

const frequenceOptions = [
  'Ponctuelle',
  'Hebdomadaire',
  'Bi-mensuelle',
  'Mensuelle',
  'Trimestrielle',
];

const creneauOptions = [
  'Matin 8h-12h',
  'Après-midi 12h-17h',
  'Soirée 17h-20h',
  'Flexible',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:(?:\+33|0)\s?[1-9])(?:[\s.-]?\d{2}){4}$/;

function getMinDate(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    city: 'Rouen',
    prestations: [],
    prestationAutre: '',
    typeLocal: '',
    surface: '',
    frequence: '',
    date: '',
    creneau: '',
    commentaires: '',
    rgpd: false,
    honeypot: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Format d'email invalide";
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Le téléphone est requis';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errs.phone = 'Format de téléphone invalide';
    }
    if (!formData.rgpd) errs.rgpd = 'Vous devez accepter la politique de confidentialité';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    if (name === 'rgpd') {
      setFormData((prev) => ({ ...prev, rgpd: checked }));
      if (errors.rgpd) setErrors((prev) => ({ ...prev, rgpd: '' }));
      return;
    }
    // prestations checkboxes
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      prestations: checked
        ? [...prev.prestations, value]
        : prev.prestations.filter((p) => p !== value),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez vérifier votre connexion et réessayer.');
    }
  }

  if (status === 'success') {
    return (
      <section className="bg-navy min-h-[60vh] flex items-center">
        <div className="container-main py-12 md:py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-proclean-green/20">
              <Check className="w-10 h-10 text-proclean-green" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Demande envoyée avec succès !
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Merci pour votre demande. Notre équipe vous répondra sous 24h avec
              un devis personnalisé.
            </p>
            <a
              href="/"
              className="inline-flex items-center mt-8 px-6 py-3 bg-proclean-blue text-white font-semibold rounded-lg hover:bg-proclean-blue/90 transition-colors"
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </section>
    );
  }

  const isLoading = status === 'loading';
  const inputBase =
    'w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-proclean-blue focus:ring-1 focus:ring-proclean-blue transition-colors';
  const labelBase = 'block text-sm font-medium text-white/80 mb-1.5';

  return (
    <section className="bg-navy">
      <div className="container-main py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Demandez votre devis gratuit
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Décrivez votre besoin et recevez un devis personnalisé sous 24h.
            Sans engagement.
          </p>
        </div>

        {/* Badges de réassurance */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Lock className="w-4 h-4 text-proclean-green" />
            <span>100% sécurisé</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Clock className="w-4 h-4 text-proclean-green" />
            <span>Réponse en 24h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="w-4 h-4 text-proclean-green" />
            <span>Sans engagement</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-10"
          noValidate
        >
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleTextChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Section 1 : Coordonnées */}
          <fieldset>
            <legend className="font-display text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Vos coordonnées
            </legend>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className={labelBase}>
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={`${inputBase} ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Jean Dupont"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelBase}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={`${inputBase} ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="jean@exemple.fr"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelBase}>
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={`${inputBase} ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="07 49 13 06 83"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className={labelBase}>
                  Ville d&apos;intervention *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>
            </div>
          </fieldset>

          {/* Section 2 : Type de prestation */}
          <fieldset>
            <legend className="font-display text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Type de prestation souhaitée
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prestationOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-proclean-blue/50 transition-colors min-h-[44px]"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.prestations.includes(option)}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                    className="w-4 h-4 rounded border-white/30 text-proclean-blue focus:ring-proclean-blue bg-white/10"
                  />
                  <span className="text-white/80 text-sm">{option}</span>
                </label>
              ))}
            </div>
            {formData.prestations.includes('Autres') && (
              <div className="mt-4">
                <label htmlFor="prestationAutre" className={labelBase}>
                  Précisez
                </label>
                <input
                  type="text"
                  id="prestationAutre"
                  name="prestationAutre"
                  value={formData.prestationAutre}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                  placeholder="Décrivez votre besoin..."
                />
              </div>
            )}
          </fieldset>

          {/* Section 3 : Informations sur les lieux */}
          <fieldset>
            <legend className="font-display text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Informations sur les lieux
            </legend>
            <div className="space-y-4">
              <div>
                <label htmlFor="typeLocal" className={labelBase}>
                  Type de local
                </label>
                <select
                  id="typeLocal"
                  name="typeLocal"
                  value={formData.typeLocal}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                >
                  <option value="">Sélectionnez...</option>
                  {typeLocalOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="surface" className={labelBase}>
                  Surface approximative (m²)
                </label>
                <input
                  type="number"
                  id="surface"
                  name="surface"
                  inputMode="numeric"
                  min="1"
                  value={formData.surface}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                  placeholder="Ex : 60"
                />
              </div>

              <div>
                <label htmlFor="frequence" className={labelBase}>
                  Fréquence souhaitée
                </label>
                <select
                  id="frequence"
                  name="frequence"
                  value={formData.frequence}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                >
                  <option value="">Sélectionnez...</option>
                  {frequenceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Section 4 : Planification */}
          <fieldset>
            <legend className="font-display text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Planification
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className={labelBase}>
                  Date souhaitée
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={getMinDate()}
                  value={formData.date}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>
              <div>
                <label htmlFor="creneau" className={labelBase}>
                  Créneau horaire
                </label>
                <select
                  id="creneau"
                  name="creneau"
                  value={formData.creneau}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  className={inputBase}
                >
                  <option value="">Sélectionnez...</option>
                  {creneauOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Section 5 : Commentaires */}
          <fieldset>
            <legend className="font-display text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Commentaires
            </legend>
            <div>
              <label htmlFor="commentaires" className={labelBase}>
                Besoins spécifiques ou informations complémentaires
              </label>
              <textarea
                id="commentaires"
                name="commentaires"
                rows={4}
                value={formData.commentaires}
                onChange={handleTextChange}
                disabled={isLoading}
                className={`${inputBase} h-auto py-3 resize-y`}
                placeholder="Décrivez votre projet en détail..."
              />
            </div>
          </fieldset>

          {/* Section 6 : RGPD */}
          <fieldset>
            <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                name="rgpd"
                checked={formData.rgpd}
                onChange={handleCheckboxChange}
                disabled={isLoading}
                className="w-4 h-4 mt-1 rounded border-white/30 text-proclean-blue focus:ring-proclean-blue bg-white/10"
              />
              <span className="text-sm text-white/60 leading-relaxed">
                J&apos;accepte que mes données soient traitées par {siteConfig.name}{' '}
                pour répondre à ma demande de devis, conformément à la{' '}
                <a
                  href="/politique-de-confidentialite"
                  className="text-proclean-blue-light underline hover:text-proclean-blue transition-colors"
                >
                  politique de confidentialité
                </a>
                . *
              </span>
            </label>
            {errors.rgpd && (
              <p className="mt-1 text-sm text-red-400">{errors.rgpd}</p>
            )}
          </fieldset>

          {/* Error message */}
          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-proclean-green text-white text-lg font-bold rounded-lg hover:bg-proclean-green/90 active:bg-proclean-green/80 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'OBTENIR MON DEVIS GRATUIT'
              )}
            </button>
            <p className="mt-3 text-center text-sm text-white/40">
              Nous vous répondons sous 24h avec un devis personnalisé
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
