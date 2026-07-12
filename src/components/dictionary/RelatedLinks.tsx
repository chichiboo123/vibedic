import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { findUIItemById } from '../../data/uiItems';
import { findUXPatternById } from '../../data/uxPatterns';

export function RelatedUICards({ ids }: { ids: string[] }) {
  const items = ids
    .map((id) => findUIItemById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={`/ui/${item.slug}`}
            className="flex items-center justify-between gap-2 rounded-card border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-primary-soft/50"
          >
            <span>
              <span className="font-semibold">{item.koreanName}</span>
              <span className="ml-1.5 text-xs text-muted">{item.englishName}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function RelatedUXCards({ ids }: { ids: string[] }) {
  const patterns = ids
    .map((id) => findUXPatternById(id))
    .filter((pattern): pattern is NonNullable<typeof pattern> => Boolean(pattern));
  if (patterns.length === 0) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {patterns.map((pattern) => (
        <li key={pattern.id}>
          <Link
            to={`/ux/${pattern.slug}`}
            className="flex items-center justify-between gap-2 rounded-card border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-primary-soft/50"
          >
            <span>
              <span className="font-semibold">{pattern.koreanName}</span>
              <span className="ml-1.5 text-xs text-muted">{pattern.englishName}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
