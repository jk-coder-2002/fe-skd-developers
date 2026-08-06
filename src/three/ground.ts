import * as THREE from 'three';

/** Dark pad plus two blueprint grids. Fog eats the far edges, so no hard border. */
export function buildGround(world: THREE.Group): void {
  /* ground: dark pad + two blueprint grids, no hard edges (fog eats them) */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(260, 260),
    new THREE.MeshStandardMaterial({ color: 0x181d22, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  world.add(ground);

  const gFine = new THREE.GridHelper(220, 110, 0x2c4055, 0x2c4055);
  gFine.material.transparent = true; gFine.material.opacity = 0.24;
  gFine.position.y = 0.01; world.add(gFine);
  const gMaj = new THREE.GridHelper(220, 22, 0xffc107, 0xffc107);
  gMaj.material.transparent = true; gMaj.material.opacity = 0.055;
  gMaj.position.y = 0.02; world.add(gMaj);
}
