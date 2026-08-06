import type { FC } from 'react';
import type { ArtProps } from './primitives';

/**
 * Shared frame for every project illustration. The card crops to roughly 2.1:1,
 * so only the middle ~45% of the viewBox height survives; each scene passes its
 * own dx/dy so it stays inside that window with consistent headroom.
 */
/** Shared frame. Gradients live once in <ArtDefs /> to avoid duplicate ids. */
export function Art({ children, dx = 0, dy = 0 }: ArtProps) {
  return (
    <svg className="art" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1000" height="680" fill="url(#skdSky)" />
      <rect width="1000" height="680" fill="url(#skdGrid)" />
      <rect width="1000" height="680" fill="url(#skdGlow)" />
      {/* The card crops to roughly 2.1:1, so only the middle ~45% of the
          viewBox height survives. Tall scenes shift down to stay inside it. */}
      <g transform={`translate(${dx},${dy})`}>{children}</g>
    </svg>
  );
};

/**
 * Gradients and the blueprint pattern, rendered once per page. Keeping them in a
 * single hidden <svg> avoids six sets of duplicate element ids in the document.
 */
export const ArtDefs: FC = () => {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="skdSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E4062" /><stop offset="100%" stopColor="#20272D" />
        </linearGradient>
        <pattern id="skdGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#F4F1EA" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <radialGradient id="skdGlow" cx="50%" cy="44%" r="54%">
          <stop offset="0%" stopColor="#E8590C" stopOpacity=".17" />
          <stop offset="100%" stopColor="#E8590C" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
