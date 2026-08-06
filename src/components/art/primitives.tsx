import type { FC, ReactNode } from 'react';
import { poly, pt, MAT } from './iso';
import type { Material } from './iso';

/* Geometry primitives shared by all six project illustrations. See iso.ts for
   the projection and the shading convention. */

export interface BoxProps extends Material {
  /** Low corner. */
  x?: number;
  y?: number;
  z?: number;
  /** Extent along +x, +y (up) and +z. */
  w?: number;
  h?: number;
  d?: number;
  /** Fill opacity. */
  o?: number;
}

export interface GableProps extends Material {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  rise: number;
}

export interface FaceZProps {
  x0: number; x1: number; y0: number; y1: number; z: number; fill: string; o?: number;
}

export interface FaceXProps {
  z0: number; z1: number; y0: number; y1: number; x: number; fill: string; o?: number;
}

export interface RibsProps {
  x0: number; x1: number; y0: number; y1: number; z: number;
  step?: number; stroke?: string; o?: number;
}

export interface ShadeProps { x: number; z: number; w: number; d: number; o?: number }
export interface SpotProps { x: number; z: number }
export interface CarProps extends SpotProps { body?: Material }
export interface ArtProps { children?: ReactNode; dx?: number; dy?: number }

/** Cuboid. (x,y,z) is the low corner; w along x, h up, d along z. */
export function Box({
  x = 0, y = 0, z = 0, w = 1, h = 1, d = 1, top, right, left, o = 1,
}: BoxProps) {
  const X = x + w, Y = y + h, Z = z + d;
  return (
    <g fillOpacity={o}>
      <polygon points={poly([x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z])} fill={top} />
      <polygon points={poly([X, Y, z], [X, Y, Z], [X, y, Z], [X, y, z])} fill={right} />
      <polygon points={poly([X, Y, Z], [x, Y, Z], [x, y, Z], [X, y, Z])} fill={left} />
    </g>
  );
}

/** Pitched roof, ridge running along x. */
export function Gable({ x, y, z, w, d, rise, top, right, left }: GableProps) {
  const X = x + w, Z = z + d, m = z + d / 2, R = y + rise;
  return (
    <g>
      <polygon points={poly([x, y, z], [X, y, z], [X, R, m], [x, R, m])} fill={right} />
      <polygon points={poly([x, y, Z], [X, y, Z], [X, R, m], [x, R, m])} fill={top} />
      <polygon points={poly([X, y, z], [X, R, m], [X, y, Z])} fill={left} />
    </g>
  );
}

/* flat panels painted onto a wall plane */
export const FaceZ: FC<FaceZProps> = ({ x0, x1, y0, y1, z, fill, o = 1 }) => (
  <polygon points={poly([x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z])} fill={fill} fillOpacity={o} />
);
export const FaceX: FC<FaceXProps> = ({ z0, z1, y0, y1, x, fill, o = 1 }) => (
  <polygon points={poly([x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0])} fill={fill} fillOpacity={o} />
);


export const RibsZ: FC<RibsProps> = ({
  x0, x1, y0, y1, z, step = 0.55, stroke = '#1A2027', o = 0.13,
}) => {
  const l: ReactNode[] = [];
  for (let x = x0 + step; x < x1 - 0.01; x += step) {
    const a = pt(x, y0, z), b = pt(x, y1, z);
    l.push(<line key={x} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />);
  }
  return <g stroke={stroke} strokeOpacity={o} strokeWidth="1.4">{l}</g>;
};
export const BandsZ: FC<RibsProps> = ({
  x0, x1, y0, y1, z, step = 1, stroke = '#1A2027', o = 0.16,
}) => {
  const l: ReactNode[] = [];
  for (let y = y0; y < y1 - 0.01; y += step) {
    const a = pt(x0, y, z), b = pt(x1, y, z);
    l.push(<line key={y} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />);
  }
  return <g stroke={stroke} strokeOpacity={o} strokeWidth="1.4">{l}</g>;
};


export const Ground: FC = () => (
  <g>
    <polygon points={poly([-8, 0, -8], [8, 0, -8], [8, 0, 8], [-8, 0, 8])} fill="#152230" />
    <polygon points={poly([-6.5, 0, -6.5], [6.5, 0, -6.5], [6.5, 0, 6.5], [-6.5, 0, 6.5])}
      fill="none" stroke="#F4F1EA" strokeOpacity=".055" strokeWidth="1.5" strokeDasharray="9 9" />
    <polygon points={poly([-8, 0, -8], [8, 0, -8], [8, 0, 8], [-8, 0, 8])}
      fill="none" stroke="#FFC107" strokeOpacity=".13" strokeWidth="2" />
  </g>
);
export const Shade: FC<ShadeProps> = ({ x, z, w, d, o = 0.32 }) => (
  <polygon points={poly([x, 0, z], [x + w, 0, z], [x + w, 0, z + d], [x, 0, z + d])}
    fill="#080D13" fillOpacity={o} />
);
export const Tree: FC<SpotProps> = ({ x, z }) => (
  <g>
    <Box x={x} y={0} z={z} w={0.16} h={0.5} d={0.16} {...MAT.steel} />
    <Box x={x - 0.35} y={0.5} z={z - 0.35} w={0.86} h={0.8} d={0.86} {...MAT.leaf} />
  </g>
);
export const Car: FC<CarProps> = ({ x, z, body = MAT.concD }) => (
  <g>
    <Box x={x} y={0.05} z={z} w={1.7} h={0.4} d={0.85} {...body} />
    <Box x={x + 0.35} y={0.45} z={z + 0.06} w={0.85} h={0.32} d={0.73} {...MAT.glass} />
  </g>
);

