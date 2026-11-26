import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BlurText } from '@/components/motion/BlurText';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/ui/Marquee';

export default function AboutPage() {
  return (
    <>
      <Section theme="dark" className="page-hero about-hero" label="关于页首屏">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="u-container page-hero__inner">
          <div className="page-hero__top">
            <span className="u-eyebrow">{site.about.eyebrow}</span>
            <span className="u-index">{site.edition}</span>
          </div>
          <BlurText as="h1" lines={site.about.title} className="page-hero__title" stagger={62} accentLine={1} />
          <Reveal className="page-hero__bottom" delay={180}>
            <p className="u-lead">{site.about.lead}</p>
            <span className="u-index">SCROLL TO EXPLORE ↓</span>
          </Reveal>
        </div>
      </Section>

      <Section theme="white" className="about-story" label="自我介绍">
        <div className="u-container about-story__grid">
          <div>
            <span className="u-eyebrow">01 / 一点自述</span>
            <h2 className="u-h2 about-story__heading">
              好看和好用，
              <br />
              从来不是两件事。
            </h2>
          </div>
          <div className="about-story__text">
            {site.about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 100}>
                <p className="u-lead">{p}</p>
              </Reveal>
            ))}
            <Button to="/contact" variant="outline" size="lg">
              一起合作
            </Button>
          </div>
        </div>
      </Section>

      <Marquee items={['CLARITY', 'RESTRAINT', 'CRAFT', 'ITERATION']} className="marquee--dark" />

      <Section theme="paper" className="about-principles" label="工作原则">
        <div className="u-container">
          <div className="section-head">
            <div>
              <span className="u-eyebrow">02 / 工作原则</span>
              <h2 className="u-h2">HOW I WORK</h2>
            </div>
            <span className="u-index">04 PRINCIPLES</span>
          </div>
          <div className="principle-grid">
            {site.about.principles.map((p, i) => (
              <Reveal key={p.no} delay={i * 90} className="principle">
                <span className="principle__no">{p.no}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="principle__line" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section theme="dark" className="about-toolkit" label="工具链">
        <div className="u-container">
          <span className="u-eyebrow">03 / 常用工具</span>
          <h2 className="u-h2 about-toolkit__title">TOOLKIT</h2>
          <div className="toolkit-list">
            {site.about.toolkit.map((tool, i) => (
              <Reveal key={tool} delay={i * 60} y={18}>
                <span className="toolkit-list__item">
                  <span className="toolkit-list__no">{String(i + 1).padStart(2, '0')}</span>
                  {tool}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
