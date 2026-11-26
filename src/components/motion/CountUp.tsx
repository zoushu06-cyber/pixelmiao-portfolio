import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** 进入视口后数字滚动 —— React Bits CountUp 的轻量重写 */
export function CountUp({ to, suffix = '', duration = 1600, className = '' }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
