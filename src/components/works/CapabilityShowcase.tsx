import { useRef } from 'react';
import { site, capabilitySlides, capabilitySlideOverrides } from '@/config/site';
import Artboard, { at, u } from '@/components/ui/Artboard';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 能力清单 —— 14 屏依次向下铺开
 * ------------------------------------------------------------------
 * 每个画板都是 2560×1440（16:9）的 1:1 画布，从上到下依次排列。
 * 全部同时排列在页面上，不叠在一起。左右箭头切换本屏大图。
 */
const items = site.capabilityList;
const total = items.length;
const BOARD_BG = '#070908';
const TEXT_MUTED = '#969598';
const TEXT_ORANGE = '#DEA369';
const TAG_BORDER = '#343536';

/** 浅色背景屏（CASE 02 企业画册）专用深色文字配色，保证在浅灰白画册图上清晰 */
const LIGHT_TEXT = {
  muted: '#3f4145',
  title: '#1b1d1f',
  orange: '#a8500f',
  tagBorder: '#6e7075'
};

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
          // CASE 02 企业画册为浅色背景，文字改用深色配色
          const isLight = index === 1;
          const cMuted = isLight ? LIGHT_TEXT.muted : TEXT_MUTED;
          const cTitle = isLight ? LIGHT_TEXT.title : undefined;
          const cOrange = isLight ? LIGHT_TEXT.orange : TEXT_ORANGE;
          const cTagBorder = isLight ? LIGHT_TEXT.tagBorder : TAG_BORDER;
          return (
            <div
              className={`cap-show__frame${index === 1 ? ' cap-show__frame--light' : ''}`}
              id={`capability-frame-${index}`}
              key={item.title}
            >
              {/* CASE 01 产品包装设计：10px 白缝 + 独立黑底标题栏模块，替代叠在图片上的文字 */}
              {index === 0 && (
                <>
                  <div className="case-section-gap" />
                  <Artboard
                    className="package-title-board"
                    label="产品包装设计 标题栏"
                    style={{ aspectRatio: '2560 / 425' }}
                  >
                    <img
                      className="ab-case__title-bar"
                      src="/images/capability-slides/package-title-bar.png"
                      alt="产品包装设计 · CASE 02 平面落地"
                    />
                  </Artboard>
                </>
              )}
              <Artboard className="cap-show__board" label={`${no} ${item.title}`} bg={BOARD_BG}>
                {/* 每屏对应的全屏大图：自动从右向左切换，悬停暂停 */}
                <FullscreenCarousel
                  ref={el => { carouselRefs.current[index] = el; }}
                  images={
                    capabilitySlideOverrides[index] ??
                    [0, 2, 4].map(offset => capabilitySlides[(index + offset) % capabilitySlides.length])
                  }
                  label={`${item.title} 视觉大图`}
                  showVeil={false}
                />

                {/* 其它屏保留叠字；产品包装设计已改用独立标题栏模块 */}
                {index !== 0 && (
                  <>
                    {/* 设计稿节点 125:36 / 35 / 62 / 37 / 38 */}
                    <span
                      className="cap-board__eyebrow"
                      style={{
                        ...at(140, isLight ? 96 : 121),
                        fontSize: u(isLight ? 12 : 23),
                        ...(isLight ? { fontWeight: 300 } : {}),
                        color: cMuted
                      }}
                    >
                      {item.eyebrow}
                    </span>
                    <h3
                      className="cap-board__title"
                      style={{
                        ...at(140, isLight ? 126 : 169, 1800, 70),
                        fontSize: u(isLight ? 23 : 46),
                        ...(isLight ? { fontWeight: 400 } : {}),
                        ...(cTitle ? { color: cTitle } : {})
                      }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="cap-board__sub"
                      style={{
                        ...at(140, isLight ? 172 : 253, 1800, 40),
                        fontSize: u(isLight ? 12 : 23),
                        ...(isLight ? { fontWeight: 300 } : {}),
                        color: cOrange
                      }}
                    >
                      {item.sub}
                    </span>
                    <p
                      className="cap-board__desc"
                      style={{
                        ...at(140, isLight ? 210 : 322, 920, 190),
                        fontSize: u(isLight ? 14 : 27),
                        lineHeight: u(isLight ? 26 : 50),
                        ...(isLight ? { fontWeight: 400 } : {}),
                        color: cMuted
                      }}
                    >
                      {item.desc}
                    </p>

                    <div className="cap-board__tags" style={at(140, isLight ? 320 : 502, 900, 55)}>
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: u(isLight ? 13 : 25),
                            ...(isLight ? { fontWeight: 400 } : {}),
                            borderColor: cTagBorder,
                            color: cMuted
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* 小米风格切换箭头：左白右橙，点击左右切换本屏大图 */}
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

                <span
                  className="cap-board__counter"
                  style={{ ...at(2220, 1260, 200, 40), fontSize: u(22), color: cMuted }}
                >
                  {no} / {String(total).padStart(2, '0')}
                </span>
              </Artboard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
