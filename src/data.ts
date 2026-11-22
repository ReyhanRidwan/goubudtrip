import { Experience, BookingAddon, Review, Vehicle } from './types';
import { Language } from './i18n';

export function formatPrice(amount: number, currency: 'IDR' | 'USD' = 'USD'): string {
  if (currency === 'USD') {
    return `USD ${amount.toLocaleString('en-US')}`;
  }
  return `Rp ${Math.round(amount).toLocaleString('id-ID')}`;
}

export function getAddonPrice(addon: BookingAddon, currency: 'IDR' | 'USD' = 'USD'): number {
  if (currency === 'USD') {
    return addon.priceUsd ?? Math.max(1, Math.round(addon.price / 16000));
  }
  return addon.price;
}

export function getTierPricePerPerson(
  exp: Experience,
  guests: number,
  isChild = false
): number {
  if (exp.discountTiers && exp.discountTiers.length > 0) {
    const matched = exp.discountTiers.find(
      (t) => guests >= t.minPersons && guests <= t.maxPersons
    );
    if (matched) {
      return isChild ? matched.childrenPrice : matched.adultPrice;
    }
    const fallbackTier =
      guests <= 1
        ? exp.discountTiers[0]
        : exp.discountTiers[exp.discountTiers.length - 1];
    return isChild ? fallbackTier.childrenPrice : fallbackTier.adultPrice;
  }
  return exp.pricePerPerson;
}

const SHARED_TERMS_EN = [
  'Payment can settle on departure by Cash USD/IDR.',
  'Price is Net includes Government tax.',
  'Cancellation on Departure will be 100 % Charge.',
  'Full refund 48 hours before your departure',
  'Reasonable and fair price and that means no hidden charge',
  'Private air-conditioned car and experienced local English-speaking driver.',
];

