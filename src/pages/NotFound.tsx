import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { IMAGES } from '@/data/content';

export default function NotFound() {
  return (
    <main className="pt-20">
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={IMAGES.stars} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950/90" />
        </div>
        <div className="container-x relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow text-sand-300"><span className="hairline" /> Lost in the dunes</span>
            <p className="mt-6 font-display text-7xl font-medium text-white sm:text-8xl lg:text-9xl">404</p>
            <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-white text-balance sm:text-4xl">
              This trail doesn't appear on our maps.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-200/85">
              The page you're looking for has drifted with the wind. Let's get you back to
              firm ground.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/" className="btn-light">
                Back to Home <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
              >
                <Compass className="h-4 w-4" strokeWidth={1.75} /> Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
