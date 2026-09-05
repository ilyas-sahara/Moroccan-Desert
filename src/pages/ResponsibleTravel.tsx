import LegalPage from '@/components/LegalPage';
import { useLocale } from '@/i18n';

const UPDATED = 'Last updated — September 5, 2026';

const SECTIONS = [
  {
    heading: 'Local Guides, Local Livelihoods',
    paragraphs: [
      'Every Sahara Vacation guide is Berber, born and raised at the edge of the dunes. We hire locally — drivers, cooks, musicians, and the camps of Merzouga and the surrounding villages. The money you spend stays in the desert, supporting the families who have lived here for generations.',
    ],
  },
  {
    heading: 'Camps That Leave No Trace',
    paragraphs: [
      'Our camps are fully removable. When the last guest leaves, we take down every tent, roll up every carpet, and pack out every trace — including waste. By the next day, the dune looks as it did before we arrived.',
    ],
  },
  {
    heading: 'Small Groups, Gentle Footprints',
    paragraphs: [
      'We keep every departure small. Fewer people means less pressure on the land, quieter nights, and encounters that feel like encounters, not crowds.',
    ],
  },
  {
    heading: 'Respecting the Desert Landscape',
    paragraphs: [
      'We stick to established paths and camps, avoid fragile dune vegetation, and never disturb wildlife. Please do the same — and please leave the sand where it belongs. The dunes of the Merzouga region are protected.',
    ],
  },
  {
    heading: 'The Camel Caravan',
    paragraphs: [
      'The camels that carry our guests are working animals, and we treat them like family. They carry sensible loads, walk at a kind pace, and rest properly between journeys. If you ever have a question about how an animal is being handled, please ask — we answer honestly.',
    ],
  },
  {
    heading: 'Photography and Cultural Etiquette',
    paragraphs: [
      'Ask before photographing people — a gesture of respect that is always appreciated. Dress modestly in villages and markets, and buy crafts directly from the makers. A fair price, agreed kindly, keeps traditions alive.',
    ],
  },
  {
    heading: 'Water and Waste',
    paragraphs: [
      'Water is scarce in the desert. Bring a refillable bottle and minimize single-use plastic, and dispose of waste properly — never in the dunes. We always carry our waste out with us; please help us carry yours.',
    ],
  },
  {
    heading: 'Your Part',
    paragraphs: [
      'The choice of how you travel is yours, and it matters. Ask questions, support local businesses, and treat every person you meet the way you would want to be treated. If you ever wonder how we operate, write to us at hello@saharavacation.com — we answer every message.',
    ],
  },
];

export default function ResponsibleTravel() {
  const { t } = useLocale();

  return (
    <LegalPage
      eyebrow={t('common.responsibleTravel')}
      title="Responsible Travel"
      intro="The Sahara is one of the most fragile and beautiful places on earth, and we have spent our lives at its edge. Responsible travel is not a page on our website — it is the way we have always worked. Here is how we try to give more to the desert than we take, and how you can help."
      updated={UPDATED}
      path="/responsible-travel"
      seoTitle={t('seo.responsibleTitle')}
      seoDescription={t('seo.responsibleDescription')}
      sections={SECTIONS}
      numbered={false}
    />
  );
}