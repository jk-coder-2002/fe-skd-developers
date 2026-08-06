export interface TapeMarqueeProps {
  items: string[];
}

/** Caution-tape marquee stretched across the seam below the hero. */
export function TapeMarquee({ items }: TapeMarqueeProps) {
  const strip = <div>{items.map((x, i) => <span className="tape-item" key={i}>{x}<b /></span>)}</div>;
  return (
    <div className="tape-wrap" aria-hidden="true">
      <div className="tape"><div className="tape-track">{strip}{strip}</div></div>
    </div>
  );
}
