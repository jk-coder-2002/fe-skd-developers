import * as THREE from 'three';

/**
 * Warm key, cool fill, and an orange kick bouncing off the site floor.
 *
 * NOTE ON THE KICK LIGHT: three r155+ interprets PointLight intensity in candela
 * with physical falloff, which would render the original value far dimmer than
 * the artifact version it was authored against. Setting `decay = 0` removes the
 * distance falloff so the intensity maps directly again, keeping the look
 * identical and, more importantly, stable across future three releases.
 * Hemisphere and directional lights were unaffected by that change, so their
 * intensities are untouched.
 */
export function createLights(scene: THREE.Scene): void {
  scene.add(new THREE.HemisphereLight(0xb9cfe6, 0x24201b, 0.5));

  const key = new THREE.DirectionalLight(0xffe0b8, 1.05);
  key.position.set(22, 30, 16);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x4a7bad, 0.5);
  fill.position.set(-20, 13, -18);
  scene.add(fill);

  const kick = new THREE.PointLight(0xe8590c, 0.75, 38);
  kick.decay = 0;
  kick.position.set(-5, 3, 9);
  scene.add(kick);
}
