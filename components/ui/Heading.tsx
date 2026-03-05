import type { HeadingProps } from '@/types';

const headingStyles = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
};

export default function Heading({
  as: Tag = 'h2',
  children,
  className = '',
  subtitle,
}: HeadingProps) {
  return (
    <div className={className}>
      <Tag
        className={`font-display text-navy dark:text-dark-text ${headingStyles[Tag]}`}
      >
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-text dark:text-dark-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
