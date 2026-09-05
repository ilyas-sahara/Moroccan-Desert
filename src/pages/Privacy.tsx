import LegalPage from '@/components/LegalPage';
import { useLocale } from '@/i18n';

const UPDATED = 'Last updated — September 5, 2026';

const SECTIONS = [
  {
    heading: 'Information We Collect',
    paragraphs: [
      'Personal information. When you send us an inquiry or confirm a booking, we collect personal details such as your name, email address, phone number, nationality, and any other information you choose to share. We also collect payment details when you pay for a tour or a deposit.',
      'Usage data. We automatically collect certain information about how you use our website, including your IP address, browser type, device information, and pages you visit. This helps us understand how the site is used and make it better.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      'Providing and arranging services. We use your personal information to handle bookings, arrange transfers, camps, and guides, and to communicate with you about your reservations.',
      'Improving your experience. We analyze usage data to improve the functionality of our website, personalize content to your interests, and provide a smoother browsing experience.',
      'Marketing. With your consent, we may occasionally send promotional content, newsletters, or travel updates. You can unsubscribe from these communications at any time.',
    ],
  },
  {
    heading: 'Sharing Your Information',
    paragraphs: [
      'Service providers and local partners. We only share your data when it is necessary to arrange your journey — for example with the trusted drivers, camps, and guides who are part of your trip, or with the payment services used to process your booking.',
      'Legal obligations. We may disclose your information when required by law or in response to legal processes.',
      'We never sell your personal information.',
    ],
  },
  {
    heading: 'Data Security',
    paragraphs: [
      'We apply appropriate technical and organizational safeguards to protect your personal data from unauthorized access, disclosure, alteration, or destruction.',
      'However, no method of transmission or storage is completely secure. While we work hard to protect your data, we cannot guarantee its absolute security.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'You have the right to access, update, or delete your personal information. You may also ask us to limit or object to how we process your data and, where applicable, request data portability.',
      'To exercise any of these rights, simply contact us using the details below. We will respond as quickly as we can.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: [
      'Our website may contain links to external websites or services. We are not responsible for the privacy practices or content of those third-party sites.',
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      'Our services are not directed at children under 18, and we do not knowingly collect personal information from minors.',
    ],
  },
  {
    heading: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Updates will be posted on this page together with the date of the latest revision.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have any questions or concerns about this Privacy Policy, please contact us at hello@saharavacation.com, on WhatsApp at +212 6 74 28 36 39, or at Avenue Mohammed V, Merzouga, Errachidia, Morocco.',
    ],
  },
];

export default function Privacy() {
  const { t } = useLocale();

  return (
    <LegalPage
      eyebrow={t('common.privacy')}
      title="Privacy Policy"
      intro="Sahara Vacation is committed to protecting your privacy. This Privacy Policy explains what information we collect through our website and booking process, how we use it, and the choices you have. By using our website or booking a journey with us, you agree to the practices described here."
      updated={UPDATED}
      path="/privacy"
      seoTitle={t('seo.privacyTitle')}
      seoDescription={t('seo.privacyDescription')}
      sections={SECTIONS}
    />
  );
}