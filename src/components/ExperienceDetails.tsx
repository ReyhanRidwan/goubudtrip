import React from 'react';
import { MapPin, Star, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { getExperiences, formatPrice } from '../data';
import { useLanguage } from '../i18n';
import TourImageSlider from './TourImageSlider';

interface ExperienceDetailsProps {
  onBookNow: (experienceId: string) => void;
  onViewDetails?: (experienceId: string) => void;
}

export default function ExperienceDetails({ onBookNow, onViewDetails }: ExperienceDetailsProps) {
  const { lang } = useLanguage();
  const signatureExperiences = getExperiences(lang).filter(
    (exp) => exp.category === 'activities'
  );

  return (
    <section id="experiences" className="py-24 bg-[#F3EDE2] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
            {lang === 'en' ? 'Bali Ubud Adventures' : 'Petualangan Bali Ubud'}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-medium tracking-wide">
            {lang === 'en' ? 'Activity' : 'Paket Activity'}
          </h2>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-light">
            {lang === 'en'
              ? 'High-adrenaline Bali Ubud activity packages including ATV quad bike mud tracks, Ayung River white water rafting, Balinese spa, and off-road Polaris jungle buggies with expert local guides.'
              : 'Pilihan paket aktivitas seru dan menantang di Bali Ubud—mulai dari ATV quad bike trek lumpur, arung jeram Sungai Ayung, spa Bali, hingga off-road Polaris jungle buggy bersama pemandu profesional.'}
          </p>
        </div>

        {/* Dynamic Luxury Deck */}
        <div
          className={`grid grid-cols-1 ${
            signatureExperiences.length % 3 === 0
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : signatureExperiences.length >= 4
              ? 'md:grid-cols-2 xl:grid-cols-4'
              : 'lg:grid-cols-2 max-w-5xl mx-auto'
          } gap-6`}
          id="signature-experiences-deck"
        >
          {signatureExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group shadow-sm hover:border-gold-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/10 text-left"
            >
              {/* Card Image */}
              <div
                onClick={() => (onViewDetails ? onViewDetails(exp.id) : onBookNow(exp.id))}
                className="relative h-64 overflow-hidden bg-stone-200 cursor-pointer"
              >
                <TourImageSlider
                  images={exp.images && exp.images.length > 0 ? exp.images : [exp.cardImage]}
                  alt={exp.title}
                  dotsClassName="top-3 right-3"
                  imageClassName="transition-transform duration-750 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none z-10" />
                
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center bg-gold-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                    {exp.tagline}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gold-600">
                      <Star size={14} className="fill-gold-500 text-gold-500" />
                      <span className="font-mono text-xs font-bold text-stone-900">{exp.rating}</span>
                      <span className="text-stone-500 text-[10px]">
                        ({exp.reviewCount} {lang === 'en' ? 'reviews' : 'ulasan'})
                      </span>
                    </div>
                    <div className="flex items-center text-stone-600 text-[11px] font-mono gap-1">
                      <MapPin size={12} className="text-gold-600" />
                      <span className="truncate max-w-[160px]">{exp.location.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3
                      onClick={() => (onViewDetails ? onViewDetails(exp.id) : onBookNow(exp.id))}
                      className="font-serif text-xl md:text-2xl text-stone-900 font-medium group-hover:text-gold-700 transition-colors cursor-pointer"
                    >
                      {exp.title}
                    </h3>
                    <p className="text-stone-600 text-xs md:text-sm font-sans leading-relaxed line-clamp-3">
                      {exp.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-200">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold-700 font-bold flex items-center gap-1.5">
                      <Sparkles size={11} />
                      <span>{lang === 'en' ? 'Package Highlights' : 'Sorotan Utama Paket'}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600 font-sans">
                      {exp.highlights.slice(0, 3).map((high, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-gold-600 mt-0.5 font-bold">•</span>
                          <span className="leading-relaxed line-clamp-2">{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-6 mt-8 border-t border-stone-200 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="block text-[9px] font-mono text-stone-500 tracking-widest uppercase font-semibold">
                        {lang === 'en' ? 'From' : 'Mulai'}
                      </span>
                      <span className="font-mono text-lg md:text-xl font-bold text-gold-700">
                        {formatPrice(exp.pricePerPerson, exp.currency || 'IDR')}
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">
                        {' '}/orang
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onViewDetails && (
                        <button
                          onClick={() => onViewDetails(exp.id)}
                          className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-[10px] uppercase tracking-widest px-3.5 py-3.5 rounded-sm transition-all cursor-pointer"
                        >
                          {lang === 'en' ? 'Details' : 'Detail'}
                        </button>
                      )}
                      <button
                        onClick={() => onBookNow(exp.id)}
                        className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-5 py-3.5 rounded-sm transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
                      >
                        <span>{lang === 'en' ? 'Book Now' : 'Pesan'}</span>
                        <ArrowRight size={12} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footnote comfort seal */}
        <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-600 font-mono mt-12">
          <ShieldCheck size={13} className="text-emerald-700" />
          <span>
            {lang === 'en'
              ? '100% PRIVATE TOUR GUARANTEE — NEVER SHARED WITH OTHER GROUPS'
              : 'GARANSI 100% PRIVATE TOUR TANPA DICAMPUR PESERTA LAIN'}
          </span>
        </div>

      </div>
    </section>
  );
}
