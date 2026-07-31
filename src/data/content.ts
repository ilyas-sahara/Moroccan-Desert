export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  duration: string;
  days: number;
  difficulty: 'Gentle' | 'Moderate' | 'Adventurous';
  groupSize: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  highlights: string[];
  image: string;
  gallery: string[];
  overview: string;
  itinerary: { day: number; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
  bestSeason: string;
  experiences?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  readTime: string;
};

export const PLACEHOLDER = '/assets/images/sample1.jpg';

export const IMAGES = {
  heroDunes: 'https://images.pexels.com/photos/28829635/pexels-photo-28829635.jpeg?auto=compress&cs=tinysrgb&w=2000',
  heroDunes2: 'https://images.pexels.com/photos/30710172/pexels-photo-30710172.jpeg?auto=compress&cs=tinysrgb&w=2000',
  heroAerial: 'https://images.pexels.com/photos/30710158/pexels-photo-30710158.jpeg?auto=compress&cs=tinysrgb&w=2000',
  camelCaravan: 'https://images.pexels.com/photos/29107898/pexels-photo-29107898.jpeg?auto=compress&cs=tinysrgb&w=1600',
  camelTrek: 'https://images.pexels.com/photos/33566021/pexels-photo-33566021.jpeg?auto=compress&cs=tinysrgb&w=1600',
  camelBlue: 'https://images.pexels.com/photos/8357638/pexels-photo-8357638.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campTents: 'https://images.pexels.com/photos/11387348/pexels-photo-11387348.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campBerber: 'https://images.pexels.com/photos/12536402/pexels-photo-12536402.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campBerber2: 'https://images.pexels.com/photos/35901297/pexels-photo-35901297.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campNomad: 'https://images.pexels.com/photos/35901289/pexels-photo-35901289.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campIsolated: 'https://images.pexels.com/photos/10434667/pexels-photo-10434667.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campfire: 'https://images.pexels.com/photos/12128953/pexels-photo-12128953.jpeg?auto=compress&cs=tinysrgb&w=1600',
  campfireKettle: 'https://images.pexels.com/photos/34759180/pexels-photo-34759180.jpeg?auto=compress&cs=tinysrgb&w=1600',
  mintTea: 'https://images.pexels.com/photos/31497982/pexels-photo-31497982.jpeg?auto=compress&cs=tinysrgb&w=1600',
  mintTeaSet: 'https://images.pexels.com/photos/30906049/pexels-photo-30906049.jpeg?auto=compress&cs=tinysrgb&w=1600',
  mintTeaCarpet: 'https://images.pexels.com/photos/30906051/pexels-photo-30906051.jpeg?auto=compress&cs=tinysrgb&w=1600',
  stars: 'https://images.pexels.com/photos/35548672/pexels-photo-35548672.jpeg?auto=compress&cs=tinysrgb&w=1600',
  starsLone: 'https://images.pexels.com/photos/14809603/pexels-photo-14809603.jpeg?auto=compress&cs=tinysrgb&w=1600',
  starsMerzouga: 'https://images.pexels.com/photos/8369874/pexels-photo-8369874.jpeg?auto=compress&cs=tinysrgb&w=1600',
  merzouga: 'https://images.pexels.com/photos/29107888/pexels-photo-29107888.jpeg?auto=compress&cs=tinysrgb&w=1600',
  merzougaPalm: 'https://images.pexels.com/photos/4805548/pexels-photo-4805548.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ergChebbi: 'https://images.pexels.com/photos/37441710/pexels-photo-37441710.jpeg?auto=compress&cs=tinysrgb&w=1600',
  duneRipples: 'https://images.pexels.com/photos/28829638/pexels-photo-28829638.jpeg?auto=compress&cs=tinysrgb&w=1600',
  sunrise: 'https://images.pexels.com/photos/998635/pexels-photo-998635.jpeg?auto=compress&cs=tinysrgb&w=1600',
  aitBenHaddou: 'https://images.pexels.com/photos/29976840/pexels-photo-29976840.jpeg?auto=compress&cs=tinysrgb&w=1600',
  aitBenHaddou2: 'https://images.pexels.com/photos/14145449/pexels-photo-14145449.jpeg?auto=compress&cs=tinysrgb&w=1600',
  travelerDunes: 'https://images.pexels.com/photos/32825864/pexels-photo-32825864.jpeg?auto=compress&cs=tinysrgb&w=1600',
  loneTraveler: 'https://images.pexels.com/photos/9029494/pexels-photo-9029494.jpeg?auto=compress&cs=tinysrgb&w=1600',
  camelRider: 'https://images.pexels.com/photos/35666734/pexels-photo-35666734.jpeg?auto=compress&cs=tinysrgb&w=1600',
  camelsRiders: 'https://images.pexels.com/photos/37818882/pexels-photo-37818882.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

export const TOURS: Tour[] = [
  {
    slug: 'merzouga-golden-escape',
    title: 'Merzouga Golden Escape',
    subtitle: 'A two-night immersion into the dunes of Erg Chebbi',
    region: 'Erg Chebbi · Merzouga',
    duration: '3 days · 2 nights',
    days: 3,
    difficulty: 'Gentle',
    groupSize: 'Up to 8 guests',
    priceFrom: 390,
    rating: 4.9,
    reviews: 214,
    highlights: [
      'Sunrise camel trek to the highest dune',
      'Overnight in a luxury Berber tented camp',
      'Traditional mint tea ceremony at sunset',
      'Stargazing with a local astronomer',
    ],
    image: IMAGES.mintTeaSet,
    gallery: [IMAGES.mintTeaSet, IMAGES.mintTeaCarpet, IMAGES.mintTea, IMAGES.campBerber],
    overview:
      'A gentle introduction to the Sahara. Leave the paved road behind in Merzouga and ride a camel caravan into the golden dunes of Erg Chebbi. Spend two nights in a luxury Berber camp, wake to sunrise over the dunes, and end each day with mint tea around the fire.',
    itinerary: [
      { day: 1, title: 'Arrival in Merzouga', description: 'Meet your guide in Merzouga, leave your vehicle, and begin the camel trek into Erg Chebbi. Arrive at camp for sunset, mint tea, and a traditional Berber dinner under the stars.' },
      { day: 2, title: 'Dunes & Desert Life', description: 'Sunrise camel ride to the highest dune for panoramic views. Return for breakfast, then a relaxed day exploring nomad families, an underground fossil quarry, and the rhythms of desert life.' },
      { day: 3, title: 'Sunrise & Departure', description: 'A final sunrise from the dunes, breakfast at camp, and a camel ride back to Merzouga. Depart with a memory card full of gold.' },
    ],
    included: ['Camel trek with guide', '2 nights luxury camp', 'All meals at camp', 'Mint tea & campfire', 'Bottled water'],
    notIncluded: ['Transport to Merzouga', 'Travel insurance', 'Alcoholic drinks', 'Tips for guides'],
    bestSeason: 'October — April',
  },
  {
    slug: 'sahara-grand-crossing',
    title: 'Sahara Grand Crossing',
    subtitle: 'Five days deep into the dunes, from oasis to oasis',
    region: 'Erg Chebbi · Erg Znigui',
    duration: '5 days · 4 nights',
    days: 5,
    difficulty: 'Adventurous',
    groupSize: 'Up to 6 guests',
    priceFrom: 890,
    rating: 4.8,
    reviews: 96,
    highlights: [
      'Multi-day camel caravan across the dunes',
      'Two distinct wild camps',
      'Visit to a Gnawa music village',
      'Sunset from a 150m dune summit',
    ],
    image: IMAGES.camelTrek,
    gallery: [IMAGES.camelTrek, IMAGES.camelBlue, IMAGES.camelCaravan, IMAGES.ergChebbi],
    overview:
      'For travelers who want to truly disappear into the desert. A five-day camel-supported crossing from Merzouga through the silent dunes of Erg Znigui, sleeping in two different wild camps and meeting the people who call this landscape home.',
    itinerary: [
      { day: 1, title: 'Into Erg Chebbi', description: 'Begin in Merzouga. Load the camels and trek into the dunes. First night at a fixed luxury camp with full dinner and stargazing.' },
      { day: 2, title: 'Khamlia & Gnawa Rhythms', description: 'Visit the village of Khamlia, home to a Gnawa music community. After lunch, trek to a wild camp among the smaller dunes of Erg Znigui.' },
      { day: 3, title: 'The Silent Dunes', description: 'A long, slow trek across rolling dunes with no other humans in sight. Lunch in the shade of a tamarisk. Camp near a dry riverbed.' },
      { day: 4, title: 'Nomad Encampment', description: 'Meet a nomad family, share tea, and learn how they move with the seasons. Afternoon climb to a 150m dune for sunset.' },
      { day: 5, title: 'Return to Merzouga', description: 'Final sunrise, breakfast, and a 4x4 transfer back to Merzouga.' },
    ],
    included: ['Camel trek with guide', '4x4 support vehicle', '4 nights camp', 'All meals', 'Gnawa village visit', 'Local nomad encounter'],
    notIncluded: ['Transport to Merzouga', 'Sleeping bag liner', 'Travel insurance', 'Tips'],
    bestSeason: 'October — March',
  },
  {
    slug: 'atlas-to-sahara',
    title: 'Atlas to Sahara',
    subtitle: 'From the High Atlas passes to the dunes of Erg Chebbi',
    region: 'Marrakech · Aït Ben Haddou · Merzouga',
    duration: '4 days · 3 nights',
    days: 4,
    difficulty: 'Moderate',
    groupSize: 'Up to 10 guests',
    priceFrom: 640,
    rating: 4.9,
    reviews: 158,
    highlights: [
      'Cross the Tizi n\'Tichka pass',
      'Sunset at Aït Ben Haddou kasbah',
      'Overnight in the dunes of Erg Chebbi',
      'Private 4x4 with local driver-guide',
    ],
    image: IMAGES.aitBenHaddou,
    gallery: [IMAGES.aitBenHaddou, IMAGES.aitBenHaddou2, IMAGES.mintTeaSet, IMAGES.camelCaravan],
    overview:
      'A four-day private journey linking two of Morocco\'s great landscapes: the mud-brick kasbahs of the High Atlas and the golden dunes of the Sahara. Travel by 4x4 with a local driver-guide, ending with a night in a luxury desert camp.',
    itinerary: [
      { day: 1, title: 'Marrakech to Aït Ben Haddou', description: 'Cross the Tizi n\'Tichka pass through the High Atlas. Arrive at Aït Ben Haddou for a guided sunset tour of the UNESCO-listed kasbah. Overnight in a kasbah guesthouse.' },
      { day: 2, title: 'The Road to the Dades', description: 'Drive through the Valley of a Thousand Kasbahs and the Dades Gorge. Lunch in a local family home. Afternoon drive to Merzouga.' },
      { day: 3, title: 'Into the Sahara', description: 'Swap the 4x4 for camels and trek into Erg Chebbi. Sunset, mint tea, and a night in a luxury Berber camp with stargazing.' },
      { day: 4, title: 'Sunrise & Return', description: 'Sunrise over the dunes, breakfast, and the camel ride back to Merzouga. 4x4 transfer back to Marrakech.' },
    ],
    included: ['Private 4x4 with driver-guide', '3 nights accommodation', 'Camel trek', 'Camp dinner & breakfast', 'Aït Ben Haddou guided tour'],
    notIncluded: ['Lunches', 'Drinks', 'Travel insurance', 'Tips'],
    bestSeason: 'September — May',
  },
  {
    slug: 'stargazing-night-camp',
    title: 'Stargazing Night Camp',
    subtitle: 'One night, one camp, the whole sky',
    region: 'Erg Chebbi · Merzouga',
    duration: '2 days · 1 night',
    days: 2,
    difficulty: 'Gentle',
    groupSize: 'Up to 12 guests',
    priceFrom: 180,
    rating: 4.7,
    reviews: 302,
    highlights: [
      'Guided night-sky tour with telescope',
      'Campfire music with Berber drummers',
      'Sunrise dune hike',
      'Ideal for first-time desert visitors',
    ],
    image: IMAGES.stars,
    gallery: [IMAGES.stars, IMAGES.starsLone, IMAGES.starsMerzouga, IMAGES.campfire],
    overview:
      'A single unforgettable night in the desert. Arrive in Merzouga in the afternoon, camel-trek to a luxury camp, and spend the evening with a local astronomer, Berber drummers, and the clearest sky you\'ll ever see.',
    itinerary: [
      { day: 1, title: 'Sunset & Stars', description: 'Afternoon camel trek into the dunes. Arrive at camp for sunset, mint tea, and dinner. After dinner, a guided telescope session and Berber drumming around the fire.' },
      { day: 2, title: 'Sunrise & Departure', description: 'Early hike to a nearby dune for sunrise. Breakfast at camp, then camel ride back to Merzouga.' },
    ],
    included: ['Camel trek', '1 night luxury camp', 'Dinner & breakfast', 'Telescope session', 'Berber music'],
    notIncluded: ['Transport to Merzouga', 'Lunch', 'Drinks', 'Tips'],
    bestSeason: 'October — April',
  },
  {
    slug: 'nomad-berber-immersion',
    title: 'Nomad & Berber Immersion',
    subtitle: 'Live with the people of the desert for four days',
    region: 'Erg Chebbi · Nomad Territory',
    duration: '4 days · 3 nights',
    days: 4,
    difficulty: 'Moderate',
    groupSize: 'Up to 6 guests',
    priceFrom: 720,
    rating: 4.9,
    reviews: 64,
    highlights: [
      'Stay with a nomad family',
      'Learn to bake bread in the sand',
      'Weaving & carpet workshop',
      'Off-grid wild camping',
    ],
    image: IMAGES.campBerber2,
    gallery: [IMAGES.campBerber2, IMAGES.campNomad, IMAGES.mintTeaCarpet, IMAGES.loneTraveler],
    overview:
      'A cultural deep-dive. Spend four days with the people of the Sahara — nomad families, Berber weavers, and the guides who grew up between these dunes. You\'ll eat, sleep, and travel as they do.',
    itinerary: [
      { day: 1, title: 'Meet the Nomads', description: 'Camel trek from Merzouga to a nomad family\'s seasonal encampment. Share tea, learn how they move with the seasons, and sleep in a traditional tent.' },
      { day: 2, title: 'Bread in the Sand', description: 'Spend the day with the family. Learn to bake sand-baked bread, milk the goats, and prepare a tagine. Afternoon walk to a nearby fossil bed.' },
      { day: 3, title: 'Weaving Workshop', description: 'Travel to a Berber weaving cooperative. Spend the day learning the patterns and stories woven into each carpet. Overnight in a wild camp.' },
      { day: 4, title: 'Return to Merzouga', description: 'Sunrise, breakfast, and camel ride back to Merzouga.' },
    ],
    included: ['Camel trek', '3 nights accommodation', 'All meals', 'Nomad family stay', 'Weaving workshop'],
    notIncluded: ['Transport to Merzouga', 'Drinks', 'Travel insurance', 'Tips'],
    bestSeason: 'November — March',
  },
  {
    slug: 'private-bespoke-desert',
    title: 'Private Bespoke Desert',
    subtitle: 'Your own route, your own pace, your own Sahara',
    region: 'Tailored to you',
    duration: 'Flexible',
    days: 0,
    difficulty: 'Gentle',
    groupSize: 'Private',
    priceFrom: 1200,
    rating: 5.0,
    reviews: 41,
    highlights: [
      'Fully private guide & camp',
      'Flexible duration and route',
      'Photography-focused options',
      'Helicopter or 4x4 transfers available',
    ],
    image: IMAGES.heroAerial,
    gallery: [IMAGES.heroAerial, IMAGES.ergChebbi, IMAGES.campIsolated, IMAGES.sunrise],
    overview:
      'For travelers who want something truly their own. Tell us what you dream of — a helicopter drop into a remote dune field, a private camp for two, a photography expedition — and we\'ll build it.',
    itinerary: [
      { day: 1, title: 'Consultation', description: 'A call with our team to understand your group, your dates, and what kind of desert experience you\'re after.' },
      { day: 2, title: 'Tailored Proposal', description: 'We send a bespoke itinerary with route, camp, and guide options within 48 hours.' },
      { day: 3, title: 'Your Journey', description: 'Everything is arranged. You arrive and the desert does the rest.' },
    ],
    included: ['Private guide', 'Private camp', 'All meals', 'Bespoke routing', 'Concierge support'],
    notIncluded: ['International flights', 'Travel insurance', 'Tips'],
    bestSeason: 'Year-round (tailored)',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-plan-a-first-sahara-night',
    title: 'How to plan a first Sahara night under the stars',
    excerpt: 'A practical guide to choosing the right desert camp, arrival timing, and small comforts that make your first night unforgettable.',
    content: 'The first trip into the desert is less about perfection and more about rhythm. Arrive in the late afternoon so the sky opens slowly, settle into a camp with a simple lantern-lit dinner, and leave a little time to walk quietly before the stars begin to dominate the sky. A good first desert night pairs warm mint tea, a local guide, and a clear plan for sunrise so nothing feels rushed.',
    author: 'Walk the Sahara Team',
    publishedAt: '2026-04-20',
    category: 'Planning',
    image: IMAGES.stars,
    readTime: '4 min read',
  },
  {
    slug: 'what-makes-a-desert-camp-luxury',
    title: 'What makes a desert camp feel truly luxurious?',
    excerpt: 'Luxury in the Sahara is rarely about marble. It is the soft details, warm hospitality, and the silence of a private camp at golden hour.',
    content: 'A luxury desert camp feels special when every touch point has intention. The tents are comfortable, the welcome is generous, and the experience is paced so guests can move from camel trek to tea ceremony to stargazing without ever feeling rushed. The best camps are built around stillness, with warm blankets, local food, and a view that says everything without a word.',
    author: 'Amina Berrada',
    publishedAt: '2026-03-09',
    category: 'Culture',
    image: IMAGES.campBerber,
    readTime: '6 min read',
  },
  {
    slug: 'three-ways-to-see-the-sahara-beyond-the-dunes',
    title: 'Three ways to see the Sahara beyond the dunes',
    excerpt: 'The desert is more than sand and sun. It is villages, music, families, and landscapes that unfold in layers over a single journey.',
    content: 'Travelers often arrive expecting a single horizon and leave with a deeper understanding of the oasis towns, caravan routes, and nomadic families who still shape desert life. You can explore this through a stargazing camp, a village music evening, or a four-day nomad immersion that unfolds at the pace of local stories.',
    author: 'Walid El Azzouzi',
    publishedAt: '2026-02-14',
    category: 'Editor’s pick',
    image: IMAGES.camelCaravan,
    readTime: '5 min read',
  },
];

export const EXPERIENCES = [
  { slug: 'camel-trekking', title: 'Camel Treks', description: 'Follow ancient caravan routes across the dunes at sunrise or sunset.', image: IMAGES.camelCaravan, icon: 'Compass' },
  { slug: 'desert-camping', title: 'Luxury Berber Camps', description: 'Sleep under the stars in a private tented camp with full service.', image: IMAGES.campBerber, icon: 'Tent' },
  { slug: 'stargazing', title: 'Stargazing', description: 'The Sahara sky is one of the darkest on earth. Telescopes included.', image: IMAGES.stars, icon: 'Star' },
  { slug: 'mint-tea', title: 'Mint Tea Ceremony', description: 'The ritual that opens every encounter in the desert.', image: IMAGES.mintTea, icon: 'Coffee' },
  { slug: 'nomadic-culture', title: 'Nomad Encounters', description: 'Spend a day with a family who still moves with the seasons.', image: IMAGES.campNomad, icon: 'Users' },
  { slug: 'sandboarding', title: 'Sandboarding', description: 'Climb the dunes and ride down. Boards and instruction provided.', image: IMAGES.duneRipples, icon: 'Mountain' },
  { slug: '4x4-desert-routes', title: '4x4 Desert Routes', description: 'Travel beyond the paved road across valleys, hammada, and remote dunes.', image: IMAGES.heroAerial, icon: 'Mountain' },
  { slug: 'kasbahs-and-oases', title: 'Kasbahs & Oases', description: 'Combine the Sahara with palm valleys, ancient kasbahs, and southern Moroccan villages.', image: IMAGES.aitBenHaddou, icon: 'Users' },
];

export const TESTIMONIALS = [
  { name: 'Eleanor M.', country: 'United Kingdom', text: 'The most beautiful sky I have ever seen. Our guide knew every dune by name and the camp was genuinely luxurious. We didn\'t want to leave.', tour: 'Merzouga Golden Escape', rating: 5 },
  { name: 'Thomas & Léa', country: 'France', text: 'We did the Grand Crossing and it felt like stepping off the edge of the world. Five days of absolute silence and gold.', tour: 'Sahara Grand Crossing', rating: 5 },
  { name: 'Yuki T.', country: 'Japan', text: 'As a solo traveler I was nervous, but the team made me feel completely safe and included. The stargazing night was unforgettable.', tour: 'Stargazing Night Camp', rating: 5 },
  { name: 'The Alvarez Family', country: 'Spain', text: 'Our kids still talk about the camel ride and the bread baked in the sand. A real adventure, but so well organized.', tour: 'Nomad & Berber Immersion', rating: 5 },
  { name: 'David R.', country: 'United States', text: 'From Marrakech to the dunes and back, every transfer was seamless. Aït Ben Haddou at sunset was a highlight of our whole trip to Morocco.', tour: 'Atlas to Sahara', rating: 5 },
];

export const FAQS = [
  { q: 'When is the best time to visit the Sahara?', a: 'October through April, when daytime temperatures are comfortable and nights are cool. Summer months (June–August) can be extremely hot during the day.' },
  { q: 'How do I get to Merzouga?', a: 'Merzouga is about a 9–10 hour drive from Marrakech or a 6 hour drive from Fès. We can arrange private 4x4 transfers, or you can take a domestic flight to Errachidia and a short transfer from there.' },
  { q: 'Do I need to be fit for the camel trek?', a: 'Our standard treks are gentle and suitable for most travelers. For the multi-day crossings a basic level of fitness helps — you\'ll be walking alongside the camels for a few hours each day.' },
  { q: 'What should I pack?', a: 'Layers are essential — warm clothes for the evening, sun protection for the day, and a small daypack. We send a full packing list after booking.' },
  { q: 'Is the camp suitable for children?', a: 'Yes. Many of our experiences welcome children, and the family-focused departures are designed with kids in mind. Let us know your group and we\'ll recommend the right trip.' },
  { q: 'Can I book a private departure?', a: 'Absolutely. Most of our tours can be run as private departures, and we also build fully bespoke itineraries. Get in touch and we\'ll tailor everything to your group.' },
];
