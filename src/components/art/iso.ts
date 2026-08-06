/**
 * Isometric drawing kit for the Previous Work illustrations.
 *
 * True 2:1 isometric. One unit along +x goes right-and-down, +z goes
 * left-and-down, +y goes straight up. Larger (x + z) means nearer the viewer, so
 * compositions are drawn back-to-front in that order.
 *
 * Shading is fixed: top face lightest, right face mid, left face darkest — the
 * same convention as the <Logo /> mark, so everything reads as one family.
 */

export const U = 30;
export const OX = 500;
export const OY = 336;

export type Point3 = [x: number, y: number, z: number];

/** Projects a world point to screen space. */
export const pt = (x: number, y: number, z: number): [number, number] => [
  OX + (x - z) * U,
  OY + (x + z) * (U / 2) - y * U,
];

/** A single "x,y" pair for an SVG points attribute. */
export const ip = (x: number, y: number, z: number): string => pt(x, y, z).join(',');

/** Joins world points into an SVG polygon points attribute. */
export const poly = (...c: Point3[]): string =>
  c.map(([x, y, z]) => ip(x, y, z)).join(' ');

export interface Material {
  top: string;
  right: string;
  left: string;
}

export const MAT: Record<
  'panel' | 'conc' | 'concD' | 'steel' | 'dark' | 'glass' | 'orange' | 'yellow' | 'tile' | 'leaf',
  Material
> = {
  panel:  { top: '#F2EFE7', right: '#D6D0C3', left: '#B4AD9E' }, // sheet cladding
  conc:   { top: '#E7E2D7', right: '#C7C0B2', left: '#A59D8F' }, // fresh concrete
  concD:  { top: '#CDC6B8', right: '#ABA395', left: '#898276' }, // weathered concrete
  steel:  { top: '#505C67', right: '#39434D', left: '#262E36' },
  dark:   { top: '#39424B', right: '#282F36', left: '#1A2027' },
  glass:  { top: '#3C6E98', right: '#27547C', left: '#18395A' },
  orange: { top: '#F5771F', right: '#E8590C', left: '#B04507' },
  yellow: { top: '#FFD456', right: '#FFC107', left: '#D29A00' },
  tile:   { top: '#C4623A', right: '#A44C27', left: '#7C351A' }, // clay roof
  leaf:   { top: '#5C7C64', right: '#44614B', left: '#2F4636' },
};
