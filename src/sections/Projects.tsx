import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ArtDefs } from '../components/art';
import { Heading } from '../components/Heading';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { ProjectMedia } from '../components/ProjectMedia';
import { Reveal } from '../components/Reveal';
import { Tilt } from '../components/Tilt';
import { FILTER_KEYS, PROJECT_META } from '../utils/meta';
import type { FilterKey, Project, Translation } from '../types';

export interface ProjectsProps {
  t: Translation;
}

/** Previous work: category filter plus photo galleries / isometric illustrations. */
export function Projects({ t }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [active, setActive] = useState<Project | null>(null);
  const list: Project[] = useMemo(
    () => t.work.projects.map((p, i) => ({ ...p, ...PROJECT_META[i], key: i }))
      .filter((p) => filter === "all" || p.cat === filter),
    [t, filter]
  );

  return (
    <section id="work" className="sec on-light bp grain">
      <ArtDefs />
      <div className="wrap sec-pad">
        <div className="between">
          <Heading ghost={t.work.ghost} kicker={t.work.kicker} title={t.work.title} />
          <Reveal delay={80}>
            <p className="body up" style={{ color: "var(--muted)", maxWidth: "24rem" }}>{t.work.note}</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="chips up">
            {FILTER_KEYS.map((k) => (
              <button key={k} className={`chip ${filter === k ? "chip-on" : ""}`}
                aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {t.work.filters[k]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid g2 g3" style={{ marginTop: 24 }}>
          {list.map((p, i) => (
            <Reveal key={`${filter}-${p.key}`} delay={i * 70}>
              <Tilt className="up" max={3} lift={8}>
                <article className="proj" role="button" tabIndex={0}
                  aria-label={`View ${p.n}`}
                  onClick={() => setActive(p)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(p); } }}>
                  <div className="plate">
                    <ProjectMedia p={p} artLabel={t.work.art} />
                    <span className="tag">{t.work.filters[p.cat]}</span>
                  </div>
                  <div className="proj-body">
                    <span className="proj-meta mono"><i />{p.m}</span>
                    <h3 className="dsp d3">{p.n}<ArrowUpRight size={15} /></h3>
                    <p className="body">{p.d}</p>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <ProjectLightbox
          project={active}
          artLabel={t.work.art}
          categoryLabel={t.work.filters[active.cat]}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
