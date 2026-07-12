import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bookmark, HelpCircle, Menu, Search, X } from 'lucide-react';
import { useSavedItems } from '../../hooks/useSavedItems';
import { NavigationDrawer } from './NavigationDrawer';
import { UsageGuideModal } from './UsageGuideModal';

const menuItems = [
  { to: '/ui', label: 'UI 요소' },
  { to: '/ux', label: 'UX 패턴' },
  { to: '/services', label: '유명 서비스' },
  { to: '/compare', label: '기기별 비교' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const guideButtonRef = useRef<HTMLButtonElement>(null);
  const { saved } = useSavedItems();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-page items-center gap-2 px-4">
        <Link to="/" className="flex items-center gap-1 text-lg font-bold" aria-label="VibeDic 홈으로 이동">
          <span className="text-primary-strong">Vibe</span>
          <span className="text-ink">Dic</span>
        </Link>

        <nav aria-label="주요 메뉴" className="ml-4 hidden md:block">
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
          <Link
            to="/search"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-primary-soft hover:text-primary-strong"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">검색</span>
            <span className="sr-only sm:hidden">검색</span>
          </Link>
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

          {/* 넓은 화면: 가로 메뉴 옆에 사용법 버튼을 둡니다. */}
          <button
            ref={guideButtonRef}
            type="button"
            className="hidden min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-primary-soft hover:text-primary-strong md:inline-flex"
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
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-primary-soft hover:text-primary-strong md:hidden"
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
    </header>
  );
}
