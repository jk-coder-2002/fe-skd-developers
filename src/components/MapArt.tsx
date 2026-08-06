/** Abstract site-location artwork for the map card. No tiles, no API key. */
export function MapArt() {
  return (
    <svg className="mapart" viewBox="0 0 320 96" aria-hidden="true">
      <g stroke="rgba(244,241,234,.15)" strokeWidth="1" fill="none">
        {[16, 34, 52, 70, 88].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} />)}
        {[40, 90, 140, 190, 240, 290].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="96" />)}
      </g>
      <path d="M0 74 L92 58 L176 66 L248 40 L320 48" stroke="#FFC107" strokeOpacity=".4" strokeWidth="2" fill="none" />
      <path d="M120 96 L136 44 L188 22 L214 0" stroke="#E8590C" strokeOpacity=".45" strokeWidth="2" fill="none" />
      <circle cx="176" cy="52" r="20" fill="#E8590C" fillOpacity=".12" />
      <circle cx="176" cy="52" r="5" fill="#E8590C" />
      <circle cx="176" cy="52" r="11" fill="none" stroke="#E8590C" strokeOpacity=".5" />
    </svg>
  );
}
