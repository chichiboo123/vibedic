import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Link2, ListTree } from 'lucide-react';
import { useToast } from '../common/ToastProvider';

export type TocEntry = { id: string; title: string };

// 상세 페이지의 한 구획. 목차에서 바로 이동할 수 있게 id를 붙입니다.
export function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24" aria-label={title}>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
        <span aria-hidden="true" className="h-5 w-1 rounded-full bg-primary" />
        {title}
      </h2>
      {children}
    </section>
  );
}

// HashRouter에서는 #앵커 링크가 라우팅과 겹치므로, 버튼으로 해당 구획까지 스크롤합니다.
function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // 키보드·스크린 리더 사용자를 위해 포커스도 함께 옮깁니다.
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function useActiveSection(entries: TocEntry[]): string | null {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null);
  // 렌더마다 새로 만들어지는 배열 대신 id 목록 문자열로 의존성을 잡아 관찰자를 불필요하게 다시 만들지 않습니다.
  const idsKey = entries.map((entry) => entry.id).join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    for (const id of idsKey.split('|')) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [idsKey]);

  return active;
}

// 넓은 화면에서 오른쪽에 고정되는 목차입니다.
export function DetailToc({ entries }: { entries: TocEntry[] }) {
  const active = useActiveSection(entries);
  return (
    <nav aria-label="이 페이지 목차" className="sticky top-24 hidden lg:block">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <ListTree className="h-3.5 w-3.5" aria-hidden="true" />이 페이지에서
      </p>
      <ul className="mt-3 space-y-0.5 border-l border-line">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => scrollToSection(entry.id)}
              aria-current={active === entry.id ? 'location' : undefined}
              className={`-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-[13px] transition-colors ${
                active === entry.id
                  ? 'border-primary font-semibold text-primary-strong'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {entry.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// 좁은 화면에서는 제목 아래에 가로로 스크롤되는 구획 바로가기를 둡니다.
export function DetailJumpBar({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-label="구획 바로가기" className="scrollbar-none -mx-4 mt-6 overflow-x-auto px-4 lg:hidden">
      <ul className="flex gap-2">
        {entries.map((entry) => (
          <li key={entry.id} className="shrink-0">
            <button type="button" onClick={() => scrollToSection(entry.id)} className="pill min-h-9 text-xs">
              {entry.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ShareLinkButton({ name }: { name: string }) {
  const { showToast } = useToast();
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(`링크를 복사했어요: ${name}`);
    } catch {
      showToast('링크 복사에 실패했어요. 주소창에서 직접 복사해 주세요.');
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${name} 링크 복사`}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary-strong"
    >
      <Link2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

type Neighbor = { to: string; title: string; subtitle: string } | null;

// 같은 사전 안에서 앞뒤 항목으로 넘어가는 링크입니다.
export function PrevNextNav({ prev, next, label }: { prev: Neighbor; next: Neighbor; label: string }) {
  return (
    <nav aria-label={label} className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.to}
          className="group surface-card flex items-center gap-3 p-4 transition-colors hover:border-primary"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-xs text-muted">이전</span>
            <span className="block truncate font-semibold">{prev.title}</span>
            <span className="block truncate text-xs text-muted">{prev.subtitle}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next.to}
          className="group surface-card flex items-center justify-end gap-3 p-4 text-right transition-colors hover:border-primary"
        >
          <span className="min-w-0">
            <span className="block text-xs text-muted">다음</span>
            <span className="block truncate font-semibold">{next.title}</span>
            <span className="block truncate text-xs text-muted">{next.subtitle}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}

export function Breadcrumb({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">›</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
