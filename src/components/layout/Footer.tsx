import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { workCategories } from '@/data/works';

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer theme-dark">
      <div className="u-container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <span className="footer__logo">
              {site.brandMark} <span>{site.brand}</span>
            </span>
            <p>{site.brandCn} · {site.hero.sub}</p>
            <span className="footer__availability">
              <i /> {site.contact.availability}
            </span>
          </div>

          <div className="footer__col">
            <h3>导航 / SITEMAP</h3>
            <ul>
              {site.nav.map(item => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>方向 / FIELDS</h3>
            <ul>
              {workCategories.slice(1).map(cat => (
                <li key={cat}>
                  <Link to="/works">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>联系 / CONNECT</h3>
            <ul>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              {site.contact.links.map(link => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{site.footer.copyright}</span>
          <span>{site.footer.note}</span>
          <button onClick={toTop} className="footer__totop">
            回到顶部
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 16V4M5.5 8.5 10 4l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
