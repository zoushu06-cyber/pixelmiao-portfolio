import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { isVideoSlide, type CapabilitySlide } from '@/config/site';

interface FullscreenCarouselProps {
  images: CapabilitySlide[];
  /** 自动切换间隔（毫秒） */
  interval?: number;
  label?: string;
  /** 当前图片索引变化回调（用于按页控制文字层） */
  onIndexChange?: (index: number) => void;
  /** 是否显示暗色遮罩（默认 true；纯图页可关闭以露出原图） */
  showVeil?: boolean;
  /** 首屏图片：立即加载并提高优先级；其余默认懒加载 */
  priority?: boolean;
}

export interface FullscreenCarouselHandle {
  next: () => void;
  prev: () => void;
}

/**
 * 全屏大图轮播
 * ------------------------------------------------------------------
 * 每隔 interval 毫秒从右向左滑入下一张；鼠标悬停时暂停定时与动画。
 * 只在进入视口后启动，避免 14 屏同时空转。
 * 通过 ref 暴露 next/prev，供画板左右箭头手动左右切换。
 */
const FullscreenCarousel = forwardRef<FullscreenCarouselHandle, FullscreenCarouselProps>(
  function FullscreenCarousel({ images, interval = 4500, label, onIndexChange, showVeil = true, priority = false }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{
      current: number;
      previous: number | null;
      dir: 'next' | 'prev';
    }>({ current: 0, previous: null, dir: 'next' });
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    /** 含视频的屏不自动轮播，避免 53 秒影片 4.5 秒就被切走 */
    const hasVideo = images.some(isVideoSlide);

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
      if (paused || !inView || hasVideo || images.length < 2) return;
      const timer = window.setInterval(() => step('next'), interval);
      return () => window.clearInterval(timer);
    }, [paused, inView, hasVideo, images.length, interval]);

    /**
     * 进入视口后预热下一张：切图时才不会出现空白。
     * 不预取全部，避免十几屏同时抢占带宽。
     */
    useEffect(() => {
      if (!inView || images.length < 2) return;
      const next = images[(state.current + 1) % images.length];
      if (!next || isVideoSlide(next)) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = next;
    }, [inView, state.current, images]);

    /** 首屏（第一个可见屏）优先立即加载，其余走原生懒加载 */
    const eager = priority;

    const renderLayer = (slide: CapabilitySlide, key: string, className: string, hidden = false) => {
      if (isVideoSlide(slide)) {
        return (
          <video
            key={key}
            className={className}
            src={slide.src}
            poster={slide.poster}
            aria-label={slide.label ?? label ?? ''}
            aria-hidden={hidden || undefined}
            controls
            autoPlay={!hidden}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={event => {
              if (!hidden) void event.currentTarget.play().catch(() => undefined);
            }}
          />
        );
      }
      return (
        <img
          key={key}
          className={className}
          src={slide}
          alt={hidden ? '' : (label ?? '')}
          aria-hidden={hidden || undefined}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      );
    };

    return (
      <div
        ref={rootRef}
        className="cap-slides"
        aria-label={label}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {state.previous !== null &&
          renderLayer(images[state.previous], `prev-${state.previous}`, 'cap-slides__layer', true)}
        {renderLayer(
          images[state.current],
          `${state.current}-${state.dir}-${state.previous ?? 'init'}`,
          `cap-slides__layer ${state.previous !== null ? (state.dir === 'prev' ? 'is-entering-left' : 'is-entering') : ''}`
        )}
        {showVeil && <div className="cap-slides__veil" />}
      </div>
    );
  }
);

export default FullscreenCarousel;
