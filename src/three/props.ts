import * as THREE from 'three';
import { box } from './materials';
import type { AnimEntry, SiteMaterials } from './materials';

/** Pallets, pipe stock and a site container. Pallets land as part of the build-in. */
export function buildClutter(world: THREE.Group, M: SiteMaterials, anim: AnimEntry[]): void {
  /* ---- site clutter ---- */
  const pallet = (x: number, z: number, mat: THREE.Material, n: number) => {
    const g = new THREE.Group();
    for (let i = 0; i < n; i++) g.add(box(1.7, 0.34, 1.2, mat, [0, 0.2 + i * 0.36, 0]));
    g.position.set(x, 0, z);
    g.rotation.y = Math.random() * 0.7;
    world.add(g);
    anim.push({ o: g, k: "drop", t0: 2.7, dur: 0.5, y1: 0, y0: 2.4 });
  };
  pallet(6.6, 7.6, M.orange, 3);
  pallet(3.6, 8.8, M.concL, 2);
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 4.4, 12), M.steel);
    p.rotation.z = Math.PI / 2;
    p.position.set(-9.6, 0.28 + (i > 2 ? 0.48 : 0), 5.2 + (i % 3) * 0.56 + (i > 2 ? 0.28 : 0));
    world.add(p);
  }
  const cont = box(5.4, 2.3, 2.4, M.navy, [-9.8, 1.15, -6.6]);
  cont.rotation.y = 0.24; world.add(cont);
  const contTop = box(5.4, 0.14, 2.4, M.yellow, [-9.8, 2.36, -6.6]);
  contTop.rotation.y = 0.24; world.add(contTop);
}

/** Slow-drifting dust motes. Returns the geometry so the loop can advance them. */
export function buildDust(world: THREE.Group): THREE.BufferGeometry {
  /* ---- dust ---- */
  const COUNT = window.innerWidth < 760 ? 120 : 240;
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 66;
    pos[i * 3 + 1] = Math.random() * 22;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 66;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  world.add(new THREE.Points(pg, new THREE.PointsMaterial({
    color: 0xf4f1ea, size: 0.09, transparent: true, opacity: 0.38,
    sizeAttenuation: true, depthWrite: false,
  })));
  return pg;
}
