import * as THREE from 'three';

export function createCamera(): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(38, 1, 0.1, 400);
}

/** Layout mode, derived from the CSS breakpoint rather than canvas aspect. */
export interface Viewport {
  aspect: number;
  /** True at >= 900px, where the copy sits beside the art. */
  side: boolean;
  /** True at >= 1200px, where the copy column is wide enough for a full push. */
  wide: boolean;
}

export function fovFor(v: Viewport): number {
  return v.side ? (v.aspect > 2.1 ? 36 : 39) : v.aspect < 1 ? 46 : 42;
}

export interface CameraState extends Viewport {
  /** Seconds since the scene mounted. */
  t: number;
  /** Eased 0..1 entrance progress. */
  intro: number;
  /** Smoothed pointer offset, -1..1 on each axis. */
  px: number;
  py: number;
}

/**
 * Three framings:
 *   < 900px  — copy sits BELOW the art, so keep the site centred
 *   900-1199 — copy beside the art but the column is narrow: push gently
 *   >= 1200  — full push, the model lives in the right half of the frame
 */
export function updateCamera(camera: THREE.PerspectiveCamera, s: CameraState): void {
  const R = (s.side ? (s.aspect > 2.1 ? 42 : 45) : 52) + (1 - s.intro) * 15;
  const camY = (s.side ? 16.5 : 20) + (1 - s.intro) * 9 - s.py * 1.6;
  const tX = s.side ? (s.wide ? -11 : -6.5) : 1.5;
  const tY = s.side ? 6.5 : 8;
  const a = 0.5 + Math.sin(s.t * 0.05) * 0.13 + s.px * 0.1;
  camera.position.set(Math.sin(a) * R, camY, Math.cos(a) * R);
  camera.lookAt(tX, tY, 0);
}
