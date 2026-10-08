import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, NotebookPen, Route, Scale, Search, Sparkles, Sun } from 'lucide-react';
import { findUIItemById, findUIItemBySlug, uiItems } from '../data/uiItems';
import { findUXPatternById, uxPatterns } from '../data/uxPatterns';
import { services } from '../data/services';
import { deviceComparisons } from '../data/deviceComparisons';
import { versusTopics } from '../data/versus';
import { uiCategories } from '../data/categories';
import type { UIItem } from '../types';
import { UIItemCard } from '../components/dictionary/UIItemCard';
import { UXPatternCard } from '../components/dictionary/UXPatternCard';
import { ServiceCard } from '../components/dictionary/ServiceCard';
import { PreviewGlyph } from '../components/dictionary/MiniPreview';
import { uiCategoryVisuals } from '../components/dictionary/categoryVisuals';
import { useRecentItems } from '../hooks/useRecentItems';
import { useSavedItems } from '../hooks/useSavedItems';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const suggestedTerms = ['버튼', '검색창', '모달', '하단 내비게이션', '자동 저장', '필터', '무한 스크롤'];

// 히어로 오른쪽에 띄우는 도식 콜라주. 실제 사전 항목의 썸네일을 그대로 씁니다.
const collageSlugs = ['toggle-switch', 'toast', 'tab', 'search-field', 'progress-bar', 'chip'];

// 날짜마다 바뀌는 "오늘의 UI". 같은 날에는 누가 들어와도 같은 항목이 나옵니다.
function pickTodayItem(date = new Date()): UIItem {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  return uiItems[dayNumber % uiItems.length];
}

