import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Copy,
  Printer,
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { SubmittedBooking } from '../types';
import { formatPrice } from '../data';
import { BRAND, useLanguage } from '../i18n';

interface ThankYouPageProps {
  booking: SubmittedBooking | null;
  onBackHome: () => void;
  onBrowseTours: () => void;
}

export default function ThankYouPage({
  booking,
  onBackHome,
  onBrowseTours,
}: ThankYouPageProps) {
  const { lang } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyEmailBody = () => {
    if (!booking) return;
    navigator.clipboard.writeText(booking.emailBody);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyCode = () => {
    if (!booking) return;
    navigator.clipboard.writeText(booking.bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24 px-6 flex items-center justify-center text-stone-900">
        <div className="max-w-lg w-full bg-white border border-stone-200 rounded-xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-gold-50 border border-gold-500/40 flex items-center justify-center text-gold-700">
            <Check size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-stone-900 font-medium">
              {lang === 'en' ? 'Thank You for Visiting GoUbudTrip' : 'Terima Kasih Telah Mengunjungi GoUbudTrip'}
            </h1>
            <p className="font-sans text-sm text-stone-600 leading-relaxed">
              {lang === 'en'
                ? 'Explore our private Bali Ubud tour packages to submit a new reservation enquiry.'
                : 'Jelajahi katalog paket tur privat Bali Ubud kami untuk membuat permintaan pemesanan baru.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onBrowseTours}
              className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-sm cursor-pointer shadow-sm"
            >
              {lang === 'en' ? 'Browse Tour Packages' : 'Lihat Paket Tour'}
            </button>
            <button
              type="button"
              onClick={onBackHome}
              className="bg-[#FAF7F2] border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-sm cursor-pointer"
            >
              {lang === 'en' ? 'Return Home' : 'Kembali ke Beranda'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="thank-you-page"
      className="min-h-screen bg-[#FAF7F2] pt-28 pb-24 px-6 md:px-12 text-stone-900"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Thank You Confirmation Banner */}
        <div className="bg-white border border-stone-200 rounded-xl p-8 md:p-10 text-center space-y-5 shadow-lg shadow-stone-900/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,167,95,0.12),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold-600 text-white flex items-center justify-center shadow-md">
              <Check size={32} className="stroke-[3]" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold-700 font-bold">
                {lang === 'en' ? 'Booking Enquiry Received' : 'Permintaan Booking Diterima'}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-medium tracking-wide">
                {lang === 'en'
                  ? `Thank You, ${booking.fullName}!`
                  : `Terima Kasih, ${booking.fullName}!`}
              </h1>
              <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed pt-1">
                {lang === 'en' ? (
                  <>
                    Your reservation enquiry for{' '}
                    <span className="text-stone-900 font-semibold">{booking.experienceTitle}</span>{' '}
                    has been prepared for WhatsApp{' '}
                    <span className="text-emerald-700 font-mono font-semibold">{BRAND.phoneDisplay}</span>.
                    If WhatsApp did not open automatically, please click the button below to send your booking details directly to our concierge.
                  </>
                ) : (
                  <>
                    Permintaan pemesanan Anda untuk{' '}
                    <span className="text-stone-900 font-semibold">{booking.experienceTitle}</span>{' '}
                    telah disiapkan untuk dikirim ke WhatsApp resmi kami{' '}
                    <span className="text-emerald-700 font-mono font-semibold">{BRAND.phoneDisplay}</span>.
                    Jika WhatsApp belum terbuka otomatis, silakan klik tombol di bawah ini untuk langsung mengirim pesan booking Anda.
                  </>
                )}
              </p>
            </div>

            {/* Booking Reference Code */}
            <div className="inline-flex items-center gap-3 bg-[#FAF7F2] border border-stone-200 px-5 py-2.5 rounded-md">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                {lang === 'en' ? 'Reference Code:' : 'Kode Referensi:'}
              </span>
              <span className="font-mono text-sm font-bold text-gold-700 tracking-wider">
                {booking.bookingCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-stone-500 hover:text-gold-700 transition-colors cursor-pointer"
                aria-label="Copy booking code"
              >
                {copiedCode ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Primary WhatsApp Dispatch & Copy Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={booking.waHref}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-thankyou-whatsapp"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-[0.16em] font-bold px-7 py-3.5 rounded-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>
                  {lang === 'en'
                    ? `Send via WhatsApp (${BRAND.phoneDisplay})`
                    : `Kirim ke WhatsApp (${BRAND.phoneDisplay})`}
                </span>
                <ExternalLink size={12} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmailBody}
                className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-[0.16em] px-5 py-3.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                {copiedEmail ? (
                  <Check size={14} className="text-emerald-700" />
                ) : (
                  <Copy size={14} />
                )}
                <span>
                  {copiedEmail
                    ? lang === 'en'
                      ? 'WhatsApp Message Copied!'
                      : 'Pesan WhatsApp Disalin!'
                    : lang === 'en'
                    ? 'Copy WhatsApp Message'
                    : 'Salin Pesan WhatsApp'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Reservation Summary Receipt Card */}
        <div
          id="printable-thankyou-receipt"
          className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 space-y-8 text-left shadow-sm"
        >
          {/* Header with GoUbudTrip Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-sm overflow-hidden bg-[#FAF7F2] border border-stone-200 p-1 flex items-center justify-center flex-shrink-0">
                <img
                  src={BRAND.logoUrl}
                  alt={`${BRAND.name} Logo`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-serif text-xl text-stone-900 font-semibold tracking-wide">
                  {BRAND.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-700 font-semibold">
                  {BRAND.email} • {BRAND.phoneDisplay}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 block">
                {lang === 'en' ? 'Net Total (Incl. Tax)' : 'Total Bersih (Incl. Pajak)'}
              </span>
              <span className="text-2xl font-bold text-gold-700">
                {formatPrice(booking.totalPrice, booking.currency || 'IDR')}
              </span>
            </div>
          </div>

          {/* Selected Package Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#FAF7F2] border border-stone-200 rounded-lg p-4">
            <img
              src={booking.experienceImage}
              alt={booking.experienceTitle}
              referrerPolicy="no-referrer"
              className="w-full sm:w-28 h-36 sm:h-20 object-cover rounded-sm border border-stone-200 flex-shrink-0"
            />
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
                {lang === 'en' ? 'Selected Tour Package' : 'Paket Tour Pilihan'}
              </span>
              <h2 className="font-serif text-xl text-stone-900 font-medium">
                {booking.experienceTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-gold-600" />
                  {booking.experienceLocation}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} className="text-gold-600" />
                  {booking.experienceDuration}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-sans text-sm">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Calendar size={12} className="text-gold-600" />
                {lang === 'en' ? 'Tour Date' : 'Tanggal Tur'}
              </span>
              <p className="text-stone-900 font-semibold">{booking.date}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Users size={12} className="text-gold-600" />
                {lang === 'en' ? 'Party Size' : 'Jumlah Peserta'}
              </span>
              <p className="text-stone-900 font-semibold">
                {booking.guests} {lang === 'en' ? 'Guest(s)' : 'Orang'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <MapPin size={12} className="text-gold-600" />
                {lang === 'en' ? 'Pickup Address & Time' : 'Alamat & Jam Jemput'}
              </span>
              <p className="text-stone-900 font-semibold">{booking.pickupAddress}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 block">
                {lang === 'en' ? 'Guest Name' : 'Nama Pemesan'}
              </span>
              <p className="text-stone-900">{booking.fullName}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 block">
                {lang === 'en' ? 'Guest Email' : 'Email Tamu'}
              </span>
              <p className="text-stone-900 break-all">{booking.email}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 block">
                {lang === 'en' ? 'Phone / WhatsApp' : 'Telepon / WhatsApp'}
              </span>
              <p className="text-stone-900">{booking.phone}</p>
            </div>
          </div>

          {booking.addonsNames && booking.addonsNames.length > 0 && (
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold-700 font-bold block">
                {lang === 'en' ? 'Selected VIP Upgrades' : 'Layanan Tambahan VIP'}
              </span>
              <p className="text-sm text-stone-800">{booking.addonsNames.join(', ')}</p>
            </div>
          )}

          {booking.specialNotes && (
            <div className="pt-4 border-t border-stone-200 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold-700 font-bold block">
                {lang === 'en' ? 'Special Requests' : 'Catatan Khusus'}
              </span>
              <p className="text-sm text-stone-700">{booking.specialNotes}</p>
            </div>
          )}

          {/* Formatted WhatsApp Summary Preview */}
          <div className="pt-6 border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 font-bold">
                {lang === 'en'
                  ? `WhatsApp Booking Summary (${BRAND.phoneDisplay})`
                  : `Ringkasan Pesan WhatsApp (${BRAND.phoneDisplay})`}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 font-semibold">
                <ShieldCheck size={12} />
                <span>{lang === 'en' ? 'READY FOR WHATSAPP' : 'SIAP KIRIM WHATSAPP'}</span>
              </span>
            </div>
            <pre className="bg-[#FAF7F2] border border-stone-200 rounded-md p-4 font-mono text-xs text-stone-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {booking.emailBody}
            </pre>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer size={14} />
            <span>{lang === 'en' ? 'Print Receipt' : 'Cetak Bukti'}</span>
          </button>

          <button
            type="button"
            onClick={onBrowseTours}
            id="btn-thankyou-browse-tours"
            className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>{lang === 'en' ? 'Browse More Packages' : 'Lihat Paket Lainnya'}</span>
          </button>

          <button
            type="button"
            onClick={onBackHome}
            id="btn-thankyou-home"
            className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all cursor-pointer shadow-sm"
          >
            {lang === 'en' ? 'Return to Home' : 'Kembali ke Beranda'}
          </button>
        </div>
      </div>
    </div>
  );
}
