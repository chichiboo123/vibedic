import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Route, Search } from 'lucide-react';
import { uiItems } from '../data/uiItems';
import { uxPatterns } from '../data/uxPatterns';
import { services } from '../data/services';
import { deviceComparisons } from '../data/deviceComparisons';
import { findUIItemById } from '../data/uiItems';
import { findUXPatternById } from '../data/uxPatterns';
import { UIItemCard } from '../components/dictionary/UIItemCard';
import { UXPatternCard } from '../components/dictionary/UXPatternCard';
import { ServiceCard } from '../components/dictionary/ServiceCard';
import { useRecentItems } from '../hooks/useRecentItems';
import { useSavedItems } from '../hooks/useSavedItems';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const suggestedTerms = ['버튼', '검색창', '모달', '하단 내비게이션', '자동 저장', '필터', '파일 공유'];

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

  const recentEntries = recent
    .map((ref) =>
      ref.type === 'ui'
        ? { ref, item: findUIItemById(ref.id) }
        : { ref, item: findUXPatternById(ref.id) },
    )
    .filter((entry) => entry.item)
    .slice(0, 6);

  const savedEntries = saved
    .map((ref) =>
      ref.type === 'ui'
        ? { ref, item: findUIItemById(ref.id) }
        : { ref, item: findUXPatternById(ref.id) },
    )
    .filter((entry) => entry.item)
    .slice(0, 6);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <div className="space-y-14">
      <section className="rounded-card bg-gradient-to-b from-primary-soft to-background px-4 py-12 text-center sm:py-16">
        <h1 className="mx-auto max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
          필요할 때 꺼내 찾는
          <br />
          바이브코딩 UI·UX 사전
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          웹사이트와 앱에서 자주 만나는 UI의 이름과 역할을 알아보고, 실제 서비스의 UX 흐름과
          기기별 차이를 살펴보세요.
        </p>
        <form onSubmit={handleSearch} role="search" className="mx-auto mt-6 max-w-lg">
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
              placeholder="버튼, 검색, 로그인, 모바일 메뉴를 찾아보세요."
              className="min-h-12 w-full rounded-full border border-line bg-surface pl-11 pr-24 text-sm shadow-card"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 min-h-9 -translate-y-1/2 rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
            >
              검색
            </button>
          </div>
        </form>
        <ul className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
          {suggestedTerms.map((term) => (
            <li key={term}>
              <Link
                to={`/search?q=${encodeURIComponent(term)}`}
                className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3 text-xs text-muted hover:border-primary hover:text-primary-strong"
              >
                {term}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="entry-heading">
        <h2 id="entry-heading" className="sr-only">
          주요 진입
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/ui"
            className="group rounded-card border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
          >
            <Layers className="h-8 w-8 text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold">UI 요소 찾기</h3>
            <p className="mt-1 text-sm text-muted">화면에서 본 이것의 이름이 궁금한가요?</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">
              {uiItems.length}개 항목 살펴보기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
          <Link
            to="/ux"
            className="group rounded-card border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
          >
            <Route className="h-8 w-8 text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold">UX 패턴 찾기</h3>
            <p className="mt-1 text-sm text-muted">사용자가 목표를 이루는 흐름을 살펴보세요.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">
              {uxPatterns.length}개 패턴 살펴보기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
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
              className="rounded-card border border-line bg-surface p-4 shadow-card transition-shadow hover:shadow-raised"
            >
              <h3 className="text-sm font-bold">{comparison.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{comparison.summary}</p>
            </Link>
          ))}
        </div>
      </HomeSection>

      {recentEntries.length > 0 && (
        <HomeSection title="최근 본 항목" moreTo="/saved" moreLabel="저장함 가기">
          <ul className="flex flex-wrap gap-2">
            {recentEntries.map(({ ref, item }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link
                  to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-sm hover:border-primary hover:text-primary-strong"
                >
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
                <Link
                  to={ref.type === 'ui' ? `/ui/${item!.slug}` : `/ux/${item!.slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-primary bg-primary-soft px-3.5 text-sm text-primary-strong"
                >
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link to={moreTo} className="text-sm font-medium text-primary-strong hover:underline">
          {moreLabel}
        </Link>
      </div>
      {children}
    </section>
  );
}