export function HomePage() {
  useDocumentTitle();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { recent } = useRecentItems();
  const { saved } = useSavedItems();

  const featuredUI = uiItems.filter((item) => item.featured).slice(0, 4);
  const featuredUX = uxPatterns.filter((pattern) => pattern.featured).slice(0, 3);
  const featuredServices = services.slice(0, 4);
  const featuredComparisons = deviceComparisons.slice(0, 3);
  const featuredVersus = versusTopics.slice(0, 3);
  const todayItem = pickTodayItem();
  const collageItems = collageSlugs
    .map((slug) => findUIItemBySlug(slug))
    .filter((item): item is UIItem => Boolean(item));

  const toEntries = (refs: typeof recent) =>
    refs
      .map((ref) =>
        ref.type === 'ui'
          ? { ref, item: findUIItemById(ref.id) }
          : { ref, item: findUXPatternById(ref.id) },
      )
      .filter((entry) => entry.item)
      .slice(0, 6);
  const recentEntries = toEntries(recent);
  const savedEntries = toEntries(saved);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <div className="space-y-16">
      <section className="hero-glow relative overflow-hidden rounded-[1.5rem] border border-line px-5 py-12 sm:px-10 sm:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-semibold text-primary-strong">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              UI {uiItems.length} · UX {uxPatterns.length} · 구분 {versusTopics.length}가지
            </p>
            <h1 className="mt-4 text-[1.75rem] font-extrabold leading-snug tracking-tight sm:text-4xl">
              필요할 때 꺼내 찾는
              <br />
              <span className="bg-gradient-to-r from-primary-strong to-primary bg-clip-text text-transparent">
                바이브코딩 UI·UX 사전
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              화면에서 본 “그거”의 정확한 이름을 찾고, 유명 서비스 사례와 기기별 차이를 확인한 뒤,
              AI에게 바로 붙여 넣을 프롬프트까지 가져가세요.
            </p>
            <form onSubmit={handleSearch} role="search" className="mx-auto mt-6 max-w-lg lg:mx-0">
              <label htmlFor="home-search" className="sr-only">
                통합 검색
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="home-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="버튼, 모달, 하단 메뉴처럼 찾아보세요"
                  className="min-h-14 w-full rounded-full border border-line bg-surface pl-12 pr-24 text-[15px] shadow-raised"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 min-h-10 -translate-y-1/2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  검색
                </button>
              </div>
            </form>
            <ul className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {suggestedTerms.map((term) => (
                <li key={term}>
                  <Link
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="pill min-h-9 bg-surface/80 px-3 text-xs"
                  >
                    # {term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 장식용 콜라주: 실제 항목 도식을 카드처럼 흩뿌립니다. */}
          <ul aria-hidden="true" className="hidden grid-cols-3 gap-3 lg:grid">
            {collageItems.map((item, index) => (
              <li
                key={item.id}
                className={`flex h-28 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-raised ${
                  index % 2 === 1 ? 'translate-y-5' : ''
                }`}
              >
                <span className="flex flex-1 items-center justify-center overflow-hidden">
                  <span className="scale-[0.72]">
                    <PreviewGlyph demoType={item.demoType} category={item.category} />
                  </span>
                </span>
                <span className="border-t border-line px-2 py-1 text-center text-[11px] font-semibold text-muted">
                  {item.koreanName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="entry-heading">
        <h2 id="entry-heading" className="sr-only">
          주요 진입
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <EntryCard
            to="/ui"
            tone="tone-violet"
            Icon={Layers}
            title="UI 요소 찾기"
            description="화면에서 본 이것의 이름이 궁금한가요?"
            cta={`${uiItems.length}개 항목 살펴보기`}
          />
          <EntryCard
            to="/ux"
            tone="tone-green"
            Icon={Route}
            title="UX 패턴 찾기"
            description="사용자가 목표를 이루는 흐름을 살펴보세요."
            cta={`${uxPatterns.length}개 패턴 살펴보기`}
          />
          <EntryCard
            to="/versus"
            tone="tone-pink"
            Icon={Scale}
            title="헷갈리는 UI 구분하기"
            description="모달과 바텀 시트, 칩과 태그는 뭐가 다를까요?"
            cta={`${versusTopics.length}가지 비교 보기`}
          />
        </div>
      </section>

      <HomeSection title="분류로 찾아보기" moreTo="/ui" moreLabel="UI 요소 전체 보기">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {uiCategories.map((category) => {
            const { Icon, tone } = uiCategoryVisuals[category.id];
            const count = uiItems.filter((item) => item.category === category.id).length;
            return (
              <li key={category.id}>
                <Link
                  to={`/ui?category=${category.id}`}
                  className={`tone-${tone} group flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-raised`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tone text-tone-fg">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{category.easyName}</span>
                    <span className="mt-0.5 block text-xs text-muted">{count}개 항목</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </HomeSection>

      <section aria-labelledby="today-heading">
        <div className="surface-card grid overflow-hidden md:grid-cols-[1fr_1.3fr]">
          <div
            aria-hidden="true"
            className="flex min-h-48 items-center justify-center overflow-hidden border-b border-line bg-background md:border-b-0 md:border-r"
          >
            <span className="scale-125 md:scale-150">
              <PreviewGlyph demoType={todayItem.demoType} category={todayItem.category} />
            </span>
          </div>
          <div className="p-6">
            <p className="eyebrow flex items-center gap-1.5">
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              오늘의 UI
            </p>
            <h2 id="today-heading" className="mt-2 text-2xl font-bold">
              {todayItem.koreanName}
              <span className="ml-2 text-base font-medium text-primary-strong">{todayItem.englishName}</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{todayItem.summary}</p>
            {todayItem.confusedWith && (
              <p className="mt-3 rounded-lg bg-background p-3 text-sm leading-relaxed">
                <strong className="font-semibold">헷갈림 주의 · </strong>
                {todayItem.confusedWith}
              </p>
            )}
            <Link to={`/ui/${todayItem.slug}`} className="btn-primary mt-4">
              직접 만져 보기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <HomeSection title="자주 찾는 UI" moreTo="/ui" moreLabel="UI 요소 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredUI.map((item) => (
            <UIItemCard key={item.id} item={item} />
          ))}
        </div>
      </HomeSection>

      <HomeSection title="자주 찾는 UX" moreTo="/ux" moreLabel="UX 패턴 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUX.map((pattern) => (
            <UXPatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </HomeSection>

      <HomeSection title="이거랑 저거, 뭐가 달라요?" moreTo="/versus" moreLabel="구분하기 전체 보기">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVersus.map((topic) => (
            <li key={topic.id}>
              <Link
                to={`/versus#${topic.slug}`}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="text-xs font-semibold text-primary-strong">{topic.question}</span>
                <span className="mt-1.5 text-base font-bold">{topic.title}</span>
                <span className="mt-2 line-clamp-2 text-sm text-muted">{topic.rule}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary-strong">
                  비교표 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </HomeSection>

      <HomeSection title="유명 서비스로 살펴보기" moreTo="/services" moreLabel="서비스 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </HomeSection>

      <HomeSection title="PC·태블릿·모바일 비교 사례" moreTo="/compare" moreLabel="비교 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredComparisons.map((comparison) => (
            <Link
              key={comparison.id}
              to={`/compare#${comparison.slug}`}
              className="rounded-card border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-raised"
            >
              <h3 className="text-sm font-bold">{comparison.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{comparison.summary}</p>
            </Link>
          ))}
        </div>
      </HomeSection>

      <section
        aria-labelledby="guide-cta-heading"
        className="tone-violet flex flex-col items-start gap-4 rounded-[1.5rem] bg-tone p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-tone-fg sm:flex">
            <NotebookPen className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="guide-cta-heading" className="text-lg font-bold text-tone-fg">
              AI가 한 번에 알아듣는 프롬프트, 어떻게 쓸까요?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">
              정확한 이름, 자리와 기기, 모든 상태까지. 사전을 프롬프트에 활용하는 다섯 가지 방법을 정리했어요.
            </p>
          </div>
        </div>
        <Link to="/guide" className="btn-primary shrink-0">
          프롬프트 가이드 보기
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      {recentEntries.length > 0 && (
        <HomeSection title="최근 본 항목" moreTo="/saved" moreLabel="저장함 가기">
          <ul className="flex flex-wrap gap-2">
            {recentEntries.map(({ ref, item }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`} className="pill text-ink">
                  <span className="text-xs text-muted">{ref.type === 'ui' ? 'UI' : 'UX'}</span>
                  {item!.koreanName}
                </Link>
              </li>
            ))}
          </ul>
        </HomeSection>
      )}

      {savedEntries.length > 0 && (
        <HomeSection title="저장한 항목" moreTo="/saved" moreLabel="저장함 전체 보기">
          <ul className="flex flex-wrap gap-2">
            {savedEntries.map(({ ref, item }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`} className="pill pill-active">
                  <span className="text-xs">{ref.type === 'ui' ? 'UI' : 'UX'}</span>
                  {item!.koreanName}
                </Link>
              </li>
            ))}
          </ul>
        </HomeSection>
      )}
    </div>
  );
}

function EntryCard({
  to,
  tone,
  Icon,
  title,
  description,
  cta,
}: {
  to: string;
  tone: string;
  Icon: typeof Layers;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <Link
      to={to}
      className={`${tone} group flex flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-raised`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tone text-tone-fg">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

function HomeSection({
  title,
  moreTo,
  moreLabel,
  children,
}: {
  title: string;
  moreTo: string;
  moreLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <Link
          to={moreTo}
          className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary-strong hover:underline"
        >
          {moreLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      {children}
    </section>
  );
}
