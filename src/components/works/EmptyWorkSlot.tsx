import { SpotlightCard } from '@/components/motion/SpotlightCard';

interface EmptyWorkSlotProps {
  no: number;
  size?: 'lg' | 'md';
}

/** 空作品位：不是「没做完」，是刻意留给未来的版面 */
export function EmptyWorkSlot({ no, size = 'md' }: EmptyWorkSlotProps) {
  return (
    <SpotlightCard className={`slot slot--${size}`} color="rgba(255, 105, 0, 0.13)">
      <div className="slot__head">
        <span className="slot__no">{String(no).padStart(2, '0')}</span>
        <span className="slot__tag">AVAILABLE SLOT</span>
      </div>
      <div className="slot__body">
        <span className="slot__plus" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 5v22M5 16h22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="slot__label">作品位待收录</span>
      </div>
      <div className="slot__foot">
        <span>COMING SOON</span>
        <span className="slot__line" />
        <span>{String(no).padStart(2, '0')} / RESERVED</span>
      </div>
    </SpotlightCard>
  );
}
