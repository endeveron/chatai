import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      // padding: '0.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        xs: ['0.75rem', '1.25rem'],
        sm: ['0.875rem', '1.25rem'],
      },
      colors: {
        icon: 'hsl(var(--icon))',
        border: 'hsl(var(--border))',
        btnborder: 'hsl(var(--button-border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        middletone: 'hsl(var(--middletone))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        background2: 'hsl(var(--background-secondary))',
        foreground2: 'hsl(var(--foreground-secondary))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground))',
        },
        card2: {
          DEFAULT: 'hsl(var(--chat-message))',
          foreground: 'hsl(var(--chat-message-foreground))',
        },
        topbar: {
          DEFAULT: 'hsl(var(--topbar) / <alpha-value>)',
          foreground: 'hsl(var(--topbar-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
        },
        inverse: {
          DEFAULT: 'hsl(var(--inverse))',
          foreground: 'hsl(var(--inverse-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
