import { Art } from './frame';
import { Box, Car, FaceZ, Ground, RibsZ, Shade, Tree } from './primitives';
import { MAT, poly, pt } from './iso';

/** Commercial - showroom shell, canopy, signage, parking deck. */
export function ArtRetail() {
  return (
    <Art dx={34} dy={12}>
      <Ground />
      <Shade x={-6.2} z={-2.2} w={10.6} d={6} />
      <Box x={-6} y={0} z={-2} w={10} h={2.3} d={5} {...MAT.concD} />
      <FaceZ x0={-6} x1={4} y0={0.25} y1={1.6} z={3} fill="#27547C" />
      <RibsZ x0={-6} x1={4} y0={0.25} y1={1.6} z={3} step={0.8} stroke="#F4F1EA" o={0.18} />
      <FaceZ x0={-6} x1={4} y0={1.72} y1={1.95} z={3} fill="#E8590C" />
      <Box x={-6.3} y={1.95} z={3} w={10.6} h={0.16} d={1} {...MAT.steel} />
      <Box x={-6.3} y={2.11} z={3.9} w={10.6} h={0.14} d={0.12} {...MAT.yellow} />
      {[-1.4, 2.4].map((x) => (
        <Box key={x} x={x} y={2.3} z={0.45} w={0.14} h={0.5} d={0.14} {...MAT.steel} />
      ))}
      <Box x={-1.7} y={2.8} z={0.38} w={4.6} h={0.85} d={0.32} {...MAT.orange} />
      <Box x={-1.7} y={2.72} z={0.38} w={4.6} h={0.12} d={0.32} {...MAT.yellow} />
      {[-5.2, -3.9, -2.6].map((x) => (
        <Box key={`ac${x}`} x={x} y={2.3} z={-1.2} w={1} h={0.34} d={1.1} {...MAT.steel} />
      ))}
      <polygon points={poly([-6, 0.02, 4.2], [4.2, 0.02, 4.2], [4.2, 0.02, 7.4], [-6, 0.02, 7.4])}
        fill="#26313A" />
      {[-4.4, -2.2, 0, 2.2].map((x) => {
        const a = pt(x, 0.03, 4.5), b = pt(x, 0.03, 7);
        return <line key={x} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#FFC107" strokeOpacity=".4" strokeWidth="2" />;
      })}
      <Car x={-4.2} z={5.2} />
      <Car x={-2} z={5.3} body={MAT.steel} />
      <Car x={0.3} z={5.2} body={MAT.orange} />
      <Tree x={-7.2} z={4.6} />
    </Art>
  );
}
