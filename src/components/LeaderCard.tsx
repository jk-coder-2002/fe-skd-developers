import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import type { PersonCopy, PersonMeta, Translation } from '../types';

export interface LeaderCardProps {
  p: PersonCopy;
  meta: PersonMeta;
  t: Translation;
}

/**
 * One leadership card: duotone portrait, stamped role badge, signed promise,
 * credential chips and a direct WhatsApp line to that person.
 */
/** One leadership card: duotone portrait, stamped role badge, signed promise,
    credential chips and a direct WhatsApp line to that person. */
export function LeaderCard({ p, meta, t }: LeaderCardProps) {
  const [broken, setBroken] = useState(false);
  const waHref =
    `https://wa.me/${meta.wa}?text=` +
    encodeURIComponent(t.about.talkMsg.replace("{name}", p.short));

  return (
    <article className="ld up">
      <span className="ld-stripe" aria-hidden="true" />
      <div className="ld-photo">
        {/* PHOTO SLOT — in a real project use src={meta.file} and delete the
            inlined PHOTO constants at the top of this file. */}
        {broken ? (
          <span className="fb" aria-hidden="true">{meta.initials}</span>
        ) : (
          <img src={meta.photo} alt={p.name} loading="lazy" onError={() => setBroken(true)} />
        )}
        <span className="ld-role">{meta.roleShort}</span>
      </div>
      <div className="ld-body">
        <span className="ld-since"><i />{p.since}</span>
        <h3 className="dsp">{p.name}</h3>
        <p className="lbl" style={{ color: "var(--muted-d)", marginTop: 7 }}>{p.role}</p>
        <p className="ld-quote">{p.quote}</p>
        <div className="ld-chips">
          {p.chips.map((c) => <span key={c}>{c}</span>)}
        </div>
        <a className="btn btn-p btn-sm ld-talk" href={waHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={15} />{t.about.talkTpl.replace("{name}", p.short)}
        </a>
      </div>
    </article>
  );
}
