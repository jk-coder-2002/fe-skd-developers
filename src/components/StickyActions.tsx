import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { TEL_URL, WA_URL } from '../utils/config';
import type { Translation } from '../types';

export interface StickyActionsProps {
  t: Translation;
}

/** Sticky conversion controls: split bar on phones, bubble on desktop. */
export function StickyActions({ t }: StickyActionsProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || 0) > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className={`bar ${show ? "bar-show" : ""}`}>
        <a className="c" href={TEL_URL}><Phone size={17} />{t.cta.call}</a>
        <a className="w" href={WA_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={17} />{t.cta.wa}
        </a>
      </div>
      <a className={`fab ${show ? "fab-show" : ""}`} href={WA_URL} target="_blank"
        rel="noopener noreferrer" aria-label={t.cta.wa}>
        <MessageCircle size={25} />
      </a>
    </>
  );
}
