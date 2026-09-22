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
   PROJECT PHOTOS
   STATIC_WORK — ⚠ ALL PLACEHOLDERS ⚠ AI-generated stock renders of buildings
   in the American Midwest (two show the Kansas City skyline). They are NOT
   SKD's work and NOT in Surat. They're here only so the gallery can be judged
   with real photographic weight until each one is replaced by a real SKD
   site photo — presenting them as SKD's portfolio would be misrepresentation.

   REAL_WORK — actual SKD site photos. Safe to present as SKD's own work.
   -------------------------------------------------------------------------- */
const STATIC_WORK = {
  shedBuild: '/images/work/atrium-civic-center.jpg',
  homeDone: '/images/work/g5.jpg',
  homeFrame: '/images/work/residential-construction.jpg',
  apartments: '/images/work/signature-project.jpg',
  retailDone: '/images/work/lakeside-office-park.jpg',
  retailHandover: '/images/work/2018.jpg',
  heritageDone: '/images/work/old-mill-revival.jpg',
} as const;

const REAL_WORK = {
  jewelsUnit: '/images/work/british_jewels_site_1.jpg',
  school1: '/images/work/nobal_scool_site_1.jpg',
  school2: '/images/work/nobal_scool_site_2.jpg',
  school3: '/images/work/nobal_scool_site_3.jpg',
  resort1: '/images/work/ff_resort_site_1.jpg',
  resort2: '/images/work/ff_resort_site_2.jpg',
  resort3: '/images/work/ff_resort_site_3.jpg',
  resort4: '/images/work/ff_resort_site_4.jpg',
  resort5: '/images/work/ff_resort_site_5.jpg',
  resort6: '/images/work/ff_resort_site_6.jpg',
} as const;

/**
 * `photos` is an array — one entry shows a still image, two or more turn the card
 * into an auto-crossfading gallery with clickable indicators. Set photos to null
 * and the card falls back to `Art`, the isometric illustration drawn for that
 * project type. Real photos: 1400x700 (2:1), JPEG, under 200KB each.
 */
export const PROJECT_META: ProjectMeta[] = [
  { cat: 'industrial',  Art: ArtShed,       photos: [STATIC_WORK.shedBuild], source: 'static' },
  { cat: 'residential', Art: ArtBungalows,  photos: [STATIC_WORK.homeDone, STATIC_WORK.homeFrame], source: 'static' },
  { cat: 'residential', Art: ArtApartments, photos: [STATIC_WORK.apartments], source: 'static' },
  { cat: 'commercial',  Art: ArtRetail,     photos: [STATIC_WORK.retailDone, STATIC_WORK.retailHandover], source: 'static' },
  // no photo that honestly matches a cold store yet — keeps its illustration
  { cat: 'industrial',  Art: ArtColdStore,  photos: null, source: 'static' },
  { cat: 'renovation',  Art: ArtHeritage,   photos: [STATIC_WORK.heritageDone], source: 'static' },
  // real SKD site photos — the Projects section sorts these ahead of the
  // placeholders above. Drop a static entry (and its translations.ts copy)
  // once a real replacement exists for that category.
  { cat: 'commercial',  Art: ArtRetail,     photos: [REAL_WORK.jewelsUnit], source: 'real' },
  { cat: 'commercial',  Art: ArtRetail,     photos: [REAL_WORK.school1, REAL_WORK.school2, REAL_WORK.school3], source: 'real' },
  { cat: 'commercial',  Art: ArtRetail,     photos: [REAL_WORK.resort1, REAL_WORK.resort2, REAL_WORK.resort3, REAL_WORK.resort4, REAL_WORK.resort5, REAL_WORK.resort6], source: 'real' },
];

export const FILTER_KEYS: FilterKey[] = [
  'all', 'industrial', 'residential', 'commercial', 'renovation',
];

export const PEOPLE_META: PersonMeta[] = [
  {
    photo: '/images/team/vipulbhai_CEO.jpeg',
    initials: 'VJ',
    roleShort: 'CEO',
    wa: CONFIG.whatsapp, // TODO: swap for a direct number if he wants one
  },
  {
    // TODO: REPLACE THIS PHOTO. The supplied image is an AI-generated stock
    // portrait, not Gordhanbhai Dobariya. Shoot a real photo in the same
    // framing as the CEO shot (head and chest, 4:5) and swap it in here.
    photo: '/images/team/gordhanbhai_COO.png',
    initials: 'GD',
    roleShort: 'COO',
    wa: CONFIG.whatsapp,
  },
];
