import { useRef } from 'react';
import { site, capabilitySlides, capabilitySlideOverrides } from '@/config/site';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 移动端能力清单 —— <768px 流式单栏版式，全站统一模板
 * ------------------------------------------------------------------
 * 每项结构一致：白缝 → 浅灰标题栏（CASE / 标题 / 副标题 / 描述 / 标签）
 * → 16:9 整屏大图（轮播，左右箭头切换）。文字不叠在图片上。
 */
export default function MobileCapabilityList() {
  const items = site.capabilityList;
  const refs = useRef<(FullscreenCarouselHandle | null)[]>([]);

  const switchSlide = (index: number, dir: 'prev' | 'next') => {
    const c = refs.current[index];
    if (!c) return;
    if (dir === 'prev') c.prev();
    else c.next();
  };

  return (
    <section className="bg-board-case text-white" aria-label="能力清单">
      {items.map((item, index) => {
        const images =
          capabilitySlideOverrides[index] ??
          [0, 2, 4].map(offset => capabilitySlides[(index + offset) % capabilitySlides.length]);
        return (
          <article key={item.title}>
            {/* 白缝 + 统一浅灰标题栏 */}
            <div className="h-[30px] w-full bg-white" />
            <div className="bg-[#f5f5f5] px-5 py-8">
              <span className="font-mono text-xs tracking-widest text-[#999999]">{item.eyebrow}</span>
              <h3 className="mt-4 text-[7.5vw] leading-tight font-medium tracking-tight text-[#010101]">{item.title}</h3>
              <span className="mt-3 block text-sm text-[#d97630]">{item.sub}</span>
              <p className="mt-6 text-xs leading-6 text-[#666666]">{item.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="border border-[#dddddd] px-4 py-2 text-xs font-light text-[#666666]">{tag}</span>
                ))}
              </div>
            </div>

            {/* 整屏大图：16:9 容器 + 左右箭头（仅一张图时隐藏） */}
            <div className="relative aspect-video w-full overflow-hidden">
              <FullscreenCarousel
                ref={el => { refs.current[index] = el; }}
                images={images}
                label={`${item.title} 视觉大图`}
                showVeil={false}
              />
              {images.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
