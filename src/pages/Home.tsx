import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Tent, Star, Coffee, Users, Mountain } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import TourCard from '@/components/TourCard';
import { useReveal } from '@/hooks/useReveal';
import { TOURS, EXPERIENCES, TESTIMONIALS, IMAGES, type Tour } from '@/data/content';
import { getCmsTours, getCmsExperiences, getCmsTestimonials, getHomePageContent } from '@/data/cms';

const ICONS: Record<string, typeof Compass> = {
  Compass, Tent, Star, Coffee, Users, Mountain,
};

export default function Home() {
  const featuredRef = useReveal<HTMLDivElement>();
  const expRef = useReveal<HTMLDivElement>();
  const storyRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const testimonialsRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const [homeContent, setHomeContent] = useState({
    hero_eyebrow: 'The Journey',
    hero_title: 'The desert changes everyone who walks into it.',
    hero_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace.',
    intro_title: 'The Sahara changes everyone who walks into it.',
    intro_subtitle: 'For fifteen years we have guided travelers into the golden dunes of the Moroccan Sahara. Small groups, local Berber guides, and camps built to disappear without a trace. This is the Sahara as it has always been — vast, silent, and impossibly beautiful.',
    story_title: 'The Sahara has one of the darkest skies on earth.',
    story_description: 'Far from any city light, the dunes of Erg Chebbi become an observatory. Our guides will point out the Milky Way, the planets, and the stories the Berber people have told the stars for centuries.',
    cta_label: 'Plan Your Journey',
    cta_link: '/contact',
  });
  const [tours, setTours] = useState<Tour[]>(TOURS);
  const [experiences, setExperiences] = useState(EXPERIENCES);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    void (async () => {
      const [pageContent, cmsTours, cmsExperiences, cmsTestimonials] = await Promise.all([
        getHomePageContent(),
        getCmsTours(),
        getCmsExperiences(),
        getCmsTestimonials(),
      ]);
      setHomeContent(pageContent);
      setTours(cmsTours);
      setExperiences(cmsExperiences);
      setTestimonials(cmsTestimonials);
    })();
  }, []);

  return (
    <main>
      <Hero />

      {/* Intro / brand statement */}
      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={homeContent.hero_eyebrow}
                title={homeContent.hero_title}
                subtitle={homeContent.intro_subtitle}
              />
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link to="/about" className="btn-primary">
                  Our Story <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
                <Link to="/tours" className="link-underline text-sm font-semibold uppercase tracking-[0.18em] text-ink-700">
                  Browse Tours
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.mintTeaCarpet} alt="Mint tea on a Moroccan carpet" loading="lazy" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lg" />
                <img src={IMAGES.camelTrek} alt="Camel trek on the dunes" loading="lazy" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="bg-sand-100/40 py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Signature Journeys"
              title="Tours crafted around the rhythm of the desert"
              subtitle="From a single night under the stars to a five-day crossing — every journey is led by local guides and built around small groups."
            />
            <Link to="/tours" className="btn-ghost shrink-0">
              All Tours <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>

          <div ref={featuredRef} className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {tours.slice(0, 3).map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What You'll Do"
            title="Experiences that stay with you"
            subtitle="Every journey is woven from small moments — the call of a camel driver, the first sip of mint tea, the silence of a sky full of stars."
          />
          <div ref={expRef} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => {
              const Icon = ICONS[exp.icon] ?? Compass;
              return (
                <div
                  key={exp.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50 card-lift`}
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img src={exp.image} alt={exp.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-sand-50/95 text-sand-700">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-ink-900">{exp.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{exp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story / split feature */}
      <section ref={storyRef} className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={IMAGES.stars} alt="" loading="lazy" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        </div>
        <div className="container-x relative z-10">
          <div className="max-w-xl">
            <span className="eyebrow text-sand-300"><span className="hairline" /> A Night Like No Other</span>
            <h2 className="reveal mt-4 font-display text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance">
              {homeContent.story_title}
            </h2>
            <p className="reveal reveal-delay-1 mt-5 text-base leading-relaxed text-sand-200/85 sm:text-lg">
              {homeContent.story_description}
            </p>
            <div className="reveal reveal-delay-2 mt-9 flex flex-wrap gap-4">
              <Link to={homeContent.cta_link} className="btn-light">
                {homeContent.cta_label}
              </Link>
              <Link to="/experiences" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10">
                See All Experiences
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / marquee */}
      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="The Landscape"
            title="A few moments from the dunes"
            subtitle="Gold, silence, and sky. The Sahara of Merzouga in pictures."
          />
        </div>
        <div ref={galleryRef} className="reveal mt-14 flex gap-4 overflow-hidden mask-fade-b">
          <div className="flex shrink-0 animate-marquee gap-4">
            {[IMAGES.heroAerial, IMAGES.camelCaravan, IMAGES.campBerber, IMAGES.campfire, IMAGES.mintTea, IMAGES.stars, IMAGES.ergChebbi, IMAGES.sunrise].map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" className="h-72 w-96 shrink-0 rounded-2xl object-cover" />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee gap-4" aria-hidden>
            {[IMAGES.heroAerial, IMAGES.camelCaravan, IMAGES.campBerber, IMAGES.campfire, IMAGES.mintTea, IMAGES.stars, IMAGES.ergChebbi, IMAGES.sunrise].map((src, i) => (
              <img key={`b-${i}`} src={src} alt="" loading="lazy" className="h-72 w-96 shrink-0 rounded-2xl object-cover" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand-100/40 py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Travelers' Words"
            title="What our guests carry home"
          />
          <div ref={testimonialsRef} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50`}
              >
                <div className="flex items-center gap-1 text-sand-500">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-sand-400 text-sand-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink-800">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-sand-100 pt-4">
                  <p className="font-semibold text-ink-900">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-sand-600">{t.country} · {t.tour}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative overflow-hidden bg-sand-800 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.duneRipples} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="container-x relative z-10 text-center">
          <h2 className="reveal mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Your journey into the Sahara begins with a single message.
          </h2>
          <p className="reveal reveal-delay-1 mx-auto mt-5 max-w-xl text-sand-100/85">
            Tell us your dates and your dream — we'll craft the rest.
          </p>
          <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-light">Plan Your Journey</Link>
            <Link to="/tours" className="inline-flex items-center gap-2 rounded-full border border-sand-200/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-sand-50 transition-colors hover:bg-sand-700/40">
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
