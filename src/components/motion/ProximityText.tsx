import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * ProximityText —— 基于 React Bits「VariableProximity」核心机制适配版
 * ------------------------------------------------------------------
 * 原组件用可变字体的 wght/opsz 轴做交互；中文字体（幼圆）不支持可变轴，
 * 因此把「字重变化」替换为鼠标靠近时的 scale / lift / 颜色变化，对中文 100% 有效。
 * 保留原组件的核心：
 *   - 逐字 span + 距离衰减（linear / exponential / gaussian）
 *   - smoothing 平滑跟随（指数缓动）
 *   - 仅在 radius 内计算、mouseleave 复位
 *   - prefers-reduced-motion 降级
 * 同时兼容本站 BlurText 的逐字入场动画与「无界」描边效果。
 */

interface ProximityTextProps {
  /** 每行文字 */
  lines: readonly string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  stagger?: number;
  /** 从第几个字（全局序号）开始描边空心 */
  outlineFrom?: number;
  /** 鼠标影响半径 px */
  radius?: number;
  /** 衰减方式 */
  falloff?: 'linear' | 'exponential' | 'gaussian';
  /** 平滑系数 0=瞬间 1=拖尾 */
  smoothing?: number;
  /** 鼠标正下方字符放大倍数，1=不变 */
  scale?: number;
  /** 鼠标正下方字符上浮高度 em */
  lift?: number;
  /** 靠近时的颜色（不传则只做位移/缩放） */
  toColor?: string;
}

const GAUSSIAN_EDGE = Math.exp(-2);

function strengthAt(distance: number, radius: number, falloff: string) {
  if (distance >= radius) return 0;
  const norm = 1 - distance / radius;
  if (falloff === 'exponential') return norm * norm;
  if (falloff === 'gaussian') {
    return (Math.exp(-2 * (distance / radius) ** 2) - GAUSSIAN_EDGE) / (1 - GAUSSIAN_EDGE);
  }
  return norm;
}

export function ProximityText({
  lines,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 42,
  outlineFrom,
  radius = 130,
  falloff = 'gaussian',
  smoothing = 0.28,
  scale = 1.22,
  lift = 0.12,
  toColor
}: ProximityTextProps) {
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const rootRef = useRef<HTMLElement | null>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // 合并 ref：同时挂到 inView 观察节点与组件根
  const setRoot = (node: HTMLDivElement | null) => {
    inViewRef.current = node;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    const levels = new Array(letters.length).fill(0);
    const targets = new Array(letters.length).fill(0);
    const written: string[] = new Array(letters.length).fill('');
    const pointer = { x: 0, y: 0, active: false };

    const growth = scale - 1;
    const tinted = Boolean(toColor);

    let frame = 0;
    let lastTime = 0;
    let dirty = true;

    const measure = () => {
      targets.fill(0);
      if (!pointer.active) return;
      letters.forEach((letter, i) => {
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(
          pointer.x - (rect.left + rect.width / 2),
          pointer.y - (rect.top + rect.height / 2)
        );
        targets[i] = strengthAt(distance, radius, falloff);
      });
    };

    const tick = (now: number) => {
      frame = 0;
      const delta = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;

      if (dirty) {
        measure();
        dirty = false;
      }

      const ease = smoothing > 0 ? 1 - Math.exp(-delta / (smoothing * 400)) : 1;
      let settling = false;

      letters.forEach((letter, i) => {
        const target = targets[i] ?? 0;
        const current = levels[i] ?? 0;
        let next = current + (target - current) * ease;
        if (Math.abs(target - next) < 0.002) next = target;
        else settling = true;
        levels[i] = next;

        const transform =
          next === 0
            ? ''
            : `translateY(${(-lift * next).toFixed(3)}em) scale(${(1 + growth * next).toFixed(3)})`;
        if (written[i] !== transform) {
          written[i] = transform;
          letter.style.transform = transform;
        }

        if (tinted) {
          const color =
            next === 0
              ? ''
              : `color-mix(in oklab, currentColor ${((1 - next) * 100).toFixed(1)}%, ${toColor})`;
          letter.style.color = color;
        }
      });

      if (settling) frame = requestAnimationFrame(tick);
      else lastTime = 0;
    };

    const schedule = () => {
      dirty = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleMove = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      schedule();
    };
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };
    const handleLeave = () => {
      pointer.active = false;
      schedule();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleLeave);
    window.addEventListener('touchcancel', handleLeave);
    window.addEventListener('scroll', schedule, { capture: true, passive: true });
    window.addEventListener('resize', schedule);
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleLeave);
      window.removeEventListener('touchcancel', handleLeave);
      window.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [radius, falloff, smoothing, scale, lift, toColor]);

  let index = 0;

  return (
    <div ref={setRoot} className={`blur-text proximity-text ${inView ? 'is-in' : ''}`}>
      <Tag ref={rootRef as never} className={className}>
        {lines.map((line, lineIndex) => (
          <span className="blur-text__line" key={`${line}-${lineIndex}`}>
            {Array.from(line).map((char, charIndex) => {
              const i = index++;
              const isOutline = outlineFrom !== undefined && i >= outlineFrom;
              return (
                <span
                  className={`blur-text__char proximity-text__char ${isOutline ? 'blur-text__char--outline' : ''}`}
                  key={`${char}-${charIndex}`}
                  ref={el => {
                    letterRefs.current[i] = el;
                  }}
                  style={{ '--bt-delay': `${delay + i * stagger}ms` } as CSSProperties}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
}

export default ProximityText;
