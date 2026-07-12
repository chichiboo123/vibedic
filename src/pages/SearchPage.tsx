import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Search, X } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { SearchResultType } from '../types';

const typeLabels: Record<SearchResultType, string> = {
  ui: 'UI',
  ux: 'UX',
  service: '서비스',
  compare: '비교',
};

const typeColors: Record<SearchResultType, string> = {
  ui: 'bg-indigo-100 text-indigo-700',
  ux: 'bg-emerald-100 text-emerald-700',
  service: 'bg-amber-100 text-amber-700',
  compare: 'bg-sky-100 text-sky-700',
};

const suggestedTerms = ['버튼', '검색창', '모달', '하단 내비게이션', '자동 저장', '필터', '파일 공유'];

function HighlightedText({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const lowerText = text.toLowerCase();
  const lowerQuery = trimmed.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-amber-100 px-0.5 text-inherit">
        {text.slice(index, index + trimmed.length)}
      </mark>
      {text.slice(index + trimmed.length)}
    </>
  );
}

export function SearchPage() {
  useDocumentTitle('통합 검색');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [input, setInput] = useState(query);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  const results = useSearch(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setInput(query);
    setHighlighted(-1);
  }, [query]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed) addSearch(trimmed);
  }, [query, addSearch]);

  const groupCounts = useMemo(() => {
    const counts: Record<SearchResultType, number> = { ui: 0, ux: 0, service: 0, compare: 0 };
    for (const result of results) counts[result.type] += 1;
    return counts;
  }, [results]);

  const runSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed) setSearchParams({ q: trimmed });
    else setSearchParams({});
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((index) => Math.max(index - 1, -1));
    } else if (event.key === 'Enter') {
      if (highlighted >= 0 && results[highlighted]) {
        event.preventDefault();
        navigate(results[highlighted].href);
      } else {
        runSearch(input);
      }
    } else if (event.key === 'Escape') {
      setInput('');
      setSearchParams({});
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">통합 검색</h1>
      <p className="mt-1.5 text-sm text-muted">
        UI 요소, UX 패턴, 유명 서비스, 기기별 비교를 한 번에 찾아보세요.
      </p>

      <form
        role="search"
        className="sticky top-16 z-10 mt-5 rounded-full bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch(input);
        }}
      >
        <label htmlFor="global-search" className="sr-only">
          검색어
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            id="global-search"
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="버튼, 검색, 로그인, 모바일 메뉴를 찾아보세요."
            aria-describedby="search-status"
            className="min-h-12 w-full rounded-full border border-line bg-surface pl-11 pr-24 text-sm shadow-card [&::-webkit-search-cancel-button]:hidden"
          />
          {input && (
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => {
                setInput('');
                setSearchParams({});
                inputRef.current?.focus();
              }}
              className="absolute right-16 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-background"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 min-h-9 -translate-y-1/2 rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            검색
          </button>
        </div>
      </form>

      {!query && (
        <div className="mt-6 space-y-6">
          {searches.length > 0 && (
            <section aria-label="최근 검색어">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold">최근 검색어</h2>
                <button
                  type="button"
                  onClick={clearSearches}
                  className="text-xs text-muted hover:text-ink"
                >
                  전체 삭제
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {searches.map((term) => (
                  <li key={term} className="flex items-center gap-0.5 rounded-full border border-line bg-surface pl-3">
                    <button
                      type="button"
                      onClick={() => runSearch(term)}
                      className="flex min-h-10 items-center gap-1.5 text-sm text-muted hover:text-ink"
                    >
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {term}
                    </button>
                    <button
                      type="button"
                      aria-label={`최근 검색어 삭제: ${term}`}
                      onClick={() => removeSearch(term)}
                      className="flex h-10 w-8 items-center justify-center rounded-full text-muted hover:text-error"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section aria-label="추천 검색어">
            <h2 className="text-sm font-bold">이런 검색어는 어때요?</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {suggestedTerms.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => runSearch(term)}
                    className="min-h-10 rounded-full border border-line bg-surface px-3.5 text-sm text-muted hover:border-primary hover:text-primary-strong"
                  >
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {query && (
        <div className="mt-5">
          <p id="search-status" role="status" className="text-sm text-muted">
            “{query}” 검색 결과 {results.length}건 · UI {groupCounts.ui} · UX {groupCounts.ux} · 서비스{' '}
            {groupCounts.service} · 비교 {groupCounts.compare}
          </p>

          {results.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.id}`}>
                  <Link
                    to={result.href}
                    aria-current={index === highlighted ? 'true' : undefined}
                    className={`flex items-start gap-3 rounded-card border bg-surface p-4 transition-colors ${
                      index === highlighted
                        ? 'border-primary bg-primary-soft/50'
                        : 'border-line hover:border-primary'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-xs font-bold ${typeColors[result.type]}`}
                    >
                      {typeLabels[result.type]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        <HighlightedText text={result.title} query={query} />
                        <span className="ml-1.5 text-xs font-normal text-muted">
                          <HighlightedText text={result.subtitle} query={query} />
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        <HighlightedText text={result.description} query={query} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-card border border-line bg-surface p-8 text-center">
              <p className="text-base font-semibold">“{query}”에 대한 결과가 없어요.</p>
              <p className="mt-1 text-sm text-muted">
                검색어를 짧게 줄이거나 아래 추천 검색어로 다시 찾아보세요.
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestedTerms.slice(0, 5).map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => runSearch(term)}
                      className="min-h-10 rounded-full border border-line bg-surface px-3.5 text-sm text-muted hover:border-primary hover:text-primary-strong"
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Link
                  to="/ui"
                  className="min-h-11 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  UI 전체 보기
                </Link>
                <Link
                  to="/ux"
                  className="min-h-11 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold hover:bg-background"
                >
                  UX 전체 보기
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
