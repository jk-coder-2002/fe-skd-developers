import { Art } from './frame';
import { BandsZ, Box, FaceZ, Ground, RibsZ, Shade } from './primitives';
import { MAT } from './iso';

/** Industrial - insulated cold store, dock platform, roof plant. */
export function ArtColdStore() {
  return (
    <Art dx={32} dy={14}>
      <Ground />
      <Shade x={-5.3} z={-3.3} w={10.6} d={8} />
      <Box x={-5} y={0} z={-3} w={8} h={3.2} d={6} {...MAT.panel} />
      <BandsZ x0={-5} x1={3} y0={0.4} y1={3.2} z={3} step={0.4} o={0.09} />
      <BandsZ x0={-5} x1={3} y0={0.4} y1={3.2} z={-3} step={0.4} o={0.09} />
      <Box x={-5.15} y={3.2} z={-3.15} w={8.3} h={0.2} d={6.3} {...MAT.concD} />
      {[-4, -1.7, 0.6].map((x) => (
        <g key={x}>
          <Box x={x} y={3.4} z={-0.9} w={1.7} h={0.55} d={1.8} {...MAT.steel} />
          <RibsZ x0={x} x1={x + 1.7} y0={3.4} y1={3.95} z={0.9} step={0.2} stroke="#FFC107" o={0.3} />
        </g>
      ))}
      <Box x={-5} y={0} z={3} w={8} h={0.9} d={1.3} {...MAT.concD} />
      <Box x={-5} y={0.9} z={4.28} w={8} h={0.14} d={0.06} {...MAT.yellow} />
      <FaceZ x0={-4.5} x1={-3} y0={0.9} y1={2.5} z={3} fill="#141A20" />
      <FaceZ x0={-2.3} x1={-0.8} y0={0.9} y1={2.5} z={3} fill="#141A20" />
      <FaceZ x0={-0.1} x1={1.4} y0={0.9} y1={2.5} z={3} fill="#E8590C" />
      <RibsZ x0={-0.1} x1={1.4} y0={0.9} y1={2.5} z={3} step={0.18} o={0.2} />
      <Box x={-4.5} y={0.9} z={4.3} w={1.5} h={1.5} d={2.4} {...MAT.panel} />
      <Box x={-4.4} y={0.55} z={6.7} w={1.3} h={1.5} d={1.1} {...MAT.orange} />
      <FaceZ x0={-4.25} x1={-3.25} y0={1.4} y1={1.9} z={7.8} fill="#18395A" />
      <Box x={3} y={0} z={0} w={2.1} h={2.1} d={2.6} {...MAT.conc} />
      <FaceZ x0={3.25} x1={4.85} y0={1.1} y1={1.75} z={2.6} fill="#3C6E98" />
      <Box x={2.9} y={2.1} z={-0.1} w={2.3} h={0.16} d={2.8} {...MAT.concD} />
    </Art>
  );
}
