import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, MapPin, ArrowRight, Compass, Search, SlidersHorizontal } from 'lucide-react';
import { Experience } from '../types';
import { getExperiences, formatPrice } from '../data';
import { useLanguage } from '../i18n';
import { getPathForRoute } from '../routes';
import TourImageSlider from './TourImageSlider';

interface TourCatalogProps {
  onBookNow: (experienceId: string) => void;
  onViewDetails: (experienceId: string) => void;
  onCustomizeTour?: () => void;
}

type CategoryFilter = 'all' | 'half-day' | 'activities' | 'adventure' | 'culture';

export default function TourCatalog({ onBookNow, onViewDetails, onCustomizeTour }: TourCatalogProps) {
  const { lang } = useLanguage();
  const experiences = getExperiences(lang);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryOfExp = (exp: Experience): CategoryFilter => {
    if (exp.category) return exp.category;
    if (
      exp.id === 'snorkeling-waterfall' ||
      exp.id === 'batur-sunrise-tegalalang' ||
      exp.id === 'nungnung-sangeh-taman-ayun' ||
      exp.id === 'aling-aling-handara-lunch' ||
      exp.id === 'water-sports-uluwatu-temple'
    ) {
      return 'adventure';
    }
    return 'culture';
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'half-day') return Boolean(exp.isHalfDay) && matchesSearch;
    return getCategoryOfExp(exp) === selectedCategory && matchesSearch;
  });

  const categories =
    lang === 'en'
      ? [
          { id: 'all', label: 'All Packages' },
          { id: 'half-day', label: 'Half Day Tour' },
          { id: 'activities', label: 'Activities' },
          { id: 'adventure', label: 'Waterfalls & Adventure' },
          { id: 'culture', label: 'Ubud, Swing & Spa' },
        ]
      : [
          { id: 'all', label: 'Semua Paket' },
          { id: 'half-day', label: 'Half Day Tour' },
          { id: 'activities', label: 'Aktivitas' },
          { id: 'adventure', label: 'Air Terjun & Petualangan' },
          { id: 'culture', label: 'Ubud, Swing & Spa' },
        ];

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold bg-white px-4 py-2 border border-gold-500/30 rounded-full inline-block shadow-sm">
            {lang === 'en' ? 'Bespoke VIP Packages' : 'Paket VIP Eksklusif'}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 font-medium tracking-wide">
            {lang === 'en' ? 'Private Bali Tour Catalog' : 'Katalog Paket Tour Eksklusif'}
          </h1>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-light">
            {lang === 'en'
              ? 'Discover Bali Ubud’s untouched natural beauty with 100% private VIP service—from Ubud jungle trails and hidden waterfalls to sacred ancient temples.'
              : 'Jelajahi keindahan murni alam Bali Ubud dengan layanan VIP privat 100%. Mulai dari jalur petualangan hutan Ubud, air terjun, hingga wisata budaya pura kuno.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-6 rounded-xl border border-stone-200 shadow-sm mb-12" id="catalog-controls">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto" id="catalog-category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-mono font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gold-600 text-white shadow-sm font-bold'
                    : 'bg-[#FAF7F2] text-stone-700 border border-stone-200 hover:border-gold-600 hover:text-gold-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search destinations or tours...' : 'Cari destinasi atau paket...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 font-sans transition-colors"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="text-left mb-6 text-xs text-stone-500 font-mono uppercase">
          {lang === 'en'
            ? `SHOWING ${filteredExperiences.length} OF ${experiences.length} PRIVATE EXPERIENCES`
            : `MENAMPILKAN ${filteredExperiences.length} DARI ${experiences.length} PAKET LAYANAN PRIVAT`}
        </div>

        {/* Catalog Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filteredExperiences.length % 3 === 0
              ? 'lg:grid-cols-3'
              : filteredExperiences.length >= 6
              ? 'xl:grid-cols-4'
              : filteredExperiences.length === 4
              ? 'max-w-6xl mx-auto'
              : 'max-w-5xl mx-auto'
          } gap-6`}
          id="catalog-tours-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, idx) => (
              <motion.div
                layout
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group shadow-sm hover:border-gold-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/10"
              >
                <div
                  onClick={() => onViewDetails(exp.id)}
                  className="relative h-64 overflow-hidden bg-stone-200 cursor-pointer"
                >
                  <TourImageSlider
                    images={exp.images && exp.images.length > 0 ? exp.images : [exp.cardImage]}
                    alt={exp.title}
                    dotsClassName="bottom-4 right-4"
                    imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none z-10" />
                  
                  <div className="absolute top-4 right-4 bg-stone-950/85 border border-white/20 rounded-sm px-3.5 py-2 backdrop-blur-sm z-10 shadow-md">
                    <span className="block text-[9px] font-mono text-gold-300 tracking-widest uppercase font-semibold">
                      {lang === 'en' ? 'From' : 'Mulai'}
                    </span>
                    <span className="font-mono text-base font-bold text-white">
                      {formatPrice(exp.pricePerPerson, exp.currency || 'USD')}
                    </span>
                    <span className="text-[9px] text-stone-200 font-light block -mt-0.5">
                      /orang
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center bg-gold-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
                      {exp.tagline}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-gold-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-mono text-xs font-bold ml-1 text-stone-900">{exp.rating}</span>
                      </div>
                      <span className="text-stone-500 text-xs font-mono">
                        ({exp.reviewCount} {lang === 'en' ? 'reviews' : 'ulasan'})
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-stone-900 font-medium group-hover:text-gold-700 transition-colors duration-300">
                      <a
                        href={getPathForRoute('tour-detail', exp.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          onViewDetails(exp.id);
                        }}
                        className="hover:text-gold-700 transition-colors cursor-pointer"
                      >
                        {exp.title}
                      </a>
                    </h3>

                    <p className="text-stone-600 text-xs leading-relaxed font-sans line-clamp-3">
                      {exp.shortDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-200 text-[11px] font-mono text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gold-600" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-gold-600" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-stone-200">
                    <a
                      href={getPathForRoute('tour-detail', exp.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        onViewDetails(exp.id);
                      }}
                      className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 text-xs uppercase tracking-widest font-mono py-3 rounded-sm transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center"
                    >
                      {lang === 'en' ? 'Route Details' : 'Detail Rute'}
                    </a>
                    <button
                      onClick={() => onBookNow(exp.id)}
                      className="bg-gold-600 hover:bg-gold-700 text-white font-bold text-xs uppercase tracking-widest font-mono py-3 rounded-sm transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                    >
                      <span>{lang === 'en' ? 'Book Now' : 'Pesan'}</span>
                      <ArrowRight size={12} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredExperiences.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <Compass className="w-12 h-12 text-stone-300 mx-auto animate-pulse" />
            <h3 className="font-serif text-lg text-stone-900">
              {lang === 'en' ? 'No matching packages found' : 'Tidak ada paket yang cocok'}
            </h3>
            <p className="text-stone-600 text-sm font-sans max-w-sm mx-auto">
              {lang === 'en'
                ? 'No tour packages matched your search query. Please try another keyword or reset the filters.'
                : 'Maaf, paket tour dengan kata kunci tersebut tidak tersedia. Silakan cari dengan istilah lain.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs uppercase tracking-widest font-mono bg-gold-600 hover:bg-gold-700 text-white font-bold px-5 py-2.5 rounded-sm transition-all cursor-pointer"
            >
              {lang === 'en' ? 'Reset Filters' : 'Reset Filter'}
            </button>
          </div>
        )}

        {/* Customize Your Own Tour Banner */}
        {onCustomizeTour && (
          <div className="mt-16 bg-white border border-gold-500/35 rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-gold-700 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                <SlidersHorizontal size={13} />
                <span>{lang === 'en' ? 'Tailor-Made Private Route' : 'Rute Privat Sesuai Keinginan'}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium">
                {lang === 'en'
                  ? 'Want to Customize Your Own Tour Package?'
                  : 'Ingin Customize Paket Tour Pilihan Sendiri?'}
              </h3>
              <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Pick your exact mix of temples, waterfalls, swings, ATV tracks, and dining stops with your preferred car and departure time.'
                  : 'Bebas pilih sendiri kombinasi pura, air terjun, jungle swing, ATV, hingga spa sesuai durasi dan jenis mobil privat yang Anda inginkan.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onCustomizeTour}
              id="btn-catalog-customize-tour"
              className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-7 py-4 rounded-sm transition-all shadow-sm flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95"
            >
              <span>{lang === 'en' ? 'Customize Tour Now' : 'Customize Paket Tour'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
