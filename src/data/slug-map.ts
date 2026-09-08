import type { Locale } from '@/i18n';
import slugMap from '@/data/slug-map.json';

export type SlugEntry = Record<Locale, string>;

const TOUR_ENTRIES: SlugEntry[] = slugMap.tours as SlugEntry[];
const BLOG_ENTRIES: SlugEntry[] = slugMap.blogs as SlugEntry[];

function findEntry(entries: SlugEntry[], slug: string): SlugEntry | undefined {
  return entries.find((entry) => Object.values(entry).includes(slug));
}

export function tourSlugEntry(slug: string): SlugEntry | undefined {
  return findEntry(TOUR_ENTRIES, slug);
}

export function blogSlugEntry(slug: string): SlugEntry | undefined {
  return findEntry(BLOG_ENTRIES, slug);
}

export function tourSlugFor(slug: string, locale: Locale): string {
  return tourSlugEntry(slug)?.[locale] ?? slug;
}

export function blogSlugFor(slug: string, locale: Locale): string {
  return blogSlugEntry(slug)?.[locale] ?? slug;
}

export function tourAlternatePaths(slug: string): Record<Locale, string> | undefined {
  const entry = tourSlugEntry(slug);
  if (!entry) return undefined;
  return Object.fromEntries(
    (Object.keys(entry) as Locale[]).map((locale) => [locale, `/tours/${entry[locale]}`]),
  ) as Record<Locale, string>;
}

export function blogAlternatePaths(slug: string): Record<Locale, string> | undefined {
  const entry = blogSlugEntry(slug);
  if (!entry) return undefined;
  return Object.fromEntries(
    (Object.keys(entry) as Locale[]).map((locale) => [locale, `/blog/${entry[locale]}`]),
  ) as Record<Locale, string>;
}

export function isTourPath(path: string): boolean {
  return /^\/tours\//.test(path);
}

export function isBlogPath(path: string): boolean {
  return /^\/blog\//.test(path);
}

export function translatePath(path: string, targetLocale: Locale): string {
  const tourMatch = path.match(/^(\/tours\/)([^/]+)(.*)$/);
  if (tourMatch) {
    return `${tourMatch[1]}${tourSlugFor(tourMatch[2], targetLocale)}${tourMatch[3]}`;
  }
  const blogMatch = path.match(/^(\/blog\/)([^/]+)(.*)$/);
  if (blogMatch) {
    return `${blogMatch[1]}${blogSlugFor(blogMatch[2], targetLocale)}${blogMatch[3]}`;
  }
  return path;
}