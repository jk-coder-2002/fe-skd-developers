export interface LogoProps {
  size?: number;
}

/**
 * Isometric massing - a smaller block stepped back on a larger one - inside a
 * chamfered steel plate, with a caution-stripe notch in the corner. Reads as
 * "property development" at 20px and stays crisp at any size.
 */
/* ==========================================================================
   4. LOGO
   Isometric massing (a smaller block stepped back on a larger one) inside a
   chamfered steel plate, with a caution-stripe notch in the corner. Reads as
   "property development" at 20px and stays crisp at any size.
   ========================================================================== */
export function Logo({ size = 40 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {/* chamfered plate */}
      <path d="M0 0 H32 L48 16 V48 H0 Z" fill="var(--orange)" />
      {/* caution notch */}
      <path d="M0 39 L9 48 H0 Z" fill="var(--yellow)" />
      {/* base block */}
      <path d="M24 22.5 L39 30 L24 37.5 L9 30 Z" fill="#F7F4EE" />
      <path d="M9 30 L24 37.5 L24 46 L9 38.5 Z" fill="#22292F" fillOpacity=".93" />
      <path d="M39 30 L24 37.5 L24 46 L39 38.5 Z" fill="#22292F" fillOpacity=".62" />
      {/* upper block, stepped back */}
      <path d="M26 18 L33 21.5 L26 25 L19 21.5 Z" fill="#FFFFFF" />
      <path d="M19 21.5 L26 25 L26 32 L19 28.5 Z" fill="#22292F" fillOpacity=".93" />
      <path d="M33 21.5 L26 25 L26 32 L33 28.5 Z" fill="#22292F" fillOpacity=".62" />
    </svg>
  );
}
