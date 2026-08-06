import { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { TapeMarquee } from './components/TapeMarquee';
import { StickyActions } from './components/StickyActions';
import { useScrollSpy } from './hooks/useScrollSpy';
import { NAV_ITEMS } from './utils/meta';
import { T } from './utils/translations';
import type { Lang, SectionId } from './types';

const SECTION_IDS: SectionId[] = NAV_ITEMS.map((n) => n.id);

export default function App() {
  const [lang, setLang] = useState<Lang>('en'); // default English, in-session only
  const active = useScrollSpy(SECTION_IDS, 'home');
  const t = T[lang];

  return (
    <div className="jd" lang={lang}>
      <Navbar lang={lang} setLang={setLang} t={t} active={active} />
      <main>
        <Hero t={t} />
        <TapeMarquee items={t.marquee} />
        <Services t={t} />
        <About t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>
      <div className="pad-bottom" />
      <StickyActions t={t} />
    </div>
  );
}
