import { LANGS, T } from '../utils/translations';
import type { Lang } from '../types';

export interface LangSwitchProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

/** EN / ગુ / हि segmented control. Selection is in-session React state only. */
export function LangSwitch({ lang, setLang }: LangSwitchProps) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((c) => (
        <button key={c} className={lang === c ? "on" : ""} aria-pressed={lang === c}
          onClick={() => setLang(c)}>
          {T[c].label}
        </button>
      ))}
    </div>
  );
}
