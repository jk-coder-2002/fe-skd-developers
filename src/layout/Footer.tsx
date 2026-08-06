import { Logo } from '../components/Logo';
import { CONFIG } from '../utils/config';
import { NAV_ITEMS } from '../utils/meta';
import { scrollToSection } from '../utils/motion';
import type { Translation } from '../types';

export interface FooterProps {
  t: Translation;
}

/** Rendered inside the Contact section so the page stays at exactly 5 sections. */
/* Footer lives inside Contact so the page stays at exactly 5 sections. */
export function Footer({ t }: FooterProps) {
  return (
    <footer className="foot">
      <div className="stripe" />
      <div className="wrap">
        <div className="foot-in">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Logo size={36} />
              <span>
                <span className="mark-t1">{CONFIG.brand}</span>
                <span className="mark-t2">{CONFIG.brandTag}</span>
              </span>
            </div>
            <p className="tiny" style={{ marginTop: 16 }}>
              {t.about.people[0].name} — {t.about.people[0].role}<br />
              {t.about.people[1].name} — {t.about.people[1].role}<br />
              {CONFIG.addressLine}
            </p>
          </div>
          <nav>
            {NAV_ITEMS.map((it) => (
              <button key={it.id} onClick={() => scrollToSection(it.id)}>{t.nav[it.id]}</button>
            ))}
          </nav>
        </div>
        <p className="tiny" style={{ color: "var(--muted-d)", opacity: .6, paddingBottom: 28 }}>
          © {new Date().getFullYear()} {CONFIG.brandFull} · {t.footer.rights} · {t.footer.built}
        </p>
      </div>
    </footer>
  );
}
