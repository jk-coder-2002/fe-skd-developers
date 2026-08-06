import { useEffect, useState } from 'react';

/** Page scroll state for the nav: solidity flag and 0..1 progress. */
export function useScrollProgress(solidAfter = 20): { solid: boolean; progress: number } {
  const [state, setState] = useState({ solid: false, progress: 0 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setState({ solid: y > solidAfter, progress: h > 0 ? Math.min(y / h, 1) : 0 });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solidAfter]);

  return state;
}
