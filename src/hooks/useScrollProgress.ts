import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * 顶部进度条：直接写 DOM，不触发 React 重渲染
 * ------------------------------------------------------------------
 * 旧实现每帧 setState，会让 React 每帧调度一次更新；进度条只是纯视觉反馈，
 * 用 ref 写 transform 更省。
 * 页面总高度用 ResizeObserver 维护（图片/字体加载完成、窗口缩放都会变），
 * 避免每帧读 scrollHeight 造成的强制布局（layout thrashing）。
 */
export function useScrollProgressRef(): RefObject<HTMLSpanElement | null> {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let max = 0;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      raf = 0;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const el = barRef.current;
      if (el) el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        measure();
        update();
      });
      ro.observe(document.documentElement);
    } else {
      measure();
    }

    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, []);

  return barRef;
}
