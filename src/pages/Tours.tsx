import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import TourCard from '@/components/TourCard';
import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { TOURS } from '@/data/content';

const DIFFICULTIES = ['All', 'Gentle', 'Moderate', 'Adventurous'] as const;
const SORTS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'duration', label: 'Longest First' },
] as const;

export default function Tours() {
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>('All');
  const [sort, setSort] = useState<(typeof SORTS)[number]['id']>('recommended');
  const [query, setQuery] = useState('');
  const gridRef = useReveal<HTMLDivElement>();

  const filtered = useMemo(() => {
    let list = TOURS.filter((t) => (difficulty === 'All' ? true : t.difficulty === difficulty));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'duration':
        list = [...list].sort((a, b) => b.days - a.days);
        break;
    }
    return list;
  }, [difficulty, sort, query]);

  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/28829635/pexels-photo-28829635.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow="All Journeys"
            title="Find your way into the desert"
            subtitle="Every tour is led by local Berber guides, capped at small groups, and built around the rhythm of the dunes."
          />
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-20 z-30 border-b border-sand-200/60 bg-sand-50/90 backdrop-blur-md">
        <div className="container-x flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand-600 sm:flex">
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filter
            </span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  difficulty === d
                    ? 'bg-sand-800 text-sand-50'
                    : 'bg-sand-100 text-ink-700 hover:bg-sand-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tours or regions..."
                className="w-full rounded-full border border-sand-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200 sm:w-64"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number]['id'])}
              className="rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container-x">
          <p className="mb-8 text-sm text-sand-600">
            Showing <span className="font-semibold text-ink-800">{filtered.length}</span> of {TOURS.length} journeys
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sand-300 py-24 text-center">
              <p className="font-display text-2xl text-ink-700">No journeys match your search.</p>
              <button
                onClick={() => { setDifficulty('All'); setQuery(''); }}
                className="btn-ghost mt-6"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div ref={gridRef} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
