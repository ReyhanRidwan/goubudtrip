import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { BRAND, useLanguage } from '../i18n';

export function TripAdvisorIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 5.997 5.997 0 0 0 4.04-10.43L24 6.647h-4.35a13.573 13.573 0 0 0-7.644-2.352zm0 2.092c1.72 0 3.433.368 4.985 1.076a6.03 6.03 0 0 0-4.985 4.996 6.03 6.03 0 0 0-4.985-4.996A11.49 11.49 0 0 1 12.006 6.387zM6.003 9.216a3.997 3.997 0 1 1 0 7.994 3.997 3.997 0 0 1 0-7.994zm11.994 0a3.997 3.997 0 1 1 0 7.994 3.997 3.997 0 0 1 0-7.994zm-11.994 1.998a1.999 1.999 0 1 0 0 3.998 1.999 1.999 0 0 0 0-3.998zm11.994 0a1.999 1.999 0 1 0 0 3.998 1.999 1.999 0 0 0 0-3.998z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function GoogleMapsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

interface SocialChannelsProps {
  variant?: 'inline' | 'cards' | 'compact';
}

export default function SocialChannels({ variant = 'inline' }: SocialChannelsProps) {
  const { lang } = useLanguage();

  const channels = [
    {
      id: 'tripadvisor',
      name: 'TripAdvisor',
      handle: 'Ubud Bali Day Tour',
      desc:
        lang === 'en'
          ? 'Read verified traveler reviews & ratings'
          : 'Lihat ulasan & rating tamu terverifikasi',
      href: BRAND.socials.tripadvisor,
      icon: TripAdvisorIcon,
      accentClass: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-500',
      badgeText: '4.9 ★',
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      handle: 'Google Business Profile',
      desc:
        lang === 'en'
          ? 'Find our Ubud office location & Google reviews'
          : 'Lihat lokasi resmi Ubud & ulasan Google kami',
      href: BRAND.socials.googleMaps,
      icon: GoogleMapsIcon,
      accentClass: 'text-amber-700 bg-amber-50 border-amber-200 hover:border-amber-500',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@ubudbalidaytour',
      desc:
        lang === 'en'
          ? 'Daily Bali stories, reels & tour photos'
          : 'Momen perjalanan & dokumentasi harian Bali',
      href: BRAND.socials.instagram,
      icon: InstagramIcon,
      accentClass: 'text-rose-700 bg-rose-50 border-rose-200 hover:border-rose-400',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@ubudbalidaytour',
      desc:
        lang === 'en'
          ? 'Short clips from waterfalls, ATV & swings'
          : 'Video singkat air terjun, ATV & jungle swing',
      href: BRAND.socials.tiktok,
      icon: TikTokIcon,
      accentClass: 'text-stone-900 bg-stone-100 border-stone-300 hover:border-stone-500',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'Ubud Bali Day Tour',
      desc:
        lang === 'en'
          ? 'Connect with our official community page'
          : 'Terhubung dengan halaman resmi kami',
      href: BRAND.socials.facebook,
      icon: FacebookIcon,
      accentClass: 'text-blue-700 bg-blue-50 border-blue-200 hover:border-blue-400',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ch.name} - ${ch.handle}`}
              title={`${ch.name} (${ch.handle})`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[11px] font-mono font-semibold transition-all shadow-xs ${ch.accentClass}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{ch.name}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isTripAdvisor = ch.id === 'tripadvisor';
          return (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-xl border p-5 transition-all duration-300 flex flex-col justify-between text-left shadow-sm hover:-translate-y-0.5 hover:shadow-md ${
                isTripAdvisor
                  ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-500'
                  : 'bg-white border-stone-200 hover:border-gold-500/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                      isTripAdvisor
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : ch.accentClass
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-stone-400 group-hover:text-gold-700 transition-colors"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-lg text-stone-900 font-semibold group-hover:text-gold-700 transition-colors">
                      {ch.name}
                    </h4>
                    {isTripAdvisor && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-sm">
                        <Star size={10} className="fill-emerald-700 text-emerald-700" />
                        5.0
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-gold-700 font-semibold mt-0.5">
                    {ch.handle}
                  </p>
                </div>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  {ch.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200/70">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-700 group-hover:text-gold-700 transition-colors">
                  {isTripAdvisor
                    ? lang === 'en'
                      ? 'View TripAdvisor Reviews →'
                      : 'Lihat Ulasan TripAdvisor →'
                    : ch.id === 'google-maps'
                    ? lang === 'en'
                      ? 'Open Google Maps →'
                      : 'Buka Google Maps →'
                    : lang === 'en'
                    ? `Follow on ${ch.name} →`
                    : `Ikuti di ${ch.name} →`}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // 'inline' variant for Home editorial section (DestinationGrid)
  return (
    <div className="pt-2 space-y-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold">
        {lang === 'en'
          ? 'Verified Reviews & Official Social Channels'
          : 'Ulasan Terverifikasi & Media Sosial Resmi'}
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isTripAdvisor = ch.id === 'tripadvisor';
          return (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs font-sans font-semibold transition-all shadow-xs ${
                isTripAdvisor
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                  : 'bg-white hover:bg-[#FAF7F2] text-stone-800 border-stone-300 hover:border-gold-600'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isTripAdvisor
                    ? 'text-white'
                    : ch.id === 'instagram'
                    ? 'text-rose-600'
                    : ch.id === 'facebook'
                    ? 'text-blue-600'
                    : 'text-stone-900'
                }`}
              />
              <span>{ch.name}</span>
              {isTripAdvisor && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded-sm">
                  <Star size={9} className="fill-current" />
                  Reviews
                </span>
              )}
              <ExternalLink size={11} className={isTripAdvisor ? 'text-white/80' : 'text-stone-400'} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
