import type { DemoType, UICategoryId, UIItem } from '../../types';

// 카드 상단 썸네일. 상세 페이지의 "직접 살펴보기" 데모와 같은 모양을 축소해 보여 주어,
// 목록에서 어떤 요소인지 바로 알아보고 상세로 들어갈 수 있게 합니다.
export function MiniPreview({ item }: { item: UIItem }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-center justify-center overflow-hidden rounded-t-card border-b border-line bg-background px-3"
    >
      <PreviewGlyph demoType={item.demoType} category={item.category} />
    </div>
  );
}

// 요소 하나를 나타내는 작은 도식. 카드 미리보기와 서비스 사례 목업에서 함께 씁니다.
// DemoType 하나마다 케이스가 하나씩 있어, 항목마다 서로 다른 그림이 나옵니다.
export function PreviewGlyph({
  demoType,
  category,
}: {
  demoType: DemoType;
  category: UICategoryId;
}) {
  switch (demoType) {
    // ── 조작 ────────────────────────────────────────────────
    case 'button':
      return <div className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white">저장</div>;
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
          {[true, true, false].map((checked, index) => (
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
          {[true, false, false].map((selected, index) => (
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
    case 'select':
      return (
        <div className="w-32">
          <div className="flex items-center justify-between rounded-md border border-primary bg-surface px-2.5 py-1.5 text-[10px]">
            <span>서울</span>
            <span aria-hidden="true">▾</span>
          </div>
          <div className="mt-0.5 space-y-0.5 rounded-md border border-line bg-surface p-1 text-[9px] text-muted">
            <span className="block rounded bg-primary-soft px-1 py-0.5 text-primary-strong">서울</span>
            <span className="block px-1 py-0.5">부산</span>
          </div>
        </div>
      );
    case 'combo-box':
      return (
        <div className="w-32">
          <div className="flex items-center justify-between rounded-md border border-primary bg-surface px-2.5 py-1.5 text-[10px]">
            <span>대한|</span>
            <span aria-hidden="true">▾</span>
          </div>
          <div className="mt-0.5 rounded-md border border-line bg-surface p-1 text-[9px]">
            <span className="block rounded bg-primary-soft px-1 py-0.5 text-primary-strong">
              <strong>대한</strong>민국
            </span>
          </div>
        </div>
      );
    case 'chip':
      return (
        <div className="flex flex-wrap justify-center gap-1.5 text-[10px]">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-primary-strong">✓ 인기</span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-muted">최신</span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-muted">할인</span>
        </div>
      );
    case 'filter-chip':
      return (
        <div className="w-36 space-y-1">
          <div className="flex gap-1 text-[9px]">
            <span className="rounded-full border border-primary bg-primary-soft px-2 py-0.5 text-primary-strong">
              ✓ 무료 배송
            </span>
            <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-muted">오늘 출발</span>
          </div>
          <p className="text-center text-[9px] text-muted">상품 91개</p>
        </div>
      );
    case 'segmented-control':
      return (
        <div className="flex rounded-lg bg-line/60 p-0.5 text-[10px]">
          <span className="rounded-md bg-surface px-3 py-1 font-semibold shadow-card">목록</span>
          <span className="px-3 py-1 text-muted">격자</span>
          <span className="px-3 py-1 text-muted">지도</span>
        </div>
      );
    case 'range-slider':
      return (
        <div className="w-32">
          <div className="relative h-2 rounded-full bg-line">
            <div className="absolute left-3 right-10 h-full rounded-full bg-primary" />
            <span className="absolute -top-1 left-2 h-4 w-4 rounded-full border-2 border-primary bg-white" />
            <span className="absolute -top-1 right-8 h-4 w-4 rounded-full border-2 border-primary bg-white" />
          </div>
          <p className="mt-1.5 text-center text-[9px] text-muted">3만 ~ 7만원</p>
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

    // ── 입력 ────────────────────────────────────────────────
    case 'text-field':
      return (
        <div className="w-32 space-y-1">
          <span className="block text-[9px] font-semibold">이름 *</span>
          <div className="rounded-md border border-primary bg-surface px-2 py-1.5 text-[10px]">김지수|</div>
        </div>
      );
    case 'search-field':
      return (
        <div className="flex w-36 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[10px] text-muted">
          <span aria-hidden="true">🔍</span>
          <span className="flex-1">검색어 입력</span>
          <span aria-hidden="true">✕</span>
        </div>
      );
    case 'autocomplete':
      return (
        <div className="w-32">
          <div className="rounded-md border border-primary bg-surface px-2 py-1.5 text-[10px]">버</div>
          <div className="mt-0.5 space-y-0.5 rounded-md border border-line bg-surface p-1 text-[9px] text-muted">
            <span className="block">
              <strong className="text-primary-strong">버</strong>튼
            </span>
            <span className="block">
              <strong className="text-primary-strong">버</strong>튼 그룹
            </span>
          </div>
        </div>
      );
    case 'textarea':
      return (
        <div className="w-32 space-y-1">
          <div className="relative h-14 rounded-md border border-line bg-surface p-1.5">
            <span className="block h-1.5 w-full rounded bg-line" />
            <span className="mt-1 block h-1.5 w-4/5 rounded bg-line" />
            <span className="mt-1 block h-1.5 w-2/3 rounded bg-line" />
            <span className="absolute bottom-0.5 right-0.5 text-[8px] text-muted">◢</span>
          </div>
          <p className="text-right text-[9px] text-muted">42 / 200자</p>
        </div>
      );
    case 'password-field':
      return (
        <div className="w-32 space-y-1">
          <span className="block text-[9px] font-semibold">비밀번호</span>
          <div className="flex items-center justify-between rounded-md border border-line bg-surface px-2 py-1.5 text-[10px] tracking-widest">
            <span>••••••••</span>
            <span aria-hidden="true">👁</span>
          </div>
        </div>
      );
    case 'number-input':
      return (
        <div className="flex items-center gap-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-xs text-muted">
            −
          </span>
          <span className="w-12 rounded-md border border-line bg-surface py-1 text-center text-xs">3</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-xs text-muted">
            ＋
          </span>
        </div>
      );
    case 'date-picker':
      return (
        <div className="w-28 rounded-md border border-line bg-surface p-1.5">
          <p className="mb-1 text-center text-[8px] font-semibold">2026년 7월</p>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }, (_, index) => (
              <span
                key={index}
                className={`h-2.5 rounded-sm ${index === 9 ? 'bg-primary' : index < 5 ? 'bg-line/40' : 'bg-line/70'}`}
              />
            ))}
          </div>
        </div>
      );
    case 'time-picker':
      return (
        <div className="flex items-center gap-1 text-[10px]">
          <span className="rounded-md bg-line/60 px-1.5 py-1">
            <span className="rounded bg-surface px-1 py-0.5 font-semibold">오후</span>
          </span>
          <span className="rounded-md border border-line bg-surface px-2 py-1">2</span>
          <span className="font-semibold">:</span>
          <span className="rounded-md border border-line bg-surface px-2 py-1">30</span>
        </div>
      );
    case 'file-upload':
      return (
        <div className="flex h-16 w-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-line text-[10px] text-muted">
          <span aria-hidden="true">⬆</span>
          <span>파일을 끌어다 놓기</span>
        </div>
      );
    case 'otp-input':
      return (
        <div className="flex gap-1">
          {['4', '8', '2', '', '', ''].map((digit, index) => (
            <span
              key={index}
              className={`flex h-7 w-5 items-center justify-center rounded border bg-surface text-xs font-semibold ${
                index === 3 ? 'border-primary' : 'border-line'
              }`}
            >
              {digit}
            </span>
          ))}
        </div>
      );

    // ── 내비게이션 ───────────────────────────────────────────
    case 'main-menu':
      return (
        <div className="w-32 rounded-md border border-line bg-surface">
          <div className="flex gap-1 border-b border-line px-1.5 py-1 text-[9px]">
            <span className="rounded bg-primary-soft px-1.5 py-0.5 text-primary-strong">패션</span>
            <span className="px-1.5 py-0.5 text-muted">가전</span>
            <span className="px-1.5 py-0.5 text-muted">식품</span>
          </div>
          <div className="grid grid-cols-2 gap-0.5 p-1">
            {[0, 1, 2, 3].map((index) => (
              <span key={index} className="h-1.5 rounded bg-line/70" />
            ))}
          </div>
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
    case 'bottom-navigation':
      return (
        <div className="flex h-16 w-24 flex-col rounded-md border border-line bg-surface">
          <div className="flex-1 space-y-1 p-1.5">
            <span className="block h-1.5 w-full rounded bg-line/70" />
            <span className="block h-1.5 w-2/3 rounded bg-line/70" />
          </div>
          <div className="flex justify-around border-t border-line py-1 text-[8px]">
            <span className="text-primary-strong">🏠</span>
            <span className="opacity-50">🔍</span>
            <span className="opacity-50">👤</span>
          </div>
        </div>
      );
    case 'navigation-drawer':
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-line bg-line/40">
          <div className="absolute inset-y-0 left-0 w-12 space-y-1 bg-surface p-1.5">
            <span className="block h-1.5 w-full rounded bg-primary-soft" />
            <span className="block h-1.5 w-4/5 rounded bg-line" />
            <span className="block h-1.5 w-3/5 rounded bg-line" />
          </div>
        </div>
      );
    case 'navigation-rail':
      return (
        <div className="flex h-16 w-24 rounded-md border border-line bg-surface">
          <div className="flex w-6 flex-col items-center gap-1 border-r border-line py-1.5 text-[8px]">
            <span className="rounded bg-primary-soft px-0.5">🏠</span>
            <span className="opacity-50">💬</span>
            <span className="opacity-50">⚙</span>
          </div>
          <div className="flex-1 space-y-1 p-1.5">
            <span className="block h-1.5 w-full rounded bg-line/70" />
            <span className="block h-1.5 w-2/3 rounded bg-line/70" />
          </div>
        </div>
      );
    case 'breadcrumb':
      return (
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <span className="underline">홈</span>
          <span aria-hidden="true">›</span>
          <span className="underline">가전</span>
          <span aria-hidden="true">›</span>
          <span className="font-semibold text-ink">노트북</span>
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
    case 'dropdown-menu':
      return (
        <div className="w-28 text-[9px]">
          <div className="flex items-center justify-between rounded-md border border-line bg-surface px-2 py-1 font-semibold">
            문서 메뉴 <span aria-hidden="true">▾</span>
          </div>
          <div className="mt-0.5 rounded-md border border-line bg-surface py-0.5 shadow-card">
            <span className="block bg-primary-soft px-2 py-0.5 text-primary-strong">이름 바꾸기</span>
            <span className="block px-2 py-0.5 text-muted">복제하기</span>
            <span className="block px-2 py-0.5 text-error">삭제하기</span>
          </div>
        </div>
      );
    case 'context-menu':
      return (
        <div className="relative h-16 w-24 rounded-md border border-dashed border-line bg-surface">
          <span className="absolute left-2 top-2 text-[10px]" aria-hidden="true">
            🖱️
          </span>
          <div className="absolute left-6 top-5 w-16 rounded-md border border-line bg-surface py-0.5 text-[8px] shadow-card">
            <span className="block px-1.5 py-0.5">새 폴더</span>
            <span className="block bg-primary-soft px-1.5 py-0.5 text-primary-strong">이름 바꾸기</span>
          </div>
        </div>
      );
    case 'command-palette':
      return (
        <div className="w-32 rounded-md border border-line bg-surface shadow-card">
          <div className="flex items-center gap-1 border-b border-line px-1.5 py-1 text-[9px] text-muted">
            <span aria-hidden="true">🔍</span>
            <span className="flex-1">문서</span>
            <span className="rounded border border-line px-1 font-mono text-[7px]">⌘K</span>
          </div>
          <div className="py-0.5 text-[8px]">
            <span className="block bg-primary-soft px-1.5 py-0.5 text-primary-strong">새 문서 만들기</span>
            <span className="block px-1.5 py-0.5 text-muted">내보내기 (PDF)</span>
          </div>
        </div>
      );

    // ── 배치 ────────────────────────────────────────────────
    case 'header':
      return (
        <div className="h-16 w-28 overflow-hidden rounded-md border border-line bg-surface">
          <div className="flex items-center gap-1 border-b border-line bg-primary-soft px-1.5 py-1 text-[8px]">
            <span className="font-bold text-primary-strong">로고</span>
            <span className="ml-auto flex gap-1 text-muted">
              <span>홈</span>
              <span>소개</span>
            </span>
          </div>
          <div className="space-y-1 p-1.5">
            <span className="block h-1.5 w-full rounded bg-line/60" />
            <span className="block h-1.5 w-2/3 rounded bg-line/60" />
          </div>
        </div>
      );
    case 'footer':
      return (
        <div className="flex h-16 w-28 flex-col overflow-hidden rounded-md border border-line bg-surface">
          <div className="flex-1 space-y-1 p-1.5">
            <span className="block h-1.5 w-2/3 rounded bg-line/50" />
          </div>
          <div className="border-t border-line bg-background p-1">
            <div className="flex gap-1">
              {[0, 1, 2].map((column) => (
                <div key={column} className="flex-1 space-y-0.5">
                  <span className="block h-1 w-full rounded bg-line" />
                  <span className="block h-1 w-3/4 rounded bg-line/60" />
                </div>
              ))}
            </div>
            <span className="mt-1 block h-1 w-1/2 rounded bg-line/40" />
          </div>
        </div>
      );
    case 'sidebar':
      return (
        <div className="flex h-16 w-28 overflow-hidden rounded-md border border-line bg-surface">
          <div className="w-10 space-y-1 border-r border-line bg-background p-1">
            <span className="block h-1.5 w-full rounded bg-primary-soft" />
            <span className="block h-1.5 w-4/5 rounded bg-line" />
            <span className="block h-1.5 w-full rounded bg-line" />
            <span className="block h-1.5 w-3/5 rounded bg-line" />
          </div>
          <div className="flex-1 space-y-1 p-1.5">
            <span className="block h-1.5 w-full rounded bg-line/60" />
            <span className="block h-1.5 w-2/3 rounded bg-line/60" />
          </div>
        </div>
      );
    case 'top-app-bar':
      return (
        <div className="h-16 w-20 overflow-hidden rounded-lg border-2 border-line bg-surface">
          <div className="flex items-center gap-1 bg-primary px-1 py-1 text-[8px] text-white">
            <span aria-hidden="true">‹</span>
            <span className="flex-1 truncate font-semibold">받은 메일</span>
            <span aria-hidden="true">🔍</span>
          </div>
          <div className="space-y-1 p-1">
            <span className="block h-1.5 w-full rounded bg-line/60" />
            <span className="block h-1.5 w-3/4 rounded bg-line/60" />
          </div>
        </div>
      );
    case 'card':
      return (
        <div className="w-24 overflow-hidden rounded-md border border-line bg-surface shadow-card">
          <div className="flex h-8 items-center justify-center bg-primary-soft text-sm" aria-hidden="true">
            🏡
          </div>
          <div className="space-y-1 p-1.5">
            <span className="block h-1.5 w-full rounded bg-line" />
            <span className="block h-1.5 w-1/2 rounded bg-line/60" />
          </div>
        </div>
      );
    case 'divider':
      return (
        <div className="w-28 divide-y divide-line rounded-md border border-line bg-surface text-[9px]">
          {['알림', '언어', '테마'].map((row) => (
            <div key={row} className="flex justify-between px-2 py-1.5">
              <span>{row}</span>
              <span className="text-muted">›</span>
            </div>
          ))}
        </div>
      );
    case 'hero-section':
      return (
        <div className="flex h-16 w-28 items-center gap-1.5 rounded-md border border-line bg-primary-soft/70 p-1.5">
          <div className="flex-1 space-y-1">
            <span className="block h-2 w-full rounded bg-primary/50" />
            <span className="block h-1 w-3/4 rounded bg-line" />
            <span className="mt-1 block h-3 w-12 rounded bg-primary" />
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded bg-surface text-sm" aria-hidden="true">
            📚
          </span>
        </div>
      );

    // ── 보여주기 ─────────────────────────────────────────────
    case 'list':
      return (
        <div className="w-28 divide-y divide-line rounded-md border border-line bg-surface">
          {[2, 0, 5].map((unread, index) => (
            <div key={index} className="flex items-center gap-1.5 px-1.5 py-1.5">
              <span className="h-4 w-4 shrink-0 rounded-full bg-line" />
              <span className="h-1.5 flex-1 rounded bg-line/70" />
              {unread > 0 && (
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[7px] text-white">
                  {unread}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="w-32 overflow-hidden rounded-md border border-line text-[8px]">
          <div className="flex bg-background font-bold">
            <span className="flex-1 px-1 py-0.5">상품</span>
            <span className="w-10 px-1 py-0.5 text-right">가격 ↑</span>
          </div>
          {[
            ['USB 허브', '22,000'],
            ['무선 마우스', '29,000'],
            ['모니터 받침', '45,000'],
          ].map(([name, price]) => (
            <div key={name} className="flex border-t border-line bg-surface">
              <span className="flex-1 truncate px-1 py-0.5">{name}</span>
              <span className="w-10 px-1 py-0.5 text-right tabular-nums">{price}</span>
            </div>
          ))}
        </div>
      );
    case 'avatar':
      return (
        <div className="flex -space-x-2">
          {['김', '박', '이'].map((initial, index) => (
            <span
              key={initial}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface text-xs text-white ${
                ['bg-indigo-400', 'bg-emerald-400', 'bg-amber-400'][index]
              }`}
            >
              {initial}
            </span>
          ))}
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-line text-[9px] font-semibold text-muted">
            +2
          </span>
        </div>
      );
    case 'badge':
      return (
        <div className="w-32 space-y-1 text-[9px]">
          {[
            ['주문 #01', '결제 완료', 'bg-emerald-100 text-emerald-700'],
            ['주문 #14', '검수 대기', 'bg-amber-100 text-amber-700'],
          ].map(([order, state, tone]) => (
            <div key={order} className="flex items-center justify-between rounded border border-line bg-surface px-1.5 py-1">
              <span className="text-muted">{order}</span>
              <span className={`rounded-full px-1.5 py-0.5 font-semibold ${tone}`}>{state}</span>
            </div>
          ))}
        </div>
      );
    case 'tag':
      return (
        <div className="flex flex-wrap justify-center gap-1 text-[9px]">
          {['#교육', '#디자인', '#접근성'].map((tag) => (
            <span key={tag} className="rounded-full bg-primary-soft px-2 py-1 font-medium text-primary-strong">
              {tag} ✕
            </span>
          ))}
        </div>
      );
    case 'accordion':
      return (
        <div className="w-32 space-y-1 text-[10px]">
          <div className="flex justify-between rounded-md border border-line bg-surface px-2 py-1.5 text-muted">
            <span>질문 1</span>
            <span aria-hidden="true">⌄</span>
          </div>
          <div className="rounded-md border border-primary bg-primary-soft px-2 py-1.5 text-primary-strong">
            <div className="flex justify-between">
              <span>질문 2</span>
              <span aria-hidden="true">⌃</span>
            </div>
            <span className="mt-1 block h-1 w-4/5 rounded bg-primary/30" />
          </div>
        </div>
      );
    case 'carousel':
      return (
        <div className="w-28">
          <div className="relative flex h-12 items-center justify-center rounded-md bg-amber-100 text-lg" aria-hidden="true">
            🍜
            <span className="absolute left-0.5 text-[9px] text-zinc-600">‹</span>
            <span className="absolute right-0.5 text-[9px] text-zinc-600">›</span>
          </div>
          <div className="mt-1 flex justify-center gap-1">
            <span className="h-1.5 w-4 rounded-full bg-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-line" />
            <span className="h-1.5 w-1.5 rounded-full bg-line" />
          </div>
        </div>
      );
    case 'calendar':
      return (
        <div className="w-28 rounded-md border border-line bg-surface p-1.5">
          <p className="mb-1 text-center text-[8px] font-semibold">2026년 7월</p>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }, (_, index) => (
              <span key={index} className="relative flex justify-center">
                <span
                  className={`h-2.5 w-full rounded-sm ${index === 12 ? 'bg-primary' : 'bg-line/50'}`}
                />
                {[3, 12, 17].includes(index) && (
                  <span
                    className={`absolute -bottom-0.5 h-0.5 w-0.5 rounded-full ${
                      index === 12 ? 'bg-white' : 'bg-primary'
                    }`}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      );
    case 'timeline':
      return (
        <div className="w-28 border-l-2 border-line pl-2 text-[8px]">
          {[
            ['주문 접수', true],
            ['상품 준비 중', true],
            ['배송 시작', false],
          ].map(([label, done], index) => (
            <div key={index} className="relative pb-1.5 last:pb-0">
              <span
                className={`absolute -left-[0.7rem] top-0.5 h-2 w-2 rounded-full border-2 ${
                  done ? 'border-primary bg-primary' : 'border-line bg-surface'
                }`}
              />
              <span className={done ? 'font-medium' : 'text-muted'}>{label}</span>
            </div>
          ))}
        </div>
      );
    case 'code-block':
      return (
        <div className="w-32 overflow-hidden rounded-md border border-line">
          <div className="flex items-center justify-between bg-background px-1.5 py-0.5 font-mono text-[7px] text-muted">
            <span>greet.js</span>
            <span>복사</span>
          </div>
          <div className="space-y-0.5 bg-surface p-1.5 font-mono text-[7px]">
            <p>
              <span className="text-violet-500">function</span> greet() {'{'}
            </p>
            <p className="pl-2 text-emerald-600">console.log(…)</p>
            <p>{'}'}</p>
          </div>
        </div>
      );

    // ── 상태 알려주기 ────────────────────────────────────────
    case 'modal':
      return (
        <div className="relative h-16 w-28 rounded-md bg-line/60">
          <div className="absolute inset-x-4 top-2.5 rounded-md bg-surface p-1.5 shadow-card">
            <div className="flex justify-between">
              <span className="block h-1.5 w-10 rounded bg-line" />
              <span className="text-[7px] text-muted">✕</span>
            </div>
            <span className="mt-1 block h-1.5 w-8 rounded bg-line/60" />
            <span className="mt-1 block h-2 w-8 rounded bg-primary" />
          </div>
        </div>
      );
    case 'alert-dialog':
      return (
        <div className="relative h-16 w-28 rounded-md bg-line/60">
          <div className="absolute inset-x-3 top-2 rounded-md bg-surface p-1.5 text-center shadow-card">
            <span className="text-[9px]" aria-hidden="true">
              ⚠️
            </span>
            <span className="mx-auto mt-0.5 block h-1.5 w-12 rounded bg-line" />
            <div className="mt-1.5 flex gap-1">
              <span className="h-2.5 flex-1 rounded border border-line" />
              <span className="h-2.5 flex-1 rounded bg-error" />
            </div>
          </div>
        </div>
      );
    case 'popover':
      return (
        <div className="flex flex-col items-center">
          <div className="w-24 rounded-md border border-line bg-surface p-1.5 text-[8px] shadow-card">
            <div className="flex justify-between font-semibold">
              <span>요금제 안내</span>
              <span className="text-muted">✕</span>
            </div>
            <div className="mt-1 flex gap-1">
              <span className="h-2.5 flex-1 rounded border border-primary bg-primary-soft" />
              <span className="h-2.5 flex-1 rounded border border-line" />
            </div>
          </div>
          <span className="-mt-1 h-2 w-2 rotate-45 border-b border-r border-line bg-surface" />
          <span className="mt-1 rounded border border-line bg-surface px-1.5 py-0.5 text-[8px] text-muted">
            안내 보기
          </span>
        </div>
      );
    case 'tooltip':
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-white">설명이에요</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-xs text-muted">
            ?
          </span>
        </div>
      );
    case 'bottom-sheet':
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md bg-line/60">
          <div className="absolute inset-x-0 bottom-0 h-9 rounded-t-lg bg-surface p-1.5">
            <span className="mx-auto block h-1 w-6 rounded bg-line" />
            <span className="mt-1.5 block h-1.5 w-12 rounded bg-line" />
            <span className="mt-1 block h-1.5 w-8 rounded bg-line/60" />
          </div>
        </div>
      );
    case 'drawer':
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md bg-line/60">
          <div className="absolute inset-y-0 right-0 w-12 space-y-1 bg-surface p-1.5">
            <span className="block h-1.5 w-full rounded bg-line" />
            <span className="block h-1.5 w-4/5 rounded bg-line/60" />
            <span className="block h-1.5 w-3/5 rounded bg-line/60" />
            <span className="mt-1 block h-2 w-full rounded bg-primary" />
          </div>
        </div>
      );
    case 'toast':
      return <div className="rounded-full bg-zinc-800 px-4 py-1.5 text-[10px] text-white">저장했어요 ✓</div>;
    case 'banner':
      return (
        <div className="flex w-36 items-start gap-1 rounded-md border border-amber-300 bg-amber-100 px-2 py-1.5 text-[9px] text-amber-800">
          <span aria-hidden="true">⚠</span>
          <span className="flex-1">연결이 불안정해요</span>
          <span aria-hidden="true">✕</span>
        </div>
      );
    case 'spinner':
      return (
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-primary" />
          <span className="text-[9px] text-muted">불러오는 중…</span>
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
    case 'skeleton':
      return (
        <div className="w-32 space-y-1.5">
          <span className="block h-10 animate-pulse rounded-md bg-line/80" />
          <span className="block h-2 w-24 animate-pulse rounded bg-line/80" />
          <span className="block h-2 w-16 animate-pulse rounded bg-line/80" />
        </div>
      );
    case 'empty-state':
      return (
        <div className="text-center text-[10px] text-muted">
          <span className="text-lg" aria-hidden="true">
            📭
          </span>
          <p>아직 항목이 없어요</p>
          <span className="mt-1 inline-block rounded bg-primary px-2 py-0.5 text-[9px] text-white">둘러보기</span>
        </div>
      );
    case 'notification-badge':
      return (
        <div className="flex items-center gap-3">
          <span className="relative text-lg" aria-hidden="true">
            🔔
            <span className="absolute -right-1.5 -top-1 rounded-full bg-error px-1 text-[8px] font-bold text-white">
              3
            </span>
          </span>
          <span className="relative text-lg" aria-hidden="true">
            ✉️
            <span className="absolute -right-2 -top-1 rounded-full bg-error px-1 text-[8px] font-bold text-white">
              99+
            </span>
          </span>
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
