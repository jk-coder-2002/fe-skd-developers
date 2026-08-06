import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import { Tilt } from '../components/Tilt';
import { SERVICE_META } from '../utils/meta';
import type { Translation } from '../types';

export interface ServicesProps {
  t: Translation;
}

/** Six service cards with trade-code tags and pointer tilt. */
export function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="sec on-light bp grain slant-t">
      <div className="wrap sec-pad">
        <Heading ghost={t.services.ghost} kicker={t.services.kicker} title={t.services.title} />
        <div className="grid g2 g3" style={{ marginTop: 38 }}>
          {t.services.items.map((s, i) => {
            const { Icon, code } = SERVICE_META[i];
            return (
              <Reveal key={s.t} delay={i * 70}>
                <Tilt className="up">
                  <article className="card">
                    <span className="code mono">{code}</span>
                    <span className="card-ico"><Icon size={23} strokeWidth={1.8} /></span>
                    <h3 className="dsp d3">{s.t}</h3>
                    <p className="body">{s.d}</p>
                  </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
