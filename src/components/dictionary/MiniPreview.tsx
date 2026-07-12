import type { DemoType, UICategoryId, UIItem } from '../../types';

// 카드 상단에 들어가는 CSS 기반의 간단한 시각 미리보기입니다.
export function MiniPreview({ item }: { item: UIItem }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-24 items-center justify-center overflow-hidden rounded-t-card border-b border-line bg-background"
    >
      <PreviewGlyph demoType={item.demoType} category={item.category} />
    </div>
  );
}

// 요소 하나를 나타내는 작은 도식. 카드 미리보기와 서비스 사례 목업에서 함께 씁니다.
export function PreviewGlyph({
  demoType,
  category,
}: {
  demoType: DemoType;
  category: UICategoryId;
}) {
  switch (demoType) {
    case 'button':
      return <div className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white">버튼</div>;
    case 'icon-button':
      return (
        <div className="flex gap-2">
          {['♡', '✕', '⋯'].map((icon) => (
            <span
              key={icon}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-sm text-muted"
            >
              {icon}
            </span>
          ))}
        </div>
      );
    case 'fab':
      return (
        <div className="relative h-16 w-24 rounded-md border border-line bg-surface">
          <span className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base text-white">
            +
          </span>
        </div>
      );
    case 'checkbox':
      return (
        <div className="space-y-1.5">
          {[true, false].map((checked, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${
                  checked ? 'border-primary bg-primary text-white' : 'border-line bg-surface'
                }`}
              >
                {checked ? '✓' : ''}
              </span>
              <span className="h-2 w-16 rounded bg-line" />
            </div>
          ))}
        </div>
      );
    case 'radio':
      return (
        <div className="space-y-1.5">
          {[true, false].map((selected, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected ? 'border-primary' : 'border-line'
                }`}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
              </span>
              <span className="h-2 w-16 rounded bg-line" />
            </div>
          ))}
        </div>
      );
    case 'toggle':
      return (
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-11 items-center rounded-full bg-primary p-0.5">
            <span className="ml-auto h-5 w-5 rounded-full bg-white" />
          </span>
          <span className="flex h-6 w-11 items-center rounded-full bg-line p-0.5">
            <span className="h-5 w-5 rounded-full bg-white" />
          </span>
        </div>
      );
    case 'tab':
      return (
        <div className="w-32 border-b border-line text-center text-[10px]">
          <div className="flex">
            <span className="flex-1 border-b-2 border-primary pb-1 font-semibold text-primary-strong">탭1</span>
            <span className="flex-1 pb-1 text-muted">탭2</span>
            <span className="flex-1 pb-1 text-muted">탭3</span>
          </div>
        </div>
      );
    case 'select':
    case 'combo-box':
      return (
        <div className="flex w-32 items-center justify-between rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10px] text-muted">
          <span>선택하기</span>
          <span>▾</span>
        </div>
      );
    case 'search-field':
    case 'autocomplete':
      return (
        <div className="w-36">
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[10px] text-muted">
            <span>🔍</span>
            <span>검색어 입력</span>
          </div>
        </div>
      );
    case 'text-field':
    case 'password-field':
      return (
        <div className="w-32 space-y-1">
          <span className="block h-2 w-10 rounded bg-line" />
          <div className="h-8 rounded-md border border-line bg-surface" />
        </div>
      );
    case 'modal':
    case 'alert-dialog':
      return (
        <div className="relative h-16 w-28 rounded-md bg-line/60">
          <div className="absolute inset-x-4 top-2.5 rounded-md bg-surface p-1.5 shadow-card">
            <span className="block h-1.5 w-12 rounded bg-line" />
            <span className="mt-1 block h-1.5 w-8 rounded bg-line" />
          </div>
        </div>
      );
    case 'bottom-sheet':
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md bg-line/60">
          <div className="absolute inset-x-0 bottom-0 h-9 rounded-t-lg bg-surface p-1.5">
            <span className="mx-auto block h-1 w-6 rounded bg-line" />
            <span className="mt-1.5 block h-1.5 w-12 rounded bg-line" />
          </div>
        </div>
      );
    case 'toast':
      return (
        <div className="rounded-full bg-ink px-4 py-1.5 text-[10px] text-white">저장했어요 ✓</div>
      );
    case 'tooltip':
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="rounded bg-ink px-2 py-1 text-[10px] text-white">설명이에요</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-xs text-muted">?</span>
        </div>
      );
    case 'accordion':
      return (
        <div className="w-32 space-y-1 text-[10px]">
          <div className="flex justify-between rounded-md border border-line bg-surface px-2 py-1.5 text-muted">
            <span>질문 1</span>
            <span>⌄</span>
          </div>
          <div className="flex justify-between rounded-md border border-primary bg-primary-soft px-2 py-1.5 text-primary-strong">
            <span>질문 2</span>
            <span>⌃</span>
          </div>
        </div>
      );
    case 'progress':
      return (
        <div className="w-32">
          <div className="h-2.5 overflow-hidden rounded-full bg-line">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
          <p className="mt-1 text-right text-[10px] text-muted">66%</p>
        </div>
      );
    case 'date-picker':
      return (
        <div className="w-28 rounded-md border border-line bg-surface p-1.5">
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }, (_, index) => (
              <span
                key={index}
                className={`h-2.5 rounded-sm ${index === 9 ? 'bg-primary' : 'bg-line/70'}`}
              />
            ))}
          </div>
        </div>
      );
    case 'file-upload':
      return (
        <div className="flex h-16 w-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-line text-[10px] text-muted">
          <span>⬆</span>
          <span>파일을 끌어다 놓기</span>
        </div>
      );
    case 'range-slider':
      return (
        <div className="relative h-2 w-32 rounded-full bg-line">
          <div className="absolute left-3 right-10 h-full rounded-full bg-primary" />
          <span className="absolute -top-1 left-2 h-4 w-4 rounded-full border-2 border-primary bg-white" />
          <span className="absolute -top-1 right-8 h-4 w-4 rounded-full border-2 border-primary bg-white" />
        </div>
      );
    case 'stepper':
      return (
        <div className="flex items-center rounded-md border border-line bg-surface text-sm">
          <span className="px-3 py-1 text-muted">−</span>
          <span className="border-x border-line px-3 py-1 text-xs">2</span>
          <span className="px-3 py-1 text-muted">＋</span>
        </div>
      );
    case 'chip':
      return (
        <div className="flex gap-1.5 text-[10px]">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-primary-strong">✓ 인기</span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-muted">최신</span>
        </div>
      );
    case 'segmented-control':
      return (
        <div className="flex rounded-lg bg-line/60 p-0.5 text-[10px]">
          <span className="rounded-md bg-surface px-3 py-1 font-semibold shadow-card">목록</span>
          <span className="px-3 py-1 text-muted">격자</span>
        </div>
      );
    case 'pagination':
      return (
        <div className="flex gap-1 text-[10px]">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-line text-muted">‹</span>
          <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">1</span>
          <span className="flex h-6 w-6 items-center justify-center rounded border border-line text-muted">2</span>
          <span className="flex h-6 w-6 items-center justify-center rounded border border-line text-muted">›</span>
        </div>
      );
    case 'breadcrumb':
      return (
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <span>홈</span>
          <span>›</span>
          <span>가전</span>
          <span>›</span>
          <span className="font-semibold text-ink">노트북</span>
        </div>
      );
    case 'skeleton':
      return (
        <div className="w-32 space-y-1.5">
          <span className="block h-10 rounded-md bg-line/80" />
          <span className="block h-2 w-24 rounded bg-line/80" />
          <span className="block h-2 w-16 rounded bg-line/80" />
        </div>
      );
    case 'avatar':
      return (
        <div className="flex -space-x-2">
          {['가', '나', '다'].map((initial, index) => (
            <span
              key={initial}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface text-xs text-white ${
                ['bg-indigo-400', 'bg-emerald-400', 'bg-amber-400'][index]
              }`}
            >
              {initial}
            </span>
          ))}
        </div>
      );
    case 'badge':
      return (
        <div className="flex gap-1.5 text-[10px]">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-700">완료</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-700">진행 중</span>
        </div>
      );
    case 'banner':
      return (
        <div className="w-36 rounded-md bg-amber-100 px-2.5 py-1.5 text-[10px] text-amber-800">
          ⚠ 연결이 불안정해요
        </div>
      );
    case 'spinner':
      return (
        <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-primary" />
      );
    case 'empty-state':
      return (
        <div className="text-center text-[10px] text-muted">
          <span className="text-lg">📭</span>
          <p>아직 항목이 없어요</p>
        </div>
      );
    default:
      return <CategoryFallback category={category} />;
  }
}

function CategoryFallback({ category }: { category: UICategoryId }) {
  switch (category) {
    case 'layout':
      return (
        <div className="h-16 w-24 rounded-md border border-line bg-surface p-1">
          <span className="block h-3 rounded-sm bg-primary-soft" />
          <div className="mt-1 flex gap-1">
            <span className="h-9 w-6 rounded-sm bg-line/70" />
            <span className="h-9 flex-1 rounded-sm bg-line/40" />
          </div>
        </div>
      );
    case 'navigation':
      return (
        <div className="w-28 space-y-1">
          <span className="block h-2.5 rounded bg-primary-soft" />
          <span className="block h-2.5 w-20 rounded bg-line" />
          <span className="block h-2.5 w-16 rounded bg-line" />
        </div>
      );
    case 'display':
      return (
        <div className="w-28 space-y-1">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded bg-line" />
              <span className="h-2 flex-1 rounded bg-line/70" />
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="w-28 space-y-1">
          <span className="block h-8 rounded-md border border-line bg-surface" />
          <span className="block h-2 w-16 rounded bg-line" />
        </div>
      );
  }
}
