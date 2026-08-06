import { useEffect, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LangSwitch } from '../components/LangSwitch';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { scrollToSection } from '../utils/motion';
import { CONFIG, TEL_URL, WA_URL } from '../utils/config';
import { NAV_ITEMS } from '../utils/meta';
import type { Lang, SectionId, Translation } from '../types';

export interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
  /** Section currently owning the middle of the viewport. */
  active: SectionId;
}

/** Fixed header: wordmark, links with scrollspy underline, language switcher,
    desktop call button, scroll-progress bar and the full-screen mobile sheet. */
/* ==========================================================================
   8. NAV
   ========================================================================== */
export function Navbar({ lang, setLang, t, active }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { solid, progress } = useScrollProgress();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id: SectionId) => { setOpen(false); scrollToSection(id); };

  return (
    <>
      <header className={`nav ${solid || open ? "nav-solid" : ""}`}>
        <div className="wrap">
          <div className="nav-in">
            <button className="mark" onClick={() => go("home")}>
              <Logo size={40} />
              <span>
                <span className="mark-t1">{CONFIG.brand}</span>
                <span className="mark-t2">{CONFIG.brandTag}</span>
              </span>
            </button>

            <nav className="nav-links">
              {NAV_ITEMS.map((it) => (
                <button key={it.id} onClick={() => go(it.id)}
                  className={`nlink ${active === it.id ? "nlink-on" : ""}`}>
                  {t.nav[it.id]}
                </button>
              ))}
              {/* PHASE 2: an { external:true } item renders as a bordered button here. */}
            </nav>

            <div className="nav-right">
              <LangSwitch lang={lang} setLang={setLang} />
              <a href={TEL_URL} className="btn btn-p btn-sm call-d">
                <Phone size={15} />{t.cta.call}
              </a>
              <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="stripe-sm" style={{ opacity: solid ? 1 : 0, transition: "opacity .3s ease" }} />
        <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      {open && (
        <div className="sheet">
          <button onClick={() => setOpen(false)} aria-label="Close menu"
            style={{ position: "absolute", top: 18, right: 20 }}>
            <X size={26} />
          </button>
          <div style={{ flex: 1 }}>
            {NAV_ITEMS.map((it, i) => (
              <button key={it.id} onClick={() => go(it.id)} className="sheet-link"
                style={{ animationDelay: `${60 + i * 55}ms` }}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="w">{t.nav[it.id]}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-p">
              <MessageCircle size={17} />{t.cta.wa}
            </a>
            <a href={TEL_URL} className="btn btn-g"><Phone size={17} />{t.cta.call}</a>
          </div>
        </div>
      )}
    </>
  );
}
