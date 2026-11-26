import { useRef } from 'react';
import { site, capabilitySlides, capabilitySlideOverrides } from '@/config/site';
import Artboard, { at } from '@/components/ui/Artboard';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';
import CapabilityTitleBoard from '@/components/works/CapabilityTitleBoard';

/**
 * 能力清单 —— 14 屏，全站统一模板
 * ------------------------------------------------------------------
 * 每一屏的结构完全一致：
 *   白缝 → 浅灰标题栏（2560×359，代码渲染 CASE / 标题 / 副标题 / 描述 / 标签）
 *        → 整屏大图（2560×1440，轮播，左右箭头切换本屏图片）
 * 文字不再叠在图片上；标题栏与图片各自独立成块，图片区域保持纯净。
 */
const items = site.capabilityList;
const BOARD_BG = '#070908';

export default function CapabilityShowcase() {
  // 每屏轮播的 ref：左右箭头直接控制本屏大图左右切换
  const carouselRefs = useRef<(FullscreenCarouselHandle | null)[]>([]);

  const switchSlide = (index: number, dir: 'prev' | 'next') => {
    const c = carouselRefs.current[index];
    if (!c) return;
    if (dir === 'prev') c.prev();
    else c.next();
  };

  return (
    <section id="capability-list" className="cap-show" aria-label="能力清单">
      <div className="cap-show__frames">
        {items.map((item, index) => {
          const no = String(index + 1).padStart(2, '0');
          const images =
            capabilitySlideOverrides[index] ??
            [0, 2, 4].map(offset => capabilitySlides[(index + offset) % capabilitySlides.length]);
          return (
            <div
              className="cap-show__frame"
              id={`capability-frame-${index}`}
              key={item.title}
            >
              {/* 白缝：与上一屏隔开 */}
              <div className="case-section-gap" />

              {/* 统一标题栏：浅灰画板，文字由代码渲染 */}
              <CapabilityTitleBoard
                eyebrow={item.eyebrow}
                title={item.title}
                sub={item.sub}
                desc={item.desc}
                tags={item.tags}
                label={`${no} ${item.title} 标题栏`}
              />

              {/* 下方整屏大图：自动轮播、悬停暂停，箭头手动切换 */}
              <Artboard className="cap-show__board" label={`${no} ${item.title} 大图`} bg={BOARD_BG}>
                <FullscreenCarousel
                  ref={el => { carouselRefs.current[index] = el; }}
                  images={images}
                  label={`${item.title} 视觉大图`}
                  showVeil={false}
                />

                {/* 小米风格切换箭头：左白右橙（仅一张图时隐藏） */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="cap-board__nav cap-board__nav--prev"
                      style={at(96, 656, 46, 128)}
                      aria-label={`上一张：${item.title} 大图`}
                      onClick={() => switchSlide(index, 'prev')}
                    >
                      <svg viewBox="0 0 24 48" aria-hidden="true">
                        <path d="M17 3 L5 24 L17 45" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="cap-board__nav cap-board__nav--next"
                      style={at(2418, 656, 46, 128)}
                      aria-label={`下一张：${item.title} 大图`}
                      onClick={() => switchSlide(index, 'next')}
                    >
                      <svg viewBox="0 0 24 48" aria-hidden="true">
                        <path d="M7 3 L19 24 L7 45" />
                      </svg>
                    </button>
                  </>
                )}
              </Artboard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
