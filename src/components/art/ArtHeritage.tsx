import { Art } from './frame';
import { BandsZ, Box, FaceX, FaceZ, Gable, Ground, Shade } from './primitives';
import { MAT, poly, pt } from './iso';

/** Renovation - 60-year-old house under scaffold, structural repair. */
/* --- 6. RENOVATION — 60-year-old house under scaffold, structural repair -- */
export function ArtHeritage() {
  const posts = [-2, -0.9, 0.2, 1.3, 2.4];
  return (
    <Art dx={-38} dy={10}>
      <Ground />
      <Shade x={-4.3} z={-2.3} w={9} d={5.6} />
      <Box x={-4} y={0} z={-2} w={5} h={3} d={4.4} {...MAT.concD} />
      <BandsZ x0={-4} x1={1} y0={1.55} y1={1.75} z={2.4} step={1} o={0.22} />
      {[-3.5, -2.2, -0.9].map((x) => (
        <g key={x}>
          <FaceZ x0={x} x1={x + 0.85} y0={0.45} y1={1.35} z={2.4} fill="#18395A" />
          <polygon points={poly([x, 1.35, 2.4], [x + 0.85, 1.35, 2.4], [x + 0.42, 1.62, 2.4])}
            fill="#8C8477" />
          <FaceZ x0={x} x1={x + 0.85} y0={1.95} y1={2.7} z={2.4} fill="#18395A" />
        </g>
      ))}
      <Box x={-4.2} y={2.82} z={-2.2} w={5.4} h={0.22} d={4.8} {...MAT.conc} />
      <Gable x={-4.35} y={3.04} z={-2.35} w={5.7} d={5.1} rise={1.3} {...MAT.tile} />
      {/* scaffold: posts, ledgers, braces, boards, safety mesh */}
      <g>
        {posts.map((z) => <Box key={z} x={1.35} y={0} z={z} w={0.11} h={4.1} d={0.11} {...MAT.yellow} />)}
        {[1.25, 2.5, 3.75].map((y) => (
          <Box key={y} x={1.35} y={y} z={-2} w={0.09} h={0.09} d={4.5} {...MAT.yellow} />
        ))}
        {[1.25, 2.5].map((y) => (
          <Box key={`b${y}`} x={1.3} y={y} z={-2} w={0.2} h={0.08} d={4.5} {...MAT.panel} o={0.9} />
        ))}
        <FaceX z0={-2} z1={2.5} y0={0} y1={4.1} x={1.55} fill="#F4F1EA" o={0.09} />
        {posts.map((z) => {
          const a = pt(1.4, 0, z), b = pt(1.4, 1.25, z + 1.1);
          return <line key={`x${z}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#D29A00" strokeOpacity=".8" strokeWidth="2" />;
        })}
      </g>
      {[0, 1, 2].map((i) => (
        <Box key={i} x={-6.4} y={0.05 + i * 0.3} z={3.2} w={1.5} h={0.28} d={1.1} {...MAT.orange} />
      ))}
      {[0, 1].map((i) => (
        <Box key={`c${i}`} x={-1.7} y={0.05 + i * 0.26} z={4.4} w={1.5} h={0.24} d={1.05} {...MAT.panel} />
      ))}
    </Art>
  );
}
