import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Tent, Star, Coffee, Users, Mountain, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { EXPERIENCES, IMAGES } from '@/data/content';
import { getCmsExperiences } from '@/data/cms';

const ICONS: Record<string, typeof Compass> = {
  Compass, Tent, Star, Coffee, Users, Mountain,
};

export default function Experiences() {
  const ref = useReveal<HTMLDivElement>();
  const [experiences, setExperiences] = useState(EXPERIENCES);

  useEffect(() => {
    void (async () => {
      const cmsExperiences = await getCmsExperiences();
      setExperiences(cmsExperiences);
    })();
  }, []);

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={IMAGES.campBerber} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow="Experiences"
            title="The small moments that make a journey"
            subtitle="Every Walk the Sahara trip is built from these threads. Browse them, then let us weave them into something just for you."
          />
        </div>
      </section>

      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="container-x">
          <div ref={ref} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => {
              const Icon = ICONS[exp.icon] ?? Compass;
              return (
                <article
                  key={exp.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50 card-lift`}
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img src={exp.image} alt={exp.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-sand-50/95 text-sand-700">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-medium text-ink-900">{exp.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{exp.description}</p>
                    <Link to="/tours" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sand-700 hover:text-sand-800">
                      Find tours with this <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.sunrise} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container-x relative z-10 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium text-white text-balance sm:text-4xl">
            Want all of these in one journey?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sand-200/85">
            We build bespoke itineraries that combine any of these experiences into a single, seamless trip.
          </p>
          <Link to="/contact" className="btn-light mt-9">Plan a Bespoke Journey</Link>
        </div>
      </section>
    </main>
  );
}
