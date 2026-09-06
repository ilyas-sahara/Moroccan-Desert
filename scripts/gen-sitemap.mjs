import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://www.saharavacation.com';
const DEFAULT_LOCALE = 'fr';
const LOCALES = ['fr', 'es', 'de', 'it', 'en'];

function slugPaths(file) {
  try {
    const data = JSON.parse(readFileSync(resolve(file), 'utf-8'));
    const items = Array.isArray(data) ? data : data.items;
    return Array.isArray(items) ? items.map((item) => item.slug) : [];
  } catch {
    return [];
  }
}

function tourEntries() {
  const slugs = [
    ...slugPaths('public/content/tours.json'),
    ...slugPaths('public/content/sahara-vibe-desert-tours.json'),
  ];
  return slugs.map((slug) => ({ path: `/tours/${slug}`, prio: '0.8', freq: 'monthly' }));
}

function blogEntries() {
  return slugPaths('public/content/blog.json').map((slug) => ({
    path: `/blog/${slug}`,
    prio: '0.6',
    freq: 'monthly',
  }));
}

const ALL_ENTRIES = [
  { path: '/', prio: '1.0', freq: 'weekly' },
  { path: '/tours', prio: '0.9', freq: 'weekly' },
  { path: '/experiences', prio: '0.8', freq: 'weekly' },
  { path: '/blog', prio: '0.8', freq: 'weekly' },
  { path: '/custom-journey', prio: '0.7', freq: 'weekly' },
  { path: '/contact', prio: '0.7', freq: 'monthly' },
  { path: '/about', prio: '0.7', freq: 'monthly' },
  { path: '/responsible-travel', prio: '0.5', freq: 'monthly' },
  { path: '/privacy', prio: '0.3', freq: 'yearly' },
  { path: '/terms', prio: '0.3', freq: 'yearly' },
  ...tourEntries(),
  ...blogEntries(),
];

const seen = new Set();
const ENTRIES = [
  ...ALL_ENTRIES.map((entry) => {
    if (seen.has(entry.path)) return null;
    seen.add(entry.path);
    return entry;
  }).filter(Boolean),
];

const lastmod = new Date().toISOString().slice(0, 10);
const trail = (p) => (p === '/' || p.endsWith('/') ? p : `${p}/`);
const hrefOf = (entry, code) =>
  `${SITE}${code === DEFAULT_LOCALE ? trail(entry.path) : `/${code}${trail(entry.path)}`}`;

const urlBlocks = [];
for (const entry of ENTRIES) {
  const alternates = [
    ...LOCALES.map(
      (code) => `      <xhtml:link rel="alternate" hreflang="${code}" href="${hrefOf(entry, code)}" />`,
    ),
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${hrefOf(entry, DEFAULT_LOCALE)}" />`,
  ].join('\n');
  for (const code of LOCALES) {
    urlBlocks.push(
      [
        '  <url>',
        `    <loc>${hrefOf(entry, code)}</loc>`,
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