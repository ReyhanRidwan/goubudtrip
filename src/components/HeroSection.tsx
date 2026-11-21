import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Experience } from '../types';
import { getHeroExperiences } from '../data';
import { useLanguage } from '../i18n';
import TourImageSlider from './TourImageSlider';

interface HeroSectionProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onExploreClick: (experience: Experience) => void;
  onBookNowClick: () => void;
  onViewDetails?: (experienceId: string) => void;
}

export default function HeroSection({
  activeIndex,
  setActiveIndex,
  onExploreClick,
  onViewDetails,
}: HeroSectionProps) {
  const { lang } = useLanguage();
  const experiences = getHeroExperiences(lang);
  const safeIndex = activeIndex < experiences.length ? activeIndex : 0;
  const currentExp = experiences[safeIndex] || experiences[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const startXRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((safeIndex + 1) % experiences.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex, setActiveIndex, experiences.length]);

  const getCardTag = (exp: Experience) => {
    if (exp.id === 'half-day-bali-temple-waterfall-terraces') {
      return lang === 'en' ? 'Half Day • Temple & Tegalalang' : 'Half Day • Pura & Tegalalang';
    }
    if (exp.id === 'snorkeling-waterfall') {
      return lang === 'en' ? 'Snorkeling & Waterfall' : 'Snorkeling & Air Terjun';
    }
    if (exp.id === 'cooking-class-massage') {
      return lang === 'en' ? 'Cooking & Spa' : 'Kelas Masak & Spa';
    }
    if (exp.id === 'batur-sunrise-tegalalang') {
      return lang === 'en' ? 'Sunrise Trekking' : 'Trekking Matahari Terbit';
    }
    if (exp.id === 'ubud-waterfalls-monkey-market') {
      return lang === 'en' ? 'Waterfalls & Ubud' : 'Air Terjun & Ubud';
    }
    if (exp.id === 'nungnung-sangeh-taman-ayun') {
      return lang === 'en' ? 'Nungnung & Temples' : 'Nungnung & Pura';
    }
    if (exp.id === 'bali-swing-spa-transport') {
      return lang === 'en' ? 'Bali Swing & Spa' : 'Bali Swing & Spa';
    }
    if (exp.id === 'aling-aling-handara-lunch') {
      return lang === 'en' ? 'Aling-Aling & Gate' : 'Aling-Aling & Gate';
    }
    if (exp.id === 'ubud-iconic-tirta-empul-swing') {
      return lang === 'en' ? 'Tirta Empul & Swing' : 'Tirta Empul & Swing';
    }
    if (exp.id === 'water-sports-uluwatu-temple') {
      return lang === 'en' ? 'Water Sports & Uluwatu' : 'Water Sports & Uluwatu';
    }
    if (exp.id === 'bali-atv-quad-lunch-spa') {
      return lang === 'en' ? 'Activity • ATV & Spa' : 'Aktivitas • ATV & Spa';
    }
    if (exp.id === 'white-water-rafting-monkey-forest') {
      return lang === 'en' ? 'Activity • Rafting' : 'Aktivitas • Rafting';
    }
    if (exp.id === 'ubud-atv-jungle-mud-track') {
      return lang === 'en' ? 'Activity • ATV & Mud Track' : 'Aktivitas • ATV & Trek Lumpur';
    }
    if (exp.id === 'ubud-jungle-swing-photo-adventure') {
      return lang === 'en' ? 'Jungle Swing & Photos' : 'Ayunan Hutan & Foto';
    }
    if (exp.id === 'ubud-jungle-buggy-adventure') {
      return lang === 'en' ? 'Activity • Jungle Buggy' : 'Aktivitas • Jungle Buggy';
    }
    if (exp.id === 'ubud-ultimate-culture-crafts-cascades') {
      return lang === 'en' ? 'Culture, Crafts & Cascades' : 'Budaya, Kerajinan & Air Terjun';
    }
    return exp.tagline;
  };

  const getCardTitle = (exp: Experience) => {
    return exp.title;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.parentElement?.getBoundingClientRect().width || 0);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    const timer = setTimeout(updateWidth, 100);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, []);

  const cardWidth = isMobile ? 144 : 192;
  const gap = 16;

  const targetTranslate = containerWidth > 0
    ? (containerWidth / 2) - (safeIndex * (cardWidth + gap) + cardWidth / 2)
    : 0;

  const totalTranslate = targetTranslate + dragOffset;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    stopAutoplay();
    setIsDragging(true);
    startXRef.current = e.clientX;
    hasDraggedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    
    if (Math.abs(deltaX) > 10) {
      hasDraggedRef.current = true;
    }
    
    let finalDelta = deltaX;
    if (safeIndex === 0 && deltaX > 0) {
      finalDelta = deltaX * 0.4;
    } else if (safeIndex === experiences.length - 1 && deltaX < 0) {
      finalDelta = deltaX * 0.4;
    }
    
    setDragOffset(finalDelta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const swipeThreshold = 50;
    if (dragOffset < -swipeThreshold) {
      if (safeIndex < experiences.length - 1) {
        setActiveIndex(safeIndex + 1);
      }
    } else if (dragOffset > swipeThreshold) {
      if (safeIndex > 0) {
        setActiveIndex(safeIndex - 1);
      }
    }
    setDragOffset(0);
    startAutoplay();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setDragOffset(0);
    e.currentTarget.releasePointerCapture(e.pointerId);
    startAutoplay();
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('exclusive-destinations') || document.getElementById('experiences');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatHighlightedText = (text: string) => {
    const highlights = [
      'Ubud',
      'Tegalalang',
      'Tirta Empul',
      'Monkey Forest',
      'Ayung River',
      'Balinese Spa',
      'jungle swings',
      'ATV quad bike',
      'air terjun',
      'Terasering Sawah',
    ];
    const pattern = new RegExp(`(${highlights.join('|')})`, 'g');
    const parts = text.split(pattern);
    return parts.map((part, index) => {
      if (highlights.includes(part)) {
        return (
          <span key={index} className="text-gold-300 font-semibold italic">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      id="hero-top"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-stone-950"
    >
      {/* Background Images with Cross-fade Animation & Subtle Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExp.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {currentExp.images && currentExp.images.length > 1 ? (
              <TourImageSlider
                images={currentExp.images}
                alt={currentExp.tagline}
                variant="hero"
                autoPlayInterval={2600}
                loading="eager"
                hideControls
              />
            ) : (
              <img
                src={currentExp.bgImage}
                alt={currentExp.tagline}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            {/* Subtle dark tint so the background photo stays clear and vivid without white haze */}
            <div className="absolute inset-0 bg-stone-950/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/55 via-stone-950/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Eager preloading */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          {experiences.map((exp, idx) => (
            idx !== safeIndex && (
              <img
                key={exp.id}
                src={exp.bgImage}
                alt=""
                loading="eager"
                referrerPolicy="no-referrer"
              />
            )
          ))}
        </div>
      </div>

      {/* Main Content Arena */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col items-start text-left" id="hero-text-block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentExp.id}-${lang}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Dynamic Category/Tagline */}
                <div className="flex items-center space-x-3">
                  <span className="h-[1.5px] w-5 bg-gold-400" />
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-gold-300 font-bold drop-shadow-xs">
                    {currentExp.tagline}
                  </span>
                </div>

                {/* Hero Title */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-white font-medium tracking-wide drop-shadow-md">
                  {currentExp.title}
                </h1>

                {/* Hero Description */}
                <p className="font-sans text-xs md:text-sm text-stone-100 leading-relaxed max-w-sm font-normal drop-shadow-sm">
                  {formatHighlightedText(currentExp.shortDesc)}
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                  <button
                    onClick={() => onExploreClick(currentExp)}
                    id="btn-start-adventure"
                    className="bg-gold-600 hover:bg-gold-500 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-3.5 px-8 transition-all duration-300 rounded-sm active:scale-95 shadow-lg text-center cursor-pointer"
                  >
                    {lang === 'en' ? 'Book Now' : 'Booking Sekarang'}
                  </button>
                  {onViewDetails && (
                    <button
                      onClick={() => onViewDetails(currentExp.id)}
                      id="btn-hero-package-details"
                      className="border border-white/55 hover:border-gold-400 bg-stone-950/35 hover:bg-stone-950/60 backdrop-blur-xs text-white hover:text-gold-300 font-sans text-xs uppercase tracking-[0.2em] font-semibold py-3.5 px-6 transition-all duration-300 rounded-sm text-center cursor-pointer shadow-sm"
                    >
                      {lang === 'en' ? 'Package Details' : 'Detail Paket'}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Interactive Slider Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-4" id="hero-slider-block">
            <div className="flex items-center justify-between pb-2 border-b border-white/25 max-w-md ml-auto mr-0 w-full">
              <span className="font-mono text-[10px] text-stone-100 uppercase tracking-widest font-semibold drop-shadow-xs">
                {lang === 'en' ? 'Curated Ubud Tours' : 'Paket Ubud Terkurasi'}
              </span>
              <span className="font-mono text-[10px] text-gold-300 font-bold tracking-widest drop-shadow-xs">
                {String(safeIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
              </span>
            </div>

            <div className="w-full max-w-md md:max-w-lg xl:max-w-xl lg:ml-auto overflow-hidden relative pb-4 pt-6" id="hero-slider-container">
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                style={{
                  transform: `translateX(${totalTranslate}px)`,
                  transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  touchAction: 'none',
                }}
                className={`flex items-end justify-start gap-4 select-none ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                {experiences.map((exp, index) => {
                  const isActive = index === safeIndex;

                  return (
                    <button
                      key={exp.id}
                      onClick={(e) => {
                        if (hasDraggedRef.current) {
                          e.preventDefault();
                          return;
                        }
                        setActiveIndex(index);
                      }}
                      id={`hero-card-${exp.id}`}
                      className={`relative flex-shrink-0 w-36 md:w-48 h-[210px] md:h-[270px] rounded-sm overflow-hidden text-left transition-all duration-500 transform select-none cursor-pointer group ${
                        isActive
                          ? 'ring-2 ring-gold-600 scale-102 -translate-y-2 z-20 shadow-xl shadow-stone-900/25'
                          : 'opacity-80 hover:opacity-100 hover:-translate-y-1 z-10 scale-95 shadow-md shadow-stone-900/15'
                      }`}
                    >
                      <img
                        src={exp.cardImage}
                        alt={exp.tagline}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
                      <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-gold-300 font-bold mb-1">
                          {getCardTag(exp)}
                        </p>
                        <h3 className="font-serif text-base md:text-lg text-white font-medium tracking-wide leading-snug">
                          {getCardTitle(exp)}
                        </h3>
                        {isActive && (
                          <span className="font-mono text-[8px] text-gold-300 uppercase tracking-wider mt-1 flex items-center space-x-1">
                            <span>{lang === 'en' ? 'Active Experience' : 'Pilihan Aktif'}</span>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 w-full flex justify-center pb-8">
        <button
          onClick={handleScrollDown}
          id="btn-scroll-down"
          className="flex flex-col items-center group cursor-pointer"
          aria-label={lang === 'en' ? 'Scroll to experiences' : 'Gulir ke bawah'}
        >
          <div className="w-6 h-10 border border-white/45 bg-stone-950/25 backdrop-blur-xs rounded-full flex justify-center items-start p-1 hover:border-gold-400 transition-colors duration-300">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown size={12} className="text-white/85 group-hover:text-gold-300 transition-colors" />
            </motion.div>
          </div>
        </button>
      </div>
    </section>
  );
}
