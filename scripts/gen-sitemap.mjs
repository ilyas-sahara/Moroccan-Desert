import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://www.saharavacation.com';
const DEFAULT_LOCALE = 'fr';
const LOCALES = ['fr', 'es', 'de', 'it', 'en'];

const slugMap = JSON.parse(readFileSync(resolve('src/data/slug-map.json'), 'utf-8'));

const STATIC_ENTRIES = [
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/'])), prio: '1.0', freq: 'weekly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/tours'])), prio: '0.9', freq: 'weekly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/experiences'])), prio: '0.8', freq: 'weekly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/blog'])), prio: '0.8', freq: 'weekly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/custom-journey'])), prio: '0.7', freq: 'weekly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/contact'])), prio: '0.7', freq: 'monthly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/about'])), prio: '0.7', freq: 'monthly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/responsible-travel'])), prio: '0.5', freq: 'monthly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/privacy'])), prio: '0.3', freq: 'yearly' },
  { paths: Object.fromEntries(LOCALES.map((c) => [c, '/terms'])), prio: '0.3', freq: 'yearly' },
];

const TOUR_ENTRIES = slugMap.tours.map((entry) => ({
  paths: Object.fromEntries(LOCALES.map((c) => [c, `/tours/${entry[c]}`])),
  prio: '0.8',
  freq: 'monthly',
}));

const BLOG_ENTRIES = slugMap.blogs.map((entry) => ({
  paths: Object.fromEntries(LOCALES.map((c) => [c, `/blog/${entry[c]}`])),
  prio: '0.6',
  freq: 'monthly',
}));

const ENTRIES = [...STATIC_ENTRIES, ...TOUR_ENTRIES, ...BLOG_ENTRIES];

const lastmod = new Date().toISOString().slice(0, 10);
const trail = (p) => (p === '/' || p.endsWith('/') ? p : `${p}/`);
const hrefOf = (code, path) =>
  `${SITE}${code === DEFAULT_LOCALE ? trail(path) : `/${code}${trail(path)}`}`;

const urlBlocks = [];
for (const entry of ENTRIES) {
  const alternates = [
    ...LOCALES.map(
      (code) => `      <xhtml:link rel="alternate" hreflang="${code}" href="${hrefOf(code, entry.paths[code])}" />`,
    ),
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${hrefOf(DEFAULT_LOCALE, entry.paths[DEFAULT_LOCALE])}" />`,
  ].join('\n');
  for (const code of LOCALES) {
    urlBlocks.push(
      [
        '  <url>',
        `    <loc>${hrefOf(code, entry.paths[code])}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${entry.freq}</changefreq>`,
        `    <priority>${entry.prio}</priority>`,
        alternates,
        '  </url>',
      ].join('\n'),
    );
  }
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  urlBlocks.join('\n'),
  '</urlset>',
  '',
].join('\n');

writeFileSync(resolve('public/sitemap.xml'), xml, 'utf-8');
console.log(
  `sitemap written: ${urlBlocks.length} <url> entries (${ENTRIES.length} paths x ${LOCALES.length} locales)`,
);