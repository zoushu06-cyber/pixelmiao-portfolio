import type { ReactNode } from 'react';

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  /** 基础色 */
  color?: string;
  /** 扫光高亮色 */
  shine?: string;
}

/** 循环扫光文字 —— React Bits ShinyText 的轻量重写（纯 CSS） */
export function ShinyText({
  children,
  className = '',
  color = 'currentColor',
  shine = '#ffffff'
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(105deg, ${color} 35%, ${shine} 50%, ${color} 65%)`
      }}
    >
      {children}
    </span>
  );
}
