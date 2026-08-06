import { Art } from './frame';
import { Box, Car, FaceZ, Gable, Ground, Shade, Tree } from './primitives';
import { MAT, poly } from './iso';

/** Residential - G+1 bungalow row, compound wall and gate. */
export function ArtBungalows() {
  const unit = (x: number) => (
    <g key={x}>
      <Box x={x} y={0} z={-1} w={3.8} h={2.4} d={3.8} {...MAT.conc} />
      <FaceZ x0={x + 0.4} x1={x + 1.5} y0={0.5} y1={1.5} z={2.8} fill="#3C6E98" />
      <FaceZ x0={x + 2.1} x1={x + 3.3} y0={0.5} y1={1.5} z={2.8} fill="#3C6E98" />
      <FaceZ x0={x + 0.4} x1={x + 1.5} y0={1.75} y1={2.2} z={2.8} fill="#27547C" />
      <FaceZ x0={x + 2.1} x1={x + 3.3} y0={1.75} y1={2.2} z={2.8} fill="#27547C" />
      <Gable x={x - 0.25} y={2.4} z={-1.25} w={4.3} d={4.3} rise={1.15} {...MAT.tile} />
      <Box x={x + 1.2} y={0} z={2.8} w={1.3} h={0.12} d={0.9} {...MAT.concD} />
      <Box x={x + 1.15} y={1.05} z={2.8} w={1.4} h={0.14} d={1} {...MAT.orange} />
    </g>
  );
  return (
    <Art dy={6}>
      <Ground />
      <Shade x={-5.6} z={-1.5} w={11.2} d={5.6} />
      <Box x={-6.6} y={0} z={-2.4} w={0.22} h={0.62} d={8.4} {...MAT.concD} />
      {[-5.4, 1.4].map(unit)}
      <polygon points={poly([-1.2, 0.02, 3], [1.2, 0.02, 3], [1.2, 0.02, 6.4], [-1.2, 0.02, 6.4])}
        fill="#2C3A44" />
      <Box x={-6.6} y={0} z={6} w={5.4} h={0.62} d={0.22} {...MAT.concD} />
      <Box x={1.2} y={0} z={6} w={5.4} h={0.62} d={0.22} {...MAT.concD} />
      <Box x={-1.2} y={0} z={6.02} w={2.4} h={0.9} d={0.18} {...MAT.yellow} />
      <Box x={6.4} y={0} z={2.6} w={0.22} h={0.62} d={3.6} {...MAT.concD} />
      <Tree x={-4.6} z={4.4} />
      <Tree x={-0.2} z={4.6} />
      <Tree x={4.4} z={4.3} />
      <Car x={2.2} z={4.2} />
    </Art>
  );
}
