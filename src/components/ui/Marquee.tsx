interface MarqueeProps {
  items: string[];
  className?: string;
  /** 一轮滚动秒数，条目越多可适当调大以保持阅读速度 */
  duration?: number;
}

/** 无缝滚动信息带，用于区块之间的节奏分隔 */
export function Marquee({ items, className = '', duration = 32 }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${duration}s` }}>
        {row.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
