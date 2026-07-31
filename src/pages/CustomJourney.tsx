import { FormEvent, useMemo, useState } from 'react';
import { Check, Compass, Mail, MapPin, Plus, Send, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { IMAGES } from '@/data/content';

type Stop = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
};

const STOPS: Stop[] = [
  { id: 'marrakech', name: 'Marrakech', description: 'Atlas gateway', x: 26, y: 24 },
  { id: 'ait-ben-haddou', name: 'Aït Ben Haddou', description: 'Kasbah country', x: 43, y: 42 },
  { id: 'ouarzazate', name: 'Ouarzazate', description: 'Desert gateway', x: 52, y: 49 },
  { id: 'zagora', name: 'Zagora', description: 'Drâa Valley', x: 61, y: 62 },
  { id: 'mhamid', name: "M'Hamid", description: 'Last village before the Sahara', x: 68, y: 77 },
  { id: 'erg-chigaga', name: 'Erg Chigaga', description: 'Wild dunes', x: 48, y: 84 },
  { id: 'merzouga', name: 'Merzouga', description: 'Erg Chebbi dunes', x: 83, y: 58 },
];

const INTERESTS = ['Camel trekking', 'Desert camping', '4x4 adventure', 'Nomad culture', 'Stargazing', 'Kasbahs & oases', 'Sandboarding'];

