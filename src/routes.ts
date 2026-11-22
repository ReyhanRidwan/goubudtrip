import { EXPERIENCES } from './data';
import { Language } from './i18n';

export type AppPage =
  | 'home'
  | 'tours'
  | 'custom-tour'
  | 'tour-detail'
  | 'about'
  | 'gallery'
  | 'whyus'
  | 'contact'
  | 'thankyou';

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const PAGE_PATHS: Record<Exclude<AppPage, 'tour-detail'>, string> = {
  home: '/',
  tours: '/paket-tour',
  'custom-tour': '/custom-tour',
  about: '/tentang-kami',
  gallery: '/galeri',
  whyus: '/keunggulan',
  contact: '/kontak',
  thankyou: '/terima-kasih',
};

export function getExperienceSlug(experienceId: string): string {
  const exp = EXPERIENCES.find((e) => e.id === experienceId);
  return exp ? slugifyTitle(exp.title) : slugifyTitle(experienceId);
}

export function getPathForRoute(page: AppPage, experienceId?: string): string {
  if (page === 'tour-detail' && experienceId) {
    return `/${getExperienceSlug(experienceId)}`;
  }
  return PAGE_PATHS[page === 'tour-detail' ? 'tours' : page];
}

export function parsePathname(pathname: string): { page: AppPage; experienceId?: string } {
  const clean = pathname.replace(/\/+$/, '').toLowerCase() || '/';

  if (clean === '/' || clean === '/home' || clean === '/beranda') {
    return { page: 'home' };
  }
  if (
    clean === '/paket-tour' ||
    clean === '/pakettour' ||
    clean === '/tours' ||
    clean === '/tour-packages' ||
    clean === '/packages'
  ) {
    return { page: 'tours' };
  }
  if (
    clean === '/custom-tour' ||
    clean === '/customize-tour' ||
    clean === '/custom-paket'
  ) {
    return { page: 'custom-tour' };
  }
  if (clean === '/tentang-kami' || clean === '/about') {
    return { page: 'about' };
  }
  if (clean === '/galeri' || clean === '/gallery') {
    return { page: 'gallery' };
  }
  if (clean === '/keunggulan' || clean === '/why-us' || clean === '/whyus') {
    return { page: 'whyus' };
  }
  if (clean === '/kontak' || clean === '/contact') {
    return { page: 'contact' };
  }
  if (clean === '/terima-kasih' || clean === '/thank-you' || clean === '/thankyou') {
    return { page: 'thankyou' };
  }

  // Match tour detail by title slug, ID, /paket-tour/:slug, /tour/:slug, or /pakettour1..15
  const segment = clean
    .replace(/^\/(?:paket-tour|tours|tour|paket)\//, '')
    .replace(/^\//, '');

  const matched = EXPERIENCES.find(
    (exp) => slugifyTitle(exp.title) === segment || exp.id.toLowerCase() === segment
  );
  if (matched) {
    return { page: 'tour-detail', experienceId: matched.id };
  }

  const numMatch = segment.match(/^pakettour(\d+)$/);
  if (numMatch) {
    const idx = parseInt(numMatch[1], 10) - 1;
    if (idx >= 0 && idx < EXPERIENCES.length) {
      return { page: 'tour-detail', experienceId: EXPERIENCES[idx].id };
    }
  }

  return { page: 'home' };
}

export function getDocumentTitle(page: AppPage, lang: Language, experienceId?: string): string {
  const base = 'GoUbudTrip';
  if (page === 'tour-detail' && experienceId) {
    const exp = EXPERIENCES.find((e) => e.id === experienceId);
    if (exp) return `${exp.title} — ${base}`;
  }
  const titles: Record<AppPage, { en: string; id: string }> = {
    home: {
      en: `${base} — Private Bali Ubud Tours, Activities & Custom Trips`,
      id: `${base} — Tur Privat Bali Ubud, Aktivitas & Paket Custom`,
    },
    tours: {
      en: `Tour Packages — ${base}`,
      id: `Paket Tour Ubud — ${base}`,
    },
    'custom-tour': {
      en: `Customize Tour — ${base}`,
      id: `Custom Paket Tour — ${base}`,
    },
    'tour-detail': {
      en: `Tour Details — ${base}`,
      id: `Detail Paket Tour — ${base}`,
    },
    about: {
      en: `About Us — ${base}`,
      id: `Tentang Kami — ${base}`,
    },
    gallery: {
      en: `Photo Gallery — ${base}`,
      id: `Galeri Foto — ${base}`,
    },
    whyus: {
      en: `Why Choose Us — ${base}`,
      id: `Keunggulan Kami — ${base}`,
    },
    contact: {
      en: `Contact Concierge — ${base}`,
      id: `Hubungi Kami — ${base}`,
    },
    thankyou: {
      en: `Booking Confirmation — ${base}`,
      id: `Konfirmasi Booking — ${base}`,
    },
  };
  return titles[page][lang];
}
