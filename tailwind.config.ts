import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F62FE',
        accent: '#FF6B2B',
        success: '#24A148',
        error: '#DA1E28',
        warning: '#F1C21B',
        
        // Theme-dependent semantic colors using CSS variables
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surface2: 'var(--color-surface2)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',

        // Raw dark design tokens
        dark: {
          bg: '#0A0A0F',
          surface: '#13131A',
          surface2: '#1C1C27',
          border: '#2A2A3A',
          text: '#FFFFFF',
          muted: '#8B8BA7',
        },
        // Raw light design tokens
        light: {
          bg: '#F4F5F7',
          surface: '#FFFFFF',
          surface2: '#EEF0F5',
          border: '#D8DAE5',
          text: '#0D0D14',
          muted: '#6B6B85',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out style
      },
    },
  },
  plugins: [],
} satisfies Config;
