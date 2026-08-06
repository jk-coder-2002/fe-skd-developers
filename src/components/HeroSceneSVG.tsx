/** Hero fallback for browsers without WebGL, and for reduced-motion visitors. */
/* ==========================================================================
   7. HERO SCENE B — SVG fallback (no WebGL / reduced motion)
   ========================================================================== */
export function HeroSceneSVG() {
  const LV = [320, 274, 228, 182, 136];
  const slab = (y: number) => `M170 ${y - 50} L270 ${y} L170 ${y + 50} L70 ${y} Z`;
  return (
    <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", padding: 20 }}>
      <svg viewBox="0 0 480 430" style={{ width: "100%", maxWidth: 540 }} role="img"
        aria-label="Isometric building frame under construction with a tower crane">
        <defs>
          <linearGradient id="skdS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity=".2" />
            <stop offset="100%" stopColor="#E8590C" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <path d="M190 236 L376 330 L190 424 L4 330 Z" fill="#1B3A57" fillOpacity=".35"
          stroke="#FFC107" strokeOpacity=".2" />
        {LV.map((y, i) => (
          <path key={y} d={slab(y)} fill={i < 2 ? "url(#skdS)" : "none"}
            stroke={i === 4 ? "#FFC107" : "#F4F1EA"} strokeOpacity={i === 4 ? ".8" : ".45"} strokeWidth="1.6" />
        ))}
        <g stroke="#F4F1EA" strokeOpacity=".4" strokeWidth="1.6" fill="none">
          <line x1="70" y1="320" x2="70" y2="136" /><line x1="270" y1="320" x2="270" y2="136" />
          <line x1="170" y1="370" x2="170" y2="186" /><line x1="170" y1="270" x2="170" y2="86" />
        </g>
        <g stroke="#E8590C" strokeOpacity=".65" strokeWidth="1.6">
          <line x1="270" y1="320" x2="170" y2="324" /><line x1="170" y1="370" x2="270" y2="274" />
          <line x1="270" y1="228" x2="170" y2="232" /><line x1="170" y1="278" x2="270" y2="182" />
        </g>
        <g stroke="#FFC107" strokeOpacity=".5" strokeWidth="1.5" fill="none">
          <line x1="378" y1="342" x2="378" y2="96" /><line x1="392" y1="342" x2="392" y2="96" />
          <line x1="176" y1="80" x2="452" y2="80" /><line x1="196" y1="94" x2="440" y2="94" />
        </g>
        <rect x="371" y="82" width="28" height="14" fill="#E8590C" />
        <rect x="428" y="76" width="22" height="20" fill="#22292F" stroke="#FFC107" strokeOpacity=".6" />
        <line x1="240" y1="94" x2="240" y2="206" stroke="#FFC107" strokeOpacity=".75" strokeWidth="1.4" />
        <rect x="216" y="206" width="48" height="9" fill="#E8590C" />
      </svg>
    </div>
  );
}
