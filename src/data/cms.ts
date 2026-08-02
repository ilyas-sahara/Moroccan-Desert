import { BLOG_POSTS, TOURS, EXPERIENCES, TESTIMONIALS, FAQS, IMAGES, type BlogPost, type Tour } from '@/data/content';

export type SiteSettings = {
  brand_name: string;
  tagline: string;
  logo_image: string;
  phone: string;
  email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
};

export type FooterLink = {
  label: string;
  to: string;
};

export type FooterContent = {
  brand_name: string;
  description: string;
  instagram_url: string;
  facebook_url: string;
  explore_links: FooterLink[];
  address: string;
  phone: string;
  email: string;
  copyright_text: string;
  legal_links: FooterLink[];
};

export type HeroFrame = {
  image: string;
  caption?: string;
};

export type HomePageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_kicker: string;
  hero_heading: string;
  hero_lead: string;
  hero_frames: HeroFrame[];
  hero_rating: string;
  hero_review_text: string;
  intro_title: string;
  intro_subtitle: string;
  intro_image_a: string;
  intro_image_b: string;
  story_title: string;
  story_description: string;
  story_image: string;
  gallery: string[];
  cta_label: string;
  cta_link: string;
  cta_image: string;
};

export type AboutPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  intro_title: string;
  intro_description: string;
  intro_image: string;
  values: Array<{ title: string; text: string; icon?: string }>;
  cta_title: string;
  cta_label: string;
  cta_link: string;
  cta_image: string;
};

export type ContactPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  office_text: string;
  phone: string;
  email: string;
  address: string;
};

export type CustomJourneyPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
};

export type ExperiencesPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  cta_title: string;
  cta_subtitle: string;
  cta_label: string;
  cta_link: string;
  cta_image: string;
};

const defaultSettings: SiteSettings = {
  brand_name: 'Walk the Sahara',
  tagline: 'Moroccan Desert Journeys',
  logo_image: '',
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
  instagram_url: '#',
  facebook_url: '#',
};

