import { useId } from 'react';

// VibeDic 로고. 펼친 사전 위에 반짝임을 얹은 작은 마크와 워드마크입니다.
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const mark = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const gradientId = `vibedic-logo${useId().replace(/:/g, '')}`;
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" className={`${mark} shrink-0`} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4649d8" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
        <path
          d="M7 10.5c3-1.3 6-1.1 9 .8v12c-3-1.9-6-2.1-9-.8v-12Zm18 0c-3-1.3-6-1.1-9 .8v12c3-1.9 6-2.1 9-.8v-12Z"
          fill="#fff"
          fillOpacity="0.95"
        />
        <path d="M23.5 4.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z" fill="#fde68a" />
      </svg>
      <span className={`font-extrabold tracking-tight ${size === 'sm' ? 'text-base' : 'text-lg'}`}>
        <span className="text-primary-strong">Vibe</span>
        <span className="text-ink">Dic</span>
      </span>
    </span>
  );
}
