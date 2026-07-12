import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { resetSavedItemsCache } from '../hooks/useSavedItems';
import { resetRecentItemsCache } from '../hooks/useRecentItems';
import { resetRecentSearchesCache } from '../hooks/useRecentSearches';

// jsdom에는 scrollTo가 구현되어 있지 않습니다.
window.scrollTo = () => {};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  resetSavedItemsCache();
  resetRecentItemsCache();
  resetRecentSearchesCache();
});
