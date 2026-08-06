import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../utils/motion';

export interface CounterProps {
  /** Figure with optional prefix/suffix, e.g. "20+", "100%". */
  value: string;
}

/** Counts up when scrolled into view. Static under reduced motion. */
export function Counter({ value }: CounterProps) {
  // No bottom rootMargin here: the hero stats can already sit near the
  // bottom of the viewport on first load, and the reveal margin used
  // elsewhere would keep them permanently out of view.
  const [ref, inView] = useInView(0.4, true, '0px');
  const m = String(value).match(/^(\D*?)(\d[\d,]*)(.*)$/);
  const target = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  // Reduced-motion visitors see the final figure immediately, decided at first
  // render so the effect never has to set state synchronously.
  const [n, setN] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    if (!inView || !m || prefersReducedMotion()) return;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / 1250, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // `m` is derived from `value` on every render, so its identity changes each
    // time even when `value` hasn't — depending on it here would restart this
    // effect (and reset t0) on every animation frame instead of once.
  }, [inView, target]);

  if (!m) return <span ref={ref}>{value}</span>;
  return <span ref={ref} className="mono">{m[1]}{n.toLocaleString("en-IN")}{m[3]}</span>;
}
