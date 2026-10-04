import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const LOCALES = ['fr', 'de', 'es', 'it', 'en'];

const readJson = (path) => JSON.parse(readFileSync(resolve(ROOT, path), 'utf-8'));
const writeJson = (path, data) => writeFileSync(resolve(ROOT, path), `${JSON.stringify(data, null, 2)}\n`);

const enTourSlugs = [];
for (const file of ['public/content/tours.json', 'public/content/sahara-vibe-desert-tours.json']) {
  const data = readJson(file);
  for (const tour of data.items ?? []) {
    if (tour && typeof tour.slug === 'string' && tour.slug && !enTourSlugs.includes(tour.slug)) {
      enTourSlugs.push(tour.slug);
    }
  }
}

const slugMapPath = 'src/data/slug-map.json';
const slugMap = readJson(slugMapPath);
const known = new Set((slugMap.tours ?? []).map((entry) => entry.en).filter(Boolean));

let added = 0;
for (const slug of enTourSlugs) {
  if (known.has(slug)) continue;
  slugMap.tours.push(Object.fromEntries(LOCALES.map((code) => [code, slug])));
  known.add(slug);
  added += 1;
}

if (added > 0) {
  writeJson(slugMapPath, slugMap);
}

console.log(`sync-cms-tours: ${enTourSlugs.length} CMS tour slugs seen, ${added} new route entries added to slug-map.`);