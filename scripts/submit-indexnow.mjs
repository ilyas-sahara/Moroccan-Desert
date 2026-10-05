import { readFileSync } from 'node:fs';

const SITE = 'https://www.saharavacation.com';
const API = 'https://api.indexnow.org/indexnow';

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.log('[indexnow] INDEXNOW_KEY not set - skipping submission.');
  process.exit(0);
}

let xml;
try {
  xml = readFileSync('public/sitemap.xml', 'utf-8');
} catch {
  console.error('[indexnow] public/sitemap.xml not found - skipping.');
  process.exit(1);
}

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => u.startsWith(SITE));

if (!urls.length) {
  console.error('[indexnow] no URLs found in sitemap - skipping.');
  process.exit(1);
}

const body = {
  host: new URL(SITE).host,
  key,
  keyLocation: `${SITE}/${key}.txt`,
  urlList: urls.slice(0, 10000),
};

const response = await fetch(API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

if (!response.ok) {
  const text = await response.text();
  console.error(`[indexnow] submission failed: HTTP ${response.status} ${text}`);
  process.exit(1);
}

console.log(`[indexnow] submitted ${urls.length} URLs to IndexNow (HTTP ${response.status}).`);