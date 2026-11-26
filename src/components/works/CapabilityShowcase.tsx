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
              {/* CASE 01 产品包装设计：白缝 + 独立浅色标题栏，文字用代码渲染（按设计稿 2560×359 坐标） */}
              {index === 0 && (
                <>
                  <div className="case-section-gap" />
                  <Artboard
                    className="package-title-board cap-show__frame--light"
                    label="产品包装设计 标题栏"
                    bg="#f5f5f5"
                    style={{ aspectRatio: '2560 / 359' }}
                  >
                    {/* 左侧：CASE / 主标题 / 副标题（坐标字号按即时设计精确参数） */}
                    <span
                      className="cap-board__eyebrow"
                      style={{ ...at(138, 140, 400, 31), fontSize: u(23), fontWeight: 300, lineHeight: u(30.5), color: '#999999', whiteSpace: 'nowrap', letterSpacing: u(-0.4) }}
                    >
                      CASE 02 / 平面落地
                    </span>
                    <h3
                      className="cap-board__title"
                      style={{ ...at(138, 188.48, 276, 61), fontSize: u(46), fontWeight: 500, lineHeight: u(61), color: '#010101' }}
                    >
                      产品包装设计
                    </h3>
                    <span
                      className="cap-board__sub"
                      style={{ ...at(138, 272.49, 400, 31), fontSize: u(23), fontWeight: 300, lineHeight: u(30.5), color: '#d97630', whiteSpace: 'nowrap', letterSpacing: u(-0.4) }}
                    >
                      结构 · 材质 · 印前
                    </span>

                    {/* 右侧：描述 + 三个标签 */}
                    <p
                      className="cap-board__desc"
                      style={{
                        ...at(1717.93, 136.75, 702.07, 90.18),
                        fontSize: u(20),
                        lineHeight: u(30),
                        fontWeight: 300,
                        color: '#666666'
                      }}
                    >
                      包装是立体的视觉表达，不止视觉出彩，更以结构、材质与印刷工艺落地设计想法。兼顾美学表达、货架表现力与量产落地性，让每一处版面、每一道折痕，都成为品牌设计的延伸。
                    </p>
                    <div className="package-title-board__tags" style={at(1717.93, 242.79, 448, 55)}>
                      {['盒型结构', '材质工艺', '视觉表达'].map(tag => (
                        <span key={tag} style={{ fontSize: u(25) }}>{tag}</span>
                      ))}
                    </div>
                  </Artboard>
                </>
              )}
              {/* CASE 02 企业画册：白缝 + 独立浅色标题栏模块，文字不叠在图片上 */}
              {index === 1 && (
                <>
                  <div className="case-section-gap" />
                  <Artboard
                    className="brochure-title-board"
                    label="企业画册、品牌手册 标题栏"
                    bg="#f2f3f5"
                    style={{ aspectRatio: '2560 / 520' }}
                  >
                    <span
                      className="cap-board__eyebrow"
                      style={{ ...at(140, 100), fontSize: u(17), fontWeight: 300, color: cMuted }}
                    >
                      {item.eyebrow}
                    </span>
                    <h3
                      className="cap-board__title"
                      style={{ ...at(140, 138, 1800, 70), fontSize: u(43), fontWeight: 500, color: cTitle }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="cap-board__sub"
                      style={{ ...at(140, 210, 1800, 40), fontSize: u(19), color: cOrange }}
                    >
                      {item.sub}
                    </span>
                    <p
                      className="cap-board__desc"
                      style={{ ...at(140, 262, 920, 190), fontSize: u(25), lineHeight: u(46), color: cMuted }}
                    >
                      {item.desc}
                    </p>
                    <div className="cap-board__tags" style={at(140, 385, 900, 55)}>
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          style={{ fontSize: u(16), borderColor: cTagBorder, color: cMuted }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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

                {/* 其它屏保留叠字；产品包装、企业画册已改用独立标题栏模块 */}
                {index !== 0 && index !== 1 && (
                  <>
                    {/* 设计稿节点 125:36 / 35 / 62 / 37 / 38 */}
                    <span
                      className="cap-board__eyebrow"
                      style={{
                        ...at(140, isLight ? 147 : 121),
                        fontSize: u(isLight ? 17 : 23),
                        ...(isLight ? { fontWeight: 300 } : {}),
                        color: cMuted
                      }}
                    >
                      {item.eyebrow}
                    </span>
                    <h3
                      className="cap-board__title"
                      style={{
                        ...at(140, isLight ? 180 : 169, 1800, 70),
                        fontSize: u(isLight ? 43 : 46),
                        ...(isLight ? { fontWeight: 500 } : {}),
                        ...(cTitle ? { color: cTitle } : {})
                      }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="cap-board__sub"
                      style={{
                        ...at(140, isLight ? 248 : 253, 1800, 40),
                        fontSize: u(isLight ? 19 : 23),
                        ...(isLight ? { fontWeight: 400 } : {}),
                        color: cOrange
                      }}
                    >
                      {item.sub}
                    </span>
                    <p
                      className="cap-board__desc"
                      style={{
                        ...at(140, isLight ? 300 : 322, 920, 190),
                        fontSize: u(isLight ? 25 : 27),
                        lineHeight: u(isLight ? 46 : 50),
                        ...(isLight ? { fontWeight: 400 } : {}),
                        color: cMuted
                      }}
                    >
                      {item.desc}
                    </p>

                    <div className="cap-board__tags" style={at(140, isLight ? 476 : 502, 900, 55)}>
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: u(isLight ? 16 : 25),
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

                {/* 小米风格切换箭头：左白右橙，点击左右切换本屏大图（企业画册仅一张图，隐藏） */}
                {index !== 1 && (
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
