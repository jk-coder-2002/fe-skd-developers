import { Art } from './frame';
import { BandsZ, Box, Car, FaceX, FaceZ, Ground, Shade, Tree } from './primitives';
import { MAT, poly } from './iso';

/** Residential - G+4 block on stilt parking, balcony stack. */
export function ArtApartments() {
  const F = [1.9, 3.15, 4.4, 5.65];
  return (
    <Art dx={-8} dy={34}>
      <Ground />
      <Shade x={-3.6} z={-3.6} w={7.2} d={7.2} />
      {/* podium + stilt parking */}
      <Box x={-3.5} y={0} z={-3.5} w={7} h={0.22} d={7} {...MAT.concD} />
      {[[-2.9, -2.9], [2.5, -2.9], [-2.9, 2.5], [2.5, 2.5], [-0.2, -0.2]].map(([cx, cz]) => (
        <Box key={`${cx}${cz}`} x={cx} y={0.22} z={cz} w={0.42} h={1.4} d={0.42} {...MAT.concD} />
      ))}
      <Box x={-3.2} y={1.62} z={-3.2} w={6.4} h={0.22} d={6.4} {...MAT.conc} />
      {/* body */}
      <Box x={-2.9} y={1.84} z={-2.9} w={5.8} h={5} d={5.8} {...MAT.conc} />
      <BandsZ x0={-2.9} x1={2.9} y0={3.1} y1={6.85} z={2.9} step={1.25} o={0.2} />
      {F.map((y) => (
        <g key={y}>
          <FaceZ x0={-2.5} x1={-0.55} y0={y - 0.9} y1={y - 0.2} z={2.9} fill="#27547C" />
          <FaceX z0={-2.5} z1={-0.55} y0={y - 0.9} y1={y - 0.2} x={2.9} fill="#3C6E98" />
          <FaceX z0={0.1} z1={2.2} y0={y - 0.9} y1={y - 0.2} x={2.9} fill="#3C6E98" />
          <Box x={0.1} y={y} z={2.9} w={2.4} h={0.14} d={0.62} {...MAT.conc} />
          <Box x={0.1} y={y + 0.14} z={3.46} w={2.4} h={0.36} d={0.07} {...MAT.yellow} />
        </g>
      ))}
      {/* parapet, tank, stair headroom */}
      <Box x={-3.1} y={6.84} z={-3.1} w={6.2} h={0.32} d={6.2} {...MAT.concD} />
      <Box x={-2.2} y={7.16} z={-2.2} w={1.9} h={1.05} d={1.9} {...MAT.conc} />
      <Box x={0.5} y={7.16} z={0.3} w={1.5} h={0.72} d={1.5} {...MAT.concD} />
      <Box x={0.65} y={7.91} z={0.45} w={1.2} h={0.13} d={1.2} {...MAT.yellow} />
      {/* forecourt */}
      <polygon points={poly([-3.4, 0.02, 3.6], [3.4, 0.02, 3.6], [3.4, 0.02, 6.4], [-3.4, 0.02, 6.4])}
        fill="#26313A" />
      <Car x={-3} z={4.5} />
      <Car x={-0.7} z={4.6} body={MAT.steel} />
      <Tree x={4.4} z={2.6} />
      <Tree x={-5} z={1.8} />
    </Art>
  );
}
