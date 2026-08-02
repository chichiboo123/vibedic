import { useId, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, Heart, Menu, PanelLeftClose, PanelLeftOpen, Search, Share2 } from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { BrowserFrame, DemoNote, PhoneFrame, Skeletonish } from './frames';

// 배치(layout) 요소 데모 — 화면 안에서 어떤 자리를 차지하는지 직접 조작해 보는 형태입니다.

const headerMenus = ['홈', '둘러보기', '요금제', '문의'];

export function HeaderDemo() {
  const [active, setActive] = useState('홈');
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <BrowserFrame label="example.com">
        <div
          ref={scrollRef}
          onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 8)}
          className="h-56 overflow-y-auto"
        >
          <header
            className={`sticky top-0 z-10 flex items-center gap-3 bg-surface px-3 py-2.5 transition-shadow ${
              scrolled ? 'shadow-card' : ''
            }`}
          >
            <span className="text-sm font-bold text-primary-strong">로고</span>
            <nav aria-label="주요 메뉴" className="flex flex-1 gap-1">
              {headerMenus.map((menu) => (
                <button
                  key={menu}
                  type="button"
                  aria-current={active === menu ? 'page' : undefined}
                  onClick={() => setActive(menu)}
                  className={`rounded-md px-2 py-1.5 text-xs ${
                    active === menu ? 'bg-primary-soft font-semibold text-primary-strong' : 'text-muted hover:text-ink'
                  }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
            <button
              type="button"
              aria-label="검색"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </header>
          <div className="space-y-2 p-3">
            <p className="text-sm font-semibold">{active} 화면</p>
            {Array.from({ length: 8 }, (_, index) => (
              <Skeletonish key={index} className={`h-3 ${index % 3 === 0 ? 'w-3/4' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </BrowserFrame>
      <DemoNote>
        {scrolled
          ? '아래로 내려도 헤더가 위에 붙어 있어요. 그림자로 본문과 층이 구분됩니다.'
          : '본문을 아래로 스크롤하고, 메뉴도 눌러 보세요.'}
      </DemoNote>
    </div>
  );
}

const footerColumns = [
  { title: '서비스', links: ['소개', '요금제', '업데이트'] },
  { title: '지원', links: ['도움말', '문의하기', '이용약관'] },
  { title: '회사', links: ['채용', '블로그', '보도자료'] },
];

export function FooterDemo() {
  const [openColumn, setOpenColumn] = useState<string | null>('서비스');
  const [wide, setWide] = useState(true);

  return (
    <div>
      <div className="mb-3 inline-flex rounded-xl bg-background p-1">
        {[
          { label: 'PC 너비', value: true },
          { label: '모바일 너비', value: false },
        ].map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={wide === option.value}
            onClick={() => setWide(option.value)}
            className={`min-h-10 rounded-lg px-4 text-sm font-medium ${
              wide === option.value ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={wide ? '' : 'mx-auto max-w-[280px]'}>
        <footer className="rounded-card border border-line bg-surface p-4">
          <div className={wide ? 'grid grid-cols-3 gap-4' : 'space-y-1'}>
            {footerColumns.map((column) => (
              <div key={column.title}>
                {wide ? (
                  <p className="text-xs font-bold">{column.title}</p>
                ) : (
                  <button
                    type="button"
                    aria-expanded={openColumn === column.title}
                    onClick={() =>
                      setOpenColumn((current) => (current === column.title ? null : column.title))
                    }
                    className="flex min-h-11 w-full items-center justify-between border-b border-line text-xs font-bold"
                  >
                    {column.title}
                    <ChevronDown
                      className={`h-4 w-4 text-muted transition-transform ${
                        openColumn === column.title ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )}
                {(wide || openColumn === column.title) && (
                  <ul className="mt-1.5 space-y-1 text-xs text-muted">
                    {column.links.map((link) => (
                      <li key={link}>{link}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3 text-[11px] text-muted">
            © 2026 예시 서비스 · 사업자등록번호 000-00-00000
          </p>
        </footer>
      </div>
      <DemoNote>
        {wide
          ? 'PC에서는 링크를 여러 열로 펼쳐 둡니다.'
          : '좁은 화면에서는 접었다 펴는 방식으로 바꿔 세로 길이를 줄여요.'}
      </DemoNote>
    </div>
  );
}

const sidebarItems = [
  { icon: '🏠', label: '대시보드' },
  { icon: '📁', label: '내 문서' },
  { icon: '👥', label: '공유 문서' },
  { icon: '⭐', label: '즐겨찾기' },
  { icon: '🗑️', label: '휴지통' },
];

export function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('대시보드');

  return (
    <div>
      <BrowserFrame label="docs.example.com">
        <div className="flex h-56">
          <nav
            aria-label="사이드바 메뉴"
            className={`flex shrink-0 flex-col gap-0.5 border-r border-line bg-surface p-1.5 transition-all ${
              collapsed ? 'w-12' : 'w-32'
            }`}
          >
            <button
              type="button"
              aria-expanded={!collapsed}
              aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
              onClick={() => setCollapsed((value) => !value)}
              className="mb-1 flex h-9 items-center justify-center rounded-md text-muted hover:bg-background"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                aria-current={active === item.label ? 'page' : undefined}
                title={item.label}
                onClick={() => setActive(item.label)}
                className={`flex h-9 items-center gap-2 rounded-md px-2 text-xs ${
                  collapsed ? 'justify-center' : ''
                } ${
                  active === item.label
                    ? 'bg-primary-soft font-semibold text-primary-strong'
                    : 'text-muted hover:bg-background'
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="flex-1 space-y-2 p-3">
            <p className="text-sm font-semibold">{active}</p>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeletonish key={index} className={`h-3 ${index % 2 === 0 ? 'w-full' : 'w-2/3'}`} />
            ))}
          </div>
        </div>
      </BrowserFrame>
      <DemoNote>
        {collapsed
          ? '접으면 아이콘만 남아 본문이 넓어져요. 이름은 툴팁으로 확인합니다.'
          : `‘${active}’ 화면을 보고 있어요. 왼쪽 위 버튼으로 접어 보세요.`}
      </DemoNote>
    </div>
  );
}

export function TopAppBarDemo() {
  const [screen, setScreen] = useState<'list' | 'detail'>('list');
  const { showToast } = useToast();

  return (
    <div>
      <PhoneFrame label="모바일 앱 화면">
        <div className="h-64 bg-background">
          <div className="flex items-center gap-2 bg-primary px-2 py-2.5 text-white">
            {screen === 'detail' ? (
              <button
                type="button"
                aria-label="뒤로 가기"
                onClick={() => setScreen('list')}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="메뉴 열기"
                onClick={() => showToast('메뉴를 여는 자리예요.')}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <h3 className="flex-1 truncate text-sm font-semibold">
              {screen === 'list' ? '받은 메일함' : '주간 회의 안내'}
            </h3>
            <button
              type="button"
              aria-label={screen === 'list' ? '검색' : '공유'}
              onClick={() => showToast(screen === 'list' ? '검색 화면으로 이동해요.' : '공유 시트를 열어요.')}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
            >
              {screen === 'list' ? (
                <Search className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Share2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {screen === 'list' ? (
            <ul className="divide-y divide-line">
              {['주간 회의 안내', '결제 영수증', '새 댓글 알림'].map((mail) => (
                <li key={mail}>
                  <button
                    type="button"
                    onClick={() => setScreen('detail')}
                    className="flex min-h-11 w-full items-center gap-2 px-3 py-2.5 text-left text-xs hover:bg-surface"
                  >
                    <span aria-hidden="true" className="h-6 w-6 shrink-0 rounded-full bg-primary-soft" />
                    <span className="truncate">{mail}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2 p-3 text-xs">
              <p className="font-semibold">주간 회의 안내</p>
              <p className="text-muted">이번 주 회의는 목요일 오후 3시에 진행합니다.</p>
              <Skeletonish className="h-3 w-full" />
              <Skeletonish className="h-3 w-4/5" />
            </div>
          )}
        </div>
      </PhoneFrame>
      <DemoNote>
        {screen === 'list'
          ? '목록을 눌러 상세로 들어가 보세요. 상단 바의 버튼이 화면에 맞게 바뀝니다.'
          : '상세 화면에서는 메뉴 대신 뒤로 가기, 검색 대신 공유가 놓여요.'}
      </DemoNote>
    </div>
  );
}

const cardItems = [
  { title: '북한산 근처 조용한 집', price: '128,000원', rating: '4.92', emoji: '🏡' },
  { title: '바다가 보이는 원룸', price: '95,000원', rating: '4.78', emoji: '🌊' },
];

export function CardDemo() {
  const [liked, setLiked] = useState<string[]>([]);
  const { showToast } = useToast();

  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {cardItems.map((card) => (
          <li key={card.title}>
            <article className="group relative overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-raised">
              <div className="flex h-24 items-center justify-center bg-primary-soft text-3xl" aria-hidden="true">
                {card.emoji}
              </div>
              <button
                type="button"
                aria-pressed={liked.includes(card.title)}
                aria-label={`${card.title} 찜하기`}
                onClick={() =>
                  setLiked((current) =>
                    current.includes(card.title)
                      ? current.filter((title) => title !== card.title)
                      : [...current, card.title],
                  )
                }
                className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-muted shadow-card"
              >
                <Heart
                  className={`h-4 w-4 ${liked.includes(card.title) ? 'fill-rose-500 text-rose-500' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div className="p-3">
                <h3 className="text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => showToast(`${card.title} 상세로 이동해요.`)}
                    className="text-left after:absolute after:inset-0 after:content-['']"
                  >
                    {card.title}
                  </button>
                </h3>
                <p className="mt-1 text-xs text-muted">★ {card.rating} · 1박</p>
                <p className="mt-1 text-sm font-semibold">{card.price}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <DemoNote>
        {liked.length > 0
          ? `${liked.length}개를 찜했어요. 카드 전체가 링크지만 하트는 따로 눌립니다.`
          : '카드 어디를 눌러도 상세로 가고, 하트만 따로 눌려요.'}
      </DemoNote>
    </div>
  );
}

export function DividerDemo() {
  const [showDivider, setShowDivider] = useState(true);
  const switchId = useId();
  const rows = [
    { label: '알림', value: '켜짐' },
    { label: '언어', value: '한국어' },
    { label: '테마', value: '시스템 설정' },
    { label: '버전', value: '1.4.2' },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between rounded-card border border-line bg-surface px-4 py-3">
        <label htmlFor={switchId} className="text-sm font-medium">
          구분선 보이기
        </label>
        <input
          id={switchId}
          type="checkbox"
          checked={showDivider}
          onChange={(event) => setShowDivider(event.target.checked)}
          className="h-4.5 w-4.5 accent-[var(--color-primary)]"
        />
      </div>
      <ul
        className={`max-w-sm overflow-hidden rounded-card border border-line bg-surface ${
          showDivider ? 'divide-y divide-line' : ''
        }`}
      >
        {rows.map((row) => (
          <li key={row.label} className="flex min-h-11 items-center justify-between px-4 py-3 text-sm">
            <span>{row.label}</span>
            <span className="text-muted">{row.value}</span>
          </li>
        ))}
      </ul>
      <DemoNote>
        {showDivider
          ? '얇은 선 하나로 항목의 경계가 분명해집니다.'
          : '선을 없애면 어디까지가 한 항목인지 헷갈리기 시작해요.'}
      </DemoNote>
    </div>
  );
}

export function HeroSectionDemo() {
  const [variant, setVariant] = useState<'image' | 'text'>('image');
  const { showToast } = useToast();

  return (
    <div>
      <div className="mb-3 inline-flex rounded-xl bg-background p-1">
        {[
          { label: '이미지형', value: 'image' as const },
          { label: '문구 중심형', value: 'text' as const },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={variant === option.value}
            onClick={() => setVariant(option.value)}
            className={`min-h-10 rounded-lg px-4 text-sm font-medium ${
              variant === option.value ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <BrowserFrame label="example.com">
        <section
          className={`p-5 ${
            variant === 'image'
              ? 'flex flex-col items-center gap-4 bg-primary-soft/60 text-center sm:flex-row sm:text-left'
              : 'bg-surface text-center'
          }`}
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-snug">
              화면 속 그 이름, <br className="hidden sm:block" />
              3초 만에 찾아보세요
            </h3>
            <p className="mt-2 text-sm text-muted">
              UI 요소와 UX 패턴을 쉬운 말로 정리한 사전이에요.
            </p>
            <div className={`mt-4 flex flex-wrap gap-2 ${variant === 'text' ? 'justify-center' : ''}`}>
              <button
                type="button"
                onClick={() => showToast('가입 화면으로 이동해요.')}
                className="min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                무료로 시작하기
              </button>
              <button
                type="button"
                onClick={() => showToast('소개 영상을 재생해요.')}
                className="min-h-11 rounded-lg border border-line bg-surface px-5 text-sm font-semibold hover:bg-background"
              >
                둘러보기
              </button>
            </div>
          </div>
          {variant === 'image' && (
            <div
              aria-hidden="true"
              className="flex h-28 w-full shrink-0 items-center justify-center rounded-card bg-surface text-4xl shadow-card sm:w-40"
            >
              📚
            </div>
          )}
        </section>
      </BrowserFrame>
      <DemoNote>
        {variant === 'image'
          ? '이미지형은 분위기를 먼저 전달하고, 버튼은 왼쪽 아래에 둡니다.'
          : '문구 중심형은 읽는 순서가 한 줄로 이어져 메시지가 더 또렷해요.'}
      </DemoNote>
    </div>
  );
}
