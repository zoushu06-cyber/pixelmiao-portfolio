import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '@/config/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('u-no-scroll', menuOpen);
    return () => document.body.classList.remove('u-no-scroll');
  }, [menuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
        <div className="header__inner u-container">
          <Link to="/" className="header__brand" aria-label={`${site.brand} 首页`}>
            <span className="header__mark">{site.brandMark}</span>
            <span className="header__name">{site.brand}</span>
            <span className="header__edition">{site.edition}</span>
          </Link>

          <nav className="header__nav" aria-label="主导航">
            {site.nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
              >
                <span className="header__link-cn">{item.label}</span>
                <span className="header__link-en">{item.en}</span>
              </NavLink>
            ))}
          </nav>

          <div className="header__right">
            <a className="header__cta" href={`mailto:${site.contact.email}`}>
              LET'S TALK
              <span className="header__cta-dot" />
            </a>
            <button
              className={`header__burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu__nav" aria-label="移动端导航">
          {site.nav.map((item, i) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="mobile-menu__link">
              <span className="mobile-menu__no">0{i + 1}</span>
              <span>{item.label}</span>
              <span className="mobile-menu__en">{item.en}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <span>{site.edition}</span>
        </div>
      </div>
    </>
  );
}
