import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { site, caseGallery } from '@/config/site';
import { findWork } from '@/data/works';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 移动端作品案例 —— <768px 流式单栏版式
 * 顶部信息 → 品牌 VI 标题栏（图1）→ 12 张 VI 手册大图轮播（左右切换）。
 * 用 Tailwind utility 构建，不依赖桌面画板的 cqw 坐标。
 */
export default function MobileCaseStudy() {
  const carouselRef = useRef<FullscreenCarouselHandle>(null);
  const [page, setPage] = useState(0);
  const total = caseGallery.images.length;
  const showcaseWork = findWork('qiwuyun');
  const showcase = showcaseWork?.showcase;
  const turn = (dir: 'prev' | 'next') => {
    if (dir === 'prev') carouselRef.current?.prev();
    else carouselRef.current?.next();
  };

  return (
    <section className="bg-board-case text-white px-5 pt-14 pb-16" aria-label="作品案例">
      <span className="font-mono text-xs tracking-widest text-accent-vi">{site.caseStudies.eyebrow}</span>
      <h2 className="mt-3 text-[13vw] leading-none font-medium tracking-tight">{site.caseStudies.title}</h2>
      <p className="mt-5 text-sm leading-relaxed text-text-sub">{site.caseStudies.desc}</p>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="作品分类">
        {site.caseStudies.filters.map((f, i) => (
          <span
            key={`${f.label}-${i}`}
            className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs ${
              i === 0 ? 'bg-white text-ink' : 'border border-white/25 text-white/80'
            }`}
          >
            {f.label}
            <sup className="text-[0.7em] opacity-60">{f.count}</sup>
          </span>
        ))}
      </div>

      {/* 企物云展示（恢复原作品案例内容，放在标题栏上方） */}
      {showcase && showcaseWork && (
        <div className="mt-8 border-t border-white/10 pt-8">
          <Link to={`/works/${showcaseWork.slug}`} className="block overflow-hidden rounded-sm" aria-label={`查看「${showcase.title}」详情`}>
            <img className="block aspect-video w-full object-cover" src={showcase.preview} alt={showcase.title} />
          </Link>
          <h3 className="mt-5 text-[6vw] leading-snug font-medium tracking-tight">{showcase.title}</h3>
          <span className="mt-2 block font-mono text-xs tracking-wider text-text-sub">{showcase.date}</span>
          <p className="mt-4 text-sm leading-relaxed text-text-sub">{showcase.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {showcase.tags.map(tag => (
              <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-text-sub">{tag}</span>
            ))}
          </div>
          <div className="mt-6 flex gap-8">
            {showcase.stats.map(stat => (
              <div key={stat.label} className="flex flex-col">
                <strong className="text-2xl font-medium">{stat.value}</strong>
                <span className="mt-1 text-xs text-text-sub">{stat.label}</span>
              </div>
            ))}
          </div>
          <a
            className="mt-6 inline-block text-sm text-accent-vi-2 underline underline-offset-4"
            href={showcase.live.url}
            target="_blank"
            rel="noreferrer"
          >
            {showcase.live.text}
          </a>
          <Link to={`/works/${showcaseWork.slug}`} className="mt-4 block text-sm text-text-sub underline underline-offset-4">
            {showcase.detailText}
          </Link>
        </div>
      )}

      {/* 企物云与品牌 VI 标题栏之间：10px 白色通栏缝隙 */}
      <div className="case-section-gap" aria-hidden="true" />

      {/* 品牌 VI 标题栏：与能力清单同一模板，文字由代码渲染（不贴图） */}
      <div className="bg-[#f5f5f5] px-5 py-8">
        <span className="font-mono text-xs tracking-widest text-[#999999]">{caseGallery.titleBarText.eyebrow}</span>
        <h3 className="mt-4 text-[7.5vw] leading-tight font-medium tracking-tight text-[#010101]">{caseGallery.titleBarText.title}</h3>
        <span className="mt-3 block text-sm text-[#d97630]">{caseGallery.titleBarText.sub}</span>
        <p className="mt-6 text-xs leading-6 text-[#666666]">{caseGallery.titleBarText.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {caseGallery.titleBarText.tags.map(tag => (
            <span key={tag} className="border border-[#dddddd] px-4 py-2 text-xs font-light text-[#666666]">{tag}</span>
          ))}
        </div>
      </div>

      {/* 12 张大图轮播：16:9 容器 + 左右箭头 */}
      <div className="relative aspect-video w-full overflow-hidden bg-board-case" style={{ containerType: 'inline-size' }}>
        <FullscreenCarousel
          ref={carouselRef}
          images={caseGallery.images}
          label="品牌 VI 视觉系统大图"
          onIndexChange={setPage}
          showVeil={false}
        />
        <button
          type="button"
          onClick={() => turn('prev')}
          aria-label="上一张"
          className="absolute left-2 top-1/2 z-10 grid h-10 w-8 -translate-y-1/2 place-items-center rounded bg-black/30 text-white transition-colors hover:text-[#ff6900]"
        >
          <svg viewBox="0 0 24 48" className="h-6 w-4" aria-hidden="true"><path d="M17 3 L5 24 L17 45" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button"
          onClick={() => turn('next')}
          aria-label="下一张"
          className="absolute right-2 top-1/2 z-10 grid h-10 w-8 -translate-y-1/2 place-items-center rounded bg-black/30 text-white transition-colors hover:text-[#ff6900]"
        >
          <svg viewBox="0 0 24 48" className="h-6 w-4" aria-hidden="true"><path d="M7 3 L19 24 L7 45" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="absolute bottom-2 right-3 z-10 font-mono text-[10px] tracking-widest text-white/60">
          {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
