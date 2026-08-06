import { LeaderCard } from '../components/LeaderCard';
import { Reveal } from '../components/Reveal';
import { PEOPLE_META } from '../utils/meta';
import type { Translation } from '../types';

export interface TeamProps {
  t: Translation;
}

/**
 * The CEO / COO feature band. Rendered INSIDE <About /> rather than as its own
 * <section>, which is what keeps the page at exactly five sections and the nav
 * anchors intact - only the file lives separately, the markup is unchanged.
 */
export function Team({ t }: TeamProps) {
  return (
        <div className="ld-band">
      <Reveal>
        <div className="ld-head up">
          <div>
            <span className="lbl" style={{ color: "var(--yellow)" }}>{t.about.leadership}</span>
            <h3 className="dsp" style={{ fontSize: "clamp(1.3rem,2.3vw,1.75rem)", marginTop: 11 }}>
              {t.about.leadTitle}
            </h3>
          </div>
          <p className="body" style={{ color: "var(--muted-d)", maxWidth: "25rem" }}>
            {t.about.leadNote}
          </p>
        </div>
      </Reveal>

      <div className="ld-grid">
        {t.about.people.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <LeaderCard p={p} meta={PEOPLE_META[i]} t={t} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