const SHARED_TERMS_ID = [
  'Pembayaran dapat diselesaikan saat keberangkatan secara tunai (USD/IDR).',
  'Harga sudah bersih (Net) termasuk pajak pemerintah.',
  'Pembatalan pada hari keberangkatan dikenakan biaya 100%.',
  'Pengembalian dana penuh (100% refund) jika dibatalkan 48 jam sebelum keberangkatan.',
  'Harga wajar dan transparan tanpa biaya tersembunyi.',
  'Mobil privat ber-AC penuh dengan driver lokal ramah berbahasa Inggris.',
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'half-day-bali-temple-waterfall-terraces',
    category: 'culture',
    isHalfDay: true,
    title: 'Half Day Bali Tour',
    tagline: 'Village Temple, Waterfall & Tegalalang',
    shortDesc:
      'Ideal for limited schedules—discover a historic village temple built in 944, stunning Tegenungan Waterfall, and lush Tegalalang Rice Terraces.',
    longDesc:
      'Half Day Bali Tour – This tour product is designed for our lovely customers who have limited time or do not want to spend all day long. This tour will take you to the highlight spots in Bali, showing you the Village Temple, Tegenungan Waterfall, and the beautiful Tegalalang Rice Terraces. Our focus is to make sure our customers have memorable experiences in a short day in Bali and bring unforgettable memories back home.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795162357/30b47c4d-eecc-4f2f-bc63-f7e7c4b5348b.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
    ],
    pricePerPerson: 40,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 55, childrenPrice: 55 },
      { minPersons: 2, maxPersons: 10, adultPrice: 40, childrenPrice: 40 },
    ],
    duration: 'Half Day (4-5 hours)',
    tourType: 'Private Trip',
    groupSize: 'Private',
    languages: 'English Speaking',
    tourNote: 'Entry tickets included. Excluded: lunch and personal expenses.',
    location: 'Village Temple, Tegenungan & Tegalalang',
    difficulty: 'Easy / Culture & Nature',
    maxPeople: 12,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08:00 AM', '09:00 AM', '01:00 PM'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
    whatToBring: ['Comfortable shoes/sandals', 'Camera', 'Sunblock', 'Extra cash'],
    featureBadges: [
      'Best for limited time',
      'Private AC car & local host',
      'Entry tickets included',
    ],
    relatedTitle: 'Ubud Jungle Swing & Balinese Spa',
    relatedExperienceId: 'bali-swing-spa-transport',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 168,
    highlights: [
      'Visit one of the oldest village temples in Bali built in 944 and learn authentic Balinese traditions',
      'Capture panoramic waterfall photos at scenic Tegenungan Waterfall in Ubud',
      'Stroll along the iconic green Tegalalang Rice Terraces & traditional Subak irrigation',
      'Private air-conditioned car with an experienced, warm local Balinese host',
    ],
    inclusions: [
      'Entrance tickets (Village Temple, Tegenungan Waterfall & Tegalalang Rice Terraces)',
      'Private tour with fully air-conditioned car',
      'Friendly local Balinese English-speaking driver/host',
      'Mineral water',
      'Parking fees & fuel',
      'Sarong for temple visit',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Village Temple',
        desc: 'Visiting one of the oldest village temples in Bali predicted to have been built in 944, where we learn more about the tradition, culture, and Balinese way of life.',
      },
      {
        time: '#2',
        title: 'Tegenungan Waterfall',
        desc: 'The best waterfall in Ubud with a stunning view and great surrounding landscape where you can get the best picture spots.',
      },
      {
        time: '#3',
        title: 'Rice Terraces of Tegalalang',
        desc: 'Natural landscape featuring the beauty of the countryside and unique Subak irrigation system—connect with peaceful nature.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Relax inside your private air-conditioned vehicle for the comfortable return drop-off to your hotel.',
      },
    ],
  },
  {
    id: 'snorkeling-waterfall',
    title: 'Snorkeling & Hidden Waterfalls Tour',
    tagline: 'Blue Lagoon & Waterfalls',
    shortDesc:
      'Explore eastern Bali’s clear blue waters at Blue Lagoon & Jepun by traditional boat, enjoy lunch, and capture Instagram moments at Kanto Lampo & Tibumana Waterfalls.',
    longDesc:
      'This is a special tour package that we offer to our valued customers for their Bali snorkeling trip. On this trip we more going to eastern part of Bali to explore Bali under sea, here you could enjoy the beauty of clear blue sea water with natural coral and all fishes, turtles and so on. There are two snorkeling spots that you will explore on this our product bloo lagoon and jepun. With two hours duration you will enjoy this trip so much, to reach the places you will transfer with traditional boat with different sensation. Lunch will include on this trip, after finish we will continue to the waterfall of Kanto Lampo and Tibumane to get your Instagram picture.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085408/7b52b661-2049-406d-adef-27a2f4516ea0.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085408/7b52b661-2049-406d-adef-27a2f4516ea0.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085408/7b52b661-2049-406d-adef-27a2f4516ea0.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273432/66378fb7-3b1d-4bde-aaa8-4baa80adf78b.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273483/05d8a22b-4ae2-401f-8cb8-9ebc1428f862.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273535/cc8f5707-3256-4e01-9e25-bd3d4a3dd71f.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273538/327f6b59-391d-4f30-9dc4-38f3aaf79b90.png',
    ],
    pricePerPerson: 45,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 60, childrenPrice: 60 },
      { minPersons: 2, maxPersons: 10, adultPrice: 45, childrenPrice: 45 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: '1 day',
    location: 'Blue Lagoon, Jepun & Hidden Waterfalls',
    difficulty: 'All Ages / Fun Adventure',
    maxPeople: 12,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['07.00 am, 07.30 am, 08.00 am, 08.30 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Towel', 'Sunblock', 'Extra cash'],
    relatedTitle: 'Ubud Cooking Class & 1-Hour Massage',
    relatedExperienceId: 'cooking-class-massage',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 248,
    highlights: [
      'Explore two prime snorkeling spots: Blue Lagoon & Jepun (2 hours)',
      'Traditional boat transfer to eastern Bali coral reefs',
      'Swim with tropical reef fish and sea turtles in clear blue water',
      'Visit Kanto Lampo Waterfall & Tibumana Waterfall for scenic photos',
      'Private air-conditioned car, English-speaking driver, entry tickets, lunch & snorkeling gear',
    ],
    inclusions: [
      'Entrance tickets (Snorkeling sites, Kanto Lampo & Tibumana Waterfalls)',
      'Lunch',
      'Mineral water',
      'Private tour with fully air conditioned car',
      'English Speaking Driver',
      'Snorkeling Equipment',
    ],
    exclusions: [
      'Personal expenses',
      'Extra cash for optional purchases',
      'Voluntary driver/guide gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Two hours of Snorkeling',
        desc: 'Traditional boat transfer to Blue Lagoon and Jepun coral reefs with full snorkeling equipment.',
      },
      {
        time: '#2',
        title: 'Kanto Lampo Waterfall',
        desc: 'Enjoy lunch after snorkeling, then visit the dramatic stepped rock cascades of Kanto Lampo.',
      },
      {
        time: '#3',
        title: 'Tibumane Waterfall',
        desc: 'Continue to the serene jungle canyon waterfall of Tibumana for memorable Instagram photos.',
      },
      {
        time: '#4',
        title: 'Back hotel',
        desc: 'Relax in your private fully air-conditioned vehicle on the comfortable return drop-off to your hotel.',
      },
    ],
  },
  {
    id: 'cooking-class-massage',
    title: 'Ubud Cooking Class & 1-Hour Massage',
    tagline: 'Culinary & Spa Sanctuary',
    shortDesc:
      'Visit an authentic Ubud morning market, learn traditional Balinese home cooking in a local compound, savor your feast, and unwind with a 1-hour Ubud spa massage.',
    longDesc:
      'Bali cooking class is very popular and interesting to experiences, at the beginning we will start with the traditional market visiting to see how the local activities start so early and learn more about the spicy that we grow locally in Bali. The places where we will start your cooking class is in Ubud village, where all the organic stuffs and delicious culinary coming from. After that we heading to the cooking class that take place at one of the local house, before starting we have opportunity to see how the Balinese compound looks like and learn about local tradition. You will be handling by Balinese woman who professionally well known the way how to cook in authentic Balinese way. She will introduce to you a few popular dishes and often offer at the famous local restaurant.\n\nAfter you finish and enjoy your lunch there, we will bring you to the best spa in Ubud and get your one hour massage. It is a perfect day combination.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085422/66388523-59c7-411b-b2a6-ff1c1080200a.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085422/66388523-59c7-411b-b2a6-ff1c1080200a.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085422/66388523-59c7-411b-b2a6-ff1c1080200a.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164265/3ae5e650-ad31-4549-a478-77fec634e853.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273296/d3e70d94-f8de-4b68-b0ee-ca1f081df4be.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273300/f8d7606f-d916-4954-9c4b-4bdcc7ea4f98.png',
    ],
    pricePerPerson: 100,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 130, childrenPrice: 130 },
      { minPersons: 2, maxPersons: 10, adultPrice: 100, childrenPrice: 100 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: '1 day',
    location: 'Ubud Village & Best Ubud Spa',
    difficulty: 'Easy / Cultural & Wellness',
    maxPeople: 12,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: [
      'Morning class : 08.00 am, 08.30 am.',
      'Afternoon class : 13.00 pm.',
    ],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Extra cash'],
    relatedTitle: 'Mount Batur Sunrise & Tegalalang Tour',
    relatedExperienceId: 'batur-sunrise-tegalalang',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 5.0,
    reviewCount: 196,
    highlights: [
      'Guided morning visit to an authentic Ubud traditional market',
      'Explore a traditional Balinese family compound and local culture',
      'Hands-on cooking class with an experienced Balinese culinary instructor',
      'Vegetarian option available with fresh organic ingredients & welcome drink',
      'Relaxing one-hour Balinese massage at a premier spa in Ubud',
    ],
    inclusions: [
      'Entry tickets',
      'Lunch',
      'Mineral water',
      'All ingredients',
      'Cultural introduction',
      'Market tour',
      'Vegetarian option',
      'Welcome drink',
      'Private tour with fully air conditioned car',
      'English Speaking Driver',
      'Cooking class instructor',
      'One hour Massage',
    ],
    exclusions: [
      'Personal expenses',
      'Extra cash for optional purchases',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Visit Traditional Market',
        desc: 'Start early at a traditional Ubud market to explore local spices and fresh organic produce.',
      },
      {
        time: '#2',
        title: 'Cooking Class',
        desc: 'Visit a traditional Balinese family compound, cook authentic Balinese dishes, and enjoy your lunch.',
      },
      {
        time: '#3',
        title: 'One Hour Massage',
        desc: 'Unwind at one of Ubud’s finest spas with a restorative one-hour traditional massage.',
      },
      {
        time: '#4',
        title: 'Back hotel',
        desc: 'Private air-conditioned transfer safely back to your hotel or villa.',
      },
    ],
  },
  {
    id: 'batur-sunrise-tegalalang',
    title: 'Mount Batur Sunrise & Tegalalang Tour',
    tagline: 'Sunrise Trekking & Rice Terraces',
    shortDesc:
      'Summit Mount Batur before dawn with a professional trekking guide, enjoy hot drinks & breakfast at the crater rim, then unwind at Ubud’s iconic Tegalalang Rice Terraces.',
    longDesc:
      'The private transfer of Batur Sunrise Trekking. Mount Batur located in kintamani village, Bangli district, Bali. It’s located around 1000 meters above the sea level. Batur sunrise trekkin will begin in darkness with flashlights with professional local guide provided, the first part is easy but once reaches half way you’ll pass slippery part and you need big effort to concur the summit. Once you reaches, the sky turns from black to inky blue to pink and orange that change slowly. The trek is about 2 hours, there are few best spots to enjoying sunrise on mount Batur and place where you can get your best picture shot.\n\nYou can sit on the chair overlooking the village rooftops in the bottom, sipping hot drink and having yummy breakfast. After completion breakfast and take several photos, we will going to concur the rim of main crater ahead bottom rim of main crater, here you can feed monkeys, take picture and make some video. The Sunrise trekking tour will complete around 9:00 am, it depending how quickly your speed during your trek.\n\nAfter that you meet your driver and continue the trip to the rice terraces of Tegalalang in Ubud. Here you will overlooking the best greenery landscape that will bring you peace and refreshing your mind, all your tiredness after the trekking will just suddenly gone.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085479/0a831e48-bfaf-4416-9ea4-7a0cc49b98f0.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085479/0a831e48-bfaf-4416-9ea4-7a0cc49b98f0.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085479/0a831e48-bfaf-4416-9ea4-7a0cc49b98f0.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273642/f63747c7-beda-4008-9741-df5158e30e28.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273649/7da0325f-3abf-440b-b8e4-a9e082b3ab42.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273652/df23ff59-3753-4447-8187-bfb90495e921.png',
    ],
    pricePerPerson: 60,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 100, childrenPrice: 100 },
      { minPersons: 2, maxPersons: 10, adultPrice: 60, childrenPrice: 60 },
    ],
    tourNote: 'Ticket included. Excluded: lunch & personal expenses.',
    duration: '1 day',
    location: 'Mount Batur & Tegalalang, Ubud',
    difficulty: 'Moderate / Sunrise Summit Trek',
    maxPeople: 12,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['01.00 am, 01.30 am, 02.00 am, 02.30 am (Depend on your Hotel)'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Trekking shoes', 'Jacket', 'Extra cash'],
    relatedTitle: 'Ayung River Rafting & Monkey Forest',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 312,
    highlights: [
      'Private early-morning transfer to Mount Batur in Kintamani',
      '2-hour guided summit trek with flashlights to watch the sunrise',
      'Hot drink & breakfast overlooking the caldera and main crater rim',
      'Optional Coffee Plantation stop on the return route',
      'Scenic walk through the lush green Tegalalang Rice Terraces in Ubud',
    ],
    inclusions: [
      'Entrance tickets (Mount Batur area & Tegalalang Rice Terraces)',
      'Breakfast',
      'Mineral water',
      'Private tour with fully air conditioned car',
      'English Speaking Driver',
      'Professional trekking Guide',
      'Flash light',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Extra cash for optional purchases',
      'Voluntary driver/guide gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Batur Sunrise Trekking',
        desc: 'Early morning ascent (~2 hours) with a professional local guide and flashlight to witness the golden sunrise and enjoy breakfast at the summit.',
      },
      {
        time: '#2',
        title: 'Coffee Plantation (optional)',
        desc: 'Optional stop at a traditional Balinese highland plantation to sample local coffee and herbal teas.',
      },
      {
        time: '#3',
        title: 'Tegalalang Rice Terraces',
        desc: 'Continue to Ubud’s iconic emerald rice terraces to take in peaceful panoramic valley views.',
      },
      {
        time: '#4',
        title: 'Back hotel',
        desc: 'Comfortable private air-conditioned transfer back to your hotel.',
      },
    ],
  },
  {
    id: 'ubud-waterfalls-monkey-market',
    title: 'Ubud Waterfalls, Monkey Forest & Art Market',
    tagline: 'Waterfalls, Terraces & Ubud Market',
    shortDesc:
      'Capture Tibumana and Kanto Lampo waterfalls with a private guide, admire Tegalalang Rice Terrace, meet Balinese long-tailed monkeys, and browse Ubud Art Market.',
    longDesc:
      'Pack your cameras for a full day tour around some of Bali’s most picturesque waterfalls. Rather than rushing from site to site with a large group of tourists, spend around an hour at each location with only a private guide accompanying you. Get stunning shots of the lush rainforest surrounding Tibumana and the terraced cliff-side of Kanto Lampo. After that heading to visit the Tegalalang rice terrace with a spectacular view. Then next we have to visit Monkey forest. Here you can see and experience the sanctuary or natural habitat of Balinese long-tailed monkey is called Macaca fascicularis. And our last stop at ubud art market Experience the Balinese traditional market in Ubud.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795162357/30b47c4d-eecc-4f2f-bc63-f7e7c4b5348b.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795162357/30b47c4d-eecc-4f2f-bc63-f7e7c4b5348b.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795162357/30b47c4d-eecc-4f2f-bc63-f7e7c4b5348b.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795162393/b3f3dfa4-0fef-4ab4-8006-433dae24dde6.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273767/9c534976-e77e-499a-bab9-5e9a933f1e72.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273771/7c761736-148e-4cc1-8f52-e31cc1c573de.png',
    ],
    pricePerPerson: 45,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 80, childrenPrice: 80 },
      { minPersons: 2, maxPersons: 10, adultPrice: 45, childrenPrice: 45 },
    ],
    tourNote: 'Ticket included. Excluded: lunch & personal expenses.',
    duration: '1 day',
    location: 'Tibumana, Kanto Lampo, Tegalalang & Ubud',
    difficulty: 'Easy / Sightseeing & Photography',
    maxPeople: 12,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Camera', 'Comfortable walking shoes', 'Swimwear & towel', 'Extra cash'],
    relatedTitle: 'Snorkeling & Hidden Waterfalls Tour',
    relatedExperienceId: 'snorkeling-waterfall',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 274,
    highlights: [
      'Unhurried ~1 hour private stops at Tibumana & Kanto Lampo Waterfalls',
      'Panoramic valley views at Tegalalang Rice Terrace',
      'Explore the Sacred Monkey Forest Sanctuary (Macaca fascicularis)',
      'Discover traditional Balinese crafts at Ubud Art Market',
      'Entrance tickets, private AC car, English-speaking driver & fuel included',
    ],
    inclusions: [
      'Entrance tickets (Tibumana, Kanto Lampo, Tegalalang & Monkey Forest)',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Mineral Water',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Optional activities (such as Bali Swing)',
      'Voluntary driver gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Tibumana Waterfall',
        desc: 'Spend around an hour photographing the lush rainforest waterfall of Tibumana with your private guide.',
      },
      {
        time: '#2',
        title: 'Kanto Lampo Waterfall',
        desc: 'Capture dramatic shots along the terraced cliff-side cascades of Kanto Lampo.',
      },
      {
        time: '#3',
        title: 'Tegalalang Rice Terrace',
        desc: 'Continue to the iconic emerald rice terraces of Tegalalang for spectacular highland views.',
      },
      {
        time: '#4',
        title: 'Ubud Monkey Forest',
        desc: 'Experience the natural sanctuary of the Balinese long-tailed monkey (Macaca fascicularis).',
      },
      {
        time: '#5',
        title: 'Ubud Art Market & Back Hotel',
        desc: 'Browse the traditional Balinese Ubud Art Market before your comfortable return drop-off.',
      },
    ],
  },
  {
    id: 'nungnung-sangeh-taman-ayun',
    title: 'Nungnung Waterfall, Sangeh & Taman Ayun',
    tagline: 'Waterfall, Forest & Royal Temple',
    shortDesc:
      'Discover the 70-metre Nungnung Waterfalls in central Bali, visit 600 gray long-tailed macaques at Sangeh Monkey Forest, and explore the floating Royal Temple of Taman Ayun.',
    longDesc:
      'Having picked you up at your hotel in Bali, we’ll make our way to the centre of the island to visit one of the most spectacular natural landscapes in the country: The Nung Nung Waterfalls , at over 330 feet (70 metres) tall. Then heading to Sangeh Monkey Forest is forest inhabited by gray long-tailed macaques (Macaca fascicularis) numbering approximately 600 tails. Our last stop is at Taman Ayun Temple is a Royal Temple of Mengwi Empire and it is located in Mengwi Village, It is set on the land which is surrounded by the big fish pond and look like a drift on the water.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795163744/532b45c4-3378-41c6-a098-449556419fc4.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795163744/532b45c4-3378-41c6-a098-449556419fc4.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795163744/532b45c4-3378-41c6-a098-449556419fc4.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795163762/8456c43b-a7b0-426f-9f19-84e767831204.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273896/6c7f1856-a911-408f-9a0b-f5401aad10d8.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273904/fd263ee8-1f4b-404a-a22d-2d99d22c9b6c.png',
    ],
    pricePerPerson: 40,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 70, childrenPrice: 70 },
      { minPersons: 2, maxPersons: 10, adultPrice: 40, childrenPrice: 40 },
    ],
    tourNote: 'Ticket included. Excluded: lunch and personal expenses.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Nungnung, Sangeh & Mengwi',
    difficulty: 'Moderate / Sightseeing & Nature',
    maxPeople: 50,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Comfortable walking shoes', 'Camera', 'Extra cash'],
    relatedTitle: 'Aling-Aling Waterfall & Handara Gate',
    relatedExperienceId: 'aling-aling-handara-lunch',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 214,
    highlights: [
      'Witness the majestic 70-metre (330 ft) Nungnung Waterfalls in central Bali',
      'Walk among ~600 long-tailed macaques at Sangeh Monkey Forest',
      'Explore Taman Ayun Royal Temple of the Mengwi Empire surrounded by lotus ponds',
      'Entrance tickets & Balinese Sarong for temple visits included',
      'Private air-conditioned car with English-speaking driver & fuel',
    ],
    inclusions: [
      'Entrance tickets (Nungnung Waterfall, Sangeh Monkey Forest & Taman Ayun Temple)',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Balinese Sarong for Visit the Temple',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Voluntary driver gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Nungnung Waterfalls',
        desc: 'Morning hotel pickup heading to central Bali’s spectacular 70-metre Nungnung Waterfalls.',
      },
      {
        time: '#2',
        title: 'Sangeh Monkey Forest',
        desc: 'Visit the peaceful nutmeg forest sanctuary home to around 600 Balinese long-tailed macaques.',
      },
      {
        time: '#3',
        title: 'Taman Ayun Temple',
        desc: 'Conclude at Mengwi’s Royal Temple of Taman Ayun, surrounded by tranquil fish ponds.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Private air-conditioned drop-off back to your hotel.',
      },
    ],
  },
  {
    id: 'bali-swing-spa-transport',
    title: 'Ubud Jungle Swing & Balinese Spa',
    tagline: 'Jungle Swing, 1-Hour Spa & Lunch',
    shortDesc:
      'Soar over spectacular jungle & rice terraces on Bali’s most Instagrammable swings, savor a delicious lunch, and unwind with a one-hour massage at Ubud’s finest spa.',
    longDesc:
      'Let challenge your self with shaking sensations of super beautiful swing with spectacular jungle and rice terrace view. This place are very instagramable for who love posted pictures. Then next let enjoy a one-hour massage treatment at the best one spa in Ubud. This tour includes lunch with flexible time you can take after or before Spa.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164224/dba9a562-fc7e-4657-9927-126b3daec054.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164224/dba9a562-fc7e-4657-9927-126b3daec054.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164224/dba9a562-fc7e-4657-9927-126b3daec054.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164236/68147218-7062-4aa3-bc9a-a2740be81d94.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164265/3ae5e650-ad31-4549-a478-77fec634e853.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274009/97ab54c8-9913-4fc4-8fe2-7f09f42c166d.png',
    ],
    pricePerPerson: 80,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 120, childrenPrice: 120 },
      { minPersons: 2, maxPersons: 10, adultPrice: 80, childrenPrice: 80 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Ubud Swing & Spa Sanctuary',
    difficulty: 'Easy / Thrill & Wellness',
    maxPeople: 50,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Colorful outfit for swing photos', 'Camera', 'Extra cash'],
    relatedTitle: 'Ubud Palace, Tirta Empul & Jungle Swing',
    relatedExperienceId: 'ubud-iconic-tirta-empul-swing',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 5.0,
    reviewCount: 289,
    highlights: [
      'Thrilling scenic swings overlooking Ubud’s lush jungle & rice terraces',
      'One-hour Balinese spa massage treatment at a premier Ubud spa',
      'Flexible-time lunch included (before or after your spa session)',
      'Entry & swing tickets, one-hour spa, lunch, insurance & private AC transport included',
    ],
    inclusions: [
      'Entrance tickets & Bali Swing activity ticket',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'One Hour Balinese Spa',
      'Insurance',
      'Lunch',
    ],
    exclusions: [
      'Personal Expense',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Bali Jungle Swing Experience',
        desc: 'Challenge yourself on Bali’s most Instagrammable jungle and rice terrace swings with panoramic canyon backdrops.',
      },
      {
        time: '#2',
        title: 'One Hour Balinese Spa & Flexible Lunch',
        desc: 'Indulge in a restorative one-hour traditional Balinese massage at Ubud’s finest spa, paired with lunch before or after your treatment.',
      },
      {
        time: '#3',
        title: 'Back Hotel',
        desc: 'Relaxed private air-conditioned return transfer back to your hotel.',
      },
    ],
  },
  {
    id: 'aling-aling-handara-lunch',
    title: 'Aling-Aling Waterfall & Handara Gate',
    tagline: 'Waterfall Cliff Jump & Handara Gate',
    shortDesc:
      'Slide and cliff-jump across Kroya, Kembar, Pucuk & Aling-Aling Waterfalls, enjoy lunch with scenic views, capture the iconic Handara Gate, and visit a traditional coffee plantation.',
    longDesc:
      'If you’re looking for an adrenaline packed day in Bali then Jumping Sliding at Aling- Aling Waterfall one of the best waterfalls in Bali, here’s why. Challenge yourself by sliding through the waterfall with an provided sliding board. Afterward, direct to the next gorgeous waterfalls of Kroya, Kembar, Pucuk and Aling Aling Waterfall. Spend 8 hours visiting, enjoy 2 hours the best nature of waterfall also can rush your adrenaline with cliff jumping and sliding Including Lunch at beautiful view heading to instagramable handara gate and our last stop at coffee plantation for observed how balinese people make coffee by traditional way.',
    tourNote: 'Entry tickets & lunch included.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164533/bcef8053-1432-4d85-ba1f-d20f9687ad21.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274105/4ce2284c-6abe-451c-8ac2-bac000d8ab50.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274123/7cf4336d-1b95-4138-b5cc-084f418eb893.png',
    ],
    pricePerPerson: 60,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 100, childrenPrice: 100 },
      { minPersons: 2, maxPersons: 10, adultPrice: 60, childrenPrice: 60 },
    ],
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Aling-Aling Waterfall & Handara Gate',
    difficulty: 'Active / Adrenaline & Nature',
    maxPeople: 50,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['07.30 am, 08.00 am, 08.30 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Swimwear', 'Water shoes / sandals with grip', 'Change of clothes & towel', 'Extra cash'],
    relatedTitle: 'Nungnung Waterfall, Sangeh & Taman Ayun',
    relatedExperienceId: 'nungnung-sangeh-taman-ayun',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 261,
    highlights: [
      '2 hours of cliff jumping & waterfall sliding across Kroya, Kembar, Pucuk & Aling-Aling',
      'Scenic lunch overlooking northern Bali’s lush mountain landscape',
      'Instagrammable photo session at the iconic Handara Gate',
      'Traditional Balinese coffee plantation visit',
      'Entry tickets, insurance, lunch & private AC transport included',
    ],
    inclusions: [
      'Entrance & activity tickets (Aling-Aling Waterfall & Handara Gate)',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Insurance',
      'Lunch',
    ],
    exclusions: [
      'Personal Expense',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Aling-Aling, Kroya, Kembar & Pucuk Waterfalls',
        desc: 'Spend 2 thrilling hours sliding on a provided board and cliff-jumping across four pristine jungle waterfalls.',
      },
      {
        time: '#2',
        title: 'Scenic Lunch',
        desc: 'Refuel with an included lunch while enjoying serene northern highland views.',
      },
      {
        time: '#3',
        title: 'Handara Gate',
        desc: 'Stop at Bali’s famous mountain-framed Handara Gate for unforgettable photos.',
      },
      {
        time: '#4',
        title: 'Traditional Coffee Plantation & Back Hotel',
        desc: 'Observe how Balinese locals roast and prepare traditional coffee before your private return transfer.',
      },
    ],
  },
  {
    id: 'ubud-iconic-tirta-empul-swing',
    title: 'Ubud Palace, Tirta Empul & Jungle Swing',
    tagline: 'Monkey Forest, Tirta Empul & Swing',
    shortDesc:
      'Explore Sacred Monkey Forest (~800 macaques) and Ubud Palace, gaze over Tegalalang Rice Terrace with an optional Jungle Swing, and join Balinese purification at Tirta Empul Temple.',
    longDesc:
      'This is a great custom tour with display the canter of Ubud to experience the popular sacred monkey forest and Ubud Palace where you can see around 800 populations of Balinese long-tailed macaques in the jungle. Continue to visiting stunning view of Tegalalang rice terrace Located around 10 km north of Ubud its terraced rice fields are a tourist attraction in the area you also able do the most popular jungle swing And Experience traditional balinese purification at Tirta Empul Temple.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164676/308b013b-5ab7-4c26-af73-b6f076232206.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274274/46b26062-eab1-42e7-87fc-03541f5aff07.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274286/7fed5a23-3571-49bb-99dd-916eb4f86faf.png',
    ],
    pricePerPerson: 75,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 100, childrenPrice: 100 },
      { minPersons: 2, maxPersons: 10, adultPrice: 75, childrenPrice: 75 },
    ],
    tourNote: 'Tickets included. Excluded: lunch and personal expenses.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Ubud Center, Tegalalang & Tirta Empul',
    difficulty: 'Easy / Cultural & Scenic',
    maxPeople: 50,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Change of clothes (for purification ritual)', 'Camera', 'Extra cash'],
    relatedTitle: 'Ubud Jungle Swing & Balinese Spa',
    relatedExperienceId: 'bali-swing-spa-transport',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 342,
    highlights: [
      'Explore Sacred Monkey Forest (~800 Balinese long-tailed macaques) & Ubud Palace',
      'Admire panoramic Tegalalang Rice Terrace 10 km north of Ubud',
      'Include Tegalalang Jungle Swing & attraction entry tickets',
      'Experience sacred Balinese water purification at Tirta Empul Temple',
      'Balinese sarong, bottled water, fuel & private AC car with English driver included',
    ],
    inclusions: [
      'Entrance tickets (Monkey Forest, Tirta Empul, Tegalalang & Jungle Swing)',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Balinese Sarong For Visit The Temple',
      'Bottle of Water',
    ],
    exclusions: [
      'Lunch',
      'Personal Expenses',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Sacred Monkey Forest & Ubud Palace',
        desc: 'Discover the heart of Ubud, meeting ~800 long-tailed macaques at Monkey Forest and visiting the historic Ubud Royal Palace.',
      },
      {
        time: '#2',
        title: 'Tegalalang Rice Terrace & Jungle Swing',
        desc: 'Take in dramatic emerald rice terrace vistas 10 km north of Ubud with optional Jungle Swing rides.',
      },
      {
        time: '#3',
        title: 'Balinese Purification at Tirta Empul Temple',
        desc: 'Participate in or witness the sacred Balinese Melukat water purification ritual at Tirta Empul.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Private air-conditioned transfer comfortably back to your hotel.',
      },
    ],
  },
  {
    id: 'water-sports-uluwatu-temple',
    title: 'Tanjung Benoa Water Sports & Uluwatu',
    tagline: 'Water Sports & Uluwatu Cliff Temple',
    shortDesc:
      'Start at 9:00 AM for thrilling Tanjung Benoa water sports—banana boat, jet ski, parasailing & donut boat—followed by a scenic visit to the 11th-century cliffside Uluwatu Temple.',
    longDesc:
      'Best combinations Bali Water Sports and Uluwatu Tour with wonderful experience for water activities combine with visiting Uluwatu temple which is built in the 11th century and its one of nine directional temples meant to protect Bali from evil spirits. The trip will be start at 9.00 AM form your hotel then Heading to Tanjung Benoa Nusa Dua where you can enjoy the water sports activities such as banana boat, jet ski, parasailing and Donat boat.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165199/c71fa872-5200-47b3-8e3b-d0f212e2a895.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165199/c71fa872-5200-47b3-8e3b-d0f212e2a895.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165199/c71fa872-5200-47b3-8e3b-d0f212e2a895.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165210/ea7b8534-8d39-4124-b18c-f147d21519e6.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165217/928310f3-ae81-4749-ac19-9ba6d8a18e83.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274371/833c31e1-8ddc-46a5-bb82-04723cb0bc6c.png',
    ],
    pricePerPerson: 50,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 60, childrenPrice: 60 },
      { minPersons: 2, maxPersons: 10, adultPrice: 50, childrenPrice: 50 },
    ],
    tourNote: 'Ticket, lunch & personal expenses are excluded.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Tanjung Benoa & Uluwatu Temple',
    difficulty: 'Fun Adventure / Ocean & Cliff Temple',
    maxPeople: 50,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Swimwear', 'Sunscreen', 'Change of clothes & towel', 'Extra cash'],
    relatedTitle: 'Snorkeling & Hidden Waterfalls Tour',
    relatedExperienceId: 'snorkeling-waterfall',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 295,
    highlights: [
      'Thrilling Tanjung Benoa marine water sports: banana boat, jet ski, parasailing & donut boat',
      'Visit historic 11th-century Uluwatu Cliff Temple, one of Bali’s nine directional temples',
      'Insurance, private AC car, fuel & English-speaking driver included',
      'Convenient 9:00 AM private hotel pickup across Bali',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Insurance',
    ],
    exclusions: [
      'Entrance tickets (Uluwatu Temple) & water sports activity tickets',
      'Lunch',
      'Personal Expenses',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Hotel Pickup (09:00 AM)',
        desc: 'Depart your Bali hotel at 9:00 AM in a private fully air-conditioned car.',
      },
      {
        time: '#2',
        title: 'Tanjung Benoa Water Sports (Nusa Dua)',
        desc: 'Enjoy banana boat, jet ski, parasailing, and donut boat rides along Tanjung Benoa bay.',
      },
      {
        time: '#3',
        title: 'Uluwatu Cliff Temple',
        desc: 'Explore the 11th-century cliffside Uluwatu Temple overlooking the Indian Ocean.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Relax on your comfortable private air-conditioned return drop-off.',
      },
    ],
  },
  {
    id: 'bali-atv-quad-lunch-spa',
    category: 'activities',
    title: 'Ubud ATV Quad Bike & 1-Hour Spa',
    tagline: 'Activity • ATV Ride, Lunch & Spa',
    shortDesc:
      'Explore Bali’s countryside and villages on a guided 2-hour ATV quad bike adventure, refuel with a buffet lunch, and finish with a relaxing one-hour spa massage.',
    longDesc:
      'This tour we provide for who like adventure with relaxation, first from the hotel we drive you to the country side where you can explore the village by ATV quad bike adventure, the duration about 2 hours especially this trip would be assisted by a professional instructor. This tour also includes buffet lunch. Your tour then finished at Spa. At the spa, you can enjoy a one-hour massage treatment.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165670/805c6556-85d0-4a17-9ab1-07ab711f5b45.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165670/805c6556-85d0-4a17-9ab1-07ab711f5b45.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165670/805c6556-85d0-4a17-9ab1-07ab711f5b45.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164265/3ae5e650-ad31-4549-a478-77fec634e853.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274478/8ed6ff73-ac80-4c7e-a306-7e9924e49c1f.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274515/18b338a2-d618-487c-b3e1-266d3497ed97.png',
    ],
    pricePerPerson: 90,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 140, childrenPrice: 140 },
      { minPersons: 2, maxPersons: 10, adultPrice: 90, childrenPrice: 90 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Ubud Countryside & Balinese Spa',
    difficulty: 'Active / Adventure & Spa',
    maxPeople: 50,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Change of clothes', 'Comfortable outdoor shoes', 'Extra cash'],
    relatedTitle: 'Ayung River Rafting & Monkey Forest',
    relatedExperienceId: 'white-water-rafting-monkey-forest',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 238,
    highlights: [
      '2-hour countryside & village ATV quad bike ride assisted by a professional instructor',
      'Indonesian buffet lunch, locker & towel facilities provided',
      'One-hour soothing Balinese spa massage treatment after your ride',
      'Entry tickets, insurance, fuel & private AC car with English-speaking driver',
    ],
    inclusions: [
      'ATV entry tickets & site admission fees',
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Insurance',
      'Locker',
      'Towel',
      'Buffet Lunch',
      'One-hour Balinese spa massage',
    ],
    exclusions: [
      'Personal Expense',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'ATV Quad Bike Adventure (2 Hours)',
        desc: 'Drive to the Balinese countryside and explore rural trails and villages by ATV quad bike with a professional instructor.',
      },
      {
        time: '#2',
        title: 'Shower & Buffet Lunch',
        desc: 'Freshen up using the provided locker and towel, then enjoy a delicious buffet lunch.',
      },
      {
        time: '#3',
        title: 'One-Hour Spa Massage Treatment',
        desc: 'Complete your day unwinding at the spa with a restorative one-hour massage.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Private air-conditioned transfer comfortably back to your hotel.',
      },
    ],
  },
  {
    id: 'white-water-rafting-monkey-forest',
    category: 'activities',
    title: 'Ayung River Rafting & Monkey Forest',
    tagline: 'Activity • Rafting, Lunch & Monkeys',
    shortDesc:
      'Paddle 2 hours down Ubud’s scenic Ayung River past lush jungle and waterfalls, savor an Indonesian buffet lunch by rice fields, and visit Ubud Sacred Monkey Forest (~800 macaques).',
    longDesc:
      'Let’s enjoy Tour packed white water rafting with beautiful scenery at Ayung river located at northwest of Ubud. The duration would be 2 hours and along the river, you will see a very natural jungle with a beautiful waterfall. After the ride, this tour also includes Indonesian buffet lunch. Then we will show you the sacred monkey forest with 800 population of long tail monkeys.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165877/b5ed250c-876d-4f3d-8f68-c1a76918fd1b.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165877/b5ed250c-876d-4f3d-8f68-c1a76918fd1b.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795165877/b5ed250c-876d-4f3d-8f68-c1a76918fd1b.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274608/0fb8a0ad-97ee-499d-9648-9bda4cf039b0.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274622/2a463ab8-fec6-4090-834b-8eeb05ffc1f6.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795273767/9c534976-e77e-499a-bab9-5e9a933f1e72.png',
    ],
    pricePerPerson: 80,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 100, childrenPrice: 100 },
      { minPersons: 2, maxPersons: 10, adultPrice: 80, childrenPrice: 80 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: '8 hours',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: 'English',
    location: 'Ayung River & Ubud Monkey Forest',
    difficulty: 'Active / River Rafting & Nature',
    maxPeople: 50,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 08.30 am, 09.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Swimwear & quick-dry clothes', 'Water shoes or strapped sandals', 'Change of clothes & extra cash'],
    relatedTitle: 'Ubud ATV Quad Bike & 1-Hour Spa',
    relatedExperienceId: 'bali-atv-quad-lunch-spa',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 267,
    highlights: [
      '2 hours of thrilling white water rafting along Ayung River northwest of Ubud',
      'Pass natural rainforest gorges and hidden river waterfalls',
      'Indonesian buffet lunch with a stunning rice field view',
      'Visit Sacred Monkey Forest Sanctuary in Ubud (entry tickets included)',
    ],
    inclusions: [
      'Entrance tickets (Monkey Forest & Ayung River rafting admission)',
      '2 hours Ayung River white water rafting experience',
      'Indonesian buffet lunch with a stunning view of rice field',
      'Private AC transfer to Sacred Monkey Forest Sanctuary Ubud',
    ],
    exclusions: [
      'Personal Expense',
      'Voluntary gratuities',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Ayung River White Water Rafting (2 Hours)',
        desc: 'Navigate 2 hours of rapids along the Ayung River surrounded by untouched jungle and scenic waterfalls.',
      },
      {
        time: '#2',
        title: 'Indonesian Buffet Lunch',
        desc: 'Enjoy a freshly prepared Indonesian buffet lunch overlooking tranquil green rice fields.',
      },
      {
        time: '#3',
        title: 'Sacred Monkey Forest Ubud',
        desc: 'Walk through Ubud’s ancient temple forest home to around 800 Balinese long-tailed monkeys.',
      },
      {
        time: '#4',
        title: 'Back Hotel',
        desc: 'Relax in your private vehicle on the return drop-off to your hotel.',
      },
    ],
  },
  {
    id: 'ubud-atv-jungle-mud-track',
    category: 'activities',
    title: 'Ubud ATV Jungle & Mud Track',
    tagline: 'Activity • Jungle ATV & Mud Track',
    shortDesc:
      'Conquer Bali’s longest ATV track through narrow jungle paths, bamboo forests, a 45-degree valley descent, traditional villages, and an epic mud splash zone in Ubud.',
    longDesc:
      'Ignite your sense of adventure with the most thrilling Bali quad biking experience in Ubud. Designed for both beginners and experienced riders, this off-road journey breaks away from the usual tourist trails and plunges you straight into Bali’s wild terrain.\n\nYour experience begins with a safety briefing from our expert instructors, who will get you kitted out with top-tier safety gear, including helmets and boots. Once you are comfortable on your powerful quad bike, it’s time to rev your engine and hit the trail. Feel the rush of adrenaline as you navigate narrow jungle paths, conquer a thrilling 45-degree descent into a scenic river valley, and echo through shaded bamboo forests.\n\nAlong the way, you’ll get a glimpse of authentic island life. Wave back at friendly locals as you pass through traditional Balinese villages and cruise alongside peaceful rice fields. The real highlight comes at the end of the track—brace yourself for an epic, muddy finish as you blast through a dedicated splash zone where getting wet and dirty is all part of the fun!\n\nAfter conquering the trails, wash off the mud with a refreshing shower and relax as you recount the day’s highlights. Choose our optional hotel transfer for a completely seamless, door-to-door day of adventure.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314084/90eef5c7-1bde-44b2-8faf-6542f83fb4a1.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314084/90eef5c7-1bde-44b2-8faf-6542f83fb4a1.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314084/90eef5c7-1bde-44b2-8faf-6542f83fb4a1.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172267/b24e558f-fd07-4ff8-9bc9-de0cbc2619d0.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274728/05cd1969-51f0-424d-85bd-13dcdd6d3dc9.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274715/e6999088-16ae-4515-b645-53955ade33c7.png',
    ],
    pricePerPerson: 80,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 100, childrenPrice: 100 },
      { minPersons: 2, maxPersons: 10, adultPrice: 80, childrenPrice: 80 },
    ],
    tourNote: 'Entry ticket & lunch included.',
    duration: 'Half Day (4-5 hours)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Max 6 Adults / Car',
    languages: 'English',
    location: 'Ubud Jungle & Mud Track, Bali',
    difficulty: 'Active / Off-Road ATV Adventure',
    maxPeople: 12,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 09.00 am, 10.30 am, 13.00 pm'],
    pickupLocations:
      'Your hotel or accommodation (if hotel pick up selected) across Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
    featureBadges: [
      'Best price guaranty',
      'Open trip',
      'Entry ticket & lunch included',
      'Professional Guide',
    ],
    packageOptions: [
      {
        title: 'ATV Single Ride',
        desc: 'The ultimate choice for thrill-seekers. Enjoy absolute freedom and total control as you conquer every obstacle, muddy turn, and steep slope entirely on your own.',
      },
      {
        title: 'ATV Tandem Ride',
        desc: 'Perfect for couples, friends, or families traveling with children. Share the excitement on one bike with a dedicated passenger seat. Want to mix it up? You can easily swap drivers halfway through the tour!',
      },
    ],
    whatToExpect:
      'Get ready for the ultimate off-road adventure on the longest ATV track in Bali! This Ubud ATV quad bike ride takes you deep into the heart of Bali’s lush wilderness, challenging you with a thrilling mix of muddy tracks, steep descents, and scenic trails. Roar through dense bamboo forests, splash through riverbeds, navigate a dramatic 45-degree valley descent, and cruise past emerald rice fields. With options for both solo riders and pairs, this high-octane experience is the perfect way to see Bali’s raw natural beauty.',
    whatToBring: ['Comfortable shoes / Sandals', 'Sun screen', 'Changing cloth'],
    meetingPoint: [
      'Your hotel or accommodation (if the hotel pick up is selected).',
      'ATV basecamp location (if arriving directly without hotel transfer).',
    ],
    activityNotes: [
      'Hotel Pickup is available if the option is selected.',
      'Returns to original departure point.',
      'Times above are subject to change due to local conditions.',
      'Max participant in a normal car is 6 adults. More than 6 guests requires an additional vehicle arrangement.',
      'If you cancel your booking at least 48 hours before the scheduled time, you will be eligible to get a complete refund.',
    ],
    relatedTitle: 'Ubud Polaris Jungle Buggy (3 Laps)',
    relatedExperienceId: 'ubud-jungle-buggy-adventure',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 318,
    highlights: [
      'Conquer Bali’s Longest & Most Dynamic Track: Experience an adrenaline-pumping route featuring jungle terrain, river crossings, bamboo tunnels, and an epic mud-splashing finale.',
      'Breathtaking, Hidden Landscapes: Ride through untouched Balinese countryside, offering panoramic views of deep valleys, traditional villages, and vibrant green rice paddies.',
      'Flexible Riding Options: Whether you want total control on a solo bike or want to share the thrills with a partner or child, we have the perfect setup for your adventure style.',
    ],
    inclusions: [
      'Entrance tickets & ATV trail admission fees',
      'Hotel pickup and drop off in fully AC vehicle (if the option is selected)',
      'English Speaking driver',
      'Experienced ATV guide',
      'Welcome Drink',
      'Safety Equipment',
      'Lunch',
      'Locker',
      'Shower with Towel & Soap',
      'Insurance',
    ],
    exclusions: [
      'Video & photo documentation',
      'Guide tipping',
      'Personal expenses',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Arrival, Welcome Drink & Safety Briefing',
        desc: 'Meet our expert instructors, gear up with helmets and boots, and get a complete safety briefing before starting.',
      },
      {
        time: '#2',
        title: 'Ubud Jungle, Bamboo Forest & 45-Degree Valley Track',
        desc: 'Ride through narrow jungle trails, shaded bamboo tunnels, traditional Balinese villages, and scenic rice paddies.',
      },
      {
        time: '#3',
        title: 'River Crossing & Mud Splash Zone Finale',
        desc: 'Tackle thrilling riverbeds and blast through the dedicated mud splash zone for an unforgettable finale.',
      },
      {
        time: '#4',
        title: 'Shower, Lunch & Return Transfer',
        desc: 'Wash up with towel & soap provided, enjoy a freshly prepared lunch, and return comfortably to your hotel.',
      },
    ],
  },
  {
    id: 'ubud-jungle-swing-photo-adventure',
    category: 'culture',
    title: 'Tegallalang Jungle Swing & Photo Spots',
    tagline: 'Tegallalang • Swing & Bird Nests',
    shortDesc:
      'Soar 200 meters above Tegallalang’s emerald canopy with 5 swing types, 2 cute nests, a scenic rice paddy stone, and full AC hotel pickup & drop-off.',
    longDesc:
      'Turn your Bali dreams into reality and touch the sky in Ubud!\n\nYour adventure begins as you step into a tropical paradise hidden away from the city noise. After a warm welcome and a quick safety briefing, you’ll be strapped into one of our various swing heights—ranging from “gentle and scenic” to “extreme adrenaline.”\n\nAs you are pushed off the platform, feel the cool mountain breeze on your face and watch the valley floor fall away beneath you. It’s a moment of pure freedom that words simply cannot describe. Whether you are looking for that iconic flowing-dress photo or a heart-pounding experience, our swings offer the perfect height for every comfort level.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172676/8b4adc64-40a6-40c2-a902-ac043fa8031f.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172676/8b4adc64-40a6-40c2-a902-ac043fa8031f.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172676/8b4adc64-40a6-40c2-a902-ac043fa8031f.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172679/c6408579-0509-4431-b15a-53fbdef59b54.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274874/70a1d106-82f9-458b-af75-153c6ab2480e.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274928/8b7e2c5e-78ff-405a-932f-d96082c8f33c.png',
    ],
    pricePerPerson: 40,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 60, childrenPrice: 60 },
      { minPersons: 2, maxPersons: 10, adultPrice: 40, childrenPrice: 40 },
    ],
    tourNote: 'Entry tickets included. Excluded: lunch and personal expenses.',
    duration: 'Half Day (4-5 hours)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Max 6 Adults / Car',
    languages: 'English',
    location: 'Tegallalang, Ubud, Bali',
    difficulty: 'Easy / Scenic & Instagram Photos',
    maxPeople: 12,
    minAge: '8+',
    pickupLabel: 'Location',
    pickupTimes: ['08.00 am, 09.00 am, 10.00 am, 13.00 pm'],
    pickupLocations:
      'Your hotel or accommodation across Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
    featureBadges: [
      'Best price guaranty',
      'Open trip',
      'Entry tickets included',
      'Professional Guide',
    ],
    whatToExpect:
      'Soar high above the emerald canopy and capture the magic of Bali at the Ubud Jungle Swing. Located in the heart of the lush Tegallalang region, this experience offers more than just a thrill—it’s a chance to touch the clouds while overlooking deep river valleys and ancient coconut groves. Perfectly blending adrenaline with “Instagram-worthy” aesthetics, this is the must-do activity for every traveler seeking the soul of Bali.',
    whatToBring: ['Comfortable shoes / Sandals', 'Sun screen', 'Camera'],
    meetingPoint: ['Your hotel or accommodation'],
    activityNotes: [
      'Hotel Pickup is included.',
      'Returns to original departure point.',
      'Times above are subject to change due to local conditions.',
      'Max participant in a normal car is 6 adults. More than 6 please contact us for larger vehicle arrangement.',
      'If you cancel your booking at least 48 hours before the scheduled time, you will be eligible to get a complete refund.',
    ],
    relatedTitle: 'Ubud Jungle Swing & Balinese Spa',
    relatedExperienceId: 'bali-swing-spa-transport',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 284,
    highlights: [
      'Breathtaking Tropical Vistas: Swing out over a dramatic 200-meter drop with panoramic views of the cascading rice terraces and the misty jungle of Ubud. It is the best seat in the house for Bali’s natural beauty.',
      'The Ultimate Photo Haven: Beyond the swings, explore a variety of artistic “Bird’s Nests,” sky beds, and heart-shaped platforms designed specifically to give you the most stunning, viral-worthy vacation photos.',
      'Safety Meets Serenity: Feel the rush with total peace of mind. Our professional team uses international-standard safety harnesses and high-tension ropes, ensuring your only focus is the incredible view.',
    ],
    inclusions: [
      'Entrance tickets to attraction area',
      'Hotel pickup and drop off in fully AC vehicle',
      '5 Type of Swings (1 Single Swing, 1 Tandem Swing, 1 Libra Swing & 1 Romantic Swing)',
      '2 Type of Cute Nests (1 Bird Nest, 1 Chicken Nest)',
      '1 Big Stone with an amazing rice paddy',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Guide tipping',
      'Dress for Photo',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Hotel Pickup & Transfer to Tegallalang',
        desc: 'Comfortable pickup in a fully air-conditioned vehicle directly from your hotel or accommodation.',
      },
      {
        time: '#2',
        title: 'Safety Briefing & Jungle Swing Experience',
        desc: 'Strap into international-standard safety harnesses and soar across 5 swing types high above the 200-meter valley.',
      },
      {
        time: '#3',
        title: 'Bird Nests & Rice Paddy Photo Spots',
        desc: 'Explore 2 artistic nests (Bird Nest & Chicken Nest) plus the iconic Big Stone overlooking emerald rice paddies.',
      },
      {
        time: '#4',
        title: 'Return Drop-off to Hotel',
        desc: 'Relax on your comfortable air-conditioned transfer back to your original departure point.',
      },
    ],
  },
  {
    id: 'ubud-jungle-buggy-adventure',
    category: 'activities',
    title: 'Ubud Polaris Jungle Buggy (3 Laps)',
    tagline: 'Activity • Off-Road Jungle Buggy',
    shortDesc:
      'Drive top-of-the-line Polaris Buggies across an exclusive 4.5km private jungle circuit (3 laps) with entry tickets, safety equipment, and private AC hotel pickup.',
    longDesc:
      'Are you ready to get a little muddy and a lot of excited?\n\nStep away from the typical tourist trails and get behind the wheel for a pulse-pounding adventure in the highlands of Ubud. Your journey begins at our world-class motor park, where our professional guides will provide a comprehensive safety briefing and a practice lap to get you comfortable with the controls.\n\nOnce you’re ready, it’s time to hit the jungle. You’ll navigate through a custom-designed track that winds through thick tropical foliage and challenging terrain. Feel the adrenaline surge as you tackle the natural obstacles of the Balinese wilderness in a vehicle built for pure performance.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172904/a501e706-3f84-4eb8-bf53-7c9a63870443.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795274928/8b7e2c5e-78ff-405a-932f-d96082c8f33c.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795275002/74f74ccf-999f-440b-bb3a-66e8c077638b.png',
    ],
    pricePerPerson: 80,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 120, childrenPrice: 120 },
      { minPersons: 2, maxPersons: 10, adultPrice: 80, childrenPrice: 80 },
    ],
    tourNote: 'Entry tickets included. Excluded: lunch and personal expenses.',
    duration: 'Half Day (3 Laps)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Private Transfer',
    languages: 'English',
    location: 'Ubud Highlands Motor Park, Bali',
    difficulty: 'Active / Off-Road Polaris Buggy',
    maxPeople: 12,
    minAge: '10+',
    pickupLabel: 'Location',
    pickupTimes: ['08.30 am, 10.30 am, 13.00 pm'],
    pickupLocations:
      'Your hotel or accommodation across Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
    featureBadges: [
      'Best price guaranty',
      'Open trip',
      'Entry tickets included',
      'Professional Guide',
    ],
    packageOptions: [
      {
        title: 'Single Ride',
        desc: 'The ultimate choice for thrill-seekers. Enjoy absolute freedom and total control as you conquer every obstacle, muddy turn, and steep slope entirely on your own.',
      },
      {
        title: 'Tandem Ride',
        desc: 'Perfect for couples, friends, or families traveling with children. Share the excitement on one vehicle with a dedicated passenger seat. Want to mix it up? You can easily swap drivers halfway through the tour!',
      },
    ],
    whatToExpect:
      'Experience Bali’s wilderness like never before with the island’s most sophisticated off-road adventure. The Ubud Jungle Buggy tour takes you on a high-octane journey through a purpose-built, challenging track carved into the lush tropical jungle. Whether you are a seasoned driver or a first-timer, our high-end Polaris buggies ensure a safe, powerful, and exhilarating ride through the mud and the green.',
    whatToBring: [
      'Comfortable shoes / sandals',
      'Some cash for your personal expenses',
      'Sun screen',
    ],
    meetingPoint: ['Your hotel or accommodation'],
    relatedTitle: 'Ubud ATV Jungle & Mud Track',
    relatedExperienceId: 'ubud-atv-jungle-mud-track',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 5.0,
    reviewCount: 256,
    highlights: [
      'Elite Off-Road Machinery: Drive the “Rolls Royce” of off-road vehicles. We use top-of-the-line Polaris Buggies equipped with certified roll cages and 4-point harnesses, ensuring maximum power without compromising your safety.',
      'The Jungle Circuit: Forget dusty roads; our exclusive 4.5km private track is designed to test your skills with tight turns, uphill climbs, and downhill slopes, all set against a stunning jungle backdrop.',
      'Mason Adventures Quality: Enjoy the peace of mind that comes with Bali’s most established adventure operator. Expect world-class facilities, professional instructors, and top-tier safety standards.',
    ],
    inclusions: [
      'Entrance tickets & motor park admission fees',
      'Private hotel pickup and drop off in fully AC vehicle',
      'Use of Buggy vehicle on track',
      'Safety Equipment',
      'Professional guides',
      'Free use of lockers',
      'Jungle Buggy 3 laps',
      'Insurance',
    ],
    exclusions: [
      'Lunch',
      'Personal expenses',
      'Guide tipping',
      'Photos / Video',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Private Hotel Pickup & Motor Park Arrival',
        desc: 'Private AC pickup from your hotel heading to the world-class highlands motor park in Ubud.',
      },
      {
        time: '#2',
        title: 'Safety Briefing & Practice Lap',
        desc: 'Comprehensive safety orientation with certified roll cages and 4-point harnesses plus a warm-up practice lap.',
      },
      {
        time: '#3',
        title: 'Jungle Buggy Circuit (3 Laps / 4.5km Track)',
        desc: 'Navigate 3 high-octane laps across tight turns, climbs, slopes, and tropical muddy terrain in a Polaris Buggy.',
      },
      {
        time: '#4',
        title: 'Freshen Up & Return Transfer',
        desc: 'Use free lockers to freshen up (optional lunch available at own expense), then relax on your private transfer back to your hotel.',
      },
    ],
  },
  {
    id: 'ubud-ultimate-culture-crafts-cascades',
    category: 'culture',
    title: 'Ubud Waterfall, Culture & Crafts Tour',
    tagline: 'Private Trip • Tegenungan, Celuk & Terraces',
    shortDesc:
      'An 8-hour private Ubud journey with a live English-speaking guide visiting Tegenungan Waterfall, Celuk silver village, Goa Gajah cave, Monkey Forest, Tegalalang Rice Terraces & Luwak Coffee.',
    longDesc:
      'Embark on an extraordinary 8-hour private adventure, unraveling the very essence of Ubud. This thoughtfully designed tour seamlessly blends cultural immersion with the awe-inspiring beauty of Bali’s landscapes. You’ll begin by witnessing a powerful natural waterfall, then immerse yourself in the intricate world of traditional Balinese craftsmanship.\n\nDelve into the island’s ancient past at a sacred cave and enjoy playful encounters in a mystical forest. The journey continues with breathtaking views of iconic rice terraces, before concluding with a unique taste of local flavors. This comprehensive tour promises genuine experiences, leaving you with cherished memories and a deeper connection to the magic of Bali.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795275060/d46fc671-3975-4dfb-8b86-52270df84cb8.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795275064/a0c8907c-5720-4bac-9a9c-b89a4020c57f.png',
    ],
    pricePerPerson: 40,
    currency: 'USD',
    discountTiers: [
      { minPersons: 0, maxPersons: 1, adultPrice: 60, childrenPrice: 60 },
      { minPersons: 2, maxPersons: 10, adultPrice: 40, childrenPrice: 40 },
    ],
    tourNote: 'Entry tickets included. Excluded: lunch and personal expenses.',
    duration: '8 hours',
    tourType: 'Private Trip',
    groupSize: 'Private',
    languages: 'English Speaking',
    location: 'Tegenungan, Celuk, Goa Gajah & Tegalalang',
    difficulty: 'Easy / Culture, Crafts & Cascades',
    maxPeople: 12,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['08:30 AM'],
    pickupLocations:
      'Your Hotel or accommodation across Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
    featureBadges: [
      'Best price guaranty',
      'Private trip',
      '8 hours’ duration',
      'Live tour guide (English speaking)',
    ],
    whatToExpect:
      'Step into the enchanting world of Ubud with our meticulously designed 8-hour private tour. This isn’t just a trip; it’s an intimate and comprehensive experience that promises to immerse you in Bali’s rich artistic heritage, spiritual depths, and stunning natural landscapes. We’ve curated a journey that perfectly blends iconic landmarks with authentic local encounters, ensuring every moment is filled with discovery and wonder.\n\nThe reasons why this package is the perfect for you:\n• Immersive Cultural & Artistic Discovery: Dive deep into Bali’s vibrant soul as you witness generations of craftsmanship in Celuk Village and explore the profound spiritual history of Goa Gajah. You’ll gain a true appreciation for the island’s artistic and historical legacy.\n• Iconic Natural Beauty & Engaging Wildlife: Marvel at the powerful rush of Tegenungan Waterfall and capture breathtaking photos amidst the terraced beauty of Tegalalang Rice Terraces. Plus, enjoy the unique thrill of interacting with playful macaques in their natural, sacred habitat.\n• Unique Balinese Flavors & Local Insights: Conclude your day with a fascinating visit to a Luwak Coffee Plantation, where you’ll not only learn about one of the world’s most unique coffee-making processes but also savor a delightful array of local teas and coffees.',
    whatToBring: [
      'Comfortable shoes/sandals',
      'Sun screen',
      'Hat',
      'Camera',
    ],
    meetingPoint: ['Your Hotel or accommodation.'],
    relatedTitle: 'Ubud Waterfalls, Monkey Forest & Art Market',
    relatedExperienceId: 'ubud-waterfalls-monkey-market',
    termsAndConditions: SHARED_TERMS_EN,
    rating: 4.9,
    reviewCount: 292,
    highlights: [
      'Tegenungan Waterfall: Witness the breathtaking cascade of water amidst lush jungle, an ideal spot for incredible photos and a moment of natural tranquility.',
      'Celuk Village: Explore the renowned center for Balinese silver and gold crafting, observe skilled artisans at work, and discover intricate handmade jewelry.',
      'Goa Gajah (Elephant Cave): Discover an ancient archaeological site featuring a mysterious cave entrance and serene meditation grounds, rich with history and spiritual ambiance.',
      'Sacred Monkey Forest Sanctuary: Enjoy playful interactions with curious macaques in their natural forest home, surrounded by ancient temples and towering trees.',
      'Tegalalang Rice Terraces: Be captivated by the iconic, vibrant green terraced landscapes, offering panoramic views that define Bali’s agricultural artistry and provide stunning photo opportunities.',
      'Luwak Coffee Plantation: Experience a fascinating sensory journey into the production of the world’s most unique coffee, complete with complimentary tastings of various local brews and teas.',
    ],
    inclusions: [
      'Entrance tickets to all attractions (Tegenungan Waterfall, Goa Gajah, Monkey Forest & Tegalalang)',
      'Experienced local tour guide',
      'Comfortable private car with AC',
      'Bottled drinking water',
      'Sarong for temple visits',
      'Parking fees at all locations',
    ],
    exclusions: [
      'Lunch',
      'Any personal expenses (e.g., souvenir shopping)',
      'Bali Swing ticket',
    ],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Hotel Pick-up',
        desc: 'Your private, air-conditioned vehicle and friendly local driver will greet you at your accommodation.',
      },
      {
        time: '09:15 AM',
        title: 'Tegenungan Waterfall',
        desc: 'Immerse yourself in the beauty of this powerful cascade; take stunning photos or simply enjoy the refreshing atmosphere.',
      },
      {
        time: '10:15 AM',
        title: 'Celuk Village',
        desc: 'Witness the intricate art of silver and gold crafting firsthand and explore exquisite local artworks.',
      },
      {
        time: '11:15 AM',
        title: 'Goa Gajah (Elephant Cave)',
        desc: 'Delve into the history and spiritual aura of this fascinating ancient cave temple and its surroundings.',
      },
      {
        time: '12:15 PM',
        title: 'Lunch Break',
        desc: 'Enjoy a delicious local lunch at a recommended restaurant (at your own expense), savoring authentic Balinese flavors.',
      },
      {
        time: '01:15 PM',
        title: 'Sacred Monkey Forest Sanctuary',
        desc: 'Delight in observing the playful macaques as they roam freely amidst ancient temple grounds and lush forest.',
      },
      {
        time: '02:30 PM',
        title: 'Tegalalang Rice Terraces',
        desc: 'Capture breathtaking photos of the world-famous terraced rice paddies, a testament to Bali’s unique irrigation system.',
      },
      {
        time: '03:15 PM',
        title: 'Luwak Coffee Plantation',
        desc: 'Embark on a unique sensory journey; learn about the famed Luwak coffee production and enjoy complimentary tastings of various Balinese teas and coffees.',
      },
      {
        time: '04:00 PM',
        title: 'Return Transfer',
        desc: 'Begin your comfortable journey back to your hotel, reflecting on an 8-hour day full of discoveries.',
      },
      {
        time: '04:30 PM',
        title: 'Hotel Drop-off',
        desc: 'Arrive back at your accommodation after a smooth 8-hour journey, refreshed and filled with memories of Ubud.',
      },
    ],
  },
  {
    id: 'nusa-penida-day-tour',
    category: 'adventure',
    title: 'Nusa Penida Day Tour',
    tagline: 'West & East Island Explorer',
    shortDesc:
      'Hop in to the glorious island of Nusa Penida—combining iconic West & East cliff beaches including Broken Beach, Angel Billabong, Kelingking Beach, and Diamond Beach with fast boat transfers & lunch.',
    longDesc:
      'Nusa Penida Day Tour – Hop In to the glorious island of Nusa Penida! An island southeast of Indonesia’s Bali and a district of Klungkung Regency that includes the neighboring small island of Nusa Lembongan.\n\nThe Badung Strait separates the island of Nusa Penida and Bali. Nusa Penida has become one of the most Instagrammable spots offering breathtaking views of beaches on the cliff—you must experience it. The best way to get to Nusa Penida from Bali is by boat from Sanur port. This Nusa Penida Tour is a bit different because we offer a combination between the West and East parts of Nusa Penida, Bali, so you experience the finest coastal highlights in one seamless day.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314609/157d29be-da86-4119-8b70-614e261fe478.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314609/157d29be-da86-4119-8b70-614e261fe478.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314609/157d29be-da86-4119-8b70-614e261fe478.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314614/ec36f064-e058-43f0-84a9-bee8181db65d.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795314621/8a1e00d4-2bbd-4309-870b-721ac2f7d6d9.png',
    ],
    pricePerPerson: 95,
    currency: 'USD',
    duration: '1 day',
    tourType: 'Private Trip',
    groupSize: 'Private',
    languages: 'English Speaking',
    tourNote: 'Return fast boat tickets, all fees & lunch included. Group booking qualifies for special deals.',
    location: 'Nusa Penida (West & East)',
    difficulty: 'Easy / Island & Cliff Beaches',
    maxPeople: 12,
    minAge: 'All Ages',
    pickupLabel: 'Location',
    pickupTimes: ['06.00 am, 06.30 am, 07.00 am'],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.',
    whatToBring: ['Cash', 'Sunblock', 'Hat', 'Short pant, slippers suggested'],
    featureBadges: [
      'West & East Combination',
      'Return fast boat included',
      'All fees & lunch included',
    ],
    relatedTitle: '2 Days Tour In Bali (Best Bali experiences)',
    termsAndConditions: [
      'Payment can settle on departure by Cash USD/IDR.',
      'Price is Net includes Government tax.',
      'Cancellation on Departure will be 100 % Charge.',
      'Full refund 48 hours before your departure',
      'Reasonable and fair price and that means no hidden charge',
      'Group booking will be special deals',
    ],
    rating: 4.9,
    reviewCount: 284,
    highlights: [
      'Unique West & East Nusa Penida combination in one seamless day tour',
      'Return fast boat ticket from Sanur Port and all island entrance fees included',
      'Visit Broken Beach, Angel Billabong, Kelingking Beach & Diamond Beach',
      'Private transfer in Bali plus private air-conditioned car on Nusa Penida Island',
      'English-speaking driver, mineral water & island lunch included',
    ],
    inclusions: [
      'Pick up and return Private transfer in Bali',
      'Private car in Nusa Penida Island',
      'English speaking driver',
      'Return fast boat ticket',
      'All fees',
      'Mineral water',
      'Lunch',
    ],
    exclusions: ['Your personal expenses'],
    itinerary: [
      {
        time: '#1',
        title: 'Broken Beach',
        desc: 'Marvel at the dramatic natural coastal rock arch and turquoise cove at Broken Beach (Pasih Uug) on West Nusa Penida.',
      },
      {
        time: '#2',
        title: 'Angel Billabong',
        desc: 'Admire the crystal-clear natural infinity tide pool carved into coastal cliffs right next to Broken Beach.',
      },
      {
        time: '#3',
        title: 'Lunch',
        desc: 'Recharge with an included island lunch before heading to the remaining scenic cliff spots.',
      },
      {
        time: '#4',
        title: 'Kelingking Beach',
        desc: 'Take in iconic panoramic cliff views over the T-Rex peninsula and sparkling turquoise bay at Kelingking Beach.',
      },
      {
        time: '#5',
        title: 'Diamond Beach',
        desc: 'Continue to East Nusa Penida to admire dramatic limestone cliffs, palm-lined stairs, and brilliant blue waters at Diamond Beach.',
      },
      {
        time: '#6',
        title: 'End of Tour',
        desc: 'Fast boat crossing back to Sanur Port followed by comfortable private AC transfer to your hotel in Bali.',
      },
    ],
  },
];

