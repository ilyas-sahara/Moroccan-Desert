import { useId, useMemo } from 'react';
import type { Tour } from '@/data/content';
import { CITY_LABELS, MAP_STOPS, MOROCCO_PATH, TOUR_ROUTES } from '@/data/morocco-map';

type Palette = {
  bg: string;
  landTop: string;
  landBottom: string;
  border: string;
  route: string;
  routeSoft: string;
  dash: string;
  pin: string;
  pinStroke: string;
  text: string;
  label: string;
  labelStroke: string;
  dot: string;
  halo: string;
  midnight?: boolean;
};

const PALETTES: Palette[] = [
  {
    bg: '#F4E8D8', landTop: '#EFDDBE', landBottom: '#DFC08C', border: '#B2803C',
    route: '#C0562F', routeSoft: '#F3DFC8', dash: '#E8A33D', pin: '#8A4A2B', pinStroke: '#FDF7EE',
    text: '#8A6A44', label: '#5C3A1E', labelStroke: '#FDF7EE', dot: '#F2B35C', halo: '#C0562F',
  },
  {
    bg: '#E7EBDD', landTop: '#DCE6CB', landBottom: '#B7CAA0', border: '#6E8A52',
    route: '#4E7A4C', routeSoft: '#E3ECDA', dash: '#E8C65C', pin: '#2F5A33', pinStroke: '#F7FAF2',
    text: '#5E7048', label: '#2C4A2E', labelStroke: '#F7FAF2', dot: '#7FA85C', halo: '#4E7A4C',
  },
  {
    bg: '#1E2536', landTop: '#2E3A56', landBottom: '#202A40', border: '#5C6E96',
    route: '#7FA8D9', routeSoft: '#333F5E', dash: '#E8D08C', pin: '#B8D1F2', pinStroke: '#141A2A',
    text: '#8FA0C4', label: '#DCE6F5', labelStroke: '#141A2A', dot: '#F2E3B8', halo: '#7FA8D9',
    midnight: true,
  },
  {
    bg: '#F2E3E0', landTop: '#EED8D3', landBottom: '#D8B1AA', border: '#A46068',
    route: '#A4575E', routeSoft: '#F1DEDA', dash: '#E8A33D', pin: '#7A3A41', pinStroke: '#FDF6F4',
    text: '#8A6268', label: '#5A2C33', labelStroke: '#FDF6F4', dot: '#D98E5C', halo: '#A4575E',
  },
  {
    bg: '#F6EFDD', landTop: '#F1E3C0', landBottom: '#DFC07C', border: '#A87A28',
    route: '#B0802E', routeSoft: '#F0E4C2', dash: '#C2562F', pin: '#7A5C1C', pinStroke: '#FDF8EC',
    text: '#8A743E', label: '#57431A', labelStroke: '#FDF8EC', dot: '#C2562F', halo: '#B0802E',
  },
  {
    bg: '#E2E8F0', landTop: '#D8E2EE', landBottom: '#AFC0D8', border: '#4E6A96',
    route: '#3E5C8A', routeSoft: '#DEE7F2', dash: '#E8794A', pin: '#2A4166', pinStroke: '#F6F9FC',
    text: '#5A7394', label: '#2C3E5C', labelStroke: '#F6F9FC', dot: '#E8794A', halo: '#3E5C8A',
  },
];

const VARIANTS = ['dot', 'dash', 'both'] as const;

