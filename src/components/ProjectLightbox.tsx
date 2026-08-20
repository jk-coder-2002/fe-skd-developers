import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { prefersReducedMotion } from '../utils/motion';
import type { Project } from '../types';

export interface ProjectLightboxProps {
  project: Project;
  artLabel: string;
  categoryLabel: string;
  onClose: () => void;
}

const AUTOPLAY_MS = 4800;
const CLOSE_MS = 240;

/**
 * Full-screen viewer opened from a project card: enlarges its photos in a
 * sliding filmstrip (or shows the isometric illustration when there are
 * none), with arrow/dot navigation and keyboard support.
 */
export function ProjectLightbox({ project, artLabel, categoryLabel, onClose }: ProjectLightboxProps) {
  const imgs = project.photos && project.photos.length ? project.photos : null;
  const multi = !!imgs && imgs.length > 1;
  const [idx, setIdx] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const requestClose = useCallback(() => setClosing(true), []);
  const next = useCallback(() => { if (imgs) setIdx((n) => (n + 1) % imgs.length); }, [imgs]);
  const prev = useCallback(() => { if (imgs) setIdx((n) => (n - 1 + imgs.length) % imgs.length); }, [imgs]);

  // Exit animation plays via the `is-closing` class; only unmount once it's done.
  useEffect(() => {
    if (!closing) return;
    const t = window.setTimeout(onClose, CLOSE_MS);
    return () => window.clearTimeout(t);
  }, [closing, onClose]);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose, next, prev]);

  // Restarts on every manual nav too, so a click doesn't get undercut by an
  // autoplay tick a moment later.
  useEffect(() => {
    if (!multi || prefersReducedMotion()) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [multi, next, idx]);

  return createPortal(
    <div className={`jd lightbox ${closing ? 'is-closing' : 'is-open'}`}
      role="dialog" aria-modal="true" aria-label={project.n}>
      <div className="lightbox-backdrop" onClick={requestClose} />
      <div className="lightbox-panel">
        <button ref={closeBtnRef} className="lightbox-close" onClick={requestClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="lightbox-media">
          {imgs ? (
            <div className="lightbox-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {imgs.map((src, n) => (
                <div className="lightbox-slide" key={n}>
                  <img src={src} loading={n === 0 ? undefined : 'lazy'}
                    alt={n === 0 ? project.n : `${project.n} (${n + 1})`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="lightbox-art">
              <project.Art />
              <span className="ph">{artLabel}</span>
            </div>
          )}

          {multi && (
            <>
              <button className="lightbox-arrow prev" onClick={prev} aria-label="Previous photo">
                <ChevronLeft size={22} />
              </button>
              <button className="lightbox-arrow next" onClick={next} aria-label="Next photo">
                <ChevronRight size={22} />
              </button>
              <span className="lightbox-count mono">{idx + 1} / {imgs.length}</span>
              <div className="lightbox-dots">
                {imgs.map((_, n) => (
                  <button key={n} className={n === idx ? "on" : ""}
                    onClick={() => setIdx(n)} aria-label={`Show photo ${n + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="lightbox-info">
          <span className="lightbox-tag">{categoryLabel}</span>
          <span className="proj-meta mono"><i />{project.m}</span>
          <h3 className="dsp d2">{project.n}</h3>
          <p className="body">{project.d}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
