import { useEffect } from 'react';
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
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <ScrollProgress />
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
