import React, { useState } from 'react';
import { Mail, Phone, MapPin, HelpCircle, ChevronDown, ChevronUp, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { getFaqs, getExperiences } from '../data';
import { BRAND, useLanguage } from '../i18n';

export default function ContactSection() {
  const { lang } = useLanguage();
  const faqs = getFaqs(lang);
  const experiences = getExperiences(lang);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTour, setSelectedTour] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const buildWhatsAppInquiryUrl = () => {
    const tourTitle = experiences.find((e) => e.id === selectedTour)?.title || (lang === 'en' ? 'Custom Bali Inquiry' : 'Pertanyaan Kustom Bali');
    const text =
      lang === 'en'
        ? `*VIP INQUIRY - ${BRAND.name.toUpperCase()}*\nName: ${fullName}\nEmail: ${email}\nPhone/WhatsApp: ${phone || '-'}\nInterested Package: ${tourTitle}\nMessage: ${message}`
        : `*PERTANYAAN VIP - ${BRAND.name.toUpperCase()}*\nNama: ${fullName}\nEmail: ${email}\nTelepon/WhatsApp: ${phone || '-'}\nPaket Diminati: ${tourTitle}\nPesan: ${message}`;
    return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your full name, email address, and message.'
          : 'Mohon isi nama lengkap, alamat email, dan pesan Anda.'
      );
      return;
    }
    setFormError('');
    const waLink = document.createElement('a');
    waLink.href = buildWhatsAppInquiryUrl();
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    document.body.appendChild(waLink);
    waLink.click();
    document.body.removeChild(waLink);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF7F2] text-stone-900 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="max-w-3xl space-y-4 mb-16 text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-700 font-bold bg-gold-500/10 px-4 py-2 border border-gold-500/25 rounded-full inline-block">
            {lang === 'en' ? 'Bespoke Relations' : 'Layanan Konsultasi'}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 font-medium tracking-tight leading-tight">
            {lang === 'en' ? 'Connect With Our VIP Concierge' : 'Hubungi Konsultan VIP Kami'}
          </h1>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-normal">
            {lang === 'en'
              ? 'Looking for a tailored Bali itinerary, private chauffeur transfer, or special celebration setup? Our dedicated Ubud concierge desk is ready to assist you 24/7.'
              : 'Butuh informasi rute khusus, permintaan sewa mobil privat, atau perayaan spesial di Bali? Konsultan eksklusif kami siap menyambut pertanyaan Anda 24/7.'}
          </p>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24" id="contact-split-grid">
          
          {/* Left Column: Direct Contact info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-white border border-stone-200 p-8 rounded-lg space-y-6 shadow-sm">
              <h3 className="font-serif text-2xl text-stone-900 font-medium border-b border-stone-200 pb-4">
                {lang === 'en' ? 'Head Office Details' : 'Informasi Kantor Pusat'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-700 font-bold">
                      {lang === 'en' ? 'Ubud HQ Location' : 'Lokasi Kantor Ubud'}
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm leading-relaxed mt-1">
                      {BRAND.address}
                    </p>
                    <a
                      href={BRAND.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700 hover:text-emerald-800 mt-2 transition-colors"
                    >
                      <span>
                        {lang === 'en'
                          ? 'Open Google Business Profile'
                          : 'Buka Google Business Profile'}
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-gold-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-700 font-bold">
                      {lang === 'en' ? 'WhatsApp Booking & Concierge' : 'Hotline WhatsApp & Booking'}
                    </h4>
                    <a
                      href={`https://wa.me/${BRAND.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-gold-700 text-xs md:text-sm leading-relaxed mt-1 inline-block transition-colors font-medium"
                    >
                      {BRAND.phoneDisplay} ({lang === 'en' ? 'Available 24/7' : 'Tersedia 24/7'})
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-gold-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-700 font-bold">
                      {lang === 'en' ? 'Official Company Email' : 'Email Resmi Perusahaan'}
                    </h4>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-stone-700 hover:text-gold-700 text-xs md:text-sm leading-relaxed mt-1 inline-block transition-colors font-medium"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps / Business Profile Card */}
              <a
                href={BRAND.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-stone-200 hover:border-gold-600 rounded-md overflow-hidden relative h-48 bg-[#F3EDE2] group transition-all shadow-xs hover:shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF7F2]/95 via-[#F3EDE2]/60 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-20 space-y-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-600 animate-ping absolute top-11" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-600 absolute top-11" />
                  <p className="font-serif text-sm text-stone-900 font-semibold pt-4">
                    {BRAND.name} — Google Business Profile
                  </p>
                  <p className="font-sans text-[11px] text-stone-600">
                    {lang === 'en' ? 'Ubud, Gianyar — Bali, Indonesia' : 'Koordinat Resmi Ubud, Gianyar, Bali'}
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 group-hover:border-gold-600 text-[11px] font-mono font-semibold text-stone-800 group-hover:text-gold-700 transition-colors shadow-xs">
                    <MapPin size={12} className="text-gold-600" />
                    <span>{lang === 'en' ? 'View on Google Maps' : 'Buka di Google Maps'}</span>
                    <ExternalLink size={11} />
                  </span>
                </div>
                <div className="w-full h-full opacity-25 bg-[linear-gradient(to_right,#b48035_1px,transparent_1px),linear-gradient(to_bottom,#b48035_1px,transparent_1px)] bg-[size:14px_14px]" />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 rounded-lg text-left shadow-sm">
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-6">
              {lang === 'en' ? 'Inquiry & Custom Request Form' : 'Formulir Pertanyaan & Permintaan Khusus'}
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="vip-contact-form">
                {formError && (
                  <p className="text-xs font-mono text-red-700 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold block">
                      {lang === 'en' ? 'Full Name' : 'Nama Lengkap'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'Enter your full name' : 'Masukkan nama lengkap'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans transition-colors placeholder-stone-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold block">
                      {lang === 'en' ? 'Email Address' : 'Alamat Email'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={lang === 'en' ? 'Enter your email address' : 'Masukkan alamat email'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans transition-colors placeholder-stone-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold block">
                      {lang === 'en' ? 'Phone / WhatsApp Number' : 'Nomor Telepon / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      placeholder={lang === 'en' ? 'e.g. +62 877-6102-2499' : 'Contoh: +62 877-6102-2499'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans transition-colors placeholder-stone-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold block">
                      {lang === 'en' ? 'Preferred Tour Package' : 'Paket Tour yang Diminati'}
                    </label>
                    <select
                      value={selectedTour}
                      onChange={(e) => setSelectedTour(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans transition-colors cursor-pointer"
                    >
                      <option value="">
                        {lang === 'en' ? '-- Select a Package (Optional) --' : '-- Silakan Pilih Paket (Opsional) --'}
                      </option>
                      {experiences.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-stone-600 font-semibold block">
                    {lang === 'en' ? 'Message or Special Requests' : 'Pesan atau Kebutuhan Khusus Anda'}
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={
                      lang === 'en'
                        ? 'Share your travel dates, preferred destinations, dietary notes, or private chauffeur requests...'
                        : 'Tuliskan detail permintaan Anda (tanggal perjalanan, destinasi pilihan, diet khusus, dll.)'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 p-4 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans transition-colors placeholder-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  id="btn-submit-contact"
                >
                  <MessageCircle size={15} />
                  <span>{lang === 'en' ? 'Send Inquiry via WhatsApp' : 'Kirim Pertanyaan ke WhatsApp'}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 px-6 text-center space-y-6" id="contact-success-state">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-stone-900">
                    {lang === 'en' ? 'Inquiry Received Successfully' : 'Pertanyaan Terkirim dengan Sukses'}
                  </h4>
                  <p className="text-stone-600 text-sm font-sans max-w-md mx-auto leading-relaxed">
                    {lang === 'en'
                      ? `Thank you, ${fullName}. Our ${BRAND.name} concierge team will review your request and respond shortly via email (${BRAND.email}) or WhatsApp.`
                      : `Terima kasih ${fullName}. Tim konsultan ${BRAND.name} akan meninjau pesan Anda dan menghubungi Anda kembali melalui WhatsApp atau Email (${BRAND.email}).`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-sm transition-all flex items-center gap-2"
                  >
                    <MessageCircle size={15} />
                    <span>{lang === 'en' ? `Chat on WhatsApp (${BRAND.phoneDisplay})` : `Chat WhatsApp (${BRAND.phoneDisplay})`}</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setSelectedTour('');
                      setMessage('');
                    }}
                    className="text-xs font-mono uppercase tracking-widest bg-[#FAF7F2] hover:bg-stone-100 border border-stone-300 text-stone-700 px-6 py-3 rounded-sm transition-all cursor-pointer font-semibold"
                  >
                    {lang === 'en' ? 'Send Another Message' : 'Kirim Pesan Baru'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="border-t border-stone-200 pt-20 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
              {lang === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
            </p>
            <h2 className="font-serif text-3xl text-stone-900 font-medium tracking-wide">
              {lang === 'en' ? 'Exclusive Tour Service FAQs' : 'FAQ Layanan Tour Eksklusif'}
            </h2>
          </div>

          <div className="space-y-4 text-left" id="contact-faq-accordions">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white border border-stone-200 hover:border-gold-500/40 rounded-sm overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 focus:outline-none text-left cursor-pointer"
                    id={`contact-faq-btn-${index}`}
                  >
                    <div className="flex items-start space-x-4 pr-4">
                      <HelpCircle size={16} className="text-gold-600 mt-1 flex-shrink-0" />
                      <span className="font-serif text-base text-stone-900 font-medium tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                    <div className="text-gold-600 flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pl-[38px] pt-3 border-t border-stone-100 animate-fade-in">
                      <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
