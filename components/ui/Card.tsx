import Link from 'next/link';
import type { CardProps } from '@/types';

export default function Card({
  title,
  description,
  icon,
  href,
  className = '',
  children,
}: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-proclean-blue/10 text-proclean-blue dark:bg-proclean-blue/20">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-navy dark:text-dark-text">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-gray-text dark:text-dark-text-secondary leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </>
  );

  const classes = [
    'block rounded-xl bg-white p-6 shadow-soft',
    'border border-gray-border/50',
    'transition-all duration-300 ease-out',
    'dark:bg-dark-bg-secondary dark:border-gray-border/10',
    href ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '',
    className,
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
