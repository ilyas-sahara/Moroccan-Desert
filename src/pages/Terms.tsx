import LegalPage from '@/components/LegalPage';
import { useLocale } from '@/i18n';

const UPDATED = 'Last updated — September 5, 2026';

const SECTIONS = [
  {
    heading: 'Agreement to Terms',
    paragraphs: [
      'By using our website or services, you agree to these Terms of Service. If you do not agree with any part of them, please do not use our website or book with us.',
    ],
  },
  {
    heading: 'Use of the Website',
    paragraphs: [
      'You must be at least 18 years old, or the legal age in your country of residence, to use our website and book our services.',
      'You are responsible for the confidentiality of any account information and passwords, and for all activity that happens under your account.',
      'You agree not to use our website for any unlawful or unauthorized purpose, or in a way that damages, disables, overburdens, or impairs the website.',
    ],
  },
  {
    heading: 'Booking and Payment',
    paragraphs: [
      'How to book. We plan your itinerary together first. To confirm your trip, please email us the full names of all participants. If you have already booked your flights, please include your flight details as well. We will then send you the available payment options and your booking details.',
      'Deposit. To secure your reservation, a deposit of 30% of the total trip cost is payable at least five weeks before arrival. We will send you an invoice for the deposit. Your booking is only confirmed once we receive it.',
      'Balance. The remaining balance is payable on arrival in Morocco, on the first day of your trip. You are welcome to pay by bank transfer, Western Union, MoneyGram, or postal transfer — or in cash on arrival.',
      'All prices are listed in the currency shown on our website and all bookings are subject to availability.',
    ],
  },
  {
    heading: 'Travel Documents',
    paragraphs: [
      'It is your responsibility to ensure you have all necessary travel documents — passports, visas, and any required health certificates — valid before departure.',
      'We are not responsible for delays, losses, or expenses caused by incomplete or incorrect travel documents.',
    ],
  },
  {
    heading: 'Changes and Cancellations',
    paragraphs: [
      'Cancellations by you. To cancel a booking, email us at hello@saharavacation.com. We use the date of your email as the official cancellation date. Our cancellation terms are: more than 30 days before arrival — a €70 processing fee; between 30 and 21 days — 25% of the deposit; between 20 and 8 days — 50% of the deposit; less than 8 days — 100% of the total trip cost.',
      'Cancellations by us. If unforeseen circumstances force us to cancel a tour, we will offer you an alternative option or a full refund. We do not provide additional compensation.',
      'Changes to your booking. To change a reservation — extend your stay, add travelers, or add services — please contact us at least one month before departure. We only charge for the cost of added services and never add extra fees for changes.',
    ],
  },
  {
    heading: 'Claims and Complaints',
    paragraphs: [
      'If you wish to make a complaint or claim, please send it to us in writing before you leave Morocco, so we can review the matter properly and help you efficiently.',
    ],
  },
  {
    heading: 'Traveler Responsibility and Insurance',
    paragraphs: [
      'Our tours take place in natural and remote areas. Every traveler must follow the guide\u2019s instructions during the journey, and we cannot accept responsibility for accidents, injuries, loss, or damage caused by unsafe or careless personal behavior.',
      'We hold professional liability insurance in line with our profession. Each traveler must also hold personal travel insurance; we strongly recommend full cover for medical expenses, travel assistance, repatriation, and theft or loss of luggage.',
    ],
  },
  {
    heading: 'Disclaimer of Liability',
    paragraphs: [
      'We strive to provide accurate and up-to-date information on our website, but we do not guarantee the accuracy, completeness, or reliability of any content.',
      'To the fullest extent permitted by law, we are not liable for direct, indirect, incidental, consequential, or punitive damages resulting from your use of our website or services.',
    ],
  },
  {
    heading: 'Intellectual Property',
    paragraphs: [
      'All content on our website — text, graphics, logos, images, and software — is the property of Sahara Vacation or its licensors and is protected by intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works based on our content without our express permission.',
    ],
  },
  {
    heading: 'Privacy Policy',
    paragraphs: [
      'Your privacy matters to us. Please read our Privacy Policy to understand how we collect, use, and protect your personal information.',
    ],
  },
  {
    heading: 'Governing Law',
    paragraphs: [
      'These Terms of Service are governed by and construed in accordance with the laws of the Kingdom of Morocco.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have any questions about these Terms of Service or our Booking & Payment Policy, contact us at hello@saharavacation.com, on WhatsApp at +212 6 74 28 36 39, or at Avenue Mohammed V, Merzouga, Errachidia, Morocco.',
    ],
  },
];

export default function Terms() {
  const { t } = useLocale();

  return (
    <LegalPage
      eyebrow={t('common.terms')}
      title="Terms of Service"
      intro="Thank you for visiting Sahara Vacation. These Terms of Service set out the rules for using our website and booking a tour with us, including our booking and payment conditions. By accessing our website or booking a journey, you agree to these terms. Please read them carefully before you continue."
      updated={UPDATED}
      path="/terms"
      seoTitle={t('seo.termsTitle')}
      seoDescription={t('seo.termsDescription')}
      sections={SECTIONS}
    />
  );
}