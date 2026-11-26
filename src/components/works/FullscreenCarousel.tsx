import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
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
 * 两张常驻图层（base / incoming）复用 DOM，切换时只改 src 并用
 * Web Animations API 做 translate3d 位移：全程 GPU 合成、不重排、不重解码。
 * 鼠标悬停只暂停自动计时，不再暂停手动切换动画。
 * 进入视口后预解码前后各一张，快速连点也不会出现空白帧。
 */
const FullscreenCarousel = forwardRef<FullscreenCarouselHandle, FullscreenCarouselProps>(
  function FullscreenCarousel(
    { images, interval = 4500, label, onIndexChange, showVeil = true, priority = false },
    ref
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const incomingRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const [state, setState] = useState<{
      current: number;
      previous: number | null;
      dir: 'next' | 'prev';
    }>({ current: 0, previous: null, dir: 'next' });
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    /** 含视频的屏不自动轮播，避免 53 秒影片 4.5 秒就被切走 */
    const hasVideo = images.some(isVideoSlide);

    const step = useCallback(
      (dir: 'next' | 'prev') => {
        setState(s => ({
          previous: s.current,
          current: ((s.current + (dir === 'next' ? 1 : -1)) % images.length + images.length) % images.length,
          dir
        }));
      },
      [images.length]
    );

    useImperativeHandle(ref, () => ({ next: () => step('next'), prev: () => step('prev') }), [step]);

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
    }, [paused, inView, hasVideo, images.length, interval, step]);

    /**
     * 进入视口后预热并解码前后各一张：切换时图层只是复用已解码的位图，
     * 不会因 img 重新挂载而出现解码等待或白帧。
     */
    useEffect(() => {
      if (!inView || images.length < 2) return;
      const warm = (slide: CapabilitySlide | undefined) => {
        if (!slide || isVideoSlide(slide)) return;
        const img = new Image();
        img.decoding = 'async';
        img.src = slide;
        void img.decode?.().catch(() => undefined);
      };
      warm(images[(state.current + 1) % images.length]);
      warm(images[(state.current - 1 + images.length) % images.length]);
    }, [inView, state.current, images]);

    /**
     * 图层 DOM 恒定，只换 src；用 WAAPI 直接跑合成层动画。
     * 每次点击都重新起一次动画，快速连点会顺势从当前方向继续，不会卡在半途。
     */
    useLayoutEffect(() => {
      if (state.previous === null || !incomingRef.current) return;
      animationRef.current?.cancel();
      // 下一张：新图从右侧进入；上一张：新图从左侧进入
      const offset = state.dir === 'prev' ? '-100%' : '100%';
      animationRef.current = incomingRef.current.animate(
        [
          { transform: `translate3d(${offset}, 0, 0)` },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }
      );
    }, [state.current, state.dir, state.previous]);

    useEffect(() => () => animationRef.current?.cancel(), []);

    /** 首屏（第一个可见屏）优先立即加载，其余走原生懒加载 */
    const eager = priority;

    const renderLayer = (
      slide: CapabilitySlide,
      key: string,
      className: string,
      layerRef?: React.Ref<HTMLImageElement & HTMLVideoElement>
    ) => {
      if (isVideoSlide(slide)) {
        return (
          <video
            key={key}
            ref={layerRef as React.Ref<HTMLVideoElement>}
            className={className}
            src={slide.src}
            poster={slide.poster}
            aria-label={label ?? ''}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={event => void event.currentTarget.play().catch(() => undefined)}
          />
        );
      }
      return (
        <img
          key={key}
          ref={layerRef as React.Ref<HTMLImageElement>}
          className={className}
          src={slide}
          alt={label ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
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
          renderLayer(images[state.previous], 'base', 'cap-slides__layer cap-slides__layer--base')}
        {renderLayer(
          images[state.current],
          'incoming',
          'cap-slides__layer cap-slides__layer--incoming',
          incomingRef
        )}
        {showVeil && <div className="cap-slides__veil" />}
      </div>
    );
  }
);

export default FullscreenCarousel;
