import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

// 라이트·다크 모드를 전환하는 버튼입니다. 헤더에서 화면 크기와 무관하게 항상 보입니다.
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-primary-soft hover:text-primary-strong"
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
