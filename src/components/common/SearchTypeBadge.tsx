import type { SearchResultType } from '../../types';

// eslint-disable-next-line react-refresh/only-export-components
export const searchTypeLabels: Record<SearchResultType, string> = {
  ui: 'UI',
  ux: 'UX',
  service: '서비스',
  compare: '기기',
  versus: '구분',
};

// 다크 모드에서도 읽히도록 분류 색 토큰(tone-*)을 씁니다.
const typeTones: Record<SearchResultType, string> = {
  ui: 'tone-violet',
  ux: 'tone-green',
  service: 'tone-yellow',
  compare: 'tone-blue',
  versus: 'tone-pink',
};

export function SearchTypeBadge({ type }: { type: SearchResultType }) {
  return (
    <span
      className={`${typeTones[type]} inline-flex min-w-9 shrink-0 justify-center whitespace-nowrap rounded-md bg-tone px-1.5 py-0.5 text-xs font-bold text-tone-fg`}
    >
      {searchTypeLabels[type]}
    </span>
  );
}
