import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/** 进入视口时触发一次（或反复触发），用于滚动入场动效 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