export const EXPERIENCES_ID: Experience[] = [
  {
    ...EXPERIENCES[0],
    tagline: 'Pura Desa Kuno, Air Terjun & Tegalalang',
    shortDesc:
      'Pilihan tepat bagi Anda dengan waktu terbatas—kunjungi pura desa tertua di Bali tahun 944, Air Terjun Tegenungan yang memukau, dan Terasering Sawah Tegalalang.',
    longDesc:
      'Half Day Bali Tour – Paket tur setengah hari yang dirancang khusus bagi tamu kami yang memiliki waktu terbatas atau tidak ingin menghabiskan seharian penuh di perjalanan. Tur ini akan membawa Anda ke spot-spot unggulan Bali mulai dari Pura Desa kuno, Air Terjun Tegenungan, hingga keindahan Terasering Sawah Tegalalang dengan pengalaman hangat yang tak terlupakan.',
    duration: 'Setengah Hari (4-5 jam)',
    tourType: 'Tur Privat',
    groupSize: 'Privat',
    languages: 'Inggris / Indonesia',
    location: 'Pura Desa, Tegenungan & Tegalalang',
    difficulty: 'Santai / Budaya & Alam',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Sepatu / sandal nyaman', 'Kamera', 'Sunblock', 'Uang tunai tambahan'],
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    featureBadges: [
      'Cocok untuk waktu terbatas',
      'Mobil AC privat & host lokal',
      'Tiket masuk termasuk',
    ],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Mengunjungi salah satu pura desa tertua di Bali (dibangun tahun 944) dan mengenal tradisi lokal Bali',
      'Berfoto dengan latar pemandangan indah Air Terjun Tegenungan di Ubud',
      'Menikmati hamparan hijau Terasering Sawah Tegalalang dan sistem irigasi tradisional Subak',
      'Didampingi mobil ber-AC privat dan host lokal Ubud yang ramah serta berpengalaman',
    ],
    inclusions: [
      'Tiket masuk objek wisata (Pura Desa, Air Terjun Tegenungan & Terasering Sawah Tegalalang)',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver/host lokal Bali ramah berbahasa Inggris',
      'Air mineral',
      'Biaya parkir & BBM',
      'Kain sarung untuk kunjungan pura',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Tip sukarela untuk driver',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Pura Desa Kuno (Village Temple)',
        desc: 'Mengunjungi salah satu pura desa tertua di Bali yang diperkirakan berdiri sejak tahun 944 untuk mengenal tradisi, budaya, serta kehidupan masyarakat Bali.',
      },
      {
        time: '#2',
        title: 'Air Terjun Tegenungan',
        desc: 'Menyambangi air terjun terbaik di kawasan Ubud dengan pemandangan alam megah dan berbagai spot foto indah.',
      },
      {
        time: '#3',
        title: 'Terasering Sawah Tegalalang',
        desc: 'Menikmati panorama alam pedesaan Bali dengan sistem irigasi Subak yang unik dan menyatu dengan ketenangan alam.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Perjalanan pulang yang nyaman menuju hotel tempat Anda menginap dengan mobil privat ber-AC.',
      },
    ],
  },
  {
    ...EXPERIENCES[1],
    tagline: 'Blue Lagoon & Air Terjun',
    shortDesc:
      'Jelajahi perairan biru jernih Bali Timur di Blue Lagoon & Jepun dengan perahu tradisional, nikmati makan siang, dan kunjungi Air Terjun Kanto Lampo & Tibumana.',
    longDesc:
      'Paket tur spesial untuk pengalaman snorkeling terbaik di Bali Timur. Nikmati kejernihan air laut biru dengan terumbu karang alami, ikan warna-warni, serta penyu di dua spot unggulan: Blue Lagoon dan Jepun selama dua jam menggunakan perahu tradisional. Makan siang sudah termasuk, dilanjutkan mengunjungi Air Terjun Kanto Lampo dan Tibumana untuk berfoto indah.',
    duration: '1 hari',
    location: 'Blue Lagoon, Jepun & Air Terjun Tersembunyi',
    difficulty: 'Semua Usia / Petualangan Seru',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Handuk', 'Sunblock', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk objek wisata & makan siang sudah termasuk.',
    highlights: [
      'Snorkeling 2 jam di dua spot terbaik: Blue Lagoon & Jepun',
      'Transfer perahu tradisional menuju terumbu karang alami Bali Timur',
      'Berenang bersama ikan tropis dan penyu laut di air jernih',
      'Kunjungan foto Instagramable ke Air Terjun Kanto Lampo & Tibumana',
      'Mobil AC privat, tiket masuk, driver berpengalaman, makan siang, dan peralatan snorkeling',
    ],
    inclusions: [
      'Tiket masuk objek wisata (Lokasi Snorkeling, Air Terjun Kanto Lampo & Tibumana)',
      'Air mineral',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver berbahasa Inggris',
      'Makan siang',
      'Peralatan Snorkeling lengkap',
    ],
    exclusions: [
      'Pengeluaran pribadi',
      'Uang tunai tambahan untuk belanja opsional',
      'Tip sukarela untuk driver/pemandu',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Snorkeling Dua Jam (Blue Lagoon & Jepun)',
        desc: 'Penyeberangan perahu tradisional ke Blue Lagoon dan Jepun lengkap dengan peralatan snorkeling.',
      },
      {
        time: '#2',
        title: 'Air Terjun Kanto Lampo',
        desc: 'Menikmati makan siang setelah snorkeling lalu mengunjungi air terjun berundak Kanto Lampo.',
      },
      {
        time: '#3',
        title: 'Air Terjun Tibumana',
        desc: 'Melanjutkan perjalanan ke air terjun tersembunyi Tibumana yang asri untuk berfoto.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel atau villa Anda dengan mobil privat ber-AC yang nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[2],
    tagline: 'Kelas Memasak & Spa Ubud',
    shortDesc:
      'Kunjungi pasar tradisional Ubud, ikuti kelas memasak autentik Bali di rumah penduduk lokal, nikmati makan siang hasil masakan Anda, lalu relaksasi pijat 1 jam di Ubud.',
    longDesc:
      'Kelas memasak Bali dimulai dengan kunjungan ke pasar tradisional di desa Ubud untuk mengenal rempah lokal dan aktivitas pagi masyarakat. Dilanjutkan menuju rumah tradisional Bali untuk mengenal arsitektur pekarangan lokal sebelum memasak hidangan autentik Bali bersama instruktur berpengalaman. Setelah makan siang, Anda akan dimanjakan dengan pijat relaksasi 1 jam di spa terbaik di Ubud.',
    duration: '1 hari',
    location: 'Desa Ubud & Spa Terbaik di Ubud',
    difficulty: 'Santai / Budaya & Relaksasi',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupTimes: [
      'Kelas pagi : 08.00 am, 08.30 am.',
      'Kelas siang : 13.00 pm.',
    ],
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Tur pasar tradisional Ubud bersama pemandu lokal',
      'Pengenalan budaya dan tata ruang rumah tradisional Bali',
      'Praktik langsung memasak hidangan khas Bali autentik',
      'Tersedia pilihan menu vegetarian, bahan lengkap, dan welcome drink',
      'Pijat relaksasi satu jam di spa pilihan terbaik di Ubud',
    ],
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    inclusions: [
      'Tiket masuk aktivitas & destinasi',
      'Makan siang',
      'Air mineral',
      'Semua bahan masakan',
      'Pengenalan budaya lokal',
      'Tur pasar tradisional',
      'Pilihan menu vegetarian',
      'Minuman selamat datang (Welcome drink)',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver berbahasa Inggris',
      'Instruktur kelas memasak',
      'Pijat Spa 1 Jam',
    ],
    exclusions: [
      'Pengeluaran pribadi',
      'Uang tunai tambahan',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Kunjungan Pasar Tradisional',
        desc: 'Berkunjung ke pasar tradisional Ubud untuk mengenal bumbu rempah dan bahan segar lokal.',
      },
      {
        time: '#2',
        title: 'Kelas Memasak Bali',
        desc: 'Belajar memasak masakan khas Bali di pekarangan rumah tradisional dan menikmati makan siang.',
      },
      {
        time: '#3',
        title: 'Pijat Spa Satu Jam',
        desc: 'Beristirahat dengan perawatan pijat relaksasi satu jam di spa pilihan di Ubud.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran pulang yang nyaman ke hotel atau villa Anda dengan mobil privat ber-AC.',
      },
    ],
  },
  {
    ...EXPERIENCES[3],
    tagline: 'Trekking Sunrise & Terasering Sawah',
    shortDesc:
      'Daki puncak Gunung Batur sebelum fajar bersama pemandu lokal profesional, nikmati minuman hangat & sarapan di kawah, lalu segarkan pikiran di Terasering Sawah Tegalalang Ubud.',
    longDesc:
      'Layanan antar-jemput privat untuk Batur Sunrise Trekking di Kintamani, Bangli (sekitar 1.000 meter di atas permukaan laut). Pendakian dimulai dalam gelap menggunakan senter bersama pemandu lokal profesional selama sekitar 2 jam hingga puncak untuk menyaksikan perubahan warna langit matahari terbit yang memukau.\n\nAnda dapat duduk menikmati minuman hangat dan sarapan lezat sembari memandangi atap desa di bawah, lalu menjelajahi bibir kawah utama hingga sekitar pukul 09.00 pagi.\n\nSetelah itu, Anda bertemu kembali dengan driver dan melanjutkan perjalanan ke Terasering Sawah Tegalalang di Ubud untuk menikmati panorama hijau yang menenangkan dan menyegarkan kembali energi Anda.',
    duration: '1 hari',
    location: 'Gunung Batur & Tegalalang, Ubud',
    difficulty: 'Menengah / Trekking Matahari Terbit',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Sepatu trekking', 'Jaket', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Penjemputan dini hari privat menuju Gunung Batur di Kintamani',
      'Trekking 2 jam menuju puncak bersama pemandu lokal dan senter',
      'Minuman hangat & sarapan sambil menikmati matahari terbit di bibir kawah',
      'Singgah di Perkebunan Kopi Bali (opsional)',
      'Menikmati hamparan hijau asri Terasering Sawah Tegalalang di Ubud',
    ],
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang & pengeluaran pribadi.',
    inclusions: [
      'Tiket masuk kawasan (Gunung Batur & Terasering Sawah Tegalalang)',
      'Sarapan pagi',
      'Air mineral',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver berbahasa Inggris',
      'Pemandu trekking profesional',
      'Senter (Flash light)',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Uang tunai tambahan untuk belanja opsional',
      'Tip sukarela untuk driver/pemandu',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Batur Sunrise Trekking',
        desc: 'Pendakian pagi (±2 jam) ditemani pemandu lokal profesional dan senter untuk menyaksikan matahari terbit serta sarapan di puncak.',
      },
      {
        time: '#2',
        title: 'Perkebunan Kopi (opsional)',
        desc: 'Singgah sejenak di perkebunan kopi dataran tinggi Bali untuk mencicipi kopi dan teh herbal lokal.',
      },
      {
        time: '#3',
        title: 'Terasering Sawah Tegalalang',
        desc: 'Melanjutkan perjalanan menuju Terasering Sawah Tegalalang di Ubud untuk menikmati pemandangan lembah hijau yang menenangkan.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel Anda dengan mobil privat ber-AC yang nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[4],
    tagline: 'Air Terjun, Terasering & Pasar Ubud',
    shortDesc:
      'Abadikan keindahan Air Terjun Tibumana & Kanto Lampo secara privat tanpa terburu-buru, nikmati Tegalalang Rice Terrace, Monkey Forest Ubud, dan Pasar Seni Ubud.',
    longDesc:
      'Siapkan kamera Anda untuk tur sehari penuh mengunjungi air terjun paling fotogenik di Bali. Tanpa perlu terburu-buru bersama rombongan besar, nikmati waktu sekitar satu jam di setiap lokasi ditemani pemandu privat. Dapatkan foto menawan di hutan hujan asri Tibumana dan tebing berundak Kanto Lampo.\n\nSelanjutnya kita menuju Tegalalang Rice Terrace dengan pemandangan lembah hijau yang spektakuler, dilanjutkan ke Monkey Forest untuk melihat habitat alami monyet ekor panjang Bali (Macaca fascicularis). Pemberhentian terakhir adalah Pasar Seni Ubud untuk merasakan suasana pasar tradisional khas Bali.',
    duration: '1 hari',
    location: 'Tibumana, Kanto Lampo, Tegalalang & Ubud',
    difficulty: 'Santai / Wisata Foto & Budaya',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Kamera', 'Alas kaki yang nyaman', 'Pakaian ganti & handuk', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang & pengeluaran pribadi.',
    highlights: [
      'Durasi santai ±1 jam per lokasi di Air Terjun Tibumana & Kanto Lampo',
      'Pemandangan lembah hijau spektakuler di Tegalalang Rice Terrace',
      'Mengunjungi suaka alami monyet ekor panjang di Monkey Forest Ubud',
      'Belanja kerajinan dan seni tradisional Bali di Pasar Seni Ubud',
      'Tiket masuk wisata, mobil AC privat, driver berbahasa Inggris, BBM & air mineral termasuk',
    ],
    inclusions: [
      'Tiket masuk objek wisata (Tibumana, Kanto Lampo, Tegalalang & Monkey Forest)',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Air Mineral',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Aktivitas opsional (seperti ayunan Bali Swing)',
      'Tip sukarela untuk driver',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Air Terjun Tibumana',
        desc: 'Berfoto santai selama sekitar satu jam di air terjun bernuansa hutan hujan tropis Tibumana.',
      },
      {
        time: '#2',
        title: 'Air Terjun Kanto Lampo',
        desc: 'Mengabadikan momen di tebing batu berundak alami Air Terjun Kanto Lampo.',
      },
      {
        time: '#3',
        title: 'Tegalalang Rice Terrace',
        desc: 'Menikmati panorama sawah terasering hijau yang ikonik di kawasan Tegalalang, Ubud.',
      },
      {
        time: '#4',
        title: 'Monkey Forest Ubud',
        desc: 'Mengunjungi kawasan hutan suaka alami habitat monyet ekor panjang Bali (Macaca fascicularis).',
      },
      {
        time: '#5',
        title: 'Pasar Seni Ubud & Kembali ke Hotel',
        desc: 'Menjelajahi kerajinan lokal di Pasar Seni tradisional Ubud lalu diantar kembali ke hotel.',
      },
    ],
  },
  {
    ...EXPERIENCES[5],
    tagline: 'Air Terjun, Hutan Sangeh & Pura',
    shortDesc:
      'Kunjungi Air Terjun Nungnung setinggi 70 meter di tengah pulau Bali, sapa sekitar 600 monyet ekor panjang di Sangeh Monkey Forest, dan jelajahi Pura Kerajaan Taman Ayun.',
    longDesc:
      'Setelah dijemput dari hotel di Bali, kita menuju kawasan tengah pulau untuk menyaksikan keajaiban alam Air Terjun Nungnung yang menjulang setinggi 70 meter (330 kaki). Perjalanan berlanjut ke Sangeh Monkey Forest yang dihuni sekitar 600 ekor kera abu-abu ekor panjang (Macaca fascicularis).\n\nPemberhentian terakhir adalah Pura Taman Ayun di Desa Mengwi, pura kerajaan bersejarah yang dikelilingi kolam ikan luas sehingga tampak seolah mengapung di atas air.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Nungnung, Sangeh & Mengwi',
    difficulty: 'Menengah / Alam & Budaya',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Alas kaki nyaman', 'Kamera', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    highlights: [
      'Menyaksikan Air Terjun Nungnung setinggi 70 meter di Bali tengah',
      'Berinteraksi dengan ~600 monyet ekor panjang di Sangeh Monkey Forest',
      'Mengunjungi Pura Kerajaan Taman Ayun di Mengwi yang dikelilingi kolam air indah',
      'Sudah termasuk tiket masuk wisata & kain sarung Bali untuk kunjungan pura',
      'Mobil AC privat dengan driver berbahasa Inggris & BBM',
    ],
    inclusions: [
      'Tiket masuk destinasi (Air Terjun Nungnung, Sangeh & Pura Taman Ayun)',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Kain Sarung Bali untuk Mengunjungi Pura',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Tip sukarela untuk driver',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Air Terjun Nungnung',
        desc: 'Penjemputan pagi dari hotel menuju Air Terjun Nungnung setinggi 70 meter yang megah.',
      },
      {
        time: '#2',
        title: 'Sangeh Monkey Forest',
        desc: 'Menyusuri hutan pala asri habitat sekitar 600 ekor kera ekor panjang Bali.',
      },
      {
        time: '#3',
        title: 'Pura Taman Ayun',
        desc: 'Mengunjungi Pura Kerajaan Mengwi Taman Ayun yang dikelilingi kolam air luas.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel Anda dengan mobil privat ber-AC.',
      },
    ],
  },
  {
    ...EXPERIENCES[6],
    tagline: 'Bali Swing, Spa 1 Jam & Makan Siang',
    shortDesc:
      'Rasakan sensasi ayunan indah di atas hutan & terasering sawah Ubud yang Instagramable, nikmati pijat spa Bali selama satu jam, serta makan siang dengan waktu fleksibel.',
    longDesc:
      'Uji adrenalin Anda dengan sensasi berayun di ketinggian sambil memandangi lanskap hutan tropis dan sawah terasering yang memukau—sangat cocok untuk pecinta foto Instagram. Setelah itu, manjakan diri Anda dengan pijat relaksasi selama satu jam di salah satu spa terbaik di Ubud. Paket ini sudah termasuk makan siang yang dapat dinikmati sebelum atau sesudah sesi spa.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Ayunan & Spa Terbaik di Ubud',
    difficulty: 'Santai / Foto & Relaksasi',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Pakaian berwarna cerah untuk foto swing', 'Kamera', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    highlights: [
      'Pengalaman ayunan ikonik dengan pemandangan hutan & terasering sawah Ubud',
      'Perawatan pijat spa tradisional Bali selama 1 jam di Ubud',
      'Makan siang fleksibel (sebelum atau sesudah spa)',
      'Sudah termasuk tiket masuk & Bali Swing, spa 1 jam, makan siang, asuransi & mobil AC privat',
    ],
    inclusions: [
      'Tiket masuk & tiket aktivitas Bali Swing',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Pijat Spa Bali Satu Jam',
      'Asuransi',
      'Makan Siang',
    ],
    exclusions: [
      'Pengeluaran Pribadi',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Pengalaman Bali Swing',
        desc: 'Mencoba ayunan panorama hutan dan sawah Ubud yang sangat fotogenik.',
      },
      {
        time: '#2',
        title: 'Pijat Spa Bali 1 Jam & Makan Siang Fleksibel',
        desc: 'Relaksasi pijat tradisional Bali satu jam di spa pilihan di Ubud disertai makan siang.',
      },
      {
        time: '#3',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali yang nyaman menuju hotel atau villa Anda.',
      },
    ],
  },
  {
    ...EXPERIENCES[7],
    tagline: 'Air Terjun Aling-Aling & Handara Gate',
    shortDesc:
      'Pacu adrenalin meluncur & melompat tebing di Air Terjun Kroya, Kembar, Pucuk & Aling-Aling selama 2 jam, nikmati makan siang berlatar indah, foto di Handara Gate, dan wisata kopi.',
    longDesc:
      'Jika Anda mencari hari penuh adrenalin di Bali, Jumping & Sliding di Air Terjun Aling-Aling adalah pilihan terbaik. Tantang diri Anda meluncur di air terjun dengan papan luncur khusus dan lanjutkan ke air terjun indah lainnya: Kroya, Kembar, Pucuk, dan Aling-Aling selama 2 jam penuh.\n\nSetelah itu nikmati makan siang dengan pemandangan menawan, berfoto di gerbang ikonik Handara Gate, serta singgah di perkebunan kopi tradisional Bali sebelum kembali.',
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Air Terjun Aling-Aling & Handara Gate',
    difficulty: 'Aktif / Adrenalin & Alam',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Baju renang', 'Sandal gunung / alas kaki anti selip', 'Baju ganti & handuk', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Petualangan 2 jam melompat tebing & berseluncur di Air Terjun Kroya, Kembar, Pucuk & Aling-Aling',
      'Makan siang berlatar pemandangan alam Bali Utara yang sejuk',
      'Sesi foto Instagramable di gerbang ikonik Handara Gate',
      'Melihat proses pembuatan kopi tradisional di perkebunan kopi Bali',
      'Termasuk tiket masuk, asuransi, makan siang & mobil AC privat',
    ],
    inclusions: [
      'Tiket masuk & tiket aktivitas (Air Terjun Aling-Aling & Handara Gate)',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
      'Makan Siang',
    ],
    exclusions: [
      'Pengeluaran Pribadi',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Air Terjun Aling-Aling, Kroya, Kembar & Pucuk',
        desc: 'Menghabiskan 2 jam penuh keseruan cliff jumping dan seluncur air alami bersama pemandu.',
      },
      {
        time: '#2',
        title: 'Makan Siang dengan Pemandangan Indah',
        desc: 'Beristirahat sambil menikmati hidangan makan siang di kawasan dataran tinggi Bali Utara.',
      },
      {
        time: '#3',
        title: 'Handara Gate',
        desc: 'Mengabadikan foto di gerbang megah Handara Gate yang ikonik.',
      },
      {
        time: '#4',
        title: 'Perkebunan Kopi Tradisional & Kembali ke Hotel',
        desc: 'Mengamati pembuatan kopi tradisional Bali lalu pengantaran pulang ke hotel.',
      },
    ],
  },
  {
    ...EXPERIENCES[8],
    tagline: 'Monkey Forest, Tirta Empul & Swing',
    shortDesc:
      'Jelajahi jantung budaya Ubud di Monkey Forest (~800 kera) & Puri Ubud, nikmati panorama Tegalalang Rice Terrace serta Jungle Swing, dan rasakan ritual penyucian Tirta Empul.',
    longDesc:
      'Tur harian pilihan terbaik untuk menjelajahi pusat Ubud: mengunjungi Sacred Monkey Forest dengan sekitar 800 populasi kera ekor panjang Bali dan Puri Saren Ubud. Perjalanan berlanjut menuju pemandangan memukau Terasering Sawah Tegalalang (±10 km di utara Ubud) di mana Anda juga berkesempatan mencoba Jungle Swing populer, lalu ditutup dengan pengalaman penyucian diri tradisional Bali (Melukat) di Pura Tirta Empul.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Pusat Ubud, Tegalalang & Tirta Empul',
    difficulty: 'Santai / Budaya & Panorama',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Baju ganti (untuk ritual penyucian)', 'Kamera', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    highlights: [
      'Mengunjungi Sacred Monkey Forest (~800 ekor kera) & Puri Kerajaan Ubud',
      'Panorama indah Terasering Sawah Tegalalang di utara Ubud',
      'Sudah termasuk tiket masuk wisata & wahana populer Tegalalang Jungle Swing',
      'Pengalaman tradisi penyucian diri di Pura Tirta Empul',
      'Sudah termasuk kain sarung pura, air mineral, BBM & mobil AC privat',
    ],
    inclusions: [
      'Tiket masuk objek wisata (Monkey Forest, Tirta Empul, Tegalalang & Jungle Swing)',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Kain Sarung Bali untuk Mengunjungi Pura',
      'Air Mineral Botol',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran Pribadi',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Monkey Forest Ubud & Puri Ubud',
        desc: 'Melihat habitat ~800 kera ekor panjang di Monkey Forest dan mengunjungi kompleks bersejarah Puri Ubud.',
      },
      {
        time: '#2',
        title: 'Tegalalang Rice Terrace & Jungle Swing',
        desc: 'Menikmati lanskap terasering sawah hijau 10 km di utara Ubud beserta kesempatan mencoba Jungle Swing.',
      },
      {
        time: '#3',
        title: 'Penyucian Tradisional di Pura Tirta Empul',
        desc: 'Merasakan tradisi penyucian air suci Bali (Melukat) di kawasan Pura Tirta Empul.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel Anda dengan mobil privat ber-AC.',
      },
    ],
  },
  {
    ...EXPERIENCES[9],
    tagline: 'Water Sports & Pura Uluwatu',
    shortDesc:
      'Berangkat pukul 09.00 pagi menuju Tanjung Benoa Nusa Dua untuk keseruan banana boat, jet ski, parasailing & donut boat, dilanjutkan mengunjungi Pura Uluwatu abad ke-11.',
    longDesc:
      'Kombinasi terbaik wisata Water Sports Bali dan Tur Pura Uluwatu! Perjalanan dimulai pukul 09.00 pagi dari hotel menuju Tanjung Benoa Nusa Dua untuk menikmati berbagai aktivitas olahraga air seru seperti banana boat, jet ski, parasailing, dan donut boat.\n\nSetelah puas beraktivitas di laut, perjalanan dilanjutkan mengunjungi Pura Luhur Uluwatu yang berdiri megah di tepi tebing sejak abad ke-11 sebagai salah satu dari sembilan pura penjuru mata angin pelindung Pulau Bali.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Tanjung Benoa & Pura Uluwatu',
    difficulty: 'Seru / Olahraga Air & Pura Tebing',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Baju renang', 'Sunblock', 'Baju ganti & handuk', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Permainan water sports seru di Tanjung Benoa: banana boat, jet ski, parasailing & donut boat',
      'Mengunjungi Pura Luhur Uluwatu abad ke-11 di atas tebing Samudra Hindia',
      'Asuransi perjalanan, mobil AC privat, driver & BBM termasuk',
      'Penjemputan privat pukul 09.00 pagi dari hotel di Bali',
    ],
    tourNote: 'Tiket masuk, makan siang & pengeluaran pribadi tidak termasuk.',
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
    ],
    exclusions: [
      'Tiket masuk Pura Uluwatu & tiket aktivitas water sports',
      'Makan siang',
      'Pengeluaran Pribadi',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Penjemputan Hotel (09:00 AM)',
        desc: 'Berangkat dari hotel Anda pukul 09.00 pagi dengan mobil privat ber-AC penuh.',
      },
      {
        time: '#2',
        title: 'Water Sports Tanjung Benoa (Nusa Dua)',
        desc: 'Menikmati permainan banana boat, jet ski, parasailing, dan donut boat di Tanjung Benoa.',
      },
      {
        time: '#3',
        title: 'Pura Luhur Uluwatu',
        desc: 'Mengunjungi pura tebing bersejarah abad ke-11 dengan panorama samudra yang menakjubkan.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel Anda dengan mobil privat yang nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[10],
    tagline: 'Aktivitas • ATV, Makan Siang & Spa',
    shortDesc:
      'Jelajahi pedesaan Bali dengan ATV Quad Bike selama 2 jam ditemani instruktur profesional, nikmati makan siang buffet, dan tutup dengan pijat spa satu jam.',
    longDesc:
      'Paket aktivitas perpaduan petualangan dan relaksasi: dijemput dari hotel menuju kawasan pedesaan Bali untuk menikmati petualangan ATV Quad Bike selama sekitar 2 jam didampingi instruktur profesional. Paket ini juga sudah termasuk makan siang prasmanan (buffet lunch), dan ditutup dengan perawatan pijat relaksasi selama satu jam di spa.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Pedesaan Ubud & Spa Bali',
    difficulty: 'Aktif / Petualangan & Spa',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Baju ganti', 'Sepatu nyaman untuk aktivitas luar ruang', 'Uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    highlights: [
      'Petualangan ATV Quad Bike 2 jam menyusuri desa & jalur alam bersama instruktur profesional',
      'Sudah termasuk tiket masuk lokasi, makan siang prasmanan (Buffet Lunch), loker & handuk',
      'Pijat relaksasi spa selama satu jam setelah berpetualang',
      'Asuransi, BBM & mobil ber-AC privat dengan driver berbahasa Inggris',
    ],
    inclusions: [
      'Tiket masuk kawasan ATV & retribusi lokasi',
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
      'Loker (Locker)',
      'Handuk (Towel)',
      'Makan Siang Buffet',
      'Pijat Spa Relaksasi 1 Jam',
    ],
    exclusions: [
      'Pengeluaran Pribadi',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Petualangan ATV Quad Bike (2 Jam)',
        desc: 'Menyusuri pedesaan dan jalur alami Bali dengan ATV Quad Bike selama 2 jam didampingi instruktur profesional.',
      },
      {
        time: '#2',
        title: 'Bilas & Makan Siang Buffet',
        desc: 'Membersihkan diri dengan fasilitas loker & handuk yang tersedia lalu menikmati makan siang prasmanan.',
      },
      {
        time: '#3',
        title: 'Pijat Spa Satu Jam',
        desc: 'Menutup hari dengan perawatan pijat relaksasi selama satu jam di spa.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali ke hotel Anda dengan mobil privat ber-AC.',
      },
    ],
  },
  {
    ...EXPERIENCES[11],
    tagline: 'Aktivitas • Rafting & Monkey Forest',
    shortDesc:
      'Nikmati 2 jam arung jeram (rafting) di Sungai Ayung Ubud melewati hutan asri & air terjun, makan siang buffet berlatar sawah, dan kunjungi Monkey Forest Ubud (~800 ekor kera).',
    longDesc:
      'Nikmati paket aktivitas arung jeram (white water rafting) dengan pemandangan indah di Sungai Ayung, barat laut Ubud selama 2 jam melewati hutan alami dan air terjun yang memukau. Setelah selesai, nikmati makan siang buffet khas Indonesia dengan pemandangan sawah, lalu lanjut mengunjungi Sacred Monkey Forest Ubud dengan sekitar 800 populasi monyet ekor panjang.',
    duration: '8 jam',
    tourType: 'Tur Harian',
    groupSize: 'Tanpa Batas (Unlimited)',
    languages: 'Inggris / Indonesia',
    location: 'Sungai Ayung & Monkey Forest Ubud',
    difficulty: 'Aktif / Arung Jeram & Alam',
    minAge: '10+',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Baju renang / cepat kering', 'Sandal gunung / alas kaki anti selip', 'Baju ganti & uang tunai tambahan'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Arung jeram seru selama 2 jam di Sungai Ayung Ubud',
      'Pemandangan hutan hujan alami dan air terjun di sepanjang sungai',
      'Makan siang buffet Indonesia dengan pemandangan hamparan sawah hijau',
      'Kunjungan ke Sacred Monkey Forest Sanctuary Ubud (~800 ekor kera)',
    ],
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    inclusions: [
      'Tiket masuk wisata (Monkey Forest & tiket masuk lokasi rafting)',
      'Menikmati 2 jam white water rafting di Ubud.',
      'Makan siang buffet Indonesia dengan pemandangan sawah yang memukau.',
      'Transportasi privat menuju suaka Monkey Forest di Ubud.',
    ],
    exclusions: [
      'Pengeluaran Pribadi',
      'Tip sukarela',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'White Water Rafting Sungai Ayung (2 Jam)',
        desc: 'Mengarungi jeram Sungai Ayung selama 2 jam melewati lembah hutan alami dan air terjun indah.',
      },
      {
        time: '#2',
        title: 'Makan Siang Buffet Indonesia',
        desc: 'Menikmati hidangan makan siang prasmanan khas Indonesia berlatar pemandangan sawah yang asri.',
      },
      {
        time: '#3',
        title: 'Sacred Monkey Forest Ubud',
        desc: 'Mengunjungi hutan suaka Ubud yang dihuni sekitar 800 ekor kera ekor panjang Bali.',
      },
      {
        time: '#4',
        title: 'Kembali ke Hotel',
        desc: 'Pengantaran kembali menuju hotel Anda dengan nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[12],
    tagline: 'Aktivitas • ATV Hutan & Trek Lumpur Ubud',
    shortDesc:
      'Taklukkan trek ATV terpanjang di Bali melewati jalur hutan, hutan bambu, turunan lembah 45 derajat, pedesaan tradisional, hingga zona lumpur seru di Ubud.',
    longDesc:
      'Bangkitkan jiwa petualang Anda dengan pengalaman ATV quad bike paling seru di Ubud. Dirancang untuk pemula maupun pengendara berpengalaman, jalur off-road ini membawa Anda menjauh dari keramaian wisata menuju alam liar Bali yang menantang.\n\nPerjalanan dimulai dengan pengarahan keselamatan dari instruktur berpengalaman lengkap dengan helm dan sepatu bot. Rasakan adrenalin saat menyusuri jalur hutan sempit, turunan lembah sungai 45 derajat, terowongan bambu rindang, pedesaan Bali, serta hamparan sawah sebelum melewati zona cipratan lumpur di akhir trek. Setelah selesai, bersihkan diri dengan fasilitas bilas lengkap dan nikmati makan siang.',
    duration: 'Setengah Hari (4-5 jam)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Maks. 6 Dewasa / Mobil',
    languages: 'Inggris / Indonesia',
    location: 'Hutan & Trek Lumpur Ubud, Bali',
    difficulty: 'Aktif / Petualangan ATV Off-Road',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Hotel atau akomodasi Anda (jika opsi antar-jemput dipilih) di area Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan bagian Bali lainnya.',
    tourNote: 'Tiket masuk & makan siang sudah termasuk.',
    featureBadges: [
      'Jaminan harga terbaik',
      'Open trip',
      'Tiket masuk & makan siang termasuk',
      'Pemandu Profesional',
    ],
    packageOptions: [
      {
        title: 'ATV Single Ride',
        desc: 'Pilihan terbaik untuk pencari adrenalin. Nikmati kebebasan penuh menaklukkan setiap rintangan, tikungan berlumpur, dan tanjakan curam sendiri.',
      },
      {
        title: 'ATV Tandem Ride',
        desc: 'Ideal untuk pasangan, sahabat, atau keluarga bersama anak-anak. Berbagi keseruan dalam satu ATV dengan kursi penumpang khusus dan bisa bertukar posisi pengemudi di tengah perjalanan.',
      },
    ],
    whatToExpect:
      'Bersiaplah untuk petualangan off-road terbaik di trek ATV terpanjang di Bali! Rute ATV Ubud ini membawa Anda jauh ke alam liar Bali dengan kombinasi trek lumpur, turunan curam, hutan bambu lebat, aliran sungai, turunan lembah 45 derajat, hingga pematang sawah hijau yang memukau.',
    whatToBring: ['Sepatu / sandal nyaman', 'Sunscreen / tabir surya', 'Baju ganti'],
    meetingPoint: [
      'Hotel atau akomodasi Anda (jika opsi antar-jemput hotel dipilih).',
      'Lokasi basecamp ATV langsung (jika datang sendiri tanpa antar-jemput).',
    ],
    activityNotes: [
      'Antar-jemput hotel tersedia jika opsi transfer dipilih.',
      'Kembali ke titik keberangkatan awal.',
      'Waktu di atas dapat berubah menyesuaikan kondisi lapangan.',
      'Kapasitas maksimal satu mobil standar adalah 6 orang dewasa.',
      'Pembatalan minimal 48 jam sebelum jadwal berhak mendapatkan pengembalian dana penuh (100% refund).',
    ],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Trek Terpanjang & Paling Dinamis di Bali: Rute menantang melintasi hutan, sungai, lorong bambu, dan aksi cipratan lumpur.',
      'Panorama Alam Tersembunyi: Berkendara melintasi pedesaan Bali yang masih asri, lembah hijau, dan persawahan subur.',
      'Opsi Berkendara Fleksibel: Tersedia pilihan Single Ride maupun Tandem Ride sesuai gaya petualangan Anda.',
    ],
    inclusions: [
      'Tiket masuk kawasan & biaya masuk trek ATV',
      'Antar-jemput hotel dengan mobil ber-AC penuh (jika opsi dipilih)',
      'Driver berbahasa Inggris',
      'Pemandu ATV berpengalaman',
      'Welcome Drink',
      'Peralatan Keselamatan (helm & sepatu bot)',
      'Makan siang',
      'Loker (Locker)',
      'Kamar mandi bilas lengkap dengan handuk & sabun',
      'Asuransi',
    ],
    exclusions: [
      'Dokumentasi foto & video',
      'Tip pemandu',
      'Pengeluaran pribadi',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Kedatangan, Welcome Drink & Pengarahan Keselamatan',
        desc: 'Bertemu instruktur ahli, mengenakan perlengkapan keamanan (helm & bot), serta briefing sebelum mulai.',
      },
      {
        time: '#2',
        title: 'Jalur Hutan Ubud, Hutan Bambu & Turunan Lembah 45 Derajat',
        desc: 'Menyusuri jalur hutan tropis, terowongan bambu, desa tradisional Bali, dan persawahan hijau.',
      },
      {
        time: '#3',
        title: 'Penyeberangan Sungai & Zona Lumpur Seru',
        desc: 'Melintasi dasar sungai berair jernih dan menuntaskan trek di area cipratan lumpur.',
      },
      {
        time: '#4',
        title: 'Bilas, Makan Siang & Kembali ke Hotel',
        desc: 'Mandi dengan fasilitas handuk & sabun yang tersedia, menikmati makan siang, lalu diantar kembali ke hotel.',
      },
    ],
  },
  {
    ...EXPERIENCES[13],
    tagline: 'Tegallalang • Ayunan & Spot Foto',
    shortDesc:
      'Terbang di atas kanopi hijau Tegallalang setinggi 200 meter dengan 5 tipe ayunan, 2 sarang burung ikonik, spot batu besar sawah, serta antar-jemput mobil AC.',
    longDesc:
      'Wujudkan impian Anda menyentuh langit Bali di Ubud!\n\nPetualangan dimulai di surga tropis yang tenang jauh dari kebisingan kota. Setelah sambutan hangat dan briefing keselamatan singkat, Anda akan dipasangi tali pengaman standar internasional untuk mencoba berbagai ketinggian ayunan—mulai dari yang santai hingga memacu adrenalin.\n\nRasakan semilir angin pegunungan dengan latar lembah sungai dan hamparan kebun kelapa untuk foto gaun melayang yang ikonik maupun momen petualangan tak terlupakan.',
    duration: 'Setengah Hari (4-5 jam)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Maks. 6 Dewasa / Mobil',
    languages: 'Inggris / Indonesia',
    location: 'Tegallalang, Ubud, Bali',
    difficulty: 'Santai / Panorama & Foto Instagram',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Hotel atau akomodasi Anda di Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    featureBadges: [
      'Jaminan harga terbaik',
      'Open trip',
      'Termasuk tiket masuk',
      'Pemandu Profesional',
    ],
    whatToExpect:
      'Melayang di atas kanopi hijau Tegallalang bersama Ubud Jungle Swing. Terletak di jantung wilayah hijau Tegallalang, pengalaman ini memadukan sensasi adrenalin dengan estetika foto yang memukau berlatar lembah sungai dalam dan pepohonan kelapa.',
    whatToBring: ['Sepatu / sandal nyaman', 'Sunscreen / tabir surya', 'Kamera'],
    meetingPoint: ['Hotel atau akomodasi Anda'],
    activityNotes: [
      'Antar-jemput hotel sudah termasuk.',
      'Kembali ke titik keberangkatan awal.',
      'Waktu di atas dapat berubah menyesuaikan kondisi lokal.',
      'Kapasitas maksimal satu mobil standar adalah 6 orang dewasa.',
      'Pembatalan minimal 48 jam sebelum jadwal berhak mendapatkan pengembalian dana penuh (100% refund).',
    ],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Panorama Tropis Memukau: Berayun di ketinggian lembah 200 meter menghadap terasering sawah bertingkat dan hutan berkabut Ubud.',
      'Surga Spot Foto Ikonik: Jelajahi beragam spot artistik seperti Bird Nest, Chicken Nest, serta Big Stone berlatar sawah hijau.',
      'Keamanan Berstandar Internasional: Didukung harness pengaman standar internasional dan tim profesional berpengalaman.',
    ],
    inclusions: [
      'Tiket masuk kawasan wisata',
      'Antar-jemput hotel dengan mobil ber-AC penuh',
      '5 Tipe Ayunan (1 Single Swing, 1 Tandem Swing, 1 Libra Swing & 1 Romantic Swing)',
      '2 Tipe Sarang Foto (1 Bird Nest, 1 Chicken Nest)',
      '1 Spot Big Stone dengan pemandangan sawah memukau',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Tip pemandu',
      'Sewa gaun foto (Dress for Photo)',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Penjemputan Hotel Menuju Tegallalang',
        desc: 'Penjemputan nyaman langsung dari hotel Anda menggunakan mobil ber-AC penuh.',
      },
      {
        time: '#2',
        title: 'Briefing Keselamatan & Pengalaman Jungle Swing',
        desc: 'Menggunakan pengaman standar internasional dan mencoba 5 tipe ayunan di atas lembah 200 meter.',
      },
      {
        time: '#3',
        title: 'Spot Foto Bird Nest & Hamparan Sawah',
        desc: 'Berfoto di 2 jenis sarang artistik serta spot batu besar dengan latar sawah terasering.',
      },
      {
        time: '#4',
        title: 'Pengantaran Kembali ke Hotel',
        desc: 'Perjalanan pulang yang santai menuju hotel tempat Anda menginap.',
      },
    ],
  },
  {
    ...EXPERIENCES[14],
    tagline: 'Aktivitas • Off-Road Jungle Buggy',
    shortDesc:
      'Kemudikan Polaris Buggy kelas atas di sirkuit hutan privat sepanjang 4,5 km (3 putaran) lengkap dengan tiket masuk, perlengkapan keselamatan, dan antar-jemput privat.',
    longDesc:
      'Siap berpetualang menantang lumpur di dataran tinggi Ubud?\n\nMelangkah keluar dari jalur wisata biasa dan kemudikan langsung buggy off-road berkinerja tinggi di motor park kelas dunia kami. Setelah pengarahan keselamatan lengkap dan satu putaran latihan bersama pemandu profesional, Anda siap menaklukkan lintasan khusus yang membelah rimbunnya hutan tropis Bali.',
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    duration: 'Setengah Hari (3 Putaran)',
    isHalfDay: true,
    tourType: 'Open Trip',
    groupSize: 'Transfer Privat',
    languages: 'Inggris / Indonesia',
    location: 'Taman Motor Dataran Tinggi Ubud, Bali',
    difficulty: 'Aktif / Off-Road Polaris Buggy',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Hotel atau akomodasi Anda di Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    featureBadges: [
      'Jaminan harga terbaik',
      'Open trip',
      'Termasuk tiket masuk',
      'Pemandu Profesional',
    ],
    packageOptions: [
      {
        title: 'Single Ride',
        desc: 'Pilihan utama bagi pencari tantangan. Kendali penuh dan kebebasan mutlak menaklukkan rintangan, tikungan berlumpur, dan tanjakan curam sendiri.',
      },
      {
        title: 'Tandem Ride',
        desc: 'Ideal untuk pasangan, sahabat, atau keluarga bersama anak. Berbagi keseruan dengan kursi penumpang khusus dan bisa bergantian menyetir di tengah sesi.',
      },
    ],
    whatToExpect:
      'Rasakan petualangan off-road paling berkelas di Bali dengan Polaris Buggy melalui lintasan khusus di tengah hutan tropis Ubud. Baik pengemudi berpengalaman maupun pemula akan menikmati perjalanan yang aman, bertenaga, dan penuh adrenalin.',
    whatToBring: [
      'Sepatu / sandal nyaman',
      'Uang tunai secukupnya untuk pengeluaran pribadi',
      'Sunscreen / tabir surya',
    ],
    meetingPoint: ['Hotel atau akomodasi Anda'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Armada Off-Road Kelas Atas: Menggunakan Polaris Buggy premium dilengkapi roll cage bersertifikat dan sabuk pengaman 4 titik.',
      'Sirkuit Hutan Privat 4,5 km: Lintasan eksklusif dengan tikungan tajam, tanjakan, dan turunan berlatar hutan hujan tropis.',
      'Kualitas Mason Adventures: Fasilitas kelas dunia, instruktur profesional, dan standar keamanan terbaik.',
    ],
    inclusions: [
      'Tiket masuk kawasan wisata & motor park',
      'Antar-jemput hotel privat dengan mobil ber-AC penuh',
      'Penggunaan kendaraan Buggy di lintasan',
      'Peralatan Keselamatan',
      'Pemandu profesional',
      'Penggunaan loker gratis',
      'Jungle Buggy 3 putaran (3 laps)',
      'Asuransi',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi',
      'Tip pemandu',
      'Foto / Video',
    ],
    itinerary: [
      {
        time: '#1',
        title: 'Penjemputan Privat & Kedatangan di Motor Park',
        desc: 'Penjemputan mobil AC privat dari hotel menuju area sirkuit buggy di dataran tinggi Ubud.',
      },
      {
        time: '#2',
        title: 'Briefing Keselamatan & Putaran Latihan',
        desc: 'Orientasi keselamatan dengan roll cage dan sabuk 4 titik serta satu putaran latihan.',
      },
      {
        time: '#3',
        title: 'Sirkuit Jungle Buggy (3 Putaran / Trek 4,5 km)',
        desc: 'Menaklukkan 3 putaran penuh melewati tikungan hutan, tanjakan, turunan, dan jalur berlumpur dengan Polaris Buggy.',
      },
      {
        time: '#4',
        title: 'Istirahat & Pengantaran Kembali ke Hotel',
        desc: 'Menggunakan loker gratis untuk membersihkan diri (makan siang opsional tersedia dengan biaya pribadi) lalu kembali ke hotel dengan nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[15],
    tagline: 'Tur Privat • Tegenungan, Celuk & Sawah',
    shortDesc:
      'Petualangan privat 8 jam di Ubud bersama pemandu lokal berbahasa Inggris ke Air Terjun Tegenungan, Desa Celuk, Goa Gajah, Monkey Forest, Terasering Tegalalang & Perkebunan Kopi Luwak.',
    longDesc:
      'Nikmati petualangan privat selama 8 jam yang memadukan kekayaan budaya Bali dengan keindahan alam Ubud. Anda akan mengawalinya dengan menyambangi air terjun alami yang megah, menyaksikan langsung keahlian pengrajin perak & emas tradisional di Desa Celuk, menelusuri situs purbakala Goa Gajah, berinteraksi di Sacred Monkey Forest, menikmati panorama Terasering Sawah Tegalalang, serta mencicipi cita rasa kopi dan teh khas Bali.',
    duration: '8 jam',
    tourType: 'Tur Privat',
    groupSize: 'Privat',
    languages: 'Berbahasa Inggris / Indonesia',
    location: 'Tegenungan, Celuk, Goa Gajah & Tegalalang',
    difficulty: 'Santai / Budaya, Kerajinan & Air Terjun',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Hotel atau akomodasi Anda di Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    featureBadges: [
      'Jaminan harga terbaik',
      'Tur privat',
      'Durasi 8 jam',
      'Pemandu wisata langsung (Inggris)',
    ],
    whatToExpect:
      'Masuki pesona autentik Ubud melalui tur privat 8 jam yang dirancang khusus untuk membawa Anda menyusuri warisan seni, nilai spiritual, dan lanskap alam terbaik Bali.\n\nAlasan paket ini sangat tepat untuk Anda:\n• Eksplorasi Budaya & Seni Mendalam: Menyaksikan langsung seni kerajinan perak dan emas turun-temurun di Desa Celuk serta sejarah spiritual Goa Gajah.\n• Keindahan Alam & Satwa Ikonik: Menyegarkan diri di Air Terjun Tegenungan, berfoto di Terasering Sawah Tegalalang, dan melihat kera ekor panjang di Monkey Forest.\n• Cita Rasa Lokal Bali: Menutup perjalanan di Perkebunan Kopi Luwak dengan mencicipi gratis berbagai kopi dan teh herbal khas Bali.',
    whatToBring: [
      'Sepatu / sandal yang nyaman',
      'Sunscreen / tabir surya',
      'Topi',
      'Kamera',
    ],
    meetingPoint: ['Hotel atau akomodasi Anda.'],
    termsAndConditions: SHARED_TERMS_ID,
    highlights: [
      'Air Terjun Tegenungan: Menyaksikan air terjun megah di tengah hutan hijau asri yang ideal untuk berfoto.',
      'Desa Celuk: Pusat kerajinan perak dan emas Bali untuk melihat langsung pengrajin terampil membuat perhiasan handmade.',
      'Goa Gajah (Elephant Cave): Situs arkeologi kuno bersejarah dengan ukiran gua misterius dan taman meditasi yang tenang.',
      'Sacred Monkey Forest Sanctuary: Berinteraksi dengan monyet ekor panjang di habitat hutan suaka alami dan pura kuno.',
      'Terasering Sawah Tegalalang: Pemandangan sawah bertingkat hijau yang memukau sebagai ikon sistem irigasi tradisional Bali.',
      'Perkebunan Kopi Luwak: Pengalaman mengenal proses pembuatan kopi unik disertai mencicipi gratis berbagai teh dan kopi lokal.',
    ],
    tourNote: 'Tiket masuk sudah termasuk. Belum termasuk: makan siang dan pengeluaran pribadi.',
    inclusions: [
      'Tiket masuk seluruh objek wisata (Tegenungan, Goa Gajah, Monkey Forest & Tegalalang)',
      'Pemandu wisata lokal berpengalaman',
      'Mobil privat nyaman ber-AC penuh',
      'Air mineral kemasan',
      'Kain sarung untuk kunjungan pura',
      'Biaya parkir di seluruh lokasi',
    ],
    exclusions: [
      'Makan siang',
      'Pengeluaran pribadi (belanja suvenir, dll.)',
      'Tiket Bali Swing',
    ],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Penjemputan Hotel',
        desc: 'Mobil privat ber-AC penuh dan driver lokal ramah menyambut Anda di hotel tempat menginap.',
      },
      {
        time: '09:15 AM',
        title: 'Air Terjun Tegenungan',
        desc: 'Menikmati keindahan derasnya air terjun Tegenungan untuk berfoto dan bersantai di udara segar.',
      },
      {
        time: '10:15 AM',
        title: 'Desa Celuk',
        desc: 'Melihat langsung proses pembuatan kerajinan perhiasan perak dan emas khas Bali.',
      },
      {
        time: '11:15 AM',
        title: 'Goa Gajah (Elephant Cave)',
        desc: 'Menelusuri sejarah dan aura spiritual pura gua kuno Goa Gajah serta kawasan sekitarnya.',
      },
      {
        time: '12:15 PM',
        title: 'Istirahat Makan Siang',
        desc: 'Menikmati makan siang lezat di restoran pilihan yang direkomendasikan (biaya pribadi).',
      },
      {
        time: '01:15 PM',
        title: 'Sacred Monkey Forest Sanctuary',
        desc: 'Mengamati monyet ekor panjang yang hidup bebas di kawasan hutan suaka dan kompleks pura kuno.',
      },
      {
        time: '02:30 PM',
        title: 'Terasering Sawah Tegalalang',
        desc: 'Mengabadikan foto indah hamparan sawah terasering hijau yang mendunia.',
      },
      {
        time: '03:15 PM',
        title: 'Perkebunan Kopi Luwak',
        desc: 'Mengenal proses pengolahan kopi Luwak sekaligus mencicipi gratis berbagai pilihan kopi dan teh Bali.',
      },
      {
        time: '04:00 PM',
        title: 'Perjalanan Kembali',
        desc: 'Memulai perjalanan pulang yang nyaman setelah rangkaian tur 8 jam kembali menuju hotel Anda.',
      },
      {
        time: '04:30 PM',
        title: 'Tiba di Hotel',
        desc: 'Tiba kembali di akomodasi Anda setelah perjalanan 8 jam dengan kenangan tak terlupakan dari Ubud.',
      },
    ],
  },
  {
    ...EXPERIENCES[16],
    tagline: 'Eksplorasi Nusa Penida Barat & Timur',
    shortDesc:
      'Jelajahi keindahan Pulau Nusa Penida—kombinasi unik pantai tebing Barat & Timur mencakup Broken Beach, Angel Billabong, Kelingking Beach, dan Diamond Beach dengan fast boat & makan siang.',
    longDesc:
      'Nusa Penida Day Tour – Ayo berkunjung ke pulau menakjubkan Nusa Penida di sebelah tenggara Bali! Dipisahkan oleh Selat Badung, Nusa Penida menjadi salah satu destinasi paling Instagramable dengan pemandangan pantai dari atas tebing yang luar biasa.\n\nAkses terbaik menuju Nusa Penida adalah menggunakan fast boat dari Pelabuhan Sanur. Tur Nusa Penida kami dirancang berbeda karena memadukan sisi Barat dan Timur Nusa Penida sekaligus dalam satu hari perjalanan yang nyaman.',
    duration: '1 hari',
    tourType: 'Tur Privat',
    groupSize: 'Privat',
    languages: 'Inggris / Indonesia',
    tourNote: 'Sudah termasuk tiket fast boat PP, semua retribusi biaya, & makan siang. Pemesanan grup mendapat harga spesial.',
    location: 'Nusa Penida (Barat & Timur)',
    difficulty: 'Santai / Pulau & Pantai Tebing',
    minAge: 'Semua Usia',
    pickupLabel: 'Lokasi Hotel',
    pickupLocations:
      'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
    whatToBring: ['Uang tunai', 'Sunblock / tabir surya', 'Topi', 'Celana pendek, disarankan sandal jepit'],
    featureBadges: [
      'Kombinasi Barat & Timur',
      'Tiket fast boat PP termasuk',
      'Semua biaya & makan siang termasuk',
    ],
    relatedTitle: '2 Days Tour In Bali (Pengalaman Terbaik Bali)',
    termsAndConditions: [
      'Pembayaran dapat diselesaikan saat keberangkatan secara tunai (USD/IDR).',
      'Harga sudah bersih (Net) termasuk pajak pemerintah.',
      'Pembatalan pada hari keberangkatan dikenakan biaya 100%.',
      'Pengembalian dana penuh (100% refund) jika dibatalkan 48 jam sebelum keberangkatan.',
      'Harga wajar dan transparan tanpa biaya tersembunyi.',
      'Pemesanan grup mendapatkan penawaran harga spesial.',
    ],
    highlights: [
      'Kombinasi rute Nusa Penida Barat & Timur sekaligus dalam satu hari',
      'Sudah termasuk tiket fast boat PP dari Sanur & seluruh biaya retribusi wisata',
      'Mengunjungi Broken Beach, Angel Billabong, Kelingking Beach & Diamond Beach',
      'Transfer privat di Bali serta mobil ber-AC privat di Pulau Nusa Penida',
      'Didampingi driver berbahasa Inggris, air mineral & makan siang',
    ],
    inclusions: [
      'Antar-jemput privat pulang-pergi di Bali',
      'Mobil privat di Pulau Nusa Penida',
      'Driver berbahasa Inggris',
      'Tiket fast boat pulang-pergi (Return)',
      'Semua biaya & retribusi (All fees)',
      'Air mineral',
      'Makan siang',
    ],
    exclusions: ['Pengeluaran pribadi Anda'],
    itinerary: [
      {
        time: '#1',
        title: 'Broken Beach',
        desc: 'Menyaksikan lengkungan batu karang alami dan teluk biru jernih di Broken Beach (Pasih Uug), Nusa Penida Barat.',
      },
      {
        time: '#2',
        title: 'Angel Billabong',
        desc: 'Menikmati kolam pasang surut alami sebening kristal yang terbentuk di antara tebing batu karang pesisir.',
      },
      {
        time: '#3',
        title: 'Makan Siang',
        desc: 'Beristirahat dan mengisi tenaga dengan hidangan makan siang pulau yang sudah termasuk dalam paket.',
      },
      {
        time: '#4',
        title: 'Kelingking Beach',
        desc: 'Mengabadikan panorama ikonik tebing menyerupai T-Rex dan ombak biru memukau di Kelingking Beach.',
      },
      {
        time: '#5',
        title: 'Diamond Beach',
        desc: 'Melanjutkan ke Nusa Penida Timur untuk melihat pasir putih, tebing kapur megah, dan laut biru berkilau di Diamond Beach.',
      },
      {
        time: '#6',
        title: 'Akhir Tur (End of Tour)',
        desc: 'Kembali menyeberang dengan fast boat menuju Pelabuhan Sanur dan pengantaran privat ke hotel Anda di Bali.',
      },
    ],
  },
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'private-photographer',
    name: 'Professional Private Photographer',
    description:
      'Document your private Bali day trip with a dedicated travel photographer (50+ edited high-res digital photos).',
    price: 750000,
    priceUsd: 48,
  },
  {
    id: 'drone-video',
    name: 'Cinematic 4K Drone Highlight',
    description:
      'Aerial 4K drone footage over waterfalls and coastal cliffs with an edited highlight clip.',
    price: 950000,
    priceUsd: 60,
  },
  {
    id: 'vip-innova-upgrade',
    name: 'VIP Innova Reborn Upgrade',
    description:
      'Upgrade your private air-conditioned vehicle to a spacious Toyota Kijang Innova Reborn.',
    price: 350000,
    priceUsd: 22,
  },
];

