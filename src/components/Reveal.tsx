import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import type { CSSVars } from '../types';

export interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms, exposed to CSS as --d. */
  delay?: number;
  className?: string;
  style?: CSSVars;
}

/**
 * Flips children to `.in` once scrolled into view. Children opt in with the
 * class "up" (fade-rise) or "mask" (line reveal); see globals.css.
 */
export function Reveal({ children, delay = 0, className = '', style }: RevealProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`rv ${inView ? "in" : ""} ${className}`}
      style={{ ['--d']: `${delay}ms`, ...style } as CSSVars}>
      {children}
    </div>
  );
}
