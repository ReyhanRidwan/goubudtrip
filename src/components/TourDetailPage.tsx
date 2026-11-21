import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  ShieldCheck,
  MapPin,
  Tag,
  Plane,
  Star,
  Clock,
  Check,
  X,
  ArrowRight,
  AlertTriangle,
  MessageCircle,
  Sparkles,
  Backpack,
  FileText,
  Compass,
  Globe,
  Info,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { Experience, SubmittedBooking } from '../types';
import { getExperiences, formatPrice, getTierPricePerPerson } from '../data';
import { BRAND, useLanguage } from '../i18n';

interface TourDetailPageProps {
  experienceId: string;
  onBackToTours: () => void;
  onSelectExperience?: (experienceId: string) => void;
  onSubmitEmailBooking: (booking: SubmittedBooking) => void;
  onOpenFullModal?: (experienceId: string) => void;
}

export default function TourDetailPage({
  experienceId,
  onBackToTours,
  onSelectExperience,
  onSubmitEmailBooking,
  onOpenFullModal,
}: TourDetailPageProps) {
  const { lang } = useLanguage();
  const experiences = getExperiences(lang);
  const experience: Experience =
    experiences.find((e) => e.id === experienceId) || experiences[0];

  const pickupTimesLines = experience.pickupTimes || [
    '07.00 am, 07.30 am, 08.00 am, 08.30 am',
  ];

  // Expand selectable time slots cleanly from pickupTimes strings
  const selectableTimeSlots = useMemo(() => {
    const slots: string[] = [];
    pickupTimesLines.forEach((line) => {
      if (line.includes(':')) {
        const [prefix, rest] = line.split(':');
        rest
          .split(',')
          .map((t) => t.replace(/\.$/, '').trim())
          .filter(Boolean)
          .forEach((timeVal) => slots.push(`${prefix.trim()} — ${timeVal}`));
      } else {
        line
          .split(',')
          .map((t) => t.replace(/\.$/, '').trim())
          .filter(Boolean)
          .forEach((timeVal) => slots.push(timeVal));
      }
    });
    return slots.length > 0 ? slots : ['08.00 am'];
  }, [experience.id, lang]);

  // Enquiry / Email Booking Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedPickupTime, setSelectedPickupTime] = useState(selectableTimeSlots[0]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = useMemo(() => {
    const raw =
      experience.images && experience.images.length > 0
        ? experience.images
        : [experience.bgImage || experience.cardImage];
    return Array.from(new Set(raw.filter(Boolean)));
  }, [experience.id, experience.images, experience.bgImage, experience.cardImage]);

  useEffect(() => {
    setSelectedPickupTime(selectableTimeSlots[0]);
    setFormError(null);
    setLightboxIndex(null);
  }, [experience.id, selectableTimeSlots]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft' && galleryImages.length > 1) {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
        );
      } else if (e.key === 'ArrowRight' && galleryImages.length > 1) {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % galleryImages.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  const maxPeople = experience.maxPeople || 12;
  const currency = experience.currency || 'USD';
  const activeUnitPrice = getTierPricePerPerson(experience, guests, false);
  const totalPrice = activeUnitPrice * guests;

  const renderPickupLocationText = (text: string) => {
    const keyword = 'Bali.';
    if (!text.includes(keyword)) return text;
    const parts = text.split(keyword);
    return (
      <>
        {parts[0]}
        <span className="text-gold-700 font-semibold">{keyword}</span>
        {parts.slice(1).join(keyword)}
      </>
    );
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your full name.'
          : 'Mohon masukkan nama lengkap Anda.'
      );
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Mohon masukkan alamat email yang valid.'
      );
      return;
    }
    if (!phone.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your phone or WhatsApp number.'
          : 'Mohon masukkan nomor telepon atau WhatsApp aktif.'
      );
      return;
    }
    if (!address.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your hotel, villa, or pickup address.'
          : 'Mohon masukkan alamat hotel atau lokasi penjemputan.'
      );
      return;
    }
    if (!tourDate) {
      setFormError(
        lang === 'en'
          ? 'Please select your preferred tour date.'
          : 'Mohon pilih tanggal tur yang diinginkan.'
      );
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const bookingCode = `GUT-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const formattedUnit = formatPrice(activeUnitPrice, currency);
    const formattedTotal = formatPrice(totalPrice, currency);

    const emailSubject =
      lang === 'en'
        ? `[${bookingCode}] Tour Booking Enquiry: ${experience.title} - ${name.trim()}`
        : `[${bookingCode}] Permintaan Booking Tour: ${experience.title} - ${name.trim()}`;

    const emailBody =
      lang === 'en'
        ? `Hello ${BRAND.name} Reservations Team,

I would like to book the following private tour package:

Booking Reference: ${bookingCode}
Package: ${experience.title} (${experience.duration})
Tour Date: ${tourDate}
Preferred Pickup Time: ${selectedPickupTime}
Guests: ${guests} Person(s)
Rate Applied: ${formattedUnit} /orang
Net Total (Includes Government Tax): ${formattedTotal}

Guest Contact & Pickup Details:
- Name: ${name.trim()}
- Email: ${email.trim()}
- Phone / WhatsApp: ${phone.trim()}
- Hotel / Pickup Address: ${address.trim()}
- Additional Notes: ${notes.trim() || 'None'}

Please confirm availability and send the next steps. Thank you!`
        : `Halo Tim Reservasi ${BRAND.name},

Saya ingin memesan paket tur privat berikut:

Kode Referensi: ${bookingCode}
Paket Tour: ${experience.title} (${experience.duration})
Tanggal Tur: ${tourDate}
Jam Penjemputan: ${selectedPickupTime}
Jumlah Peserta: ${guests} Orang
Tarif Berlaku: ${formattedUnit} /orang
Total Bersih (Termasuk Pajak): ${formattedTotal}

Data Tamu & Penjemputan:
- Nama: ${name.trim()}
- Email: ${email.trim()}
- Telepon / WhatsApp: ${phone.trim()}
- Alamat Hotel / Penjemputan: ${address.trim()}
- Catatan Tambahan: ${notes.trim() || 'Tidak ada'}

Mohon konfirmasi ketersediaan jadwal tersebut. Terima kasih!`;

    const emailMailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    const waText =
      lang === 'en'
        ? `*BOOKING TOUR - ${BRAND.name.toUpperCase()}*\n---------------------------------------\nRef: ${bookingCode}\nPackage: ${experience.title} (${experience.duration})\nDate: ${tourDate}\nPickup Time: ${selectedPickupTime}\nGuests: ${guests} Person(s) (${formattedUnit}/orang)\nName: ${name.trim()}\nEmail: ${email.trim()}\nPhone / WhatsApp: ${phone.trim()}\nPickup Address: ${address.trim()}\nNotes: ${notes.trim() || '-'}\nTotal (Net): ${formattedTotal}\n---------------------------------------\nHello ${BRAND.name}, I would like to book this tour package. Please confirm availability!`
        : `*BOOKING TOUR - ${BRAND.name.toUpperCase()}*\n---------------------------------------\nKode: ${bookingCode}\nPaket: ${experience.title} (${experience.duration})\nTanggal: ${tourDate}\nJam Jemput: ${selectedPickupTime}\nPeserta: ${guests} Orang (${formattedUnit}/orang)\nNama: ${name.trim()}\nEmail: ${email.trim()}\nTelepon / WhatsApp: ${phone.trim()}\nAlamat Jemput: ${address.trim()}\nCatatan: ${notes.trim() || '-'}\nTotal (Net): ${formattedTotal}\n---------------------------------------\nHalo ${BRAND.name}, saya ingin memesan paket tour ini. Mohon konfirmasi ketersediaan jadwal!`;

    const waHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
      waText
    )}`;

    const submittedBooking: SubmittedBooking = {
      bookingCode,
      experienceId: experience.id,
      experienceTitle: experience.title,
      experienceImage: experience.cardImage,
      experienceLocation: experience.location,
      experienceDuration: experience.duration,
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      pickupAddress: `${address.trim()} (${selectedPickupTime})`,
      date: tourDate,
      guests,
      specialNotes: notes.trim(),
      totalPrice,
      currency,
      submittedAt: new Date().toISOString(),
      emailSubject,
      emailBody: waText,
      emailMailtoHref,
      waHref,
    };

    const waLink = document.createElement('a');
    waLink.href = waHref;
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    document.body.appendChild(waLink);
    waLink.click();
    document.body.removeChild(waLink);

    onSubmitEmailBooking(submittedBooking);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900" id="tour-detail-page">
      {/* 1. TOP UNOBSTRUCTED PHOTO SHOWCASE (WIDE SINGLE PHOTO OR BENTO PHOTO GRID) */}
      <section className="pt-24 pb-8 bg-[#FAF7F2]" id="tour-detail-gallery">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-5">
          {/* Top Action Row: Back Button & Photo Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToTours}
              id="btn-back-to-catalog"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-sm transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>
                {lang === 'en' ? 'Back to Tour Packages' : 'Kembali ke Daftar Paket'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-sm transition-all cursor-pointer shadow-sm"
            >
              <Images size={14} className="text-gold-600" />
              <span>
                {galleryImages.length > 1
                  ? lang === 'en'
                    ? `View Gallery (${galleryImages.length} Photos)`
                    : `Lihat Galeri (${galleryImages.length} Foto)`
                  : lang === 'en'
                  ? 'Expand Photo'
                  : 'Perbesar Foto'}
              </span>
            </button>
          </div>

          {/* Single Spacious Photo */}
          {galleryImages.length === 1 && (
            <div
              onClick={() => setLightboxIndex(0)}
              className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-xl overflow-hidden border border-stone-200 shadow-lg shadow-stone-900/10 bg-stone-200 group cursor-pointer"
            >
              <img
                src={galleryImages[0]}
                alt={experience.title}
                loading="eager"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/80 backdrop-blur-md border border-white/25 text-white px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5">
                <Maximize2 size={12} className="text-gold-300" />
                <span>{lang === 'en' ? 'Full View' : 'Layar Penuh'}</span>
              </div>
            </div>
          )}

          {/* 2-Photo Editorial Bento Split */}
          {galleryImages.length === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 md:h-[380px] lg:h-[410px]">
              <div
                onClick={() => setLightboxIndex(0)}
                className="md:col-span-7 relative h-[220px] sm:h-[300px] md:h-full min-h-0 rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-200 group cursor-pointer"
              >
                <img
                  src={galleryImages[0]}
                  alt={`${experience.title} - 1`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/80 backdrop-blur-md border border-white/25 text-white p-2 rounded-sm">
                  <Maximize2 size={13} className="text-gold-300" />
                </div>
              </div>

              <div
                onClick={() => setLightboxIndex(1)}
                className="md:col-span-5 relative h-[200px] sm:h-[260px] md:h-full min-h-0 rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-200 group cursor-pointer"
              >
                <img
                  src={galleryImages[1]}
                  alt={`${experience.title} - 2`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/80 backdrop-blur-md border border-white/25 text-white p-2 rounded-sm">
                  <Maximize2 size={13} className="text-gold-300" />
                </div>
              </div>
            </div>
          )}

          {/* 3+ Photo Luxury Bento Grid (Flat 2-Row Grid, Compact & Overflow-Safe) */}
          {galleryImages.length >= 3 && (
            <div className="grid grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-3 md:h-[380px] lg:h-[400px] overflow-hidden">
              <div
                onClick={() => setLightboxIndex(0)}
                className="col-span-2 md:col-span-7 md:row-span-2 relative h-[210px] sm:h-[270px] md:h-full min-h-0 rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-200 group cursor-pointer"
              >
                <img
                  src={galleryImages[0]}
                  alt={`${experience.title} - 1`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/80 backdrop-blur-md border border-white/25 text-white p-2 rounded-sm">
                  <Maximize2 size={13} className="text-gold-300" />
                </div>
              </div>

              {galleryImages.slice(1, 3).map((imgUrl, idx) => (
                <div
                  key={`${imgUrl}-${idx}`}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="col-span-1 md:col-span-5 md:row-span-1 relative h-[130px] sm:h-[170px] md:h-full min-h-0 rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-200 group cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`${experience.title} - ${idx + 2}`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {idx === 1 && galleryImages.length > 3 && (
                    <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center font-mono text-sm font-bold text-white">
                      +{galleryImages.length - 3}{' '}
                      {lang === 'en' ? 'More' : 'Lainnya'}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/80 backdrop-blur-md border border-white/25 text-white p-2 rounded-sm">
                    <Maximize2 size={13} className="text-gold-300" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. PACKAGE TITLE HEADER & 4-COLUMN METADATA STRIP DIRECTLY BELOW PHOTOS */}
      <section
        className="bg-[#F3EDE2] border-y border-stone-200 py-7 md:py-8"
        id="tour-detail-meta-strip"
      >
        {/* Unobstructed Editorial Title Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-6 mb-6 border-b border-stone-200 text-left space-y-3">
          <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono">
            <span className="uppercase tracking-[0.25em] text-gold-700 font-bold">
              {experience.tagline}
            </span>
            <span className="text-stone-400">•</span>
            <span className="inline-flex items-center gap-1.5 text-stone-800">
              <Star size={13} className="fill-gold-500 text-gold-500" />
              <span className="font-bold">{experience.rating.toFixed(1)}</span>
              <span className="text-stone-600">
                ({experience.reviewCount} {lang === 'en' ? 'reviews' : 'ulasan'})
              </span>
            </span>
            <span className="text-stone-400">•</span>
            <span className="inline-flex items-center gap-1 text-stone-700">
              <MapPin size={13} className="text-gold-600" />
              <span>{experience.location}</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-stone-900 font-medium tracking-wide leading-tight">
            {experience.title}
          </h1>

          {experience.featureBadges && experience.featureBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {experience.featureBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-white border border-stone-200 text-stone-800 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-sm"
                >
                  <Check size={12} className="text-emerald-700" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 4-Column Quick Specs */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Duration */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md border border-stone-200 bg-white flex items-center justify-center text-gold-600 flex-shrink-0 shadow-sm">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-stone-900 tracking-wide">
                {lang === 'en' ? 'Duration' : 'Durasi'}
              </p>
              <p className="font-mono text-xs md:text-sm text-stone-700 mt-0.5">
                {experience.duration}
              </p>
            </div>
          </div>

          {/* Tour Type or Max People */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md border border-stone-200 bg-white flex items-center justify-center text-gold-600 flex-shrink-0 shadow-sm">
              {experience.tourType ? <Compass size={20} /> : <Users size={20} />}
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-stone-900 tracking-wide">
                {experience.tourType
                  ? lang === 'en'
                    ? 'Tour Type'
                    : 'Tipe Tur'
                  : lang === 'en'
                  ? 'Max People'
                  : 'Maks. Peserta'}
              </p>
              <p className="font-mono text-xs md:text-sm text-stone-700 mt-0.5">
                {experience.tourType || maxPeople}
              </p>
            </div>
          </div>

          {/* Group Size or Min Age */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md border border-stone-200 bg-white flex items-center justify-center text-gold-600 flex-shrink-0 shadow-sm">
              {experience.groupSize ? <Users size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-stone-900 tracking-wide">
                {experience.groupSize
                  ? lang === 'en'
                    ? 'Group Size'
                    : 'Ukuran Grup'
                  : lang === 'en'
                  ? 'Min Age'
                  : 'Usia Min.'}
              </p>
              <p className="font-mono text-xs md:text-sm text-stone-700 mt-0.5">
                {experience.groupSize || experience.minAge || '10+'}
              </p>
            </div>
          </div>

          {/* Languages or Pickup */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-md border border-stone-200 bg-white flex items-center justify-center text-gold-600 flex-shrink-0 shadow-sm">
              {experience.languages ? <Globe size={20} /> : <MapPin size={20} />}
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-stone-900 tracking-wide">
                {experience.languages
                  ? lang === 'en'
                    ? 'Languages'
                    : 'Bahasa'
                  : lang === 'en'
                  ? 'Pickup'
                  : 'Penjemputan'}
              </p>
              <p className="font-mono text-xs md:text-sm text-stone-700 mt-0.5">
                {experience.languages || experience.pickupLabel || 'Location'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN MAIN CONTENT (OVERVIEW LEFT + ENQUIRY FORM RIGHT) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-10 text-left">
            {/* Overview / About this tour */}
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium tracking-wide">
                {experience.tourType || experience.id === 'ubud-waterfalls-monkey-market'
                  ? lang === 'en'
                    ? 'About This Tour'
                    : 'Tentang Tur Ini'
                  : lang === 'en'
                  ? 'Overview'
                  : 'Ringkasan Paket'}
              </h2>
              <div className="space-y-4 font-sans text-sm md:text-base text-stone-700 leading-relaxed">
                {experience.longDesc.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {experience.tourNote && (
                <div className="mt-4 bg-gold-50 border border-gold-500/35 rounded-lg p-4 flex items-start gap-3">
                  <Info size={18} className="text-gold-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm font-sans text-stone-800 leading-relaxed">
                    <span className="font-mono uppercase tracking-wider text-gold-700 font-bold mr-2">
                      {lang === 'en' ? 'Note:' : 'Catatan:'}
                    </span>
                    <span>{experience.tourNote}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Package / Ride Options */}
            {experience.packageOptions && experience.packageOptions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {lang === 'en' ? 'Package Options' : 'Pilihan Paket Berkendara'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.packageOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-stone-200 rounded-lg p-5 space-y-2 shadow-sm"
                    >
                      <h4 className="font-serif text-base md:text-lg text-gold-700 font-semibold">
                        {opt.title}
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-stone-700 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What to Expect */}
            {experience.whatToExpect && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {lang === 'en' ? 'What to Expect' : 'Apa yang Bisa Diharapkan'}
                </h3>
                <div className="space-y-3 font-sans text-sm md:text-base text-stone-700 leading-relaxed">
                  {experience.whatToExpect.split('\n\n').map((para, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Why You'll Love This Activity / Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {experience.whatToExpect
                    ? lang === 'en'
                      ? 'Why You’ll Love This Activity'
                      : 'Mengapa Anda Akan Menyukai Aktivitas Ini'
                    : lang === 'en'
                    ? 'Tour Highlights'
                    : 'Sorotan Utama'}
                </h3>
                <ul className="space-y-2.5">
                  {experience.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-stone-700 font-sans leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pick up Times */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                {lang === 'en' ? 'Pick up Times' : 'Jam Penjemputan'}
              </h3>
              <ul className="space-y-2">
                {pickupTimesLines.map((line, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm md:text-base text-stone-700 font-sans"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pick up Location */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                {lang === 'en' ? 'Pick up Location' : 'Lokasi Penjemputan'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm md:text-base text-stone-700 font-sans leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                  <span>
                    {renderPickupLocationText(
                      experience.pickupLocations ||
                        'Ubud, Kuta, Legian, Seminyak, Nusa Dua, Canggu, Uluwatu, and others part of Bali.'
                    )}
                  </span>
                </li>
              </ul>
            </div>

            {/* Meeting Point */}
            {experience.meetingPoint && experience.meetingPoint.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {lang === 'en' ? 'Meeting Point' : 'Titik Temu (Meeting Point)'}
                </h3>
                <ul className="space-y-2">
                  {experience.meetingPoint.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-stone-700 font-sans"
                    >
                      <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to Bring */}
            {experience.whatToBring && experience.whatToBring.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium flex items-center gap-2.5">
                  <Backpack size={18} className="text-gold-600" />
                  <span>{lang === 'en' ? 'What to Bring' : 'Barang yang Perlu Dibawa'}</span>
                </h3>
                <ul className="space-y-2">
                  {experience.whatToBring.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm md:text-base text-stone-700 font-sans"
                    >
                      <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activity Notes */}
            {experience.activityNotes && experience.activityNotes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium flex items-center gap-2.5">
                  <Info size={18} className="text-gold-600" />
                  <span>{lang === 'en' ? 'Notes' : 'Catatan Penting'}</span>
                </h3>
                <ul className="space-y-2 bg-white border border-stone-200 rounded-lg p-5 shadow-sm">
                  {experience.activityNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs md:text-sm text-stone-700 font-sans leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Package */}
            {experience.relatedTitle && (
              <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block mb-1">
                  {lang === 'en' ? 'Related Tour Package' : 'Paket Terkait'}
                </span>
                {experience.relatedExperienceId && onSelectExperience ? (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectExperience(experience.relatedExperienceId!);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-serif text-base md:text-lg text-stone-900 hover:text-gold-700 transition-colors text-left inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{experience.relatedTitle}</span>
                    <ArrowRight size={15} className="text-gold-600 flex-shrink-0" />
                  </button>
                ) : (
                  <p className="font-serif text-base md:text-lg text-stone-900">
                    {experience.relatedTitle}
                  </p>
                )}
              </div>
            )}

            {/* TERMS & CONDITIONS */}
            {experience.termsAndConditions && experience.termsAndConditions.length > 0 && (
              <div className="pt-8 border-t border-stone-200 space-y-4">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium flex items-center gap-2.5 uppercase tracking-wide">
                  <FileText size={18} className="text-gold-600" />
                  <span>{lang === 'en' ? 'TERMS & CONDITIONS' : 'SYARAT & KETENTUAN'}</span>
                </h3>
                <ul className="space-y-2.5 bg-white border border-stone-200 rounded-lg p-5 shadow-sm">
                  {experience.termsAndConditions.map((term, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-stone-700 font-sans leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0 mt-2" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included / Excluded */}
            <div className="pt-8 border-t border-stone-200 space-y-5">
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium flex items-center gap-2.5">
                <Sparkles size={18} className="text-gold-600" />
                <span>{lang === 'en' ? 'Included/Excluded' : 'Sudah / Belum Termasuk'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4 shadow-sm">
                  <h4 className="font-serif text-lg text-stone-900 font-semibold">
                    {lang === 'en' ? 'Included' : 'Sudah Termasuk'}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-stone-700">
                    {experience.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={15} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4 shadow-sm">
                  <h4 className="font-serif text-lg text-stone-900 font-semibold">
                    {lang === 'en' ? 'Excluded' : 'Belum Termasuk'}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-stone-600">
                    {experience.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <X size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tour Plan */}
            <div className="pt-8 border-t border-stone-200 space-y-5">
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium flex items-center gap-2.5">
                <Clock size={18} className="text-gold-600" />
                <span>{lang === 'en' ? 'Tour Plan' : 'Rencana Perjalanan'}</span>
              </h3>
              <div className="space-y-3">
                {experience.itinerary.map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 bg-white border border-stone-200 rounded-lg p-4 shadow-sm"
                  >
                    <span className="font-mono text-sm font-bold text-gold-700 whitespace-nowrap pt-0.5 sm:min-w-[84px] flex-shrink-0">
                      {stop.time}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-serif text-base text-stone-900 font-semibold">
                        {stop.title}
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed">
                        {stop.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY LIGHT & GOLD ENQUIRY / EMAIL BOOKING CARD */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24" id="tour-detail-enquiry-card">
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xl shadow-stone-900/10 text-left">
              {/* Price Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-600 font-semibold">
                  <Tag size={14} className="text-gold-600" />
                  <span>{lang === 'en' ? 'From' : 'Mulai Dari'}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl md:text-4xl font-bold text-gold-700">
                    {formatPrice(experience.pricePerPerson, currency)}
                  </span>
                  <span className="font-sans text-xs text-stone-500">
                    /orang
                  </span>
                </div>
              </div>

              {/* Dashed Divider with Center Plane Icon */}
              <div className="relative my-6 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                <div className="flex-grow border-t border-dashed border-stone-300" />
                <span className="px-2.5 text-gold-600 flex-shrink-0">
                  <Plane size={16} />
                </span>
                <div className="flex-grow border-t border-dashed border-stone-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
              </div>

              {/* Active Enquiry Tab */}
              <div className="border-b border-stone-200 mb-6 flex justify-center">
                <span className="inline-block pb-3 px-4 border-b-2 border-gold-600 font-serif text-base text-stone-900 font-semibold tracking-wide">
                  {lang === 'en' ? 'Enquiry Form' : 'Formulir Pemesanan'}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleEnquirySubmit} className="space-y-4" id="detail-enquiry-form">
                {formError && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-sm text-xs text-red-800 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-600 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Name' : 'Nama Lengkap'}{' '}
                    <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'Your name' : 'Nama lengkap Anda'}
                    id="enquiry-input-name"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Email' : 'Alamat Email'}{' '}
                    <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    id="enquiry-input-email"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Phone' : 'Nomor Telepon / WhatsApp'}{' '}
                    <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 877-6102-2499"
                    id="enquiry-input-phone"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Address' : 'Alamat Hotel / Villa Jemput'}{' '}
                    <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Your address'
                        : 'Nama hotel, villa, atau alamat di Bali'
                    }
                    id="enquiry-input-address"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 transition-colors"
                  />
                </div>

                {/* Tour Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-semibold text-stone-800">
                      {lang === 'en' ? 'Tour Date' : 'Tanggal Tur'}{' '}
                      <span className="text-gold-700">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      id="enquiry-input-date"
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-gold-600 [color-scheme:light]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-semibold text-stone-800">
                      {lang === 'en' ? 'Guests' : 'Jumlah Peserta'}{' '}
                      <span className="text-gold-700">*</span>
                    </label>
                    <div className="flex items-center justify-between bg-[#FAF7F2] border border-stone-300 rounded-md px-2 py-1.5">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-gold-700 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-stone-900">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(maxPeople, guests + 1))}
                        className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-gold-700 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pickup Time Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Preferred Pick up Time' : 'Pilihan Jam Penjemputan'}
                  </label>
                  <select
                    value={selectedPickupTime}
                    onChange={(e) => setSelectedPickupTime(e.target.value)}
                    id="enquiry-select-pickup"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-gold-600 cursor-pointer"
                  >
                    {selectableTimeSlots.map((timeSlot) => (
                      <option key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans font-semibold text-stone-800">
                    {lang === 'en' ? 'Special Requests (Optional)' : 'Catatan Tambahan (Opsional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Vegetarian preference, dietary notes, or special requests...'
                        : 'Menu vegetarian, catatan makanan, atau permintaan khusus...'
                    }
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 resize-none"
                  />
                </div>

                {/* Live Discount Rate & Total Summary Row */}
                <div className="pt-3 border-t border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600">
                    <span>
                      {lang === 'en'
                        ? `Rate (${guests} ${guests === 1 ? 'person' : 'persons'})`
                        : `Tarif (${guests} orang)`}
                    </span>
                    <span>{formatPrice(activeUnitPrice, currency)} /orang</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-stone-700 font-semibold">
                      {lang === 'en' ? 'Net Total (Incl. Tax)' : 'Total Bersih (Incl. Pajak)'}
                    </span>
                    <span className="font-mono text-xl font-bold text-gold-700">
                      {formatPrice(totalPrice, currency)}
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-submit-email-booking"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-[0.18em] font-bold py-4 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle size={15} />
                  <span>
                    {lang === 'en'
                      ? 'Send Booking via WhatsApp'
                      : 'Kirim Booking ke WhatsApp'}
                  </span>
                  <ArrowRight size={14} />
                </button>

                <p className="text-center font-mono text-[10px] text-stone-500 leading-relaxed">
                  {lang === 'en'
                    ? `Directly connects to WhatsApp (${BRAND.phoneDisplay}) with your booking details.`
                    : `Langsung diarahkan ke WhatsApp (${BRAND.phoneDisplay}) beserta detail pesanan.`}
                </p>
              </form>

              {/* Optional Direct Modal / WhatsApp Secondary Row */}
              <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                {onOpenFullModal && (
                  <button
                    type="button"
                    onClick={() => onOpenFullModal(experience.id)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-[10px] uppercase tracking-[0.18em] py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    {lang === 'en'
                      ? 'Customize VIP Add-Ons & Guest Roster'
                      : 'Tambah VIP Add-Ons & Daftar Peserta'}
                  </button>
                )}

                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
                    lang === 'en'
                      ? `Hello ${BRAND.name}, I have a question about "${experience.title}".`
                      : `Halo ${BRAND.name}, saya ingin bertanya tentang "${experience.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-800 font-mono text-[11px] font-semibold py-1.5 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>
                    {lang === 'en'
                      ? `Chat Concierge on WhatsApp (${BRAND.phoneDisplay})`
                      : `Tanya Concierge via WhatsApp (${BRAND.phoneDisplay})`}
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR GALLERY PHOTOS */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
          id="tour-detail-lightbox"
        >
          {/* Top Bar */}
          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-mono text-xs text-gold-400 font-bold tracking-widest uppercase">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
              <p className="font-serif text-sm md:text-lg text-gold-100 truncate">
                {experience.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label={lang === 'en' ? 'Close gallery' : 'Tutup galeri'}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-gold-400/30 hover:border-gold-400 text-gold-200 hover:text-gold-400 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative flex-grow flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous photo"
                className="absolute left-2 md:left-4 z-10 w-11 h-11 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-gold-400/35 hover:border-gold-400 text-gold-200 hover:text-gold-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <img
              src={galleryImages[lightboxIndex]}
              alt={`${experience.title} - ${lightboxIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full w-auto object-contain rounded-lg border border-gold-400/20 shadow-2xl"
            />

            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
                }
                aria-label="Next photo"
                className="absolute right-2 md:right-4 z-10 w-11 h-11 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-gold-400/35 hover:border-gold-400 text-gold-200 hover:text-gold-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div
              className="flex items-center justify-center gap-2.5 overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-thumb-${idx}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    idx === lightboxIndex
                      ? 'border-gold-400 scale-105'
                      : 'border-gold-400/20 opacity-55 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
