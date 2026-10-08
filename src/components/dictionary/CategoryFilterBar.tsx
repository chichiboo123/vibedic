import type { CategoryVisual } from './categoryVisuals';

type FilterCategory<T extends string> = {
  id: T;
  easyName: string;
  count: number;
  visual: CategoryVisual;
};

// 목록 페이지 위쪽의 분류 필터. 좁은 화면에서는 한 줄 가로 스크롤로, 넓은 화면에서는 여러 줄로 놓입니다.
// 개수는 화면에만 보이고(aria-hidden), 결과 수는 아래 상태 문구가 읽어 줍니다.
export function CategoryFilterBar<T extends string>({
  categories,
  active,
  total,
  onChange,
}: {
  categories: FilterCategory<T>[];
  active: T | null;
  total: number;
  onChange: (id: T | null) => void;
}) {
  return (
    <div
      role="group"
      aria-label="카테고리 필터"
      className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
        className="pill shrink-0"
      >
        전체
        <span aria-hidden="true" className="text-xs opacity-70">
          {total}
        </span>
      </button>
      {categories.map(({ id, easyName, count, visual: { Icon, tone } }) => (
        <button
          key={id}
          type="button"
          aria-pressed={active === id}
          onClick={() => onChange(id)}
          className={`tone-${tone} pill shrink-0`}
        >
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-md bg-tone text-tone-fg">
            <Icon className="h-3 w-3" />
          </span>
          {easyName}
          <span aria-hidden="true" className="text-xs opacity-70">
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}
