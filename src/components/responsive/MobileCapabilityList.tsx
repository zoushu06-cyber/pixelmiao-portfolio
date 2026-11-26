import { useRef } from 'react';
import { site, capabilitySlides, capabilitySlideOverrides } from '@/config/site';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 移动端能力清单 —— <768px 流式单栏版式
 * 各项依次向下，每项一张 16:9 大图（沿用桌面轮播）+ 文字，不依赖 cqw 坐标。
 * 左右箭头改为悬浮在图片上的小按钮，切换本屏大图。
 */
export default function MobileCapabilityList() {
  const items = site.capabilityList;
  const refs = useRef<(FullscreenCarouselHandle | null)[]>([]);

  const switchSlide = (index: number, dir: 'prev' | 'next') => {
    const c = refs.current[index];
    if (!c) return;
    dir === 'prev' ? c.prev() : c.next();
  };

  return (
    <section className="bg-board-case text-white" aria-label="能力清单">
      {items.map((item, index) => {
        const no = String(index + 1).padStart(2, '0');
        const images = capabilitySlideOverrides[index] ??
          [0, 2, 4].map(offset => capabilitySlides[(index + offset) % capabilitySlides.length]);
        return (
          <article key={item.title} className="border-b border-white/10 pb-12">
            {/* CASE 01 产品包装设计：10px 白缝 + 独立黑底标题栏，去掉叠字说明 */}
            {index === 0 && (
              <>
                <div className="h-[10px] w-full bg-white" />
                <img
                  src="/images/capability-slides/package-title-bar.png"
                  alt="产品包装设计 · CASE 02 平面落地"
                  className="block h-auto w-full"
                />
              </>
            )}
            <div className="relative aspect-video w-full overflow-hidden">
              <FullscreenCarousel
                ref={el => { refs.current[index] = el; }}
                images={images}
                label={`${item.title} 视觉大图`}
                showVeil={false}
              />
              <button
                type="button"
                onClick={() => switchSlide(index, 'prev')}
                aria-label={`上一张：${item.title}`}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:text-[#ff6900]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden="true">
                  <path d="M15 5 L8 12 L15 19" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => switchSlide(index, 'next')}
                aria-label={`下一张：${item.title}`}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:text-[#ff6900]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden="true">
                  <path d="M9 5 L16 12 L9 19" />
                </svg>
              </button>
            </div>

            {index !== 0 && (
              <div className="px-5 pt-7">
                <span className="font-mono text-xs tracking-widest text-text-sub">{item.eyebrow}</span>
                <h3 className="mt-3 text-[7.5vw] leading-tight font-medium tracking-tight">{item.title}</h3>
                <span className="mt-2 block text-sm text-accent-vi-2">{item.sub}</span>
                <p className="mt-4 text-sm leading-relaxed text-text-sub">{item.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-[#343536] px-3 py-1 text-xs text-text-sub">{tag}</span>
                  ))}
                </div>
                <span className="mt-6 block font-mono text-xs text-text-sub">{no} / {String(items.length).padStart(2, '0')}</span>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
