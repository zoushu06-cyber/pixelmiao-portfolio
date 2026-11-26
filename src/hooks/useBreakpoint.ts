import { useEffect, useState } from 'react';

/** 与 Tailwind @theme 断点保持一致：tablet 768px / desktop 1200px */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function detect(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1200) return 'tablet';
  return 'desktop';
}

/**
 * 响应式断点检测：驱动画板（桌面/平板）与流式版式（移动）的切换。
 * 用 matchMedia 监听，避免 resize 抖动。
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(detect);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqTablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
    const onChange = () => setBp(detect());
    mqMobile.addEventListener('change', onChange);
    mqTablet.addEventListener('change', onChange);
    return () => {
      mqMobile.removeEventListener('change', onChange);
      mqTablet.removeEventListener('change', onChange);
    };
  }, []);

  return bp;
}
