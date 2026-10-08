import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Lightbulb, Scale, Sparkles } from 'lucide-react';
import { versusTopics } from '../data/versus';
import { findUIItemById } from '../data/uiItems';
import type { VersusTopic } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { PreviewGlyph } from '../components/dictionary/MiniPreview';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function VersusPage() {
  useDocumentTitle('헷갈리는 UI 구분하기');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  }, [location.hash]);

  return (
    <div>
      <PageHeader
        eyebrow="Versus"
        Icon={Scale}
        title="헷갈리는 UI 구분하기"
        description={`이름도 모양도 비슷한 UI, 같은 기준으로 나란히 놓고 비교해 보세요. ${versusTopics.length}가지 주제가 있어요.`}
      />

      <nav aria-label="비교 주제 목차" className="scrollbar-none -mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          {versusTopics.map((topic) => (
            <li key={topic.id} className="shrink-0">
              <a href={`#/versus#${topic.slug}`} className="pill min-h-9 text-xs">
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-8">
        {versusTopics.map((topic) => (
          <VersusSection key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

function VersusSection({ topic }: { topic: VersusTopic }) {
  const items = topic.uiIds.map((id) => findUIItemById(id));
  const headingId = `versus-${topic.slug}-title`;

  return (
    <section id={topic.slug} aria-labelledby={headingId} className="surface-card scroll-mt-20 p-5 sm:p-6">
      <p className="text-sm font-medium text-primary-strong">{topic.question}</p>
      <h2 id={headingId} className="mt-1 text-xl font-bold">
        {topic.title}
      </h2>

      {/* 비교 대상 요소의 도식. 눌러서 각 사전 항목으로 이동합니다. */}
      <ul className={`mt-4 grid gap-2 sm:gap-3 ${items.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {items.map(
          (item) =>
            item && (
              <li key={item.id}>
                <Link
                  to={`/ui/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-background transition-colors hover:border-primary"
                >
                  <span aria-hidden="true" className="flex h-20 items-center justify-center overflow-hidden px-1 sm:h-24 sm:px-2">
                    <span className="scale-[0.5] sm:scale-[0.8]">
                      <PreviewGlyph demoType={item.demoType} category={item.category} />
                    </span>
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-2 border-t border-line bg-surface px-2.5 py-2 sm:px-3 sm:py-2.5">
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold leading-snug sm:text-sm">{item.koreanName}</span>
                      <span className="block truncate text-xs text-muted">{item.englishName}</span>
                    </span>
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 sm:block text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary-strong"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ),
        )}
      </ul>

      {/* 넓은 화면: 기준별 비교표 */}
      <div className="mt-5 hidden overflow-hidden rounded-card border border-line md:block">
        <table className="w-full table-fixed text-left text-sm">
          <caption className="sr-only">{topic.title} 비교표</caption>
          <thead className="bg-background">
            <tr>
              <th scope="col" className="w-36 px-4 py-2.5 text-xs font-semibold text-muted">
                기준
              </th>
              {items.map((item, index) => (
                <th key={topic.uiIds[index]} scope="col" className="px-4 py-2.5 font-bold">
                  {item?.koreanName ?? topic.uiIds[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topic.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="px-4 py-3 align-top text-xs font-semibold text-muted">
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td key={topic.uiIds[index]} className="px-4 py-3 align-top leading-relaxed">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 좁은 화면: 요소별 카드로 세로 배치 */}
      <div className="mt-5 space-y-3 md:hidden">
        {items.map((item, index) => (
          <dl key={topic.uiIds[index]} className="rounded-card border border-line bg-background p-4">
            <p className="text-sm font-bold">{item?.koreanName}</p>
            {topic.rows.map((row) => (
              <div key={row.label} className="mt-2 grid grid-cols-[6.5rem_1fr] gap-2 text-sm">
                <dt className="text-xs font-semibold leading-5 text-muted">{row.label}</dt>
                <dd className="leading-relaxed">{row.values[index]}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <p className="tone-green flex gap-2.5 rounded-card bg-tone p-4 text-sm leading-relaxed text-tone-fg">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-bold">한 줄 정리 · </strong>
            {topic.rule}
          </span>
        </p>
        <p className="tone-violet flex gap-2.5 rounded-card bg-tone p-4 text-sm leading-relaxed text-tone-fg">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-bold">프롬프트 팁 · </strong>
            {topic.promptTip}
          </span>
        </p>
      </div>
    </section>
  );
}
