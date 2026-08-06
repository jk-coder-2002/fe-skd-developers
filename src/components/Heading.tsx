import { Kicker } from './Kicker';
import { Reveal } from './Reveal';
import type { CSSVars } from '../types';

export interface HeadingProps {
  /** Outlined word sitting behind the heading. */
  ghost: string;
  kicker: string;
  title: string;
  dark?: boolean;
}

/** Section heading with the outlined ghost word behind it. */
export function Heading({ ghost, kicker, title, dark }: HeadingProps) {
  return (
    <div className="hd">
      <span className={`ghost ${dark ? "ghost-d" : ""}`} aria-hidden="true">{ghost}</span>
      <Reveal>
        <div className="up"><Kicker dark={dark}>{kicker}</Kicker></div>
        <h2 className="dsp d2 mask" style={{ marginTop: 14, ['--d']: '90ms' } as CSSVars}><span>{title}</span></h2>
      </Reveal>
    </div>
  );
}
