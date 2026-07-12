import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { resetSavedItemsCache } from '../hooks/useSavedItems';
import { resetRecentItemsCache } from '../hooks/useRecentItems';
import { resetRecentSearchesCache } from '../hooks/useRecentSearches';

// jsdom에는 scrollTo가 구현되어 있지 않습니다.
window.scrollTo = () => {};

// jsdom에는 matchMedia가 구현되어 있지 않아 다크 모드 감지 코드가 실패합니다.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  resetSavedItemsCache();
  resetRecentItemsCache();
  resetRecentSearchesCache();
});
