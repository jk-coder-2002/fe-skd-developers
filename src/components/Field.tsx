import { useState } from 'react';
import type { ChangeEvent } from 'react';

export interface FieldProps {
  label: string;
  /** Placeholder, revealed only once the field has focus. */
  ph: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Render a textarea instead of an input. */
  area?: boolean;
  /** Use the telephone keypad on mobile. */
  tel?: boolean;
}

/** Floating-label field. */
export function Field({ label, ph, value, onChange, area, tel }: FieldProps) {
  const [foc, setFoc] = useState(false);
  const lifted = foc || String(value).length > 0;
  const shared = {
    value, onChange,
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    placeholder: foc ? ph : "",
    "aria-label": label,
  };
  return (
    <label className={`fl ${lifted ? "fl-on" : ""}`}>
      <span>{label}</span>
      {area ? <textarea {...shared} /> : <input {...shared} inputMode={tel ? "tel" : undefined} />}
    </label>
  );
}
