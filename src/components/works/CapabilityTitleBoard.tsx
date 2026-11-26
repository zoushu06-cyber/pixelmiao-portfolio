import Artboard, { at, u } from '@/components/ui/Artboard';

/**
 * 通用标题栏 —— 全站案例统一模板
 * ------------------------------------------------------------------
 * 画板 2560×359，浅灰底 #f5f5f5，文字全部由代码渲染（不使用贴图）。
 * 坐标 / 字号 / 颜色来自「产品包装设计 标题栏」标准图实测：
 *   左：CASE 小字 138,140 / 主标题 138,188.48 / 副标题 138,272.49
 *   右：描述 1717.93,136.75（702×90）/ 标签 1717.93,242.79
 * 下方紧接 2560×1440 整屏大图，标题栏与图之间由调用方插入白缝。
 */
interface CapabilityTitleBoardProps {
  eyebrow: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  label?: string;
  className?: string;
}

export const TITLE_BOARD_RATIO = '2560 / 359';

export default function CapabilityTitleBoard({
  eyebrow,
  title,
  sub,
  desc,
  tags,
  label,
  className = ''
}: CapabilityTitleBoardProps) {
  return (
    <Artboard
      className={`cap-title-board ${className}`.trim()}
      label={label ?? `${title} 标题栏`}
      bg="#f5f5f5"
      style={{ aspectRatio: TITLE_BOARD_RATIO }}
    >
      {/* 左侧：CASE / 主标题 / 副标题 */}
      <span
        className="cap-title-board__eyebrow"
        style={{
          ...at(138, 140, 400, 31),
          fontSize: u(23),
          lineHeight: u(30.5),
          letterSpacing: u(-0.4)
        }}
      >
        {eyebrow}
      </span>
      <h3
        className="cap-title-board__title"
        style={{ ...at(138, 188.48, 1500, 61), fontSize: u(46), lineHeight: u(61) }}
      >
        {title}
      </h3>
      <span
        className="cap-title-board__sub"
        style={{
          ...at(138, 272.49, 700, 31),
          fontSize: u(23),
          lineHeight: u(30.5),
          letterSpacing: u(-0.4)
        }}
      >
        {sub}
      </span>

      {/* 右侧：描述 + 标签 */}
      <p
        className="cap-title-board__desc"
        style={{
          ...at(1717.93, 136.75, 702.07, 90.18),
          fontSize: u(20),
          lineHeight: u(30)
        }}
      >
        {desc}
      </p>
      <div className="cap-title-board__tags" style={at(1717.93, 242.79, 448, 55)}>
        {tags.map(tag => (
          <span key={tag} style={{ fontSize: u(25) }}>
            {tag}
          </span>
        ))}
      </div>
    </Artboard>
  );
}
