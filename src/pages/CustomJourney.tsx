import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, Compass, Mail, Minus, Plus, Send } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { CITY_LABELS, MOROCCO_PATH } from '@/data/morocco-map';
import { useLocale } from '@/i18n';
import { useSeo } from '@/hooks/useSeo';
import { getCustomJourneyPageContent, type CustomJourneyPageContent } from '@/data/cms';

const STOPS = [
  { id: 'marrakech', name: 'Marrakech', x: 44.13, y: 51.45 },
  { id: 'ait-ben-haddou', name: 'Aït Ben Haddou', x: 50.82, y: 56.84 },
  { id: 'ouarzazate', name: 'Ouarzazate', x: 52.68, y: 57.89 },
  { id: 'zagora', name: 'Zagora', x: 60.97, y: 63.45 },
  { id: 'mhamid', name: "M'Hamid", x: 61.89, y: 68.15 },
  { id: 'erg-chigaga', name: 'Erg Chigaga', x: 57.73, y: 68.12 },
  { id: 'merzouga', name: 'Merzouga', x: 75.21, y: 56.51 },
] as const;

const INTERESTS = ['camel', 'camping', 'fourxfour', 'nomad', 'stargazing', 'kasbahs', 'sandboarding'] as const;
type InterestKey = (typeof INTERESTS)[number];

