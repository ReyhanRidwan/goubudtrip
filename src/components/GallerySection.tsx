import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { getGalleryPhotos } from '../data';
import { useLanguage } from '../i18n';

export default function GallerySection() {
  const { lang } = useLanguage();
  const photos = getGalleryPhotos(lang);
  const [filter, setFilter] = useState<'all' | 'volcano' | 'ocean' | 'jungle'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = photos.filter(
    (photo) => filter === 'all' || photo.category === filter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIdx = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(prevIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % filteredPhotos.length;
    setLightboxIndex(nextIdx);
  };

  const getCategoryLabel = (cat: 'all' | 'volcano' | 'ocean' | 'jungle') => {
    if (lang === 'en') {
      return cat === 'all' ? 'All Snapshots' : `${cat}s`;
    }
    if (cat === 'all') return 'Semua Foto';
    if (cat === 'volcano') return 'Gunung';
    if (cat === 'ocean') return 'Laut';
    return 'Hutan';
  };

  return (
    <section id="gallery" className="py-24 pt-28 bg-[#F3EDE2] border-t border-stone-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-4 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
              {lang === 'en' ? 'Visual Narrative' : 'Narasi Visual'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-wide">
              {lang === 'en' ? 'Capturing Divine Moments' : 'Mengabadikan Momen Istimewa'}
            </h2>
            <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
              {lang === 'en'
                ? 'Explore high-fidelity photographs from our bespoke private charters—rugged volcanic horizons, turquoise reefs, and Ubud’s misty valleys.'
                : 'Jelajahi dokumentasi berkelas dari perjalanan privat kami: puncak gunung berapi, perairan biru jernih, dan lembah berkabut di Ubud.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 pb-px" id="gallery-filters">
            {(['all', 'volcano', 'ocean', 'jungle'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`py-2 px-5 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all border cursor-pointer rounded-sm ${
                  filter === cat
                    ? 'bg-gold-600 border-gold-600 text-white font-bold shadow-sm'
                    : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-gold-500/40'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Photogrid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] bg-stone-200 border border-stone-200 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:shadow-stone-900/15 hover:border-gold-500/40 transition-all duration-500"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-300 font-bold mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif text-base text-white font-medium tracking-wide leading-tight">
                  {photo.title}
                </h3>
                
                <div className="mt-3 flex items-center space-x-1 text-[10px] uppercase font-mono tracking-widest text-gold-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye size={12} className="text-gold-300" />
                  <span>{lang === 'en' ? 'Enlarge Snapshot' : 'Perbesar Foto'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="py-16 text-center text-stone-500 font-mono text-sm space-y-2">
            <ImageIcon size={32} className="mx-auto text-stone-400" />
            <p>{lang === 'en' ? 'No photos matched this category yet.' : 'Belum ada foto di kategori ini.'}</p>
          </div>
        )}

        {/* Lightbox overlay */}
        {lightboxIndex !== null && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fade-in select-none"
            id="gallery-lightbox"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-stone-300 hover:text-gold-300 transition-colors p-2 z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-stone-900/80 border border-white/20 hover:border-gold-400 text-white p-3 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center">
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
                className="object-contain max-h-[75vh] w-auto border border-white/15 shadow-2xl"
              />
              <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-300 font-bold mb-1 block">
                  {filteredPhotos[lightboxIndex].category} {lang === 'en' ? 'snapshot' : 'galeri'}
                </span>
                <h4 className="font-serif text-lg text-white font-medium tracking-wide">
                  {filteredPhotos[lightboxIndex].title}
                </h4>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-stone-900/80 border border-white/20 hover:border-gold-400 text-white p-3 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
