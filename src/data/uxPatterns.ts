import type { UXPattern } from '../types';
import {
  findPatterns,
  enterPatterns,
  choosePatterns,
  movePatterns,
} from './ux/findEnterChooseMove';
import {
  actPatterns,
  waitPatterns,
  sharePatterns,
  startPatterns,
} from './ux/actWaitShareStart';

export const uxPatterns: UXPattern[] = [
  ...findPatterns,
  ...enterPatterns,
  ...choosePatterns,
  ...movePatterns,
  ...actPatterns,
  ...waitPatterns,
  ...sharePatterns,
  ...startPatterns,
];

const bySlug = new Map(uxPatterns.map((p) => [p.slug, p]));
const byId = new Map(uxPatterns.map((p) => [p.id, p]));

export function findUXPatternBySlug(slug: string): UXPattern | undefined {
  return bySlug.get(slug);
}

export function findUXPatternById(id: string): UXPattern | undefined {
  return byId.get(id);
}
