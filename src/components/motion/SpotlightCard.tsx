import type { CSSProperties, PointerEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 光晕颜色 */
  color?: string;
  /** 光晕半径 px */
  size?: number;
}

/** 鼠标跟随光晕 —— React Bits SpotlightCard 的轻量重写（纯 CSS 变量 + pointermove） */
export function SpotlightCard({
  children,
  className = '',
  style,
  color = 'rgba(255, 105, 0, 0.18)',
  size = 360
}: SpotlightCardProps) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`spotlight ${className}`}
      onPointerMove={onMove}
      style={{ '--sp-color': color, '--sp-size': `${size}px`, ...style } as CSSProperties}
    >
      <span className="spotlight__glow" aria-hidden="true" />
      {children}
    </div>
  );
}
