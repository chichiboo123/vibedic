import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';
import { resetThemeCache } from '../hooks/useTheme';

function stubMatchMedia(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('dark') && prefersDark,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

beforeEach(() => {
  vi.unstubAllGlobals();
  stubMatchMedia(false);
  window.localStorage.removeItem('vibedic:theme');
  document.documentElement.removeAttribute('data-theme');
  resetThemeCache();
});

describe('다크/라이트 모드', () => {
  it('기본은 라이트 모드이고 버튼을 누르면 다크 모드로 바뀐다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    const toggle = screen.getByRole('button', { name: '다크 모드로 전환' });

    await user.click(toggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: '라이트 모드로 전환' })).toBeInTheDocument();
    expect(window.localStorage.getItem('vibedic:theme')).toBe('dark');
  });

  it('다시 누르면 라이트 모드로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '다크 모드로 전환' }));
    await user.click(screen.getByRole('button', { name: '라이트 모드로 전환' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(window.localStorage.getItem('vibedic:theme')).toBe('light');
  });

  it('저장된 다크 모드 설정이 새로고침 후에도 복원된다', () => {
    // 실제 새로고침에서는 index.html의 인라인 스크립트가 아직 실행되지 않은
    // 시점을 흉내 내기 위해 data-theme 속성 없이 localStorage 값만 남겨둡니다.
    window.localStorage.setItem('vibedic:theme', 'dark');
    document.documentElement.removeAttribute('data-theme');
    resetThemeCache();

    renderApp('/');
    expect(screen.getByRole('button', { name: '라이트 모드로 전환' })).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('시스템이 다크를 선호하고 저장된 값이 없으면 다크로 시작한다', () => {
    stubMatchMedia(true);
    document.documentElement.removeAttribute('data-theme');
    resetThemeCache();

    renderApp('/');
    expect(screen.getByRole('button', { name: '라이트 모드로 전환' })).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
