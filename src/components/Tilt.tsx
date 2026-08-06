import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { prefersReducedMotion } from '../utils/motion';

export interface TiltProps {
  children: ReactNode;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Lift in px while hovered. */
  lift?: number;
  className?: string;
}

/** Pointer-tilt wrapper. Inert on touch devices and under reduced motion. */
/** Pointer-tilt wrapper. Inert on touch devices and under reduced motion. */
export function Tilt({ children, max = 4, lift = 6, className = '' }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const on = useRef(false);
  const [st, setSt] = useState<CSSProperties | null>(null);

  useEffect(() => {
    on.current =
      typeof window !== "undefined" &&
      window.matchMedia('(hover:hover) and (pointer:fine)').matches &&
      !prefersReducedMotion();
  }, []);

  const move = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!on.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setSt({
      transform: `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) translateY(-${lift}px)`,
      transition: 'transform .12s ease-out',
    });
  }, [max, lift]);

  return (
    <div ref={ref} className={className} style={st || undefined}
      onMouseMove={move} onMouseLeave={() => setSt(null)}>
      {children}
    </div>
  );
}