const defaultFooter: FooterContent = {
  brand_name: 'Walk the Sahara',
  description:
    'Luxury desert journeys through the golden dunes of Merzouga and beyond. Small groups, local guides, and camps that leave nothing behind but footprints.',
  instagram_url: '#',
  facebook_url: '#',
  explore_links: [
    { label: 'All Tours', to: '/tours' },
    { label: 'Experiences', to: '/experiences' },
    { label: 'Blog', to: '/blog' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
  copyright_text: 'All rights reserved.',
  legal_links: [
    { label: 'Privacy', to: '#' },
    { label: 'Terms', to: '#' },
    { label: 'Responsible Travel', to: '#' },
  ],
};

const defaultHeroFrames: HeroFrame[] = [
  { image: IMAGES.heroAerial, caption: 'Scene 01 — Drone over the golden dunes of Merzouga' },
  { image: IMAGES.camelCaravan, caption: 'Scene 02 — A caravan follows the ridge at sunrise' },
  { image: IMAGES.campBerber, caption: 'Scene 03 — A luxury Berber camp nestled in the dunes' },
  { image: IMAGES.campfire, caption: 'Scene 04 — Mint tea is poured as the sun sets' },
  { image: IMAGES.heroAerial, caption: 'Ending — The camera rises over an endless sea of dunes' },
];

const defaultHome: HomePageContent = {
  hero_eyebrow: 'The Journey',
  hero_title: 'The desert changes everyone who walks into it.',
  hero_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace.',
  hero_kicker: 'Moroccan Sahara · Est. 2009',
  hero_heading: 'Walk the Sahara',
  hero_lead: 'Luxury desert journeys through the golden dunes of Merzouga. Camel treks, Berber camps, and nights under the darkest sky on earth.',
  hero_frames: defaultHeroFrames,
  hero_rating: '4.9',
  hero_review_text: 'from 1,200+ travelers worldwide',
  intro_title: 'The Sahara changes everyone who walks into it.',
  intro_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace. This is the Sahara as it has always been — vast, silent, and impossibly beautiful.',
  intro_image_a: IMAGES.mintTeaCarpet,
  intro_image_b: IMAGES.camelTrek,
  story_title: 'The Sahara has one of the darkest skies on earth.',
  story_description: 'Far from any city light, the dunes of Erg Chebbi become an observatory. Our guides will point out the Milky Way, the planets, and the stories the Berber people have told the stars for centuries.',
  story_image: IMAGES.stars,
  gallery: [IMAGES.heroAerial, IMAGES.camelCaravan, IMAGES.campBerber, IMAGES.campfire, IMAGES.mintTea, IMAGES.stars, IMAGES.ergChebbi, IMAGES.sunrise],
  cta_label: 'Plan Your Journey',
  cta_link: '/contact',
  cta_image: IMAGES.duneRipples,
};

const defaultAbout: AboutPageContent = {
  hero_eyebrow: 'Our Story',
  hero_title: 'Born at the edge of the dunes',
  hero_subtitle: 'Walk the Sahara began with a single Berber family in Merzouga and a belief that the desert should be shared with care.',
  hero_image: IMAGES.loneTraveler,
  intro_title: 'A family of guides, not a company.',
  intro_description: 'We are a small collective of Berber guides and camp hosts from the Erg Chebbi region. We grew up walking these dunes, and we started Walk the Sahara to share them with travelers who want more than a photo stop.',
  intro_image: IMAGES.campNomad,
  values: [
    { title: 'Local First', text: 'Every guide is Berber, born and raised at the edge of the dunes. The money you spend stays in the desert.' },
    { title: 'Leave No Trace', text: 'Our camps are fully removable. We pack out every trace and protect the fragile dune ecology.' },
    { title: 'Small Groups', text: 'We cap every departure at a handful of guests. The desert is for silence, not crowds.' },
    { title: 'Genuine Craft', text: 'We weave real encounters with nomad families, weavers, and musicians — never staged shows.' },
  ],
  cta_title: 'Come walk the Sahara with us.',
  cta_label: 'Browse Tours',
  cta_link: '/tours',
  cta_image: IMAGES.ergChebbi,
};

const defaultContact: ContactPageContent = {
  hero_eyebrow: 'Contact',
  hero_title: "Let's plan your Sahara",
  hero_subtitle: "Tell us your dates, your group, and your dream — we'll reply within 24 hours with a tailored proposal.",
  hero_image: IMAGES.campfire,
  office_text: "Prefer to talk it through? Reach us directly — we're based in Merzouga, on the edge of the dunes.",
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
};

const defaultCustomJourney: CustomJourneyPageContent = {
  hero_eyebrow: 'Build your own journey',
  hero_title: 'Your Sahara, mapped your way.',
  hero_subtitle: 'Choose the places, pace, and experiences that matter to you. Our local team will turn them into a considered private itinerary.',
  hero_image: IMAGES.heroAerial,
};

const defaultExperiencesPage: ExperiencesPageContent = {
  hero_eyebrow: 'Experiences',
  hero_title: 'The small moments that make a journey',
  hero_subtitle: 'Every Walk the Sahara trip is built from these threads. Browse them, then let us weave them into something just for you.',
  hero_image: IMAGES.campBerber,
  cta_title: 'Want all of these in one journey?',
  cta_subtitle: 'We build bespoke itineraries that combine any of these experiences into a single, seamless trip.',
  cta_label: 'Plan a Bespoke Journey',
  cta_link: '/custom-journey',
  cta_image: IMAGES.sunrise,
};

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function mergeValues<T>(defaults: T, value: Partial<T> | undefined | null): T {
  if (!value) return defaults;
  const out: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
  for (const key of Object.keys(out)) {
    const fallback = out[key];
    const candidate = (value as Record<string, unknown>)[key];
    if (candidate === undefined || candidate === null || candidate === '') continue;
    if (Array.isArray(fallback) && Array.isArray(candidate)) {
      if (candidate.length) out[key] = candidate;
    } else {
      out[key] = candidate;
    }
  }
  return out as T;
}

async function loadCollection<T>(path: string, fallback: T[]): Promise<T[]> {
  const content = await loadJson<T[] | { items?: T[] }>(path, fallback);
  if (Array.isArray(content)) return content.length ? content : fallback;
  return Array.isArray(content.items) && content.items.length ? content.items : fallback;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return loadJson('/content/site/settings.json', defaultSettings);
}

export async function getFooterContent(): Promise<FooterContent> {
  const raw = await loadJson<Partial<FooterContent>>('/content/site/footer.json', defaultFooter);
  return mergeValues(defaultFooter, raw);
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const raw = await loadJson<Partial<HomePageContent>>('/content/site/home.json', defaultHome);
  return mergeValues(defaultHome, raw);
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const raw = await loadJson<Partial<AboutPageContent>>('/content/site/about.json', defaultAbout);
  return mergeValues(defaultAbout, raw);
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const raw = await loadJson<Partial<ContactPageContent>>('/content/site/contact.json', defaultContact);
  return mergeValues(defaultContact, raw);
}

export async function getCustomJourneyPageContent(): Promise<CustomJourneyPageContent> {
  const raw = await loadJson<Partial<CustomJourneyPageContent>>('/content/site/custom-journey.json', defaultCustomJourney);
  return mergeValues(defaultCustomJourney, raw);
}

export async function getExperiencesPageContent(): Promise<ExperiencesPageContent> {
  const raw = await loadJson<Partial<ExperiencesPageContent>>('/content/site/experiences.json', defaultExperiencesPage);
  return mergeValues(defaultExperiencesPage, raw);
}

export async function getCmsTours(): Promise<Tour[]> {
  const [primaryTours, importedTours] = await Promise.all([
    loadCollection('/content/tours.json', TOURS),
    loadCollection<Tour>('/content/sahara-vibe-desert-tours.json', []),
  ]);
  return [...primaryTours, ...importedTours.filter((tour) => !primaryTours.some((existing) => existing.slug === tour.slug))]
    .map((tour) => ({ ...tour, experiences: tour.experiences?.length ? tour.experiences : inferTourExperiences(tour) }));
}

function inferTourExperiences(tour: Tour): string[] {
  const text = [tour.title, tour.subtitle, tour.region, tour.overview, ...tour.highlights, ...tour.included].join(' ').toLowerCase();
  const experiences: string[] = [];
  const add = (id: string, match: RegExp) => { if (match.test(text)) experiences.push(id); };
  add('camel-trekking', /camel|trek/);
  add('desert-camping', /camp|bivouac|tent|overnight|stars/);
  add('stargazing', /star|stargaz|telescope/);
  add('mint-tea', /tea/);
  add('nomadic-culture', /nomad|berber|gnawa|weav/);
  add('sandboarding', /sandboard/);
  add('4x4-desert-routes', /4x4|landcruiser|drive|transfer/);
  add('kasbahs-and-oases', /kasbah|oasis|atlas|aït ben haddou|ait ben haddou|drâa|draa/);
  return experiences;
}

export async function getCmsExperiences(): Promise<Array<{ slug: string; title: string; description: string; image: string; icon: string }>> {
  return loadCollection('/content/experiences.json', EXPERIENCES);
}

export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  return loadCollection('/content/blog.json', BLOG_POSTS);
}

export async function getCmsTestimonials(): Promise<Array<{ name: string; country: string; text: string; tour: string; rating: number }>> {
  return loadCollection('/content/testimonials.json', TESTIMONIALS);
}

export async function getCmsFaqs(): Promise<Array<{ q: string; a: string }>> {
  return loadCollection('/content/faqs.json', FAQS);
}

export const CMS_IMAGES = IMAGES;
