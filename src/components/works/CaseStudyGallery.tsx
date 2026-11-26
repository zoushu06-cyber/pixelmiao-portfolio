import { useRef } from 'react';
import { caseGallery } from '@/config/site';
import Artboard, { at } from '@/components/ui/Artboard';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';
import CapabilityTitleBoard from '@/components/works/CapabilityTitleBoard';

/**
 * 作品案例 · 品牌 VI 视觉系统 —— 与能力清单同一模板
 * ------------------------------------------------------------------
 * 浅灰标题栏（2560×359，代码渲染）→ 整屏大图（2560×1440，12 张 VI 手册轮播）。
 * 文字不叠在图片上；自动从右向左切换、悬停暂停，左右箭头切换本屏大图。
 */
export default function CaseStudyGallery() {
  const carouselRef = useRef<FullscreenCarouselHandle>(null);

  const turn = (dir: 'prev' | 'next') => {
    if (dir === 'prev') carouselRef.current?.prev();
    else carouselRef.current?.next();
  };

  return (
    <div className="case-gallery__image-frame">
      <CapabilityTitleBoard
        eyebrow={caseGallery.titleBarText.eyebrow}
        title={caseGallery.titleBarText.title}
        sub={caseGallery.titleBarText.sub}
        desc={caseGallery.titleBarText.desc}
        tags={caseGallery.titleBarText.tags}
        label="品牌 VI 视觉系统 标题栏"
      />

      <Artboard className="case-gallery__image-board" label="品牌 VI 视觉系统 大图">
        <FullscreenCarousel
          ref={carouselRef}
          images={caseGallery.images}
          label="品牌 VI 视觉系统大图"
          showVeil={false}
        />

        {/* 小米风格切换箭头：左白右橙 */}
        <button
          type="button"
          className="cap-board__nav cap-board__nav--prev"
          style={at(96, 656, 46, 128)}
          aria-label="上一张：品牌 VI 视觉系统大图"
          onClick={() => turn('prev')}
        >
          <svg viewBox="0 0 24 48" aria-hidden="true"><path d="M17 3 L5 24 L17 45" /></svg>
        </button>
        <button
          type="button"
          className="cap-board__nav cap-board__nav--next"
          style={at(2418, 656, 46, 128)}
          aria-label="下一张：品牌 VI 视觉系统大图"
          onClick={() => turn('next')}
        >
          <svg viewBox="0 0 24 48" aria-hidden="true"><path d="M7 3 L19 24 L7 45" /></svg>
        </button>
      </Artboard>
    </div>
  );
}
