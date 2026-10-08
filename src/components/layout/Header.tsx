import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bookmark, HelpCircle, Menu, Search, X } from 'lucide-react';
import { useSavedItems } from '../../hooks/useSavedItems';
import { NavigationDrawer } from './NavigationDrawer';
import { UsageGuideModal } from './UsageGuideModal';
import { ThemeToggle } from './ThemeToggle';
import { QuickSearch } from './QuickSearch';
import { Logo } from './Logo';

const menuItems = [
  { to: '/ui', label: 'UI 요소' },
  { to: '/ux', label: 'UX 패턴' },
  { to: '/versus', label: '헷갈리는 UI' },
  { to: '/compare', label: '기기별 비교' },
  { to: '/services', label: '유명 서비스' },
];

// 입력 중인 칸에서 / 를 눌렀을 때까지 빠른 검색을 가로채지 않도록 확인합니다.
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const guideButtonRef = useRef<HTMLButtonElement>(null);
  const { saved } = useSavedItems();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Ctrl/⌘ + K, 또는 입력 중이 아닐 때 / 키로 어디서나 빠른 검색을 엽니다.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !isTypingTarget(event.target);
      if (isShortcut || isSlash) {
        event.preventDefault();
        setSearchOpen((open) => (isShortcut ? !open : true));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const openGuideFromDrawer = () => {
    setMenuOpen(false);
    setGuideOpen(true);
  };

  const closeGuide = () => {
    setGuideOpen(false);
    guideButtonRef.current?.focus();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-9 items-center rounded-full px-3.5 text-sm font-medium transition-all ${
      isActive ? 'bg-surface text-ink shadow-card ring-1 ring-line' : 'text-muted hover:text-ink'
    }`;

  const iconButtonClass =
    'inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink';

  return (
    // 화면 위에 떠 있는 섬(island) 모양의 유리 헤더입니다.
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="glass mx-auto flex h-14 max-w-page items-center gap-2 rounded-full pl-4 pr-1.5 shadow-raised">
        <Link to="/" className="flex items-center rounded-full" aria-label="VibeDic 홈으로 이동">
          <Logo />
        </Link>

        <nav aria-label="주요 메뉴" className="ml-3 hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-background/70 p-1 ring-1 ring-line/70">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            aria-label="빠른 검색 열기"
            aria-keyshortcuts="Control+K Meta+K /"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink sm:min-h-10 sm:bg-background/80 sm:pl-3.5 sm:pr-1.5 sm:ring-1 sm:ring-line"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">검색</span>
            <kbd className="hidden rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-muted ring-1 ring-line sm:inline">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <Link
            to="/saved"
            className={`relative ${iconButtonClass}`}
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">저장함</span>
            <span className="sr-only xl:hidden">저장함</span>
            {saved.length > 0 && (
              <span
                className="absolute right-0 top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold text-accent-ink ring-2 ring-surface"
                aria-label={`저장한 항목 ${saved.length}개`}
              >
                {saved.length > 99 ? '99+' : saved.length}
              </span>
            )}
          </Link>

          <ThemeToggle />

          {/* 넓은 화면: 가로 메뉴 옆에 사용법 버튼을 둡니다. */}
          <button
            ref={guideButtonRef}
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink lg:inline-flex"
            aria-haspopup="dialog"
            aria-label="사용법 보기"
            onClick={() => setGuideOpen(true)}
          >
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">사용법</span>
          </button>

          {/* 좁은 화면: 햄버거 버튼으로 전체 메뉴 드로어를 엽니다. */}
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink text-background transition-transform active:scale-95 lg:hidden"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <NavigationDrawer
        open={menuOpen}
        onClose={closeMenu}
        menuItems={menuItems}
        onOpenGuide={openGuideFromDrawer}
      />
      <UsageGuideModal open={guideOpen} onClose={closeGuide} />
      <QuickSearch open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
