import Link from 'next/link';
import type { ButtonProps } from '@/types';

const variants = {
  primary:
    'bg-proclean-blue text-white hover:bg-proclean-blue/90 active:bg-proclean-blue/80 shadow-md hover:shadow-lg',
  secondary:
    'bg-proclean-green text-white hover:bg-proclean-green/90 active:bg-proclean-green/80 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-proclean-blue text-proclean-blue hover:bg-proclean-blue/5 active:bg-proclean-blue/10 dark:border-proclean-blue-light dark:text-proclean-blue-light',
  ghost:
    'text-proclean-blue hover:bg-proclean-blue/5 active:bg-proclean-blue/10 dark:text-proclean-blue-light',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  type = 'button',
  onClick,
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-proclean-blue focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
