import { useEffect, useState } from 'react';

/**
 * 全局悬浮「返回顶部」按钮。
 * 固定在视口右下角，滚动超过一屏高度后出现，点击平滑滚回顶部。
 * 挂载于 Layout，因此所有页面通用。
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > Math.max(240, window.innerHeight * 0.6));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="返回顶部"
      title="返回顶部"
    >
      <span className="back-to-top__arrow" aria-hidden="true">↑</span>
      <span className="back-to-top__label">顶部</span>
    </button>
  );
}
