import type { ReactNode } from 'react';

// ============================================================
// Content types
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
}

export interface PricingItem {
  label: string;
  price: string;
}

export interface ContentBlock {
  heading: string;
  headingLevel: 2 | 3;
  paragraphs: string[];
  listItems?: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  duration?: string;
}

// ============================================================
// Homepage content
// ============================================================

export interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutContent {
  heading: string;
  subtitle: string;
  paragraph: string;
  bulletPoints: string[];
  counters: CounterItem[];
}

export interface TestimonialItem {
  name: string;
  rating: number;
  text: string;
}

export interface CTAMidContent {
  heading: string;
  ctaText: string;
  ctaHref: string;
}

export interface ServicesShowcaseItem {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface HomepageContent {
  h1: string;
  subtitle: string;
  introSection: {
    heading: string;
    paragraph: string;
  };
  whyUs: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      stat?: string;
      statLabel?: string;
    }>;
  };
  servicesOverview: {
    heading: string;
    services: Array<{
      emoji: string;
      title: string;
      description: string;
      slug: string;
    }>;
  };
  zone: {
    heading: string;
    paragraph: string;
    cities: string[];
    paymentMethods: string;
  };
  faq: FAQItem[];
  about?: AboutContent;
  testimonials?: TestimonialItem[];
  ctaMid?: CTAMidContent;
  servicesShowcase?: {
    heading: string;
    subtitle?: string;
    services: ServicesShowcaseItem[];
  };
}

// ============================================================
// Category page content
// ============================================================

export interface CategoryPageContent {
  h1: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  introText: string;
}

// ============================================================
// Service page content
// ============================================================

export interface ServicePageContent {
  slug: string;
  h1: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
  sections: ContentBlock[];
  process?: ProcessStep[];
  pricing?: PricingItem[];
  testimonials?: Testimonial[];
  zone: {
    paragraph: string;
    cities: string[];
    paymentMethods: string;
  };
  faq: FAQItem[];
  relatedSlugs: string[];
}

export interface RouenContent {
  homepage: HomepageContent;
  services: Record<string, ServicePageContent>;
  categories: Record<string, CategoryPageContent>;
}

// ============================================================
// Service definition
// ============================================================

export type ServiceCategory = 'particuliers' | 'professionnels' | 'tissus';

export interface ServiceDefinition {
  slug: string;
  title: string;
  shortDescription: string;
  category: ServiceCategory;
  icon: string;
  priority: number;
  heroImage?: string;
  contentImage?: string;
}

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCategory {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavigationConfig {
  mainMenu: NavCategory[];
  ctaButton: NavLink;
}

// ============================================================
// Site config
// ============================================================

export interface SiteConfig {
  name: string;
  legalName: string;
  slogan: string;
  domain: string;
  url: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
  siret: string;
  paymentMethods: string[];
  city: string;
  department: string;
  departmentCode: string;
}

// ============================================================
// Template props
// ============================================================

export interface ServicePageTemplateProps {
  service: ServiceDefinition;
  content: ServicePageContent;
  relatedServices: ServiceDefinition[];
}

// ============================================================
// Contact form
// ============================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  prestations: string[];
  prestationAutre: string;
  typeLocal: string;
  surface: string;
  frequence: string;
  date: string;
  creneau: string;
  commentaires: string;
  rgpd: boolean;
  honeypot: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ============================================================
// Component props
// ============================================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
  children?: ReactNode;
}

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: 'homepage' | 'service';
  heroImage?: string;
}

export interface ServicesGridProps {
  heading: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
    href: string;
    tag?: string;
  }>;
}

export interface WhyUsSectionProps {
  heading: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
    stat?: string;
    statLabel?: string;
  }>;
}

export interface FAQSectionProps {
  heading?: string;
  items: FAQItem[];
  includeSchema?: boolean;
}

export interface CTASectionProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  phone?: string;
}

export interface ZoneInterventionSectionProps {
  heading?: string;
  paragraph: string;
  cities: string[];
  paymentMethods?: string;
}

export interface AboutSectionProps {
  content: AboutContent;
}

export interface ServicesShowcaseProps {
  heading: string;
  subtitle?: string;
  services: ServicesShowcaseItem[];
}

export interface CTAMidSectionProps {
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface TestimonialsCarouselProps {
  heading?: string;
  testimonials: TestimonialItem[];
}
