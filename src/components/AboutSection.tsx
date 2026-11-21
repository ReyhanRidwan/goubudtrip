import React from 'react';
import { ShieldCheck, Compass, Heart } from 'lucide-react';
import { BRAND, useLanguage } from '../i18n';

export default function AboutSection() {
  const { lang } = useLanguage();

  const stats =
    lang === 'en'
      ? [
          { label: 'CERTIFIED PRO GUIDES', value: '100%' },
          { label: 'ANNUAL VIP GUESTS', value: '5,000+' },
          { label: 'GUEST SATISFACTION', value: '4.95/5' },
          { label: 'PRIVATE LUXURY FLEET', value: '25+' },
        ]
      : [
          { label: 'PRO GUIDE BERSERTIFIKAT', value: '100%' },
          { label: 'TAMU VIP TAHUNAN', value: '5,000+' },
          { label: 'KEPUASAN MAKSIMAL', value: '4.95/5' },
          { label: 'ARMADA LUXURY PRIBADI', value: '25+' },
        ];

  return (
    <div className="pt-28 pb-24 bg-[#FAF7F2] text-stone-900 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl space-y-4 mb-20 text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold bg-gold-500/10 px-4 py-2 border border-gold-500/25 rounded-full inline-block">
            {lang === 'en' ? 'Our Noble Story' : 'Kisah Kami'}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 font-medium tracking-tight leading-tight">
            {lang === 'en'
              ? 'Pioneers of Bespoke Private Bali Travel'
              : 'Pelopor Layanan Tour Privat Luxury di Bali'}
          </h1>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-normal">
            {lang === 'en'
              ? `Founded with a vision to redefine luxury exploration across Ubud and Bali, ${BRAND.name} curates deeply personal, safe, and effortless island journeys tailored to your highest expectations.`
              : `Didirikan dengan visi untuk mendefinisikan kembali kemewahan perjalanan di Ubud dan seluruh Bali, ${BRAND.name} menghadirkan pengalaman liburan privat yang eksklusif, aman, dan dirancang khusus untuk Anda.`}
          </p>
        </div>

        {/* Brand Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24" id="about-brand-grid">
          <div className="space-y-8 text-left">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium tracking-wide">
              {lang === 'en'
                ? 'Our Mission: Crafting Unhurried Island Moments'
                : 'Misi Kami: Menghadirkan Momen Liburan Tanpa Batas'}
            </h2>
            
            <p className="text-stone-600 text-sm leading-relaxed">
              {lang === 'en'
                ? `At ${BRAND.name}, we believe every moment of your Bali escape is precious. We reject crowded group tours and rigid timetables. Every itinerary we design is 100% private, flexible, and hosted by fluent local professionals.`
                : `Di ${BRAND.name}, kami percaya bahwa setiap detik perjalanan Anda di Bali sangat berharga. Kami menolak paket wisata massal yang penuh sesak. Setiap itinerary kami bersifat 100% privat, fleksibel, dan didampingi pemandu lokal profesional.`}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-500/10 border border-gold-500/25 text-gold-700 rounded-sm mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-900 font-medium">
                    {lang === 'en' ? 'Safety & Comfort First' : 'Prioritas Keamanan & Kenyamanan'}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mt-1">
                    {lang === 'en'
                      ? 'Every vehicle in our fleet undergoes rigorous routine inspections, while our adventure guides and marine instructors hold recognized safety certifications.'
                      : 'Semua armada kami melalui pemeriksaan keamanan berkala standar tinggi, dan pemandu petualangan kami memiliki lisensi keselamatan resmi.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-500/10 border border-gold-500/25 text-gold-700 rounded-sm mt-1">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-900 font-medium">
                    {lang === 'en' ? 'Personalized Exploration' : 'Eksplorasi yang Dipersonalisasi'}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mt-1">
                    {lang === 'en'
                      ? 'Your itinerary moves at your pace. Adjust pickup times, dining preferences, or scenic stops spontaneously throughout your day.'
                      : 'Rencana perjalanan bersifat santai dan fleksibel. Anda dapat meminta penyesuaian kuliner, waktu penjemputan, atau rute tambahan kapan saja.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-500/10 border border-gold-500/25 text-gold-700 rounded-sm mt-1">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-900 font-medium">
                    {lang === 'en' ? 'Positive Local Impact' : 'Berdampak pada Komunitas Lokal'}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mt-1">
                    {lang === 'en'
                      ? 'Every booking supports marine reef conservation in Nusa Penida and fair livelihoods for Balinese village guides across Ubud and Kintamani.'
                      : 'Sebagian hasil perjalanan Anda disalurkan untuk pelestarian terumbu karang di Nusa Penida serta kesejahteraan komunitas pemandu lokal di Ubud dan Kintamani.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative rounded-lg overflow-hidden border border-stone-200 h-[480px] group shadow-xl shadow-stone-900/10" id="about-visual-panel">
            <img
              src="/bali_jungle_bg_1783528784335.jpg"
              alt={`${BRAND.name} Hospitality`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-left space-y-2">
              <span className="font-mono text-[10px] text-gold-300 font-bold uppercase tracking-widest">
                {lang === 'en' ? 'Luxury Hospitality' : 'Hospitality Mewah'}
              </span>
              <h3 className="font-serif text-2xl text-white font-medium">
                {lang === 'en' ? 'Behind Every Effortless Day' : 'Di Balik Layar Kemewahan'}
              </h3>
              <p className="text-stone-200 text-xs leading-relaxed">
                {lang === 'en'
                  ? 'Our travel designers, VIP chauffeurs, photographers, and concierge hosts are available around the clock to welcome you to Bali.'
                  : 'Tim perancang perjalanan, supir VIP, fotografer profesional, dan pramutamu kami siap menyambut kedatangan Anda 24 jam sehari.'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white border border-stone-200 p-8 rounded-lg text-center shadow-sm" id="about-stats-strip">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="font-mono text-2xl md:text-4xl text-gold-700 font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="font-mono text-[9px] md:text-[11px] text-stone-500 tracking-wider uppercase font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
