import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Home,
  Menu,
  MessageCircle,
  Pencil,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { BrowserFrame, DemoNote, PhoneFrame, Skeletonish } from './frames';

// 내비게이션(navigation) 요소 데모 — 실제로 화면을 옮겨 다녀 볼 수 있게 만들었습니다.

const mainMenuTree = [
  {
    label: '패션',
    children: ['여성 의류', '남성 의류', '가방·잡화', '신발'],
  },
  {
    label: '가전',
    children: ['노트북', 'TV·모니터', '주방 가전', '음향 기기'],
  },
  {
    label: '식품',
    children: ['신선식품', '간편식', '음료·커피', '건강식품'],
  },
];

export function MainMenuDemo() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [chosen, setChosen] = useState('');

  return (
    <div
      onMouseLeave={() => setOpenMenu(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(null);
      }}
    >
      <BrowserFrame label="shop.example.com">
        <div className="relative h-52">
          <nav aria-label="전체 메뉴" className="flex gap-1 border-b border-line bg-surface px-3 py-2">
            {mainMenuTree.map((menu) => (
              <button
                key={menu.label}
                type="button"
                aria-expanded={openMenu === menu.label}
                onClick={() => setOpenMenu((current) => (current === menu.label ? null : menu.label))}
                onMouseEnter={() => setOpenMenu(menu.label)}
                className={`flex min-h-10 items-center gap-1 rounded-md px-3 text-sm ${
                  openMenu === menu.label ? 'bg-primary-soft font-semibold text-primary-strong' : 'text-muted hover:text-ink'
                }`}
              >
                {menu.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${openMenu === menu.label ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>
          {openMenu && (
            <div className="absolute inset-x-0 top-[3.25rem] z-10 border-b border-line bg-surface p-3 shadow-raised">
              <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                {mainMenuTree
                  .find((menu) => menu.label === openMenu)
                  ?.children.map((child) => (
                    <li key={child}>
                      <button
                        type="button"
                        onClick={() => {
                          setChosen(`${openMenu} › ${child}`);
                          setOpenMenu(null);
                        }}
                        className="min-h-10 w-full rounded-md px-2 text-left text-xs text-muted hover:bg-background hover:text-ink"
                      >
                        {child}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <div className="space-y-2 p-3">
            <Skeletonish className="h-3 w-2/3" />
            <Skeletonish className="h-3 w-full" />
            <Skeletonish className="h-3 w-1/2" />
          </div>
        </div>
      </BrowserFrame>
      <DemoNote>
        {chosen ? `${chosen} 카테고리로 이동했어요.` : '상위 메뉴에 마우스를 올리거나 눌러 하위 메뉴를 펼쳐 보세요.'}
      </DemoNote>
    </div>
  );
}

const bottomNavTabs = [
  { id: 'home', label: '홈', Icon: Home },
  { id: 'search', label: '검색', Icon: Search },
  { id: 'cart', label: '장바구니', Icon: ShoppingBag, badge: 3 },
  { id: 'my', label: '마이', Icon: User },
];

export function BottomNavigationDemo() {
  const [active, setActive] = useState('home');
  const current = bottomNavTabs.find((tab) => tab.id === active);

  return (
    <div>
      <PhoneFrame label="모바일 앱 화면">
        <div className="flex h-64 flex-col bg-background">
          <div className="flex-1 space-y-2 overflow-hidden p-3">
            <p className="text-sm font-semibold">{current?.label} 화면</p>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeletonish key={index} className={`h-4 ${index % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
            ))}
          </div>
          <nav
            aria-label="하단 내비게이션"
            className="flex border-t border-line bg-surface"
          >
            {bottomNavTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-current={active === tab.id ? 'page' : undefined}
                onClick={() => setActive(tab.id)}
                className={`relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] ${
                  active === tab.id ? 'font-semibold text-primary-strong' : 'text-muted'
                }`}
              >
                <span className="relative">
                  <tab.Icon className="h-5 w-5" aria-hidden="true" />
                  {tab.badge && (
                    <span className="absolute -right-1.5 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-error px-1 text-[8px] font-bold text-white">
                      {tab.badge}
                    </span>
                  )}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </PhoneFrame>
      <DemoNote>
        {current?.label}을(를) 보고 있어요. 엄지가 닿는 아래쪽에 늘 붙어 있어 이동이 빠릅니다.
      </DemoNote>
    </div>
  );
}

const drawerMenus = ['홈', '내 학습', '알림', '설정', '고객센터'];

export function NavigationDrawerDemo() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('홈');
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div>
      <PhoneFrame label="모바일 앱 화면">
        <div className="relative h-64 overflow-hidden bg-background">
          <div className="flex items-center gap-2 border-b border-line bg-surface px-2 py-2.5">
            <button
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="text-sm font-semibold">{active}</span>
          </div>
          <div className="space-y-2 p-3">
            <Skeletonish className="h-4 w-full" />
            <Skeletonish className="h-4 w-2/3" />
            <Skeletonish className="h-4 w-5/6" />
          </div>

          {open && (
            <div
              className="absolute inset-0 z-20 bg-black/40"
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div
                ref={trapRef}
                role="dialog"
                aria-modal="true"
                aria-label="메뉴"
                className="h-full w-44 bg-surface p-2 shadow-raised"
              >
                <div className="flex items-center justify-between px-1 pb-2">
                  <span className="text-xs font-bold">메뉴</span>
                  <button
                    type="button"
                    aria-label="메뉴 닫기"
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-background"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <ul>
                  {drawerMenus.map((menu) => (
                    <li key={menu}>
                      <button
                        type="button"
                        aria-current={active === menu ? 'page' : undefined}
                        onClick={() => {
                          setActive(menu);
                          setOpen(false);
                        }}
                        className={`flex min-h-11 w-full items-center rounded-md px-2 text-left text-sm ${
                          active === menu
                            ? 'bg-primary-soft font-semibold text-primary-strong'
                            : 'text-muted hover:bg-background'
                        }`}
                      >
                        {menu}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>
      <DemoNote>
        {open
          ? '바깥을 누르거나 ESC를 눌러도 닫혀요.'
          : `햄버거 버튼으로 서랍을 열어 보세요. 지금은 ‘${active}’ 화면입니다.`}
      </DemoNote>
    </div>
  );
}

const railItems = [
  { id: 'home', label: '홈', Icon: Home },
  { id: 'chat', label: '메시지', Icon: MessageCircle },
  { id: 'star', label: '즐겨찾기', Icon: Star },
  { id: 'settings', label: '설정', Icon: Settings },
];

export function NavigationRailDemo() {
  const [active, setActive] = useState('home');
  const [showLabels, setShowLabels] = useState(true);
  const current = railItems.find((item) => item.id === active);

  return (
    <div>
      <label className="mb-3 flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showLabels}
          onChange={(event) => setShowLabels(event.target.checked)}
          className="h-4 w-4 accent-[var(--color-primary)]"
        />
        아이콘 아래 이름 보이기
      </label>
      <BrowserFrame label="app.example.com">
        <div className="flex h-52">
          <nav
            aria-label="내비게이션 레일"
            className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-line bg-surface py-2"
          >
            {railItems.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={active === item.id ? 'page' : undefined}
                aria-label={item.label}
                onClick={() => setActive(item.id)}
                className={`flex w-14 flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] ${
                  active === item.id
                    ? 'bg-primary-soft font-semibold text-primary-strong'
                    : 'text-muted hover:bg-background'
                }`}
              >
                <item.Icon className="h-5 w-5" aria-hidden="true" />
                {showLabels && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="flex-1 space-y-2 p-3">
            <p className="text-sm font-semibold">{current?.label}</p>
            <Skeletonish className="h-3 w-full" />
            <Skeletonish className="h-3 w-2/3" />
            <Skeletonish className="h-3 w-4/5" />
          </div>
        </div>
      </BrowserFrame>
      <DemoNote>
        {showLabels
          ? '이름을 함께 보여 주면 처음 쓰는 사람도 헷갈리지 않아요.'
          : '아이콘만 두면 좁아지지만, 무슨 기능인지 알기 어려워집니다.'}
      </DemoNote>
    </div>
  );
}

const breadcrumbTrail = ['홈', '가전', '노트북', '13인치 노트북'];

export function BreadcrumbDemo() {
  const [depth, setDepth] = useState(breadcrumbTrail.length);
  const visible = breadcrumbTrail.slice(0, depth);

  return (
    <div>
      <BrowserFrame label="shop.example.com">
        <div className="h-40 p-3">
          <nav aria-label="현재 위치">
            <ol className="flex flex-wrap items-center gap-1 text-xs">
              {visible.map((crumb, index) => {
                const isLast = index === visible.length - 1;
                return (
                  <li key={crumb} className="flex items-center gap-1">
                    {isLast ? (
                      <span aria-current="page" className="font-semibold">
                        {crumb}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDepth(index + 1)}
                        className="rounded px-1 py-0.5 text-muted underline-offset-2 hover:text-primary-strong hover:underline"
                      >
                        {crumb}
                      </button>
                    )}
                    {!isLast && (
                      <ChevronRight className="h-3 w-3 text-muted" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold">{visible[visible.length - 1]}</p>
            <Skeletonish className="h-3 w-full" />
            <Skeletonish className="h-3 w-3/5" />
          </div>
          {depth < breadcrumbTrail.length && (
            <button
              type="button"
              onClick={() => setDepth(breadcrumbTrail.length)}
              className="mt-3 min-h-10 rounded-lg border border-line bg-surface px-3 text-xs font-semibold hover:bg-background"
            >
              다시 상세 페이지로 들어가기
            </button>
          )}
        </div>
      </BrowserFrame>
      <DemoNote>
        {depth === breadcrumbTrail.length
          ? '앞쪽 경로를 눌러 상위 단계로 한 번에 올라가 보세요.'
          : `‘${visible[visible.length - 1]}’ 단계로 올라왔어요.`}
      </DemoNote>
    </div>
  );
}

const dropdownActions = [
  { label: '이름 바꾸기', Icon: Pencil },
  { label: '복제하기', Icon: Copy },
  { label: '삭제하기', Icon: Trash2, danger: true },
];

export function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const { showToast } = useToast();

  const choose = (label: string) => {
    setOpen(false);
    buttonRef.current?.focus();
    showToast(`${label}를 실행했어요.`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((index) => (index + 1) % dropdownActions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((index) => (index - 1 + dropdownActions.length) % dropdownActions.length);
    } else if (event.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(dropdownActions[highlighted].label);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="relative w-fit">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            setOpen((value) => !value);
            setHighlighted(0);
          }}
          className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          문서 메뉴
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {open && (
          <ul
            id={menuId}
            role="menu"
            aria-label="문서 메뉴"
            className="absolute left-0 top-full z-10 mt-1 w-44 rounded-lg border border-line bg-surface py-1 shadow-raised"
          >
            {dropdownActions.map((action, index) => (
              <li key={action.label} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => choose(action.label)}
                  className={`flex min-h-11 w-full items-center gap-2 px-3 text-left text-sm ${
                    index === highlighted ? 'bg-primary-soft' : ''
                  } ${action.danger ? 'text-error' : ''}`}
                >
                  <action.Icon className="h-4 w-4" aria-hidden="true" />
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DemoNote>
        버튼을 누른 뒤 ↑ ↓ 키로 옮기고 Enter로 실행해 보세요. ESC를 누르면 버튼으로 포커스가 돌아옵니다.
      </DemoNote>
    </div>
  );
}

export function ContextMenuDemo() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [lastAction, setLastAction] = useState('');
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(null);
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const openAt = (clientX: number, clientY: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMenu({
      x: Math.min(Math.max(clientX - rect.left, 0), rect.width - 150),
      y: Math.min(Math.max(clientY - rect.top, 0), rect.height - 120),
    });
  };

  return (
    <div>
      <div
        ref={areaRef}
        onContextMenu={(event) => {
          event.preventDefault();
          openAt(event.clientX, event.clientY);
        }}
        className="relative h-44 overflow-hidden rounded-card border border-dashed border-line bg-background p-3"
      >
        <p className="text-sm font-semibold">사진 폴더</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {['🌄', '🎂', '🐶', '🏖️'].map((emoji) => (
            <span
              key={emoji}
              aria-hidden="true"
              className="flex h-12 items-center justify-center rounded-md bg-surface text-xl shadow-card"
            >
              {emoji}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            const rect = event.currentTarget.getBoundingClientRect();
            openAt(rect.left, rect.bottom);
          }}
          className="mt-3 min-h-10 rounded-lg border border-line bg-surface px-3 text-xs font-semibold hover:bg-surface/80"
        >
          마우스 오른쪽 클릭 대신 여기를 눌러도 열려요
        </button>

        {menu && (
          <ul
            role="menu"
            aria-label="사진 상황별 메뉴"
            style={{ left: menu.x, top: menu.y }}
            onClick={(event) => event.stopPropagation()}
            className="absolute z-10 w-36 rounded-lg border border-line bg-surface py-1 text-sm shadow-raised"
          >
            {['새 폴더', '이름 바꾸기', '정보 보기'].map((action) => (
              <li key={action} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setLastAction(action);
                    setMenu(null);
                  }}
                  className="min-h-10 w-full px-3 text-left hover:bg-primary-soft"
                >
                  {action}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DemoNote>
        {lastAction
          ? `‘${lastAction}’을(를) 선택했어요. 누른 자리 바로 옆에 메뉴가 뜹니다.`
          : '영역 안에서 마우스 오른쪽 버튼을 눌러 보세요. 모바일에서는 버튼으로 대신 엽니다.'}
      </DemoNote>
    </div>
  );
}

const commands = [
  { label: '새 문서 만들기', hint: '문서' },
  { label: '설정 열기', hint: '환경' },
  { label: '다크 모드 켜기', hint: '테마' },
  { label: '내보내기 (PDF)', hint: '문서' },
  { label: '팀원 초대하기', hint: '공유' },
];

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const [ran, setRan] = useState('');
  const inputId = useId();
  const listId = useId();
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));

  const matches = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return commands;
    return commands.filter((command) => command.label.includes(trimmed) || command.hint.includes(trimmed));
  }, [query]);

  const run = (label: string) => {
    setRan(label);
    setOpen(false);
    setQuery('');
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setHighlighted(0);
        }}
        className="flex min-h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm text-muted hover:bg-background"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="flex-1 text-left">무엇이든 검색하거나 실행하기</span>
        <kbd className="rounded border border-line bg-background px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-24"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="명령 팔레트"
            className="w-full max-w-md overflow-hidden rounded-card bg-surface shadow-raised"
          >
            <div className="flex items-center gap-2 border-b border-line px-3">
              <Search className="h-4 w-4 text-muted" aria-hidden="true" />
              <label htmlFor={inputId} className="sr-only">
                명령 검색
              </label>
              <input
                id={inputId}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlighted(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setHighlighted((index) => Math.min(index + 1, matches.length - 1));
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setHighlighted((index) => Math.max(index - 1, 0));
                  } else if (event.key === 'Enter' && matches[highlighted]) {
                    event.preventDefault();
                    run(matches[highlighted].label);
                  }
                }}
                placeholder="예: 문서, 테마, 초대"
                className="min-h-12 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <ul id={listId} role="listbox" aria-label="실행할 수 있는 명령" className="max-h-56 overflow-auto py-1">
              {matches.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted">일치하는 명령이 없어요.</li>
              )}
              {matches.map((command, index) => (
                <li key={command.label} role="option" aria-selected={index === highlighted}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => run(command.label)}
                    className={`flex min-h-11 w-full items-center justify-between px-4 text-left text-sm ${
                      index === highlighted ? 'bg-primary-soft text-primary-strong' : ''
                    }`}
                  >
                    {command.label}
                    <span className="text-xs text-muted">{command.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <DemoNote>
        {ran ? `‘${ran}’을(를) 실행했어요.` : '열어서 검색어를 입력하고 ↑ ↓ · Enter로 실행해 보세요.'}
      </DemoNote>
    </div>
  );
}
