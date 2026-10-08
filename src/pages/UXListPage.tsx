import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Route, Search, X } from 'lucide-react';
import { uxPatterns } from '../data/uxPatterns';
import { uxCategories } from '../data/categories';
import type { UXCategoryId } from '../types';
import { UXPatternCard } from '../components/dictionary/UXPatternCard';
import { CategoryFilterBar } from '../components/dictionary/CategoryFilterBar';
import { uxCategoryVisuals } from '../components/dictionary/categoryVisuals';
import { PageHeader } from '../components/common/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const compact = (value: string) => value.replaceAll(/\s+/g, '').toLowerCase();

export function UXListPage() {
  useDocumentTitle('UX 패턴');
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as UXCategoryId | null;
  const activeCategory = uxCategories.some((c) => c.id === categoryParam) ? categoryParam : null;
  // 입력창은 지역 상태로 즉시 반영하고(전환 지연으로 글자가 밀리지 않게), 주소에는 따라서 기록합니다.
  const [keyword, setKeyword] = useState(() => searchParams.get('q') ?? '');

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const resetAll = () => {
    setKeyword('');
    setSearchParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    const trimmed = compact(keyword.trim());
    return uxPatterns.filter((pattern) => {
      if (activeCategory && pattern.category !== activeCategory) return false;
      if (!trimmed) return true;
      const haystack = compact(
        [pattern.koreanName, pattern.englishName, pattern.userGoal, ...pattern.keywords].join(''),
      );
      return haystack.includes(trimmed);
    });
  }, [activeCategory, keyword]);

  const categoryMeta = uxCategories.find((c) => c.id === activeCategory);

  return (
    <div>
      <PageHeader
        eyebrow="UX Dictionary"
        Icon={Route}
        title="UX 패턴"
        description={`사용자가 하고 싶은 일에서 시작해 보세요. 총 ${uxPatterns.length}개 패턴이 있어요.`}
      />

      <div className="relative mt-6 sm:max-w-xs">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={keyword}
          onChange={(event) => {
              setKeyword(event.target.value);
              updateParams({ q: event.target.value.trim() ? event.target.value : null });
            }}
          aria-label="UX 패턴 이름으로 걸러내기"
          placeholder="이름으로 걸러내기"
          className="min-h-12 w-full rounded-full border border-line bg-surface/70 pl-10 pr-4 text-sm backdrop-blur transition-shadow focus:shadow-raised"
        />
      </div>

      <div className="mt-4">
        <CategoryFilterBar
          categories={uxCategories.map((category) => ({
            id: category.id,
            easyName: category.easyName,
            count: uxPatterns.filter((pattern) => pattern.category === category.id).length,
            visual: uxCategoryVisuals[category.id],
          }))}
          active={activeCategory}
          total={uxPatterns.length}
          onChange={(category) => updateParams({ category })}
        />
      </div>

      {categoryMeta && (
        <p className="mt-3 text-sm text-muted">
          <strong className="font-semibold text-ink">{categoryMeta.name}</strong> · {categoryMeta.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-sm text-muted" role="status">
          {filtered.length}개 패턴을 보고 있어요.
        </p>
        {(keyword || activeCategory) && filtered.length > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex min-h-8 items-center gap-1 rounded-full px-2 text-xs font-medium text-primary-strong hover:bg-primary-soft"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            조건 지우기
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pattern) => (
            <UXPatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      ) : (
        <div className="surface-card mt-8 p-8 text-center">
          <p className="font-semibold">조건에 맞는 UX 패턴이 없어요.</p>
          <p className="mt-1 text-sm text-muted">검색어를 줄이거나 카테고리를 전체로 바꿔 보세요.</p>
          <button type="button" onClick={resetAll} className="btn-primary mt-4">
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