export const BOOKING_ADDONS_ID: BookingAddon[] = [
  {
    id: 'private-photographer',
    name: 'Fotografer Pribadi Profesional',
    description:
      'Dokumentasikan perjalanan privat Anda bersama fotografer khusus (termasuk 50+ foto digital resolusi tinggi).',
    price: 750000,
    priceUsd: 48,
  },
  {
    id: 'drone-video',
    name: 'Video Drone Sinematik 4K',
    description:
      'Pengambilan gambar udara 4K di area air terjun dan pesisir lengkap dengan video highlight.',
    price: 950000,
    priceUsd: 60,
  },
  {
    id: 'vip-innova-upgrade',
    name: 'Upgrade Mobil VIP Innova Reborn',
    description:
      'Tingkatkan kendaraan privat ber-AC Anda menjadi Toyota Kijang Innova Reborn yang lebih luas.',
    price: 350000,
    priceUsd: 22,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'gmaps-rev-1',
    name: 'Sibgha Waqar',
    rating: 5,
    date: '2026-09-21',
    relativeDate: '2 months ago',
    reviewerMeta: '4 reviews',
    source: 'Google Maps',
    comment:
      'We used Ketut Ajus for our customised day trip in Ubud and surroundings areas, and honestly it was the best decision we ever made. Ketut was so knowledgeable about each place we were going as well as Indonesian/Bali history. I definitely feel like I have learnt and appreciated more about the culture. The recommendations he gave were amazing, and customised it to what we were after. He was also very friendly to talk to, made our trip very fun. This was definitely the highlight of the trip. I recommend anyone who needs to book a tour to book with Ketut as you will have the best time!!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-2',
    name: 'Lily Boudrie',
    rating: 5,
    date: '2026-05-21',
    relativeDate: '6 months ago',
    reviewerMeta: 'Local Guide · 10 reviews · 4 photos',
    source: 'Google Maps',
    comment:
      'Amazing guide, super friendly and accommodating! He taught us some things about Balinese culture and made the whole day really enjoyable. Everything was smooth and well organised. Highly recommend 😊',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'gmaps-rev-3',
    name: 'Zelna Lloyd',
    rating: 5,
    date: '2023-11-21',
    relativeDate: '3 years ago',
    reviewerMeta: '3 reviews · 9 photos',
    source: 'Google Maps',
    comment:
      "What an awesome person, tour guide and driver! Ketut ensured that my Ubud Bali day tour was catered to my specific request. He was kind, patient, caring and thoughtful throughout the day - helped taking photos and videos of me at every location. He even took me to a pharmacy to get flu medication. Ketut explained everything so well about the culture, religion, cuisine and tradition. I've had such a good time, loads of fun and laughter, and definitely made a new friend. I highly recommend Ketut to anyone to arrange a day tour or even assist with transport.",
    experienceId: 'ubud-waterfalls-monkey-market',
    verified: true,
  },
  {
    id: 'gmaps-rev-4',
    name: 'νατασα κατσ',
    rating: 5,
    date: '2023-11-15',
    relativeDate: '3 years ago',
    reviewerMeta: 'Local Guide · 29 reviews · 24 photos',
    source: 'Google Maps',
    comment:
      "Ketut is the best driver you can have in Bali. He is adorable, trustworthy, punctual, and kind. He has a great sense of humour and he is eager to share information about the Balinese culture and everyday life. He arranged the tour in a way that we didn't have to wait in queues to see the sites. Ketut is not just a tour guide, we actually feel that we had the chance to make a new friend in Bali and we hope to see him again soon!!!!",
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-5',
    name: 'Lisa C.',
    rating: 5,
    date: '2025-11-21',
    relativeDate: '1 year ago',
    reviewerMeta: 'Local Guide · 1,336 reviews · 9,143 photos',
    source: 'Google Maps',
    comment:
      "Ketut is a wonderful tour guide. If you'd like to see the sights just outside of Ubud for a day, a private car is the way to do it. The cost is very reasonable and Ketut is really knowledgeable about Balinese culture, the places you'll visit and will also recommend good artisanal shops outside of the city center if you're keen on getting things like a traditional Balinese wood carving (cleaned and fumigated so you can get through customs). He speaks English very fluently and has a good sense of humour. The itinerary is fully customizable based on what you're interested in. The temple puri gunung batu is smaller and quieter than the famous one that everyone goes to, so I recommend making that switch. When we were on the way back to our hotel, there was pretty bad traffic so Ketut offered to drop us off in the city so we could walk around, and he would bring our belongings back to the hotel, which he did. He's trustworthy and honest. Highly recommended!",
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-6',
    name: 'Oluade Alabi',
    rating: 5,
    date: '2022-11-21',
    relativeDate: 'Edited 4 years ago',
    reviewerMeta: 'Local Guide · 221 reviews · 3,813 photos',
    source: 'Google Maps',
    comment:
      'Ubud Bali day tour was the highlight of our visit to Bali. We had a highly knowledgeable, experienced and friendly guide. He knew the roads inside out without using any maps despite narrow, curvy roads we took on our tour. I would love to recommend Kadek as your tour guide and driver for all your tours in Bali',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'gmaps-rev-7',
    name: 'Chest M',
    rating: 5,
    date: '2025-11-10',
    relativeDate: '1 year ago',
    reviewerMeta: 'Local Guide · 15 reviews · 14 photos',
    source: 'Google Maps',
    comment:
      "A very informative and engaging tour. Ketut is very knowledgeable about the sites, esp. Temples, making it an educational tour in the process. Speaks and understands English very well and is responsive to queries. Respects time and is considerate of his client's prolonged enjoyment of the sites. Drives safely and knows alternative routes to beat the traffic. Thank you and till next time.",
    experienceId: 'half-day-bali-temple-waterfall-terraces',
    verified: true,
  },
];

