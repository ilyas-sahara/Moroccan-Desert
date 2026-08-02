import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Star } from 'lucide-react';
import { IMAGES } from '@/data/content';
import type { HeroFrame } from '@/data/cms';

const FRAME_MS = 3000;

const DEFAULT_FRAMES: HeroFrame[] = [
  { image: IMAGES.heroAerial, caption: 'Scene 01 — Drone over the golden dunes of Merzouga' },
  { image: IMAGES.camelCaravan, caption: 'Scene 02 — A caravan follows the ridge at sunrise' },
  { image: IMAGES.campBerber, caption: 'Scene 03 — A luxury Berber camp nestled in the dunes' },
  { image: IMAGES.campfire, caption: 'Scene 04 — Mint tea is poured as the sun sets' },
  { image: IMAGES.heroAerial, caption: 'Ending — The camera rises over an endless sea of dunes' },
];

type HeroProps = {
  frames?: HeroFrame[];
  kicker?: string;
  heading?: string;
  lead?: string;
  rating?: string;
  reviewText?: string;
};

export default function Hero({
  frames: rawFrames,
  kicker = 'Moroccan Sahara · Est. 2009',
  heading = 'Walk the Sahara',
  lead = 'Luxury desert journeys through the golden dunes of Merzouga. Camel treks, Berber camps, and nights under the darkest sky on earth.',
  rating = '4.9',
  reviewText = 'from 1,200+ travelers worldwide',
}: HeroProps) {
  const frames = rawFrames && rawFrames.length ? rawFrames : DEFAULT_FRAMES;
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, FRAME_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [frames.length]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950">
      {/* Cinematic frame stack — stands in for the hero video */}
      <div className="absolute inset-0">
        {frames.map((frame, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== active}
          >
            <img
              src={frame.image}
              alt=""
              className={`h-full w-full object-cover ${i === active ? 'animate-ken-burns' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Grading overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/10 to-ink-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{ background: 'radial-gradient(circle at 60% 40%, #C08940 0%, transparent 60%)' }}
      />

      {/* Content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-24 pt-32 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <p
            className="eyebrow text-sand-200 opacity-0"
            style={{ animation: 'fade-up 0.9s ease-out 0.2s forwards' }}
          >
            <span className="h-px w-8 bg-sand-300" /> {kicker}
          </p>
          <h1
            className="mt-5 font-display text-5xl font-medium leading-[1.05] text-white text-balance opacity-0 sm:text-6xl lg:text-7xl"
            style={{ animation: 'fade-up 0.9s ease-out 0.4s forwards' }}
          >
            {heading}
          </h1>
          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/90 opacity-0 sm:text-xl"
            style={{ animation: 'fade-up 0.9s ease-out 0.6s forwards' }}
          >
            {lead}
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: 'fade-up 0.9s ease-out 0.8s forwards' }}
          >
            <Link to="/tours" className="btn-light">
              Explore Tours
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white/10"
            >
              Plan Your Journey
            </Link>
          </div>
          <div
            className="mt-10 flex items-center gap-5 opacity-0"
            style={{ animation: 'fade-up 0.9s ease-out 1s forwards' }}
          >
            <div className="flex items-center gap-1.5 text-sand-100">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-sand-300 text-sand-300" />
              ))}
            </div>
            <p className="text-sm text-sand-100/80">
              <span className="font-semibold text-white">{rating}</span> {reviewText}
            </p>
          </div>
        </div>
      </div>

      {/* Scene caption (bottom-left, subtle) */}
      <div className="absolute bottom-8 left-0 z-10 hidden w-full sm:block">
        <div className="container-x flex items-end justify-between">
          <p
            key={active}
            className="max-w-xs text-xs uppercase tracking-[0.24em] text-sand-100/70 opacity-0"
            style={{ animation: 'fade-in 0.8s ease-out 0.2s forwards' }}
          >
            {frames[active].caption}
          </p>
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {frames.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to scene ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-sand-200' : 'w-1.5 bg-sand-200/40 hover:bg-sand-200/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <ChevronDown className="h-5 w-5 animate-bounce text-sand-100/70" strokeWidth={1.5} />
      </div>
    </section>
  );
}
