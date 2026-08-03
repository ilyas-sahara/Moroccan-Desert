import type { en } from './en';

export type DeepKeyOf<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? `${K}.${DeepKeyOf<T[K]>}`
      : K
    : never;
}[keyof T];

export type Locale = 'en' | 'fr' | 'de' | 'es' | 'it';

export type TranslationKey = DeepKeyOf<typeof en>;

export type LocaleDict = Record<TranslationKey, string>;