export const INITIAL_REVIEWS_ID: Review[] = [
  {
    id: 'gmaps-rev-1',
    name: 'Sibgha Waqar',
    rating: 5,
    date: '2026-09-21',
    relativeDate: '2 bulan lalu',
    reviewerMeta: '4 ulasan',
    source: 'Google Maps',
    comment:
      'Kami menggunakan jasa Ketut Ajus untuk tur sehari kustom di Ubud dan area sekitarnya, dan jujur ini adalah keputusan terbaik yang pernah kami buat. Ketut sangat berpengetahuan luas mengenai setiap tempat yang kami kunjungi serta sejarah Indonesia dan Bali. Saya benar-benar merasa belajar dan lebih menghargai budayanya. Rekomendasi yang ia berikan luar biasa dan disesuaikan dengan apa yang kami inginkan. Ia juga sangat ramah diajak mengobrol dan membuat perjalanan kami sangat menyenangkan. Ini jelas menjadi sorotan utama liburan kami. Saya merekomendasikan siapa pun yang ingin memesan tur untuk memesan bersama Ketut karena Anda pasti akan mendapatkan pengalaman terbaik!!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-2',
    name: 'Lily Boudrie',
    rating: 5,
    date: '2026-05-21',
    relativeDate: '6 bulan lalu',
    reviewerMeta: 'Local Guide · 10 ulasan · 4 foto',
    source: 'Google Maps',
    comment:
      'Pemandu yang luar biasa, sangat ramah dan akomodatif! Ia mengajarkan kami banyak hal tentang budaya Bali dan membuat sepanjang hari terasa sangat menyenangkan. Semuanya berjalan lancar dan tertata rapi. Sangat direkomendasikan 😊',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'gmaps-rev-3',
    name: 'Zelna Lloyd',
    rating: 5,
    date: '2023-11-21',
    relativeDate: '3 tahun lalu',
    reviewerMeta: '3 ulasan · 9 foto',
    source: 'Google Maps',
    comment:
      'Sungguh pribadi, pemandu wisata, sekaligus pengemudi yang luar biasa! Ketut memastikan tur sehari Ubud Bali saya disesuaikan dengan permintaan khusus saya. Ia baik hati, sabar, peduli, dan penuh perhatian sepanjang hari—membantu mengambil foto dan video saya di setiap lokasi. Ia bahkan mengantar saya ke apotek untuk membeli obat flu. Ketut menjelaskan semuanya dengan sangat baik mengenai budaya, agama, kuliner, dan tradisi. Saya bersenang-senang, penuh tawa, dan merasa mendapatkan teman baru. Saya sangat merekomendasikan Ketut kepada siapa pun untuk tur harian maupun transportasi.',
    experienceId: 'ubud-waterfalls-monkey-market',
    verified: true,
  },
  {
    id: 'gmaps-rev-4',
    name: 'νατασα κατσ',
    rating: 5,
    date: '2023-11-15',
    relativeDate: '3 tahun lalu',
    reviewerMeta: 'Local Guide · 29 ulasan · 24 foto',
    source: 'Google Maps',
    comment:
      'Ketut adalah pengemudi terbaik yang bisa Anda dapatkan di Bali. Ia sangat menyenangkan, dapat dipercaya, tepat waktu, dan baik hati. Ia memiliki selera humor yang tinggi dan antusias berbagi informasi tentang budaya serta kehidupan sehari-hari masyarakat Bali. Ia mengatur rute tur sedemikian rupa sehingga kami tidak perlu mengantre untuk melihat tempat wisata. Ketut bukan sekadar pemandu wisata—kami benar-benar merasa mendapat kesempatan memiliki teman baru di Bali dan berharap bisa bertemu dengannya lagi segera!!!!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-5',
    name: 'Lisa C.',
    rating: 5,
    date: '2025-11-21',
    relativeDate: 'setahun lalu',
    reviewerMeta: 'Local Guide · 1.336 ulasan · 9.143 foto',
    source: 'Google Maps',
    comment:
      'Ketut adalah pemandu wisata yang luar biasa. Jika Anda ingin menjelajahi tempat-tempat di sekitar luar Ubud selama sehari, menyewa mobil privat adalah pilihan tepat. Biayanya sangat masuk akal dan Ketut sangat memahami budaya Bali, tempat yang dikunjungi, serta merekomendasikan toko pengrajin berkualitas di luar pusat kota jika Anda ingin membeli ukiran kayu tradisional Bali (yang sudah dibersihkan dan difumigasi agar aman melewati bea cukai). Bahasa Inggrisnya sangat fasih dan ia memiliki selera humor yang bagus. Rute perjalanan sepenuhnya dapat disesuaikan dengan minat Anda. Pura Gunung Batu lebih kecil dan lebih tenang dibanding pura populer yang didatangi semua orang, jadi saya sarankan memilih tempat itu. Saat perjalanan kembali ke hotel terjadi kemacetan cukup parah, Ketut menawarkan menurunkan kami di pusat kota agar kami bisa berjalan-jalan, sementara ia mengantarkan barang bawaan kami kembali ke hotel—dan itu benar-benar dilakukannya. Ia sangat jujur dan dapat dipercaya. Sangat direkomendasikan!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
  {
    id: 'gmaps-rev-6',
    name: 'Oluade Alabi',
    rating: 5,
    date: '2022-11-21',
    relativeDate: 'Diedit 4 tahun lalu',
    reviewerMeta: 'Local Guide · 221 ulasan · 3.813 foto',
    source: 'Google Maps',
    comment:
      'Tur sehari Ubud Bali menjadi sorotan terbaik dari kunjungan kami ke Bali. Kami didampingi pemandu yang sangat berpengetahuan, berpengalaman, dan ramah. Ia sangat hafal setiap jalan tanpa menggunakan peta meskipun kami melewati jalanan sempit dan berkelok. Saya dengan senang hati merekomendasikan Kadek sebagai pemandu wisata dan pengemudi Anda untuk seluruh tur di Bali.',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'gmaps-rev-7',
    name: 'Chest M',
    rating: 5,
    date: '2025-11-10',
    relativeDate: 'setahun lalu',
    reviewerMeta: 'Local Guide · 15 ulasan · 14 foto',
    source: 'Google Maps',
    comment:
      'Tur yang sangat informatif dan menarik. Ketut sangat menguasai informasi tentang berbagai destinasi, khususnya pura, sehingga tur ini sekaligus terasa edukatif. Ia berbicara dan memahami bahasa Inggris dengan sangat baik serta responsif menjawab pertanyaan. Sangat menghargai waktu dan pengertian ketika tamunya ingin menikmati lokasi lebih lama. Mengemudi dengan aman dan tahu rute alternatif untuk menghindari kemacetan. Terima kasih dan sampai jumpa di lain waktu.',
    experienceId: 'half-day-bali-temple-waterfall-terraces',
    verified: true,
  },
];

export const FAQS = [
  {
    question: 'Are all GoUbudTrip tours completely private?',
    answer:
      'Yes. Every booking with GoUbudTrip is 100% private. Your car, English-speaking driver, and tour schedule are dedicated exclusively to your party.',
  },
  {
    question: 'Are attraction entrance tickets included in the tour price?',
    answer:
      'Yes! All Ubud & adventure packages now include attraction entry tickets (and lunch on selected packages), except Tanjung Benoa Water Sports & Uluwatu where activity/temple tickets and lunch remain excluded. Pricing is transparent in USD for both solo (0–1 pax) and group (2–10 paxs) bookings.',
  },
  {
    question: 'Can vegetarian or dietary preferences be accommodated?',
    answer:
      'Yes! Both our snorkeling tour lunch and Balinese cooking class offer vegetarian options and allergen adjustments—simply note your preference when booking.',
  },
  {
    question: 'What is the cancellation and payment policy?',
    answer:
      'Payment can be settled on departure by Cash USD/IDR. Full refund applies if cancelled at least 48 hours before departure; cancellation on departure day carries a 100% charge.',
  },
  {
    question: 'Which areas of Bali are covered for hotel pickup?',
    answer:
      'We pick up across Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and other parts of Bali.',
  },
];

export const FAQS_ID = [
  {
    question: 'Apakah semua tur GoUbudTrip bersifat sepenuhnya privat?',
    answer:
      'Ya. Setiap pemesanan di GoUbudTrip 100% privat. Mobil ber-AC penuh, driver berbahasa Inggris, dan jadwal perjalanan didedikasikan khusus untuk rombongan Anda.',
  },
  {
    question: 'Apakah harga paket sudah termasuk tiket masuk objek wisata?',
    answer:
      'Ya, seluruh paket Ubud dan aktivitas kami kini sudah termasuk tiket masuk objek wisata (serta makan siang pada paket pilihan sesuai catatan), kecuali paket Tanjung Benoa Water Sports & Uluwatu (tidak termasuk tiket & makan siang). Tarif Net dalam USD tersedia transparan untuk 0–1 pax maupun 2–10 paxs.',
  },
  {
    question: 'Apakah tersedia pilihan makanan vegetarian?',
    answer:
      'Tentu saja. Pilihan menu vegetarian tersedia baik pada makan siang tur snorkeling maupun kelas memasak Bali. Cukup tulis catatan saat memesan.',
  },
  {
    question: 'Bagaimana kebijakan pembayaran dan pembatalan?',
    answer:
      'Pembayaran dapat dilakukan tunai (USD/IDR) saat keberangkatan. Pengembalian dana penuh berlaku jika dibatalkan 48 jam sebelum keberangkatan; pembatalan pada hari keberangkatan dikenakan biaya 100%.',
  },
  {
    question: 'Area Bali mana saja yang termasuk dalam penjemputan hotel?',
    answer:
      'Kami melayani penjemputan di Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, dan area lainnya di Bali.',
  },
];

export const GALLERY_PHOTOS = [
  { url: '/bali_volcano_bg_1783528702622.jpg', category: 'volcano', title: 'Mount Batur Caldera Peak' },
  { url: '/bali_jeep_adventure_1783528719252.jpg', category: 'volcano', title: 'Highland Explorations' },
  { url: '/bali_ocean_bg_1783528769356.jpg', category: 'ocean', title: 'Eastern Bali Clear Waters' },
  { url: '/ocean_luxury_escape_1783528733687.jpg', category: 'ocean', title: 'Turquoise Reef Snorkeling' },
  { url: '/bali_jungle_bg_1783528784335.jpg', category: 'jungle', title: 'Ubud Hidden Waterfalls' },
  { url: '/serene_jungle_retreat_1783528749017.jpg', category: 'jungle', title: 'Ubud Jungle Sanctuary' },
];

export const GALLERY_PHOTOS_ID = [
  { url: '/bali_volcano_bg_1783528702622.jpg', category: 'volcano', title: 'Puncak Kaldera Gunung Batur' },
  { url: '/bali_jeep_adventure_1783528719252.jpg', category: 'volcano', title: 'Eksplorasi Dataran Tinggi' },
  { url: '/bali_ocean_bg_1783528769356.jpg', category: 'ocean', title: 'Perairan Jernih Bali Timur' },
  { url: '/ocean_luxury_escape_1783528733687.jpg', category: 'ocean', title: 'Terumbu Karang Snorkeling' },
  { url: '/bali_jungle_bg_1783528784335.jpg', category: 'jungle', title: 'Air Terjun Tersembunyi Ubud' },
  { url: '/serene_jungle_retreat_1783528749017.jpg', category: 'jungle', title: 'Suaka Hutan Tropis Ubud' },
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'toyota-avanza',
    name: 'New Avanza',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783761973/24693abb-f732-49b4-ba68-28c882af0c16.png',
    passengers: 6,
    transmission: 'Manual / Automatic',
    engine: '1,500 cc',
    priceWithDriverPerDay: 450000,
    priceWithoutDriverPerDay: 300000,
    description:
      'Latest-generation Toyota Avanza rental in Bali featuring a comfortable cabin, cool dual AC, and smooth suspension for families.',
    features: ['6 Passenger Seats', 'Professional Driver', 'Fuel Included (With Driver)', 'Dual-Zone AC', 'Clean & Fresh Cabin'],
  },
  {
    id: 'toyota-innova',
    name: 'Innova Reborn',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762018/64feebd4-e9e7-4ffe-ac80-801b1ab26fd0.png',
    passengers: 6,
    transmission: 'Automatic',
    engine: '2,400 cc Diesel',
    priceWithDriverPerDay: 600000,
    priceWithoutDriverPerDay: 450000,
    description:
      'Spacious interior, plush suspension, and a strong diesel engine delivering VIP family comfort across Bali.',
    features: ['6 Passenger Seats', 'Professional Driver', 'Fuel Included (With Driver)', 'Quiet & Spacious Cabin', 'Maximum Cooling AC'],
  },
  {
    id: 'innova-zenix',
    name: 'Innova Zenix Type Q',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762059/56d3602a-cd36-437e-9a76-eab2be375ce3.png',
    passengers: 5,
    transmission: 'Automatic',
    engine: '2,000 cc Hybrid',
    priceWithDriverPerDay: 1200000,
    priceWithoutDriverPerDay: 0,
    description:
      'Next-generation silent hybrid MPV featuring luxury captain seats, panoramic roof, and executive VIP interior.',
    features: ['5 Passenger Seats', 'VIP Driver & Fuel', 'Luxury Captain Seats', 'Panoramic Roof', 'Whisper-Quiet Cabin'],
  },
  {
    id: 'toyota-alphard',
    name: 'Toyota Alphard',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762106/74503d32-3371-4191-a619-7b1cd976e1d2.png',
    passengers: 5,
    transmission: 'Automatic',
    engine: '2,500 cc',
    priceWithDriverPerDay: 2500000,
    priceWithoutDriverPerDay: 0,
    description:
      'The pinnacle of first-class luxury travel in Bali with cloud-like suspension, executive lounge seats, and chauffeur service.',
    features: ['5 VIP Lounge Seats', 'VIP Chauffeur & Fuel', 'First-Class Cabin', 'Electric Sliding Doors', 'Dual Climate Control'],
  },
  {
    id: 'hiace-commuter',
    name: 'Hiace Commuter',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762136/882d66e6-45b8-429b-a17f-6769179a7221.png',
    passengers: 15,
    transmission: 'Manual',
    engine: '2,500 cc Diesel',
    priceWithDriverPerDay: 1000000,
    priceWithoutDriverPerDay: 0,
    description:
      'Dependable luxury minibus ideal for extended families or group expeditions across Bali with generous legroom.',
    features: ['15 Passenger Seats', 'Tour Driver & Fuel', 'Extra-Spacious Cabin', 'Multi-Zone Cold AC', 'Smooth Group Ride'],
  },
  {
    id: 'bus-29',
    name: 'Bus 29 Seat',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762175/1dcdb7c6-c3ac-4b4a-b509-fa0697eb985f.png',
    passengers: 29,
    transmission: 'Manual',
    engine: 'Diesel Multi',
    priceWithDriverPerDay: 2000000,
    priceWithoutDriverPerDay: 0,
    description:
      'Medium-sized executive tour coach designed for corporate retreats, weddings, and large family groups in Bali.',
    features: ['29 Group Seats', 'Licensed Bus Captain & Fuel', 'Large Luggage Bay', 'Audio Entertainment', 'Even Cabin Cooling'],
  },
];

