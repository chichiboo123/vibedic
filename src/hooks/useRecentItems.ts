import { useCallback, useSyncExternalStore } from 'react';
import type { SavedItemRef, SavedItemType } from '../types';
import { readJSON, writeJSON } from '../utils/storage';

const STORAGE_KEY = 'vibedic:recent-items';
const MAX_RECENT = 10;

let cache: SavedItemRef[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): SavedItemRef[] {
  if (cache === null) {
    cache = readJSON<SavedItemRef[]>(STORAGE_KEY, []);
  }
  return cache;
}

function setRecent(next: SavedItemRef[]) {
  cache = next;
  writeJSON(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// 테스트에서 localStorage 초기화 후 캐시를 함께 비우기 위한 함수입니다.
export function resetRecentItemsCache() {
  cache = null;
  listeners.forEach((listener) => listener());
}

export function addRecentItem(type: SavedItemType, id: string) {
  const current = getSnapshot();
  const withoutSelf = current.filter((item) => !(item.type === type && item.id === id));
  setRecent([{ type, id }, ...withoutSelf].slice(0, MAX_RECENT));
}

export function useRecentItems() {
  const recent = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const clearRecent = useCallback(() => setRecent([]), []);
  return { recent, clearRecent };
}
