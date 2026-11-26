import { Link } from 'react-router-dom';
import type { Work } from '@/data/works';
import { SpotlightCard } from '@/components/motion/SpotlightCard';

interface WorkCardProps {
  work: Work;
  no: number;
  size?: 'lg' | 'md';
}

/** 真实作品卡：往 data/works.ts 加数据后自动出现 */
export function WorkCard({ work, no, size = 'md' }: WorkCardProps) {
  return (
    <Link to={`/works/${work.slug}`} className={`work-card work-card--${size}`}>
      <SpotlightCard className="work-card__frame" color={`${work.accent ?? '#ff6900'}33`}>
        <div className="work-card__media" style={{ background: work.accent ?? 'var(--paper-2)' }}>
          {work.cover ? (
            <img src={work.cover} alt={work.title} loading="lazy" />
          ) : (
            <span className="work-card__mono">{work.en ?? work.title}</span>
          )}
          <span className="work-card__no">{String(no).padStart(2, '0')}</span>
        </div>
        <div className="work-card__info">
          <div>
            <h3>{work.title}</h3>
            <p>{work.summary ?? `${work.category} · ${work.role ?? '设计 / 开发'}`}</p>
          </div>
          <div className="work-card__meta">
            <span>{work.category}</span>
            <span>{work.year}</span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
