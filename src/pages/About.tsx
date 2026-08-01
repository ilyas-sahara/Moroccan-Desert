import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Users, Compass, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { IMAGES } from '@/data/content';
import { getAboutPageContent, type AboutPageContent } from '@/data/cms';

const VALUE_ICONS: Record<string, typeof Compass> = { Users, Leaf, Heart, Compass };
const VALUES = [
  { icon: Users, title: 'Local First', text: 'Every guide is Berber, born and raised at the edge of the dunes. The money you spend stays in the desert.' },
  { icon: Leaf, title: 'Leave No Trace', text: 'Our camps are fully removable. We pack out every trace and protect the fragile dune ecology.' },
  { icon: Heart, title: 'Small Groups', text: 'We cap every departure at a handful of guests. The desert is for silence, not crowds.' },
  { icon: Compass, title: 'Genuine Craft', text: 'We weave real encounters with nomad families, weavers, and musicians — never staged shows.' },
];
const VALUE_ICON_BY_TITLE = Object.fromEntries(
  VALUES.map(({ icon, title }) => [title, icon]),
) as Record<string, typeof Compass>;

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  const [aboutContent, setAboutContent] = useState<AboutPageContent>({
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
  });

  useEffect(() => {
    void (async () => {
      const pageContent = await getAboutPageContent();
      setAboutContent(pageContent);
    })();
  }, []);

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={IMAGES.loneTraveler} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow={aboutContent.hero_eyebrow}
            title={aboutContent.hero_title}
            subtitle={aboutContent.hero_subtitle}
          />
        </div>
      </section>

      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <img src={IMAGES.campNomad} alt="Nomad camp" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who We Are"
              title={aboutContent.intro_title}
              subtitle={aboutContent.intro_description}
            />
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Fifteen years later we still lead every trip ourselves. No subcontractors, no scripted
              performances — just the desert, the people who know it, and a handful of guests at a time.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { n: '15+', l: 'Years guiding' },
                { n: '1,200+', l: 'Travelers hosted' },
                { n: '4.9', l: 'Average rating' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-semibold text-sand-800">{s.n}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sand-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-100/40 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="What We Believe" title="The principles behind every journey" />
          <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((v, i) => {
              const Icon = VALUE_ICONS[v.icon ?? ''] ?? VALUE_ICON_BY_TITLE[v.title] ?? Compass;
              return (
              <div
                key={v.title}
                className={`reveal reveal-delay-${(i % 4) + 1} rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 card-lift`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-sand-700">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sand-800 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.ergChebbi} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container-x relative z-10 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium text-white text-balance sm:text-4xl">
            Come walk the Sahara with us.
          </h2>
          <Link to="/tours" className="btn-light mt-9">
            Browse Tours <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </section>

      <Link
        to="/admin"
        aria-hidden="true"
        tabIndex={-1}
        className="fixed bottom-0 left-0 z-50 h-6 w-6 cursor-pointer opacity-0"
      />
    </main>
  );
}
