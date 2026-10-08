import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers, Search, X } from 'lucide-react';
import { uiItems } from '../data/uiItems';
import { uiCategories } from '../data/categories';
import type { UICategoryId } from '../types';
import { UIItemCard } from '../components/dictionary/UIItemCard';
import { CategoryFilterBar } from '../components/dictionary/CategoryFilterBar';
import { uiCategoryVisuals } from '../components/dictionary/categoryVisuals';
import { PageHeader } from '../components/common/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const compact = (value: string) => value.replaceAll(/\s+/g, '').toLowerCase();

export function UIListPage() {
  useDocumentTitle('UI 요소');
  // 분류·검색어·인기 필터를 주소에 담아 두어, 상세에 갔다가 뒤로 와도 그대로 남고 링크로 공유할 수 있습니다.
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as UICategoryId | null;
  const activeCategory = uiCategories.some((c) => c.id === categoryParam) ? categoryParam : null;
  // 입력창은 지역 상태로 즉시 반영하고(전환 지연으로 글자가 밀리지 않게), 주소에는 따라서 기록합니다.
  const [keyword, setKeyword] = useState(() => searchParams.get('q') ?? '');
  const popularOnly = searchParams.get('popular') === '1';

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
    return uiItems.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (popularOnly && !item.featured) return false;
      if (!trimmed) return true;
      const haystack = compact(
        [item.easyName, item.koreanName, item.englishName, ...item.keywords, ...item.aliases].join(''),
      );
      return haystack.includes(trimmed);
    });
  }, [activeCategory, keyword, popularOnly]);

  const categoryMeta = uiCategories.find((c) => c.id === activeCategory);

  return (
    <div>
      <PageHeader
        eyebrow="UI Dictionary"
        Icon={Layers}
        title="UI 요소"
        description={`화면에서 본 요소의 이름과 역할, 사용 사례를 찾아보세요. 총 ${uiItems.length}개 항목이 있어요.`}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              updateParams({ q: event.target.value.trim() ? event.target.value : null });
            }}
            aria-label="UI 요소 이름으로 걸러내기"
            placeholder="이름으로 걸러내기"
            className="min-h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm"
          />
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={popularOnly}
            onChange={(event) => updateParams({ popular: event.target.checked ? '1' : null })}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          인기 항목만 보기
        </label>
      </div>

      <div className="mt-4">
        <CategoryFilterBar
          categories={uiCategories.map((category) => ({
            id: category.id,
            easyName: category.easyName,
            count: uiItems.filter((item) => item.category === category.id).length,
            visual: uiCategoryVisuals[category.id],
          }))}
          active={activeCategory}
          total={uiItems.length}
          onChange={(category) => updateParams({ category })}
        />
      </div>

      {categoryMeta && <p className="mt-3 text-sm text-muted">{categoryMeta.description}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-sm text-muted" role="status">
          {filtered.length}개 항목을 보고 있어요.
        </p>
        {(keyword || popularOnly || activeCategory) && filtered.length > 0 && (
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
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <UIItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="surface-card mt-8 p-8 text-center">
          <p className="font-semibold">조건에 맞는 UI 요소가 없어요.</p>
          <p className="mt-1 text-sm text-muted">검색어를 줄이거나 카테고리를 전체로 바꿔 보세요.</p>
          <button type="button" onClick={resetAll} className="btn-primary mt-4">
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
