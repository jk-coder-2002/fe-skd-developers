import * as THREE from 'three';
import { box } from './materials';
import type { AnimEntry, SiteMaterials } from './materials';

/** The moving parts the render loop animates each frame. */
export interface Crane {
  /** Slewing assembly: everything above the mast turns. */
  top: THREE.Group;
  trolley: THREE.Mesh;
  cable: THREE.Mesh;
  load: THREE.Group;
}

/**
 * Tower crane: lattice mast, slewing jib with counterweight and A-frame ties, and
 * a trolley that travels the jib paying out a cable to a suspended steel bundle.
 */
export function buildCrane(world: THREE.Group, M: SiteMaterials, anim: AnimEntry[]): Crane {
  /* ---- tower crane ---- */
  const crane = new THREE.Group();
  crane.position.set(9.2, 0, -1.6);
  world.add(crane);

  const MAST = 15.4;
  crane.add(box(2.6, 0.34, 2.6, M.dark, [0, 0.17, 0]));
  [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]].forEach(([x, z]) => {
    const leg = box(0.15, MAST, 0.15, M.yellow, [x, 0.3, z], 'base');
    leg.scale.y = 0.001;
    crane.add(leg);
    anim.push({ o: leg, k: "grow", t0: 0.1, dur: 1.15 });
  });
  for (let y = 1.4; y < MAST; y += 1.3) {
    crane.add(box(1.25, 0.08, 0.08, M.yellow, [0, y, -0.55]));
    crane.add(box(1.25, 0.08, 0.08, M.yellow, [0, y, 0.55]));
    crane.add(box(0.08, 0.08, 1.25, M.yellow, [-0.55, y, 0]));
    crane.add(box(0.08, 0.08, 1.25, M.yellow, [0.55, y, 0]));
    const d1 = box(0.07, 1.75, 0.07, M.yellow, [0, y + 0.65, -0.55]); d1.rotation.z = 0.62;
    const d2 = box(0.07, 1.75, 0.07, M.yellow, [0, y + 0.65, 0.55]); d2.rotation.z = -0.62;
    crane.add(d1); crane.add(d2);
  }

  const top = new THREE.Group();
  top.position.y = MAST + 0.3;
  crane.add(top);
  top.add(box(1.5, 1.05, 1.35, M.steel, [0.7, 0.5, 0]));
  top.add(box(1.3, 0.5, 1.3, M.dark, [0, -0.1, 0]));

  const JIB = 15.5, CJ = 4.6;
  top.add(box(JIB + CJ, 0.2, 0.4, M.yellow, [-(JIB - CJ) / 2, 1.35, 0]));
  top.add(box(JIB + CJ, 0.16, 0.34, M.yellow, [-(JIB - CJ) / 2, 0.55, 0]));
  for (let x = -JIB + 0.6; x < CJ; x += 1.5) {
    const d = box(0.08, 1.05, 0.08, M.yellow, [x, 0.95, 0]);
    d.rotation.z = x % 3 < 1.5 ? 0.62 : -0.62;
    top.add(d);
  }
  top.add(box(1.5, 1.4, 1.9, M.dark, [CJ - 0.2, 1.0, 0]));
  top.add(box(0.16, 2.6, 0.16, M.yellow, [0, 1.4, 0], 'base'));
  const tie = (len: number, x: number, rot: number) => {
    const t = box(0.07, len, 0.07, M.steel, [x, 3.0, 0]);
    t.rotation.z = rot; return t;
  };
  top.add(tie(9.2, -4.4, 1.34));
  top.add(tie(4.2, 2.2, -1.22));

  const trolley = box(0.85, 0.3, 0.7, M.orange, [-7, 0.35, 0]);
  top.add(trolley);
  const cable = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1, 6),
    new THREE.MeshStandardMaterial({ color: 0xffc107, roughness: 0.5, metalness: 0.4 })
  );
  top.add(cable);
  const load = new THREE.Group();
  load.add(box(3.4, 0.22, 0.34, M.orange, [0, 0, -0.28]));
  load.add(box(3.4, 0.22, 0.34, M.orange, [0, 0, 0.28]));
  load.add(box(3.4, 0.2, 0.3, M.orange, [0, 0.24, 0]));
  load.add(box(0.5, 0.34, 0.5, M.dark, [0, 0.55, 0]));
  top.add(load);

  return { top, trolley, cable, load };
}
