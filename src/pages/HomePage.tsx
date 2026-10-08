import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CornerDownLeft, NotebookPen, Search, Sparkles } from 'lucide-react';
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

const suggestedTerms = ['버튼', '모달', '하단 내비게이션', '자동 저장', '필터', '무한 스크롤'];

// 히어로 오른쪽에 스티커처럼 흩뿌리는 실제 항목 도식들. 위치와 기울기를 하나씩 정합니다.
const stickers: { slug: string; className: string; tilt: string; delay: string }[] = [
  { slug: 'toggle-switch', className: 'left-[2%] top-[6%]', tilt: '-6deg', delay: '0s' },
  { slug: 'toast', className: 'left-[63%] top-[0%]', tilt: '5deg', delay: '1.2s' },
  { slug: 'search-field', className: 'left-[32%] top-[34%] z-10', tilt: '2deg', delay: '0.6s' },
  { slug: 'tab', className: 'left-[66%] top-[44%]', tilt: '-4deg', delay: '2s' },
  { slug: 'progress-bar', className: 'left-[0%] top-[66%]', tilt: '4deg', delay: '1.6s' },
  { slug: 'chip', className: 'left-[37%] top-[72%]', tilt: '-3deg', delay: '0.9s' },
];

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
  const stickerItems = stickers
    .map((sticker) => ({ ...sticker, item: findUIItemBySlug(sticker.slug) }))
    .filter((sticker): sticker is typeof sticker & { item: UIItem } => Boolean(sticker.item));
  const bentoGlyphs = ['button', 'checkbox', 'modal', 'badge', 'segmented-control', 'avatar']
    .map((slug) => findUIItemBySlug(slug))
    .filter((item): item is UIItem => Boolean(item));
  const sampleUx = uxPatterns.find((pattern) => pattern.slug === 'save-action') ?? uxPatterns[0];

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
    <div className="space-y-24">
      {/* ── 히어로 ───────────────────────────────────────────── */}
      <section className="grid items-center gap-12 pt-2 lg:grid-cols-[1.3fr_1fr] lg:pt-6">
        <div className="min-w-0 animate-fade-up text-center lg:text-left">
          <Link
            to="/versus"
            className="glass group inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs font-medium text-muted shadow-card transition-colors hover:text-ink"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-ink">
              New
            </span>
            헷갈리는 UI {versusTopics.length}가지, 비교표로 구분하기
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[3rem] xl:text-[3.5rem]">
            필요할 때 꺼내 찾는
            <br />
            <span className="sm:whitespace-nowrap">
              바이브코딩 <span className="text-gradient">UI·UX</span> 사전
            </span>
          </h1>
          <p className="mt-4 font-serif text-xl italic text-muted sm:text-2xl">
            the dictionary for vibe coders.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted lg:mx-0">
            화면에서 본 “그거”의 정확한 이름을 찾고, 유명 서비스 사례와 기기별 차이를 확인한 뒤, AI에게
            바로 붙여 넣을 프롬프트까지 가져가세요.
          </p>

          <form onSubmit={handleSearch} role="search" className="mx-auto mt-8 max-w-xl lg:mx-0">
            <label htmlFor="home-search" className="sr-only">
              통합 검색
            </label>
            <div className="glass group relative flex items-center rounded-2xl p-1.5 shadow-raised transition-shadow focus-within:ring-4 focus-within:ring-primary/15">
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <input
                id="home-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="버튼, 모달, 하단 메뉴처럼 찾아보세요"
                className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted focus-visible:outline-none"
              />
              <button type="submit" className="btn-primary min-h-11 rounded-xl px-4">
                검색
                <CornerDownLeft className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </button>
            </div>
          </form>
          <ul className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-1.5 lg:mx-0 lg:justify-start">
            {suggestedTerms.map((term) => (
              <li key={term}>
                <Link to={`/search?q=${encodeURIComponent(term)}`} className="pill min-h-8 px-3 text-xs">
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 장식용 스티커 무대: 실제 항목 도식이 둥둥 떠 있습니다. */}
        <div aria-hidden="true" className="relative mx-auto hidden h-[440px] w-full max-w-[480px] lg:block">
          <div className="absolute inset-[12%] rounded-full bg-primary/20 blur-3xl" />
          {stickerItems.map(({ item, className, tilt, delay }) => (
            <div
              key={item.id}
              style={{ '--tilt': tilt, animationDelay: delay } as CSSProperties}
              className={`animate-float absolute w-40 overflow-hidden xl:w-44 rounded-2xl border border-line bg-surface shadow-raised ${className}`}
            >
              <div className="dot-grid flex h-24 items-center justify-center overflow-hidden">
                <span className="scale-[0.72]">
                  <PreviewGlyph demoType={item.demoType} category={item.category} />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line px-3 py-1.5">
                <span className="text-xs font-semibold">{item.koreanName}</span>
                <span className="font-mono text-[10px] text-muted">{item.englishName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 흐르는 용어 띠 ───────────────────────────────────── */}
      {/*
        항목 하나당 5초씩 잡아 천천히 흐르게 합니다. 이름을 누르면 해당 UI 상세로 이동하고,
        마우스를 올리거나 키보드로 포커스하면 멈춥니다. 끊김 없이 이어지도록 목록을 한 번 더
        붙이되, 복제본은 보조기기와 Tab 순서에서 숨깁니다.
      */}
      <nav aria-label="UI 용어 바로가기" className="marquee fade-x -mx-4 overflow-hidden border-y border-line py-3">
        <div
          className="marquee-track flex w-max"
          style={{ '--marquee-duration': `${uiItems.length * 5}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0">
              {uiItems.map((item) => (
                <li key={item.id} className="flex shrink-0 items-center">
                  <Link
                    to={`/ui/${item.slug}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group flex min-h-10 items-center gap-2 rounded-full px-3 text-sm transition-colors hover:bg-ink/5"
                  >
                    <span className="font-semibold group-hover:text-primary-strong">{item.koreanName}</span>
                    <span className="font-mono text-xs text-muted">{item.englishName}</span>
                  </Link>
                  <span aria-hidden="true" className="px-3 text-primary">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </nav>

      {/* ── 벤토 그리드 ─────────────────────────────────────── */}
      <section aria-labelledby="entry-heading">
        <h2 id="entry-heading" className="sr-only">
          주요 진입
        </h2>
        <div className="grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-6">
          <BentoLink to="/ui" className="md:col-span-3 md:row-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">01 · UI Dictionary</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">UI 요소 찾기</h3>
                <p className="mt-1 text-sm text-muted">화면에서 본 이것의 이름이 궁금한가요?</p>
              </div>
              <span className="font-mono text-5xl font-medium tracking-tighter text-ink/90">{uiItems.length}</span>
            </div>
            <div aria-hidden="true" className="mt-6 grid flex-1 grid-cols-3 gap-2">
              {bentoGlyphs.map((item) => (
                <span
                  key={item.id}
                  className="dot-grid flex min-h-24 items-center justify-center overflow-hidden rounded-xl border border-line"
                >
                  <span className="scale-[0.62]">
                    <PreviewGlyph demoType={item.demoType} category={item.category} />
                  </span>
                </span>
              ))}
            </div>
            <BentoCta>{uiItems.length}개 항목 살펴보기</BentoCta>
          </BentoLink>

          <BentoLink to="/ux" className="md:col-span-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">02 · UX Patterns</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">UX 패턴 찾기</h3>
                <p className="mt-1 text-sm text-muted">사용자가 목표를 이루는 흐름을 살펴보세요.</p>
              </div>
              <span className="font-mono text-5xl font-medium tracking-tighter text-ink/90">{uxPatterns.length}</span>
            </div>
            <ol aria-hidden="true" className="mt-5 flex flex-wrap items-center gap-1.5 text-xs">
              {sampleUx.flowSteps.slice(0, 4).map((step, index) => (
                <li key={step} className="flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      index === 0 ? 'bg-ink text-background' : 'bg-background ring-1 ring-line'
                    }`}
                  >
                    {step}
                  </span>
                  {index < 3 && <ArrowRight className="h-3 w-3 text-muted" />}
                </li>
              ))}
            </ol>
            <BentoCta>{uxPatterns.length}개 패턴 살펴보기</BentoCta>
          </BentoLink>

          <BentoLink to="/versus" className="md:col-span-2">
            <p className="eyebrow">03 · Versus</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight">헷갈리는 UI 구분하기</h3>
            <p aria-hidden="true" className="mt-3 flex items-baseline gap-2 text-sm font-semibold">
              모달 <span className="font-serif text-3xl italic text-primary">vs</span> 바텀 시트
            </p>
            <BentoCta>{versusTopics.length}가지 비교 보기</BentoCta>
          </BentoLink>

          <BentoLink to="/guide" className="md:col-span-1">
            <NotebookPen className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold leading-snug tracking-tight">프롬프트 가이드</h3>
            <BentoCta>읽기</BentoCta>
          </BentoLink>

          <BentoLink to={`/ui/${todayItem.slug}`} className="md:col-span-4">
            <div className="flex h-full flex-col gap-5 sm:flex-row sm:items-center">
              <div
                aria-hidden="true"
                className="dot-grid flex h-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line sm:w-56"
              >
                <span className="scale-110">
                  <PreviewGlyph demoType={todayItem.demoType} category={todayItem.category} />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="eyebrow flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                  오늘의 UI
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {todayItem.koreanName}
                  <span className="ml-2 font-serif text-xl font-normal italic text-muted">{todayItem.englishName}</span>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{todayItem.summary}</p>
                <BentoCta>직접 만져 보기</BentoCta>
              </div>
            </div>
          </BentoLink>

          <div className="flex flex-col justify-between rounded-[1.5rem] bg-[#0d0d12] p-6 text-white ring-1 ring-white/10 md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">By the numbers</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                ['UI', uiItems.length],
                ['UX', uxPatterns.length],
                ['서비스', services.length],
                ['비교', deviceComparisons.length + versusTopics.length],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs opacity-60">{label}</dt>
                  <dd className="font-mono text-3xl font-medium tracking-tighter">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── 분류 ─────────────────────────────────────────────── */}
      <HomeSection index="04" eyebrow="Categories" title="분류로 찾아보기" moreTo="/ui" moreLabel="UI 요소 전체 보기">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {uiCategories.map((category, categoryIndex) => {
            const { Icon, tone } = uiCategoryVisuals[category.id];
            const count = uiItems.filter((item) => item.category === category.id).length;
            return (
              <li key={category.id}>
                <Link
                  to={`/ui?category=${category.id}`}
                  className={`tone-${tone} spotlight group flex h-full flex-col justify-between gap-6 rounded-[1.25rem] border border-line bg-surface p-4 transition-all hover:-translate-y-1 hover:shadow-raised`}
                >
                  <span className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tone text-tone-fg transition-transform group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] text-muted">0{categoryIndex + 1}</span>
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{category.easyName}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-muted">{count} items</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </HomeSection>

      <HomeSection index="05" eyebrow="Popular UI" title="자주 찾는 UI" moreTo="/ui" moreLabel="UI 요소 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredUI.map((item) => (
            <UIItemCard key={item.id} item={item} />
          ))}
        </div>
      </HomeSection>

      <HomeSection index="06" eyebrow="Popular UX" title="자주 찾는 UX" moreTo="/ux" moreLabel="UX 패턴 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUX.map((pattern) => (
            <UXPatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </HomeSection>

      <HomeSection index="07" eyebrow="Versus" title="이거랑 저거, 뭐가 달라요?" moreTo="/versus" moreLabel="구분하기 전체 보기">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVersus.map((topic) => (
            <li key={topic.id}>
              <Link
                to={`/versus#${topic.slug}`}
                className="spotlight group flex h-full flex-col rounded-[1.25rem] border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-raised"
              >
                <span className="text-[13px] font-medium text-primary-strong">{topic.question}</span>
                <span className="mt-3 text-lg font-bold tracking-tight">{topic.title}</span>
                <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{topic.rule}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold">
                  비교표 보기
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </HomeSection>

      <HomeSection index="08" eyebrow="Services" title="유명 서비스로 살펴보기" moreTo="/services" moreLabel="서비스 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </HomeSection>

      <HomeSection index="09" eyebrow="Devices" title="PC·태블릿·모바일 비교 사례" moreTo="/compare" moreLabel="비교 전체 보기">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredComparisons.map((comparison) => (
            <Link
              key={comparison.id}
              to={`/compare#${comparison.slug}`}
              className="spotlight group rounded-[1.25rem] border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-raised"
            >
              <h3 className="flex items-center justify-between gap-2 text-base font-bold tracking-tight">
                {comparison.title}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted">{comparison.summary}</p>
            </Link>
          ))}
        </div>
      </HomeSection>

      {/* ── 가이드 배너: 잉크색으로 뒤집은 면 ───────────────── */}
      <section
        aria-labelledby="guide-cta-heading"
        className="relative overflow-hidden rounded-[2rem] bg-[#0d0d12] px-6 py-12 text-white ring-1 ring-white/10 sm:px-12 sm:py-16"
      >
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/50 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#ff5fae]/25 blur-3xl" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">Prompt Guide</p>
            <h2 id="guide-cta-heading" className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">
              AI가 한 번에 알아듣는 프롬프트,
              <br />
              <span className="text-gradient">어떻게 쓸까요?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-70 sm:text-base">
              정확한 이름, 자리와 기기, 모든 상태까지. 사전을 프롬프트에 활용하는 다섯 가지 방법을 정리했어요.
            </p>
          </div>
          <Link
            to="/guide"
            className="btn shrink-0 bg-accent text-accent-ink hover:-translate-y-px hover:shadow-raised"
          >
            프롬프트 가이드 보기
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {recentEntries.length > 0 && (
        <HomeSection eyebrow="Recent" title="최근 본 항목" moreTo="/saved" moreLabel="저장함 가기">
          <ul className="flex flex-wrap gap-2">
            {recentEntries.map(({ ref, item }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`} className="pill text-ink">
                  <span className="font-mono text-[10px] text-muted">{ref.type === 'ui' ? 'UI' : 'UX'}</span>
                  {item!.koreanName}
                </Link>
              </li>
            ))}
          </ul>
        </HomeSection>
      )}

      {savedEntries.length > 0 && (
        <HomeSection eyebrow="Saved" title="저장한 항목" moreTo="/saved" moreLabel="저장함 전체 보기">
          <ul className="flex flex-wrap gap-2">
            {savedEntries.map(({ ref, item }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`} className="pill pill-active">
                  <span className="font-mono text-[10px] opacity-70">{ref.type === 'ui' ? 'UI' : 'UX'}</span>
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

function BentoLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`spotlight group flex flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised ${className}`}
    >
      {children}
    </Link>
  );
}

function BentoCta({ children }: { children: ReactNode }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
      {children}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-background transition-transform group-hover:translate-x-1">
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </span>
  );
}

function HomeSection({
  index,
  eyebrow,
  title,
  moreTo,
  moreLabel,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  moreTo: string;
  moreLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title}>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="eyebrow">
            {index && <span className="text-ink">{index}</span>}
            {index && ' — '}
            {eyebrow}
          </p>
          <h2 className="mt-1.5 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{title}</h2>
        </div>
        <Link
          to={moreTo}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <span className="sr-only sm:not-sr-only">{moreLabel}</span>
          <span aria-hidden="true" className="sm:hidden">
            전체
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      {children}
    </section>
  );
}
