import { Art } from './frame';
import { Box, FaceZ, Gable, Ground, RibsZ, Shade } from './primitives';
import { MAT } from './iso';

/** Industrial - pre-engineered fabrication shed with office annex. */
export function ArtShed() {
  return (
    <Art dx={22} dy={20}>
      <Ground />
      <Shade x={-6.3} z={-3.3} w={12.6} d={7.6} />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={-7.4} y={0.1 + i * 0.36} z={4.2 + (i % 2) * 0.12} w={2.5} h={0.32} d={0.34} {...MAT.steel} />
      ))}
      <Box x={-6} y={0} z={-3} w={9} h={2.6} d={6} {...MAT.panel} />
      <RibsZ x0={-6} x1={3} y0={0} y1={2.6} z={3} step={0.5} />
      <Gable x={-6} y={2.6} z={-3} w={9} d={6} rise={1.35}
        top="#DCD6C8" right="#B6AFA0" left="#96907F" />
      <Box x={-6} y={3.9} z={-0.13} w={9} h={0.16} d={0.26} {...MAT.steel} />
      <FaceZ x0={-4.4} x1={-2.3} y0={0} y1={1.95} z={3} fill="#E8590C" />
      <RibsZ x0={-4.4} x1={-2.3} y0={0} y1={1.95} z={3} step={0.21} o={0.2} />
      <FaceZ x0={-4.4} x1={-2.3} y0={1.95} y1={2.12} z={3} fill="#FFC107" />
      <FaceZ x0={-1.5} x1={0.4} y0={1.15} y1={1.9} z={3} fill="#27547C" />
      <FaceZ x0={1} x1={2.6} y0={1.15} y1={1.9} z={3} fill="#27547C" />
      <FaceZ x0={-5.6} x1={-4.9} y0={2.05} y1={2.45} z={3} fill="#FFC107" o={0.85} />
      <Box x={3} y={0} z={-1.7} w={3} h={2.05} d={3.3} {...MAT.conc} />
      <FaceZ x0={3.25} x1={5.8} y0={1.05} y1={1.75} z={1.6} fill="#3C6E98" />
      <Box x={2.9} y={2.05} z={-1.8} w={3.2} h={0.18} d={3.5} {...MAT.concD} />
      <Box x={-2.6} y={0} z={4.5} w={3.3} h={0.2} d={1.4} {...MAT.dark} />
      <Box x={-2.5} y={0.2} z={4.55} w={3.1} h={1.05} d={1.3} {...MAT.panel} />
      <Box x={0.7} y={0.2} z={4.55} w={1.3} h={1.35} d={1.3} {...MAT.orange} />
      <FaceZ x0={0.85} x1={1.85} y0={0.85} y1={1.3} z={5.85} fill="#18395A" />
    </Art>
  );
}
