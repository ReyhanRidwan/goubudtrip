import { EXPERIENCES, EXPERIENCES_ID, FAQS, FAQS_ID, getTierPricePerPerson } from './data';
import { BRAND, Language } from './i18n';
import { AppPage, getDocumentTitle, getPathForRoute } from './routes';

const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertDynamicJsonLd(schemaObj: Record<string, unknown>) {
  const scriptId = 'dynamic-page-jsonld';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schemaObj);
}

function getPageDescription(page: AppPage, lang: Language, experienceId?: string): string {
  const list = lang === 'id' ? EXPERIENCES_ID : EXPERIENCES;

  if (page === 'tour-detail' && experienceId) {
    const exp = list.find((e) => e.id === experienceId);
    if (exp) {
      const text = exp.shortDesc.trim();
      return text.length > 158 ? `${text.slice(0, 155)}...` : text;
    }
  }

  const descriptions: Record<AppPage, { en: string; id: string }> = {
    home: {
      en: 'Book private Bali Ubud day tours, waterfalls, jungle swings, ATV mud tracks, Nusa Penida, and custom itineraries with experienced Balinese local hosts.',
      id: 'Pesan paket tour privat Bali Ubud, air terjun, jungle swing, ATV trek lumpur, Nusa Penida, dan itinerary custom bersama host lokal Bali berpengalaman.',
    },
    tours: {
      en: 'Browse 17 private Bali & Ubud tour packages in transparent USD pricing—half day tours, snorkeling, Mount Batur sunrise, ATV, rafting, and Nusa Penida.',
      id: 'Jelajahi 17 paket tour privat Bali & Ubud dengan harga transparan USD—half day tour, snorkeling, sunrise Batur, ATV, rafting, dan Nusa Penida.',
    },
    'custom-tour': {
      en: 'Design your own bespoke Bali private tour with GoUbudTrip. Pick your favorite Ubud temples, waterfalls, swings, or beaches with a dedicated local driver.',
      id: 'Rancang sendiri rute tour privat Bali Anda bersama GoUbudTrip. Pilih pura, air terjun, ayunan Ubud, atau pantai favorit dengan driver lokal.',
    },
    'tour-detail': {
      en: 'Private Bali Ubud tour package details, itinerary, USD pricing, and instant WhatsApp booking with GoUbudTrip.',
      id: 'Detail paket tour privat Bali Ubud, jadwal perjalanan, harga USD transparan, dan pemesanan cepat via WhatsApp GoUbudTrip.',
    },
    about: {
      en: 'Meet GoUbudTrip—a local Ubud tour company offering warm Balinese hospitality, certified guides, private AC cars, and verified TripAdvisor & Google reviews.',
      id: 'Kenali GoUbudTrip—operator tur lokal di Ubud Bali dengan keramahan tulus, pemandu berpengalaman, mobil AC privat, serta ulasan asli TripAdvisor & Google.',
    },
    gallery: {
      en: 'Explore curated photography from private GoUbudTrip Bali adventures across Ubud waterfalls, Mount Batur volcanoes, rice terraces, and Nusa Penida.',
      id: 'Lihat galeri foto perjalanan privat GoUbudTrip di air terjun Ubud, Gunung Batur, terasering sawah Tegalalang, dan pantai eksotis Nusa Penida.',
    },
    whyus: {
      en: 'Discover why travelers trust GoUbudTrip for 100% private Bali Ubud tours—transparent USD rates, local Balinese hosts, and flexible itineraries.',
      id: 'Ketahui keunggulan GoUbudTrip untuk tour privat Bali Ubud 100%—tarif USD transparan, host asli Bali, serta rute liburan fleksibel.',
    },
    contact: {
      en: 'Contact GoUbudTrip Ubud concierge desk 24/7 via WhatsApp (+62 877-6102-2499), email goubudtrip@gmail.com, or visit our Google Business Profile.',
      id: 'Hubungi tim GoUbudTrip 24/7 via WhatsApp (+62 877-6102-2499), email goubudtrip@gmail.com, atau lihat lokasi resmi kami di Google Maps.',
    },
    thankyou: {
      en: 'Your private Bali tour booking request has been prepared with GoUbudTrip.',
      id: 'Konfirmasi ringkasan pemesanan tour privat Bali Anda bersama GoUbudTrip.',
    },
  };

  return descriptions[page][lang];
}

export function syncDocumentSeo(page: AppPage, lang: Language, experienceId?: string) {
  const origin = BRAND.siteUrl;
  const routePath = getPathForRoute(page, experienceId);
  const canonicalUrl = `${origin}${routePath === '/' ? '/' : routePath}`;
  const title = getDocumentTitle(page, lang, experienceId);
  const description = getPageDescription(page, lang, experienceId);

  const list = lang === 'id' ? EXPERIENCES_ID : EXPERIENCES;
  const activeExp =
    page === 'tour-detail' && experienceId ? list.find((e) => e.id === experienceId) : undefined;
  const ogImage = activeExp?.cardImage || DEFAULT_OG_IMAGE;

  document.documentElement.lang = lang;
  document.title = title;

  upsertCanonicalLink(canonicalUrl);
  upsertMetaTag('name', 'description', description);
  upsertMetaTag('name', 'robots', page === 'thankyou' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  upsertMetaTag('property', 'og:title', title);
  upsertMetaTag('property', 'og:description', description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', ogImage);

  upsertMetaTag('name', 'twitter:title', title);
  upsertMetaTag('name', 'twitter:description', description);
  upsertMetaTag('name', 'twitter:image', ogImage);

  // Build route-specific Schema.org JSON-LD
  if (page === 'tour-detail' && activeExp) {
    const groupPrice = getTierPricePerPerson(activeExp, 2);
    const soloPrice = getTierPricePerPerson(activeExp, 1);
    const lowPrice = Math.min(groupPrice, soloPrice);
    const highPrice = Math.max(groupPrice, soloPrice);

    upsertDynamicJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: `${origin}/paket-tour` },
            { '@type': 'ListItem', position: 3, name: activeExp.title, item: canonicalUrl },
          ],
        },
        {
          '@type': ['TouristTrip', 'Product'],
          name: activeExp.title,
          description: activeExp.longDesc,
          image: activeExp.images && activeExp.images.length > 0 ? activeExp.images : [activeExp.cardImage],
          url: canonicalUrl,
          touristType: 'Private Day Tour',
          provider: {
            '@id': `${origin}/#organization`,
          },
          brand: {
            '@type': 'Brand',
            name: BRAND.name,
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: String(lowPrice),
            highPrice: String(highPrice),
            offerCount: '2',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(activeExp.rating),
            bestRating: '5',
            worstRating: '1',
            reviewCount: String(activeExp.reviewCount),
          },
        },
      ],
    });
    return;
  }

  const activeFaqs = lang === 'id' ? FAQS_ID : FAQS;
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: activeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  if (page === 'tours') {
    upsertDynamicJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: list.length,
        itemListElement: list.map((exp, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: exp.title,
          url: `${origin}${getPathForRoute('tour-detail', exp.id)}`,
        })),
      },
    });
    return;
  }

  if (page === 'contact') {
    upsertDynamicJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          name: title,
          description,
          url: canonicalUrl,
        },
        faqSchema,
      ],
    });
    return;
  }

  upsertDynamicJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: title,
        description,
        url: canonicalUrl,
      },
      faqSchema,
    ],
  });
}
