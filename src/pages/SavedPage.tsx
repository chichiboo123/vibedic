import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import { useSavedItems } from '../hooks/useSavedItems';
import { useRecentItems } from '../hooks/useRecentItems';
import { findUIItemById, uiItems } from '../data/uiItems';
import { findUXPatternById, uxPatterns } from '../data/uxPatterns';
import { UIItemCard } from '../components/dictionary/UIItemCard';
import { UXPatternCard } from '../components/dictionary/UXPatternCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../components/common/ToastProvider';

export function SavedPage() {
  useDocumentTitle('저장함');
  const { saved, clearSaved } = useSavedItems();
  const { recent, clearRecent } = useRecentItems();
  const { showToast } = useToast();
  const [confirmClear, setConfirmClear] = useState(false);

  const savedUI = saved
    .filter((ref) => ref.type === 'ui')
    .map((ref) => findUIItemById(ref.id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const savedUX = saved
    .filter((ref) => ref.type === 'ux')
    .map((ref) => findUXPatternById(ref.id))
    .filter((pattern): pattern is NonNullable<typeof pattern> => Boolean(pattern));

  const recentEntries = recent
    .map((ref) =>
      ref.type === 'ui'
        ? { ref, name: findUIItemById(ref.id)?.koreanName, slug: findUIItemById(ref.id)?.slug }
        : { ref, name: findUXPatternById(ref.id)?.koreanName, slug: findUXPatternById(ref.id)?.slug },
    )
    .filter((entry) => entry.name && entry.slug);

  const recommendedUI = uiItems.filter((item) => item.featured).slice(0, 3);
  const recommendedUX = uxPatterns.filter((pattern) => pattern.featured).slice(0, 3);

  const handleClearSaved = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearSaved();
    setConfirmClear(false);
    showToast('저장함을 비웠어요.');
  };

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">저장함</h1>
          <p className="mt-1.5 text-sm text-muted" role="status">
            UI {savedUI.length}개, UX {savedUX.length}개를 저장했어요.
          </p>
        </div>
        {saved.length > 0 && (
          <button
            type="button"
            onClick={handleClearSaved}
            onBlur={() => setConfirmClear(false)}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-4 text-sm font-semibold ${
              confirmClear
                ? 'border-error bg-error text-white'
                : 'border-line bg-surface text-muted hover:text-error'
            }`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {confirmClear ? '한 번 더 누르면 전체 삭제돼요' : '전체 삭제'}
          </button>
        )}
      </header>

      {saved.length === 0 ? (
        <div className="mt-8 rounded-card border border-line bg-surface p-10 text-center">
          <Bookmark className="mx-auto h-10 w-10 text-line" aria-hidden="true" />
          <p className="mt-4 text-base font-semibold">아직 저장한 항목이 없어요.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            자주 참고할 UI와 UX를 저장하면
            <br />
            필요할 때 빠르게 다시 꺼내 볼 수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              to="/ui"
              className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              UI 요소 둘러보기
            </Link>
            <Link
              to="/ux"
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-semibold hover:bg-background"
            >
              UX 패턴 둘러보기
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {savedUI.length > 0 && (
            <section aria-label="저장한 UI 요소">
              <h2 className="mb-3 text-lg font-bold">저장한 UI 요소 ({savedUI.length})</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedUI.map((item) => (
                  <UIItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
          {savedUX.length > 0 && (
            <section aria-label="저장한 UX 패턴">
              <h2 className="mb-3 text-lg font-bold">저장한 UX 패턴 ({savedUX.length})</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedUX.map((pattern) => (
                  <UXPatternCard key={pattern.id} pattern={pattern} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {recentEntries.length > 0 && (
        <section aria-label="최근 본 항목" className="mt-12">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">최근 본 항목</h2>
            <button
              type="button"
              onClick={() => {
                clearRecent();
                showToast('최근 본 항목을 지웠어요.');
              }}
              className="text-sm text-muted hover:text-ink"
            >
              전체 삭제
            </button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {recentEntries.map(({ ref, name, slug }) => (
              <li key={`${ref.type}-${ref.id}`}>
                <Link
                  to={ref.type === 'ui' ? `/ui/${slug}` : `/ux/${slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-sm hover:border-primary hover:text-primary-strong"
                >
                  <span className="text-xs text-muted">{ref.type === 'ui' ? 'UI' : 'UX'}</span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {saved.length === 0 && (
        <section aria-label="추천 항목" className="mt-12">
          <h2 className="mb-3 text-lg font-bold">이런 항목부터 시작해 보세요</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedUI.map((item) => (
              <UIItemCard key={item.id} item={item} />
            ))}
            {recommendedUX.map((pattern) => (
              <UXPatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
