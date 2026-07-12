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

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        본문으로 바로가기
      </a>
      <Header />
      <main id="main-content" className="mx-auto w-full max-w-page flex-1 px-4 pb-12 pt-6">
        <Outlet />
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}
