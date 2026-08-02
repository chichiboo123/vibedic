import type { ReactNode } from 'react';
import { serviceBrandMarks, serviceFallbackBrands } from '../../data/serviceLogos';

export type ServiceLogoSize = 'sm' | 'md' | 'lg';

const sizeClass: Record<ServiceLogoSize, string> = {
  sm: 'h-7 w-7 rounded-lg text-xs',
  md: 'h-10 w-10 rounded-xl text-base',
  lg: 'h-14 w-14 rounded-2xl text-xl',
};

const glyphClass: Record<ServiceLogoSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

// 아이콘 타일. 브랜드 색이 라이트·다크 모드에서 모두 제대로 보이도록
// 실제 앱 아이콘처럼 밝은 타일 위에 브랜드 마크를 올립니다.
export function ServiceLogo({
  serviceId,
  serviceName,
  size = 'md',
}: {
  serviceId: string;
  serviceName: string;
  size?: ServiceLogoSize;
}) {
  const mark = serviceBrandMarks[serviceId];
  const fallback = serviceFallbackBrands[serviceId];

  // 브랜드 색 타일 위에 머리글자를 얹는 대체 아이콘.
  if (!mark && fallback) {
    return (
      <span
        role="img"
        aria-label={`${serviceName} 아이콘`}
        style={{ background: fallback.background }}
        className={`flex shrink-0 items-center justify-center border border-line font-black leading-none text-white shadow-card ${sizeClass[size]}`}
      >
        {fallback.label}
      </span>
    );
  }

  const content: ReactNode = mark ? (
    <svg viewBox="0 0 24 24" className={glyphClass[size]} fill={mark.hex} aria-hidden="true">
      <path d={mark.path} />
    </svg>
  ) : (
    <span className="font-bold leading-none text-muted">{serviceName.charAt(0)}</span>
  );

  return (
    <span
      role="img"
      aria-label={`${serviceName} 아이콘`}
      className={`flex shrink-0 items-center justify-center border border-line bg-white shadow-card ${sizeClass[size]}`}
    >
      {content}
    </span>
  );
}
