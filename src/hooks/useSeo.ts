import { useEffect } from 'react';
import { LANGS, useLocale } from '@/i18n';

export const SITE_URL = 'https://www.saharavacation.com';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeLinkAttrs(attr: string, prefix: string) {
  document.head.querySelectorAll<HTMLLinkElement>(`link[${attr}^="${prefix}"]`).forEach((el) => el.remove());
}

function upsertHreflang(hreflang: string, href: string) {
  const key = `hreflang-${hreflang}`;
  let el = document.head.querySelector<HTMLLinkElement>(`link[data-hreflang="${key}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('data-hreflang', key);
    document.head.appendChild(el);
  }
  el.setAttribute('rel', 'alternate');
  el.setAttribute('hreflang', hreflang);
  el.setAttribute('href', href);
}

function upsertAlternateLinks(baseUrl: string) {
  removeLinkAttrs('data-hreflang', 'hreflang-');
  for (const lang of LANGS) {
    const href = lang.code === 'en' ? baseUrl : `${baseUrl}?lang=${lang.code}`;
    upsertHreflang(lang.code, href);
  }
  upsertHreflang('x-default', baseUrl);
}

export type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

/**
 * Keeps `<head>` in sync for the current page: title, meta description,
 * canonical URL, Open Graph / Twitter tags and robots directive.
 */
export function useSeo({ title, description, path, image, type = 'website' }: SeoOptions) {
  const { locale } = useLocale();

  useEffect(() => {
    document.title = title;

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const url = `${SITE_URL}${base}${path}`;
    const ogLocale = locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`;
    const siteName = 'Sahara Vacation';

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index, follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    upsertAlternateLinks(url);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:locale', ogLocale);
    if (image) upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);
  }, [title, description, path, image, type, locale]);
}
