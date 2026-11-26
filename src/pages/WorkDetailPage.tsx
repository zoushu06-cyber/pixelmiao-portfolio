import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findWork, nextWork } from '@/data/works';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { BlurText } from '@/components/motion/BlurText';
import Artboard, { at, u } from '@/components/ui/Artboard';

/**
 * 作品详情
 * 有 detail 三段数据时，按即时设计二级页面 1/2/3 还原：
 *   项目介绍 -> 项目案例总览 -> 详细内容
 * 没有 detail 但有基础数据时，走精简通用模板；都没有则显示占位。
 */
export default function WorkDetailPage() {
  const { slug } = useParams();
  const work = findWork(slug);
  const next = nextWork(slug);
  /* 默认展示大气网格的原型，点击下方系统卡片可联动切换 */
  const [activeCase, setActiveCase] = useState(1);

  /* ---------- 无数据：占位模板 ---------- */
  if (!work) {
    return (
      <Section theme="dark" className="detail-empty" label="作品详情占位">
        <div className="u-container detail-empty__inner">
          <span className="u-eyebrow">WORK DETAIL / TEMPLATE READY</span>
          <BlurText as="h1" lines={['这个位置', '还没写完。']} className="detail-empty__title" stagger={54} accentLine={1} />
          <Reveal delay={160}>
            <p className="u-lead detail-empty__text">
              详情页的完整版式已经搭好：封面、项目信息、内容分段、下一个项目。
              <br />
              在 <code>src/data/works.ts</code> 里添加 slug 为 <code>{slug}</code> 的作品，这里就会自动填满。
            </p>
          </Reveal>
          <div className="detail-empty__skeleton" aria-hidden="true">
            <span className="detail-empty__cover" />
            <div className="detail-empty__meta">
              <span />
              <span />
              <span />
            </div>
            <div className="detail-empty__lines">
              <span />
              <span />
              <span />
            </div>
          </div>
          <Button to="/works" variant="light" size="lg">
            返回作品列表
          </Button>
        </div>
      </Section>
    );
  }

  /* ---------- 有 detail：三段式详情（1:1 还原画板 126:1 / 127:29 / 127:73） ---------- */
  if (work.detail) {
    const d = work.detail;
    /* 选中的系统卡片决定底部缩略条展示哪套原型 */
    const selected = d.cases[activeCase] ?? d.cases[0];
    const prototypes = selected?.prototypes ?? d.content.prototypes;
    const prototypeNote = selected?.prototypeNote ?? d.content.prototypeNote;
    return (
      <div className="wd">
        {/* ===== 画板 1 · 项目介绍（126:1）===== */}
        <Artboard className="wd-ab wd-intro-ab" label="项目介绍" bg="#080a09">
          {/* 顶栏（126:2 / 126:6 / 126:9 / 126:10） */}
          <span className="wd-bar__title" style={{ ...at(140, 108, 600, 34), fontSize: u(19.7) }}>
            {d.topbar}
          </span>
          <span className="wd-bar__hint" style={{ ...at(2109, 107, 190, 34), fontSize: u(19.7) }}>
            {d.topbarHint}
          </span>
          <Link to="/works" className="wd-bar__close" style={at(2315, 89, 105, 60)}>
            <span style={{ fontSize: u(21.4) }}>关闭 ×</span>
          </Link>
          <div className="wd-line" style={at(142, 168, 2278, 1)} />

          {/* 主标题区 */}
          <span className="wd-intro__eyebrow" style={{ ...at(140, 262, 400, 34), fontSize: u(19.7) }}>
            {d.eyebrow}
          </span>
          <h1 className="wd-intro__title" style={{ ...at(140, 303, 1100, 118), fontSize: u(82) }}>
            {d.title}
          </h1>
          <p className="wd-intro__desc" style={{ ...at(142, 452, 1100, 80), fontSize: u(26.3) }}>
            {d.desc}
          </p>
          <div className="wd-line" style={at(140, 592, 2279, 1)} />

          {/* 四组数据 */}
          {d.stats.map((stat, i) => {
            const xs = [232, 803, 1371, 1942];
            return (
              <div className="wd-intro-stat" key={stat.label} style={at(xs[i], 637, 560, 110)}>
                <strong style={{ fontSize: u(54) }}>{stat.value}</strong>
                <span style={{ fontSize: u(19.7) }}>{stat.label}</span>
              </div>
            );
          })}
          {[711, 1281, 1850].map(x => (
            <div className="wd-line-v" key={x} style={at(x, 592, 1, 200)} />
          ))}
          <div className="wd-line" style={at(140, 792, 2279, 1)} />

          {/* 三段编号说明 */}
          {d.chapters.map((ch, i) => {
            const xs = [140, 937, 1734];
            return (
              <div className="wd-chapter" key={ch.no} style={at(xs[i], 896, 700, 430)}>
                <span className="wd-chapter__no" style={{ fontSize: u(23.1) }}>{ch.no}</span>
                <span className="wd-chapter__kicker" style={{ fontSize: u(23.1) }}>{ch.kicker}</span>
                <h2 className="wd-chapter__title" style={{ fontSize: u(37.8) }}>{ch.title}</h2>
                <p className="wd-chapter__body" style={{ fontSize: u(25.2) }}>{ch.body}</p>
              </div>
            );
          })}
        </Artboard>

        {/* ===== 画板 2 · 项目案例总览（127:29）===== */}
        <Artboard className="wd-ab wd-cases-ab" label="项目案例总览" bg="#080a09">
          {d.cases.map((item, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 140 + col * 770;
            const y = 118 + row * 615;
            return (
              <button
                type="button"
                className={`wd-case ${activeCase === i ? 'is-active' : ''}`}
                key={`${item.title}-${i}`}
                style={at(x, y, 740, 584)}
                onClick={() => setActiveCase(i)}
                aria-label={`查看${item.title}原型`}
                aria-pressed={activeCase === i}
              >
                <div className="wd-case__media" style={{ height: u(409) }}>
                  {item.cover && <img className="wd-case__cover" src={item.cover} alt="" loading="lazy" />}
                </div>
                <div className="wd-case__info" style={{ height: u(175) }}>
                  <span className="wd-case__category" style={{ fontSize: u(24) }}>{item.category}</span>
                  <h3 className="wd-case__title" style={{ fontSize: u(28) }}>{item.title}</h3>
                  <p className="wd-case__desc" style={{ fontSize: u(23) }}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </Artboard>

        {/* ===== 画板 3 · 详细内容（127:73）===== */}
        <Artboard className="wd-ab wd-content-ab" label="详细内容" bg="#080a09">
          {/* 原型缩略条：置于顶部，随选中的系统卡片联动切换，可横向滚动 */}
          <div className="wd-prototypes__track" key={activeCase} style={at(140, 45, 2281, 387)}>
            {prototypes.map((p, i) => (
              <div className="wd-prototype" key={p.label} style={{ width: u(437), height: u(387) }}>
                <div className="wd-prototype__media" style={{ height: u(303) }}>
                  {p.image && <img className="wd-prototype__img" src={p.image} alt={p.label} loading="lazy" />}
                </div>
                <span className={`wd-prototype__label ${i === 0 ? 'is-active' : ''}`} style={{ fontSize: u(34.4) }}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>

          <p className="wd-prototypes__note" style={{ ...at(142, 443, 700, 40), fontSize: u(22) }}>
            {prototypeNote}
          </p>

          {/* 「还有」标签行（131:71）：移至原型条下方 */}
          <span className="wd-more__label" style={{ ...at(141, 545, 70, 40), fontSize: u(22) }}>还有</span>
          {d.content.more.map((m, i) => {
            const row1 = [[216, 336], [574, 468], [1064, 446], [1532, 453]];
            const row2 = [[216, 380], [618, 356]];
            const cfg = i < 4 ? row1[i] : row2[i - 4];
            const y = i < 4 ? 532 : 611;
            return (
              <div className="wd-more-chip" key={m.title} style={at(cfg[0], y, cfg[1], 57)}>
                <strong style={{ fontSize: u(22) }}>{m.title}</strong>
                <em style={{ fontSize: u(22) }}>{m.desc}</em>
              </div>
            );
          })}
          <div className="wd-line" style={at(140, 510, 2279, 1)} />

          {/* 模块地图 */}
          <span className="wd-content__map-title" style={{ ...at(141, 712, 400, 44), fontSize: u(24) }}>
            {d.content.mapTitle}
          </span>
          {d.content.modules.map((m, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 177 + col * 572;
            const y = 806 + row * 213;
            return (
              <div className="wd-module" key={m.no} style={at(x, y, 380, 150)}>
                <span className="wd-module__no" style={{ fontSize: u(22) }}>{m.no}</span>
                <h4 className="wd-module__title" style={{ fontSize: u(26) }}>{m.title}</h4>
                <p className="wd-module__desc" style={{ fontSize: u(22) }}>{m.desc}</p>
              </div>
            );
          })}
          {/* 列间竖线 + 中部横线：三条竖线与一条横线构成模块网格 */}
          {[710, 1280, 1850].map(x => (
            <div className="wd-line-v" key={x} style={at(x, 788, 1, 380)} />
          ))}
          <div className="wd-line" style={at(141, 976, 2279, 1)} />
        </Artboard>

        {/* 下一个项目 */}
        {next && next.slug !== work.slug && (
          <Section theme="paper" full={false} className="detail-next" label="下一个项目">
            <div className="u-container detail-next__inner">
              <span className="u-eyebrow">NEXT PROJECT</span>
              <Link to={`/works/${next.slug}`} className="detail-next__link">{next.title}</Link>
              <Button to="/works" variant="outline">全部作品</Button>
            </div>
          </Section>
        )}
      </div>
    );
  }

  /* ---------- 有基础数据但无 detail：精简通用模板 ---------- */
  return (
    <>
      <Section theme="dark" className="detail-hero" label={work.title}>
        <div className="detail-hero__bg" style={{ background: work.accent ?? 'var(--ink-3)' }} aria-hidden="true" />
        <div className="u-container detail-hero__inner">
          <Link to="/works" className="detail-hero__back">← 返回作品</Link>
          <span className="u-eyebrow">{work.category} / {work.year}</span>
          <BlurText as="h1" lines={[work.title]} className="detail-hero__title" stagger={40} />
          <p className="u-lead">{work.summary}</p>
        </div>
      </Section>

      {work.cover && (
        <div className="detail-cover">
          <img src={work.cover} alt={work.title} />
        </div>
      )}

      <Section theme="white" full={false} className="detail-body" label="项目内容">
        <div className="u-container">
          <div className="detail-meta">
            {[
              ['客户 / CLIENT', work.client ?? '—'],
              ['年份 / YEAR', work.year],
              ['职责 / ROLE', work.role ?? '设计 / 开发'],
              ['分类 / FIELD', work.category]
            ].map(([label, value]) => (
              <div key={label}>
                <span className="u-index">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="detail-content">
            {work.content?.map(section => (
              <Reveal key={section.heading} className="detail-block">
                <h2>{section.heading}</h2>
                <p className="u-lead">{section.body}</p>
                {section.image && <img src={section.image} alt={section.heading} loading="lazy" />}
              </Reveal>
            ))}
            {work.tags && (
              <div className="detail-tags">
                {work.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {next && next.slug !== work.slug && (
        <Section theme="paper" full={false} className="detail-next" label="下一个项目">
          <div className="u-container detail-next__inner">
            <span className="u-eyebrow">NEXT PROJECT</span>
            <Link to={`/works/${next.slug}`} className="detail-next__link">{next.title}</Link>
            <Button to="/works" variant="outline">全部作品</Button>
          </div>
        </Section>
      )}
    </>
  );
}
