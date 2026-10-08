import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../../types';
import { ServiceLogo, type ServiceLogoSize } from './ServiceLogo';

export function ServiceBadge({
  name,
  id,
  size = 'md',
}: {
  name: string;
  id: string;
  size?: ServiceLogoSize;
}) {
  return <ServiceLogo serviceId={id} serviceName={name} size={size} />;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    // 카드 전체가 링크입니다. 아이콘·설명 어디를 눌러도 상세로 들어갑니다.
    <article className="spotlight group relative flex gap-3.5 rounded-[1.25rem] border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised">
      <ServiceBadge name={service.name} id={service.id} />
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-1.5 text-base font-bold">
          <Link
            to={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {service.name}
          </Link>
          <ArrowUpRight
            className="ml-auto h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{service.summary}</p>
        <p className="mt-3 font-mono text-[11px] text-muted">
          UI {service.relatedUiIds.length} · UX {service.relatedUxIds.length}
        </p>
      </div>
    </article>
  );
}
