import { useRef } from 'react';
import { site, capabilitySlides, capabilitySlideOverrides } from '@/config/site';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 移动端能力清单 —— <768px 流式单栏版式
 * 各项依次向下，每项一张 16:9 大图（沿用桌面轮播）+ 文字，不依赖 cqw 坐标。
 * 左右箭头改为悬浮在图片上的小按钮，切换本屏大图。
 * 产品包装 / 企业画册改用独立标题栏模块：文字不叠在图片上。
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
        const isLight = index === 1;
        const images = capabilitySlideOverrides[index] ??
          [0, 2, 4].map(offset => capabilitySlides[(index + offset) % capabilitySlides.length]);
        return (
          <article key={item.title} className="border-b border-white/10 pb-12">
            {/* CASE 01 产品包装设计：白缝 + 独立浅色标题栏（代码渲染，文字不叠在图片上） */}
            {index === 0 && (
              <>
                <div className="h-[30px] w-full bg-white" />
                <div className="bg-[#f5f5f5] px-5 py-8">
                  <span className="font-mono text-xs tracking-widest text-[#999999]">CASE 02 / 平面落地</span>
                  <h3 className="mt-4 text-[7.5vw] leading-tight font-medium tracking-tight text-[#010101]">产品包装设计</h3>
                  <span className="mt-3 block text-sm text-[#d97630]">结构 · 材质 · 印前</span>
                  <p className="mt-6 text-xs leading-6 text-[#666666]">
                    包装是立体的视觉表达，不止视觉出彩，更以结构、材质与印刷工艺落地设计想法。兼顾美学表达、货架表现力与量产落地性，让每一处版面、每一道折痕，都成为品牌设计的延伸。
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['盒型结构', '材质工艺', '视觉表达'].map(tag => (
                      <span key={tag} className="border border-[#dddddd] px-4 py-2 text-xs font-light text-[#666666]">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CASE 02 企业画册：白缝 + 独立浅色标题栏，文字不叠在图片上 */}
            {isLight && (
              <>
                <div className="h-[30px] w-full bg-white" />
                <div className="bg-[#f2f3f5] px-5 py-7 text-[#1b1d1f]">
                  <span className="font-mono text-xs tracking-widest text-[#3f4145]">{item.eyebrow}</span>
                  <h3 className="mt-3 text-[7.5vw] leading-tight font-medium tracking-tight">{item.title}</h3>
                  <span className="mt-2 block text-sm text-[#a8500f]">{item.sub}</span>
                  <p className="mt-4 text-sm leading-relaxed text-[#3f4145]">{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-[#6e7075] px-3 py-1 text-xs text-[#3f4145]">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 图片区：企业画册只有一张图，不显示切换箭头 */}
            <div className="relative aspect-video w-full overflow-hidden">
              <FullscreenCarousel
                ref={el => { refs.current[index] = el; }}
                images={images}
                label={`${item.title} 视觉大图`}
                showVeil={false}
              />
              {!isLight && (
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

            {/* 其它屏：文字仍在图片下方 */}
            {index !== 0 && !isLight && (
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
