import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, Users, Mountain, Calendar, Check, X,
  MapPin, Compass, ChevronRight,
} from 'lucide-react';
import { TOURS, type Tour } from '@/data/content';
import { getCmsTours } from '@/data/cms';
import { useReveal } from '@/hooks/useReveal';
import { useSeo, SITE_URL } from '@/hooks/useSeo';
import { useLocale } from '@/i18n';
import TourCard from '@/components/TourCard';
import TourMap from '@/components/TourMap';
import SectionHeading from '@/components/SectionHeading';
import JsonLd from '@/components/JsonLd';

export default function TourDetail() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const [tours, setTours] = useState<Tour[]>(TOURS);
  const tour = tours.find((t) => t.slug === slug) as Tour | undefined;
  const [activeImg, setActiveImg] = useState(0);
  const ref = useReveal<HTMLOListElement>();

  useEffect(() => {
    void (async () => {
      const cmsTours = await getCmsTours(locale);
      setTours(cmsTours);
    })();
  }, [locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
  }, [slug]);

  useSeo({
    title: tour ? t('seo.tourTitle', { name: tour.title }) : t('seo.notFoundTitle'),
    description: tour
      ? t('seo.tourDescription', { name: tour.title, region: tour.region })
      : t('seo.notFoundDescription'),
    path: tour ? `/tours/${tour.slug}` : '/tours',
    image: tour?.image,
  });

  if (!tour) {
    return (
      <main className="pt-32">
        <div className="container-x py-24 text-center">
          <h1 className="font-display text-4xl text-ink-900">{t('tours.journeyNotFound')}</h1>
          <Link to="/tours" className="btn-primary mt-8">{t('tours.backToAllTours')}</Link>
        </div>
      </main>
    );
  }

  const related = tours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  const tourUrl = `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/tours/${tour.slug}`;
  const tourProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    description: tour.subtitle,
    image: tour.gallery,
    url: tourUrl,
    brand: { '@type': 'Brand', name: 'Walk the Sahara' },
    offers: {
      '@type': 'Offer',
      price: tour.priceFrom,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: tourUrl,
    },
    ...(tour.rating > 0 && tour.reviews > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: tour.rating, reviewCount: tour.reviews } }
      : {}),
  };

  return (
    <main className="pt-20">
      <JsonLd data={tourProduct} />
      {/* Breadcrumb */}
      <div className="border-b border-sand-200/60 bg-sand-50">
        <div className="container-x flex items-center gap-2 py-4 text-xs text-sand-600">
          <Link to="/" className="hover:text-sand-800">{t('nav.home')}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/tours" className="hover:text-sand-800">{t('nav.tours')}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink-800">{tour.title}</span>
        </div>
      </div>

      {/* Gallery hero */}
      <section className="bg-sand-100/40 py-10 lg:py-14">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <img
                  key={activeImg}
                  src={tour.gallery[activeImg]}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                  style={{ animation: 'fade-in 0.6s ease-out' }}
                />
                <div className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-800">
                  {tour.region}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 lg:col-span-4 lg:grid-cols-2">
              {tour.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl ring-2 transition-all ${
                    i === activeImg ? 'ring-sand-600' : 'ring-transparent hover:ring-sand-300'
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Title + quick facts */}
      <section className="bg-sand-50 py-12 lg:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sand-600">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />{tour.region}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink-900 sm:text-5xl text-balance">
              {tour.title}
            </h1>
            <p className="mt-3 text-lg text-ink-600">{tour.subtitle}</p>

            {/* Quick facts row */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Clock, label: t('tours.duration'), value: tour.duration },
                { icon: Users, label: t('tours.groupSizeLabel'), value: tour.groupSize },
                { icon: Mountain, label: t('tours.level'), value: tour.difficulty },
                { icon: Calendar, label: t('tours.bestSeason'), value: tour.bestSeason },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-sand-100/60 p-4">
                  <f.icon className="h-5 w-5 text-sand-600" strokeWidth={1.5} />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-sand-500">{f.label}</p>
                  <p className="text-sm font-semibold text-ink-800">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('tours.overview')}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700">{tour.overview}</p>
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('tours.highlights')}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl bg-sand-100/50 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-200 text-sand-800">
                      <Compass className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('tours.itinerary')}</h2>
              <ol ref={ref} className="mt-6 space-y-4">
                {tour.itinerary.map((day, i) => (
                  <li
                    key={day.day}
                    className={`reveal reveal-delay-${Math.min(i, 4) + 1} flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200/50`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-800 font-display text-lg font-semibold text-sand-50">
                        {day.day}
                      </span>
                      {i < tour.itinerary.length - 1 && <span className="mt-2 w-px flex-1 bg-sand-200" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-sand-500">{t('tours.day', { day: day.day })}</p>
                      <h3 className="mt-1 font-display text-xl font-medium text-ink-900">{day.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{day.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Included / not included */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-medium text-ink-900">{t('tours.whatsIncluded')}</h2>
                <ul className="mt-5 space-y-3">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-oasis-100 text-oasis-700">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-ink-900">{t('tours.notIncluded')}</h2>
                <ul className="mt-5 space-y-3">
                  {tour.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay-100 text-clay-600">
                        <X className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-white p-7 shadow-lg ring-1 ring-sand-200/60">
              <TourMap tour={tour} className="mb-6" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-sand-500">{t('common.from')}</p>
              <p className="font-display text-4xl font-semibold text-ink-900">
                €{tour.priceFrom}
                {tour.days > 0 && <span className="ml-1 text-sm font-normal text-ink-400">{t('common.perPerson')}</span>}
              </p>

              <div className="mt-6 space-y-3 border-y border-sand-100 py-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">{t('tours.duration')}</span>
                  <span className="font-semibold text-ink-800">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">{t('tours.groupSizeLabel')}</span>
                  <span className="font-semibold text-ink-800">{tour.groupSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">{t('tours.bestSeason')}</span>
                  <span className="font-semibold text-ink-800">{tour.bestSeason}</span>
                </div>
              </div>

              <Link to={`/contact?tour=${encodeURIComponent(tour.title)}`} className="btn-primary mt-6 w-full">
                {t('tours.bookThisJourney')}
              </Link>
              <Link to={`/contact?tour=${encodeURIComponent(tour.title)}`} className="btn-ghost mt-3 w-full">
                {t('tours.askQuestion')}
              </Link>
              <p className="mt-5 text-center text-xs text-sand-500">
                {t('tours.freeCancellation')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="bg-sand-100/40 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={t('tours.keepExploring')} title={t('tours.youMayAlsoLike')} />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-sand-50 py-10">
        <div className="container-x">
          <Link to="/tours" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sand-700 hover:text-sand-800">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> {t('common.allTours')}
          </Link>
        </div>
      </div>
    </main>
  );
}
