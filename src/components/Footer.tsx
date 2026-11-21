import React, { useState, useEffect } from 'react';
import { Mail, Compass, Globe, Send, Sun, CloudRain, Check, MapPin, Phone } from 'lucide-react';
import { BRAND, useLanguage } from '../i18n';

export default function Footer() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);
  const [baliTime, setBaliTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Makassar',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setBaliTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError(
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Mohon masukkan alamat email yang valid.'
      );
      return;
    }
    setEmailError('');
    setSuccess(true);
    setTimeout(() => {
      setEmail('');
      setSuccess(false);
    }, 3000);
  };

  return (
    <footer id="about" className="bg-[#F3EDE2] border-t border-stone-200 pt-20 pb-10 text-left relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/[0.08] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-300/70">
        
        {/* Brand Description Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-sm overflow-hidden bg-white border border-gold-500/30 flex items-center justify-center p-1 shadow-sm flex-shrink-0">
              <img
                src={BRAND.logoUrl}
                alt={`${BRAND.name} Logo`}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-wider text-stone-900 font-semibold">
                {BRAND.name}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold-700 -mt-0.5 font-semibold">
                {BRAND.tagline[lang]}
              </span>
            </div>
          </div>

          <p className="font-sans text-xs md:text-sm text-stone-700 leading-relaxed font-normal">
            {lang === 'en'
              ? `${BRAND.name} is Bali Ubud’s dedicated private tour operator and local hospitality specialist. We craft authentic Ubud cultural journeys, waterfall explorations, jungle swings, ATV & rafting adventures, and tailor-made Ubud itineraries.`
              : `${BRAND.name} adalah operator tur privat dan spesialis wisata terpercaya di Bali Ubud. Kami menghadirkan perjalanan budaya Ubud, eksplorasi air terjun, jungle swing, petualangan ATV & rafting, serta paket tour Ubud custom eksklusif.`}
          </p>

          <div className="flex items-center space-x-3 text-emerald-800 font-mono text-[9px] uppercase tracking-widest font-semibold">
            <Compass size={12} />
            <span>
              {lang === 'en'
                ? 'Registered Sustainable Luxury Tourism'
                : 'Pariwisata Mewah Berkelanjutan Resmi'}
            </span>
          </div>
        </div>

        {/* Contact Coordinates Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-base text-stone-900 tracking-wide font-semibold">
            {lang === 'en' ? 'Head Office & Desk' : 'Kantor Pusat & Kontak'}
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-stone-700 font-normal">
            <li className="flex items-start space-x-2.5">
              <MapPin size={14} className="text-gold-700 mt-0.5 flex-shrink-0" />
              <span>{BRAND.address}</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone size={14} className="text-gold-700 flex-shrink-0" />
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-700 transition-colors font-medium"
              >
                {BRAND.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail size={14} className="text-gold-700 flex-shrink-0" />
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:text-gold-700 transition-colors font-medium"
              >
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Real-time Bali Weather Microclimate Widget */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-base text-stone-900 tracking-wide font-semibold">
            {lang === 'en' ? 'Bali Microclimates' : 'Cuaca Mikro Bali'}
          </h4>
          <div className="space-y-3 bg-white border border-stone-200 p-4 rounded-sm text-xs font-sans shadow-xs">
            <div className="flex justify-between items-center text-stone-600">
              <span>{lang === 'en' ? 'Local Time (WITA)' : 'Waktu Lokal (WITA)'}</span>
              <span className="font-mono text-gold-700 font-semibold">{baliTime || '12:00 PM'}</span>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="flex justify-between items-center">
                <span className="text-stone-700">
                  {lang === 'en' ? 'Nusa Dua (Coast)' : 'Nusa Dua (Pesisir)'}
                </span>
                <span className="flex items-center space-x-1 text-amber-700 font-mono font-medium">
                  <Sun size={12} />
                  <span>30°C</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-700">
                  {lang === 'en' ? 'Kintamani (Highland)' : 'Kintamani (Kaldera)'}
                </span>
                <span className="flex items-center space-x-1 text-gold-700 font-mono font-medium">
                  <Sun size={12} className="opacity-70" />
                  <span>22°C</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-700">
                  {lang === 'en' ? 'Ubud (Rainforest)' : 'Ubud (Hutan Tropis)'}
                </span>
                <span className="flex items-center space-x-1 text-sky-700 font-mono font-medium">
                  <CloudRain size={12} />
                  <span>26°C</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Private Newsletter Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-base text-stone-900 tracking-wide font-semibold">
            {lang === 'en' ? 'The Private Ledger' : 'Buletin Eksklusif'}
          </h4>
          <p className="font-sans text-xs text-stone-600 leading-relaxed">
            {lang === 'en'
              ? 'Subscribe to receive curated seasonal Bali Ubud itineraries, hidden waterfall guides, and exclusive private tour privileges.'
              : 'Berlangganan untuk menerima rekomendasi rute wisata Bali Ubud, panduan air terjun tersembunyi, serta penawaran tur privat eksklusif.'}
          </p>

          {success ? (
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-800 bg-emerald-50 p-3 rounded-sm border border-emerald-200">
              <Check size={14} className="stroke-[3]" />
              <span>{lang === 'en' ? 'Added to Elite Ledger.' : 'Terdaftar di Buletin Eksklusif.'}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <form onSubmit={handleSubscribe} className="flex items-center border border-stone-300 bg-white rounded-sm overflow-hidden focus-within:border-gold-600 transition-colors shadow-xs">
                <input
                  type="email"
                  required
                  placeholder={lang === 'en' ? 'your.name@domain.com' : 'email.anda@domain.com'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  id="newsletter-email-input"
                  className="flex-grow bg-transparent px-3 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-3 cursor-pointer transition-colors"
                  aria-label={lang === 'en' ? 'Subscribe to newsletter' : 'Berlangganan buletin'}
                  id="btn-newsletter-subscribe"
                >
                  <Send size={12} />
                </button>
              </form>
              {emailError && (
                <p className="text-[11px] font-mono text-red-700">{emailError}</p>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Copyright area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
        <span>© {new Date().getFullYear()} {BRAND.name}. {lang === 'en' ? 'All Rights Reserved.' : 'Hak Cipta Dilindungi.'}</span>
        
        <div className="flex space-x-6">
          <span className="flex items-center space-x-1.5">
            <Globe size={12} />
            <span>Bali, Indonesia</span>
          </span>
          <a href={`mailto:${BRAND.email}`} className="hover:text-gold-700 transition-colors">
            {BRAND.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
