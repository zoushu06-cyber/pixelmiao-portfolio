import { useScrollProgressRef } from '@/hooks/useScrollProgress';

/** 顶部极细滚动进度条（直接写 DOM，滚动时不触发重渲染） */
export function ScrollProgress() {
  const barRef = useScrollProgressRef();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
