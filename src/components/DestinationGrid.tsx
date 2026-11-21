import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n';

interface CuratedPhotoItem {
  id: string;
  tag: string;
  tagId: string;
  title: string;
  titleId: string;
  image: string;
  cols: string;
  rows: string;
  heightClass: string;
}

export default function DestinationGrid() {
  const { lang } = useLanguage();

  const curatedDestinations: CuratedPhotoItem[] = [
    {
      id: 'bali-swing-spa',
      tag: 'Ubud Swing & Spa',
      tagId: 'Ayunan & Spa Ubud',
      title: 'Ubud Jungle Swing & Balinese Spa',
      titleId: 'Ubud Jungle Swing & Spa Bali',
      image:
        'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164224/dba9a562-fc7e-4657-9927-126b3daec054.png',
      cols: 'lg:col-span-2',
      rows: 'lg:row-span-2',
      heightClass: 'h-[360px] lg:h-[520px]',
    },
    {
      id: 'ubud-iconic-tirta-empul',
      tag: 'Purification & Swing',
      tagId: 'Melukat & Ayunan',
      title: 'Ubud Palace, Tirta Empul & Jungle Swing',
      titleId: 'Puri Ubud, Tirta Empul & Jungle Swing',
      image:
        'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164676/308b013b-5ab7-4c26-af73-b6f076232206.png',
      cols: 'lg:col-span-1',
      rows: 'lg:row-span-1',
      heightClass: 'h-[248px]',
    },
    {
      id: 'ubud-ultimate-cascades',
      tag: 'Culture, Crafts & Cascades',
      tagId: 'Budaya, Kerajinan & Air Terjun',
      title: 'Ubud Waterfall, Culture & Crafts Tour',
      titleId: 'Wisata Air Terjun, Budaya & Kerajinan Ubud',
      image:
        'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173147/00f50a12-ac99-4b5d-acb2-1e0a6766f485.png',
      cols: 'lg:col-span-1',
      rows: 'lg:row-span-1',
      heightClass: 'h-[248px]',
    },
  ];

  return (
    <section
      id="exclusive-destinations"
      className="py-20 px-4 md:px-8 bg-[#F3EDE2] border-t border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-gold-600" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold">
                {lang === 'en' ? 'Bespoke Curations' : 'Kurasi Eksklusif'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-medium tracking-wide">
              {lang === 'en'
                ? 'Explore Bali Ubud’s Iconic Destinations'
                : 'Eksplorasi Destinasi Ikonik Bali Ubud'}
            </h2>
          </div>
          <p className="max-w-md text-stone-600 text-sm font-sans leading-relaxed">
            {lang === 'en'
              ? 'A handpicked visual showcase of Bali Ubud’s iconic jungle swings, sacred Tirta Empul purification springs, and lush hidden waterfalls.'
              : 'Galeri visual pilihan destinasi terbaik Bali Ubud—dari ayunan hutan ikonik, mata air suci Tirta Empul, hingga keindahan air terjun tersembunyi.'}
          </p>
        </div>

        {/* Static Image-Focused Bento Grid (3 Items, Non-slider) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          id="bento-grid-destinations"
        >
          {curatedDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
              className={`${dest.cols} ${dest.rows} ${dest.heightClass} relative rounded-xl overflow-hidden shadow-lg shadow-stone-900/10 border border-stone-200 select-none pointer-events-none`}
            >
              <img
                src={dest.image}
                alt={lang === 'en' ? dest.title : dest.titleId}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-left">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                  {lang === 'en' ? dest.tag : dest.tagId}
                </span>
                <p className="font-serif text-sm md:text-base text-white font-medium leading-snug mt-0.5 line-clamp-1">
                  {lang === 'en' ? dest.title : dest.titleId}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
