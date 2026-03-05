'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { ContentBlock } from '@/types';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import FAQBentoSection from '@/components/sections/FAQBentoSection';
import { parseInlineHtml } from '@/lib/parseInlineHtml';

interface ContentSectionsProps {
  sections: ContentBlock[];
  contentImage?: string;
  contentImageAlt?: string;
}

interface FAQBentoData {
  title: string;
  items: { question: string; answer: string }[];
}

type RenderItem =
  | { type: 'content'; block: ContentBlock; originalIndex: number }
  | { type: 'faq-bento'; data: FAQBentoData };

function isFAQHeading(heading: string): boolean {
  const lower = heading.toLowerCase();
  return lower.includes('foire') && lower.includes('questions');
}

function parseFAQParagraph(text: string): { question: string; answer: string } {
  // Pattern B: "Question text? Answer text."
  // Handle both regular space and non-breaking space (\u00A0) after ?
  const match = text.match(/\?\s/);
  if (match && match.index !== undefined) {
    return {
      question: text.slice(0, match.index + 1),
      answer: text.slice(match.index + 2).trim(),
    };
  }
  return { question: text, answer: '' };
}

function buildRenderItems(sections: ContentBlock[]): RenderItem[] {
  const items: RenderItem[] = [];
  let i = 0;

  while (i < sections.length) {
    const block = sections[i];

    if (isFAQHeading(block.heading)) {
      // Pattern A: Title block with empty paragraphs, followed by numbered Q&A blocks
      if (block.paragraphs.length === 0) {
        const faqItems: { question: string; answer: string }[] = [];
        let j = i + 1;
        while (j < sections.length && faqItems.length < 6) {
          const next = sections[j];
          // Numbered blocks: "1. ...", "2. ...", etc.
          if (/^\d+\.\s/.test(next.heading)) {
            faqItems.push({
              question: next.heading.replace(/^\d+\.\s*/, ''),
              answer: next.paragraphs.join(' '),
            });
            j++;
          } else {
            break;
          }
        }
        if (faqItems.length > 0) {
          items.push({
            type: 'faq-bento',
            data: { title: block.heading, items: faqItems },
          });
          i = j;
          continue;
        }
      }

      // Pattern B: Single block with Q&A in paragraphs
      if (block.paragraphs.length > 0) {
        const faqItems = block.paragraphs.map(parseFAQParagraph);
        items.push({
          type: 'faq-bento',
          data: { title: block.heading.replace(/^❓\s*/, ''), items: faqItems },
        });
        i++;
        continue;
      }
    }

    items.push({ type: 'content', block, originalIndex: i });
    i++;
  }

  return items;
}

export default function ContentSections({ sections, contentImage, contentImageAlt }: ContentSectionsProps) {
  if (sections.length === 0) return null;

  const renderItems = buildRenderItems(sections);
  const imageInsertIndex = 1;

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container-main max-w-4xl">
          {renderItems.map((item, idx) => {
            if (item.type === 'faq-bento') {
              return null; // Rendered outside this section
            }

            const { block, originalIndex } = item;
            const Tag = block.headingLevel === 2 ? 'h2' : 'h3';
            const headingClass =
              block.headingLevel === 2
                ? 'font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy dark:text-dark-text tracking-tight'
                : 'font-display text-xl sm:text-2xl font-semibold text-navy dark:text-dark-text';

            return (
              <AnimateOnScroll key={idx} className={idx > 0 ? 'mt-12' : ''}>
                {/* Image flottante inseree au milieu du contenu */}
                {contentImage && originalIndex === imageInsertIndex && (
                  <div className="mb-4 w-full md:float-left md:w-[45%] md:mr-5 md:mb-2">
                    <Image
                      src={contentImage}
                      alt={contentImageAlt || 'ProClean Rouen - Service professionnel'}
                      width={600}
                      height={800}
                      className="w-full h-auto rounded-xl"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                )}
                <Tag className={headingClass}>{block.heading}</Tag>
                {block.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="mt-4 text-base text-gray-text dark:text-dark-text-secondary leading-relaxed"
                  >
                    {parseInlineHtml(p)}
                  </p>
                ))}
                {block.listItems && block.listItems.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {block.listItems.map((li, liIdx) => (
                      <li
                        key={liIdx}
                        className="flex items-start gap-3 text-gray-text dark:text-dark-text-secondary"
                      >
                        <Check className="w-5 h-5 text-proclean-green shrink-0 mt-0.5" />
                        <span>{parseInlineHtml(li)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </AnimateOnScroll>
            );
          })}
        </div>
      </section>

      {/* FAQ Bento sections rendered full-width outside the max-w-4xl container */}
      {renderItems
        .filter((item): item is Extract<RenderItem, { type: 'faq-bento' }> => item.type === 'faq-bento')
        .map((item, idx) => (
          <FAQBentoSection
            key={`faq-bento-${idx}`}
            title={item.data.title}
            items={item.data.items}
          />
        ))}
    </>
  );
}
