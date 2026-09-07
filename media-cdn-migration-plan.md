# Media → Cloudflare CDN Migration Plan

Goal: host all site media on Cloudflare (R2-backed CDN) as AVIF/WebP images + WebM/MP4 video, remove binaries from the GitHub repo, at **$0/month**. Document only — no changes applied yet.

## Why it helps
- Repo leaves with ~84 MB of binaries (clone/build bloat) — GH Pages keeps serving only HTML.
- No third-party dependency on Pexels (fail-proof, we keep our copies; Pexels stays as a pure fallback).
- Hero/tour videos get a WebM (VP9) variant (~50–70% smaller than MP4) with MP4 fallback.
- R2 egress is **free** (unlimited), storage free up to 10 GB — we'd use well under 1 GB.
- Same family as the pending Cloudflare move (fixes cache TTL 10m + apex redirect + http variants).

## Free vs paid reality (Cloudflare)
- **Free:** R2 (10 GB storage, unlimited/free egress), SSL, Cache Rules (10 rules), custom `cdn.` subdomain.
- **Paid only:** edge "upload and auto-convert" = Cloudflare Images ($5/mo min, no free tier); Polish = Pro ($20/mo, WebP only, no AVIF). Cloudflare Stream (video) = paid.
- **Decision: do conversions at BUILD time locally (sharp + ffmpeg), then upload ready-made AVIF/WebP/WebM to R2.** Free, deterministic, no vendor lock-in.

## Current media inventory (measured today)
- `public/assets/images/` = **83.9 MB total**
  - 3× MP4 videos ≈ **69 MB**: `sahara-camel-trek-video.mp4` (18.2 MB, used in 2-day tour), `morocco-sahara-grand-tour-video.mp4` (17.8 MB, used in a grand-tour article), `morocco-sahara-scenery-video.mp4` (33.1 MB — **orphan, not referenced anywhere**)
  - 14× images ≈ **19 MB** (jpeg/png, incl. ~6 MB `sahara-dunes-morocco-landscape.jpg`)
- Pexels remote refs: **459 in tour content JSONs** + **4 in `blog.json`** ≈ **463** (all `images.pexels.com/...?auto=compress&cs=tinysrgb&w=1600/2000`)
- Local `/assets/images` refs: **12 in content JSONs** + 1 placeholder (`src/data/content.ts:44`) + 2 video refs via `"video"` fields (`VideoPlayer.tsx` renders them).
- `responsiveImage.ts` currently only rewrites Pexels URLs into srcset (per-width query params); it returns a plain `{src, srcSet, sizes}`.

## Recommended architecture
```
content JSONs (unchanged: Pexels + /assets URLs, CMS-safe)
        │  build-time
        ▼
scripts/build-media.mjs  (sharp: AVIF q≈42 / WebP q≈78 / JPEG)  +  ffmpeg: VP9 WebM
        │  widths [400,800,1200,1600, 2000-hero]
        ▼
staging media/ → push to R2 bucket `saharamedia` (scripts/push-media.mjs, idempotent PUT)
        │
        ▼
public/media-manifest.json (URL → {avif|webp|jpg} widths + webm), committed as text
        │
        ▼
components use small <Media src> helper → <picture> (AVIF → WebP → JPEG) + <video> (WebM → MP4)
        │  URLs built against https://cdn.saharavacation.com
        ▼
Cache Rule: cdn.saharavacation.com/media/* → Cache Everything, TTL 30d (free tier OK)
```
- **Content files stay untouched** — URLs in the 5 locale JSONs are not edited; resolution is a build helper. New CMS tours with Pexels URLs flow through automatically; unresolved URLs degrade to the existing Pexels fallback (zero breakage).
- Rollback = switch `MEDIA_BASE` off; nothing destructive.

## Phases & timeline (≈ 1 week part-time, can be split)
1. **Phase 0 — Cloudflare prep (0.5–1 d).** Move domain nameservers to Cloudflare (also unlocks cache TTL + apex redirect fixes). Create R2 bucket `saharamedia`, bind `cdn.saharavacation.com`, add Cache Rule. (Blocking prerequisite: the Cloudflare zone.)
2. **Phase 1 — Inventory (0.5 d).** `scripts/media-inventory.mjs`: scan content JSONs + `src/` + blog for every Pexels and `/assets` URL → unique asset list; report orphans (e.g. `morocco-sahara-scenery-video.mp4` → delete or archive?).
3. **Phase 2 — Conversion pipeline (1–2 d).** `scripts/build-media.mjs` (sharp: download original once, encode AVIF/WebP/JPEG at widths; ffmpeg: MP4→VP9 WebM). Output staged `media/` + `public/media-manifest.json`, cache originals in `.cache/` (gitignored).
4. **Phase 3 — Upload (0.5 d).** `scripts/push-media.mjs` → R2 PUTs (idempotent, correct Content-Types).
5. **Phase 4 — App integration (1–2 d).** Add `<picture>`/`<video>` media helper wired to the manifest; update the ~5–8 components rendering images (TourCard, tour gallery/detail, hero, blog, VideoPlayer). Leave `responsiveImage.ts` intact as the fallback path.
6. **Phase 5 — Repo cleanup (0.5 d).** `git rm` binaries from `public/assets/images/` (keep `favicon.svg` + `logo.png` — crawlers expect favicon at root), add `media/` + `.cache/` to `.gitignore`, keep empty-dir placeholder for prerender.
7. **Phase 6 — Verify (0.5 d).** Purge, then confirm: `Accept: image/avif` returns 200 AVIF; all 155 prerendered pages resolve media; R2/CF cache hit on second load; PageSpeed LCP/TTFB vs baseline; sitemap/hreflang unaffected.

## Costs
| Item | Price |
|---|---|
| R2 storage (~0.5–1 GB of ~10 GB allowance) | $0/mo |
| R2 egress | $0/mo (free tier) |
| Cache Rules, SSL, cdn subdomain | $0/mo |
| sharp/ffmpeg (local build) | $0/mo |
| **Total** | **$0/mo** |

## Open decisions (need your input before executing)
1. **Nameservers → Cloudflare** — required for a clean `cdn.` subdomain (blocks Phase 0). Alternative: serve from `*.r2.dev` (ugly URL, cache control limited) if you don't want to move DNS yet.
2. **Orphan `morocco-sahara-scenery-video.mp4` (33 MB)** — convert + host anyway, or delete it.
3. **Git history bloat** — working tree loses ~84 MB, but git history keeps it. Optional later: `git filter-repo` rewrite (one-time, breaks collaborator clones). Recommend deferring.
4. **Sequencing** — recommend running this **after** the indexing/reviews push (it doesn't block SEO); wrap it with the larger Cloudflare migration.