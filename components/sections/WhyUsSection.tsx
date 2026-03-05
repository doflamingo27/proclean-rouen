'use client';

import type { WhyUsSectionProps } from '@/types';
import { getIcon } from '@/lib/icons';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const cardAccents = [
  { iconColor: '#64B5F6', iconBg: 'rgba(10,37,64,0.6)' },
  { iconColor: '#2196F3', iconBg: 'rgba(33,150,243,0.15)' },
  { iconColor: '#8BC34A', iconBg: 'rgba(139,195,74,0.15)' },
  { iconColor: '#64B5F6', iconBg: 'rgba(100,181,246,0.15)' },
];

export default function WhyUsSection({ items }: WhyUsSectionProps) {
  return (
    <section className="relative py-16 md:py-24 bg-navy overflow-hidden">
      {/* Blob décoratif bleu — top right */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(33,150,243,0.15), transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Blob décoratif vert — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(139,195,74,0.1), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          {/* Left: badge + H2 */}
          <div>
            <AnimateOnScroll>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-proclean-green/15 text-proclean-green mb-4">
                Nos engagements
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Pourquoi choisir
                <br />
                <span className="text-proclean-green">ProClean</span> à Rouen ?
              </h2>
            </AnimateOnScroll>
          </div>

          {/* Right: badge 530+ */}
          <AnimateOnScroll delay={0.1}>
            <div className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 text-center md:text-right shrink-0">
              <div className="text-3xl font-extrabold text-white leading-none">
                530+
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                interventions réalisées
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon);
            const accent = cardAccents[idx] || cardAccents[0];

            return (
              <AnimateOnScroll key={item.title} delay={idx * 0.1}>
                <div className="bg-white/5 border border-white/[0.08] backdrop-blur-[5px] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-proclean-green/30 transition-all duration-300">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accent.iconBg }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: accent.iconColor }}
                      />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Stat badge */}
                  {item.stat && (
                    <div className="inline-flex items-center gap-2 bg-white/[0.06] rounded-lg px-3 py-2">
                      <span
                        className="text-xl font-extrabold"
                        style={{ color: accent.iconColor }}
                      >
                        {item.stat}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.statLabel}
                      </span>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
