import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

/** Tracks which section owns the middle of the viewport, for the nav underline. */
export function useScrollSpy(ids: SectionId[], initial: SectionId): SectionId {
  const [active, setActive] = useState<SectionId>(initial);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
