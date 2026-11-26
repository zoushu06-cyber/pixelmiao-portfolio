import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxSlide {
  label: string;
  image?: string;
}

interface PrototypeLightboxProps {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

/**
 * 界面原型大图灯箱
 * 用 Portal 挂到 body，避开详情页画板的 overflow:hidden 与 container-type。
 */
export default function PrototypeLightbox({
  slides,
  index,
  onClose,
  onChange
}: PrototypeLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = slides.length;
  const current = slides[index];

  const step = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      onChange((index + dir + total) % total);
      setZoomed(false);
    },
    [index, total, onChange]
  );

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, step]);

  /* 预加载前后两张，切换更顺 */
  useEffect(() => {
    if (total < 2) return;
    [index - 1, index + 1].forEach(offset => {
      const src = slides[(offset + total) % total]?.image;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [index, slides, total]);

  if (!current) return null;

  const backdropDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`原型大图：${current.label}`}
      onMouseDown={backdropDown}
    >
      <div className="lb__bar">
        <span className="lb__title">界面原型预览</span>
        <span className="lb__count">
          {index + 1} / {total}
        </span>
        <div className="lb__actions">
          <button
            type="button"
            className={`lb__icon ${zoomed ? 'is-on' : ''}`}
            onClick={() => setZoomed(value => !value)}
            title={zoomed ? '适应窗口' : '原始尺寸'}
            aria-label={zoomed ? '适应窗口' : '原始尺寸'}
          >
            {zoomed ? '适应' : '原图'}
          </button>
          <button
            ref={closeRef}
            type="button"
            className="lb__icon lb__close"
            onClick={onClose}
            title="关闭 (Esc)"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
      </div>

      <div className={`lb__stage ${zoomed ? 'is-zoomed' : ''}`} onMouseDown={backdropDown}>
        {total > 1 && (
          <button type="button" className="lb__nav lb__nav--prev" onClick={() => step(-1)} aria-label="上一张">
            ‹
          </button>
        )}
        <div className="lb__canvas" onClick={() => setZoomed(value => !value)}>
          {current.image && (
            <img key={current.image} src={current.image} alt={current.label} draggable={false} />
          )}
        </div>
        {total > 1 && (
          <button type="button" className="lb__nav lb__nav--next" onClick={() => step(1)} aria-label="下一张">
            ›
          </button>
        )}
      </div>

      <div className="lb__caption">
        <strong>{current.label}</strong>
        <span>← → 切换 · 点击图片看原图 · Esc 关闭</span>
      </div>
    </div>,
    document.body
  );
}