const MIDNIGHT_STARS: Array<{ x: number; y: number; r: number; delay: number }> = [
  { x: 29, y: 49, r: 0.22, delay: 0 },
  { x: 33, y: 55, r: 0.18, delay: 0.6 },
  { x: 37, y: 47.5, r: 0.24, delay: 1.1 },
  { x: 42, y: 52, r: 0.16, delay: 0.3 },
  { x: 46, y: 48.5, r: 0.22, delay: 1.6 },
  { x: 51, y: 53, r: 0.18, delay: 0.9 },
  { x: 56, y: 47, r: 0.24, delay: 2 },
  { x: 61, y: 52.5, r: 0.16, delay: 0.4 },
  { x: 66, y: 49, r: 0.22, delay: 1.4 },
  { x: 71, y: 54, r: 0.18, delay: 0.7 },
  { x: 76, y: 48, r: 0.24, delay: 2.3 },
  { x: 80, y: 52, r: 0.16, delay: 1.2 },
  { x: 31, y: 62, r: 0.16, delay: 0.5 },
  { x: 38, y: 66, r: 0.22, delay: 1.8 },
  { x: 47, y: 69, r: 0.16, delay: 0.2 },
  { x: 55, y: 71, r: 0.2, delay: 1.5 },
  { x: 64, y: 65, r: 0.16, delay: 0.8 },
  { x: 73, y: 60, r: 0.22, delay: 2.1 },
  { x: 78, y: 57, r: 0.16, delay: 1.3 },
];

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export default function TourMap({ tour, className = '' }: { tour: Tour; className?: string }) {
  const gradId = useId().replace(/:/g, '');

  const stops = useMemo(() => {
    const ids = TOUR_ROUTES[tour.slug] ?? ['merzouga'];
    return ids
      .map((id) => MAP_STOPS.find((stop) => stop.id === id))
      .filter((stop): stop is (typeof MAP_STOPS)[number] => Boolean(stop));
  }, [tour.slug]);

  const uniqueStops = useMemo(() => {
    const seen = new Set<string>();
    return stops.filter((stop) => (seen.has(stop.id) ? false : (seen.add(stop.id), true)));
  }, [stops]);

  const seed = hashSlug(tour.slug);
  const palette = PALETTES[seed % PALETTES.length];
  const variant = VARIANTS[seed % VARIANTS.length];
  const hasRoute = stops.length > 1;

  const points = stops.map((stop) => `${stop.x},${stop.y}`).join(' ');
  const motionPath = hasRoute ? stops.map((stop, index) => `${index === 0 ? 'M' : 'L'} ${stop.x} ${stop.y}`).join(' ') : '';

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl">
        <svg
          viewBox="26 45 56 28"
          className="block aspect-[2/1] w-full"
          role="img"
          aria-label={`Route map for ${tour.title}`}
        >
          <defs>
            <linearGradient id={`land-${gradId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.landTop} />
              <stop offset="100%" stopColor={palette.landBottom} />
            </linearGradient>
          </defs>

          <rect x="26" y="45" width="56" height="28" fill={palette.bg} />

          {palette.midnight &&
            MIDNIGHT_STARS.map((star, index) => (
              <circle key={index} cx={star.x} cy={star.y} r={star.r} fill={palette.label} className="star" style={{ animationDelay: `${star.delay}s` }} />
            ))}

          <path d={MOROCCO_PATH} fill={`url(#land-${gradId})`} stroke={palette.border} strokeWidth="0.6" strokeLinejoin="round" />

          <g pointerEvents="none" fill={palette.text} fontSize="2" fontWeight="500">
            <text x="54.2" y="48.9" textAnchor="middle" fontSize="1.7" opacity="0.8">High Atlas</text>
            <text x="80.9" y="59.5" transform="rotate(-90 80.9 59.5)" textAnchor="middle" fontSize="1.6" opacity="0.8">Algeria</text>
            <text x="46" y="70.8" textAnchor="middle" fontSize="2.2" opacity="0.9">Sahara</text>
          </g>

          {hasRoute && (
            <g>
              <polyline points={points} fill="none" stroke={palette.routeSoft} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <polyline
                points={points}
                fill="none"
                stroke={palette.route}
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2.2 1.1"
                className={variant === 'dot' ? undefined : 'route-line'}
              />
              {variant !== 'dash' && (
                <circle r="1.5" fill={palette.dot} stroke={palette.pinStroke} strokeWidth="0.6">
                  <animateMotion dur="7s" repeatCount="indefinite" path={motionPath} />
                </circle>
              )}
            </g>
          )}

          {uniqueStops.map((stop, index) => {
            const label = CITY_LABELS[stop.id] ?? { dx: 3, dy: 0.8, anchor: 'start' as const };
            const single = uniqueStops.length === 1;
            return (
              <g key={stop.id}>
                {single && (
                  <>
                    <circle className="pin-halo" cx={stop.x} cy={stop.y} r="3" fill={palette.halo} />
                    <circle className="pin-halo" cx={stop.x} cy={stop.y} r="3" fill={palette.halo} style={{ animationDelay: '1.2s' }} />
                  </>
                )}
                {!single && <circle className="pin-halo" cx={stop.x} cy={stop.y} r="2.4" fill={palette.halo} />}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={single ? 2.6 : 2}
                  fill={palette.pin}
                  stroke={palette.pinStroke}
                  strokeWidth="0.7"
                />
                <text
                  x={stop.x + label.dx}
                  y={stop.y + label.dy}
                  textAnchor={label.anchor}
                  fontSize={single ? 2.3 : 2}
                  fontWeight={600}
                  fill={palette.label}
                  stroke={palette.labelStroke}
                  strokeWidth="0.4"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  {index + 1}. {stop.name}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="mt-2 px-1 text-[10px] leading-tight text-sand-400">Map outline: Eric Gaba (Wikimedia Commons), CC BY-SA 3.0 · Simplified and recoloured.</p>
      </div>
    </div>
  );
}
