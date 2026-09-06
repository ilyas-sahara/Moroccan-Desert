import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LANGS, isLocale, localePrefix, useLocale, type Locale } from '@/i18n';

export default function LanguageSwitcher({ solid = true }: { solid?: boolean }) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function navigateTo(lang: Locale): void {
    const { origin, pathname, search, hash } = window.location;
    const seg = (pathname.split('/')[1] ?? '').toLowerCase();
    const stripped = isLocale(seg)
      ? pathname.replace(/^\/(?:en|fr|de|es|it)(?=\/|$)/, '') || '/'
      : pathname;
    let target = origin + localePrefix(lang) + stripped + search + hash;
    if (target === origin) target = `${origin}/`;
    window.location.assign(target);
  }

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const current = LANGS.find((lang) => lang.code === locale) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('lang.switchLabel')}
        aria-expanded={open}
        className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
          solid
            ? 'border-sand-300 text-sand-700 hover:bg-sand-100'
            : 'border-white/50 text-white hover:bg-white/10'
        }`}
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span>{current.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 w-44 origin-top-right overflow-hidden rounded-2xl border border-sand-200/80 bg-white p-1.5 shadow-xl shadow-ink-950/15 transition-all duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {LANGS.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              navigateTo(lang.code);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
              lang.code === locale ? 'bg-sand-100 text-sand-800' : 'text-ink-700 hover:bg-sand-50'
            }`}
          >
            <span className="font-medium">{lang.label}</span>
            <span
              className={`text-[11px] uppercase tracking-wider ${
                lang.code === locale ? 'text-sand-700' : 'text-sand-500'
              }`}
            >
              {lang.short}
            </span>
            {lang.code === locale && <Check className="h-4 w-4 text-sand-700" strokeWidth={2} />}
          </button>
        ))}
      </div>
    </div>
  );
}