export default function CustomJourney() {
  const { locale, t } = useLocale();
  const [interests, setInterests] = useState<InterestKey[]>(['camping']);
  const [sent, setSent] = useState(false);
  const [dayCount, setDayCount] = useState(3);
  const [dayPlans, setDayPlans] = useState(['marrakech', 'ait-ben-haddou', 'erg-chigaga']);
  const [pageContent, setPageContent] = useState<CustomJourneyPageContent>({
    hero_eyebrow: 'Build your own journey',
    hero_title: 'Your Sahara, mapped your way.',
    hero_subtitle: 'Choose the places, pace, and experiences that matter to you. Our local team will turn them into a considered private itinerary.',
    hero_image: '',
  });

  useSeo({
    title: t('seo.customTitle'),
    description: t('seo.customDescription'),
    path: '/custom-journey',
    image: pageContent.hero_image,
  });

  useEffect(() => {
    void (async () => {
      const content = await getCustomJourneyPageContent(locale);
      setPageContent(content);
    })();
  }, [locale]);

  const toggleInterest = (interest: InterestKey) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  const setNumberOfDays = (count: number) => {
    const nextCount = Math.max(1, Math.min(14, count));
    setDayCount(nextCount);
    setDayPlans((current) => Array.from({ length: nextCount }, (_, index) => current[index] ?? ''));
  };

  const setDayPlan = (index: number, value: string) => {
    setDayPlans((current) => current.map((plan, planIndex) => planIndex === index ? value : plan));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get('phone') ?? '');
    const date = String(data.get('date') ?? '');
    const travelers = String(data.get('travelers') ?? '');
    const pickupLocation = String(data.get('pickupLocation') ?? '');
    const notes = String(data.get('notes') ?? '');
    const body = [
      t('custom.emailBody.title'),
      '',
      t('custom.emailBody.name', { value: String(data.get('name') ?? '') }),
      t('custom.emailBody.email', { value: String(data.get('email') ?? '') }),
      phone ? t('custom.emailBody.phone', { value: phone }) : t('custom.emailBody.phoneNotProvided'),
      date ? t('custom.emailBody.date', { value: date }) : t('custom.emailBody.dateFlexible'),
      travelers ? t('custom.emailBody.travelers', { value: travelers }) : t('custom.emailBody.travelersNotSpecified'),
      t('custom.emailBody.comfort', { value: String(data.get('comfort') ?? '') }),
      t('custom.emailBody.pickup', {
        value: String(data.get('pickupType') ?? ''),
        location: pickupLocation || t('custom.emailBody.pickupToBeConfirmed'),
      }),
      t('custom.emailBody.dayByDay'),
      ...dayPlans.map((id, index) =>
        t('custom.emailBody.day', {
          n: index + 1,
          stop: STOPS.find((stop) => stop.id === id)?.name ?? t('custom.emailBody.open'),
        }),
      ),
      interests.length
        ? t('custom.emailBody.interests', { value: interests.map((key) => t(`custom.interests.${key}`)).join(', ') })
        : t('custom.emailBody.noPreferences'),
      '',
      notes ? t('custom.emailBody.notes', { value: notes }) : t('custom.emailBody.none'),
    ].join('\n');
    window.location.href = `mailto:hello@walkthesahara.com?subject=${encodeURIComponent(t('custom.emailBody.subject'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-28">
        <div className="absolute inset-0">
          <img src={pageContent.hero_image} alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/50 via-ink-950/25 to-ink-950/10" />
        </div>
        <div className="container-x relative z-10 max-w-4xl">
          <SectionHeading light eyebrow={pageContent.hero_eyebrow} title={pageContent.hero_title} subtitle={pageContent.hero_subtitle} />
        </div>
      </section>

      <section className="bg-sand-100/50 py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/70 sm:p-10">
                <SectionHeading eyebrow={t('custom.eyebrow')} title={t('custom.stepTitle')} subtitle={t('custom.stepSubtitle')} />
                {sent && <div className="mt-6 rounded-xl bg-oasis-100 p-4 text-sm text-oasis-700">{t('custom.sent')}</div>}
                <form onSubmit={submit} className="mt-8 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label={t('custom.yourName')} name="name" required /><Input label={t('contact.email')} name="email" type="email" required />
                    <Input label={t('custom.phoneWhatsApp')} name="phone" type="tel" /><Input label={t('custom.preferredStartDate')} name="date" type="date" />
                    <Input label={t('custom.travelers')} name="travelers" type="number" required min={1} max={50} placeholder={t('custom.travelerPlaceholder')} />
                  </div>
                  <div className="rounded-2xl bg-sand-100/60 p-5">
                    <h3 className="font-display text-xl text-ink-900">{t('custom.pickupTitle')}</h3>
                    <p className="mt-1 text-sm text-ink-600">{t('custom.pickupDesc')}</p>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2"><Select label={t('custom.pickupPref')} name="pickupType" options={[t('custom.pickupOptions.hotel'), t('custom.pickupOptions.airport'), t('custom.pickupOptions.location'), t('custom.pickupOptions.recommendation')]} /><Input label={t('custom.pickupLocation')} name="pickupLocation" placeholder={t('custom.pickupLocationPlaceholder')} /></div>
                  </div>
                  <div className="rounded-2xl bg-sand-100/60 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-display text-xl text-ink-900">{t('custom.itineraryTitle')}</h3><p className="mt-1 text-sm text-ink-600">{t('custom.itineraryDesc')}</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => setNumberOfDays(dayCount - 1)} disabled={dayCount === 1} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 disabled:opacity-40"><Minus className="h-4 w-4" /></button><span className="min-w-16 text-center text-sm font-semibold text-ink-800">{t('custom.days', { count: dayCount })}</span><button type="button" onClick={() => setNumberOfDays(dayCount + 1)} disabled={dayCount === 14} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-800 text-white disabled:opacity-40"><Plus className="h-4 w-4" /></button></div></div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">{dayPlans.map((plan, index) => <div key={index} className="flex items-center gap-3 rounded-xl bg-white p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-800 text-xs font-semibold text-white">{index + 1}</span><select value={plan} onChange={(event) => setDayPlan(index, event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-ink-800 focus:outline-none"><option value="">{t('custom.guideRecommendation')}</option>{STOPS.map((stop) => <option key={stop.id} value={stop.id}>{stop.name}</option>)}</select></div>)}</div>
                  </div>
                  <Select label={t('custom.comfortLabel')} name="comfort" options={[t('custom.comfortOptions.bivouac'), t('custom.comfortOptions.comfortable'), t('custom.comfortOptions.luxury'), t('custom.comfortOptions.mix')]} />
                  <div><label className="mb-2 block text-sm font-medium text-ink-700">{t('custom.interestsLabel')}</label><div className="flex flex-wrap gap-2">{INTERESTS.map((interest) => <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`rounded-full px-4 py-2 text-sm transition-colors ${interests.includes(interest) ? 'bg-sand-800 text-sand-50' : 'bg-sand-100 text-ink-700 hover:bg-sand-200'}`}>{interests.includes(interest) ? <Check className="mr-1 inline h-4 w-4" /> : <Plus className="mr-1 inline h-4 w-4" />}{t(`custom.interests.${interest}`)}</button>)}</div></div>
                  <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{t('custom.anythingElse')}</label><textarea name="notes" rows={5} placeholder={t('custom.notesPlaceholder')} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>
                  <button type="submit" className="btn-primary"><Send className="h-4 w-4" />{t('custom.sendRequest')}</button>
                  <p className="flex items-center gap-2 text-xs text-sand-600"><Mail className="h-4 w-4" />{t('custom.emailHint')}</p>
                </form>
              </div>
            </div>

            {/* Live map */}
            <div className="lg:col-span-5">
              <JourneyMap dayPlans={dayPlans} dayCount={dayCount} interests={interests} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function JourneyMap({ dayPlans, dayCount, interests }: { dayPlans: string[]; dayCount: number; interests: InterestKey[] }) {
  const { t } = useLocale();
  const routeStops = useMemo(
    () => dayPlans
      .map((id) => STOPS.find((stop) => stop.id === id))
      .filter((stop): stop is (typeof STOPS)[number] => Boolean(stop)),
    [dayPlans],
  );
  const points = routeStops.map((stop) => `${stop.x},${stop.y}`).join(' ');

  const dayByStop = useMemo(() => {
    const map = new Map<string, number>();
    dayPlans.forEach((id, index) => { if (id && !map.has(id)) map.set(id, index + 1); });
    return map;
  }, [dayPlans]);

  return (
    <aside className="sticky top-28 max-h-[calc(100vh-7rem)] scrollbar-hide overflow-y-auto rounded-3xl bg-white p-6 shadow-lg shadow-sand-900/10 ring-1 ring-sand-200/60 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow"><span className="hairline" /> {t('custom.yourRoute')}</p>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink-900">{t('custom.journeyTakesShape')}</h2>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-oasis-100 px-3 py-1.5 text-xs font-semibold text-oasis-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-oasis-500" /> {t('custom.live')}
        </span>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl bg-sand-100/60">
        <svg viewBox="26 45 56 28" className="block aspect-[2/1] w-full" role="img" aria-label={t('custom.mapAria')}>
          <defs>
            <linearGradient id="africa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1E7D3" />
              <stop offset="100%" stopColor="#E8DAC0" />
            </linearGradient>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAD9B8" />
              <stop offset="100%" stopColor="#DDBF8A" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="100" height="100" fill="url(#africa)" />

          <path d={MOROCCO_PATH} fill="url(#land)" stroke="#C08940" strokeWidth="0.6" strokeLinejoin="round" />

          <g pointerEvents="none" fill="#855529" fontSize="2" fontWeight="500">
            <text x="54.2" y="48.9" textAnchor="middle" fontSize="1.7" opacity="0.8">High Atlas</text>
            <text x="80.9" y="59.5" transform="rotate(-90 80.9 59.5)" textAnchor="middle" fontSize="1.6" opacity="0.8">Algeria</text>
            <text x="46" y="70.8" textAnchor="middle" fontSize="2.2" opacity="0.9">Sahara</text>
          </g>

          {routeStops.length > 1 && (
            <g>
              <path id="routePath" d={`M ${points}`} fill="none" />
              <polyline points={points} fill="none" stroke="#EAD9B8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points={points} fill="none" stroke="#A66F33" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.2 1.1" className="route-line" />
              <circle r="1.7" fill="#B85F44" stroke="#FBF7F0" strokeWidth="0.7">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#routePath" />
                </animateMotion>
              </circle>
            </g>
          )}

          {STOPS.map((stop) => {
            const day = dayByStop.get(stop.id);
            const label = CITY_LABELS[stop.id];
            return (
              <g key={stop.id}>
                {day ? (
                  <>
                    <circle className="pin-halo" cx={stop.x} cy={stop.y} r="2.7" fill="#A66F33" />
                    <circle cx={stop.x} cy={stop.y} r="2.3" fill="#634022" stroke="#FBF7F0" strokeWidth="0.7" />
                    <text x={stop.x} y={stop.y} dy="0.85" textAnchor="middle" fontSize="2.1" fontWeight="700" fill="#FBF7F0" pointerEvents="none">{day}</text>
                  </>
                ) : (
                  <circle cx={stop.x} cy={stop.y} r="1.4" fill="#EAD9B8" stroke="#855529" strokeWidth="0.5" opacity="0.9" />
                )}
                <text
                  x={stop.x + label.dx}
                  y={stop.y + label.dy}
                  textAnchor={label.anchor}
                  fontSize={day ? 2.3 : 2}
                  fontWeight={day ? 600 : 500}
                  fill={day ? '#422C19' : '#855529'}
                  stroke="#FBF7F0"
                  strokeWidth="0.4"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  {stop.name}
                </text>
              </g>
            );
          })}
        </svg>

        <span className="absolute -top-4 -right-4 flex h-12 w-12 animate-float items-center justify-center rounded-full bg-sand-800 text-sand-50 shadow-lg">
          <Compass className="h-6 w-6" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-sand-600">
          <span>{t('custom.dayByDay')}</span>
          <span>{t('custom.days', { count: dayCount })} · {t('custom.stops', { count: routeStops.length })}</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {Array.from({ length: dayCount }, (_, index) => {
            const stop = STOPS.find((s) => s.id === dayPlans[index]);
            return (
              <div key={index} className="flex items-center gap-3 rounded-xl bg-sand-100/60 px-3 py-2 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-800 text-[11px] font-semibold text-sand-50">{index + 1}</span>
                <span className={stop ? 'font-medium text-ink-800' : 'text-sand-600'}>{stop ? stop.name : t('custom.guideRecommendation')}</span>
                {stop && <span className="ml-auto hidden text-xs text-sand-500 sm:block">{t(`custom.stopDescriptions.${stop.id}`)}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 border-t border-sand-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-600">{t('custom.experiencesLabel')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.length ? (
            interests.map((interest) => (
              <span key={interest} className="rounded-full bg-oasis-100 px-3 py-1 text-xs font-medium text-oasis-700">{t(`custom.interests.${interest}`)}</span>
            ))
          ) : (
            <span className="text-xs text-sand-500">{t('custom.noExperiences')}</span>
          )}
        </div>
      </div>
    </aside>
  );
}

function Input({ label, name, type = 'text', required = false, placeholder, min, max }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; min?: number; max?: number }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><input name={name} type={type} required={required} placeholder={placeholder} min={min} max={max} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>;
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><select name={name} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}
