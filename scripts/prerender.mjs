import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const PORT = process.env.PRERENDER_PORT ? Number(process.env.PRERENDER_PORT) : 9321;
const DIST = resolve('dist');
const BASE_PATH = '';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
};

function readCollection(path) {
  try {
    const data = JSON.parse(readFileSync(join(DIST, path), 'utf-8'));
    const items = Array.isArray(data) ? data : data.items;
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const routes = [
  '/',
  '/tours',
  '/experiences',
  '/blog',
  '/about',
  '/contact',
  '/custom-journey',
  '/privacy',
  '/terms',
  '/responsible-travel',
  ...readCollection('content/tours.json').map((tour) => `/tours/${tour.slug}`),
  ...readCollection('content/sahara-vibe-desert-tours.json').map((tour) => `/tours/${tour.slug}`),
  ...readCollection('content/blog.json').map((post) => `/blog/${post.slug}`),
];

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) pathname = '/';
  else if (pathname.startsWith(`${BASE_PATH}/`)) pathname = pathname.slice(BASE_PATH.length);

  const ext = extname(pathname);
  if (!ext) {
    return send(res, 200, readFileSync(join(DIST, 'index.html')), MIME['.html']);
  }

  const file = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const target = join(DIST, file);
  if (existsSync(target)) {
    return send(res, 200, readFileSync(target), MIME[ext] ?? 'application/octet-stream');
  }
  return send(res, 404, 'not found', 'text/plain');
});

const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findChrome() {
  return CHROME_CANDIDATES.find((path) => existsSync(path));
}

async function prerender() {
  const executablePath = findChrome();
  if (!executablePath) {
    console.warn('[prerender] No Chrome/Edge found — skipping prerender (static HTML not generated).');
    return;
  }

  await new Promise((resolveListen) => server.listen(PORT, resolveListen));
  console.log(`[prerender] serving ${DIST} at http://localhost:${PORT}${BASE_PATH}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (type === 'image' || type === 'media' || type === 'font') req.abort();
    else req.continue();
  });

  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
  let rendered = 0;
  let skipped = 0;

  for (const route of routes) {
    const url = `http://localhost:${PORT}${BASE_PATH}${route === '/' ? '/' : route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const ok = await page
        .waitForSelector('#root main', { timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      if (!ok) {
        console.warn(`[prerender] skip ${route}: main content not rendered`);
        skipped += 1;
        continue;
      }
      await new Promise((r) => setTimeout(r, 400));
      const html = await page.content();
      const outFile = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
      mkdirSync(dirname(outFile), { recursive: true });
      writeFileSync(outFile, html, 'utf-8');
      rendered += 1;
      console.log(`[prerender] ok ${route}`);
    } catch (error) {
      skipped += 1;
      console.warn(`[prerender] skip ${route}: ${error.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — rendered ${rendered}, skipped ${skipped} of ${routes.length}.`);
  if (rendered === 0) {
    console.warn('[prerender] nothing was rendered — keeping original index.html');
    writeFileSync(join(DIST, 'index.html'), indexHtml, 'utf-8');
  }
}

prerender().catch((error) => {
  console.error('[prerender] failed:', error);
  process.exit(1);
});