export const VEHICLES_ID: Vehicle[] = [
  {
    ...VEHICLES[0],
    description:
      'Sewa mobil New Avanza terbaru di Bali. Dilengkapi kabin yang nyaman, AC dingin merata, dan suspensi mumpuni untuk keluarga Anda.',
    features: ['6 Kursi Penumpang', 'Driver Profesional', 'BBM Termasuk (Dengan Supir)', 'AC Double Blower', 'Bersih & Wangi'],
  },
  {
    ...VEHICLES[1],
    description:
      'Kabin super luas, suspensi empuk, dan mesin diesel bertenaga tangguh. Kenyamanan perjalanan berkelas VIP bersama keluarga.',
    features: ['6 Kursi Penumpang', 'Driver Profesional', 'BBM Termasuk (Dengan Supir)', 'Kabin Luas & Senyap', 'AC Dingin Maksimal'],
  },
  {
    ...VEHICLES[2],
    description:
      'Armada premium generasi terbaru dengan teknologi Hybrid senyap, captain seat mewah, dan interior eksklusif kelas VIP.',
    features: ['5 Seat Penumpang', 'Driver VIP & BBM', 'Captain Seat Premium', 'Panoramic Roof', 'Kabin Mewah Senyap'],
  },
  {
    ...VEHICLES[3],
    description:
      'Simbol kemewahan sejati dan kenyamanan VIP First-Class. Dilengkapi dengan suspensi empuk dan interior megah.',
    features: ['5 Seat VIP', 'Driver VIP & BBM', 'Kabin First-Class', 'Electric Sliding Doors', 'AC Double Blower'],
  },
  {
    ...VEHICLES[4],
    description:
      'Mikrobus tangguh untuk rombongan keluarga besar atau grup pariwisata. Lapang, nyaman, dan handal menyusuri Bali.',
    features: ['15 Seat Penumpang', 'Sopir Pariwisata & BBM', 'Kabin Sangat Lapang', 'AC Multi-Zone Dingin', 'Sangat Nyaman'],
  },
  {
    ...VEHICLES[5],
    description:
      'Bus pariwisata medium berkapasitas besar. Nyaman untuk rombongan instansi, korporasi, maupun acara pernikahan di Bali.',
    features: ['29 Seat Rombongan', 'Sopir Bus Berlisensi & BBM', 'Bagasi Luas', 'Audio Karaoke', 'AC Dingin Merata'],
  },
];

