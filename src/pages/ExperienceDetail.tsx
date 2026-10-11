import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Calendar, Check, MapPin, Compass, ChevronRight } from 'lucide-react';
import { EXPERIENCE_ITEMS, type ExperienceItem, type ExperienceKind } from '@/data/content';
import { getCmsExperienceItems, bundledCmsExperiences } from '@/data/cms';
import { useSeo, SITE_URL } from '@/hooks/useSeo';
import { useLocale, type TranslationKey } from '@/i18n';
import { experienceAlternatePaths } from '@/data/slug-map';
import { responsiveImage } from '@/utils/responsiveImage';
import PageLoader from '@/components/PageLoader';
import SectionHeading from '@/components/SectionHeading';
import JsonLd from '@/components/JsonLd';
import BookingRequestForm from '@/components/BookingRequestForm';

const KIND_LABEL: Record<ExperienceKind, TranslationKey> = {
  activity: 'expDetail.kinds.activity',
  festival: 'expDetail.kinds.festival',
  retreat: 'expDetail.kinds.retreat',
};

export default function ExperienceDetail() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const [items, setItems] = useState<ExperienceItem[]>(() => bundledCmsExperiences(locale) ?? EXPERIENCE_ITEMS);
  const [dataReady, setDataReady] = useState<boolean>(() => bundledCmsExperiences(locale) !== undefined);
  const item = items.find((i) => i.slug === slug);

  useEffect(() => {
    void (async () => {
      const cmsItems = await getCmsExperienceItems(locale);
      setItems(cmsItems);
      setDataReady(true);
    })();
  }, [locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const kindLabel = item ? t(KIND_LABEL[item.kind]) : '';
  const alternates = item ? experienceAlternatePaths(item.slug) : undefined;

  useSeo(
    item
      ? {
          title: `${item.title} – ${kindLabel} | Sahara Vacation`,
          description: item.subtitle,
          path: `/experiences/${item.slug}`,
          image: item.image,
          alternatePaths: alternates,
        }
      : dataReady
        ? {
            title: t('expDetail.notFound'),
            description: t('seo.notFoundDescription'),
            path: '/experiences',
          }
        : null,
  );

  if (!dataReady && !item) return <PageLoader />;

  if (!item) {
    return (
      <main className="pt-32">
        <div className="container-x py-24 text-center">
          <h1 className="font-display text-4xl text-ink-900">{t('expDetail.notFound')}</h1>
          <Link to="/experiences" className="btn-primary mt-8">{t('expDetail.backToExperiences')}</Link>
        </div>
      </main>
    );
  }

  const itemUrl = `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/experiences/${item.slug}/`;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.title,
    description: item.subtitle,
    image: item.image,
    url: itemUrl,
    serviceType: kindLabel,
    provider: { '@type': 'Organization', name: 'Sahara Vacation' },
    areaServed: { '@type': 'Country', name: 'Morocco' },
    ...(item.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            price: item.priceFrom,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: itemUrl,
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/` },
      { '@type': 'ListItem', position: 2, name: t('nav.experiences'), item: `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/experiences/` },
      { '@type': 'ListItem', position: 3, name: item.title, item: itemUrl },
    ],
  };

  const facts = [
    { icon: Clock, label: t('tours.duration'), value: item.duration },
    { icon: Users, label: t('tours.groupSizeLabel'), value: item.groupSize },
    { icon: Calendar, label: t('expDetail.when'), value: item.scheduleNote ?? item.bestSeason },
    { icon: MapPin, label: t('expDetail.where'), value: item.region },
  ];

  return (
    <main className="pt-20">
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumb */}
      <div className="border-b border-sand-200/60 bg-sand-50">
        <div className="container-x flex items-center gap-2 overflow-x-auto py-4 text-xs text-sand-600">
          <Link to="/" className="hover:text-sand-800">{t('nav.home')}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/experiences" className="hover:text-sand-800">{t('nav.experiences')}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-ink-800">{item.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={responsiveImage(item.image, { sizes: '100vw' }).src} srcSet={responsiveImage(item.image, { sizes: '100vw' }).srcSet} sizes="100vw" alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950/60" />
        </div>
        <div className="container-x relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-sand-50/95 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-800">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {kindLabel}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight text-white text-balance sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-200/90">{item.subtitle}</p>
        </div>
      </section>

      {/* Facts + content */}
      <section className="bg-sand-50 py-12 lg:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl bg-sand-100/60 p-4">
                  <f.icon className="h-5 w-5 text-sand-600" strokeWidth={1.5} />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-sand-500">{f.label}</p>
                  <p className="text-sm font-semibold text-ink-800">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('expDetail.overview')}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700">{item.overview}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('expDetail.highlights')}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl bg-sand-100/50 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-200 text-sand-800">
                      <Compass className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-medium text-ink-900">{t('expDetail.whatsIncluded')}</h2>
              <ul className="mt-5 space-y-3">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-oasis-100 text-oasis-700">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink-700">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {item.gallery.length > 1 && (
              <div className="mt-12 grid grid-cols-3 gap-4">
                {item.gallery.map((src, i) => (
                  <div key={`${src}-${i}`} className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img src={responsiveImage(src, { sizes: '25vw' }).src} srcSet={responsiveImage(src, { sizes: '25vw' }).srcSet} sizes="25vw" alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking sidebar */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-white p-7 shadow-lg ring-1 ring-sand-200/60">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sand-500">
                  {item.priceFrom ? t('common.from') : t('experiences.priceOnRequest')}
                </p>
                <p className="font-display text-4xl font-semibold text-ink-900">
                  {item.priceFrom ? (
                    <>€{item.priceFrom}<span className="ml-1 text-sm font-normal text-ink-400">{t('common.perPerson')}</span></>
                  ) : (
                    <span className="text-2xl">{t('experiences.bookOnRequest')}</span>
                  )}
                </p>
                <div className="mt-6 space-y-3 border-y border-sand-100 py-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">{t('tours.duration')}</span>
                    <span className="font-semibold text-ink-800">{item.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">{t('tours.groupSizeLabel')}</span>
                    <span className="font-semibold text-ink-800">{item.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">{t('tours.bestSeason')}</span>
                    <span className="font-semibold text-ink-800">{item.bestSeason}</span>
                  </div>
                  {item.scheduleNote && (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-500">{t('expDetail.when')}</span>
                      <span className="font-semibold text-ink-800">{item.scheduleNote}</span>
                    </div>
                  )}
                </div>
                <a href={`/contact?tour=${encodeURIComponent(item.title)}`} className="btn-ghost mt-5 w-full">
                  {t('expDetail.askQuestion')}
                </a>
              </div>
              <BookingRequestForm itemTitle={item.title} itemType={kindLabel} itemRegion={item.region} />
            </div>
          </aside>
        </div>
      </section>

      {/* More experiences */}
      <section className="bg-sand-100/40 py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading eyebrow={t('experiences.findTours')} title={t('expDetail.moreExperiences')} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 3).map((other) => (
              <Link key={other.slug} to={`/experiences/${other.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={responsiveImage(other.image, { sizes: '33vw' }).src} srcSet={responsiveImage(other.image, { sizes: '33vw' }).srcSet} sizes="33vw" alt={other.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-500">{t(KIND_LABEL[other.kind])}</p>
                  <h3 className="mt-1 font-display text-lg font-medium text-ink-900">{other.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-sand-50 py-10">
        <div className="container-x">
          <Link to="/experiences" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sand-700 hover:text-sand-800">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> {t('expDetail.backToExperiences')}
          </Link>
        </div>
      </div>
    </main>
  );
}