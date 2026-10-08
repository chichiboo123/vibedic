import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

// 목록·안내 페이지 맨 위에 공통으로 쓰는 제목 영역입니다.
// 모노 폰트 머리말 + 큰 디스플레이 제목의 에디토리얼 구성입니다.
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
    <header className="flex animate-fade-up flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
      <div className="min-w-0 max-w-3xl">
        {(eyebrow || Icon) && (
          <p className="eyebrow flex items-center gap-2">
            {Icon && (
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-background">
                <Icon className="h-3.5 w-3.5" />
              </span>
            )}
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.04em] sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>}
      </div>
      {actions}
    </header>
  );
}
