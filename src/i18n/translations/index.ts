import { en } from './en';
import { fr } from './fr';
import { de } from './de';
import { es } from './es';
import { it } from './it';
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

export const DICTS: Record<Locale, LocaleDict> = {
  en: flatten(en),
  fr,
  de,
  es,
  it,
};
