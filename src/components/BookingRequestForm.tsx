import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useLocale } from '@/i18n';

export default function BookingRequestForm({
  itemTitle,
  itemType,
  itemRegion,
}: {
  itemTitle: string;
  itemType: string;
  itemRegion: string;
}) {
  const { t } = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const labels: Record<string, string> = {
      [t('expDetail.labels.item')]: itemTitle,
      [t('expDetail.labels.type')]: itemType,
      [t('expDetail.labels.region')]: itemRegion,
    };
    for (const [key, label] of [
      ['phone', t('custom.phoneWhatsApp')],
      ['date', t('custom.preferredStartDate')],
      ['travelers', t('custom.travelers')],
      ['message', t('custom.anythingElse')],
    ] as const) {
      const value = String(formData.get(key) || '').trim();
      if (value) labels[label] = value;
    }
    const payload = {
      name,
      email,
      subject: `${t('booking.subject')}: ${itemTitle}`,
      labels,
    };

    setSubmitting(true);
    setSubmitError('');
    const endpoint =
      import.meta.env.VITE_CONTACT_FORM_URL ||
      'https://contact-form.bouzyanilyas.workers.dev';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      setSent(true);
    } catch {
      setSubmitError(t('custom.sendError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 sm:p-9">
        <div className="flex flex-col items-center py-12 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-oasis-100 text-oasis-700">
            <Check className="h-8 w-8" strokeWidth={2} />
          </span>
          <h3 className="mt-6 font-display text-2xl font-medium text-ink-900">{t('booking.sentTitle')}</h3>
          <p className="mt-3 max-w-md text-ink-600">{t('booking.sentBody')}</p>
          <button onClick={() => setSent(false)} className="btn-ghost mt-8">{t('booking.sendAnother')}</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('custom.yourName')} name="name" required />
        <Field label={t('contact.email')} name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('custom.phoneWhatsApp')} name="phone" type="tel" />
        <Field label={t('custom.preferredStartDate')} name="date" type="date" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('custom.travelers')} name="travelers" type="number" min={1} max={50} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{t('custom.anythingElse')}</label>
        <textarea
          name="message"
          rows={4}
          placeholder={t('custom.notesPlaceholder')}
          className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
        />
      </div>
      {submitError && (
        <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm text-clay-700">{submitError}</p>
      )}
      <p className="text-xs text-ink-400">{t('custom.emailHint')}</p>
      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        {submitting ? t('booking.sending') : t('booking.submit')}
        {!submitting && <Send className="h-4 w-4" strokeWidth={1.75} />}
      </button>
    </form>
  );
}

function Field({
  label, name, type = 'text', min, max, required = false,
}: {
  label: string;
  name: string;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}{required && <span className="text-clay-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        min={min}
        max={max}
        required={required}
        className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200"
      />
    </div>
  );
}