import Link from 'next/link';
import type { ReactNode } from 'react';

const STRONG_RE = /<strong>(.*?)<\/strong>/g;
const ANCHOR_RE = /<a\s+href="([^"]*)">(.*?)<\/a>/g;
const HAS_HTML_RE = /<(?:strong|a\s)/;

/**
 * Parse les balises <strong> dans une string et retourne des fragments React.
 */
function parseStrong(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  STRONG_RE.lastIndex = 0;
  while ((match = STRONG_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`${keyPrefix}-s${match.index}`} className="font-semibold text-navy dark:text-dark-text">
        {match[1]}
      </strong>
    );
    lastIndex = STRONG_RE.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Parse une string contenant des <strong> et <a href="..."> en fragments React.
 * - Liens internes (/) utilisent next/link
 * - Liens externes (http) utilisent <a target="_blank">
 * - <strong> reçoit les classes font-semibold text-navy
 * - Gère l'imbrication <a><strong>...</strong></a>
 *
 * Retourne la string telle quelle si aucune balise HTML detectee.
 */
export function parseInlineHtml(text: string): ReactNode {
  if (!HAS_HTML_RE.test(text)) {
    return text;
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  ANCHOR_RE.lastIndex = 0;
  while ((match = ANCHOR_RE.exec(text)) !== null) {
    // Texte avant le lien — peut contenir des <strong>
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(...parseStrong(before, `b${match.index}`));
    }

    const href = match[1];
    const innerText = match[2];
    // Le contenu du lien peut contenir des <strong>
    const innerContent = parseStrong(innerText, `a${match.index}`);
    const linkClass = 'text-proclean-blue hover:text-proclean-blue-light hover:underline transition-colors font-medium';

    if (href.startsWith('/')) {
      parts.push(
        <Link key={`l${match.index}`} href={href} className={linkClass}>
          {innerContent}
        </Link>
      );
    } else {
      parts.push(
        <a key={`l${match.index}`} href={href} className={linkClass} target="_blank" rel="noopener noreferrer">
          {innerContent}
        </a>
      );
    }

    lastIndex = ANCHOR_RE.lastIndex;
  }

  // Texte restant apres le dernier lien — peut contenir des <strong>
  if (lastIndex < text.length) {
    parts.push(...parseStrong(text.slice(lastIndex), 'end'));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
