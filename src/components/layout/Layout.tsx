import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Assistant } from '../assistant/Assistant';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // .spotlight 카드 위에서 마우스 위치를 CSS 변수로 넘겨, 빛이 포인터를 따라오게 합니다.
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:text-background focus:px-4 focus:py-2"
      >
        본문으로 바로가기
      </a>
      <Header />
      <main id="main-content" className="mx-auto w-full max-w-page flex-1 px-4 pb-16 pt-8 sm:pt-10">
        <Outlet />
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}
