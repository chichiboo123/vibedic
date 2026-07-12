import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'vibedic:theme';
const THEME_COLOR: Record<Theme, string> = { light: '#6366f1', dark: '#12141c' };

function syncThemeColorMeta(next: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
}

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readInitialTheme(): Theme {
  // index.html의 인라인 스크립트가 첫 렌더 전에 data-theme를 이미 정해 둡니다.
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return readStoredTheme() ?? getSystemTheme();
}

let theme: Theme = typeof document !== 'undefined' ? readInitialTheme() : 'light';
document.documentElement?.setAttribute('data-theme', theme);
syncThemeColorMeta(theme);
const listeners = new Set<() => void>();

function applyTheme(next: Theme) {
  theme = next;
  document.documentElement.setAttribute('data-theme', next);
  syncThemeColorMeta(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage를 쓸 수 없는 환경에서는 테마가 이번 세션 동안만 유지됩니다.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  return theme;
}

// 테스트에서 모듈 캐시를 초기화할 때 씁니다.
export function resetThemeCache() {
  theme = readInitialTheme();
  document.documentElement.setAttribute('data-theme', theme);
  syncThemeColorMeta(theme);
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // 사용자가 이 기기에서 테마를 직접 고른 적이 없다면 시스템 설정 변경을 계속 따라갑니다.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (readStoredTheme() === null) applyTheme(getSystemTheme());
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme: current, toggleTheme };
}
