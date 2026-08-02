import type { ReactNode } from 'react';

// 배치·내비게이션처럼 "화면 전체에서의 자리"가 중요한 요소를 위한 공용 틀입니다.
// 데모 안에서 실제 화면을 축소한 형태로 직접 눌러 볼 수 있게 합니다.

export function BrowserFrame({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-label={label}
      className={`overflow-hidden rounded-card border border-line bg-background ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-2 truncate rounded-full bg-background px-2.5 py-0.5 text-[11px] text-muted">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-label={label}
      className={`mx-auto w-full max-w-[260px] overflow-hidden rounded-[1.75rem] border-[6px] border-zinc-700 bg-background ${className}`}
    >
      <div className="flex justify-center bg-zinc-700 pb-1">
        <span aria-hidden="true" className="h-1 w-10 rounded-full bg-zinc-500" />
      </div>
      {children}
    </div>
  );
}

// 데모 아래에 붙는 한 줄 안내. 지금 무엇이 바뀌었는지 알려 줍니다.
export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 text-sm text-muted" role="status">
      {children}
    </p>
  );
}

// 데모 안에서 반복해서 쓰는 회색 자리표시 막대입니다.
export function Skeletonish({ className }: { className: string }) {
  return <span aria-hidden="true" className={`block rounded-sm bg-line ${className}`} />;
}
