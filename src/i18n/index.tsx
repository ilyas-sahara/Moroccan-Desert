import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DICTS, loadLocaleDict } from './translations';
import type { Locale, TranslationKey } from './translations';

export type { Locale, TranslationKey } from './translations';

export const LANGS: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'en', label: 'English', short: 'EN' },
];

export const DEFAULT_LOCALE: Locale = 'fr';

const LOCALE_CODES: Locale[] = ['en', 'fr', 'de', 'es', 'it'];

export function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALE_CODES as string[]).includes(value);
}

export function localePrefix(code: Locale): string {
  return code === DEFAULT_LOCALE ? '' : `/${code}`;
}

export function localeFromPath(pathname: string): Locale | null {
  const seg = (pathname.split('/')[1] ?? '').toLowerCase();
  return isLocale(seg) ? seg : null;
}

const STORAGE_KEY = 'walk-the-sahara-locale';

type Vars = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Vars) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

function localeFromUrlOrQuery(): Locale | null {
  if (typeof window === 'undefined') return null;
  const fromPath = localeFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  try {
    const params = new URLSearchParams(window.location.search);
    return isLocale(params.get('lang')) ? (params.get('lang') as Locale) : null;
  } catch {
    return null;
  }
}

/**
 * The locale the app boots with, resolved exactly like LocaleProvider will
 * resolve it (url path -> ?lang= -> localStorage -> default). Called before
 * first render so the matching dictionary chunk can load first.
 */
export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const fromUrl = localeFromUrlOrQuery();
  if (fromUrl) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // ignore storage failures
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    const fromUrl = localeFromUrlOrQuery();
    if (fromUrl) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    // Make sure the dictionary chunk for a lazy locale is on its way.
    loadLocaleDict(next).catch(() => undefined);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private browsing, storage disabled)
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onUrlChange = () => {
      const fromUrl = localeFromUrlOrQuery();
      if (fromUrl) setLocaleState(fromUrl);
    };
    window.addEventListener('popstate', onUrlChange);
    return () => window.removeEventListener('popstate', onUrlChange);
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Vars) => {
      // The dictionary for a lazy-loaded locale is always present in practice
      // (main.tsx awaits it before render); this guard only matters if some
      // code path renders before boot finished, in which case en is closer
      // than a raw key.
      const dict = DICTS[locale] ?? DICTS.en ?? {};
      let template = dict[key];
      if (template === undefined) template = DICTS.en?.[key] ?? key;
      return interpolate(template, vars);
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
