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
      (tier) => guests >= tier.minPersons && guests <= tier.maxPersons
    );
    if (matched) {
      return isChild ? matched.childrenPrice : matched.adultPrice;
    }
  }
  return exp.pricePerPerson;
}

const SHARED_TERMS_EN = [
  'Payment can settle on departure by Cash USD/IDR.',
  'Price is Net includes Government tax.',
  'Cancellation on Departure will be 100 % Charge.',
  'Full refund 48 hours before your departure',
  'Reasonable and fair price and that means no hidden charge',
  'For Group booking, get special deals.',
];

const SHARED_TERMS_ID = [
  'Pembayaran dapat diselesaikan saat keberangkatan secara tunai (USD/IDR).',
  'Harga sudah bersih (Net) termasuk pajak pemerintah.',
  'Pembatalan pada hari keberangkatan dikenakan biaya 100%.',
  'Pengembalian dana penuh (100% refund) jika dibatalkan 48 jam sebelum keberangkatan.',
  'Harga wajar dan transparan tanpa biaya tersembunyi.',
  'Untuk pemesanan grup besar tersedia penawaran harga spesial.',
];

export const EXPERIENCES: Experience[] = [
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
    pricePerPerson: 60,
    currency: 'USD',
    discountTiers: [
      { minPersons: 2, maxPersons: 6, adultPrice: 50, childrenPrice: 50 },
      { minPersons: 7, maxPersons: 12, adultPrice: 44, childrenPrice: 44 },
    ],
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
      'Private air-conditioned car, English-speaking driver, lunch, and snorkeling gear',
    ],
    inclusions: [
      'Mineral water',
      'Private tour with fully air conditioned car',
      'English Speaking Driver',
      'Lunch',
      'Snorkeling Equipment',
    ],
    exclusions: [
      'Entrance tickets & attraction admission fees',
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
    pricePerPerson: 95,
    currency: 'USD',
    discountTiers: [
      { minPersons: 1, maxPersons: 1, adultPrice: 95, childrenPrice: 95 },
      { minPersons: 2, maxPersons: 6, adultPrice: 75, childrenPrice: 75 },
      { minPersons: 7, maxPersons: 12, adultPrice: 63, childrenPrice: 63 },
    ],
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
      'Entrance tickets to attractions & optional sites',
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
    pricePerPerson: 75,
    currency: 'USD',
    discountTiers: [
      { minPersons: 2, maxPersons: 6, adultPrice: 56, childrenPrice: 56 },
      { minPersons: 7, maxPersons: 12, adultPrice: 50, childrenPrice: 50 },
    ],
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
      'Breakfast',
      'Mineral water',
      'Private tour with fully air conditioned car',
      'English Speaking Driver',
      'Professional trekking Guide',
      'Flash light',
    ],
    exclusions: [
      'Entrance tickets (Mount Batur area & Tegalalang Rice Terraces)',
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
    ],
    pricePerPerson: 60,
    currency: 'USD',
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
      'Private air-conditioned car, English-speaking driver & fuel',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Mineral Water',
    ],
    exclusions: [
      'Entrance tickets to all waterfalls & attractions',
      'Meals & personal expenses',
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
    ],
    pricePerPerson: 35,
    currency: 'USD',
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
      'Balinese Sarong for temple visits included',
      'Private air-conditioned car with English-speaking driver & fuel',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Balinese Sarong for Visit the Temple',
    ],
    exclusions: [
      'Entrance tickets (Nungnung Waterfall, Sangeh Monkey Forest & Taman Ayun Temple)',
      'Lunch & personal expenses',
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
    ],
    pricePerPerson: 45,
    currency: 'USD',
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
      'One-hour spa, lunch, insurance & private AC transport included',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'One Hour Balinese Spa',
      'Insurance',
      'Lunch',
    ],
    exclusions: [
      'Entrance tickets & Bali Swing activity ticket',
      'Personal Expense',
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
    tourNote:
      'For single traveler will be added additional charge USD 25 will be paid on the day of the tour',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164500/a32092e2-026e-41df-a6b7-eb15b0d54df3.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164533/bcef8053-1432-4d85-ba1f-d20f9687ad21.png',
    ],
    pricePerPerson: 44,
    currency: 'USD',
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
      'Insurance, lunch & private AC transport included',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Insurance',
      'Lunch',
    ],
    exclusions: [
      'Entrance & activity tickets (Aling-Aling Waterfall & Handara Gate)',
      'Personal Expense',
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
    ],
    pricePerPerson: 24,
    currency: 'USD',
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
      'Optional Tegalalang Jungle Swing photo experience',
      'Experience sacred Balinese water purification at Tirta Empul Temple',
      'Balinese sarong, bottled water, fuel & private AC car with English driver included',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Balinese Sarong For Visit The Temple',
      'Bottle of Water',
    ],
    exclusions: [
      'Entrance tickets (Monkey Forest, Tirta Empul, Tegalalang & Jungle Swing)',
      'Personal Expenses',
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
    ],
    pricePerPerson: 75,
    currency: 'USD',
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
    ],
    pricePerPerson: 55,
    currency: 'USD',
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
      'Insurance, fuel & private air-conditioned car with English-speaking driver',
    ],
    inclusions: [
      'English Speaking Driver',
      'Gas / Fuel',
      'Air Conditioner Car',
      'Insurance',
      'Locker',
      'Towel',
      'Buffet Lunch',
    ],
    exclusions: [
      'Entrance tickets & site admission fees',
      'Personal Expense',
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
    pricePerPerson: 45,
    currency: 'USD',
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
      'Visit Sacred Monkey Forest Sanctuary in Ubud (~800 long-tailed monkeys)',
    ],
    inclusions: [
      '2 hours Ayung River white water rafting experience',
      'Indonesian buffet lunch with a stunning view of rice field',
      'Private AC transfer to Sacred Monkey Forest Sanctuary Ubud',
    ],
    exclusions: [
      'Entrance tickets (Monkey Forest & site admission fees)',
      'Personal Expense',
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
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172245/174aae57-a651-481f-bd37-53bfb3ada380.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172245/174aae57-a651-481f-bd37-53bfb3ada380.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172245/174aae57-a651-481f-bd37-53bfb3ada380.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172267/b24e558f-fd07-4ff8-9bc9-de0cbc2619d0.png',
    ],
    pricePerPerson: 63,
    currency: 'USD',
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
      'Including lunch',
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
      'Entrance tickets & site admission fees',
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
    ],
    pricePerPerson: 55,
    currency: 'USD',
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
      'Hotel pickup and drop off in fully AC vehicle',
      '5 Type of Swings (1 Single Swing, 1 Tandem Swing, 1 Libra Swing & 1 Romantic Swing)',
      '2 Type of Cute Nests (1 Bird Nest, 1 Chicken Nest)',
      '1 Big Stone with an amazing rice paddy',
    ],
    exclusions: [
      'Entrance tickets to attraction area',
      'Guide tipping',
      'Personal expenses',
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
      'Drive top-of-the-line Polaris Buggies across an exclusive 4.5km private jungle circuit (3 laps) with gourmet lunch, safety equipment, and private AC hotel pickup.',
    longDesc:
      'Are you ready to get a little muddy and a lot of excited?\n\nStep away from the typical tourist trails and get behind the wheel for a pulse-pounding adventure in the highlands of Ubud. Your journey begins at our world-class motor park, where our professional guides will provide a comprehensive safety briefing and a practice lap to get you comfortable with the controls.\n\nOnce you’re ready, it’s time to hit the jungle. You’ll navigate through a custom-designed track that winds through thick tropical foliage and challenging terrain. Feel the adrenaline surge as you tackle the natural obstacles of the Balinese wilderness in a vehicle built for pure performance.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172900/09b5ace9-1629-49c3-9e5c-80b6d068ad87.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795172904/a501e706-3f84-4eb8-bf53-7c9a63870443.png',
    ],
    pricePerPerson: 61,
    currency: 'USD',
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
      'Including lunch',
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
      'Mason Adventures Quality: Enjoy the peace of mind that comes with Bali’s most established adventure operator. Expect world-class facilities, professional instructors, and a delicious gourmet lunch to top off your day.',
    ],
    inclusions: [
      'Private hotel pickup and drop off in fully AC vehicle',
      'Use of Buggy vehicle on track',
      'Safety Equipment',
      'Professional guides',
      'Free use of lockers',
      'Food only lunch',
      'Jungle Buggy 3 laps',
      'Insurance',
    ],
    exclusions: [
      'Entrance tickets & site admission fees',
      'Guide tipping',
      'Personal expenses',
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
        title: 'Gourmet Lunch & Return Transfer',
        desc: 'Freshen up using free lockers, savor a gourmet lunch (food only), and relax on your private transfer back to your hotel.',
      },
    ],
  },
  {
    id: 'ubud-ultimate-culture-crafts-cascades',
    category: 'culture',
    title: 'Ubud Waterfall, Culture & Crafts Tour',
    tagline: 'Private Trip • Tegenungan, Celuk & Terraces',
    shortDesc:
      'A 9-hour private Ubud journey with a live English-speaking guide visiting Tegenungan Waterfall, Celuk silver village, Goa Gajah cave, Monkey Forest, Tegalalang Rice Terraces & Luwak Coffee.',
    longDesc:
      'Embark on an extraordinary full-day adventure, unraveling the very essence of Ubud. This thoughtfully designed tour seamlessly blends cultural immersion with the awe-inspiring beauty of Bali’s landscapes. You’ll begin by witnessing a powerful natural waterfall, then immerse yourself in the intricate world of traditional Balinese craftsmanship.\n\nDelve into the island’s ancient past at a sacred cave and enjoy playful encounters in a mystical forest. The journey continues with breathtaking views of iconic rice terraces, before concluding with a unique taste of local flavors. This comprehensive tour promises genuine experiences, leaving you with cherished memories and a deeper connection to the magic of Bali.',
    bgImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
    cardImage:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
    images: [
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
    ],
    pricePerPerson: 18,
    currency: 'USD',
    duration: '9 hours',
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
      '9 hours’ duration',
      'Live tour guide (English speaking)',
    ],
    whatToExpect:
      'Step into the enchanting world of Ubud with our meticulously designed full-day tour. This isn’t just a trip; it’s an intimate and comprehensive experience that promises to immerse you in Bali’s rich artistic heritage, spiritual depths, and stunning natural landscapes. We’ve curated a journey that perfectly blends iconic landmarks with authentic local encounters, ensuring every moment is filled with discovery and wonder.\n\nThe reasons why this package is the perfect for you:\n• Immersive Cultural & Artistic Discovery: Dive deep into Bali’s vibrant soul as you witness generations of craftsmanship in Celuk Village and explore the profound spiritual history of Goa Gajah. You’ll gain a true appreciation for the island’s artistic and historical legacy.\n• Iconic Natural Beauty & Engaging Wildlife: Marvel at the powerful rush of Tegenungan Waterfall and capture breathtaking photos amidst the terraced beauty of Tegalalang Rice Terraces. Plus, enjoy the unique thrill of interacting with playful macaques in their natural, sacred habitat.\n• Unique Balinese Flavors & Local Insights: Conclude your day with a fascinating visit to a Luwak Coffee Plantation, where you’ll not only learn about one of the world’s most unique coffee-making processes but also savor a delightful array of local teas and coffees.',
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
      'Experienced local tour guide',
      'Comfortable private car with AC',
      'Bottled drinking water',
      'Sarong for temple visits',
      'Parking fees at all locations',
    ],
    exclusions: [
      'Entrance tickets to all attractions',
      'Bali Swing ticket',
      'Any personal expenses (e.g., souvenir shopping)',
      'Lunch',
    ],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Hotel Pick-up',
        desc: 'Your private, air-conditioned vehicle and friendly local driver will greet you at your accommodation.',
      },
      {
        time: '09:30 AM',
        title: 'Tegenungan Waterfall',
        desc: 'Immerse yourself in the beauty of this powerful cascade; take stunning photos or simply enjoy the refreshing atmosphere.',
      },
      {
        time: '10:45 AM',
        title: 'Celuk Village',
        desc: 'Witness the intricate art of silver and gold crafting firsthand and explore exquisite local artworks.',
      },
      {
        time: '12:00 PM',
        title: 'Goa Gajah (Elephant Cave)',
        desc: 'Delve into the history and spiritual aura of this fascinating ancient cave temple and its surroundings.',
      },
      {
        time: '01:00 PM',
        title: 'Lunch Break',
        desc: 'Enjoy a delicious local lunch at a recommended restaurant (at your own expense), savoring authentic Balinese flavors.',
      },
      {
        time: '02:00 PM',
        title: 'Sacred Monkey Forest Sanctuary',
        desc: 'Delight in observing the playful macaques as they roam freely amidst ancient temple grounds and lush forest.',
      },
      {
        time: '03:30 PM',
        title: 'Tegalalang Rice Terraces',
        desc: 'Capture breathtaking photos of the world-famous terraced rice paddies, a testament to Bali’s unique irrigation system.',
      },
      {
        time: '04:30 PM',
        title: 'Luwak Coffee Plantation',
        desc: 'Embark on a unique sensory journey; learn about the famed Luwak coffee production and enjoy complimentary tastings of various Balinese teas and coffees.',
      },
      {
        time: '05:30 PM',
        title: 'Return Transfer',
        desc: 'Begin your comfortable journey back to your hotel, reflecting on a day full of discoveries.',
      },
      {
        time: '06:30 PM',
        title: 'Hotel Drop-off',
        desc: 'Arrive back at your accommodation, refreshed and filled with incredible memories of Ubud’s wonders.',
      },
    ],
  },
];

