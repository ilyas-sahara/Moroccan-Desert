import { BLOG_POSTS, TOURS, EXPERIENCES, TESTIMONIALS, FAQS, IMAGES, type BlogPost, type Tour } from '@/data/content';

export type SiteSettings = {
  brand_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
};

export type HomePageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  intro_title: string;
  intro_subtitle: string;
  story_title: string;
  story_description: string;
  cta_label: string;
  cta_link: string;
};

export type AboutPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  intro_title: string;
  intro_description: string;
  values: Array<{ title: string; text: string }>;
};

export type ContactPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  office_text: string;
  phone: string;
  email: string;
};

const defaultSettings: SiteSettings = {
  brand_name: 'Walk the Sahara',
  tagline: 'Moroccan Desert Journeys',
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
  instagram_url: '#',
  facebook_url: '#',
};

const defaultHome: HomePageContent = {
  hero_eyebrow: 'The Journey',
  hero_title: 'The desert changes everyone who walks into it.',
  hero_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace.',
  intro_title: 'The Sahara changes everyone who walks into it.',
  intro_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace. This is the Sahara as it has always been — vast, silent, and impossibly beautiful.',
  story_title: 'The Sahara has one of the darkest skies on earth.',
  story_description: 'Far from any city light, the dunes of Erg Chebbi become an observatory. Our guides will point out the Milky Way, the planets, and the stories the Berber people have told the stars for centuries.',
  cta_label: 'Plan Your Journey',
  cta_link: '/contact',
};

const defaultAbout: AboutPageContent = {
  hero_eyebrow: 'Our Story',
  hero_title: 'Born at the edge of the dunes',
  hero_subtitle: 'Walk the Sahara began with a single Berber family in Merzouga and a belief that the desert should be shared with care.',
  intro_title: 'A family of guides, not a company.',
  intro_description: 'We are a small collective of Berber guides and camp hosts from the Erg Chebbi region. We grew up walking these dunes, and we started Walk the Sahara to share them with travelers who want more than a photo stop.',
  values: [
    { title: 'Local First', text: 'Every guide is Berber, born and raised at the edge of the dunes. The money you spend stays in the desert.' },
    { title: 'Leave No Trace', text: 'Our camps are fully removable. We pack out every trace and protect the fragile dune ecology.' },
    { title: 'Small Groups', text: 'We cap every departure at a handful of guests. The desert is for silence, not crowds.' },
    { title: 'Genuine Craft', text: 'We weave real encounters with nomad families, weavers, and musicians — never staged shows.' },
  ],
};

const defaultContact: ContactPageContent = {
  hero_eyebrow: 'Contact',
  hero_title: "Let's plan your Sahara",
  hero_subtitle: "Tell us your dates, your group, and your dream — we'll reply within 24 hours with a tailored proposal.",
  office_text: "Prefer to talk it through? Reach us directly — we're based in Merzouga, on the edge of the dunes.",
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
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

export async function getSiteSettings(): Promise<SiteSettings> {
  return loadJson('/content/site/settings.json', defaultSettings);
}

export async function getHomePageContent(): Promise<HomePageContent> {
  return loadJson('/content/site/home.json', defaultHome);
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  return loadJson('/content/site/about.json', defaultAbout);
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  return loadJson('/content/site/contact.json', defaultContact);
}

export async function getCmsTours(): Promise<Tour[]> {
  try {
    const tours = await loadJson<Tour[]>('/content/tours.json', TOURS);
    return tours.length ? tours : TOURS;
  } catch {
    return TOURS;
  }
}

export async function getCmsExperiences(): Promise<Array<{ title: string; description: string; image: string; icon: string }>> {
  try {
    const experiences = await loadJson<Array<{ title: string; description: string; image: string; icon: string }>>('/content/experiences.json', EXPERIENCES);
    return experiences.length ? experiences : EXPERIENCES;
  } catch {
    return EXPERIENCES;
  }
}

export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await loadJson<BlogPost[]>('/content/blog.json', BLOG_POSTS);
    return posts.length ? posts : BLOG_POSTS;
  } catch {
    return BLOG_POSTS;
  }
}

export async function getCmsTestimonials(): Promise<Array<{ name: string; country: string; text: string; tour: string; rating: number }>> {
  try {
    const testimonials = await loadJson<Array<{ name: string; country: string; text: string; tour: string; rating: number }>>('/content/testimonials.json', TESTIMONIALS);
    return testimonials.length ? testimonials : TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}

export async function getCmsFaqs(): Promise<Array<{ q: string; a: string }>> {
  try {
    const faqs = await loadJson<Array<{ q: string; a: string }>>('/content/faqs.json', FAQS);
    return faqs.length ? faqs : FAQS;
  } catch {
    return FAQS;
  }
}

export const CMS_IMAGES = IMAGES;
