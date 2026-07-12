import { useCallback, useSyncExternalStore } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

const STORAGE_KEY = 'vibedic:recent-searches';
const MAX_SEARCHES = 8;

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): string[] {
  if (cache === null) {
    cache = readJSON<string[]>(STORAGE_KEY, []);
  }
  return cache;
}

function setSearches(next: string[]) {
  cache = next;
  writeJSON(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// 테스트에서 localStorage 초기화 후 캐시를 함께 비우기 위한 함수입니다.
export function resetRecentSearchesCache() {
  cache = null;
  listeners.forEach((listener) => listener());
}

export function useRecentSearches() {
  const searches = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const addSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const current = getSnapshot();
    const next = [trimmed, ...current.filter((existing) => existing !== trimmed)].slice(
      0,
      MAX_SEARCHES,
    );
    setSearches(next);
  }, []);

  const removeSearch = useCallback((term: string) => {
    setSearches(getSnapshot().filter((existing) => existing !== term));
  }, []);

  const clearSearches = useCallback(() => setSearches([]), []);

  return { searches, addSearch, removeSearch, clearSearches };
}
