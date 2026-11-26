import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { BackToTop } from './BackToTop';

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => window.clearTimeout(timer);
    }
    // 路由切换回到顶部：用 instant 走完，避免全站 smooth 让长页面「飞」回去
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <>
      <ScrollProgress />
      <main key={pathname} className="page-enter">
        <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
