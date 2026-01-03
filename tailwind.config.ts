import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        surface: {
          dark: '#0f0f11',
          darker: '#09090b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1rem + 1.25vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)',
        'fluid-5xl': 'clamp(3rem, 2rem + 5vw, 4.5rem)',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08)',
        'elevation-3': '0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'elevation-4': '0 8px 16px rgba(0, 0, 0, 0.04), 0 16px 32px rgba(0, 0, 0, 0.08)',
        'glow-primary': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-primary-lg': '0 0 60px rgba(99, 102, 241, 0.4)',
      },
      borderRadius: {
        'pill': '9999px',
        '4xl': '2rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'spin-slow': 'spin-slow 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'conic-primary': 'conic-gradient(from 0deg, #6366f1, #818cf8, #a5b4fc, #6366f1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
