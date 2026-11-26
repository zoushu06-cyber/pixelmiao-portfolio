import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { findWork } from '@/data/works';
import CaseStudyGallery from '@/components/works/CaseStudyGallery';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/motion/Reveal';
import { BlurText } from '@/components/motion/BlurText';
import CapabilityShowcase from '@/components/works/CapabilityShowcase';
import Artboard, { at, u } from '@/components/ui/Artboard';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import MobileCaseStudy from '@/components/responsive/MobileCaseStudy';
import MobileCapabilityList from '@/components/responsive/MobileCapabilityList';

export default function HomePage() {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const showcaseWork = findWork('qiwuyun');
  const showcase = showcaseWork?.showcase;

  return (
    <>
      {/* ---------- 01 / 首屏（对照即时设计「作品集-2017 / 首屏」画板） ---------- */}
      <Section id="top" theme="dark" className="hero hero--artboard" label="首页首屏">
        <div className="hero__bg" aria-hidden="true" />

        <div className="u-container hero__inner">
          {/* 顶栏（画板 114:16–114:22）：邹术 Joe / 资深视觉设计师 / UI / UX / 8 年经验 */}
          <div className="hero__top">
            <div className="hero__identity">
              <Link to="/" className="hero__logo" aria-label={`${site.hero.logo} 首页`}>
                {site.hero.logo}
              </Link>
              <span className="hero__identity-sep" />
              <span className="hero__logo-en">{site.hero.logoEn}</span>
              <span className="hero__identity-sep" />
              <span className="hero__top-center">{site.hero.discipline}</span>
            </div>
            <div className="hero__top-right">
              <strong>{site.hero.count}</strong>
              <span>{site.hero.countLabel}</span>
            </div>
          </div>

          {/* 主视觉：设计（实心）/ 无界（描边） */}
          <div className="hero__center">
            <BlurText
              as="h1"
              lines={site.hero.lines}
              className="hero__title"
              stagger={80}
              delay={160}
              outlineFrom={site.hero.outlineFrom}
            />
            <Reveal className="hero__intro" delay={420}>
              <p className="hero__sub">{site.hero.sub}</p>
              <Button to="/works" variant="ghost" size="lg" className="hero__cta">
                {site.hero.cta}
              </Button>
            </Reveal>
          </div>

          {/* 底部四栏（画板 116:4/3/2/1） */}
          <div className="hero__foot">
            {site.hero.columns.map(col => (
              <div className="hero__column" key={col.no}>
                <span className="hero__column-no">{col.no}</span>
                <span className="hero__column-label">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧 PORTRAIT 信息栏（画板 114:41–114:54） */}
        <aside className="hero__portrait" aria-label="个人信息">
          <span className="hero__portrait-title">{site.hero.portrait.title}</span>
          <div className="hero__portrait-frame">
            <div className="hero__portrait-photo">
              <img src="/images/portrait.webp" alt="肖像照" decoding="async" />
            </div>
            <dl className="hero__portrait-info">
              <div>
                <dt>邮箱</dt>
                <dd>
                  <a href={`mailto:${site.hero.portrait.email}`}>{site.hero.portrait.email}</a>
                  <button
                    className="hero__copy"
                    onClick={() => navigator.clipboard?.writeText(site.hero.portrait.email)}
                    aria-label="复制邮箱"
                  >
                    复制邮箱
                  </button>
                </dd>
              </div>
              <div>
                <dt>所在地</dt>
                <dd>{site.hero.portrait.city}</dd>
              </div>
              <div>
                <dt>职业身份</dt>
                <dd>{site.hero.portrait.role}</dd>
              </div>
            </dl>
          </div>
          <div className="hero__portrait-foot">
            <span>{site.hero.portrait.sign}</span>
            <span>{site.hero.portrait.works}</span>
          </div>
          <div className="hero__portrait-tools">
            <button
              type="button"
              className="hero__tool"
              aria-label="中英文切换"
              title="中 / EN"
            >
              <span className="hero__tool-box">{site.hero.portrait.lang}</span>
            </button>
          </div>
        </aside>
      </Section>

      {/* ---------- 02 / 工作经历（对照即时设计「工作经历」画板 121:1） ---------- */}
      <Section id="experience" theme="white" className="experience" label="工作经历">
        <div className="u-container">
          <div className="experience__head">
            <span className="u-eyebrow">{site.experience.eyebrow}</span>
            <span className="u-index">{site.experience.range}</span>
          </div>

          <div className="experience__grid">
            {site.experience.jobs.map((job, i) => (
              <Reveal className="job" key={job.company} delay={i * 120}>
                <div className="job__meta">
                  <span className="job__period">{job.period}</span>
                  <span className="job__role">{job.role}</span>
                </div>
                <h3 className="job__company">{job.company}</h3>
                <p className="job__summary">{job.summary}</p>
                <div className="job__details">
                  {job.details.map((d, k) => (
                    <p key={k}>{d}</p>
                  ))}
                </div>
                <div className="job__tags">
                  {job.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 03 / 作品案例（桌面 1:1 画板 / 移动流式版） ----------
          顶部信息画板（编号/标题/描述/筛选/分隔线）+ 品牌 VI 标题栏横条，
          下方接 12 张大图轮播画板，均可左右切换。 */}
      {isMobile ? (
        <div id="case-studies"><MobileCaseStudy /></div>
      ) : (
        <>
          <div id="case-studies">
            <Artboard className="case-studies" label="作品案例">
              {/* 顶部编号 02 / 标题 / 描述 / 署名（节点 121:110/111/112/133） */}
              <span className="ab-case__no" style={{ ...at(140, 125, 40, 40), fontSize: u(22) }}>
                {site.caseStudies.eyebrow}
              </span>
              <h2 className="ab-case__title" style={{ ...at(140, 178, 500, 90), fontSize: u(80) }}>
                {site.caseStudies.title}
              </h2>
              <p className="ab-case__desc" style={{ ...at(140, 293, 825, 120), fontSize: u(22) }}>
                {site.caseStudies.desc}
              </p>
              <span className="ab-case__sign" style={{ ...at(1908, 293, 320, 40), fontSize: u(22) }}>
                {site.caseStudies.sign}
              </span>

              {/* 筛选胶囊：选中「全部」白底，其余描边（节点 121:114~131） */}
              <div className="ab-case__filters" aria-label="作品分类">
                {site.caseStudies.filters.map((filter, i) => {
                  const xs = [138, 276, 452, 628, 804];
                  const ws = [125, 160, 160, 160, 160];
                  return (
                    <span
                      className={`ab-filter ${i === 0 ? 'is-active' : ''}`}
                      key={`${filter.label}-${i}`}
                      style={{ ...at(xs[i], 420, ws[i], 62) }}
                    >
                      <span className="ab-filter__label" style={{ fontSize: u(19) }}>
                        {filter.label}
                      </span>
                      <sup className="ab-filter__count" style={{ fontSize: u(15) }}>{filter.count}</sup>
                    </span>
                  );
                })}
              </div>

              {/* 通栏分隔线（节点 121:132） */}
              <div className="ab-case__rule" style={at(138, 528, 2282, 1)} aria-hidden="true" />

              {/* 企物云展示（节点 125:33 / 124:32，原 1:1 校准坐标） */}
              {showcase && showcaseWork && (
                <>
                  <Link
                    to={`/works/${showcaseWork.slug}`}
                    className="ab-case__preview"
                    style={at(140, 598, 1278, 684)}
                    aria-label={`查看「${showcase.title}」详情`}
                  >
                    <img src={showcase.preview} alt={showcase.title} loading="lazy" decoding="async" />
                  </Link>

                  <div className="ab-case__info">
                    <h3 className="ab-case__info-title" style={{ ...at(1546, 619, 760, 70), fontSize: u(46) }}>
                      {showcase.title}
                    </h3>
                    <span className="ab-case__info-date" style={{ ...at(1546, 697, 380, 40), fontSize: u(23) }}>
                      {showcase.date}
                    </span>
                    <p className="ab-case__info-desc" style={{ ...at(1546, 769, 720, 190), fontSize: u(27) }}>
                      {showcase.desc}
                    </p>

                    <div className="ab-case__tags">
                      {showcase.tags.map((tag, i) => {
                        const xs = [1546, 1678, 1829];
                        const ws = [118, 137, 137];
                        return (
                          <span className="ab-case__tag" key={tag} style={{ ...at(xs[i], 946, ws[i], 55) }}>
                            <span style={{ fontSize: u(25) }}>{tag}</span>
                          </span>
                        );
                      })}
                    </div>

                    <div className="ab-case__stats">
                      {showcase.stats.map((stat, i) => {
                        const xs = [1546, 1699, 1853];
                        return (
                          <div className="ab-case__stat" key={stat.label} style={at(xs[i], 1047, 220, 100)}>
                            <strong style={{ fontSize: u(36) }}>{stat.value}</strong>
                            <span style={{ fontSize: u(23) }}>{stat.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <a
                      className="ab-case__live"
                      href={showcase.live.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ ...at(1546, 1178, 500, 45), fontSize: u(26) }}
                    >
                      {showcase.live.text}
                    </a>

                    <Link
                      to={`/works/${showcaseWork.slug}`}
                      className="ab-case__detail-link"
                      style={{ ...at(1546, 1237, 723, 42), fontSize: u(26) }}
                    >
                      {showcase.detailText}
                    </Link>
                  </div>
                </>
              )}
            </Artboard>
          </div>
          {/* 企物云与品牌 VI 标题栏之间：10px 白色通栏缝隙（小米风格区块分隔） */}
          <div className="case-section-gap" aria-hidden="true" />
          {/* 12 张大图轮播（紧接标题栏，可左右切换） */}
          <CaseStudyGallery />
        </>
      )}

      {/* ---------- 03.5 / 能力清单（按即时设计原型连线，加在作品案例下面） ---------- */}
      {isMobile ? <MobileCapabilityList /> : <CapabilityShowcase />}

      <Marquee items={['BRAND', 'DIGITAL', 'MOTION', 'CODE', 'DETAIL']} className="marquee--dark" />

      {/* ---------- 06 / 能力范围 ---------- */}
      <Section id="capabilities" theme="dark" className="capabilities" label="能力范围">
        <div className="u-container">
          <div className="section-head section-head--dark">
            <div>
              <span className="u-eyebrow">{site.capabilities.eyebrow}</span>
              <h2 className="u-display">{site.capabilities.title}</h2>
            </div>
            <span className="u-index section-head__cn">{site.capabilities.cn} / 04 DISCIPLINES</span>
          </div>

          <ul className="cap-list">
            {site.capabilities.items.map((item, i) => (
              <li key={item.no}>
                <Reveal delay={i * 80} y={26}>
                  <Link to="/contact" className="cap-row">
                    <span className="cap-row__no">{item.no}</span>
                    <span className="cap-row__main">
                      <span className="cap-row__title">{item.title}</span>
                      <span className="cap-row__en">{item.en}</span>
                    </span>
                    <span className="cap-row__desc">{item.desc}</span>
                    <span className="cap-row__tags">
                      {item.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </span>
                    <span className="cap-row__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

    </>
  );
}
