import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type MenuItem = { to: string; label: string };

type NavigationDrawerProps = {
  open: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
};

// 햄버거 버튼으로 여는 왼쪽 내비게이션 드로어입니다.
// 열리면 포커스가 드로어 안으로 이동하고, ESC나 바깥(배경) 클릭으로 닫히며,
// 닫힌 뒤에는 포커스가 다시 햄버거 버튼으로 돌아갑니다.
export function NavigationDrawer({ open, onClose, menuItems }: NavigationDrawerProps) {
  const drawerRef = useFocusTrap<HTMLDivElement>(open, onClose);

  if (!open) return null;

  // header의 backdrop-blur가 fixed 자손의 containing block이 되어버리는 것을 피하려고
  // body에 직접 포털로 렌더링합니다.
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-ink/50 md:hidden"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        className="relative flex h-full w-72 max-w-[80vw] flex-col bg-surface shadow-raised animate-[drawer-in_0.2s_ease-out]"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-base font-bold">
            <span className="text-primary-strong">Vibe</span>
            <span className="text-ink">Dic</span>
          </span>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-background hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="모바일 메뉴 항목" className="flex-1 overflow-y-auto px-2 py-2">
          <ul>
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block min-h-12 rounded-md px-3 py-3 text-sm font-medium leading-6 ${
                      isActive ? 'bg-primary-soft text-primary-strong' : 'text-ink hover:bg-background'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block min-h-12 rounded-md px-3 py-3 text-sm font-medium leading-6 ${
                    isActive ? 'bg-primary-soft text-primary-strong' : 'text-ink hover:bg-background'
                  }`
                }
              >
                소개
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
