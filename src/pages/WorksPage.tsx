import { useState } from 'react';
import { site } from '@/config/site';
import { workCategories, works, type WorkCategory } from '@/data/works';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BlurText } from '@/components/motion/BlurText';
import { Reveal } from '@/components/motion/Reveal';
import { WorkGrid } from '@/components/works/WorkGrid';

type Filter = '全部' | WorkCategory;

export default function WorksPage() {
  const [active, setActive] = useState<Filter>('全部');
  const filtered = active === '全部' ? works : works.filter(w => w.category === active);

  return (
    <>
      <Section theme="dark" className="page-hero" label="作品页首屏">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="u-container page-hero__inner">
          <div className="page-hero__top">
            <span className="u-eyebrow">PORTFOLIO / {String(site.year)}</span>
            <span className="u-index">{String(works.length).padStart(2, '0')} PROJECTS</span>
          </div>
          <BlurText as="h1" lines={['作品', 'WORKS.']} className="page-hero__title" stagger={70} accentLine={1} />
          <Reveal className="page-hero__bottom" delay={180}>
            <p className="u-lead">{site.works.desc}</p>
            <span className="u-index">SCROLL TO EXPLORE ↓</span>
          </Reveal>
        </div>
      </Section>

      <Section theme="paper" className="works-list" label="作品列表">
        <div className="u-container">
          <div className="filter-bar">
            <div className="filter-bar__tabs" role="tablist" aria-label="作品分类">
              {workCategories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active === cat}
                  className={`filter-tab ${active === cat ? 'is-active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="u-index">
              SHOWING {String(filtered.length).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </span>
          </div>

          <WorkGrid works={filtered} slots={6} size="md" />

          <div className="works-list__foot">
            <div>
              <span className="u-eyebrow">MORE COMING SOON</span>
              <h3 className="works-list__foot-title">空着的位置，<br />留给下一个好项目。</h3>
            </div>
            <Button to="/contact" variant="outline" size="lg">
              聊聊你的项目
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
