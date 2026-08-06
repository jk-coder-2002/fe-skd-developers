import { Home, Factory, Hammer, ClipboardCheck, Truck, Ruler } from 'lucide-react';
import { CONFIG } from './config';
import {
  ArtShed, ArtBungalows, ArtApartments, ArtRetail, ArtColdStore, ArtHeritage,
} from '../components/art';
import type { FilterKey, NavItem, PersonMeta, ProjectMeta, ServiceMeta } from '../types';

/**
 * Language-independent metadata. These arrays are matched to the translated copy
 * in translations.ts by array index, so their lengths must stay in step.
 */

/** Nav model. Phase 2: add { id: 'portal', external: true, href: '/portal' }. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home' }, { id: 'services' }, { id: 'about' }, { id: 'work' }, { id: 'contact' },
];

/** `code` is the trade abbreviation printed on each service card. */
export const SERVICE_META: ServiceMeta[] = [
  { Icon: Home, code: 'RCC' },
  { Icon: Factory, code: 'PEB' },
  { Icon: Hammer, code: 'RETRO' },
  { Icon: ClipboardCheck, code: 'QA/QC' },
  { Icon: Truck, code: 'PROC' },
  { Icon: Ruler, code: 'DPR' },
];

/* --------------------------------------------------------------------------
   PROJECT PHOTOS  — ⚠ ALL PLACEHOLDERS ⚠
   These are AI-generated stock renders of buildings in the American Midwest
   (two show the Kansas City skyline). They are NOT SKD's work and NOT in Surat.
   They are here so the gallery can be judged with real photographic weight.
   Every one must be replaced before this site goes live — presenting them as
   SKD's portfolio would be misrepresentation.
   -------------------------------------------------------------------------- */
const WORK = {
  shedBuild: '/images/work/atrium-civic-center.jpg',
  homeDone: '/images/work/g5.jpg',
  homeFrame: '/images/work/residential-construction.jpg',
  apartments: '/images/work/signature-project.jpg',
  retailDone: '/images/work/lakeside-office-park.jpg',
  retailHandover: '/images/work/2018.jpg',
  heritageDone: '/images/work/old-mill-revival.jpg',
} as const;

/**
 * `photos` is an array — one entry shows a still image, two or more turn the card
 * into an auto-crossfading gallery with clickable indicators. Set photos to null
 * and the card falls back to `Art`, the isometric illustration drawn for that
 * project type. Real photos: 1400x700 (2:1), JPEG, under 200KB each.
 */
export const PROJECT_META: ProjectMeta[] = [
  { cat: 'industrial',  Art: ArtShed,       photos: [WORK.shedBuild] },
  { cat: 'residential', Art: ArtBungalows,  photos: [WORK.homeDone, WORK.homeFrame] },
  { cat: 'residential', Art: ArtApartments, photos: [WORK.apartments] },
  { cat: 'commercial',  Art: ArtRetail,     photos: [WORK.retailDone, WORK.retailHandover] },
  // no photo that honestly matches a cold store yet — keeps its illustration
  { cat: 'industrial',  Art: ArtColdStore,  photos: null },
  { cat: 'renovation',  Art: ArtHeritage,   photos: [WORK.heritageDone] },
];

export const FILTER_KEYS: FilterKey[] = [
  'all', 'industrial', 'residential', 'commercial', 'renovation',
];

export const PEOPLE_META: PersonMeta[] = [
  {
    photo: '/images/team/vipulbhai-jada.jpg',
    initials: 'VJ',
    roleShort: 'CEO',
    wa: CONFIG.whatsapp, // TODO: swap for a direct number if he wants one
  },
  {
    // TODO: REPLACE THIS PHOTO. The supplied image is an AI-generated stock
    // portrait, not Gordhanbhai Dobariya. Shoot a real photo in the same
    // framing as the CEO shot (head and chest, 4:5) and swap it in here.
    photo: '/images/team/gordhanbhai-dobariya.jpg',
    initials: 'GD',
    roleShort: 'COO',
    wa: CONFIG.whatsapp,
  },
];
