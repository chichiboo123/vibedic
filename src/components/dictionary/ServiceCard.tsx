import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    <article className="group relative flex gap-3 rounded-card border border-line bg-surface p-4 shadow-card transition-shadow hover:shadow-raised">
      <ServiceBadge name={service.name} id={service.id} />
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-1.5 text-base font-bold">
          <Link
            to={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {service.name}
          </Link>
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{service.summary}</p>
        <p className="mt-2 text-xs text-muted">
          UI {service.relatedUiIds.length}개 · UX {service.relatedUxIds.length}개 연결
        </p>
      </div>
    </article>
  );
}
