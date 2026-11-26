import { useRef, useState } from 'react';
import { caseGallery } from '@/config/site';
import Artboard, { at, u } from '@/components/ui/Artboard';
import FullscreenCarousel, { type FullscreenCarouselHandle } from '@/components/works/FullscreenCarousel';

/**
 * 作品案例 · 品牌 VI 视觉系统 —— 12 张大图轮播画板
 * ------------------------------------------------------------------
 * 紧接「作品案例」头部画板（含标题栏横条）之后，整屏铺开 12 张 VI 手册大图，
 * 自动从右向左切换、悬停暂停；左右箭头切换本屏大图，右下角显示页码。
 */
const TEXT_MUTED = '#969598';

export default function CaseStudyGallery() {
  const carouselRef = useRef<FullscreenCarouselHandle>(null);
  const [page, setPage] = useState(0);
  const total = caseGallery.images.length;

  const turn = (dir: 'prev' | 'next') => {
    if (dir === 'prev') carouselRef.current?.prev();
    else carouselRef.current?.next();
  };

  return (
    <div className="case-gallery__image-frame">
      {/* 品牌 VI 视觉系统标题栏（矮画板 2560×480，压缩标签下方空白；图片保持原位，底部多余留白由画板裁切） */}
      <Artboard
        className="case-gallery__title-board"
        label="品牌 VI 视觉系统 标题栏"
        style={{ aspectRatio: '2560 / 480' }}
      >
        <img
          className="ab-case__title-bar"
          src={caseGallery.titleBar}
          alt="品牌 VI 视觉系统 · CASE 06 平面落地 · 版式・印前・电商"
          style={at(140, 60, 2280, 450)}
        />
      </Artboard>

      <Artboard className="case-gallery__image-board" label="品牌 VI 视觉系统 大图">
        <FullscreenCarousel
          ref={carouselRef}
          images={caseGallery.images}
          label="品牌 VI 视觉系统大图"
          onIndexChange={setPage}
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

        <span
          className="cap-board__counter"
          style={{ ...at(2220, 1260, 200, 40), fontSize: u(22), color: TEXT_MUTED }}
        >
          {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </Artboard>
    </div>
  );
}
