import type { CSSProperties, ReactNode } from 'react';

/**
 * Artboard —— 1:1 还原即时设计画板
 * ------------------------------------------------------------------
 * 设计稿画板统一为 2560 × 1440（16:9）。组件把自身设为 cqw 容器：
 *   1 cqw = 容器宽度 / 100 = 2560 设计像素 / 100 = 25.6 设计像素
 * 因此任意「设计稿 px」都可以用 `u(px)` 换算为 cqw，在全屏宽度下
 * 等比缩放，坐标 / 字号 / 间距与设计稿严格一致。
 */
export const BOARD_W = 2560;
export const BOARD_H = 1440;

/** 设计稿像素 -> cqw 字符串 */
export const u = (px: number): string => `${+(px / 25.6).toFixed(4)}cqw`;

/** 生成一组 position:absolute 的定位样式（设计稿像素） */
export const at = (
  x: number,
  y: number,
  w?: number,
  h?: number
): CSSProperties => ({
  position: 'absolute',
  left: u(x),
  top: u(y),
  ...(w !== undefined ? { width: u(w) } : {}),
  ...(h !== undefined ? { height: u(h) } : {})
});

interface ArtboardProps {
  children: ReactNode;
  className?: string;
  label?: string;
  id?: string;
  /** 画布背景，默认设计稿深底 #070908 */
  bg?: string;
  style?: CSSProperties;
}

export default function Artboard({
  children,
  className = '',
  label,
  id,
  bg = '#070908',
  style
}: ArtboardProps) {
  return (
    <div className="artboard-scroll">
      <section
        id={id}
        className={`artboard ${className}`}
        aria-label={label}
        style={{ background: bg, ...style }}
      >
        <div className="artboard__canvas">{children}</div>
      </section>
    </div>
  );
}
