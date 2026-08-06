import * as THREE from 'three';
import { box } from './materials';
import type { AnimEntry, SiteMaterials } from './materials';

/**
 * Five storeys on a 3x3 column grid. Columns grow up from the floor below, then a
 * slab drops onto them; the lower two floors are already glazed and walled while
 * the upper three stay as exposed steel with orange X-bracing. Returns the
 * assemble-on-load timeline entries for the render loop to drive.
 */
export function buildBuilding(world: THREE.Group, M: SiteMaterials): AnimEntry[] {
  const anim: AnimEntry[] = [];
  /* ---- the building: 5 storeys on a 3x3 column grid ---- */
  const FH = 2.25, FLOORS = 5, SPAN = 4.2;
  const BX = -2.2, BZ = 0.4;
  const slabW = SPAN * 2 + 1.1;
  const cols = [-SPAN, 0, SPAN];

  world.add(box(slabW + 1.6, 0.24, slabW + 1.6, M.dark, [BX, 0.12, BZ]));

  for (let f = 0; f < FLOORS; f++) {
    const y0 = f * FH + 0.24;
    const t0 = 0.25 + f * 0.42;

    cols.forEach((cx) => cols.forEach((cz) => {
      const c = box(0.3, FH, 0.3, f < 2 ? M.conc : M.steel, [BX + cx, y0, BZ + cz], 'base');
      c.scale.y = 0.001;
      world.add(c);
      anim.push({ o: c, k: "grow", t0, dur: 0.55 });
    }));

    if (f >= 2) {
      const by = y0 + FH - 0.18;
      [-SPAN, SPAN].forEach((cz) => world.add(box(SPAN * 2, 0.16, 0.18, M.steel, [BX, by, BZ + cz])));
      [-SPAN, SPAN].forEach((cx) => world.add(box(0.18, 0.16, SPAN * 2, M.steel, [BX + cx, by, BZ])));
      const brace = (sx: number) => {
        const len = Math.sqrt(SPAN * SPAN + FH * FH);
        const b = box(0.1, len, 0.1, M.orange, [BX + (SPAN / 2) * sx, y0 + FH / 2, BZ + SPAN]);
        b.rotation.z = sx * Math.atan2(SPAN, FH);
        return b;
      };
      world.add(brace(1)); world.add(brace(-1));
    }

    const slabY = y0 + FH;
    const partial = f === FLOORS - 1;
    const slab = box(partial ? slabW * 0.62 : slabW, 0.22, slabW, f < 2 ? M.concL : M.conc,
      [BX + (partial ? -slabW * 0.19 : 0), slabY, BZ]);
    world.add(slab);
    anim.push({ o: slab, k: "drop", t0: t0 + 0.4, dur: 0.6, y1: slabY, y0: slabY + 3.2 });

    if (f < 2) {
      const wy = y0 + FH / 2;
      world.add(box(SPAN * 2, FH - 0.5, 0.12, M.glass, [BX, wy, BZ - SPAN]));
      world.add(box(0.12, FH - 0.5, SPAN * 2, M.glass, [BX - SPAN, wy, BZ]));
      world.add(box(SPAN * 0.9, FH - 0.4, 0.14, M.concL, [BX + SPAN * 0.55, wy, BZ + SPAN]));
    }
  }

  for (let i = 0; i < 14; i++) {
    const r = box(0.05, 0.85, 0.05, M.orange, [
      BX + (Math.random() - 0.5) * slabW * 0.8,
      FLOORS * FH + 0.35,
      BZ + (Math.random() - 0.5) * slabW * 0.8,
    ], 'base');
    world.add(r);
    anim.push({ o: r, k: "grow", t0: 2.5 + i * 0.03, dur: 0.4 });
  }

  return anim;
}
