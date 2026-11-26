import { useScrollProgress } from '@/hooks/useScrollProgress';

/** 顶部极细滚动进度条 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
