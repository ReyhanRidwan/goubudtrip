import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TourImageSliderProps {
  images: string[];
  alt: string;
  variant?: 'hero' | 'card';
  className?: string;
  imageClassName?: string;
  dotsClassName?: string;
  autoPlayInterval?: number;
  loading?: 'eager' | 'lazy';
  hideControls?: boolean;
}

export default function TourImageSlider({
  images,
  alt,
  variant = 'card',
  className = '',
  imageClassName = '',
  dotsClassName,
  autoPlayInterval = 4500,
  loading = 'lazy',
  hideControls = false,
}: TourImageSliderProps) {
  const validImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = validImages.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, [validImages.join('|')]);

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [count, isPaused, autoPlayInterval]);

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img
          src={validImages[0]}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {validImages.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={`${alt} - ${idx + 1}`}
          loading={idx === 0 ? loading : 'eager'}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
          } ${imageClassName}`}
        />
      ))}

      {!hideControls && (
        <>
          {/* Prev / Next Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className={`absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full bg-stone-950/65 hover:bg-stone-950 border border-white/25 hover:border-gold-400 text-white hover:text-gold-300 backdrop-blur-md transition-all cursor-pointer ${
              variant === 'hero' ? 'w-10 h-10 left-4 md:left-6' : 'w-7 h-7 opacity-90 group-hover:opacity-100'
            }`}
          >
            <ChevronLeft size={variant === 'hero' ? 18 : 14} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full bg-stone-950/65 hover:bg-stone-950 border border-white/25 hover:border-gold-400 text-white hover:text-gold-300 backdrop-blur-md transition-all cursor-pointer ${
              variant === 'hero' ? 'w-10 h-10 right-4 md:right-6' : 'w-7 h-7 opacity-90 group-hover:opacity-100'
            }`}
          >
            <ChevronRight size={variant === 'hero' ? 18 : 14} />
          </button>

          {/* Pagination Dots */}
          <div
            className={`absolute z-20 flex items-center gap-1.5 bg-stone-950/65 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 ${
              dotsClassName ||
              (variant === 'hero'
                ? 'bottom-5 md:bottom-7 left-1/2 -translate-x-1/2'
                : 'bottom-3 left-1/2 -translate-x-1/2')
            }`}
          >
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-5 bg-gold-400'
                    : 'w-1.5 bg-white/50 hover:bg-white/85'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
