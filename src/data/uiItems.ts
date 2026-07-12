import type { UIItem } from '../types';
import { layoutItems } from './ui/layout';
import { navigationItems } from './ui/navigation';
import { controlItems } from './ui/control';
import { inputItems } from './ui/input';
import { displayItems } from './ui/display';
import { statusItems } from './ui/status';

export const uiItems: UIItem[] = [
  ...layoutItems,
  ...navigationItems,
  ...controlItems,
  ...inputItems,
  ...displayItems,
  ...statusItems,
];

const bySlug = new Map(uiItems.map((item) => [item.slug, item]));
const byId = new Map(uiItems.map((item) => [item.id, item]));

export function findUIItemBySlug(slug: string): UIItem | undefined {
  return bySlug.get(slug);
}

export function findUIItemById(id: string): UIItem | undefined {
  return byId.get(id);
}
