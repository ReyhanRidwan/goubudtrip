import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Clock, ArrowRight, Shield, Star, Award, Waves, Utensils, Mountain, Camera } from 'lucide-react';
import { getUbudExperiences, formatPrice } from '../data';
import { useLanguage } from '../i18n';
import { getPathForRoute } from '../routes';
import TourImageSlider from './TourImageSlider';

interface ActivitySectionProps {
  onBookNow: (experienceId: string) => void;
  onViewDetails?: (experienceId: string) => void;
}

export default function ActivitySection({ onBookNow, onViewDetails }: ActivitySectionProps) {
  const { lang } = useLanguage();
  const experiences = getUbudExperiences(lang).filter(
    (exp) => !exp.isHalfDay || exp.id === 'half-day-bali-temple-waterfall-terraces'
  );

  const activities = experiences.map((exp) => {
    const isHalfDayFeatured = exp.id === 'half-day-bali-temple-waterfall-terraces';
    const isSnorkeling = exp.id === 'snorkeling-waterfall';
    const isWaterSports = exp.id === 'water-sports-uluwatu-temple';
    const isRafting = exp.id === 'white-water-rafting-monkey-forest';
    const isAtv = exp.id === 'bali-atv-quad-lunch-spa' || exp.id === 'ubud-atv-jungle-mud-track';
    const isBuggy = exp.id === 'ubud-jungle-buggy-adventure';
    const isSunrise = exp.id === 'batur-sunrise-tegalalang';
    const isPhotoCulture =
      exp.id === 'ubud-waterfalls-monkey-market' ||
      exp.id === 'nungnung-sangeh-taman-ayun' ||
      exp.id === 'ubud-iconic-tirta-empul-swing' ||
      exp.id === 'ubud-jungle-swing-photo-adventure' ||
      exp.id === 'ubud-ultimate-culture-crafts-cascades';
    const isAdrenaline = exp.id === 'aling-aling-handara-lunch';
    const isSwingSpa = exp.id === 'bali-swing-spa-transport';
    return {
      ...exp,
      badge: isHalfDayFeatured
        ? lang === 'en'
          ? 'Featured • Half Day'
          : 'Unggulan • Half Day'
        : isSnorkeling
        ? lang === 'en'
          ? 'Best Seller'
          : 'Terlaris'
        : exp.id === 'ubud-atv-jungle-mud-track'
        ? lang === 'en'
          ? 'Activity • ATV Mud Track'
          : 'Aktivitas • ATV Trek Lumpur'
        : isAtv
        ? lang === 'en'
          ? 'Activity • ATV & Spa'
          : 'Aktivitas • ATV & Spa'
        : isBuggy
        ? lang === 'en'
          ? 'Activity • Polaris Buggy'
          : 'Aktivitas • Polaris Buggy'
        : isRafting
        ? lang === 'en'
          ? 'Activity • Rafting'
          : 'Aktivitas • Rafting'
        : isWaterSports
        ? lang === 'en'
          ? 'Water Sports & Cliff'
          : 'Water Sports & Uluwatu'
        : isSunrise
        ? lang === 'en'
          ? 'Sunrise & Terraces'
          : 'Sunrise & Terasering'
        : isAdrenaline
        ? lang === 'en'
          ? 'Jumping & Sliding'
          : 'Adrenalin & Alam'
        : isSwingSpa
        ? lang === 'en'
          ? 'Swing & Spa'
          : 'Ayunan & Spa'
        : exp.id === 'ubud-jungle-swing-photo-adventure'
        ? lang === 'en'
          ? 'Jungle Swing & Photos'
          : 'Ayunan Hutan & Foto'
        : isPhotoCulture
        ? lang === 'en'
          ? 'Photo & Culture'
          : 'Foto & Budaya'
        : lang === 'en'
        ? 'Private Tour'
        : 'Tur Privat',
      accentColor:
        isSnorkeling || isWaterSports || isRafting || isAtv || isBuggy || isSunrise || isAdrenaline
          ? 'text-amber-700'
          : 'text-gold-700',
      borderColor:
        isSnorkeling || isWaterSports || isRafting || isAtv || isBuggy || isSunrise || isAdrenaline
          ? 'hover:border-amber-500/50'
          : 'hover:border-gold-500/60',
      icon:
        isSnorkeling || isWaterSports || isRafting ? (
          <Waves size={14} className="text-amber-700" />
        ) : isSunrise || isAdrenaline || isAtv || isBuggy ? (
          <Mountain size={14} className="text-amber-700" />
        ) : isPhotoCulture ? (
          <Camera size={14} className="text-gold-700" />
        ) : (
          <Utensils size={14} className="text-gold-700" />
        ),
    };
  });

  return (
    <section id="luxury-activities" className="py-24 bg-[#FAF7F2] border-b border-stone-200 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white border border-gold-500/30 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles size={11} className="text-gold-600 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-700 font-bold">
              {lang === 'en' ? 'Full Day Tour Ubud' : 'Paket Full Day Tour Ubud'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-wide font-medium">
            {lang === 'en' ? 'Featured Ubud Tour Packages' : 'Paket Tour Pilihan Ubud'}
          </h2>
          <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed mt-4 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Discover our curated Full Day Ubud tour packages—from Balinese cooking classes with spa, hidden waterfalls, sacred Tirta Empul purification, and cultural crafts to ATV quad & river rafting.'
              : 'Temukan seluruh paket Full Day Tour Ubud pilihan kami—mulai dari kelas memasak Bali & spa, air terjun tersembunyi, wisata budaya & kerajinan, pura suci Tirta Empul, hingga ATV dan rafting.'}
          </p>
        </div>

        {/* Dynamic Cards Layout */}
        <div
          className={`grid grid-cols-1 ${
            activities.length % 3 === 0
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : activities.length >= 4
              ? 'md:grid-cols-2 xl:grid-cols-4'
              : 'md:grid-cols-2 max-w-5xl mx-auto'
          } gap-6`}
        >
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
              className={`bg-white border border-stone-200 ${activity.borderColor} rounded-xl overflow-hidden flex flex-col group transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-stone-900/10`}
            >
              {/* Image Section */}
              <div
                onClick={() => (onViewDetails ? onViewDetails(activity.id) : onBookNow(activity.id))}
                className="relative h-60 overflow-hidden bg-stone-200 cursor-pointer"
              >
                <TourImageSlider
                  images={
                    activity.images && activity.images.length > 0
                      ? activity.images
                      : [activity.cardImage]
                  }
                  alt={activity.title}
                  dotsClassName="top-12 right-3"
                  imageClassName="transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent pointer-events-none z-10" />
                
                {/* Badge & Rating overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-stone-950/85 backdrop-blur-md border border-white/20 text-gold-300 font-mono text-[8px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-sm shadow-lg">
                    {activity.tagline}
                  </span>
                  <div className="flex items-center space-x-1 bg-stone-950/85 backdrop-blur-md border border-white/20 px-2 py-1 rounded-sm shadow-md">
                    <Star size={10} className="fill-gold-400 text-gold-400" />
                    <span className="font-mono text-[9px] font-bold text-white">
                      {activity.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Price Tag Overlay bottom-left */}
                <div className="absolute bottom-3 left-4 z-10 text-left">
                  <p className="text-[8px] uppercase font-mono tracking-widest text-gold-300">
                    {lang === 'en' ? 'From' : 'Mulai'}
                  </p>
                  <p className="font-mono text-lg font-bold text-white">
                    {formatPrice(activity.pricePerPerson, activity.currency || 'USD')}{' '}
                    <span className="text-[10px] font-normal text-stone-200">/orang</span>
                  </p>
                </div>

                {/* Quick specs overlay bottom-right */}
                <div className="absolute bottom-3 right-4 z-10 flex flex-col items-end space-y-0.5 text-right font-mono text-[9px] text-stone-200">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-gold-300" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-gold-300" />
                    <span>{activity.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 flex-grow flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center space-x-1.5 mb-2">
                    {activity.icon}
                    <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${activity.accentColor}`}>
                      {activity.badge}
                    </span>
                  </div>
                  <h3
                    onClick={() => (onViewDetails ? onViewDetails(activity.id) : onBookNow(activity.id))}
                    className="font-serif text-lg md:text-xl text-stone-900 group-hover:text-gold-700 transition-colors font-medium mb-2 cursor-pointer"
                  >
                    {activity.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                    {activity.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-3.5 border-t border-stone-200">
                    <h4 className="font-serif text-[10px] uppercase tracking-widest text-gold-700 font-bold mb-1.5">
                      {lang === 'en' ? 'Highlights:' : 'Sorotan Utama:'}
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      {activity.highlights.slice(0, 3).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-1.5 text-[11px] text-stone-600 leading-tight">
                          <Shield size={11} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5">
                    <Award size={12} className="text-emerald-700 flex-shrink-0" />
                    <span className="font-mono text-[9px] text-stone-600 truncate">
                      {activity.id === 'half-day-bali-temple-waterfall-terraces'
                        ? lang === 'en'
                          ? 'Entry Tickets, Private AC Car & Local Host Included'
                          : 'Tiket Masuk, Mobil AC Privat & Host Lokal Termasuk'
                        : activity.id === 'batur-sunrise-tegalalang'
                        ? lang === 'en'
                          ? 'Entry Tickets, Private AC Car, Guide & Breakfast'
                          : 'Tiket Masuk, Mobil AC Privat, Pemandu & Sarapan'
                        : activity.id === 'ubud-waterfalls-monkey-market' ||
                          activity.id === 'nungnung-sangeh-taman-ayun'
                        ? lang === 'en'
                          ? 'Entry Tickets, Private AC Car, Driver & Fuel'
                          : 'Tiket Masuk, Mobil AC Privat, Driver & BBM'
                        : activity.id === 'ubud-iconic-tirta-empul-swing'
                        ? lang === 'en'
                          ? 'Entry & Swing Tickets, AC Car, Sarong & Water'
                          : 'Tiket Masuk & Swing, Mobil AC, Sarung & Air'
                        : activity.id === 'water-sports-uluwatu-temple'
                        ? lang === 'en'
                          ? 'Private AC Car, Insurance & Driver (Tickets Excluded)'
                          : 'Mobil AC Privat, Asuransi & Driver (Exclude Tiket)'
                        : activity.id === 'bali-atv-quad-lunch-spa'
                        ? lang === 'en'
                          ? 'Entry Ticket, 2H ATV, Buffet Lunch & 1H Spa'
                          : 'Tiket Masuk, 2 Jam ATV, Buffet Lunch & Spa 1 Jam'
                        : activity.id === 'white-water-rafting-monkey-forest'
                        ? lang === 'en'
                          ? 'Entry Tickets, 2H Ayung Rafting & Buffet Lunch'
                          : 'Tiket Masuk, 2 Jam Rafting Ayung & Buffet Lunch'
                        : activity.id === 'ubud-atv-jungle-mud-track'
                        ? lang === 'en'
                          ? 'Entry Ticket, ATV Gear, Lunch & Shower Included'
                          : 'Tiket Masuk, Perlengkapan ATV, Lunch & Bilas'
                        : activity.id === 'ubud-jungle-swing-photo-adventure'
                        ? lang === 'en'
                          ? 'Entry Tickets, 5 Swings, 2 Nests & AC Pickup'
                          : 'Tiket Masuk, 5 Ayunan, 2 Sarang & Mobil AC'
                        : activity.id === 'ubud-jungle-buggy-adventure'
                        ? lang === 'en'
                          ? 'Entry Tickets, 3-Lap Polaris Buggy, Lockers & AC'
                          : 'Tiket Masuk, 3 Putaran Polaris Buggy & Mobil AC'
                        : activity.id === 'ubud-ultimate-culture-crafts-cascades'
                        ? lang === 'en'
                          ? '8H Private AC Car, Entry Tickets, Guide & Sarong'
                          : '8 Jam Mobil AC Privat, Tiket Masuk, Pemandu & Sarung'
                        : lang === 'en'
                        ? 'Entry Tickets, Private AC Car & Lunch Included'
                        : 'Tiket Masuk, Mobil AC Privat & Makan Siang Termasuk'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {onViewDetails && (
                      <a
                        href={getPathForRoute('tour-detail', activity.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          onViewDetails(activity.id);
                        }}
                        className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-[10px] uppercase tracking-widest py-3 px-4 rounded-sm transition-all cursor-pointer inline-flex items-center justify-center"
                      >
                        {lang === 'en' ? 'Details' : 'Detail'}
                      </a>
                    )}
                    <button
                      onClick={() => onBookNow(activity.id)}
                      className="flex-1 bg-gold-600 hover:bg-gold-700 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                    >
                      <span>{lang === 'en' ? 'Book Now' : 'Booking Sekarang'}</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Safe and Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <div className="text-center p-3">
            <p className="font-mono text-gold-700 text-lg font-bold">0–1 & 2–10 PAX</p>
            <p className="font-sans text-[11px] text-stone-600 mt-1">
              {lang === 'en' ? 'Transparent Solo & Group USD Rates' : 'Tarif Net USD Transparan (Solo & Grup)'}
            </p>
          </div>
          <div className="text-center p-3 md:border-l border-stone-200">
            <p className="font-mono text-gold-700 text-lg font-bold">PRIVATE CAR</p>
            <p className="font-sans text-[11px] text-stone-600 mt-1">
              {lang === 'en' ? 'Fully Air-Conditioned Vehicle' : 'Mobil Privat Ber-AC Penuh'}
            </p>
          </div>
          <div className="text-center p-3 md:border-l border-stone-200">
            <p className="font-mono text-gold-700 text-lg font-bold">LOCAL HOST</p>
            <p className="font-sans text-[11px] text-stone-600 mt-1">
              {lang === 'en' ? 'Experienced Balinese Local Drivers' : 'Driver & Host Lokal Ubud Berpengalaman'}
            </p>
          </div>
          <div className="text-center p-3 md:border-l border-stone-200">
            <p className="font-mono text-gold-700 text-lg font-bold">48H REFUND</p>
            <p className="font-sans text-[11px] text-stone-600 mt-1">
              {lang === 'en' ? 'Full Refund 48 Hours Before Departure' : 'Refund Penuh 48 Jam Sebelum Berangkat'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
