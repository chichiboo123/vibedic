import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowRight, CheckCircle2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { findUXPatternBySlug } from '../data/uxPatterns';
import { findServiceById } from '../data/services';
import { uxCategoryById } from '../data/categories';
import { DeviceTabs } from '../components/device/DeviceTabs';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { SaveButton } from '../components/common/SaveButton';
import { CopyPromptButton } from '../components/common/CopyPromptButton';
import { ServiceBadge } from '../components/dictionary/ServiceCard';
import { addRecentItem } from '../hooks/useRecentItems';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function UXDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pattern = slug ? findUXPatternBySlug(slug) : undefined;

  useDocumentTitle(pattern ? `${pattern.koreanName} ${pattern.englishName}` : undefined);

  useEffect(() => {
    if (pattern) addRecentItem('ux', pattern.id);
  }, [pattern]);

  if (!pattern) return <NotFoundPage />;

  const category = uxCategoryById(pattern.category);

  return (
    <article className="mx-auto max-w-3xl">
      <nav aria-label="현재 위치" className="text-xs text-muted">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/ux" className="hover:text-ink">UX 패턴</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to={`/ux?category=${pattern.category}`} className="hover:text-ink">
              {category.name}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">
            {pattern.koreanName}
          </li>
        </ol>
      </nav>

      <header className="mt-5">
        <p className="text-sm font-medium text-primary-strong">“{pattern.userGoal}”</p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{pattern.koreanName}</h1>
            <p className="mt-0.5 text-lg font-medium text-muted">{pattern.englishName}</p>
          </div>
          <SaveButton type="ux" id={pattern.id} name={pattern.koreanName} withLabel />
        </div>
        <p className="mt-3 text-base leading-relaxed">{pattern.summary}</p>
      </header>

      <Section title="대표 흐름">
        <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {pattern.flowSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-2 sm:gap-2">
              <span className="flex min-h-11 items-center gap-2 rounded-card border border-line bg-surface px-3.5 text-sm font-medium">
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-strong"
                >
                  {index + 1}
                </span>
                {step}
              </span>
              {index < pattern.flowSteps.length - 1 && (
                <>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted sm:block" aria-hidden="true" />
                  <ArrowDown className="ml-4 h-4 w-4 shrink-0 text-muted sm:hidden" aria-hidden="true" />
                </>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="사용되는 UI 요소">
        <RelatedUICards ids={pattern.relatedUiIds} />
      </Section>

      <Section title="유명 서비스 사례">
        <ul className="space-y-3">
          {pattern.serviceExamples.map((example) => {
            const service = findServiceById(example.serviceId);
            return (
              <li key={example.title} className="flex gap-3 rounded-card border border-line bg-surface p-4">
                {service && <ServiceBadge name={service.name} id={service.id} />}
                <div>
                  <p className="text-sm font-semibold">
                    {service ? (
                      <Link to={`/services/${service.slug}`} className="hover:text-primary-strong hover:underline">
                        {example.title}
                      </Link>
                    ) : (
                      example.title
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{example.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {(pattern.badExperience || pattern.betterExperience) && (
        <Section title="더 나은 경험">
          <div className="grid gap-3 sm:grid-cols-2">
            {pattern.badExperience && (
              <div className="rounded-card border border-line bg-surface p-4">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-warning">
                  <ThumbsDown className="h-4 w-4" aria-hidden="true" /> 아쉬운 방식
                </h3>
                <p className="mt-2 text-sm text-muted">{pattern.badExperience}</p>
              </div>
            )}
            {pattern.betterExperience && (
              <div className="rounded-card border border-primary/40 bg-primary-soft/40 p-4">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-success">
                  <ThumbsUp className="h-4 w-4" aria-hidden="true" /> 더 나은 방식
                </h3>
                <p className="mt-2 text-sm">{pattern.betterExperience}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section title="기기별 차이">
        <DeviceTabs notes={pattern.deviceNotes} />
      </Section>

      {pattern.relatedUxIds && pattern.relatedUxIds.length > 0 && (
        <Section title="관련 UX 패턴">
          <RelatedUXCards ids={pattern.relatedUxIds} />
        </Section>
      )}

      <Section title="내 웹앱에 적용하기">
        <div className="rounded-card border border-line bg-surface p-4">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-background p-4 font-mono text-sm leading-relaxed">
            {pattern.vibePrompt}
          </pre>
          <div className="mt-3">
            <CopyPromptButton text={pattern.vibePrompt} />
          </div>
        </div>
      </Section>

      <Section title="점검하기">
        <ul className="space-y-2">
          {pattern.checklist.slice(0, 5).map((check) => (
            <li key={check} className="flex items-start gap-2 rounded-card border border-line bg-surface px-4 py-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {check}
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}
