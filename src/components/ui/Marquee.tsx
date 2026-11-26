interface MarqueeProps {
  items: string[];
  className?: string;
}

/** 无缝滚动信息带，用于区块之间的节奏分隔 */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track">
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
