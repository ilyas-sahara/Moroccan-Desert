import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const LOCALES = ['fr', 'de', 'es', 'it', 'en'];
const TOUR_SOURCES = ['public/content/tours.json', 'public/content/sahara-vibe-desert-tours.json'];
const LOCALIZED_TOURS = LOCALES.filter((code) => code !== 'en').map((code) => ({
  code,
  path: `public/content/${code}/tours.json`,
}));

const readJson = (path) => JSON.parse(readFileSync(resolve(ROOT, path), 'utf-8'));
const writeJson = (path, data) => writeFileSync(resolve(ROOT, path), `${JSON.stringify(data, null, 2)}\n`);

const enTourSlugs = [];
for (const file of TOUR_SOURCES) {
  const data = readJson(file);
  for (const tour of data.items ?? []) {
    if (tour && typeof tour.slug === 'string' && tour.slug && !enTourSlugs.includes(tour.slug)) {
      enTourSlugs.push(tour.slug);
    }
  }
}
const enUnion = new Set(enTourSlugs);

const slugMapPath = 'src/data/slug-map.json';
const slugMap = readJson(slugMapPath);
const known = new Set((slugMap.tours ?? []).map((entry) => entry.en).filter(Boolean));

const localized = LOCALIZED_TOURS.map(({ code, path }) => {
  const filePath = resolve(ROOT, path);
  return {
    code,
    path,
    filePath,
    data: existsSync(filePath) ? readJson(path) : { items: [] },
  };
});

const removed = [];
const pruned = slugMap.tours.filter((entry) => !enUnion.has(entry.en));
for (const entry of pruned) {
  removed.push(entry.en);
  for (const loc of localized) {
    const before = loc.data.items.length;
    loc.data.items = loc.data.items.filter((tour) => tour.slug !== entry[loc.code]);
    if (loc.data.items.length !== before) {
      writeJson(loc.path, loc.data);
    }
  }
}
slugMap.tours = slugMap.tours.filter((entry) => enUnion.has(entry.en));

let added = 0;
for (const slug of enTourSlugs) {
  if (known.has(slug)) continue;
  slugMap.tours.push(Object.fromEntries(LOCALES.map((code) => [code, slug])));
  known.add(slug);
  added += 1;
}

if (added > 0 || removed.length > 0) {
  writeJson(slugMapPath, slugMap);
}

console.log(
  `sync-cms-tours: ${enTourSlugs.length} CMS tour slugs seen, ${added} added, ${removed.length} pruned${removed.length ? ` (${removed.join(', ')})` : ''}.`,
);