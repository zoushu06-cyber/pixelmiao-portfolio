import type { Work } from '@/data/works';
import { WorkCard } from './WorkCard';
import { EmptyWorkSlot } from './EmptyWorkSlot';

interface WorkGridProps {
  works: Work[];
  /** 不足时补齐到几个位置 */
  slots?: number;
  size?: 'lg' | 'md';
  className?: string;
}

/** 有作品出作品，没作品出高级占位；数据层加了内容后自动替换 */
export function WorkGrid({ works, slots = 6, size = 'md', className = '' }: WorkGridProps) {
  const emptyCount = Math.max(0, slots - works.length);

  return (
    <div className={`work-grid work-grid--${size} ${className}`}>
      {works.map((work, i) => (
        <WorkCard key={work.slug} work={work} no={i + 1} size={size} />
      ))}
      {Array.from({ length: emptyCount }, (_, i) => (
        <EmptyWorkSlot key={`slot-${i}`} no={works.length + i + 1} size={size} />
      ))}
    </div>
  );
}
