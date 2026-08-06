import type { ReactNode } from 'react';

export interface KickerProps {
  children: ReactNode;
  /** Use the yellow variant on dark surfaces. */
  dark?: boolean;
}

/** Section eyebrow: a short yellow rule followed by a small caps label. */
export function Kicker({ children, dark }: KickerProps) {
  return <span className={`kick lbl ${dark ? "kick-d" : ""}`}><i />{children}</span>;
}
