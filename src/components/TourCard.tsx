import { Link } from 'react-router-dom';
import { Clock, Users, ArrowUpRight, Star, MapPin } from 'lucide-react';
import type { Tour } from '@/data/content';

export default function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const delay = `reveal-delay-${Math.min(index % 4, 4) + 1}`;
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className={`reveal ${delay} group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50 card-lift`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-800">
          {tour.region.split('·')[0].trim()}
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-ink-950/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-sand-300 text-sand-300" />
          {tour.rating}
          <span className="text-white/60">({tour.reviews})</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand-600">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={1.5} />{tour.duration}</span>
          <span className="h-3 w-px bg-sand-200" />
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" strokeWidth={1.5} />{tour.groupSize}</span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-medium text-ink-900">{tour.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{tour.subtitle}</p>

        <div className="mt-5 flex items-end justify-between border-t border-sand-100 pt-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-sand-500">From</p>
            <p className="font-display text-2xl font-semibold text-ink-900">
              €{tour.priceFrom}
              {tour.days > 0 && <span className="ml-1 text-xs font-normal text-ink-400">/ person</span>}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-sand-700 transition-colors group-hover:text-sand-800">
            View
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 hidden items-center gap-1.5 text-xs text-sand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> {tour.region}
      </div>
    </Link>
  );
}
