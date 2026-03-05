import { NextRequest, NextResponse } from 'next/server';
import { createTransporter } from '@/lib/email';

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1h window
    return false;
  }

  entry.count++;
  return entry.count > 5; // max 5 per hour
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:(?:\+33|0)\s?[1-9])(?:[\s.-]?\d{2}){4}$/;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Trop de requêtes. Réessayez plus tard.' },
        { status: 429 },
      );
    }

    const body = await request.json();

    // Honeypot check — silent pass for bots
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Merci pour votre demande.' });
    }

    // Server-side validation
    if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Le nom est requis.' },
        { status: 400 },
      );
    }

    if (!body.email || typeof body.email !== 'string' || !emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Email invalide.' },
        { status: 400 },
      );
    }

    if (
      !body.phone ||
      typeof body.phone !== 'string' ||
      !phoneRegex.test(body.phone.replace(/\s/g, ''))
    ) {
      return NextResponse.json(
        { success: false, message: 'Téléphone invalide.' },
        { status: 400 },
      );
    }

    if (!body.rgpd) {
      return NextResponse.json(
        { success: false, message: 'Acceptation RGPD requise.' },
        { status: 400 },
      );
    }

    // Sanitize all inputs
    const name = sanitize(String(body.name).trim());
    const email = sanitize(String(body.email).trim());
    const phone = sanitize(String(body.phone).trim());
    const city = sanitize(String(body.city || 'Rouen').trim());
    const prestations = Array.isArray(body.prestations)
      ? body.prestations.map((p: unknown) => sanitize(String(p)))
      : [];
    const prestationAutre = sanitize(String(body.prestationAutre || '').trim());
    const typeLocal = sanitize(String(body.typeLocal || '').trim());
    const surface = sanitize(String(body.surface || '').trim());
    const frequence = sanitize(String(body.frequence || '').trim());
    const date = sanitize(String(body.date || '').trim());
    const creneau = sanitize(String(body.creneau || '').trim());
    const commentaires = sanitize(String(body.commentaires || '').trim());

    // Build email content
    const prestationsText = prestations.length > 0 ? prestations.join(', ') : 'Non précisé';
    const subject = `Nouvelle demande de devis — ${name} — ${prestationsText}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A2540; padding: 20px; text-align: center;">
          <h1 style="color: #FFFFFF; margin: 0; font-size: 22px;">Nouvelle demande de devis</h1>
        </div>
        <div style="padding: 24px; background: #FFFFFF;">
          <h2 style="color: #0A2540; font-size: 18px; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Coordonnées</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Nom</td><td style="padding: 6px 0; font-weight: bold; color: #0A2540;">${name}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2196F3;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Téléphone</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #2196F3;">${phone}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Ville</td><td style="padding: 6px 0;">${city}</td></tr>
          </table>

          <h2 style="color: #0A2540; font-size: 18px; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Prestation</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Type</td><td style="padding: 6px 0;">${prestationsText}</td></tr>
            ${prestationAutre ? `<tr><td style="padding: 6px 0; color: #666;">Précision</td><td style="padding: 6px 0;">${prestationAutre}</td></tr>` : ''}
          </table>

          <h2 style="color: #0A2540; font-size: 18px; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Lieu &amp; Planification</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            ${typeLocal ? `<tr><td style="padding: 6px 0; color: #666; width: 140px;">Type de local</td><td style="padding: 6px 0;">${typeLocal}</td></tr>` : ''}
            ${surface ? `<tr><td style="padding: 6px 0; color: #666;">Surface</td><td style="padding: 6px 0;">${surface} m²</td></tr>` : ''}
            ${frequence ? `<tr><td style="padding: 6px 0; color: #666;">Fréquence</td><td style="padding: 6px 0;">${frequence}</td></tr>` : ''}
            ${date ? `<tr><td style="padding: 6px 0; color: #666;">Date souhaitée</td><td style="padding: 6px 0;">${date}</td></tr>` : ''}
            ${creneau ? `<tr><td style="padding: 6px 0; color: #666;">Créneau</td><td style="padding: 6px 0;">${creneau}</td></tr>` : ''}
          </table>

          ${commentaires ? `<h2 style="color: #0A2540; font-size: 18px; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Commentaires</h2><p style="color: #333; line-height: 1.6;">${commentaires}</p>` : ''}
        </div>
        <div style="background: #F5F7FA; padding: 16px; text-align: center; font-size: 12px; color: #666;">
          Envoyé depuis le formulaire de societe-nettoyage-rouen.fr
        </div>
      </div>
    `;

    // Send email
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@proclean20.fr',
      to: process.env.EMAIL_TO || 'contact@proclean20.fr',
      replyTo: email,
      subject,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 },
    );
  }
}
