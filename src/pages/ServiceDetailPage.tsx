import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Monitor } from 'lucide-react';
import { findServiceBySlug } from '../data/services';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { ServiceBadge } from '../components/dictionary/ServiceCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? findServiceBySlug(slug) : undefined;

  useDocumentTitle(service ? service.name : undefined);

  if (!service) return <NotFoundPage />;

  return (
    <article className="mx-auto max-w-3xl">
      <nav aria-label="현재 위치" className="text-xs text-muted">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/services" className="hover:text-ink">유명 서비스</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">
            {service.name}
          </li>
        </ol>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <ServiceBadge name={service.name} id={service.id} />
        <div>
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <p className="mt-2 text-base leading-relaxed">{service.summary}</p>
          <a
            href={service.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-strong hover:underline"
          >
            공식 웹사이트 방문
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>
      </header>

      <section className="mt-10" aria-label="기기별 차이가 두드러지는 사례">
        <h2 className="mb-3 text-lg font-bold">PC·태블릿·모바일 차이가 두드러지는 사례</h2>
        <ul className="space-y-2">
          {service.deviceHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 rounded-card border border-line bg-surface px-4 py-3 text-sm">
              <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-label="참고할 UI 요소">
        <h2 className="mb-3 text-lg font-bold">참고할 UI 요소</h2>
        <RelatedUICards ids={service.relatedUiIds} />
      </section>

      <section className="mt-10" aria-label="참고할 UX 패턴">
        <h2 className="mb-3 text-lg font-bold">참고할 UX 패턴</h2>
        <RelatedUXCards ids={service.relatedUxIds} />
      </section>

      <p className="mt-10 rounded-card border border-line bg-surface p-4 text-xs leading-relaxed text-muted">
        서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로 관찰
        가능한 사례를 설명합니다.
      </p>
    </article>
  );
}
