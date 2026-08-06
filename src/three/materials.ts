import * as THREE from 'three';

export interface SiteMaterials {
  steel: THREE.MeshStandardMaterial;
  dark: THREE.MeshStandardMaterial;
  conc: THREE.MeshStandardMaterial;
  concL: THREE.MeshStandardMaterial;
  orange: THREE.MeshStandardMaterial;
  yellow: THREE.MeshStandardMaterial;
  navy: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
}

/** Palette-locked materials for the hero site. Created once per scene. */
export function createMaterials(): SiteMaterials {
  return {
    steel: new THREE.MeshStandardMaterial({ color: 0x38414a, roughness: 0.5, metalness: 0.6 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x1b2126, roughness: 0.7, metalness: 0.35 }),
    conc: new THREE.MeshStandardMaterial({ color: 0xc9c2b4, roughness: 0.94, metalness: 0.02 }),
    concL: new THREE.MeshStandardMaterial({ color: 0xded8cb, roughness: 0.9, metalness: 0.02 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xe8590c, roughness: 0.42, metalness: 0.28 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xffc107, roughness: 0.38, metalness: 0.3 }),
    navy: new THREE.MeshStandardMaterial({ color: 0x1b3a57, roughness: 0.34, metalness: 0.4 }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x2b4d6c, roughness: 0.12, metalness: 0.7, transparent: true, opacity: 0.6,
    }),
  };
}

/**
 * Box helper. `pivot: 'base'` shifts the geometry so the mesh grows upward from
 * its own footing, which is what the build-in animation scales.
 */
export function box(
  w: number, h: number, d: number,
  mat: THREE.Material,
  pos?: [number, number, number],
  pivot?: 'base',
): THREE.Mesh {
  const g = new THREE.BoxGeometry(w, h, d);
  if (pivot === 'base') g.translate(0, h / 2, 0);
  const m = new THREE.Mesh(g, mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  return m;
}

/** One entry on the assemble-on-load timeline. */
export interface AnimEntry {
  o: THREE.Object3D;
  k: 'grow' | 'drop';
  t0: number;
  dur: number;
  y0?: number;
  y1?: number;
}
