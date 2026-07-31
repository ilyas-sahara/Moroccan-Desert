import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { TOURS, FAQS, IMAGES } from '@/data/content';
import { getContactPageContent, getCmsFaqs, getCmsTours } from '@/data/cms';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactContent, setContactContent] = useState({
    hero_eyebrow: 'Contact',
    hero_title: "Let's plan your Sahara",
    hero_subtitle: "Tell us your dates, your group, and your dream — we'll reply within 24 hours with a tailored proposal.",
    office_text: "Prefer to talk it through? Reach us directly — we're based in Merzouga, on the edge of the dunes.",
    phone: '+212 5 35 00 00 00',
    email: 'hello@walkthesahara.com',
  });
  const [tourOptions, setTourOptions] = useState(TOURS.map((t) => t.title));
  const [faqs, setFaqs] = useState(FAQs);

  useEffect(() => {
    void (async () => {
      const [pageContent, cmsTours, cmsFaqs] = await Promise.all([
        getContactPageContent(),
        getCmsTours(),
        getCmsFaqs(),
      ]);
      setContactContent(pageContent);
      setTourOptions(cmsTours.map((t) => t.title));
      setFaqs(cmsFaqs);
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img src={IMAGES.campfire} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow={contactContent.hero_eyebrow}
            title={contactContent.hero_title}
            subtitle={contactContent.hero_subtitle}
          />
        </div>
      </section>

      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 sm:p-9">
              {sent ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-oasis-100 text-oasis-700">
                    <Check className="h-8 w-8" strokeWidth={2} />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-medium text-ink-900">Message sent</h2>
                  <p className="mt-3 max-w-md text-ink-600">
                    Thank you for reaching out. A member of our team will reply within 24 hours to start
                    shaping your journey.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-ghost mt-8">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone (optional)" name="phone" type="tel" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Interested in" name="tour" options={tourOptions} />
                    <SelectField label="Group size" name="group" options={['1 — 2', '3 — 4', '5 — 6', '7+']} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Preferred date" name="date" type="date" />
                    <SelectField label="Budget per person" name="budget" options={['Up to €400', '€400 — €800', '€800 — €1,200', '€1,200+']} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Your message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about the journey you're dreaming of..."
                      className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message <Send className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-ink-950 p-7 text-sand-100 shadow-lg sm:p-9">
              <h3 className="font-display text-2xl font-medium text-white">Talk to a human</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand-200/85">
                {contactContent.office_text}
              </p>
              <ul className="mt-7 space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-800 text-sand-200">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-sand-400">Office</p>
                    <p className="mt-0.5 text-sand-100">Avenue Mohammed V, Merzouga, Errachidia, Morocco</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-800 text-sand-200">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-sand-400">Phone / WhatsApp</p>
                    <p className="mt-0.5 text-sand-100">{contactContent.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-800 text-sand-200">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-sand-400">Email</p>
                    <p className="mt-0.5 text-sand-100">{contactContent.email}</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-100/40 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Good to Know" title="Frequently asked questions" />
          <div ref={ref} className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className={`reveal overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50`}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-display text-lg font-medium text-ink-900">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-sand-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-600">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label, name, type = 'text', required = false,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}{required && <span className="text-clay-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <select
        name={name}
        className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