export const UBUD_EXPERIENCE_IDS = new Set<string>([
  'half-day-bali-temple-waterfall-terraces',
  'cooking-class-massage',
  'ubud-waterfalls-monkey-market',
  'bali-swing-spa-transport',
  'ubud-iconic-tirta-empul-swing',
  'bali-atv-quad-lunch-spa',
  'white-water-rafting-monkey-forest',
  'ubud-atv-jungle-mud-track',
  'ubud-jungle-swing-photo-adventure',
  'ubud-jungle-buggy-adventure',
  'ubud-ultimate-culture-crafts-cascades',
]);

export const HERO_EXPERIENCE_IDS = new Set<string>([
  'half-day-bali-temple-waterfall-terraces',
  'bali-swing-spa-transport',
  'ubud-iconic-tirta-empul-swing',
  'white-water-rafting-monkey-forest',
  'ubud-ultimate-culture-crafts-cascades',
]);

export function getExperiences(lang: Language): Experience[] {
  return lang === 'id' ? EXPERIENCES_ID : EXPERIENCES;
}

export function getUbudExperiences(lang: Language): Experience[] {
  return getExperiences(lang).filter((exp) => UBUD_EXPERIENCE_IDS.has(exp.id));
}

export function getHeroExperiences(lang: Language): Experience[] {
  return getExperiences(lang).filter((exp) => HERO_EXPERIENCE_IDS.has(exp.id));
}

export function getFullDayUbudExperiences(lang: Language): Experience[] {
  return getUbudExperiences(lang).filter((exp) => !exp.isHalfDay);
}

export function getBookingAddons(lang: Language): BookingAddon[] {
  return lang === 'id' ? BOOKING_ADDONS_ID : BOOKING_ADDONS;
}

export function getInitialReviews(lang: Language): Review[] {
  return lang === 'id' ? INITIAL_REVIEWS_ID : INITIAL_REVIEWS;
}

export function getFaqs(lang: Language) {
  return lang === 'id' ? FAQS_ID : FAQS;
}

export function getGalleryPhotos(lang: Language) {
  return lang === 'id' ? GALLERY_PHOTOS_ID : GALLERY_PHOTOS;
}

export function getVehicles(lang: Language): Vehicle[] {
  return lang === 'id' ? VEHICLES_ID : VEHICLES;
}