export const EXPERIENCES_ID: Experience[] = [
  {
    ...EXPERIENCES[0],
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
    highlights: [
      'Snorkeling 2 jam di dua spot terbaik: Blue Lagoon & Jepun',
      'Transfer perahu tradisional menuju terumbu karang alami Bali Timur',
      'Berenang bersama ikan tropis dan penyu laut di air jernih',
      'Kunjungan foto Instagramable ke Air Terjun Kanto Lampo & Tibumana',
      'Mobil AC privat, driver berpengalaman, makan siang, dan peralatan snorkeling',
    ],
    inclusions: [
      'Air mineral',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver berbahasa Inggris',
      'Makan siang',
      'Peralatan Snorkeling lengkap',
    ],
    exclusions: [
      'Tiket masuk objek wisata & retribusi spot kunjungan',
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
    ...EXPERIENCES[1],
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
    inclusions: [
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
      'Tiket masuk objek wisata & destinasi tambahan',
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
    ...EXPERIENCES[2],
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
    inclusions: [
      'Sarapan pagi',
      'Air mineral',
      'Tur privat dengan mobil ber-AC penuh',
      'Driver berbahasa Inggris',
      'Pemandu trekking profesional',
      'Senter (Flash light)',
    ],
    exclusions: [
      'Tiket masuk kawasan (Gunung Batur & Terasering Sawah Tegalalang)',
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
    ...EXPERIENCES[3],
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
    highlights: [
      'Durasi santai ±1 jam per lokasi di Air Terjun Tibumana & Kanto Lampo',
      'Pemandangan lembah hijau spektakuler di Tegalalang Rice Terrace',
      'Mengunjungi suaka alami monyet ekor panjang di Monkey Forest Ubud',
      'Belanja kerajinan dan seni tradisional Bali di Pasar Seni Ubud',
      'Mobil AC privat, driver berbahasa Inggris, BBM & air mineral',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Air Mineral',
    ],
    exclusions: [
      'Tiket masuk seluruh air terjun & objek wisata',
      'Makan siang & pengeluaran pribadi',
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
    ...EXPERIENCES[4],
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
    highlights: [
      'Menyaksikan Air Terjun Nungnung setinggi 70 meter di Bali tengah',
      'Berinteraksi dengan ~600 monyet ekor panjang di Sangeh Monkey Forest',
      'Mengunjungi Pura Kerajaan Taman Ayun di Mengwi yang dikelilingi kolam air indah',
      'Sudah termasuk kain sarung Bali untuk kunjungan pura',
      'Mobil AC privat dengan driver berbahasa Inggris & BBM',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Kain Sarung Bali untuk Mengunjungi Pura',
    ],
    exclusions: [
      'Tiket masuk destinasi (Air Terjun Nungnung, Sangeh & Pura Taman Ayun)',
      'Makan siang & pengeluaran pribadi',
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
    ...EXPERIENCES[5],
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
    highlights: [
      'Pengalaman ayunan ikonik dengan pemandangan hutan & terasering sawah Ubud',
      'Perawatan pijat spa tradisional Bali selama 1 jam di Ubud',
      'Makan siang fleksibel (sebelum atau sesudah spa)',
      'Sudah termasuk spa 1 jam, makan siang, asuransi & transportasi AC privat',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Pijat Spa Bali Satu Jam',
      'Asuransi',
      'Makan Siang',
    ],
    exclusions: [
      'Tiket masuk & tiket aktivitas Bali Swing',
      'Pengeluaran Pribadi',
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
    ...EXPERIENCES[6],
    tagline: 'Air Terjun Aling-Aling & Handara Gate',
    shortDesc:
      'Pacu adrenalin meluncur & melompat tebing di Air Terjun Kroya, Kembar, Pucuk & Aling-Aling selama 2 jam, nikmati makan siang berlatar indah, foto di Handara Gate, dan wisata kopi.',
    longDesc:
      'Jika Anda mencari hari penuh adrenalin di Bali, Jumping & Sliding di Air Terjun Aling-Aling adalah pilihan terbaik. Tantang diri Anda meluncur di air terjun dengan papan luncur khusus dan lanjutkan ke air terjun indah lainnya: Kroya, Kembar, Pucuk, dan Aling-Aling selama 2 jam penuh.\n\nSetelah itu nikmati makan siang dengan pemandangan menawan, berfoto di gerbang ikonik Handara Gate, serta singgah di perkebunan kopi tradisional Bali sebelum kembali.',
    tourNote:
      'Untuk peserta tunggal (single traveler) dikenakan biaya tambahan USD 25 yang dibayarkan pada hari tur.',
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
      'Termasuk asuransi, makan siang & mobil AC privat',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
      'Makan Siang',
    ],
    exclusions: [
      'Tiket masuk & tiket aktivitas (Air Terjun Aling-Aling & Handara Gate)',
      'Pengeluaran Pribadi',
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
    ...EXPERIENCES[7],
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
    highlights: [
      'Mengunjungi Sacred Monkey Forest (~800 ekor kera) & Puri Kerajaan Ubud',
      'Panorama indah Terasering Sawah Tegalalang di utara Ubud',
      'Kesempatan mencoba wahana populer Tegalalang Jungle Swing',
      'Pengalaman tradisi penyucian diri di Pura Tirta Empul',
      'Sudah termasuk kain sarung pura, air mineral, BBM & mobil AC privat',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Kain Sarung Bali untuk Mengunjungi Pura',
      'Air Mineral Botol',
    ],
    exclusions: [
      'Tiket masuk objek wisata (Monkey Forest, Tirta Empul, Tegalalang & Jungle Swing)',
      'Pengeluaran Pribadi',
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
    ...EXPERIENCES[8],
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
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
    ],
    exclusions: [
      'Tiket masuk Pura Uluwatu & tiket aktivitas water sports',
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
    ...EXPERIENCES[9],
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
    highlights: [
      'Petualangan ATV Quad Bike 2 jam menyusuri desa & jalur alam bersama instruktur profesional',
      'Sudah termasuk makan siang prasmanan (Buffet Lunch), loker & handuk',
      'Pijat relaksasi spa selama satu jam setelah berpetualang',
      'Asuransi, BBM & mobil ber-AC privat dengan driver berbahasa Inggris',
    ],
    inclusions: [
      'Driver Berbahasa Inggris',
      'BBM / Bahan Bakar',
      'Mobil Ber-AC Penuh',
      'Asuransi',
      'Loker (Locker)',
      'Handuk (Towel)',
      'Makan Siang Buffet',
    ],
    exclusions: [
      'Tiket masuk kawasan & biaya retribusi lokasi',
      'Pengeluaran Pribadi',
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
    ...EXPERIENCES[10],
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
    inclusions: [
      'Menikmati 2 jam white water rafting di Ubud.',
      'Makan siang buffet Indonesia dengan pemandangan sawah yang memukau.',
      'Transportasi privat menuju suaka Monkey Forest di Ubud.',
    ],
    exclusions: [
      'Tiket masuk wisata (Monkey Forest & biaya masuk lokasi)',
      'Pengeluaran Pribadi',
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
    ...EXPERIENCES[11],
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
    featureBadges: [
      'Jaminan harga terbaik',
      'Open trip',
      'Termasuk makan siang',
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
      'Tiket masuk kawasan & biaya masuk lokasi wisata',
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
    ...EXPERIENCES[12],
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
    featureBadges: [
      'Jaminan harga terbaik',
      'Open trip',
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
      'Antar-jemput hotel dengan mobil ber-AC penuh',
      '5 Tipe Ayunan (1 Single Swing, 1 Tandem Swing, 1 Libra Swing & 1 Romantic Swing)',
      '2 Tipe Sarang Foto (1 Bird Nest, 1 Chicken Nest)',
      '1 Spot Big Stone dengan pemandangan sawah memukau',
    ],
    exclusions: [
      'Tiket masuk kawasan wisata',
      'Tip pemandu',
      'Pengeluaran pribadi',
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
    ...EXPERIENCES[13],
    tagline: 'Aktivitas • Off-Road Jungle Buggy',
    shortDesc:
      'Kemudikan Polaris Buggy kelas atas di sirkuit hutan privat sepanjang 4,5 km (3 putaran) lengkap dengan makan siang lezat, perlengkapan keselamatan, dan antar-jemput privat.',
    longDesc:
      'Siap berpetualang menantang lumpur di dataran tinggi Ubud?\n\nMelangkah keluar dari jalur wisata biasa dan kemudikan langsung buggy off-road berkinerja tinggi di motor park kelas dunia kami. Setelah pengarahan keselamatan lengkap dan satu putaran latihan bersama pemandu profesional, Anda siap menaklukkan lintasan khusus yang membelah rimbunnya hutan tropis Bali.',
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
      'Termasuk makan siang',
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
      'Kualitas Mason Adventures: Fasilitas kelas dunia, instruktur profesional, serta hidangan makan siang lezat.',
    ],
    inclusions: [
      'Antar-jemput hotel privat dengan mobil ber-AC penuh',
      'Penggunaan kendaraan Buggy di lintasan',
      'Peralatan Keselamatan',
      'Pemandu profesional',
      'Penggunaan loker gratis',
      'Makan siang (makanan saja)',
      'Jungle Buggy 3 putaran (3 laps)',
      'Asuransi',
    ],
    exclusions: [
      'Tiket masuk kawasan wisata',
      'Tip pemandu',
      'Pengeluaran pribadi',
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
        title: 'Makan Siang & Pengantaran Kembali ke Hotel',
        desc: 'Menggunakan loker gratis untuk beristirahat, menyantap makan siang, dan kembali ke hotel dengan nyaman.',
      },
    ],
  },
  {
    ...EXPERIENCES[14],
    tagline: 'Tur Privat • Tegenungan, Celuk & Sawah',
    shortDesc:
      'Petualangan privat 9 jam di Ubud bersama pemandu lokal berbahasa Inggris ke Air Terjun Tegenungan, Desa Celuk, Goa Gajah, Monkey Forest, Terasering Tegalalang & Perkebunan Kopi Luwak.',
    longDesc:
      'Nikmati petualangan sehari penuh yang memadukan kekayaan budaya Bali dengan keindahan alam Ubud. Anda akan mengawalinya dengan menyambangi air terjun alami yang megah, menyaksikan langsung keahlian pengrajin perak & emas tradisional di Desa Celuk, menelusuri situs purbakala Goa Gajah, berinteraksi di Sacred Monkey Forest, menikmati panorama Terasering Sawah Tegalalang, serta mencicipi cita rasa kopi dan teh khas Bali.',
    duration: '9 jam',
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
      'Durasi 9 jam',
      'Pemandu wisata langsung (Inggris)',
    ],
    whatToExpect:
      'Masuki pesona autentik Ubud melalui tur sehari penuh yang dirancang khusus untuk membawa Anda menyusuri warisan seni, nilai spiritual, dan lanskap alam terbaik Bali.\n\nAlasan paket ini sangat tepat untuk Anda:\n• Eksplorasi Budaya & Seni Mendalam: Menyaksikan langsung seni kerajinan perak dan emas turun-temurun di Desa Celuk serta sejarah spiritual Goa Gajah.\n• Keindahan Alam & Satwa Ikonik: Menyegarkan diri di Air Terjun Tegenungan, berfoto di Terasering Sawah Tegalalang, dan melihat kera ekor panjang di Monkey Forest.\n• Cita Rasa Lokal Bali: Menutup perjalanan di Perkebunan Kopi Luwak dengan mencicipi gratis berbagai kopi dan teh herbal khas Bali.',
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
    inclusions: [
      'Pemandu wisata lokal berpengalaman',
      'Mobil privat nyaman ber-AC penuh',
      'Air mineral kemasan',
      'Kain sarung untuk kunjungan pura',
      'Biaya parkir di seluruh lokasi',
    ],
    exclusions: [
      'Tiket masuk seluruh objek wisata',
      'Tiket Bali Swing',
      'Pengeluaran pribadi (belanja suvenir, dll.)',
      'Makan siang',
    ],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Penjemputan Hotel',
        desc: 'Mobil privat ber-AC penuh dan driver lokal ramah menyambut Anda di hotel tempat menginap.',
      },
      {
        time: '09:30 AM',
        title: 'Air Terjun Tegenungan',
        desc: 'Menikmati keindahan derasnya air terjun Tegenungan untuk berfoto dan bersantai di udara segar.',
      },
      {
        time: '10:45 AM',
        title: 'Desa Celuk',
        desc: 'Melihat langsung proses pembuatan kerajinan perhiasan perak dan emas khas Bali.',
      },
      {
        time: '12:00 PM',
        title: 'Goa Gajah (Elephant Cave)',
        desc: 'Menelusuri sejarah dan aura spiritual pura gua kuno Goa Gajah serta kawasan sekitarnya.',
      },
      {
        time: '01:00 PM',
        title: 'Istirahat Makan Siang',
        desc: 'Menikmati makan siang lezat di restoran pilihan yang direkomendasikan (biaya pribadi).',
      },
      {
        time: '02:00 PM',
        title: 'Sacred Monkey Forest Sanctuary',
        desc: 'Mengamati monyet ekor panjang yang hidup bebas di kawasan hutan suaka dan kompleks pura kuno.',
      },
      {
        time: '03:30 PM',
        title: 'Terasering Sawah Tegalalang',
        desc: 'Mengabadikan foto indah hamparan sawah terasering hijau yang mendunia.',
      },
      {
        time: '04:30 PM',
        title: 'Perkebunan Kopi Luwak',
        desc: 'Mengenal proses pengolahan kopi Luwak sekaligus mencicipi gratis berbagai pilihan kopi dan teh Bali.',
      },
      {
        time: '05:30 PM',
        title: 'Perjalanan Kembali',
        desc: 'Memulai perjalanan pulang yang nyaman kembali menuju hotel Anda.',
      },
      {
        time: '06:30 PM',
        title: 'Tiba di Hotel',
        desc: 'Tiba kembali di akomodasi Anda dengan kenangan tak terlupakan dari Ubud.',
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
    id: 'rev-1',
    name: 'Alexander V.',
    rating: 5,
    date: '2026-06-15',
    comment:
      'Blue Lagoon and Jepun snorkeling were crystal clear with plenty of colorful reef fish and turtles! Afterward our driver took us to Kanto Lampo and Tibumana waterfalls with zero stress.',
    experienceId: 'snorkeling-waterfall',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Charlotte Dubois',
    rating: 5,
    date: '2026-06-28',
    comment:
      'The Ubud Balinese cooking class felt so authentic—starting at the morning market and cooking inside a traditional Balinese compound. Finishing with a one-hour Ubud massage made it our favorite day in Bali.',
    experienceId: 'cooking-class-massage',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Made Suarta',
    rating: 5,
    date: '2026-07-02',
    comment:
      'Smooth hotel pickup in Seminyak, super comfortable AC car, and our English-speaking driver helped capture great photos at both waterfalls.',
    experienceId: 'snorkeling-waterfall',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Jonathan K.',
    rating: 5,
    date: '2026-05-19',
    comment:
      'Everything was super transparent with zero hidden charges. Our family group of 8 also got the group discount rate automatically!',
    experienceId: 'cooking-class-massage',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Liam O’Connor',
    rating: 5,
    date: '2026-07-10',
    comment:
      'Waking up early for Mount Batur was completely worth it! Our trekking guide took great sunrise photos over the crater and breakfast was hot and delicious before relaxing at Tegalalang Rice Terraces.',
    experienceId: 'batur-sunrise-tegalalang',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Hannah Lindqvist',
    rating: 5,
    date: '2026-07-18',
    comment:
      'Loved having unhurried time at Tibumana and Kanto Lampo waterfalls with our private driver! Tegalalang, Monkey Forest, and Ubud Art Market flowed smoothly in one unforgettable day.',
    experienceId: 'ubud-waterfalls-monkey-market',
    verified: true,
  },
  {
    id: 'rev-7',
    name: 'Daniel Carter',
    rating: 5,
    date: '2026-07-24',
    comment:
      'Nungnung Waterfall was massive and breathtaking! Sangeh Monkey Forest was much calmer than crowded tourist spots, and Taman Ayun Temple was serene.',
    experienceId: 'nungnung-sangeh-taman-ayun',
    verified: true,
  },
  {
    id: 'rev-8',
    name: 'Sophia Miller',
    rating: 5,
    date: '2026-08-02',
    comment:
      'The Ubud jungle swing gave us incredible photos, lunch hit the spot, and the one-hour Balinese spa massage was pure bliss!',
    experienceId: 'bali-swing-spa-transport',
    verified: true,
  },
  {
    id: 'rev-9',
    name: 'Marcus Jensen',
    rating: 5,
    date: '2026-08-09',
    comment:
      'Sliding down Kroya and cliff jumping at Aling-Aling Waterfall was the highlight of our Bali trip! Handara Gate and the coffee plantation rounded out a fantastic day.',
    experienceId: 'aling-aling-handara-lunch',
    verified: true,
  },
  {
    id: 'rev-10',
    name: 'Elena Rossi',
    rating: 5,
    date: '2026-08-14',
    comment:
      'Wonderful value for a custom Ubud day! Seeing the macaques at Monkey Forest, swinging over Tegalalang, and doing the Tirta Empul purification ritual was unforgettable.',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'rev-11',
    name: 'Ryan Takahashi',
    rating: 5,
    date: '2026-08-21',
    comment:
      'Parasailing, jet ski, banana boat, and donut boat at Tanjung Benoa were pure adrenaline! Ending the afternoon overlooking the ocean cliffs at Uluwatu Temple made it a 10/10 day.',
    experienceId: 'water-sports-uluwatu-temple',
    verified: true,
  },
  {
    id: 'rev-12',
    name: 'Lucas Meyer',
    rating: 5,
    date: '2026-08-27',
    comment:
      'Two hours on the ATV quad bikes through countryside trails was muddy, safe, and thrilling! Having a buffet lunch and finishing with a 1-hour spa massage made the day complete.',
    experienceId: 'bali-atv-quad-lunch-spa',
    verified: true,
  },
  {
    id: 'rev-13',
    name: 'Chloe Bennett',
    rating: 5,
    date: '2026-09-03',
    comment:
      'Ayung River rafting had gorgeous jungle waterfalls all along the route, the rice-field buffet lunch was tasty, and Monkey Forest Ubud was a great finale.',
    experienceId: 'white-water-rafting-monkey-forest',
    verified: true,
  },
  {
    id: 'rev-14',
    name: 'Ethan Reynolds',
    rating: 5,
    date: '2026-09-12',
    comment:
      'The Ubud ATV mud track and 45-degree valley descent were insane! Riding through the bamboo forest and blasting through the splash zone before showering and having lunch was unforgettable.',
    experienceId: 'ubud-atv-jungle-mud-track',
    verified: true,
  },
  {
    id: 'rev-15',
    name: 'Mia Laurent',
    rating: 5,
    date: '2026-09-19',
    comment:
      'Swinging over the 200-meter Tegallalang jungle valley felt like flying! Trying all 5 swings, the Bird Nest, and the Big Stone rice paddy spot gave us our favorite Bali photos.',
    experienceId: 'ubud-jungle-swing-photo-adventure',
    verified: true,
  },
  {
    id: 'rev-16',
    name: 'Noah Lindholm',
    rating: 5,
    date: '2026-09-25',
    comment:
      'The Polaris Jungle Buggy 3-lap circuit was pure adrenaline! Certified roll cages, great instructors, and gourmet lunch after getting muddy made it worth every rupiah.',
    experienceId: 'ubud-jungle-buggy-adventure',
    verified: true,
  },
  {
    id: 'rev-17',
    name: 'Clara Hoffman',
    rating: 5,
    date: '2026-10-02',
    comment:
      'Everything from Tegenungan Waterfall and Celuk silver artisans to Goa Gajah, Monkey Forest, Tegalalang Rice Terraces, and Luwak coffee tasting ran right on schedule. Incredible value for a private 9-hour tour!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
    verified: true,
  },
];

export const INITIAL_REVIEWS_ID: Review[] = [
  {
    id: 'rev-1',
    name: 'Alexander V.',
    rating: 5,
    date: '2026-06-15',
    comment:
      'Snorkeling di Blue Lagoon dan Jepun airnya sangat jernih dengan banyak ikan karang dan penyu! Setelahnya driver mengantar kami ke Air Terjun Kanto Lampo dan Tibumana dengan sangat nyaman.',
    experienceId: 'snorkeling-waterfall',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Charlotte Dubois',
    rating: 5,
    date: '2026-06-28',
    comment:
      'Kelas memasak Bali di Ubud terasa sangat autentik mulai dari tur pasar pagi sampai memasak di rumah tradisional Bali. Ditutup dengan pijat 1 jam membuat hari kami sempurna.',
    experienceId: 'cooking-class-massage',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Made Suarta',
    rating: 5,
    date: '2026-07-02',
    comment:
      'Penjemputan di Seminyak tepat waktu, mobil AC sangat dingin dan nyaman, dan driver kami sangat membantu mengarahkan spot foto terbaik di air terjun.',
    experienceId: 'snorkeling-waterfall',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Jonathan K.',
    rating: 5,
    date: '2026-05-19',
    comment:
      'Semuanya benar-benar transparan tanpa biaya tersembunyi. Rombongan keluarga kami ber-8 juga langsung mendapatkan tarif diskon grup!',
    experienceId: 'cooking-class-massage',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Liam O’Connor',
    rating: 5,
    date: '2026-07-10',
    comment:
      'Bangun pagi untuk mendaki Gunung Batur benar-benar terbayar! Pemandu trekking membantu foto sunrise di kawah dan sarapannya nikmat sebelum kami bersantai di Terasering Sawah Tegalalang.',
    experienceId: 'batur-sunrise-tegalalang',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Hannah Lindqvist',
    rating: 5,
    date: '2026-07-18',
    comment:
      'Suka sekali karena tidak dikejar waktu di Air Terjun Tibumana dan Kanto Lampo bersama driver privat! Lanjut ke Tegalalang, Monkey Forest, dan Pasar Seni Ubud berjalan sangat lancar.',
    experienceId: 'ubud-waterfalls-monkey-market',
    verified: true,
  },
  {
    id: 'rev-7',
    name: 'Daniel Carter',
    rating: 5,
    date: '2026-07-24',
    comment:
      'Air Terjun Nungnung sangat megah dan memukau! Sangeh Monkey Forest suasananya jauh lebih tenang, dan Pura Taman Ayun begitu asri dikelilingi kolam.',
    experienceId: 'nungnung-sangeh-taman-ayun',
    verified: true,
  },
  {
    id: 'rev-8',
    name: 'Sophia Miller',
    rating: 5,
    date: '2026-08-02',
    comment:
      'Ayunan Bali Swing di Ubud menghasilkan foto luar biasa, makan siangnya lezat, dan pijat spa satu jam benar-benar memanjakan tubuh!',
    experienceId: 'bali-swing-spa-transport',
    verified: true,
  },
  {
    id: 'rev-9',
    name: 'Marcus Jensen',
    rating: 5,
    date: '2026-08-09',
    comment:
      'Seluncur air di Kroya dan lompat tebing di Air Terjun Aling-Aling jadi momen terbaik liburan kami di Bali! Ditambah Handara Gate dan kebun kopi yang seru.',
    experienceId: 'aling-aling-handara-lunch',
    verified: true,
  },
  {
    id: 'rev-10',
    name: 'Elena Rossi',
    rating: 5,
    date: '2026-08-14',
    comment:
      'Tur Ubud yang sangat memuaskan dengan harga terjangkau! Mulai dari Monkey Forest, ayunan di Tegalalang, hingga ritual penyucian di Tirta Empul.',
    experienceId: 'ubud-iconic-tirta-empul-swing',
    verified: true,
  },
  {
    id: 'rev-11',
    name: 'Ryan Takahashi',
    rating: 5,
    date: '2026-08-21',
    comment:
      'Parasailing, jet ski, banana boat, dan donut boat di Tanjung Benoa sangat seru! Ditutup dengan pemandangan tebing Pura Uluwatu membuat hari kami sempurna.',
    experienceId: 'water-sports-uluwatu-temple',
    verified: true,
  },
  {
    id: 'rev-12',
    name: 'Lucas Meyer',
    rating: 5,
    date: '2026-08-27',
    comment:
      'Bermain ATV Quad Bike selama 2 jam di pedesaan benar-benar seru dan aman bersama instruktur! Dilengkapi makan siang buffet dan pijat spa 1 jam yang bikin rileks.',
    experienceId: 'bali-atv-quad-lunch-spa',
    verified: true,
  },
  {
    id: 'rev-13',
    name: 'Chloe Bennett',
    rating: 5,
    date: '2026-09-03',
    comment:
      'Rafting di Sungai Ayung menyuguhkan hutan alami dan air terjun yang indah di sepanjang jalur, makan siang di tepi sawah lezat, lalu ditutup ke Monkey Forest Ubud.',
    experienceId: 'white-water-rafting-monkey-forest',
    verified: true,
  },
  {
    id: 'rev-14',
    name: 'Ethan Reynolds',
    rating: 5,
    date: '2026-09-12',
    comment:
      'Trek lumpur ATV di Ubud dan turunan lembah 45 derajatnya luar biasa seru! Melintasi hutan bambu dan zona cipratan lumpur lalu mandi dan makan siang benar-benar berkesan.',
    experienceId: 'ubud-atv-jungle-mud-track',
    verified: true,
  },
  {
    id: 'rev-15',
    name: 'Mia Laurent',
    rating: 5,
    date: '2026-09-19',
    comment:
      'Berayun di atas lembah hutan Tegallalang setinggi 200 meter terasa seperti terbang! Mencoba 5 jenis ayunan, Bird Nest, dan Big Stone menghasilkan foto liburan Bali terbaik kami.',
    experienceId: 'ubud-jungle-swing-photo-adventure',
    verified: true,
  },
  {
    id: 'rev-16',
    name: 'Noah Lindholm',
    rating: 5,
    date: '2026-09-25',
    comment:
      'Sirkuit 3 putaran Polaris Jungle Buggy memacu adrenalin! Roll cage bersertifikat, instruktur hebat, serta makan siang lezat setelah bermain lumpur membuatnya sangat sepadan.',
    experienceId: 'ubud-jungle-buggy-adventure',
    verified: true,
  },
  {
    id: 'rev-17',
    name: 'Clara Hoffman',
    rating: 5,
    date: '2026-10-02',
    comment:
      'Mulai dari Air Terjun Tegenungan, pengrajin perak Desa Celuk, Goa Gajah, Monkey Forest, Terasering Tegalalang hingga cicip kopi Luwak berjalan tepat waktu dan sangat nyaman untuk tur privat 9 jam!',
    experienceId: 'ubud-ultimate-culture-crafts-cascades',
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
    question: 'How does the Global Discount group pricing work?',
    answer:
      'Our tour packages automatically apply lower per-person rates as your group size increases (for example 2–6 guests or 7–12 guests), with Net pricing already including government tax.',
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
    question: 'Bagaimana sistem harga Global Discount untuk rombongan?',
    answer:
      'Harga per orang otomatis lebih hemat sesuai jumlah peserta (misalnya 2–6 orang atau 7–12 orang), dan seluruh harga sudah Net termasuk pajak pemerintah.',
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
