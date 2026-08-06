import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import { Stamp } from '../components/Stamp';
import { Team } from './Team';
import type { CSSVars, Translation } from '../types';

export interface AboutProps {
  t: Translation;
}

/** Company story with the engraved seal, then the leadership feature band. */
export function About({ t }: AboutProps) {
  return (
    <section id="about" className="sec on-navy bp bp-dark slant-tb">
      <div className="wrap sec-pad">
        {/* row 1 — the story, with the company seal alongside */}
        <div className="ab-top">
          <div>
            <Heading dark ghost={t.about.ghost} kicker={t.about.kicker} title={t.about.title} />
            <Reveal delay={120}>
              <p className="lead up" style={{ color: "var(--muted-d)", marginTop: 22, maxWidth: "44rem" }}>
                {t.about.body}
              </p>
              <div className="stripe up" style={{ ['--d']: '60ms', marginTop: 28, maxWidth: 150 } as CSSVars} />
            </Reveal>
          </div>
          <Reveal delay={160} className="ab-stamp">
            <div className="up"><Stamp /></div>
          </Reveal>
        </div>

        <Team t={t} />
      </div>
    </section>
  );
}