export default function CustomJourney() {
  const [stops, setStops] = useState<string[]>(['marrakech', 'erg-chigaga']);
  const [interests, setInterests] = useState<string[]>(['Desert camping']);
  const [sent, setSent] = useState(false);
  const selectedStops = useMemo(() => STOPS.filter((stop) => stops.includes(stop.id)), [stops]);

  const toggleStop = (id: string) => {
    setStops((current) => current.includes(id) ? current.filter((stop) => stop !== id) : [...current, id]);
  };

  const toggleInterest = (interest: string) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      'New custom Sahara journey request',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Preferred start date: ${data.get('date') || 'Flexible'}`,
      `Travelers: ${data.get('travelers')}`,
      `Duration: ${data.get('duration')}`,
      `Comfort: ${data.get('comfort')}`,
      `Selected stops: ${selectedStops.map((stop) => stop.name).join(' → ') || 'No stops selected'}`,
      `Interests: ${interests.join(', ') || 'No preferences selected'}`,
      '',
      `Notes: ${data.get('notes') || 'None'}`,
    ].join('\n');
    window.location.href = `mailto:hello@walkthesahara.com?subject=${encodeURIComponent('Custom Sahara journey request')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-28">
        <div className="absolute inset-0">
          <img src={IMAGES.heroAerial} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35" />
        </div>
        <div className="container-x relative z-10 max-w-4xl">
          <SectionHeading light eyebrow="Build your own journey" title="Your Sahara, mapped your way." subtitle="Choose the places, pace, and experiences that matter to you. Our local team will turn them into a considered private itinerary." />
        </div>
      </section>

      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200/70 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-sand-700"><MapPin className="h-5 w-5" /></span>
                <div><h2 className="font-display text-2xl text-ink-900">1. Shape your route</h2><p className="text-sm text-ink-600">Click locations to add or remove them from your journey.</p></div>
              </div>
              <div className="relative mt-7 aspect-[5/4] overflow-hidden rounded-2xl bg-sand-100">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Interactive Morocco journey map">
                  <path d="M21 13 L47 9 L72 18 L90 35 L89 57 L78 68 L72 91 L56 95 L45 85 L34 88 L24 74 L12 58 L15 40 Z" fill="#e9d8b9" stroke="#9e6d36" strokeWidth="1.2" />
                  {selectedStops.length > 1 && <polyline points={selectedStops.map((stop) => `${stop.x},${stop.y}`).join(' ')} fill="none" stroke="#855529" strokeWidth="1.4" strokeDasharray="3 2" />}
                  {STOPS.map((stop) => {
                    const selected = stops.includes(stop.id);
                    return <g key={stop.id} className="cursor-pointer" onClick={() => toggleStop(stop.id)}>
                      <circle cx={stop.x} cy={stop.y} r={selected ? 3.3 : 2.4} fill={selected ? '#855529' : '#fffaf0'} stroke="#51351e" strokeWidth="0.8" />
                      <text x={stop.x} y={stop.y - 4.5} textAnchor="middle" fill="#51351e" fontSize="3.5" fontWeight="600">{stop.name}</text>
                    </g>;
                  })}
                </svg>
                <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm">{selectedStops.length} stops selected</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {STOPS.map((stop) => {
                  const selected = stops.includes(stop.id);
                  return <button key={stop.id} type="button" onClick={() => toggleStop(stop.id)} className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors ${selected ? 'bg-sand-800 text-sand-50' : 'bg-sand-100 text-ink-700 hover:bg-sand-200'}`}>{selected ? <Check className="mr-1 inline h-3.5 w-3.5" /> : <Plus className="mr-1 inline h-3.5 w-3.5" />}{stop.name}</button>;
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl bg-ink-950 p-7 text-sand-100 shadow-xl sm:p-8">
              <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-sand-300" /><h2 className="font-display text-2xl text-white">Your route</h2></div>
              <ol className="mt-6 space-y-4">
                {selectedStops.length ? selectedStops.map((stop, index) => <li key={stop.id} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-700 text-xs font-semibold">{index + 1}</span><div><p className="font-semibold text-white">{stop.name}</p><p className="text-xs text-sand-300">{stop.description}</p></div></li>) : <li className="text-sm text-sand-300">Select at least one place on the map.</li>}
              </ol>
              <div className="mt-7 border-t border-white/10 pt-5 text-sm text-sand-200"><Compass className="mr-2 inline h-4 w-4 text-sand-300" />Every route is reviewed by a local guide before we propose it.</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-sand-100/50 py-16 lg:py-24">
        <div className="container-x max-w-4xl">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/70 sm:p-10">
            <SectionHeading eyebrow="Tell us the details" title="2. Request your custom itinerary" subtitle="We will reply with a tailored route, availability, and transparent pricing." />
            {sent && <div className="mt-6 rounded-xl bg-oasis-100 p-4 text-sm text-oasis-700">Your email app has opened with the request prepared. Send it there to reach our team.</div>}
            <form onSubmit={submit} className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Your name" name="name" required /><Input label="Email" name="email" type="email" required />
                <Input label="Phone / WhatsApp" name="phone" type="tel" /><Input label="Preferred start date" name="date" type="date" />
                <Select label="Travelers" name="travelers" options={['1–2 travelers', '3–4 travelers', '5–8 travelers', '9+ travelers']} /><Select label="Duration" name="duration" options={['2–3 days', '4–5 days', '6–8 days', '9+ days']} />
              </div>
              <Select label="Preferred comfort" name="comfort" options={['Authentic bivouac', 'Comfortable desert camp', 'Luxury camp', 'A mix of both']} />
              <div><label className="mb-2 block text-sm font-medium text-ink-700">Experiences to include</label><div className="flex flex-wrap gap-2">{INTERESTS.map((interest) => <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`rounded-full px-4 py-2 text-sm transition-colors ${interests.includes(interest) ? 'bg-sand-800 text-sand-50' : 'bg-sand-100 text-ink-700 hover:bg-sand-200'}`}>{interests.includes(interest) ? <Check className="mr-1 inline h-4 w-4" /> : <Plus className="mr-1 inline h-4 w-4" />}{interest}</button>)}</div></div>
              <div><label className="mb-1.5 block text-sm font-medium text-ink-700">Anything else we should know?</label><textarea name="notes" rows={5} placeholder="Tell us about your travel style, special occasions, dietary needs, or anything you want to experience." className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>
              <button type="submit" className="btn-primary"><Send className="h-4 w-4" />Send custom journey request</button>
              <p className="flex items-center gap-2 text-xs text-sand-600"><Mail className="h-4 w-4" />This opens your email app with your route and preferences included.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><input name={name} type={type} required={required} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>;
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><select name={name} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}
