import { en } from './en';
import { fr } from './fr';
import type { Locale, LocaleDict } from './types';

export type { Locale, TranslationKey } from './types';

function flatten(value: Record<string, unknown>, prefix = ''): LocaleDict {
  const out: Record<string, string> = {};
  for (const key of Object.keys(value)) {
    const entry = value[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof entry === 'string') {
      out[path] = entry;
    } else {
      Object.assign(out, flatten(entry as Record<string, unknown>, path));
    }
  }
  return out as LocaleDict;
}

/**
 * Only en (fallback dictionary) and fr (default locale) ship in the main
 * bundle. de/es/it are lazy chunks so the main JS stays small; loadLocaleDict
 * must resolve before the app renders so a non-FR locale never flashes
 * untranslated text (the prerendered HTML does the same synchronously).
 */
type Dicts = Record<Locale, LocaleDict | undefined>;

export const DICTS: Dicts = {
  en: flatten(en),
  fr,
};

const dictModules: Partial<Record<Locale, () => Promise<LocaleDict>>> = {
  de: async () => {
    const m = await import('./de');
    return flatten(m.de);
  },
  es: async () => {
    const m = await import('./es');
    return flatten(m.es);
  },
  it: async () => {
    const m = await import('./it');
    return flatten(m.it);
  },
};

const loaded = new Map<Locale, Promise<LocaleDict>>() as Map<Locale, Promise<LocaleDict>>;

export function loadLocaleDict(locale: Locale): Promise<LocaleDict | undefined> {
  // English lives in the main bundle (it is the t() fallback).
  if (locale === 'en') return Promise.resolve(DICTS.en);
  if (locale === 'fr') return Promise.resolve(DICTS.fr);
  const pending = loaded.get(locale);
  if (pending) return pending;
  const loader = dictModules[locale];
  if (!loader) return Promise.resolve(undefined);
  const promise = loader().then((dict) => {
    DICTS[locale] = dict;
    return dict;
  }) as Promise<LocaleDict>;
  loaded.set(locale, promise);
  return promise;
}

/** Kick off background loading of the remaining locales after first paint. */
export function prefetchAllLocaleDicts(): void {
  (['de', 'es', 'it'] as Locale[]).forEach((code) => {
    if (!DICTS[code]) loadLocaleDict(code).catch(() => undefined);
  });
}
