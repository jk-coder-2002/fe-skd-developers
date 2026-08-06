import { CONFIG } from '../utils/config';

/** Engraved company seal - kept in Latin, the way a real stamp would be. */
/** Engraved company seal — kept in Latin, the way a real stamp would be. */
export function Stamp() {
  const around = `${CONFIG.brandFull} · ${CONFIG.city.toUpperCase()} · SINCE ${CONFIG.established} · ${CONFIG.state.toUpperCase()} · `;
  return (
    <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="skd-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="88" fill="none" stroke="#FFC107" strokeOpacity=".34" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#FFC107" strokeOpacity=".2" strokeWidth="1" />
      <g className="stamp-ring">
        <circle cx="100" cy="100" r="82" fill="none" stroke="#FFC107" strokeOpacity=".16"
          strokeWidth="6" strokeDasharray="2 7" />
        <text fill="#FFC107" fillOpacity=".7"
          style={{ fontSize: 12, letterSpacing: "2.6px", fontWeight: 600 }}>
          <textPath href="#skd-ring">{around}</textPath>
        </text>
      </g>
      {/* the mark, held upright while the ring turns */}
      <g transform="translate(76,76) scale(1)">
        <path d="M24 22.5 L39 30 L24 37.5 L9 30 Z" fill="#FFC107" fillOpacity=".85" />
        <path d="M9 30 L24 37.5 L24 44 L9 36.5 Z" fill="#FFC107" fillOpacity=".45" />
        <path d="M39 30 L24 37.5 L24 44 L39 36.5 Z" fill="#FFC107" fillOpacity=".3" />
        <path d="M26 18 L33 21.5 L26 25 L19 21.5 Z" fill="#FFC107" fillOpacity=".85" />
        <path d="M19 21.5 L26 25 L26 32 L19 28.5 Z" fill="#FFC107" fillOpacity=".45" />
        <path d="M33 21.5 L26 25 L26 32 L33 28.5 Z" fill="#FFC107" fillOpacity=".3" />
      </g>
    </svg>
  );
}
