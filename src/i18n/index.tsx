import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DICTS } from './translations';
import type { Locale, TranslationKey } from './translations';

export type { Locale, TranslationKey } from './translations';

export const LANGS: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'it', label: 'Italiano', short: 'IT' },
];

const LOCALE_CODES: Locale[] = ['en', 'fr', 'de', 'es', 'it'];

export function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALE_CODES as string[]).includes(value);
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

function localeFromUrl(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    return isLocale(params.get('lang')) ? (params.get('lang') as Locale) : null;
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const fromUrl = localeFromUrl();
    if (fromUrl) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : 'en';
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
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
      const fromUrl = localeFromUrl();
      if (fromUrl) setLocaleState(fromUrl);
    };
    window.addEventListener('popstate', onUrlChange);
    return () => window.removeEventListener('popstate', onUrlChange);
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Vars) => {
      const dict = DICTS[locale];
      let template = dict[key];
      if (template === undefined) template = DICTS.en[key] ?? key;
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
