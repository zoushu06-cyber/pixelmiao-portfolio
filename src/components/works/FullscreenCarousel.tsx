import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

interface FullscreenCarouselProps {
  images: string[];
  /** 自动切换间隔（毫秒） */
  interval?: number;
  label?: string;
  /** 当前图片索引变化回调（用于按页控制文字层） */
  onIndexChange?: (index: number) => void;
  /** 是否显示暗色遮罩（默认 true；纯图页可关闭以露出原图） */
  showVeil?: boolean;
}

export interface FullscreenCarouselHandle {
  next: () => void;
  prev: () => void;
}

/**
 * 全屏大图轮播
 * ------------------------------------------------------------------
 * 每隔 interval 毫秒从右向左滑入下一张；鼠标悬停时暂停定时与动画。
 * 只在进入视口后启动，避免 15 屏同时空转。
 * 通过 ref 暴露 next/prev，供画板左右箭头手动左右切换。
 */
const FullscreenCarousel = forwardRef<FullscreenCarouselHandle, FullscreenCarouselProps>(
  function FullscreenCarousel({ images, interval = 4500, label, onIndexChange, showVeil = true }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{
      current: number;
      previous: number | null;
      dir: 'next' | 'prev';
    }>({ current: 0, previous: null, dir: 'next' });
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);

    const step = (dir: 'next' | 'prev') => {
      setState(s => ({
        previous: s.current,
        current: ((s.current + (dir === 'next' ? 1 : -1)) % images.length + images.length) % images.length,
        dir
      }));
    };

    useImperativeHandle(ref, () => ({
      next: () => step('next'),
      prev: () => step('prev')
    }));

    useEffect(() => {
      const node = rootRef.current;
      if (!node) return;
      const observer = new IntersectionObserver(
        entries => setInView(entries[0].isIntersecting),
        { threshold: 0.15 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    // 当前页变化时通知父组件（用于「文字只在第一页显示」等按页控制）
    useEffect(() => {
      onIndexChange?.(state.current);
    }, [state.current, onIndexChange]);

    useEffect(() => {
      if (paused || !inView || images.length < 2) return;
      const timer = window.setInterval(() => step('next'), interval);
      return () => window.clearInterval(timer);
    }, [paused, inView, images.length, interval]);

    return (
      <div
        ref={rootRef}
        className="cap-slides"
        aria-label={label}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {state.previous !== null && (
          <img className="cap-slides__layer" src={images[state.previous]} alt="" aria-hidden="true" />
        )}
        <img
          key={`${state.current}-${state.dir}-${state.previous ?? 'init'}`}
          className={`cap-slides__layer ${state.previous !== null ? (state.dir === 'prev' ? 'is-entering-left' : 'is-entering') : ''}`}
          src={images[state.current]}
          alt={label ?? ''}
        />
        {showVeil && <div className="cap-slides__veil" />}
      </div>
    );
  }
);

export default FullscreenCarousel;
