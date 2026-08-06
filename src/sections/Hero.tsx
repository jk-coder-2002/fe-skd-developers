import { useCallback, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Counter } from '../components/Counter';
import { HeroSceneSVG } from '../components/HeroSceneSVG';
import { Kicker } from '../components/Kicker';
import { Reveal } from '../components/Reveal';
import { Scene } from '../three/Scene';
import { prefersReducedMotion, scrollToSection } from '../utils/motion';
import type { CSSVars, Translation } from '../types';

export interface HeroProps {
  t: Translation;
}

/** Full-height hero: WebGL construction site behind, copy and CTAs in front. */
/* ==========================================================================
   9. SECTIONS
   ========================================================================== */
export function Hero({ t }: HeroProps) {
  const [webgl, setWebgl] = useState(() => !prefersReducedMotion());
  const fail = useCallback(() => setWebgl(false), []);

  return (
    <section id="home" className="hero sec bp bp-dark">
      <div className="hero-canvas">{webgl ? <Scene onFail={fail} /> : <HeroSceneSVG />}</div>
      <div className="hero-scrim" />

      <div className="wrap">
        <Reveal className="hero-in">
          <div className="up"><span className="badge"><i className="dot" />{t.hero.badge}</span></div>
          <div className="up" style={{ ['--d']: '60ms', marginTop: 16 } as CSSVars}>
            <Kicker dark>{t.hero.eyebrow}</Kicker>
          </div>
          <h1 className="dsp d1">
            <span className="mask" style={{ ['--d']: '130ms' } as CSSVars}><span>{t.hero.t1}</span></span>
            <span className="mask" style={{ ['--d']: '220ms' } as CSSVars}><span>{t.hero.t2}</span></span>
            <span className="mask" style={{ ['--d']: '310ms' } as CSSVars}><span className="accent">{t.hero.t3}</span></span>
          </h1>
          <p className="lead sub up" style={{ ['--d']: '420ms' } as CSSVars}>{t.hero.sub}</p>
          <div className="hero-cta up" style={{ ['--d']: '500ms' } as CSSVars}>
            <button className="btn btn-p" onClick={() => scrollToSection('contact')}>
              {t.hero.cta}<ArrowRight size={17} />
            </button>
            <button className="btn btn-g" onClick={() => scrollToSection('work')}>{t.hero.cta2}</button>
          </div>
          <dl className="stats up" style={{ ['--d']: '580ms' } as CSSVars}>
            {t.hero.stats.map((s) => (
              <div className="stat" key={s.v}>
                <dt><Counter value={s.k} /></dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="cue"><span>{t.hero.scroll}</span><i /></div>
    </section>
  );
}
