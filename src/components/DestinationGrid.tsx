import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, HeartHandshake, Landmark } from 'lucide-react';
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

interface DestinationGridProps {
  onLearnMoreAbout?: () => void;
}

export default function DestinationGrid({ onLearnMoreAbout }: DestinationGridProps) {
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

  const pillars = [
    {
      icon: Landmark,
      title: lang === 'en' ? '100% Local Balinese Hosts' : '100% Host Asli Bali',
      desc:
        lang === 'en'
          ? 'Born and raised in Ubud, sharing deep cultural knowledge'
          : 'Lahir dan besar di Ubud dengan pemahaman budaya yang mendalam',
    },
    {
      icon: Compass,
      title: lang === 'en' ? 'Tailored Private Itineraries' : 'Itinerary Privat Sesuai Keinginan',
      desc:
        lang === 'en'
          ? 'Custom-crafted journeys built around your travel list'
          : 'Rute perjalanan fleksibel yang disesuaikan dengan daftar wisata Anda',
    },
    {
      icon: HeartHandshake,
      title: lang === 'en' ? 'Warm & Sincere Hospitality' : 'Pelayanan Hangat & Tulus',
      desc:
        lang === 'en'
          ? 'Authentic care and joyful companionship throughout Bali'
          : 'Keramahan penuh senyum dan pendampingan tulus di seluruh Bali',
    },
  ];

  return (
    <section
      id="exclusive-destinations"
      className="py-20 px-4 md:px-8 bg-[#F3EDE2] border-t border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Main Headline */}
        <div className="mb-10 pb-8 border-b border-stone-300/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-600" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold">
              {lang === 'en'
                ? 'Welcome to Wonderful Bali Island, Indonesia'
                : 'Selamat Datang di Pulau Bali, Indonesia'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-medium tracking-wide">
            {lang === 'en'
              ? 'Let’s Explore the Beauty of Bali With Us!'
              : 'Mari Jelajahi Keindahan Bali Bersama Kami!'}
          </h2>
        </div>

        {/* Two-Column Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-14">
          {/* Left Column: Story & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="block font-mono text-xs uppercase tracking-[0.22em] text-gold-700 font-semibold">
              {lang === 'en' ? 'Authentic Balinese Hospitality' : 'Keramahan Autentik Bali'}
            </span>

            <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium leading-tight">
              {lang === 'en'
                ? 'Experience Bali Through the Eyes of a Local'
                : 'Nikmati Keindahan Bali dari Sudut Pandang Warga Lokal'}
            </h3>

            <p className="text-stone-600 text-sm md:text-base font-sans leading-relaxed max-w-2xl">
              {lang === 'en'
                ? 'Welcome to wonderful Bali. Go Ubud Trip is a local tour company based in Ubud village, offering private driver and guide services tailored to your travel desires. Discover authentic Balinese culture, hidden gems, and natural beauty with friendly, experienced local hosts dedicated to your happiness and memorable experiences.'
                : 'Selamat datang di Pulau Bali yang menakjubkan. Go Ubud Trip adalah perusahaan tur lokal yang berbasis di Desa Ubud, menawarkan layanan driver privat dan pemandu wisata sesuai keinginan liburan Anda. Temukan budaya autentik Bali, permata tersembunyi, dan keindahan alam bersama host lokal yang ramah serta tulus mengutamakan kebahagiaan perjalanan Anda.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMoreAbout}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-gold-600/60 bg-transparent hover:bg-gold-600 text-stone-800 hover:text-white font-sans text-sm font-medium transition-all duration-300 cursor-pointer group"
              >
                <span>{lang === 'en' ? 'Learn More About Us' : 'Pelajari Tentang Kami'}</span>
                <ArrowRight
                  size={15}
                  className="text-gold-700 group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Hospitality Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 divide-y divide-stone-300/70"
          >
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 ${
                    idx === 0 ? 'pb-5' : idx === pillars.length - 1 ? 'pt-5' : 'py-5'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-gold-500/10 border border-gold-600/25 flex items-center justify-center shrink-0 text-gold-700 mt-0.5">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-base font-semibold text-stone-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
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
