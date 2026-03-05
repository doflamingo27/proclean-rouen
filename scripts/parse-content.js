/**
 * Script to parse raw text file and generate ContentBlock[] sections for each service.
 * Run with: node scripts/parse-content.js
 * Output: content/rouen-sections.ts
 */
const fs = require('fs');
const path = require('path');

// Read raw file
const rawPath = path.join(__dirname, '..', '..', 'content', 'raw', '- ROUEN');
const raw = fs.readFileSync(rawPath, 'utf-8');
const lines = raw.split('\n');

// Service boundaries (1-indexed line numbers from the raw file)
const serviceMap = [
  { slug: 'nettoyage-apres-travaux-rouen', start: 208, end: 312 },
  { slug: 'nettoyage-lustre-rouen', start: 312, end: 537 },
  { slug: 'nettoyage-apres-demenagement-rouen', start: 537, end: 768 },
  { slug: 'debarras-maison-rouen', start: 768, end: 991 },
  { slug: 'nettoyage-appartement-rouen', start: 991, end: 1239 },
  { slug: 'nettoyage-voiture-rouen', start: 1239, end: 1448 },
  { slug: 'nettoyage-terrasse-rouen', start: 1448, end: 1657 },
  { slug: 'nettoyage-bureaux-rouen', start: 1657, end: 1802 },
  { slug: 'entretien-commerces-rouen', start: 1802, end: 1931 },
  { slug: 'nettoyage-parking-rouen', start: 1931, end: 2060 },
  { slug: 'entretien-immeubles-rouen', start: 2060, end: 2189 },
  { slug: 'nettoyage-distributeurs-rouen', start: 2189, end: 2639 },
  { slug: 'nettoyage-camion-rouen', start: 2639, end: 3075 },
  { slug: 'nettoyage-canape-rouen', start: 3075, end: 3520 },
  { slug: 'nettoyage-tapis-rouen', start: 3520, end: 3965 },
  { slug: 'nettoyage-moquette-rouen', start: 3965, end: 4135 },
  { slug: 'nettoyage-matelas-rouen', start: 4135, end: 4320 },
  { slug: 'nettoyage-vitres-rouen', start: 4320, end: 4500 },
  { slug: 'nettoyage-toiture-rouen', start: 4500, end: lines.length + 1 },
];

// Headings that indicate non-content sections (stop parsing when encountered)
const skipPatterns = [
  /^tarif/i,
  /^grille tarifaire/i,
  /^faq\b/i,
  /^questions?\s+fr[eé]quentes?/i,
  /^secteur\s+d.intervention/i,
  /^t[eé]moignages?\b/i,
  /^avis\s+(clients?|verifi)/i,
  /^nos\s+certifications?/i,
  /^r[eé]f[eé]rences?\s+clients/i,
  /^nos\s+engagements/i,
  /^r[eé]servation/i,
  /^contactez/i,
  /^demandez?\s+votre\s+devis/i,
  /^obtenez?\s+votre/i,
  /^nos\s+clients\s+t[eé]moignent/i,
  /^ce\s+que\s+nos\s+clients/i,
  /^ils\s+nous\s+font\s+confiance/i,
  /^nos\s+partenaires/i,
  /^engagements?\s+qualit/i,
  /^avantages?\s+tarifaires?/i,
  /^tarification\b/i,
];

// Patterns for bold headings that indicate skip sections
const boldSkipPatterns = [
  /zone\s+d.intervention\s+proclean/i,
  /faq\s*:/i,
  /r[eé]ponses?\s+expert/i,
  /engagements?\s+qualit/i,
  /avantages?\s+tarifaires?/i,
  /tarification\b/i,
  /tarifs?\s+(nettoyage|entretien|d[eé]barras|express|complet|premium|int[eé]gr)/i,
  /nos\s+certifications?/i,
  /nos\s+engagements/i,
  /contactez/i,
  /demandez?\s+votre\s+devis/i,
  /nos\s+clients\s+t[eé]moignent/i,
  /t[eé]moignages?\s+(clients?|v[eé]rifi)/i,
];

// Meta title patterns to skip entirely
const metaTitlePatterns = [
  /^TEXTE\s+COMPLET/i,
  /^PAGE\s+/i,
  /^TEXTE\s+\d/i,
  /^VERSION\s+/i,
];

