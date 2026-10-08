import { useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CornerDownLeft, Search, X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { searchAll, type SearchDoc } from '../../hooks/useSearch';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { SearchTypeBadge } from '../common/SearchTypeBadge';

const quickLinks: { title: string; subtitle: string; href: string }[] = [
  { title: 'UI 요소 전체', subtitle: '사전', href: '/ui' },
  { title: 'UX 패턴 전체', subtitle: '사전', href: '/ux' },
  { title: '헷갈리는 UI 구분하기', subtitle: '비교', href: '/versus' },
  { title: '바이브코딩 프롬프트 가이드', subtitle: '가이드', href: '/guide' },
];

type QuickSearchProps = {
  open: boolean;
  onClose: () => void;
};

// Ctrl/⌘ + K 또는 / 키로 어디서나 여는 빠른 검색 창입니다(커맨드 팔레트 패턴).
// 입력하는 즉시 결과가 나오고, 위아래 화살표와 Enter만으로 이동할 수 있습니다.
export function QuickSearch({ open, onClose }: QuickSearchProps) {
  if (!open) return null;
  return createPortal(<QuickSearchDialog onClose={onClose} />, document.body);
}

function QuickSearchDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const containerRef = useFocusTrap<HTMLDivElement>(true, onClose);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const { searches, addSearch } = useRecentSearches();

  const results: SearchDoc[] = useMemo(() => searchAll(query).slice(0, 8), [query]);
  const trimmed = query.trim();

  // 검색어가 없을 땐 최근 검색어와 바로가기를, 있을 땐 검색 결과를 옵션으로 씁니다.
  const options = trimmed
    ? results.map((result) => ({
        key: `${result.type}-${result.id}`,
        href: result.href,
        title: result.title,
        subtitle: result.subtitle,
        type: result.type,
      }))
    : [
        ...searches.slice(0, 4).map((term) => ({
          key: `recent-${term}`,
          href: `/search?q=${encodeURIComponent(term)}`,
          title: term,
          subtitle: '최근 검색어',
          type: undefined,
        })),
        ...quickLinks.map((link) => ({ key: link.href, ...link, type: undefined })),
      ];

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = (href: string) => {
    if (trimmed) addSearch(trimmed);
    onClose();
    navigate(href);
  };

  const showAll = () => go(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, options.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = options[active];
      if (option) go(option.href);
      else showAll();
    }
  };

  const activeId = options[active] ? `${listId}-${active}` : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="빠른 검색"
        className="w-full max-w-xl animate-fade-up overflow-hidden rounded-card border border-line bg-surface shadow-raised"
      >
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          <input
            type="text"
            role="combobox"
            aria-expanded={options.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="빠른 검색어"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="UI, UX, 서비스 이름을 입력하세요"
            className="min-h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="빠른 검색 닫기"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!trimmed && (
            <p className="px-2 pb-1 pt-1 text-xs font-semibold text-muted">
              {searches.length > 0 ? '최근 검색어와 바로가기' : '바로가기'}
            </p>
          )}
          {options.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="빠른 검색 결과">
              {options.map((option, index) => (
                <li
                  key={option.key}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(option.href)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${
                    index === active ? 'bg-primary-soft' : ''
                  }`}
                >
                  {option.type ? (
                    <SearchTypeBadge type={option.type} />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm">
                    <span className="font-semibold">{option.title}</span>
                    <span className="ml-1.5 text-xs text-muted">{option.subtitle}</span>
                  </span>
                  {index === active && (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-primary-strong" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-6 text-center text-sm text-muted" role="status">
              “{trimmed}”에 맞는 항목이 없어요. 다른 이름으로 찾아보세요.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-line bg-background px-4 py-2.5 text-xs text-muted">
          <span className="hidden sm:inline">
            <kbd className="rounded border border-line bg-surface px-1">↑</kbd>{' '}
            <kbd className="rounded border border-line bg-surface px-1">↓</kbd> 이동 ·{' '}
            <kbd className="rounded border border-line bg-surface px-1">Enter</kbd> 열기 ·{' '}
            <kbd className="rounded border border-line bg-surface px-1">Esc</kbd> 닫기
          </span>
          <button
            type="button"
            onClick={showAll}
            className="ml-auto inline-flex min-h-9 items-center gap-1 font-semibold text-primary-strong hover:underline"
          >
            {trimmed ? `“${trimmed}” 전체 결과 보기` : '통합 검색 페이지로'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
