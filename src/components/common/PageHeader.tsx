import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

// 목록·안내 페이지 맨 위에 공통으로 쓰는 제목 영역입니다.
export function PageHeader({
  eyebrow,
  title,
  description,
  Icon,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  Icon?: LucideIcon;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong sm:flex"
          >
            <Icon className="h-6 w-6" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight sm:text-[1.75rem]">{title}</h1>
          {description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>}
        </div>
      </div>
      {actions}
    </header>
  );
}
