/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          soft: 'var(--color-primary-soft)',
          strong: 'var(--color-primary-strong)',
        },
        line: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      borderRadius: {
        card: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-sm)',
        raised: 'var(--shadow-md)',
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
};
