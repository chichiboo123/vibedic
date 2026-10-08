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
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-primary-soft text-primary-strong' : 'text-muted hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center gap-2 px-4">
        <Link to="/" className="flex items-center rounded-md" aria-label="VibeDic 홈으로 이동">
          <Logo />
        </Link>

        <nav aria-label="주요 메뉴" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            aria-label="빠른 검색 열기"
            aria-keyshortcuts="Control+K Meta+K /"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-primary-soft hover:text-primary-strong sm:border sm:border-line sm:bg-background sm:pr-2"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">검색</span>
            <kbd className="hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-sans text-[11px] text-muted sm:inline">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <Link
            to="/saved"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-primary-soft hover:text-primary-strong"
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">저장함</span>
            <span className="sr-only sm:hidden">저장함</span>
            {saved.length > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white"
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
            className="hidden min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-primary-soft hover:text-primary-strong lg:inline-flex"
            aria-haspopup="dialog"
            aria-label="사용법 보기"
            onClick={() => setGuideOpen(true)}
          >
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            사용법
          </button>

          {/* 좁은 화면: 햄버거 버튼으로 전체 메뉴 드로어를 엽니다. */}
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-primary-soft hover:text-primary-strong lg:hidden"
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
