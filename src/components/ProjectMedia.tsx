import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../utils/motion';
import type { Project } from '../types';

export interface ProjectMediaProps {
  p: Project;
  /** Badge text shown on cards that still use an illustration. */
  artLabel: string;
}

/**
 * Project media. One photo shows a still; two or more auto-crossfade with a slow
 * Ken Burns drift and clickable bar indicators. No photos at all falls back to
 * the isometric illustration. The timer only runs while the card is on screen,
 * and reduced-motion visitors get a static first frame.
 */
/** Project media. One photo shows a still; two or more auto-crossfade with a
    slow Ken Burns drift and clickable bar indicators. No photos at all falls
    back to the isometric illustration. The timer only runs while the card is
    on screen, and reduced-motion visitors get a static first frame. */
export function ProjectMedia({ p, artLabel }: ProjectMediaProps) {
  const imgs = p.photos && p.photos.length ? p.photos : null;
  const [idx, setIdx] = useState(0);
  const [ref, inView] = useInView(0.2, false);
  const multi = !!imgs && imgs.length > 1;

  useEffect(() => {
    if (!multi || !inView || prefersReducedMotion()) return;
    const t = window.setInterval(() => setIdx((n) => (n + 1) % imgs.length), 4200);
    return () => window.clearInterval(t);
  }, [multi, inView, imgs]);

  if (!imgs) {
    return (
      <>
        <p.Art />
        <span className="ph">{artLabel}</span>
      </>
    );
  }

  return (
    <div className="gal" ref={ref}>
      {imgs.map((src, n) => (
        <img key={n} src={src} loading="lazy" className={n === idx ? "on" : ""}
          alt={n === 0 ? p.n : `${p.n} (${n + 1})`} />
      ))}
      {multi && (
        <>
          <span className="gal-count mono">{idx + 1} / {imgs.length}</span>
          <div className="gal-nav">
            {imgs.map((_, n) => (
              <button key={n} className={n === idx ? "on" : ""}
                onClick={() => setIdx(n)} aria-label={`Show photo ${n + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
