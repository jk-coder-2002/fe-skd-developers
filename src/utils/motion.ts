/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth-scrolls a section into view, respecting the reduced-motion setting. */
export const scrollToSection = (id: string): void => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  }
};
