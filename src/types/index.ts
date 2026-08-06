import type { CSSProperties, FC } from 'react';
import type { LucideIcon } from 'lucide-react';

/* ---------------------------------------------------------------- language */

export type Lang = 'en' | 'gu' | 'hi';

export type SectionId = 'home' | 'services' | 'about' | 'work' | 'contact';

export interface NavItem {
  id: SectionId;
  /** Phase 2: render as a bordered button linking out of the marketing page. */
  external?: boolean;
  href?: string;
}

/* ---------------------------------------------------------------- copy shapes */

export interface StatCopy {
  /** The headline figure, e.g. "20+" or "100%". */
  k: string;
  /** The label under it. */
  v: string;
}

export interface HeroCopy {
  eyebrow: string;
  badge: string;
  t1: string;
  t2: string;
  t3: string;
  sub: string;
  cta: string;
  cta2: string;
  scroll: string;
  stats: StatCopy[];
}

export interface ServiceCopy {
  /** Title. */
  t: string;
  /** One or two line description. */
  d: string;
}

export interface PersonCopy {
  name: string;
  /** First name only, used in the "Talk to {name}" call to action. */
  short: string;
  role: string;
  since: string;
  quote: string;
  chips: string[];
}

export interface AboutCopy {
  ghost: string;
  kicker: string;
  title: string;
  body: string;
  leadership: string;
  leadTitle: string;
  leadNote: string;
  /** Contains the token {name}. */
  talkTpl: string;
  /** Contains the token {name}. */
  talkMsg: string;
  people: PersonCopy[];
}

export interface ProjectCopy {
  /** Project name. */
  n: string;
  /** Description. */
  d: string;
  /** Meta line, e.g. "2023 · 18,000 sq.ft". */
  m: string;
}

export type ProjectCat = 'industrial' | 'residential' | 'commercial' | 'renovation';
export type FilterKey = 'all' | ProjectCat;

export interface WorkCopy {
  ghost: string;
  /** Badge shown on cards that still use an illustration instead of a photo. */
  art: string;
  kicker: string;
  title: string;
  note: string;
  filters: Record<FilterKey, string>;
  projects: ProjectCopy[];
}

export interface ContactCopy {
  ghost: string;
  kicker: string;
  title: string;
  body: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  areaValue: string;
  map: string;
  formTitle: string;
  name: string;
  namePh: string;
  ph: string;
  phPh: string;
  msg: string;
  msgPh: string;
  send: string;
  sendMail: string;
  required: string;
  success: string;
}

export interface Translation {
  /** Short label for the language switcher, e.g. "EN". */
  label: string;
  nav: Record<SectionId, string>;
  cta: { call: string; wa: string };
  hero: HeroCopy;
  marquee: string[];
  services: { ghost: string; kicker: string; title: string; items: ServiceCopy[] };
  about: AboutCopy;
  work: WorkCopy;
  contact: ContactCopy;
  footer: { rights: string; built: string };
}

export type Translations = Record<Lang, Translation>;

/* ---------------------------------------------------------------- metadata */

export interface ServiceMeta {
  Icon: LucideIcon;
  /** Trade abbreviation printed on the card, e.g. "RCC". */
  code: string;
}

export interface ProjectMeta {
  cat: ProjectCat;
  /** Isometric illustration used when `photos` is null. */
  Art: FC;
  /** One entry shows a still; two or more become a crossfading gallery. */
  photos: string[] | null;
}

/** A translated project joined with its language-independent metadata. */
export interface Project extends ProjectCopy, ProjectMeta {
  key: number;
}

export interface PersonMeta {
  photo: string;
  /** Fallback shown if the photo fails to load. */
  initials: string;
  /** Language-independent short role, e.g. "CEO". */
  roleShort: string;
  /** wa.me number, digits only. */
  wa: string;
}

/* ---------------------------------------------------------------- styling */

/**
 * Inline styles that also carry CSS custom properties. The reveal system passes
 * a `--d` stagger delay this way, which plain CSSProperties will not accept.
 */
export interface CSSVars extends CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}
