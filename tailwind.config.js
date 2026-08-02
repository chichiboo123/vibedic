// 색 토큰은 CSS 변수(hex)라서 그대로 두면 `bg-line/70` 같은 투명도 표기가
// 아무 규칙도 만들어 내지 못하고 조용히 사라집니다(= 배경이 아예 안 그려짐).
// 투명도가 붙었을 때만 color-mix로 섞어 주어 표기가 실제로 동작하게 합니다.
const themeColor = (variable) => ({ opacityValue } = {}) => {
  const alpha = Number(opacityValue);
  if (opacityValue === undefined || opacityValue === null || Number.isNaN(alpha)) {
    return `var(${variable})`;
  }
  return `color-mix(in srgb, var(${variable}) ${alpha * 100}%, transparent)`;
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: themeColor('--color-background'),
        surface: themeColor('--color-surface'),
        ink: themeColor('--color-text'),
        muted: themeColor('--color-text-muted'),
        primary: {
          DEFAULT: themeColor('--color-primary'),
          soft: themeColor('--color-primary-soft'),
          strong: themeColor('--color-primary-strong'),
          hover: themeColor('--color-primary-hover'),
        },
        line: themeColor('--color-border'),
        success: themeColor('--color-success'),
        warning: themeColor('--color-warning'),
        error: themeColor('--color-error'),
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
