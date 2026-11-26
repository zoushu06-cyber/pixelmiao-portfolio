import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  theme?: 'dark' | 'paper' | 'white';
  /** 是否撑满一屏 */
  full?: boolean;
  className?: string;
  label?: string;
}

/** 全屏区块统一容器：主题色 + 100svh + 内边距 */
export function Section({ children, id, theme = 'white', full = true, className = '', label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`section theme-${theme} ${full ? 'u-full' : 'section--tight'} ${className}`}
    >
      {children}
    </section>
  );
}
