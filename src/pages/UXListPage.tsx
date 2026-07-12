import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { uxPatterns } from '../data/uxPatterns';
import { uxCategories } from '../data/categories';
import type { UXCategoryId } from '../types';
import { UXPatternCard } from '../components/dictionary/UXPatternCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function UXListPage() {
  useDocumentTitle('UX 패턴');
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as UXCategoryId | null;
  const activeCategory = uxCategories.some((c) => c.id === categoryParam) ? categoryParam : null;
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const trimmed = keyword.trim().replaceAll(/\s+/g, '').toLowerCase();
    return uxPatterns.filter((pattern) => {
      if (activeCategory && pattern.category !== activeCategory) return false;
      if (!trimmed) return true;
      const haystack = [pattern.koreanName, pattern.englishName, pattern.userGoal, ...pattern.keywords]
        .join('')
        .replaceAll(/\s+/g, '')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [activeCategory, keyword]);

  const setCategory = (category: UXCategoryId | null) => {
    if (category) setSearchParams({ category });
    else setSearchParams({});
  };

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">UX 패턴</h1>
        <p className="mt-1.5 text-sm text-muted">
          사용자가 하고 싶은 일에서 시작해 보세요. 총 {uxPatterns.length}개 패턴이 있어요.
        </p>
      </header>

      <div className="relative mt-5 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          aria-label="UX 패턴 이름으로 걸러내기"
          placeholder="이름으로 걸러내기"
          className="min-h-11 w-full rounded-full border border-line bg-surface pl-9 pr-4 text-sm"
        />
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
        {uxCategories.map((category) => (
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
          {uxCategories.find((c) => c.id === activeCategory)?.description}
        </p>
      )}

      <p className="mt-4 text-sm text-muted" role="status">
        {filtered.length}개 패턴을 보고 있어요.
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pattern) => (
            <UXPatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-line bg-surface p-8 text-center">
          <p className="font-semibold">조건에 맞는 UX 패턴이 없어요.</p>
          <p className="mt-1 text-sm text-muted">검색어를 줄이거나 카테고리를 전체로 바꿔 보세요.</p>
          <button
            type="button"
            onClick={() => {
              setKeyword('');
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
