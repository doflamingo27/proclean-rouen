import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0A2540',
        'proclean-blue': '#2196F3',
        'proclean-blue-light': '#64B5F6',
        'proclean-green': '#8BC34A',
        'gray-bg': '#F5F7FA',
        'gray-text': '#4B5563',
        'gray-border': '#E5E7EB',
        'dark-bg': '#0B1426',
        'dark-bg-secondary': '#0E1C33',
        'dark-text': '#F1F5F9',
        'dark-text-secondary': '#94A3B8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #EAF3FF 0%, #F7FBFF 45%, #EAF6FF 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0B1426 0%, #0E1C33 100%)',
        'cta-gradient': 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
        blob: 'radial-gradient(60% 60% at 30% 20%, rgba(33,150,243,0.22) 0%, rgba(139,195,74,0.18) 45%, rgba(255,255,255,0) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
