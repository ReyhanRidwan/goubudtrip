import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, ArrowRight, X, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n';

interface TravelArticle {
  id: string;
  category: string;
  categoryId: string;
  readTime: string;
  readTimeId: string;
  publishedDate: string;
  title: string;
  titleId: string;
  excerpt: string;
  excerptId: string;
  image: string;
  paragraphs: string[];
  paragraphsId: string[];
}

const TRAVEL_ARTICLES: TravelArticle[] = [
  {
    id: 'ancient-village-temples-ubud',
    category: 'Culture & Heritage',
    categoryId: 'Budaya & Sejarah',
    readTime: '4 min read',
    readTimeId: '4 menit baca',
    publishedDate: 'Ubud Travel Guide',
    title: 'Inside Ubud’s 944 AD Village Temples & Daily Balinese Traditions',
    titleId: 'Menjelajahi Pura Desa Kuno Bali Tahun 944 & Tradisi Masyarakat Ubud',
    excerpt:
      'Step away from busy streets into century-old stone courtyards where daily offerings, Gamelan rehearsals, and rural hospitality remain part of everyday life.',
    excerptId:
      'Keluar sejenak dari keramaian menuju pura desa bersejarah tempat tradisi canang sari, budaya gotong royong, dan keramahan lokal tetap terjaga.',
    image:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164676/308b013b-5ab7-4c26-af73-b6f076232206.png',
    paragraphs: [
      'Nestled among quiet Ubud villages stand sanctuaries dating back more than a millennium—including ancient village temples recorded as early as 944 AD. Visiting with a knowledgeable Balinese local host transforms carved mossy gates into living stories of ancestors, community harmony (Tri Hita Karana), and seasonal ceremonies.',
      'Before entering any sacred temple grounds, modest attire with a traditional sarong and sash is respected. Morning hours offer the most tranquil atmosphere, often accompanied by locals placing fresh flower offerings (Canang Sari) at family and village shrines.',
      'Pairing a morning village temple visit with nearby scenic nature spots makes an unforgettable half-day itinerary—especially if you want meaningful cultural insight without rushing.',
    ],
    paragraphsId: [
      'Di balik jalanan pedesaan Ubud yang tenang, berdiri pura-pura kuno berusia lebih dari seribu tahun—termasuk pura desa bersejarah yang diperkirakan dibangun sekitar tahun 944 Masehi. Berkunjung bersama pemandu lokal Bali membuka makna mendalam di balik setiap ukiran batu dan filosofi harmonis Tri Hita Karana.',
      'Saat memasuki area suci pura, wisatawan mengenakan kain sarung dan selendang tradisional sebagai bentuk penghormatan budaya. Pagi hari menjadi waktu terbaik karena suasana masih teduh dan masyarakat setempat rutin menghaturkan persembahan Canang Sari.',
      'Mengombinasikan kunjungan pura desa bersejarah dengan panorama sawah dan air terjun menjadi rute Half Day Tour yang ideal bagi pelancong yang menginginkan pengalaman autentik dalam waktu efisien.',
    ],
  },
  {
    id: 'tegalalang-subak-guide',
    category: 'Nature & Countryside',
    categoryId: 'Alam & Pedesaan',
    readTime: '3 min read',
    readTimeId: '3 menit baca',
    publishedDate: 'Ubud Landscape Guide',
    title: 'Subak Harmony at Tegalalang Rice Terraces: When to Visit & What to See',
    titleId: 'Keajaiban Sistem Subak di Terasering Sawah Tegalalang Ubud',
    excerpt:
      'Discover how Bali’s UNESCO-recognized traditional irrigation system shapes the emerald ridges north of Ubud—plus local tips for golden morning light.',
    excerptId:
      'Mengenal sistem pengairan tradisional Subak warisan budaya dunia yang membentuk lanskap terasering hijau memukau di utara Ubud.',
    image:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795173152/9bb672ca-3392-41be-97cc-fd736a8274e4.png',
    paragraphs: [
      'Just twenty minutes north of central Ubud, Tegalalang’s emerald amphitheater showcases Bali’s centuries-old Subak cooperative water irrigation system. Lush coconut palms frame steep terraced paddies fed by natural mountain streams.',
      'Arriving between 8:00 AM and 10:30 AM brings soft sunlight cutting through palm mist and cooler walking trails across the ridge paths. Along the valley walkways, you can chat with farmers tending rice plots and enjoy panoramic café overlooks.',
      'Our private local hosts know quiet vantage points away from crowded roadside stops, giving you time to breathe in fresh countryside air and capture crisp photos.',
    ],
    paragraphsId: [
      'Hanya sekitar dua puluh menit ke utara dari pusat Ubud, lembah hijau Tegalalang memperlihatkan kejeniusan sistem irigasi tradisional Subak yang telah dijalankan petani Bali selama berabad-abad. Pohon kelapa menjulang mengiringi lekuk pematang sawah bertingkat.',
      'Berkunjung antara pukul 08.00 hingga 10.30 pagi menghadirkan pencahayaan matahari terbaik yang menembus kabut tipis pagi serta udara yang masih sejuk saat menyusuri jalur setapak.',
      'Host lokal kami selalu siap mengantar ke titik panorama yang lebih tenang sehingga Anda bisa menikmati kedamaian pedesaan Bali sekaligus mengabadikan foto terbaik.',
    ],
  },
  {
    id: 'ubud-waterfalls-etiquette',
    category: 'Waterfall Trail',
    categoryId: 'Wisata Air Terjun',
    readTime: '5 min read',
    readTimeId: '5 menit baca',
    publishedDate: 'Waterfall Tips',
    title: 'Chasing Ubud’s Best Waterfalls: Tegenungan, Tibumana & Kanto Lampo',
    titleId: 'Panduan Wisata Air Terjun Terbaik Ubud: Tegenungan, Tibumana & Kanto Lampo',
    excerpt:
      'Compare accessibility, photo angles, and the ideal timing to enjoy Ubud’s iconic jungle cascades comfortably with a private local driver.',
    excerptId:
      'Simak perbandingan akses, sudut foto terbaik, dan waktu kunjungan paling nyaman untuk menikmati tiga air terjun unggulan di sekitar Ubud.',
    image:
      'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png',
    paragraphs: [
      'Ubud and neighboring Gianyar are blessed with dramatic volcanic river gorges where fresh spring water plunges through tropical canopy. Tegenungan Waterfall stands out for its grand curtain of mist and sweeping canyon views ideal for travelers of all ages.',
      'Further tucked among palm groves, Tibumana rewards morning visitors with a serene emerald plunge pool, while Kanto Lampo invites fun stepped-rock photos right beneath cooling cascades.',
      'Pack grippy sandals, quick-dry attire, and a camera pouch—and travel early with your private GoUbudTrip host to arrive refreshed before peak midday heat.',
    ],
    paragraphsId: [
      'Kawasan Ubud dan Gianyar diberkahi aliran sungai alami di tengah hutan tropis yang membentuk air terjun memesona. Air Terjun Tegenungan menjadi favorit karena debit airnya yang megah dan pemandangan lembah hijau yang mudah diakses.',
      'Sementara itu, Tibumana menghadirkan suasana tenang dikelilingi tebing hijau, dan Kanto Lampo terkenal dengan undakan batu alaminya yang sangat fotogenik.',
      'Kenakan sandal anti selip, siapkan pakaian ganti, dan berangkat lebih pagi bersama host privat GoUbudTrip agar kunjungan Anda terasa lebih leluasa dan nyaman.',
    ],
  },
];

