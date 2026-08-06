import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Field } from '../components/Field';
import { Heading } from '../components/Heading';
import { MapArt } from '../components/MapArt';
import { Reveal } from '../components/Reveal';
import { Footer } from '../layout/Footer';
import { CONFIG, MAPS_URL, TEL_URL, WA_URL } from '../utils/config';
import type { Translation } from '../types';

export interface ContactProps {
  t: Translation;
}

interface FormState {
  name: string;
  phone: string;
  msg: string;
}

interface Note {
  kind: 'err' | 'ok';
  text: string;
}

/** Contact channels, the enquiry composer, and the footer. */
export function Contact({ t }: ContactProps) {
  const [f, setF] = useState<FormState>({ name: '', phone: '', msg: '' });
  const [note, setNote] = useState<Note | null>(null);
  const set =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setF((s) => ({ ...s, [k]: e.target.value }));
      setNote(null);
    };

  const compose = () =>
    `${t.contact.formTitle}\n${t.contact.name}: ${f.name}\n${t.contact.ph}: ${f.phone}\n${t.contact.msg} ${f.msg}`;

  const send = (via: 'wa' | 'mail') => {
    if (!f.name.trim() || !f.phone.trim()) {
      setNote({ kind: 'err', text: t.contact.required });
      return;
    }
    const url = via === "wa"
      ? `${WA_URL}?text=${encodeURIComponent(compose())}`
      : `mailto:${CONFIG.email}?subject=${encodeURIComponent(`${t.contact.formTitle} — ${f.name}`)}&body=${encodeURIComponent(compose())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setNote({ kind: "ok", text: t.contact.success });
  };

  const channels = [
    { Icon: Phone, l: t.contact.phone, v: CONFIG.phoneDisplay, href: TEL_URL },
    { Icon: MessageCircle, l: t.contact.whatsapp, v: CONFIG.phoneDisplay, href: WA_URL },
    { Icon: Mail, l: t.contact.email, v: CONFIG.email, href: `mailto:${CONFIG.email}` },
  ];

  return (
    <section id="contact" className="sec on-steel bp bp-dark slant-t">
      <div className="wrap sec-pad" style={{ paddingBottom: 36 }}>
        <div className="grid split">
          <div>
            <Heading dark ghost={t.contact.ghost} kicker={t.contact.kicker} title={t.contact.title} />
            <Reveal delay={110}>
              <p className="lead up" style={{ color: "var(--muted-d)", marginTop: 20, maxWidth: "32rem" }}>
                {t.contact.body}
              </p>
            </Reveal>

            <div className="grid g2" style={{ marginTop: 28 }}>
              {channels.map((c, i) => (
                <Reveal key={c.l} delay={i * 70}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer" className="card-d chan up">
                    <c.Icon size={19} strokeWidth={1.9} />
                    <p className="l">{c.l}</p>
                    <p className="v">{c.v}</p>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={210}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="card-d chan up" style={{ padding: 0, overflow: "hidden" }}>
                  <MapArt />
                  <div style={{ padding: "14px 18px 18px" }}>
                    <p className="l" style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 7 }}>
                      <MapPin size={14} />{t.contact.location}
                    </p>
                    <p className="v">{t.contact.areaValue}</p>
                    <span className="x">{t.contact.map}<ArrowUpRight size={13} /></span>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Not a <form>: composes the enquiry and hands it to WhatsApp or mail. */}
          <Reveal delay={140}>
            <div className="panel up">
              <h3 className="dsp" style={{ fontSize: "1.2rem" }}>{t.contact.formTitle}</h3>
              <div className="stripe" style={{ marginTop: 14, maxWidth: 92 }} />
              <div className="fields">
                <Field label={t.contact.name} ph={t.contact.namePh} value={f.name} onChange={set("name")} />
                <Field label={t.contact.ph} ph={t.contact.phPh} value={f.phone} onChange={set("phone")} tel />
                <Field label={t.contact.msg} ph={t.contact.msgPh} value={f.msg} onChange={set("msg")} area />
              </div>
              {note && (
                <p className={`note ${note.kind === "ok" ? "note-ok" : "note-err"}`} role="status">
                  {note.kind === "ok" ? <Check size={15} /> : null}{note.text}
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 11, marginTop: 22 }}>
                <button className="btn btn-p" onClick={() => send("wa")}>
                  <Send size={16} />{t.contact.send}
                </button>
                <button className="btn btn-g" onClick={() => send("mail")}>{t.contact.sendMail}</button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer t={t} />
    </section>
  );
}
