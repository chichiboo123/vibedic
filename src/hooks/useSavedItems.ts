import { useCallback, useSyncExternalStore } from 'react';
import type { SavedItemRef, SavedItemType } from '../types';
import { readJSON, writeJSON } from '../utils/storage';

const STORAGE_KEY = 'vibedic:saved-items';

let cache: SavedItemRef[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): SavedItemRef[] {
  if (cache === null) {
    cache = readJSON<SavedItemRef[]>(STORAGE_KEY, []);
  }
  return cache;
}

function setSaved(next: SavedItemRef[]) {
  cache = next;
  writeJSON(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// 테스트에서 localStorage 초기화 후 캐시를 함께 비우기 위한 함수입니다.
export function resetSavedItemsCache() {
  cache = null;
  listeners.forEach((listener) => listener());
}

export function useSavedItems() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const isSaved = useCallback(
    (type: SavedItemType, id: string) => saved.some((item) => item.type === type && item.id === id),
    [saved],
  );

  const toggleSaved = useCallback(
    (type: SavedItemType, id: string) => {
      const current = getSnapshot();
      const exists = current.some((item) => item.type === type && item.id === id);
      if (exists) {
        setSaved(current.filter((item) => !(item.type === type && item.id === id)));
        return false;
      }
      setSaved([...current, { type, id }]);
      return true;
    },
    [],
  );

  const clearSaved = useCallback(() => setSaved([]), []);

  return { saved, isSaved, toggleSaved, clearSaved };
}
