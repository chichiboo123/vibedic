import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { uiItems } from '../data/uiItems';
import { uiCategories } from '../data/categories';
import type { UICategoryId } from '../types';
import { UIItemCard } from '../components/dictionary/UIItemCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function UIListPage() {
  useDocumentTitle('UI 요소');
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as UICategoryId | null;
  const activeCategory = uiCategories.some((c) => c.id === categoryParam) ? categoryParam : null;
  const [keyword, setKeyword] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);

  const filtered = useMemo(() => {
    const trimmed = keyword.trim().replaceAll(/\s+/g, '').toLowerCase();
    return uiItems.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (popularOnly && !item.featured) return false;
      if (!trimmed) return true;
      const haystack = [item.easyName, item.koreanName, item.englishName, ...item.keywords, ...item.aliases]
        .join('')
        .replaceAll(/\s+/g, '')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [activeCategory, keyword, popularOnly]);

  const setCategory = (category: UICategoryId | null) => {
    if (category) setSearchParams({ category });
    else setSearchParams({});
  };

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">UI 요소</h1>
        <p className="mt-1.5 text-sm text-muted">
          화면에서 본 요소의 이름과 역할, 사용 사례를 찾아보세요. 총 {uiItems.length}개 항목이 있어요.
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            aria-label="UI 요소 이름으로 걸러내기"
            placeholder="이름으로 걸러내기"
            className="min-h-11 w-full rounded-full border border-line bg-surface pl-9 pr-4 text-sm"
          />
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={popularOnly}
            onChange={(event) => setPopularOnly(event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          인기 항목만 보기
        </label>
      </div>

      <div role="group" aria-label="카테고리 필터" className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={activeCategory === null}
          onClick={() => setCategory(null)}
          className={`min-h-10 rounded-full border px-3.5 text-sm ${
            activeCategory === null
              ? 'border-primary bg-primary-soft font-semibold text-primary-strong'
              : 'border-line bg-surface text-muted hover:text-ink'
          }`}
        >
          전체
        </button>
        {uiCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={activeCategory === category.id}
            onClick={() => setCategory(category.id)}
            className={`min-h-10 rounded-full border px-3.5 text-sm ${
              activeCategory === category.id
                ? 'border-primary bg-primary-soft font-semibold text-primary-strong'
                : 'border-line bg-surface text-muted hover:text-ink'
            }`}
          >
            {category.easyName}
          </button>
        ))}
      </div>

      {activeCategory && (
        <p className="mt-3 text-sm text-muted">
          {uiCategories.find((c) => c.id === activeCategory)?.description}
        </p>
      )}

      <p className="mt-4 text-sm text-muted" role="status">
        {filtered.length}개 항목을 보고 있어요.
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <UIItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-line bg-surface p-8 text-center">
          <p className="font-semibold">조건에 맞는 UI 요소가 없어요.</p>
          <p className="mt-1 text-sm text-muted">검색어를 줄이거나 카테고리를 전체로 바꿔 보세요.</p>
          <button
            type="button"
            onClick={() => {
              setKeyword('');
              setPopularOnly(false);
              setCategory(null);
            }}
            className="mt-4 min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
