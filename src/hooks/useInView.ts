import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether an element is on screen.
 *
 * @param threshold  how much of the element must be visible
 * @param once       true latches on first sight (used for scroll reveals);
 *                   false keeps tracking (used to pause off-screen galleries)
 * @param rootMargin overrides the default margin (the -8% bottom margin used
 *                   for `once` assumes the element starts below the fold;
 *                   pass '0px' for elements that may already be visible on load)
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  once = true,
  rootMargin?: string,
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  // Environments without IntersectionObserver treat everything as visible, so
  // that is resolved at first render rather than with a setState in the effect.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (once) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        } else {
          setInView(e.isIntersecting);
        }
      },
      { threshold, rootMargin: rootMargin ?? (once ? '0px 0px -8% 0px' : '0px') },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, inView];
}
