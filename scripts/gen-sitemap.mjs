import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve('public/sitemap.xml');
const xml = readFileSync(file, 'utf-8');

const LANGS = ['fr', 'de', 'es', 'it'];
const urlBlock = /<url>[\s\S]*?<\/url>/g;
const locRe = /<loc>([^<]+)<\/loc>/;

const base = 'https://www.saharavacation.com';

const updated = xml.replace(urlBlock, (block) => {
  const match = block.match(locRe);
  if (!match) return block;
  const loc = match[1];
  const isRoot = loc.replace(/\/$/, '') === base;
  const selfHref = isRoot ? `${base}/` : loc;
  const alternates = `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${selfHref}" />\n` +
    LANGS.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}?lang=${lang}" />`).join('\n');
  const enHref = isRoot ? `${base}/` : loc;
  const enAlternate = `    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />`;
  const withHreflang = block.replace(/<loc>[^<]+<\/loc>/, `<loc>${loc}</loc>\n${enAlternate}${alternates}`);
  return withHreflang;
}).replace(
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
);

writeFileSync(file, updated, 'utf-8');
console.log('done');