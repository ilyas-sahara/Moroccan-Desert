/* Decap CMS live-style preview templates.
 * Renders the site's real look (Tailwind classes + compiled CSS) in the preview pane.
 */
(function () {
  if (!window.CMS || typeof window.CMS.registerPreviewTemplate !== 'function') return;

  var h = window.h;

  window.CMS.registerPreviewStyle('/assets/site.css');
  window.CMS.registerPreviewStyle(
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
  );

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function img(src, alt, cls) {
    return src
      ? '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" class="' + esc(cls || '') + '" />'
      : '';
  }

  function head(eyebrow, title, subtitle, opts) {
    opts = opts || {};
    var light = opts.light ? 'text-sand-50' : 'text-ink-900';
    var center = opts.center ? ' items-center text-center' : ' items-start';
    return (
      '<div class="flex flex-col' + center + ' ' + light + '">' +
      (eyebrow ? '<span class="eyebrow' + (opts.light ? ' text-sand-300' : '') + '"><span class="hairline"></span> ' + esc(eyebrow) + '</span>' : '') +
      '<h2 class="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-[2.75rem] text-balance">' + esc(title) + '</h2>' +
      (subtitle ? '<p class="mt-4 max-w-2xl text-base leading-relaxed' + (opts.light ? ' text-sand-200/85' : ' text-ink-600') + '">' + esc(subtitle) + '</p>' : '') +
      '</div>'
    );
  }

  function pageHero(bg, eyebrow, title, subtitle, strength) {
    return (
      '<section class="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">' +
      '<div class="absolute inset-0">' +
      img(bg, '', 'h-full w-full object-cover opacity-' + (strength || '40')) +
      '<div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80"></div>' +
      '</div>' +
      '<div class="container-x relative z-10">' +
      head(eyebrow, title, subtitle, { light: true }) +
      '</div>' +
      '</section>'
    );
  }

  function note(text) {
    return '<div class="mt-6 rounded-xl bg-white/70 p-5 text-sm leading-relaxed text-ink-500 ring-1 ring-sand-200/60">' + esc(text) + '</div>';
  }

  function wrap(html) {
    return h('div', { dangerouslySetInnerHTML: { __html: html } });
  }

  function getData(entry) {
    try {
      return entry && entry.get && entry.get('data') ? entry.get('data').toJS() : {};
    } catch (e) {
      return {};
    }
  }

  /* ---------- Settings ---------- */
  window.CMS.registerPreviewTemplate('settings', function (props) {
    var d = getData(props.entry);
    var rows = [
      ['Brand name', d.brand_name],
      ['Tagline', d.tagline],
      ['Phone', d.phone],
      ['Email', d.email],
      ['Address', d.address],
      ['Instagram URL', d.instagram_url],
      ['Facebook URL', d.facebook_url],
    ].filter(function (r) { return r[1]; });
    var html =
      '<div class="bg-sand-50 min-h-screen p-10">' +
      '<div class="container-x"><div class="max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-sand-200/50">' +
      '<h1 class="font-display text-3xl font-medium text-ink-900">Site Settings</h1>' +
      '<dl class="mt-6 divide-y divide-sand-100">' +
      rows.map(function (r) {
        return '<div class="grid gap-1 py-3 sm:grid-cols-3"><dt class="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-500">' + esc(r[0]) + '</dt><dd class="sm:col-span-2 text-sm text-ink-800">' + esc(r[1]) + '</dd></div>';
      }).join('') +
      '</dl></div></div></div>';
    return wrap(html);
  });

  /* ---------- Footer ---------- */
  window.CMS.registerPreviewTemplate('footer', function (props) {
    var d = getData(props.entry);
    var explore = (d.explore_links || []).map(function (l) {
      return '<li class="text-sm text-sand-200/85"><span class="link-underline">' + esc(l.label) + '</span></li>';
    }).join('');
    var legal = (d.legal_links || []).map(function (l) {
      return '<span class="hover:text-sand-100">' + esc(l.label) + '</span>';
    }).join('<span class="h-3 w-px bg-sand-300/20"></span>');
    var html =
      '<footer class="relative overflow-hidden bg-ink-950 text-sand-100">' +
      '<div class="container-x relative z-10 py-16 lg:py-20">' +
      '<div class="grid gap-12 lg:grid-cols-12">' +
      '<div class="lg:col-span-5">' +
      '<span class="flex items-center gap-2.5">' +
      '<span class="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/40 text-sand-300">' +
      '<span class="h-5 w-5 rounded-full border-2 border-sand-400"></span></span>' +
      '<span class="font-display text-2xl font-semibold text-sand-50">' + esc(d.brand_name) + '</span></span>' +
      '<p class="mt-6 max-w-md text-sm leading-relaxed text-sand-200/80">' + esc(d.description) + '</p>' +
      '<div class="mt-8 flex items-center gap-3">' +
      '<span class="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200">' +
      '<span class="h-4 w-4 rounded-full border-2 border-sand-400"></span></span>' +
      '<span class="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200">' +
      '<span class="h-4 w-4 rounded-full border-2 border-sand-400"></span></span>' +
      '<span class="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200">' +
      '<span class="h-4 w-4 rounded-full border-2 border-sand-400"></span></span>' +
      '</div></div>' +
      '<div class="lg:col-span-3">' +
      '<h4 class="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Explore</h4>' +
      '<ul class="mt-5 space-y-3">' + explore + '</ul></div>' +
      '<div class="lg:col-span-4">' +
      '<h4 class="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Get in touch</h4>' +
      '<ul class="mt-5 space-y-3 text-sm text-sand-200/85">' +
      '<li class="flex items-start gap-3"><span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-sand-400"></span><span>' + esc(d.address) + '</span></li>' +
      '<li class="flex items-center gap-3"><span class="h-4 w-4 shrink-0 rounded-full border border-sand-400"></span><span>' + esc(d.phone) + '</span></li>' +
      '<li class="flex items-center gap-3"><span class="h-4 w-4 shrink-0 rounded-full border border-sand-400"></span><span>' + esc(d.email) + '</span></li>' +
      '</ul></div></div>' +
      '<div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-sand-300/10 pt-8 text-xs text-sand-300/60 sm:flex-row">' +
      '<p>&copy; ' + new Date().getFullYear() + ' ' + esc(d.brand_name) + '. ' + esc(d.copyright_text) + '</p>' +
      '<div class="flex items-center gap-6">' + legal + '</div>' +
      '</div></div></footer>';

    return wrap(html);
  });

  /* ---------- Homepage ---------- */
  window.CMS.registerPreviewTemplate('homepage', function (props) {
    var d = getData(props.entry);
    var frames = (d.hero_frames && d.hero_frames.length ? d.hero_frames : [{}]);
    var first = frames[0] || {};
    var gallery = (d.gallery || []).map(function (src) {
      return img(src, '', 'h-56 w-80 shrink-0 rounded-2xl object-cover');
    }).join('');

    var html =
      '<main>' +
      /* Hero */
      '<section class="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950">' +
      '<div class="absolute inset-0">' +
      img(first.image, '', 'h-full w-full object-cover') +
      '</div>' +
      '<div class="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/10 to-ink-950/70"></div>' +
      '<div class="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-transparent"></div>' +
      '<div class="container-x relative z-10 flex h-full flex-col justify-end pb-24 pt-32 sm:pb-28 lg:pb-32">' +
      '<div class="max-w-3xl">' +
      '<p class="eyebrow text-sand-200"><span class="h-px w-8 bg-sand-300"></span> ' + esc(d.hero_kicker) + '</p>' +
      '<h1 class="mt-5 font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl text-balance">' + esc(d.hero_heading) + '</h1>' +
      '<p class="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/90 sm:text-xl">' + esc(d.hero_lead) + '</p>' +
      '<div class="mt-9 flex flex-wrap items-center gap-4">' +
      '<span class="btn-light">Explore Tours</span>' +
      '<span class="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white">Plan Your Journey</span>' +
      '</div>' +
      '<div class="mt-10 flex items-center gap-5 text-sand-100">' +
      '<span class="font-semibold text-white">' + esc(d.hero_rating) + '</span>' +
      '<span class="text-sm text-sand-100/80">' + esc(d.hero_review_text) + '</span>' +
      '</div>' +
      '</div></div></section>' +
      /* Intro */
      '<section class="bg-sand-50 py-24 lg:py-32"><div class="container-x"><div class="grid gap-12 lg:grid-cols-12 lg:items-center">' +
      '<div class="lg:col-span-6">' + head(d.hero_eyebrow, d.hero_title, d.intro_subtitle) + '</div>' +
      '<div class="lg:col-span-6"><div class="grid grid-cols-2 gap-4">' +
      img(d.intro_image_a, 'Mint tea on a Moroccan carpet', 'aspect-[3/4] w-full rounded-2xl object-cover shadow-lg') +
      img(d.intro_image_b, 'Camel trek on the dunes', 'mt-8 aspect-[3/4] w-full rounded-2xl object-cover shadow-lg') +
      '</div></div>' +
      '</div></div></section>' +
      /* Featured tours */
      '<section class="bg-sand-100/40 py-24 lg:py-32"><div class="container-x">' +
      '<div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">' +
      '<div class="max-w-2xl">' + head('Signature Journeys', 'Tours crafted around the rhythm of the desert', 'From a single night under the stars to a five-day crossing — every journey is led by local guides and built around small groups.') + '</div>' +
      '</div>' +
      note('Featured tour cards appear here. Edit them in the Tours collection.') +
      '</div></section>' +
      /* Story */
      '<section class="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">' +
      '<div class="absolute inset-0">' +
      img(d.story_image, '', 'h-full w-full object-cover opacity-40') +
      '<div class="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40"></div>' +
      '</div>' +
      '<div class="container-x relative z-10"><div class="max-w-xl">' +
      '<span class="eyebrow text-sand-300"><span class="hairline"></span> A Night Like No Other</span>' +
      '<h2 class="mt-4 font-display text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance">' + esc(d.story_title) + '</h2>' +
      '<p class="mt-5 text-base leading-relaxed text-sand-200/85 sm:text-lg">' + esc(d.story_description) + '</p>' +
      '</div></div></section>' +
      /* Gallery */
      '<section class="bg-sand-50 py-24 lg:py-32"><div class="container-x">' +
      head('The Landscape', 'A few moments from the dunes', 'Gold, silence, and sky. The Sahara of Merzouga in pictures.', { center: true }) +
      '</div>' +
      (gallery ? '<div class="mt-14 flex gap-4 overflow-hidden">' + gallery + '</div>' : '') +
      '</section>' +
      /* CTA */
      '<section class="relative overflow-hidden bg-sand-800 py-24 text-sand-50 lg:py-32">' +
      '<div class="absolute inset-0 opacity-20">' + img(d.cta_image, '', 'h-full w-full object-cover') + '</div>' +
      '<div class="container-x relative z-10 text-center">' +
      '<h2 class="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl text-balance">Your journey into the Sahara begins with a single message.</h2>' +
      '<p class="mx-auto mt-5 max-w-xl text-sand-100/85">Tell us your dates and your dream — we&#39;ll craft the rest.</p>' +
      '<span class="btn-light mt-9 inline-flex">' + esc(d.cta_label) + '</span>' +
      '</div></section>' +
      '</main>';

    return wrap(html);
  });

  /* ---------- About ---------- */
  window.CMS.registerPreviewTemplate('about', function (props) {
    var d = getData(props.entry);
    var values = (d.values || []).map(function (v, i) {
      return (
        '<div class="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50">' +
        '<span class="flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-sand-700">' +
        '<span class="h-5 w-5 rounded-full border-2 border-sand-400"></span></span>' +
        '<h3 class="mt-5 font-display text-xl font-medium text-ink-900">' + esc(v.title) + '</h3>' +
        '<p class="mt-2 text-sm leading-relaxed text-ink-600">' + esc(v.text) + '</p>' +
        '</div>'
      );
    }).join('');

    var html =
      '<main>' +
      pageHero(d.hero_image, d.hero_eyebrow, d.hero_title, d.hero_subtitle, '40') +
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x grid gap-12 lg:grid-cols-12 lg:items-center">' +
      '<div class="lg:col-span-6">' + img(d.intro_image, 'Nomad camp', 'aspect-[4/5] w-full rounded-2xl object-cover shadow-lg') + '</div>' +
      '<div class="lg:col-span-6">' +
      head('Who We Are', d.intro_title, d.intro_description) +
      '<div class="mt-8 grid grid-cols-3 gap-6">' +
      '<div><p class="font-display text-3xl font-semibold text-sand-800">15+</p><p class="mt-1 text-xs uppercase tracking-[0.16em] text-sand-500">Years guiding</p></div>' +
      '<div><p class="font-display text-3xl font-semibold text-sand-800">1,200+</p><p class="mt-1 text-xs uppercase tracking-[0.16em] text-sand-500">Travelers hosted</p></div>' +
      '<div><p class="font-display text-3xl font-semibold text-sand-800">4.9</p><p class="mt-1 text-xs uppercase tracking-[0.16em] text-sand-500">Average rating</p></div>' +
      '</div>' +
      '</div></div></section>' +
      '<section class="bg-sand-100/40 py-20 lg:py-28"><div class="container-x">' +
      head('What We Believe', 'The principles behind every journey', '', { center: true }) +
      '<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' + values + '</div>' +
      '</div></section>' +
      '<section class="relative overflow-hidden bg-sand-800 py-24 text-sand-50 lg:py-32">' +
      '<div class="absolute inset-0 opacity-20">' + img(d.cta_image, '', 'h-full w-full object-cover') + '</div>' +
      '<div class="container-x relative z-10 text-center">' +
      '<h2 class="mx-auto max-w-2xl font-display text-3xl font-medium text-white sm:text-4xl text-balance">' + esc(d.cta_title) + '</h2>' +
      '<span class="btn-light mt-9 inline-flex">' + esc(d.cta_label) + '</span>' +
      '</div></section>' +
      '</main>';

    return wrap(html);
  });

  /* ---------- Contact ---------- */
  window.CMS.registerPreviewTemplate('contact', function (props) {
    var d = getData(props.entry);
    var html =
      '<main>' +
      pageHero(d.hero_image, d.hero_eyebrow, d.hero_title, d.hero_subtitle, '40') +
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x grid gap-12 lg:grid-cols-12">' +
      '<div class="lg:col-span-7"><div class="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 sm:p-9">' +
      head('Tell us the details', 'Send a message', 'The contact form renders here on the live site.', { center: false }) +
      note('The message form is built into the page and is not editable in the CMS.') +
      '</div></div>' +
      '<aside class="lg:col-span-5"><div class="rounded-2xl bg-ink-950 p-7 text-sand-100 shadow-lg sm:p-9">' +
      '<h3 class="font-display text-2xl font-medium text-white">Talk to a human</h3>' +
      '<p class="mt-3 text-sm leading-relaxed text-sand-200/85">' + esc(d.office_text) + '</p>' +
      '<ul class="mt-7 space-y-5 text-sm">' +
      '<li><p class="text-[11px] uppercase tracking-[0.18em] text-sand-400">Office</p><p class="mt-0.5 text-sand-100">' + esc(d.address) + '</p></li>' +
      '<li><p class="text-[11px] uppercase tracking-[0.18em] text-sand-400">Phone / WhatsApp</p><p class="mt-0.5 text-sand-100">' + esc(d.phone) + '</p></li>' +
      '<li><p class="text-[11px] uppercase tracking-[0.18em] text-sand-400">Email</p><p class="mt-0.5 text-sand-100">' + esc(d.email) + '</p></li>' +
      '</ul></div></aside>' +
      '</div></section></main>';

    return wrap(html);
  });

  /* ---------- Custom Journey ---------- */
  window.CMS.registerPreviewTemplate('custom_journey', function (props) {
    var d = getData(props.entry);
    var html =
      '<main>' +
      '<section class="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-28">' +
      '<div class="absolute inset-0">' +
      img(d.hero_image, '', 'h-full w-full object-cover opacity-35') +
      '<div class="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35"></div>' +
      '</div>' +
      '<div class="container-x relative z-10 max-w-4xl">' + head(d.hero_eyebrow, d.hero_title, d.hero_subtitle, { light: true }) + '</div>' +
      '</section>' +
      '<section class="bg-sand-100/50 py-16 lg:py-24"><div class="container-x">' +
      note('Below the hero, the live page shows the custom journey request form and the interactive Morocco map. Those are built into the page and are not editable in the CMS.') +
      '</div></section></main>';

    return wrap(html);
  });

  /* ---------- Experiences Page ---------- */
  window.CMS.registerPreviewTemplate('experiences_page', function (props) {
    var d = getData(props.entry);
    var html =
      '<main>' +
      pageHero(d.hero_image, d.hero_eyebrow, d.hero_title, d.hero_subtitle, '40') +
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      note('The experience cards render here on the live site. Edit them in the Experiences collection.') +
      '</div></section>' +
      '<section class="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">' +
      '<div class="absolute inset-0 opacity-30">' + img(d.cta_image, '', 'h-full w-full object-cover') + '</div>' +
      '<div class="container-x relative z-10 text-center">' +
      '<h2 class="mx-auto max-w-2xl font-display text-3xl font-medium text-white sm:text-4xl text-balance">' + esc(d.cta_title) + '</h2>' +
      '<p class="mx-auto mt-5 max-w-xl text-sand-200/85">' + esc(d.cta_subtitle) + '</p>' +
      '<span class="btn-light mt-9 inline-flex">' + esc(d.cta_label) + '</span>' +
      '</div></section></main>';

    return wrap(html);
  });

  /* ---------- Tours ---------- */
  function tourCard(t) {
    return (
      '<div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50">' +
      '<div class="relative aspect-[4/3] overflow-hidden">' +
      img(t.image, t.title, 'h-full w-full object-cover') +
      '<div class="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent"></div>' +
      (t.region
        ? '<div class="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-800">' + esc(String(t.region).split('·')[0].trim()) + '</div>'
        : '') +
      '</div>' +
      '<div class="flex flex-1 flex-col p-6">' +
      '<div class="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand-600">' +
      '<span>' + esc(t.duration) + '</span>' +
      (t.groupSize ? '<span class="h-3 w-px bg-sand-200"></span><span>' + esc(t.groupSize) + '</span>' : '') +
      '</div>' +
      '<h3 class="mt-3 font-display text-2xl font-medium text-ink-900">' + esc(t.title) + '</h3>' +
      '<p class="mt-2 text-sm leading-relaxed text-ink-600">' + esc(t.subtitle) + '</p>' +
      '<div class="mt-5 flex items-end justify-between border-t border-sand-100 pt-5">' +
      '<div><p class="text-[11px] uppercase tracking-[0.16em] text-sand-500">From</p>' +
      '<p class="font-display text-2xl font-semibold text-ink-900">&euro;' + esc(t.priceFrom) + (t.days ? '<span class="ml-1 text-xs font-normal text-ink-400">/ person</span>' : '') + '</p></div>' +
      '<span class="text-sm font-semibold text-sand-700">View</span>' +
      '</div>' +
      '</div></div>'
    );
  }

  function toursGrid(items) {
    return (
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      head('Signature Journeys', 'Tours', '', { center: true }) +
      '<div class="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">' +
      items.map(tourCard).join('') +
      '</div></div></section>'
    );
  }

  window.CMS.registerPreviewTemplate('tours', function (props) {
    var d = getData(props.entry);
    return wrap(toursGrid(d.items || []));
  });

  window.CMS.registerPreviewTemplate('sahara_vibe_desert_tours', function (props) {
    var d = getData(props.entry);
    return wrap(toursGrid(d.items || []));
  });

  /* ---------- Experiences list ---------- */
  window.CMS.registerPreviewTemplate('experiences', function (props) {
    var d = getData(props.entry);
    var cards = (d.items || []).map(function (x) {
      return (
        '<article class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50">' +
        '<div class="relative aspect-[5/3] overflow-hidden">' +
        img(x.image, x.title, 'h-full w-full object-cover') +
        '<div class="absolute inset-0 bg-gradient-to-t from-ink-950/55 to-transparent"></div>' +
        '</div>' +
        '<div class="flex flex-1 flex-col p-6"><h3 class="font-display text-xl font-medium text-ink-900">' + esc(x.title) + '</h3>' +
        '<p class="mt-2 flex-1 text-sm leading-relaxed text-ink-600">' + esc(x.description) + '</p></div>' +
        '</article>'
      );
    }).join('');
    var html =
      '<main>' +
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      head('What You&#39;ll Do', 'Experiences that stay with you', '', { center: true }) +
      '<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' + cards + '</div>' +
      '</div></section></main>';

    return wrap(html);
  });

  /* ---------- Blog ---------- */
  window.CMS.registerPreviewTemplate('blog', function (props) {
    var d = getData(props.entry);
    var cards = (d.items || []).map(function (p) {
      return (
        '<article class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50">' +
        '<div class="relative aspect-[16/9] overflow-hidden">' + img(p.image, p.title, 'h-full w-full object-cover') + '</div>' +
        '<div class="flex flex-1 flex-col p-6">' +
        (p.category ? '<p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-500">' + esc(p.category) + '</p>' : '') +
        '<h3 class="mt-2 font-display text-xl font-medium text-ink-900">' + esc(p.title) + '</h3>' +
        '<p class="mt-2 flex-1 text-sm leading-relaxed text-ink-600">' + esc(p.excerpt) + '</p>' +
        '<p class="mt-4 border-t border-sand-100 pt-3 text-xs text-sand-500">' + esc(p.author) + (p.publishedAt ? ' &middot; ' + esc(p.publishedAt) : '') + (p.readTime ? ' &middot; ' + esc(p.readTime) : '') + '</p>' +
        '</div></article>'
      );
    }).join('');
    var html =
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      head('The Journal', 'Stories from the desert', '', { center: true }) +
      '<div class="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">' + cards + '</div>' +
      '</div></section>';

    return wrap(html);
  });

  /* ---------- Testimonials ---------- */
  window.CMS.registerPreviewTemplate('testimonials', function (props) {
    var d = getData(props.entry);
    var cards = (d.items || []).map(function (t) {
      var stars = '';
      var n = Math.max(0, Math.min(5, Number(t.rating) || 0));
      for (var i = 0; i < n; i++) stars += '<span class="text-sand-500">&#9733;</span>';
      return (
        '<figure class="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50">' +
        '<div class="text-lg leading-none">' + stars + '</div>' +
        '<blockquote class="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink-800">&ldquo;' + esc(t.text) + '&rdquo;</blockquote>' +
        '<figcaption class="mt-6 border-t border-sand-100 pt-4">' +
        '<p class="font-semibold text-ink-900">' + esc(t.name) + '</p>' +
        '<p class="text-xs uppercase tracking-[0.16em] text-sand-600">' + esc(t.country) + (t.tour ? ' &middot; ' + esc(t.tour) : '') + '</p>' +
        '</figcaption></figure>'
      );
    }).join('');
    var html =
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      head('Travelers&#39; Words', 'What our guests carry home', '', { center: true }) +
      '<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' + cards + '</div>' +
      '</div></section>';

    return wrap(html);
  });

  /* ---------- FAQs ---------- */
  window.CMS.registerPreviewTemplate('faqs', function (props) {
    var d = getData(props.entry);
    var items = (d.items || []).map(function (f) {
      return (
        '<div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50">' +
        '<h3 class="p-6 font-display text-lg font-medium text-ink-900">' + esc(f.q) + '</h3>' +
        '<p class="px-6 pb-6 text-sm leading-relaxed text-ink-600">' + esc(f.a) + '</p>' +
        '</div>'
      );
    }).join('');
    var html =
      '<section class="bg-sand-50 py-20 lg:py-28"><div class="container-x">' +
      head('Good to Know', 'Frequently asked questions', '', { center: true }) +
      '<div class="mx-auto mt-12 max-w-3xl space-y-3">' + items + '</div>' +
      '</div></section>';

    return wrap(html);
  });
})();
