# SKD Developers — construction-site

Single-page marketing site for **SKD Developers**, Surat, Gujarat.
React 19 + TypeScript + Vite. No backend, no database, no auth.

Converted from a single `.jsx` file with the UI, animations, styles, Three.js
scene, responsive behaviour and copy preserved exactly — see
[Fidelity](#fidelity) for how that was verified.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b` then `vite build` → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint (flat config, typescript-eslint) |
| `npm run typecheck` | Types only, no emit |

Deploys to Vercel with no extra configuration: import the repo and it picks up
`vercel.json` (framework `vite`, output `dist`).

---

## What the site is

Five sections on one page, plus a caution-tape marquee at the hero seam and a
sticky call/WhatsApp bar. Three languages — English, Gujarati, Hindi — switched
in-session from the nav.

- **Hero** — a WebGL construction site: a five-storey frame assembles itself on
  load while a tower crane slews and hoists steel. Falls back to a hand-built SVG
  scene when WebGL is unavailable or the visitor prefers reduced motion.
- **Services** — six cards with trade-code tags and pointer tilt.
- **About** — company story, engraved seal, and the CEO / COO feature band.
- **Our Work** — category filter over photo galleries and bespoke isometric
  illustrations.
- **Contact** — channels, an enquiry composer that opens WhatsApp or the mail
  app, and the footer.

---

## Structure

```
public/
  favicon.ico  favicon.svg  apple-touch-icon.png  robots.txt
  images/team/     leadership portraits (560×700, 4:5)
  images/work/     project photos (1400×700, 2:1)

src/
  components/      shared UI: Logo, Reveal, Heading, Counter, Tilt, Field,
                   LangSwitch, LeaderCard, ProjectMedia, Stamp, MapArt, …
  components/art/  isometric illustration kit + the six project scenes
  layout/          Navbar, Footer
  sections/        Hero, Services, About, Team, Projects, Contact
  three/           Scene, Camera, Lights, materials, ground, building, crane, props
  hooks/           useInView, useScrollSpy, useScrollProgress
  utils/           config, translations, meta, motion
  types/           every shared interface
  styles/          variables.css (tokens), globals.css (everything else)
```

Two placements are deliberate and load-bearing:

- **`sections/Team.tsx` renders inside `sections/About.tsx`**, not as its own
  `<section>`. The brief for this site is exactly five sections; giving the
  leadership band its own section element would add a sixth and change the nav
  anchors. The file is separate, the markup is not.
- **`layout/Footer.tsx` renders inside `sections/Contact.tsx`** for the same
  reason.

---

## Editing content

Almost everything lives in two files.

**`src/utils/config.ts`** — company name, phone, WhatsApp number, email,
address, stats. Every `TODO:` in there is a placeholder awaiting real data.

**`src/utils/translations.ts`** — all copy, in all three languages, typed against
the `Translation` interface. A missing key is a compile error rather than a blank
space on the page. `services.items` and `work.projects` must stay six long; they
are matched to the metadata in `src/utils/meta.ts` by array index.

### Swapping in real photos

`PROJECT_META[i].photos` is an array. One entry renders a still image; two or
more turn the card into an auto-crossfading gallery with clickable indicators.
Set it to `null` and the card falls back to `Art`, the isometric illustration
drawn for that project type.

```ts
{ cat: 'industrial', Art: ArtShed, photos: ['/images/work/shed-1.jpg', '/images/work/shed-2.jpg'] }
```

Leadership portraits are `PEOPLE_META[i].photo`. If an image fails to load, the
card falls back to an initials plate rather than breaking.

> **The images currently shipped are placeholders.** The project photos are
> AI-generated stock renders of buildings in the American Midwest — two show the
> Kansas City skyline — and the COO portrait is an AI-generated stock face, not
> Gordhanbhai Dobariya. Only the CEO portrait is real. All of them must be
> replaced before launch; presenting them as SKD's work would be
> misrepresentation. Both spots carry warning comments in the source.

---

## Styling

Plain CSS, no framework. Two files, both imported once from `main.tsx`:

- `styles/variables.css` — colour, spacing and typography tokens
- `styles/globals.css` — layout, components, animation, media queries

**Specificity rule.** Everything is scoped under `.jd`. The element reset is
`.jd button` (0-1-1), so every component class is written `.jd .thing` (0-2-0) to
outrank it. Adding a bare `.thing` rule will silently lose to the reset — this
exact bug once made every button on the page lose its background.

Breakpoints: 560 / 600 / 640 / 720 / 900 / 980 / 1100 / 1140 / 1200 / 1400 / 1560,
plus a landscape-phone query at `max-height: 560px`. The 900px line is the big
one — it flips the hero from stacked to side-by-side, swaps the mobile sheet for
nav links, and switches the Three.js camera framing.

---

## Three.js

`three/Scene.tsx` owns the renderer, the resize/visibility observers and the
render loop. Geometry is built by `ground.ts`, `building.ts`, `crane.ts` and
`props.ts`; `Camera.ts` and `Lights.ts` hold the framing and lighting.

Performance: pixel ratio is capped (2 on desktop, 1.5 on mobile), the dust
particle count halves on narrow screens, and rendering **pauses entirely** when
the hero scrolls out of view.

Camera framing follows the **CSS breakpoint, not the canvas aspect ratio**. A
portrait tablet gives the canvas a landscape-ish aspect while the copy still sits
below it, so keying off aspect alone pushed the model off to one side.

### Two deliberate changes for modern three

Both were required; neither alters the design.

1. `renderer.outputEncoding = THREE.sRGBEncoding` → `renderer.outputColorSpace =
   THREE.SRGBColorSpace`. The old API was removed in r162.
2. The orange kick light gets `decay = 0`. Since r155 three interprets
   `PointLight` intensity in candela with physical falloff, which would render
   the original value far dimmer than intended. Disabling decay maps intensity
   directly again, matching the original and staying stable across future
   releases. Hemisphere and directional lights were unaffected by that change, so
   their intensities are untouched.

---

## Fidelity

The conversion was verified, not assumed. Both the original single file and the
refactored app were rendered with `react-dom/server` and the output diffed:

```
*** RENDERED DOM IS BYTE-IDENTICAL ***
chars compared: 38458
```

The CSS was diffed the same way — 297 rules in, 297 rules out, identical after
whitespace normalisation.

One intentional difference: fonts moved from a CSS `@import` to `<link>` tags
with `preconnect` in `index.html`. Same families and weights, but it avoids a
render-blocking request chain.

`npm run build`, `npm run lint` and `npm run typecheck` all pass with zero errors
and zero warnings. `strict` is on, along with `noUnusedLocals`,
`noUnusedParameters` and `noImplicitOverride`. There are no `any` types.

---

## Phase 2

The site is built so the planned customer, labour, site, material and cash
management tooling can be bolted on without a redesign:

```ts
// src/utils/meta.ts
export const NAV_ITEMS: NavItem[] = [
  { id: 'home' }, …, { id: 'portal', external: true, href: '/portal' },
];
```

`NavItem` already carries `external` and `href`, and the nav layout reserves room
for the button.

---

## Accessibility & browser support

Keyboard focus rings are defined globally, the mobile sheet traps body scroll,
gallery indicators and icon-only buttons carry `aria-label`s, and every animation
is disabled under `prefers-reduced-motion` — including the Three.js scene, which
swaps to the static SVG.

Targets modern evergreen browsers (build target `es2022`). `100svh` is used with
a `100vh` fallback.
