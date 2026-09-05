import { useLocale } from '@/i18n';

const WHATSAPP_NUMBER = '212674283639';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 3C8.827 3 3 8.827 3 16.003c0 2.29.598 4.532 1.736 6.5L3 29l6.65-1.716A12.94 12.94 0 0 0 16.004 29C23.18 29 29 23.173 29 16.003S23.18 3 16.004 3Zm0 23.68a10.68 10.68 0 0 1-5.447-1.49l-.39-.232-3.947 1.018 1.052-3.844-.255-.397A10.66 10.66 0 0 1 5.32 16.003c0-5.893 4.792-10.684 10.684-10.684 5.892 0 10.677 4.79 10.677 10.684S21.895 26.68 16.004 26.68Zm5.864-7.99c-.322-.161-1.901-.937-2.196-1.045-.295-.107-.509-.161-.723.161-.214.321-.83 1.045-1.017 1.259-.187.214-.374.241-.696.08a8.83 8.83 0 0 1-2.571-1.584 9.66 9.66 0 0 1-1.779-2.215c-.187-.321-.02-.494.14-.654.143-.143.321-.374.482-.562.161-.187.214-.322.322-.536.107-.214.054-.402-.027-.562-.08-.161-.722-1.74-.99-2.383-.261-.626-.526-.54-.723-.55l-.616-.01c-.214 0-.562.08-.856.402-.295.321-1.125 1.1-1.125 2.684 0 1.584 1.153 3.116 1.314 3.331.161.214 2.268 3.463 5.494 4.856.767.332 1.366.53 1.834.678.77.245 1.47.21 2.024.127.617-.092 1.901-.777 2.168-1.527.267-.75.267-1.394.187-1.527-.08-.134-.295-.214-.616-.375Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const { t } = useLocale();
  const text = encodeURIComponent(t('whatsapp.message'));
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.label')}
      title={t('whatsapp.label')}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink-950/30 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}