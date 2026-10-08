import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { findUXPatternBySlug, uxPatterns } from '../data/uxPatterns';
import { findUIItemById } from '../data/uiItems';
import { uxCategoryById } from '../data/categories';
import { DeviceTabs } from '../components/device/DeviceTabs';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { uxCategoryVisuals } from '../components/dictionary/categoryVisuals';
import { SaveButton } from '../components/common/SaveButton';
import { PromptBuilder } from '../components/common/PromptBuilder';
import { ServiceExampleList } from '../components/dictionary/ServiceExampleList';
import {
  Breadcrumb,
  DetailJumpBar,
  DetailSection,
  DetailToc,
  PrevNextNav,
  ShareLinkButton,
  type TocEntry,
} from '../components/detail/DetailParts';
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
  const { Icon: CategoryIcon, tone } = uxCategoryVisuals[pattern.category];
  // 이 UX 패턴을 대표하는 UI 요소 — 사례 도식에서 강조해 보여줍니다.
  const coreUiItem = findUIItemById(pattern.relatedUiIds[0]);
  const hasExperience = Boolean(pattern.badExperience || pattern.betterExperience);
  const hasRelatedUx = Boolean(pattern.relatedUxIds && pattern.relatedUxIds.length > 0);

  const index = uxPatterns.indexOf(pattern);
  const toNeighbor = (neighbor: (typeof uxPatterns)[number] | undefined) =>
    neighbor ? { to: `/ux/${neighbor.slug}`, title: neighbor.koreanName, subtitle: neighbor.englishName } : null;

  const toc: TocEntry[] = [
    { id: 'flow', title: '대표 흐름' },
    { id: 'ui', title: '사용되는 UI 요소' },
    { id: 'examples', title: '유명 서비스 사례' },
    ...(hasExperience ? [{ id: 'better', title: '더 나은 경험' }] : []),
    { id: 'devices', title: '기기별 차이' },
    ...(hasRelatedUx ? [{ id: 'related-ux', title: '관련 UX 패턴' }] : []),
    { id: 'prompt', title: '내 웹앱에 적용하기' },
    { id: 'checklist', title: '점검하기' },
  ];

  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="min-w-0 [counter-reset:section]">
        <Breadcrumb
          items={[
            { to: '/ux', label: 'UX 패턴' },
            { to: `/ux?category=${pattern.category}`, label: category.name },
            { label: pattern.koreanName },
          ]}
        />

        <header className="mt-6 animate-fade-up border-b border-line pb-8">
          <p className={`tone-${tone} inline-flex items-center gap-1.5 rounded-full bg-tone px-2.5 py-1 text-xs font-semibold text-tone-fg`}>
            <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {category.name}
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-[2.75rem] font-extrabold leading-none tracking-[-0.045em] sm:text-6xl">{pattern.koreanName}</h1>
              <p className="mt-2 font-serif text-2xl italic text-muted sm:text-3xl">{pattern.englishName}</p>
            </div>
            <div className="flex items-center gap-2">
              <ShareLinkButton name={pattern.koreanName} />
              <SaveButton type="ux" id={pattern.id} name={pattern.koreanName} withLabel />
            </div>
          </div>
          <blockquote className="mt-6 border-l-2 border-ink pl-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            “{pattern.userGoal}”
          </blockquote>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{pattern.summary}</p>
        </header>

        <DetailJumpBar entries={toc} />

        <DetailSection id="flow" title="대표 흐름">
          <ol className="relative space-y-2">
            {pattern.flowSteps.map((step, stepIndex) => (
              <li key={step} className="flex items-stretch gap-3">
                <span className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      stepIndex === 0 ? 'bg-ink text-background' : 'bg-surface text-muted ring-1 ring-line'
                    }`}
                  >
                    {stepIndex + 1}
                  </span>
                  {stepIndex < pattern.flowSteps.length - 1 && (
                    <span aria-hidden="true" className="my-1 w-0.5 flex-1 rounded-full bg-line" />
                  )}
                </span>
                <span className="mb-2 flex min-h-12 flex-1 items-center rounded-2xl border border-line bg-surface px-4 py-2 text-[15px] font-medium">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </DetailSection>

        <DetailSection id="ui" title="사용되는 UI 요소">
          <RelatedUICards ids={pattern.relatedUiIds} />
        </DetailSection>

        <DetailSection id="examples" title="유명 서비스 사례">
          <ServiceExampleList
            examples={pattern.serviceExamples}
            demoType={coreUiItem?.demoType ?? 'static'}
            category={coreUiItem?.category ?? 'display'}
          />
        </DetailSection>

        {hasExperience && (
          <DetailSection id="better" title="더 나은 경험">
            <div className="grid gap-3 sm:grid-cols-2">
              {pattern.badExperience && (
                <div className="tone-orange rounded-card bg-tone/60 p-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-tone-fg">
                    <ThumbsDown className="h-4 w-4" aria-hidden="true" /> 아쉬운 방식
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{pattern.badExperience}</p>
                </div>
              )}
              {pattern.betterExperience && (
                <div className="tone-green rounded-card bg-tone/60 p-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-tone-fg">
                    <ThumbsUp className="h-4 w-4" aria-hidden="true" /> 더 나은 방식
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{pattern.betterExperience}</p>
                </div>
              )}
            </div>
          </DetailSection>
        )}

        <DetailSection id="devices" title="기기별 차이">
          <DeviceTabs notes={pattern.deviceNotes} />
        </DetailSection>

        {hasRelatedUx && (
          <DetailSection id="related-ux" title="관련 UX 패턴">
            <RelatedUXCards ids={pattern.relatedUxIds ?? []} />
          </DetailSection>
        )}

        <DetailSection id="prompt" title="내 웹앱에 적용하기">
          <PromptBuilder base={pattern.vibePrompt} />
        </DetailSection>

        <DetailSection id="checklist" title="점검하기">
          <ul className="space-y-2">
            {pattern.checklist.slice(0, 5).map((check) => (
              <li key={check} className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {check}
              </li>
            ))}
          </ul>
        </DetailSection>

        <PrevNextNav
          label="이전·다음 UX 패턴"
          prev={toNeighbor(uxPatterns[index - 1])}
          next={toNeighbor(uxPatterns[index + 1])}
        />
      </article>

      <aside>
        <DetailToc entries={toc} />
      </aside>
    </div>
  );
}
