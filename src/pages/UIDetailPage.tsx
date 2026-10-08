import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, HelpCircle, Scale, ThumbsUp } from 'lucide-react';
import { findUIItemBySlug, uiItems } from '../data/uiItems';
import { uiCategoryById } from '../data/categories';
import { versusTopics } from '../data/versus';
import { InteractiveDemo } from '../components/demos/InteractiveDemo';
import { DeviceTabs } from '../components/device/DeviceTabs';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { uiCategoryVisuals } from '../components/dictionary/categoryVisuals';
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

export function UIDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? findUIItemBySlug(slug) : undefined;

  useDocumentTitle(item ? `${item.koreanName} ${item.englishName}` : undefined);

  useEffect(() => {
    if (item) addRecentItem('ui', item.id);
  }, [item]);

  if (!item) return <NotFoundPage />;

  const category = uiCategoryById(item.category);
  const { Icon: CategoryIcon, tone } = uiCategoryVisuals[item.category];
  const relatedVersus = versusTopics.filter((topic) => topic.uiIds.includes(item.id));

  const index = uiItems.indexOf(item);
  const toNeighbor = (neighbor: (typeof uiItems)[number] | undefined) =>
    neighbor ? { to: `/ui/${neighbor.slug}`, title: neighbor.koreanName, subtitle: neighbor.englishName } : null;

  const toc: TocEntry[] = [
    { id: 'demo', title: '직접 살펴보기' },
    { id: 'examples', title: '어디에서 볼 수 있나요?' },
    { id: 'devices', title: '기기에서는 어떻게 달라지나요?' },
    { id: 'when', title: '언제 사용하나요?' },
    ...(item.relatedUxIds.length > 0 ? [{ id: 'related-ux', title: '함께 알아보면 좋은 UX' }] : []),
    ...(item.relatedUiIds.length > 0 ? [{ id: 'related-ui', title: '관련 UI 요소' }] : []),
    { id: 'prompt', title: '내 웹앱에 적용하기' },
    { id: 'checklist', title: '점검하기' },
  ];

  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="min-w-0 [counter-reset:section]">
        <Breadcrumb
          items={[
            { to: '/ui', label: 'UI 요소' },
            { to: `/ui?category=${item.category}`, label: category.easyName },
            { label: item.koreanName },
          ]}
        />

        <header className="mt-6 animate-fade-up border-b border-line pb-8">
          <p className={`tone-${tone} inline-flex items-center gap-1.5 rounded-full bg-tone px-2.5 py-1 text-xs font-semibold text-tone-fg`}>
            <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {category.easyName} · {item.easyName}
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-[2.75rem] font-extrabold leading-none tracking-[-0.045em] sm:text-6xl">{item.koreanName}</h1>
              <p className="mt-2 font-serif text-2xl italic text-muted sm:text-3xl">{item.englishName}</p>
            </div>
            <div className="flex items-center gap-2">
              <ShareLinkButton name={item.koreanName} />
              <SaveButton type="ui" id={item.id} name={item.koreanName} withLabel />
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{item.summary}</p>
          {item.aliases.length > 0 && (
            <p className="mt-2 text-sm text-muted">다른 이름: {item.aliases.join(', ')}</p>
          )}
        </header>

        <DetailJumpBar entries={toc} />

        <DetailSection id="demo" title="직접 살펴보기">
          <InteractiveDemo item={item} />
          {item.states && item.states.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <span className="font-medium">주요 상태</span>
              {item.states.map((state) => (
                <span key={state} className="rounded-full bg-background px-2.5 py-0.5 text-xs ring-1 ring-line">
                  {state}
                </span>
              ))}
            </div>
          )}
        </DetailSection>

        <DetailSection id="examples" title="어디에서 볼 수 있나요?">
          <ServiceExampleList examples={item.serviceExamples} demoType={item.demoType} category={item.category} />
        </DetailSection>

        <DetailSection id="devices" title="기기에서는 어떻게 달라지나요?">
          <DeviceTabs notes={item.deviceNotes} />
        </DetailSection>

        <DetailSection id="when" title="언제 사용하나요?">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="tone-green rounded-card bg-tone/60 p-4">
              <h3 className="flex items-center gap-1.5 text-sm font-bold text-tone-fg">
                <ThumbsUp className="h-4 w-4" aria-hidden="true" /> 이럴 때 좋아요
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {item.useWhen.map((text) => (
                  <li key={text} className="flex gap-1.5">
                    <span aria-hidden="true">·</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tone-orange rounded-card bg-tone/60 p-4">
              <h3 className="flex items-center gap-1.5 text-sm font-bold text-tone-fg">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" /> 이럴 땐 피하세요
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {item.avoidWhen.map((text) => (
                  <li key={text} className="flex gap-1.5">
                    <span aria-hidden="true">·</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {item.confusedWith && (
            <div className="mt-3 flex gap-2 rounded-card border border-line bg-primary-soft/50 p-4 text-sm">
              <HelpCircle className="h-4 w-4 shrink-0 text-primary-strong" aria-hidden="true" />
              <p>
                <strong className="font-semibold">자주 혼동해요:</strong> {item.confusedWith}
              </p>
            </div>
          )}
          {relatedVersus.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedVersus.map((topic) => (
                <li key={topic.id}>
                  <Link to={`/versus#${topic.slug}`} className="pill text-ink">
                    <Scale className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    {topic.title} 비교표 보기
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </DetailSection>

        {item.relatedUxIds.length > 0 && (
          <DetailSection id="related-ux" title="함께 알아보면 좋은 UX">
            <RelatedUXCards ids={item.relatedUxIds} />
          </DetailSection>
        )}

        {item.relatedUiIds.length > 0 && (
          <DetailSection id="related-ui" title="관련 UI 요소">
            <RelatedUICards ids={item.relatedUiIds} />
          </DetailSection>
        )}

        <DetailSection id="prompt" title="내 웹앱에 적용하기">
          <PromptBuilder base={item.vibePrompt} />
        </DetailSection>

        <DetailSection id="checklist" title="점검하기">
          <ul className="space-y-2">
            {item.accessibilityChecks.slice(0, 5).map((check) => (
              <li key={check} className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {check}
              </li>
            ))}
          </ul>
        </DetailSection>

        <PrevNextNav label="이전·다음 UI 요소" prev={toNeighbor(uiItems[index - 1])} next={toNeighbor(uiItems[index + 1])} />
      </article>

      <aside>
        <DetailToc entries={toc} />
      </aside>
    </div>
  );
}
