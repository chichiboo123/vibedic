import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, HelpCircle, ThumbsUp } from 'lucide-react';
import { findUIItemBySlug } from '../data/uiItems';
import { uiCategoryById } from '../data/categories';
import { InteractiveDemo } from '../components/demos/InteractiveDemo';
import { DeviceTabs } from '../components/device/DeviceTabs';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { SaveButton } from '../components/common/SaveButton';
import { CopyPromptButton } from '../components/common/CopyPromptButton';
import { ServiceExampleList } from '../components/dictionary/ServiceExampleList';
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

  return (
    <article className="mx-auto max-w-3xl">
      <nav aria-label="현재 위치" className="text-xs text-muted">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/ui" className="hover:text-ink">UI 요소</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to={`/ui?category=${item.category}`} className="hover:text-ink">
              {category.easyName}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">
            {item.koreanName}
          </li>
        </ol>
      </nav>

      <header className="mt-5">
        <p className="text-sm text-muted">{item.easyName}</p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{item.koreanName}</h1>
            <p className="mt-0.5 text-lg font-medium text-primary-strong">{item.englishName}</p>
          </div>
          <SaveButton type="ui" id={item.id} name={item.koreanName} withLabel />
        </div>
        <p className="mt-3 text-base leading-relaxed">{item.summary}</p>
        {item.aliases.length > 0 && (
          <p className="mt-2 text-sm text-muted">다른 이름: {item.aliases.join(', ')}</p>
        )}
      </header>

      <Section title="직접 살펴보기">
        <InteractiveDemo item={item} />
        {item.states && item.states.length > 0 && (
          <p className="mt-3 text-sm text-muted">주요 상태: {item.states.join(' · ')}</p>
        )}
      </Section>

      <Section title="어디에서 볼 수 있나요?">
        <ServiceExampleList
          examples={item.serviceExamples}
          demoType={item.demoType}
          category={item.category}
        />
      </Section>

      <Section title="기기에서는 어떻게 달라지나요?">
        <DeviceTabs notes={item.deviceNotes} />
      </Section>

      <Section title="언제 사용하나요?">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-success">
              <ThumbsUp className="h-4 w-4" aria-hidden="true" /> 이럴 때 좋아요
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {item.useWhen.map((text) => (
                <li key={text} className="flex gap-1.5">
                  <span aria-hidden="true">·</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-warning">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" /> 이럴 땐 피하세요
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
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
      </Section>

      {item.relatedUxIds.length > 0 && (
        <Section title="함께 알아보면 좋은 UX">
          <RelatedUXCards ids={item.relatedUxIds} />
        </Section>
      )}

      {item.relatedUiIds.length > 0 && (
        <Section title="관련 UI 요소">
          <RelatedUICards ids={item.relatedUiIds} />
        </Section>
      )}

      <Section title="내 웹앱에 적용하기">
        <div className="rounded-card border border-line bg-surface p-4">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-background p-4 font-mono text-sm leading-relaxed">
            {item.vibePrompt}
          </pre>
          <div className="mt-3">
            <CopyPromptButton text={item.vibePrompt} />
          </div>
        </div>
      </Section>

      <Section title="점검하기">
        <ul className="space-y-2">
          {item.accessibilityChecks.slice(0, 5).map((check) => (
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
