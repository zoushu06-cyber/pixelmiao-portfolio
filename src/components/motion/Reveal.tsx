import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 延迟毫秒 */
  delay?: number;
  /** 起始位移 px */
  y?: number;
  /** 起始模糊 px */
  blur?: number;
  duration?: number;
  threshold?: number;
}

/** 滚动淡入 —— React Bits FadeContent 的轻量重写（去掉 gsap 依赖） */
export function Reveal({
  children,
  className = '',
  style,
  delay = 0,
  y = 34,
  blur = 0,
  duration = 900,
  threshold = 0.12
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={
        {
          '--rv-delay': `${delay}ms`,
          '--rv-y': `${y}px`,
          '--rv-blur': `${blur}px`,
          '--rv-dur': `${duration}ms`,
          ...style
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
