import React from 'react';
import { ShieldCheck, Sparkles, ChefHat, Camera, CalendarDays, Award } from 'lucide-react';
import { BRAND, useLanguage } from '../i18n';

interface WhyUsSectionProps {
  onNavigateToContact?: () => void;
}

export default function WhyUsSection({ onNavigateToContact }: WhyUsSectionProps) {
  const { lang } = useLanguage();

  const points =
    lang === 'en'
      ? [
          {
            icon: <Award className="w-6 h-6 text-gold-600" />,
            title: '100% Private VIP Service',
            desc: 'Never shared with strangers. Every vehicle, boat, guide, and schedule is reserved exclusively for your private group.',
          },
          {
            icon: <CalendarDays className="w-6 h-6 text-gold-600" />,
            title: 'Flexible Schedule Guarantee',
            desc: 'Reschedule your tour date free of charge in the event of severe weather, flight delays, or sudden itinerary changes.',
          },
          {
            icon: <ChefHat className="w-6 h-6 text-gold-600" />,
            title: 'Curated 5-Star Culinary Stops',
            desc: 'From grilled Jimbaran lobster by candlelight to organic Ubud terrace dining—vegan, halal, and allergy-friendly menus always available.',
          },
          {
            icon: <Camera className="w-6 h-6 text-gold-600" />,
            title: 'Pro Photography & 4K Drone Options',
            desc: 'Elevate your memories with optional private DSLR travel photographers and cinematic 4K aerial drone coverage.',
          },
          {
            icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
            title: 'International Safety Standards',
            desc: 'All vehicles, speedboats, yachts, and adventure gear are thoroughly inspected and backed by comprehensive coverage.',
          },
          {
            icon: <Sparkles className="w-6 h-6 text-gold-600" />,
            title: 'Licensed Local Experts',
            desc: 'More than drivers—our hosts are certified storytellers, cultural insiders, and fluent English-speaking Bali specialists.',
          },
        ]
      : [
          {
            icon: <Award className="w-6 h-6 text-gold-600" />,
            title: '100% Layanan Privat VIP',
            desc: 'Tidak ada rombongan lain. Seluruh kendaraan, pemandu, dan akomodasi selama perjalanan adalah hak eksklusif Anda demi privasi mutlak.',
          },
          {
            icon: <CalendarDays className="w-6 h-6 text-gold-600" />,
            title: 'Garansi Fleksibilitas Jadwal',
            desc: 'Ubah tanggal perjalanan atau jadwal tur Anda secara gratis jika terjadi cuaca buruk, kendala penerbangan, atau perubahan rencana mendadak.',
          },
          {
            icon: <ChefHat className="w-6 h-6 text-gold-600" />,
            title: 'Kurasi Kuliner Kelas Bintang 5',
            desc: 'Mulai dari lobster panggang segar di tepi pantai Jimbaran hingga restoran organik di Ubud. Pilihan vegan, halal, dan bebas alergi selalu tersedia.',
          },
          {
            icon: <Camera className="w-6 h-6 text-gold-600" />,
            title: 'Dokumentasi Profesional Eksklusif',
            desc: 'Opsi add-on fotografer handal dengan kamera DSLR profesional dan drone 4K siap mengabadikan petualangan emas Anda.',
          },
          {
            icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
            title: 'Keamanan Standar Internasional',
            desc: 'Semua armada mobil, speed boat, yacht, dan perlengkapan aktivitas tersertifikasi kelayakan serta dilengkapi asuransi perjalanan penuh.',
          },
          {
            icon: <Sparkles className="w-6 h-6 text-gold-600" />,
            title: 'Pemandu Lokal Berlisensi Resmi',
            desc: 'Pemandu kami bukan sekadar supir biasa—mereka adalah ahli sejarah lokal dan pengamat budaya Bali yang fasih berbahasa Inggris.',
          },
        ];

  return (
    <div className="pt-28 pb-24 bg-[#F3EDE2] text-stone-900 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="max-w-3xl space-y-4 mb-20 text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold bg-gold-500/10 px-4 py-2 border border-gold-500/25 rounded-full inline-block">
            {lang === 'en' ? 'Elite Advantages' : 'Keunggulan Utama'}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 font-medium tracking-tight leading-tight">
            {lang === 'en' ? 'A Higher Standard of Bali Travel' : 'Standar Pelayanan yang Berbeda'}
          </h1>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-normal">
            {lang === 'en'
              ? `Why choose ${BRAND.name}? We do not merely arrange tours—we craft timeless, stress-free private island journeys tailored around you.`
              : `Mengapa memilih ${BRAND.name}? Kami tidak sekadar merancang tur, melainkan menciptakan karya seni petualangan pribadi yang tak lekang oleh waktu.`}
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="whyus-cards-grid">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border border-stone-200 hover:border-gold-500/40 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-stone-900/10 group flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                <div className="p-3 bg-gold-500/10 border border-gold-500/25 rounded-sm w-fit transition-transform duration-500 group-hover:scale-105">
                  {point.icon}
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-medium tracking-wide">
                  {point.title}
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>

              <div className="w-full h-[1px] bg-stone-200 mt-6 group-hover:bg-gold-500/40 transition-colors" />
            </div>
          ))}
        </div>

        {/* Feature Highlight Block */}
        <div className="mt-20 bg-white border border-stone-200 rounded-xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm" id="whyus-highlight-block">
          <div className="lg:col-span-8 text-left space-y-4">
            <h3 className="font-serif text-2xl lg:text-3xl text-stone-900 font-medium tracking-wide">
              {lang === 'en'
                ? 'Need a Custom Multi-Day Bali Itinerary?'
                : 'Butuh Rencana Perjalanan Custom di Luar Paket?'}
            </h3>
            <p className="text-stone-600 text-xs md:text-sm font-sans leading-relaxed">
              {lang === 'en'
                ? 'Our VIP travel designers can build a bespoke multi-day program tailored to your passions, honeymoon celebration, or family retreat across Bali.'
                : 'Tim perancang perjalanan VIP kami siap menyusun program liburan eksklusif multi-hari yang disesuaikan dengan hobi, minat, atau perayaan romantis Anda di Bali.'}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <button
              type="button"
              onClick={onNavigateToContact}
              className="w-full lg:w-auto text-center bg-gold-600 hover:bg-gold-700 text-white text-xs uppercase tracking-widest font-mono font-bold px-8 py-4 rounded-sm transition-all shadow-md cursor-pointer active:scale-95"
              id="whyus-btn-custom-consult"
            >
              {lang === 'en' ? 'Free Private Consultation' : 'Konsultasi Privat Gratis'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
