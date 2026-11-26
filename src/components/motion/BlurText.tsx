import type { CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';

interface BlurTextProps {
  /** 每行文字；逐字模糊上浮入场 */
  lines: readonly string[];
  className?: string;
  /** 整段起始延迟 ms */
  delay?: number;
  /** 每个字的间隔 ms */
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  accentLine?: number;
  /** 描边空心字所在行（下标从 0 起） */
  outlineLine?: number;
  /** 从第几个字（全局序号，从 0 起）开始变为描边空心字 */
  outlineFrom?: number;
}

/** 逐字模糊入场 —— React Bits BlurText 的轻量重写（去掉 motion 依赖） */
export function BlurText({
  lines,
  className = '',
  delay = 0,
  stagger = 42,
  as: Tag = 'h2',
  accentLine,
  outlineLine,
  outlineFrom
}: BlurTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  let index = 0;

  return (
    <div
      ref={ref}
      className={`blur-text ${inView ? 'is-in' : ''}`}
    >
      <Tag className={className}>
        {lines.map((line, lineIndex) => (
          <span
            className={`blur-text__line ${accentLine === lineIndex ? 'u-accent' : ''} ${
              outlineLine === lineIndex ? 'blur-text__line--outline' : ''
            }`}
            key={`${line}-${lineIndex}`}
          >
            {Array.from(line).map((char, charIndex) => {
              const i = index++;
              return (
                <span
                  className={`blur-text__char ${
                    outlineFrom !== undefined && i >= outlineFrom ? 'blur-text__char--outline' : ''
                  }`}
                  key={`${char}-${charIndex}`}
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
