# Sahara Vacations — Remaining SEO / Ranking Actions

Status of on-site SEO (done): meta tags + canonical + Open Graph/Twitter, JSON-LD
(TravelAgency / Product / BlogPosting), robots.txt, sitemap.xml, multilingual UI
translation keys, real favicon, prerendered static HTML for every route.

The 8 highest-impact steps still needed to actually rank:

## 1. Submit to Google Search Console
- Verify the property (`ilyas-sahara.github.io`), then submit
  `https://ilyas-sahara.github.io/Moroccan-Desert/sitemap.xml`.
- Watch the Coverage report and fix any pages marked as "Indexed, though blocked"
  or "Crawled – currently not indexed".
- Repeat the same steps in Bing Webmaster Tools (Bing also powers ChatGPT/Edge).

## 2. Real indexing check after each deploy
- Run `site:ilyas-sahara.github.io/Moroccan-Desert` and use the URL Inspection
  tool on `/`, `/tours`, one tour page and one blog page.
- Confirm the prerendered HTML (title, meta, headings, JSON-LD) is what Google sees.

## 3. FAQPage + BreadcrumbList structured data
- Add `FAQPage` JSON-LD to `/contact` (there is already an FAQ accordion).
- Add `BreadcrumbList` JSON-LD to tour detail and blog detail pages (breadcrumbs
  already exist in the UI).
- Validate with Google's Rich Results Test.

## 4. Google Business Profile (biggest local lever)
- Create/claim a GBP for the Zagora/Merzouga operation with consistent NAP
  (Name / Address / Phone) matching `public/content/site/settings.json`.
- Add photos, opening hours, service area (Merzouga, Zagora, M'Hamid, Marrakech).
- This matters more for local rank than any on-page work.

## 5. Backlinks (the main off-page factor)
- Get listed on travel directories (TripAdvisor, Viator, GetYourGuide, etc.).
- Publish guest posts / travel collabs that link to the site.
- Make sure the brand's Instagram/Facebook profiles link to the site too.

## 6. Reviews
- Collect real traveler reviews on Google and TripAdvisor.
- More positive reviews + rating signals improve CTR and trust (and already feed
  the Product aggregateRating schema on tour pages).

## 7. Keyword-targeted tour pages
- Do keyword research and give each tour page a focused target
  (e.g. "Merzouga desert tour from Marrakech", "Erg Chigaga 4x4 tour from Zagora").
- Rewrite titles/H1s/descriptions per tour instead of the current generic ones.

## 8. Grow the blog + internal linking
- Publish long-tail planning posts (travelers search "how to plan..." queries).
- Interlink blog posts → tour pages → contact page.
- Internal links from every blog post to 1–2 relevant tours.

## Note — multilingual SEO (hreflang)
All languages are currently served from a single URL via JavaScript, so `hreflang`
tags cannot be used. To rank in each language you would need separate URLs
(e.g. `/fr/tours/...`) and per-language sitemaps. Not urgent; revisit later.