function isMetaTitle(text) {
  const clean = text.replace(/\*\*/g, '').replace(/[🎯🏠🛋️📦🏢🪣🚛🧽🔧💺🚿🏗️📋✨🔑⭐🏆✅🌟💎🚀]/gu, '').trim();
  return metaTitlePatterns.some(re => re.test(clean));
}

function isSkipHeading(text) {
  const clean = text.replace(/\*\*/g, '').trim();
  return skipPatterns.some(re => re.test(clean));
}

function isBoldSkipHeading(text) {
  const clean = text.replace(/\*\*/g, '').trim();
  return boldSkipPatterns.some(re => re.test(clean));
}

function stripMarkdown(text) {
  return text.replace(/\*\*/g, '').trim();
}

function escapeTs(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// Check if a line is a standalone **bold heading** (entire line wrapped in **)
function isStandaloneBoldHeading(trimmed) {
  // Match: **Some heading text** (possibly with trailing punctuation)
  // But NOT: **Bold start**, then more text (inline bold)
  if (!trimmed.startsWith('**')) return false;
  // Find the closing **
  const endIdx = trimmed.indexOf('**', 2);
  if (endIdx === -1) return false;
  // Check if the closing ** is at or near the end of the line
  const afterBold = trimmed.substring(endIdx + 2).trim();
  // Allow empty, or very short trailing text like ":" or ","
  return afterBold.length <= 2;
}

function extractBoldHeadingText(trimmed) {
  const match = trimmed.match(/^\*\*(.+?)\*\*/);
  return match ? match[1].trim() : trimmed.replace(/\*\*/g, '').trim();
}

// Check if a line contains a price (€)
function isPriceLine(trimmed) {
  return /\d+\s*€/.test(trimmed);
}

function parseService(serviceLines) {
  const blocks = [];
  let currentBlock = null;
  let skipMode = false;
  let metaPhase = true; // Still in the meta/title phase at the start

  for (let i = 0; i < serviceLines.length; i++) {
    const line = serviceLines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Skip the service name line (    - ServiceName)
    if (/^\s{2,}-\s+\w/.test(line) && metaPhase) continue;

    // Skip --- separators
    if (/^-{3,}$/.test(trimmed)) continue;

    // H1 heading (# ...) - skip meta titles, actual titles
    if (/^#\s+[^#]/.test(trimmed) && !trimmed.startsWith('##')) {
      // Always skip # headings — they are page titles or meta titles
      continue;
    }

    // H2 heading (## ...)
    if (/^##\s+[^#]/.test(trimmed) && !trimmed.startsWith('###')) {
      const rawHeading = trimmed.replace(/^##\s+/, '');
      const headingText = stripMarkdown(rawHeading);

      // Skip meta titles (## **📋 TEXTE 2 : ...** or ## **NETTOYAGE DE...**)
      if (metaPhase && isMetaTitle(headingText)) {
        continue;
      }

      // First ## after meta phase: this is the "main content subtitle"
      // Check if it's actually content (has paragraphs after it)
      if (metaPhase) {
        metaPhase = false;
        // If this heading is a skip heading, skip it
        if (isSkipHeading(headingText)) {
          skipMode = true;
          continue;
        }
        // This IS the start of content
        skipMode = false;
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = {
          heading: headingText,
          headingLevel: 2,
          paragraphs: [],
        };
        continue;
      }

      // Check if we need to exit skip mode
      if (skipMode) {
        if (!isSkipHeading(headingText)) {
          skipMode = false;
        } else {
          continue;
        }
      }

      // Check if this heading starts a skip section
      if (isSkipHeading(headingText)) {
        skipMode = true;
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        continue;
      }

      // Regular content heading
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        heading: headingText,
        headingLevel: 2,
        paragraphs: [],
      };
      continue;
    }

    // H3 heading (### ...)
    if (/^###\s+/.test(trimmed)) {
      const headingText = stripMarkdown(trimmed.replace(/^###\s+/, ''));

      if (skipMode) continue; // Stay in skip mode for H3 sub-headings

      if (metaPhase) metaPhase = false;

      // Check if this heading starts a skip section
      if (isSkipHeading(headingText)) {
        skipMode = true;
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        continue;
      }

      // Regular content heading
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        heading: headingText,
        headingLevel: 3,
        paragraphs: [],
      };
      continue;
    }

    // Standalone **bold heading** (for services that use bold instead of ##/###)
    if (isStandaloneBoldHeading(trimmed)) {
      const headingText = extractBoldHeadingText(trimmed);

      // Skip meta bold titles during meta phase
      if (metaPhase) {
        if (isMetaTitle(headingText)) continue;
        // First bold heading: this is the service title/subtitle
        // Treat it as content start (include it as a ContentBlock)
        metaPhase = false;
      }

      if (skipMode) {
        // Check if this bold heading is a skip heading
        if (isBoldSkipHeading(headingText)) continue;
        // Could be a sub-heading within skip section
        continue;
      }

      // Check if this bold heading starts a skip section
      if (isBoldSkipHeading(headingText)) {
        skipMode = true;
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
        continue;
      }

      // Regular content bold heading — treat as H3
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        heading: headingText,
        headingLevel: 3,
        paragraphs: [],
      };
      continue;
    }

    // If we're in skip mode, skip everything
    if (skipMode) continue;

    // If still in meta phase, check if this is a content paragraph
    if (metaPhase) {
      // Still looking for first heading — skip paragraphs before content starts
      continue;
    }

    // List item (- text or - **text**)
    if (/^\s*-\s+/.test(trimmed)) {
      const itemText = stripMarkdown(trimmed.replace(/^\s*-\s+/, ''));
      // Skip price list items
      if (isPriceLine(trimmed)) continue;
      if (currentBlock && itemText.length > 3) {
        if (!currentBlock.listItems) {
          currentBlock.listItems = [];
        }
        currentBlock.listItems.push(itemText);
      }
      continue;
    }

    // Paragraph (any other non-empty text longer than 20 chars)
    const cleanText = stripMarkdown(trimmed);
    // Skip price lines
    if (isPriceLine(trimmed)) continue;
    if (currentBlock && cleanText.length > 20) {
      currentBlock.paragraphs.push(cleanText);
    }
  }

  // Save last block
  if (currentBlock && !skipMode) {
    blocks.push(currentBlock);
  }

  return blocks;
}

// Process all services
const results = {};
for (const { slug, start, end } of serviceMap) {
  const serviceLines = lines.slice(start - 1, end - 1);
  results[slug] = parseService(serviceLines);
}

// Generate TypeScript output
let output = `import type { ContentBlock } from '@/types';\n\n`;
output += `// Auto-generated from content/raw/- ROUEN\n`;
output += `// Do not edit manually — regenerate with: node scripts/parse-content.js\n\n`;
output += `export const serviceSections: Record<string, ContentBlock[]> = {\n`;

for (const [slug, blocks] of Object.entries(results)) {
  output += `  '${slug}': [\n`;
  for (const block of blocks) {
    output += `    {\n`;
    output += `      heading: '${escapeTs(block.heading)}',\n`;
    output += `      headingLevel: ${block.headingLevel},\n`;
    output += `      paragraphs: [\n`;
    for (const p of block.paragraphs) {
      output += `        '${escapeTs(p)}',\n`;
    }
    output += `      ],\n`;
    if (block.listItems && block.listItems.length > 0) {
      output += `      listItems: [\n`;
      for (const li of block.listItems) {
        output += `        '${escapeTs(li)}',\n`;
      }
      output += `      ],\n`;
    }
    output += `    },\n`;
  }
  output += `  ],\n\n`;
}

output += `};\n`;

// Write output
const outPath = path.join(__dirname, '..', 'content', 'rouen-sections.ts');
fs.writeFileSync(outPath, output, 'utf-8');

// Print summary
console.log('Generated content/rouen-sections.ts');
console.log('');
console.log('Service content blocks:');
let totalBlocks = 0;
for (const [slug, blocks] of Object.entries(results)) {
  const paragraphs = blocks.reduce((sum, b) => sum + b.paragraphs.length, 0);
  const lists = blocks.reduce((sum, b) => sum + (b.listItems ? b.listItems.length : 0), 0);
  console.log(`  ${slug}: ${blocks.length} blocks, ${paragraphs} paragraphs, ${lists} list items`);
  totalBlocks += blocks.length;
}
console.log(`\nTotal: ${totalBlocks} content blocks across ${Object.keys(results).length} services`);
