import { Link } from 'react-router-dom';
import type { Service } from '../../types';

const serviceColors = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
];

// eslint-disable-next-line react-refresh/only-export-components
export function serviceColorClass(serviceId: string): string {
  let hash = 0;
  for (const char of serviceId) {
    hash = (hash * 31 + char.charCodeAt(0)) % 997;
  }
  return serviceColors[hash % serviceColors.length];
}

export function ServiceBadge({ name, id }: { name: string; id: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold ${serviceColorClass(id)}`}
    >
      {name.charAt(0)}
    </span>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex gap-3 rounded-card border border-line bg-surface p-4 shadow-card transition-shadow hover:shadow-raised">
      <ServiceBadge name={service.name} id={service.id} />
      <div className="min-w-0">
        <h3 className="text-base font-bold">
          <Link
            to={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:content-[''] relative focus-visible:outline-none"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{service.summary}</p>
        <p className="mt-2 text-xs text-muted">
          UI {service.relatedUiIds.length}개 · UX {service.relatedUxIds.length}개 연결
        </p>
      </div>
    </article>
  );
}