export default function TravelArticlesSection() {
  const { lang } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<TravelArticle | null>(null);

  return (
    <section
      id="bali-travel-articles"
      className="py-20 px-4 md:px-8 bg-[#F3EDE2] border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-gold-700" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-gold-700 font-bold">
                {lang === 'en' ? 'Bali Travel Journal' : 'Artikel Wisata Bali'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-medium tracking-wide">
              {lang === 'en'
                ? 'Stories, Culture & Travel Tips Around Ubud'
                : 'Inspirasi, Budaya & Tips Wisata di Bali Ubud'}
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500">
            {lang === 'en' ? '3 Curated Articles' : '3 Artikel Pilihan'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAVEL_ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-gold-500/60 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={lang === 'en' ? article.title : article.titleId}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-950/60 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-stone-900 font-mono text-[10px] uppercase tracking-wider font-bold rounded-sm shadow-sm">
                  {lang === 'en' ? article.category : article.categoryId}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-3 text-[11px] font-mono text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-gold-600" />
                    {article.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-gold-600" />
                    {lang === 'en' ? article.readTime : article.readTimeId}
                  </span>
                </div>

                <h3 className="font-serif text-lg md:text-xl text-stone-900 font-semibold leading-snug group-hover:text-gold-700 transition-colors">
                  {lang === 'en' ? article.title : article.titleId}
                </h3>

                <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed line-clamp-3 flex-grow">
                  {lang === 'en' ? article.excerpt : article.excerptId}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-gold-700">
                  <span>{lang === 'en' ? 'Read Full Article' : 'Baca Selengkapnya'}</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FAF7F2] border border-stone-200 rounded-2xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-stone-800 hover:bg-gold-600 hover:text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="h-56 sm:h-64 overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={lang === 'en' ? selectedArticle.title : selectedArticle.titleId}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold">
                  <span>{lang === 'en' ? selectedArticle.category : selectedArticle.categoryId}</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-500">
                    {lang === 'en' ? selectedArticle.readTime : selectedArticle.readTimeId}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold leading-snug">
                  {lang === 'en' ? selectedArticle.title : selectedArticle.titleId}
                </h3>

                <div className="space-y-4 font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
                  {(lang === 'en' ? selectedArticle.paragraphs : selectedArticle.paragraphsId).map(
                    (para, index) => (
                      <p key={index}>{para}</p>
                    )
                  )}
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-gold-600 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close Article' : 'Tutup Artikel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
