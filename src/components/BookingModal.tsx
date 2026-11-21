import React, { useState, useEffect } from 'react';
import {
  X, Check, Calendar, Users, ArrowRight, ShieldCheck,
  Sparkles, Printer, Copy, AlertTriangle,
  MessageCircle, ExternalLink
} from 'lucide-react';
import { BookingDetails } from '../types';
import { getExperiences, getBookingAddons, formatPrice, getTierPricePerPerson, getAddonPrice } from '../data';
import { BRAND, useLanguage } from '../i18n';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperienceId?: string;
  onBookingSuccess: (booking: BookingDetails) => void;
}

interface Participant {
  name: string;
  ageCategory: 'Adult' | 'Child';
}

export default function BookingModal({
  isOpen,
  onClose,
  initialExperienceId,
  onBookingSuccess,
}: BookingModalProps) {
  const { lang } = useLanguage();
  const experiences = getExperiences(lang);
  const bookingAddons = getBookingAddons(lang);

  const [step, setStep] = useState<'details' | 'payment_gateway' | 'success'>('details');

  // Booking fields state
  const [selectedExpId, setSelectedExpId] = useState(initialExperienceId || experiences[0].id);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const [dateWarning, setDateWarning] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', ageCategory: 'Adult' },
    { name: '', ageCategory: 'Adult' },
  ]);

  const [copied, setCopied] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    if (initialExperienceId) {
      setSelectedExpId(initialExperienceId);
    }
  }, [initialExperienceId, isOpen]);

  useEffect(() => {
    setParticipants((prev) => {
      const next = [...prev];
      if (next.length < guests) {
        while (next.length < guests) {
          next.push({ name: '', ageCategory: 'Adult' });
        }
      } else if (next.length > guests) {
        return next.slice(0, guests);
      }
      return next;
    });
  }, [guests]);

  useEffect(() => {
    setDateWarning(null);
  }, [date, lang]);

  if (!isOpen) return null;

  const currentExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];
  const currency = currentExp.currency || 'USD';
  const maxPeople = currentExp.maxPeople || 12;

  const activeUnitPrice = getTierPricePerPerson(currentExp, guests, false);
  const basePrice = activeUnitPrice * guests;
  const addonsPrice = bookingAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + getAddonPrice(addon, currency), 0);
  const subtotal = basePrice + addonsPrice;
  const grandTotal = subtotal;

  const handleAddonToggle = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: any) => {
    setParticipants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validateDetails = () => {
    if (!date) {
      setFormError(
        lang === 'en'
          ? 'Please choose your preferred tour date.'
          : 'Mohon pilih tanggal tur pribadi Anda.'
      );
      return false;
    }
    if (dateWarning) {
      setFormError(
        lang === 'en'
          ? 'The selected date is unavailable. Please pick another date.'
          : 'Tanggal yang dipilih sedang penuh. Silakan pilih tanggal lain.'
      );
      return false;
    }
    if (!fullName.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter the primary guest name.'
          : 'Mohon masukkan nama pemesan utama.'
      );
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Mohon masukkan alamat email yang valid.'
      );
      return false;
    }
    if (!phone.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your active WhatsApp phone number.'
          : 'Mohon masukkan nomor WhatsApp aktif Anda.'
      );
      return false;
    }

    for (let i = 0; i < participants.length; i++) {
      if (!participants[i].name.trim()) {
        setFormError(
          lang === 'en'
            ? `Please complete the full name for Guest #${i + 1}.`
            : `Mohon lengkapi nama untuk Peserta #${i + 1}.`
        );
        return false;
      }
    }

    setFormError(null);
    return true;
  };

  const generateWhatsAppMessage = () => {
    const chosenAddons = bookingAddons
      .filter((addon) => selectedAddons.includes(addon.id))
      .map((a) => `• ${a.name} (+${formatPrice(getAddonPrice(a, currency), currency)})`)
      .join('\n');

    const participantsList = participants
      .map((p, i) => `  ${i + 1}. ${p.name} (${getAgeLabel(p.ageCategory)})`)
      .join('\n');

    const formattedTotal = formatPrice(grandTotal, currency);

    if (lang === 'en') {
      return `*TOUR RESERVATION - ${BRAND.name.toUpperCase()}*
---------------------------------------
*Tour Package:* ${currentExp.title}
*Tour Date:* ${date}
*Guests:* ${guests} Person(s) (${formatPrice(activeUnitPrice, currency)}/orang)

*PRIMARY CONTACT:*
• Name: ${fullName}
• Email: ${email}
• WhatsApp: ${phone}

*GUEST LIST (E-TICKET):*
${participantsList}

${chosenAddons ? `*VIP ADD-ONS:*\n${chosenAddons}\n\n` : ''}*SPECIAL NOTES:*
${specialNotes || '-'}

---------------------------------------
*NET TOTAL:* ${formattedTotal} (Includes Government Tax)
---------------------------------------

Hello ${BRAND.name} Team, I would like to confirm availability and booking details for the tour above. Thank you!`;
    }

    return `*RESERVASI TOUR - ${BRAND.name.toUpperCase()}*
---------------------------------------
*Paket Tour:* ${currentExp.title}
*Tanggal Trip:* ${date}
*Jumlah Peserta:* ${guests} Orang (${formatPrice(activeUnitPrice, currency)}/orang)

*PEMESAN UTAMA:*
• Nama: ${fullName}
• Email: ${email}
• No. WhatsApp: ${phone}

*DAFTAR PESERTA (E-TICKET):*
${participantsList}

${chosenAddons ? `*LAYANAN TAMBAHAN (ADD-ONS):*\n${chosenAddons}\n\n` : ''}*CATATAN KHUSUS:*
${specialNotes || '-'}

---------------------------------------
*TOTAL HARGA BERSIH:* ${formattedTotal} (Sudah Termasuk Pajak)
---------------------------------------

Halo Tim ${BRAND.name}, saya ingin mengonfirmasi ketersediaan dan pemesanan untuk paket tour di atas. Terima kasih!`;
  };

  const getAgeLabel = (cat: 'Adult' | 'Child') => {
    if (lang === 'en') return cat;
    return cat === 'Adult' ? 'Dewasa' : 'Anak';
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment_gateway');
    }
  };

  const handleFinalizeBooking = () => {
    const waText = generateWhatsAppMessage();
    const bookingCode = `GUT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingObj = {
      id: `booking-${Date.now()}`,
      experienceId: selectedExpId,
      date,
      guests,
      addons: selectedAddons,
      fullName,
      email,
      phone,
      specialNotes,
      participants,
      totalPrice: grandTotal,
      bookingCode,
      paymentMethod: `WhatsApp Concierge (${BRAND.phoneDisplay})`,
      waMessage: waText,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(bookingObj);
    setStep('success');
    onBookingSuccess(bookingObj as any);
  };

  const handleReset = () => {
    setStep('details');
    setDate('');
    setGuests(2);
    setSelectedAddons([]);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialNotes('');
    setFormError(null);
    setParticipants([
      { name: '', ageCategory: 'Adult' },
      { name: '', ageCategory: 'Adult' },
    ]);
    setConfirmedBooking(null);
    onClose();
  };

  const currentWaUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    confirmedBooking?.waMessage || generateWhatsAppMessage()
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-stone-950/75 backdrop-blur-sm animate-fade-in text-stone-900 font-sans">
      <div
        id="booking-modal-container"
        className="relative bg-[#FAF7F2] border border-stone-200 w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[92vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
          <div className="flex items-center space-x-2.5">
            <Sparkles size={16} className="text-gold-600" />
            <h2 className="font-serif text-lg text-stone-900 tracking-wide font-semibold">
              {step === 'details' && (lang === 'en' ? 'VIP Tour Reservation' : 'Reservasi Paket Tour VIP')}
              {step === 'payment_gateway' && (lang === 'en' ? 'Confirm via Official WhatsApp' : 'Konfirmasi via WhatsApp Resmi')}
              {step === 'success' && (lang === 'en' ? 'Official E-Ticket & Reservation Voucher' : 'E-Tiket & Voucher Resmi Konfirmasi')}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="text-stone-500 hover:text-gold-700 transition-colors p-1 cursor-pointer"
            aria-label={lang === 'en' ? 'Close' : 'Tutup'}
            id="btn-close-booking"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">

          {/* STEP 1: SPECIFICATION & DETAILS ENTRY */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="form-booking-details">
              
              {/* Left Column Form inputs */}
              <div className="lg:col-span-7 space-y-6">
                
                {formError && (
                  <div className="bg-red-50 border border-red-200 p-3.5 rounded-md text-left text-xs text-red-800 flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}

                {/* Select Package Dropdown */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs uppercase tracking-widest text-stone-700 font-semibold font-mono">
                    {lang === 'en' ? 'Select Exclusive Tour Package' : 'Pilih Paket Perjalanan Eksklusif'}
                  </label>
                  <select
                    value={selectedExpId}
                    onChange={(e) => {
                      setSelectedExpId(e.target.value);
                      setSelectedAddons([]);
                    }}
                    id="booking-select-experience"
                    className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans cursor-pointer"
                  >
                    {experiences.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} — {formatPrice(exp.pricePerPerson, exp.currency || 'USD')}/orang
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Guest Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-stone-700 font-semibold font-mono flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold-600" />
                      <span>{lang === 'en' ? 'Select Date' : 'Pilih Tanggal'}</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="booking-input-date"
                      className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 font-sans [color-scheme:light] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-stone-700 font-semibold font-mono flex items-center gap-1.5">
                      <Users size={13} className="text-gold-600" />
                      <span>{lang === 'en' ? 'Number of Guests' : 'Jumlah Peserta'}</span>
                    </label>
                    <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="px-4 py-3 text-stone-700 hover:text-gold-700 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-sm font-semibold text-stone-900 font-mono">
                        {guests} {lang === 'en' ? (guests === 1 ? 'Guest' : 'Guests') : 'Orang'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(maxPeople, guests + 1))}
                        className="px-4 py-3 text-stone-700 hover:text-gold-700 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {dateWarning && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-md text-left text-xs text-red-800 flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{dateWarning}</p>
                  </div>
                )}

                {/* DYNAMIC PARTICIPANTS FORM FIELDS */}
                <div className="space-y-4 pt-4 border-t border-stone-200 text-left">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs uppercase tracking-widest text-stone-900 font-bold font-mono">
                      {lang === 'en'
                        ? `Guest Roster Details (${guests} ${guests === 1 ? 'Guest' : 'Guests'})`
                        : `Data Informasi Seluruh Peserta (${guests} Orang)`}
                    </h3>
                    <span className="text-[10px] font-mono text-gold-700 font-semibold">
                      {lang === 'en' ? 'REQUIRED' : 'WAJIB DIISI'}
                    </span>
                  </div>

                  <div className="space-y-4" id="participants-data-fields">
                    {participants.map((part, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-stone-200 p-4 rounded-md space-y-3 relative shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs font-bold text-gold-700">
                            {lang === 'en'
                              ? `Guest #${idx + 1} ${idx === 0 ? '(Lead Traveler)' : ''}`
                              : `Peserta #${idx + 1} ${idx === 0 ? '(Kontak Utama)' : ''}`}
                          </span>
                          
                          <div className="flex gap-2">
                            {(['Adult', 'Child'] as const).map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => handleParticipantChange(idx, 'ageCategory', cat)}
                                className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                                  part.ageCategory === cat
                                    ? 'bg-gold-600 text-white border-gold-600'
                                    : 'bg-[#FAF7F2] text-stone-600 border-stone-300 hover:border-gold-600'
                                }`}
                              >
                                {getAgeLabel(cat)}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder={
                              lang === 'en'
                                ? `Full Name of Guest #${idx + 1}`
                                : `Nama Lengkap Peserta #${idx + 1}`
                            }
                            value={part.name}
                            onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-stone-300 px-3 py-2.5 text-xs text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 placeholder-stone-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Guest Contact details */}
                <div className="space-y-4 pt-4 border-t border-stone-200 text-left">
                  <h3 className="text-xs uppercase tracking-widest text-stone-900 font-bold font-mono">
                    {lang === 'en'
                      ? 'Primary Contact & E-Ticket Delivery'
                      : 'Informasi Kontak Pemesan & Pengiriman E-Tiket'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'Lead Traveler Full Name' : 'Nama Pemesan Utama'}
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (participants[0]) {
                          handleParticipantChange(0, 'name', e.target.value);
                        }
                      }}
                      className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 placeholder-stone-400"
                    />
                    <input
                      type="email"
                      required
                      placeholder={lang === 'en' ? 'Email Address (for E-Ticket)' : 'Alamat Email (untuk E-Tiket)'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 placeholder-stone-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'en' ? 'Active WhatsApp Number' : 'Nomor WhatsApp Utama (aktif)'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 placeholder-stone-400"
                    />
                    <input
                      type="text"
                      placeholder={
                        lang === 'en'
                          ? 'Special Requests (Hotel pickup, dietary, etc.)'
                          : 'Permintaan Khusus (Hotel jemput, diet, dll.)'
                      }
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 placeholder-stone-400"
                    />
                  </div>
                </div>

                {/* VIP Upgrades Checklist */}
                <div className="space-y-3 text-left">
                  <h3 className="text-xs uppercase tracking-widest text-stone-900 font-bold font-mono">
                    {lang === 'en' ? 'Optional VIP Upgrades' : 'Peningkatan Premium (VIP Upgrades)'}
                  </h3>
                  <div className="space-y-3">
                    {bookingAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleAddonToggle(addon.id)}
                          className={`flex items-start justify-between p-4 border rounded-md transition-all duration-300 cursor-pointer ${
                            isChecked
                              ? 'bg-gold-50 border-gold-600 shadow-sm'
                              : 'bg-white border-stone-200 hover:border-gold-500'
                          }`}
                        >
                          <div className="flex items-start space-x-3 pr-4">
                            <div
                              className={`mt-1 w-4 h-4 rounded-sm border flex items-center justify-center transition-all flex-shrink-0 ${
                                isChecked ? 'bg-gold-600 border-gold-600 text-white' : 'border-stone-300 bg-[#FAF7F2]'
                              }`}
                            >
                              {isChecked && <Check size={12} className="stroke-[3]" />}
                            </div>
                            <div className="text-left">
                              <h4 className="font-serif text-sm text-stone-900 font-semibold">
                                {addon.name}
                              </h4>
                              <p className="font-sans text-[11px] text-stone-600 leading-relaxed mt-0.5">
                                {addon.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-semibold text-gold-700 flex-shrink-0">
                            +{formatPrice(getAddonPrice(addon, currency), currency)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Panel Summary Invoice */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-xl flex flex-col justify-between h-fit lg:sticky lg:top-4 text-left shadow-sm">
                <div>
                  <h3 className="font-serif text-lg text-stone-900 border-b border-stone-200 pb-3 mb-4 font-semibold tracking-wide">
                    {lang === 'en' ? 'Reservation Summary' : 'Rincian Pembayaran'}
                  </h3>

                  <div className="flex items-center space-x-3 mb-6 bg-[#FAF7F2] p-3 border border-stone-200 rounded-md">
                    <img
                      src={currentExp.cardImage}
                      alt={currentExp.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover rounded-sm border border-stone-200 flex-shrink-0"
                    />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-700 font-bold">
                        {lang === 'en' ? 'Private Experience' : 'Pengalaman Privat'}
                      </p>
                      <h4 className="font-serif text-sm text-stone-900 font-semibold leading-tight">{currentExp.title}</h4>
                      <p className="font-sans text-[11px] text-stone-600 mt-0.5">{currentExp.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center text-stone-600">
                      <span>
                        {lang === 'en'
                          ? `Group Rate (${guests} x ${formatPrice(activeUnitPrice, currency)})`
                          : `Tarif Grup (${guests} x ${formatPrice(activeUnitPrice, currency)})`}
                      </span>
                      <span className="font-mono text-stone-900 font-semibold">{formatPrice(basePrice, currency)}</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-stone-200">
                        <span className="text-[10px] uppercase font-mono text-gold-700 font-bold tracking-wider block">
                          {lang === 'en' ? 'VIP Add-Ons' : 'Upgrade Tambahan'}
                        </span>
                        {bookingAddons
                          .filter((addon) => selectedAddons.includes(addon.id))
                          .map((addon) => (
                            <div key={addon.id} className="flex justify-between items-start text-xs text-stone-600 pl-2">
                              <span>{addon.name}</span>
                              <span className="font-mono text-stone-900 font-semibold">
                                +{formatPrice(getAddonPrice(addon, currency), currency)}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-stone-600 pt-4 border-t border-stone-200">
                      <span>Subtotal</span>
                      <span className="font-mono text-stone-900 font-semibold">{formatPrice(subtotal, currency)}</span>
                    </div>

                    <div className="flex justify-between items-center text-stone-600">
                      <span>{lang === 'en' ? 'Government Tax' : 'Pajak Pemerintah'}</span>
                      <span className="font-mono text-emerald-700 text-xs font-semibold">
                        {lang === 'en' ? 'Included (Net)' : 'Termasuk (Net)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-stone-200">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-serif text-base text-stone-900 font-semibold">
                      {lang === 'en' ? 'Net Total' : 'Total Bersih'}
                    </span>
                    <span className="font-mono text-2xl md:text-3xl text-gold-700 font-bold">
                      {formatPrice(grandTotal, currency)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!!dateWarning}
                    id="btn-confirm-details"
                    className={`w-full font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 ${
                      dateWarning
                        ? 'bg-stone-200 text-stone-400 border border-stone-300 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    <MessageCircle size={16} />
                    <span>{lang === 'en' ? 'Review & Send via WhatsApp' : 'Tinjau & Kirim ke WhatsApp'}</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[9px] text-stone-500 font-mono mt-4">
                    <ShieldCheck size={12} className="text-emerald-700" />
                    <span>{`${BRAND.name.toUpperCase()} DIRECT RESERVATION DESK`}</span>
                  </div>
                </div>
              </div>

            </form>
          )}

          {/* STEP 2: WHATSAPP DIRECT BOOKING PREVIEW */}
          {step === 'payment_gateway' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left" id="form-booking-payment">
              
              {/* Left Column WhatsApp Instructions & Preview */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start space-x-4">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full flex-shrink-0 mt-0.5">
                    <MessageCircle size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg text-emerald-900 font-semibold">
                      {lang === 'en'
                        ? 'Direct Booking via Official WhatsApp'
                        : 'Konfirmasi & Pembayaran via WhatsApp'}
                    </h3>
                    <p className="font-sans text-xs text-emerald-800 leading-relaxed">
                      {lang === 'en'
                        ? `Your ${BRAND.name} reservation details are formatted below. Click the green button to send directly to our official WhatsApp concierge (${BRAND.phoneDisplay}) and generate your e-voucher.`
                        : `Detail pemesanan ${BRAND.name} Anda telah diformat rapi di bawah ini. Klik tombol hijau untuk mengirim langsung ke WhatsApp resmi kami (${BRAND.phoneDisplay}) dan menerbitkan e-voucher Anda.`}
                    </p>
                  </div>
                </div>

                {/* Formatted Message Preview Card */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-widest text-stone-700 font-semibold font-mono">
                      {lang === 'en' ? 'WhatsApp Booking Summary Preview' : 'Pratinjau Format Pesanan WhatsApp'}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generateWhatsAppMessage());
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-[10px] font-mono uppercase tracking-wider text-gold-700 hover:text-stone-900 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      {copied ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                      <span>
                        {copied
                          ? (lang === 'en' ? 'Copied!' : 'Teks Tersalin!')
                          : (lang === 'en' ? 'Copy Message' : 'Salin Format Teks')}
                      </span>
                    </button>
                  </div>

                  <div className="bg-white p-4 border border-stone-200 rounded-md font-mono text-[11px] text-stone-800 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto select-text shadow-sm">
                    {generateWhatsAppMessage()}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href={currentWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleFinalizeBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest font-bold py-4 rounded-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    id="btn-whatsapp-direct"
                  >
                    <MessageCircle size={18} className="fill-current" />
                    <span>
                      {lang === 'en'
                        ? `Send Booking to WhatsApp (${BRAND.phoneDisplay})`
                        : `Kirim Pesanan ke WhatsApp (${BRAND.phoneDisplay})`}
                    </span>
                    <ExternalLink size={14} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="w-full bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest py-3 rounded-sm transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Edit Reservation Details' : 'Ubah Data Pemesanan'}
                  </button>
                </div>

                {/* Official Bank Transfer Reference */}
                <div className="bg-white border border-stone-200 p-4 rounded-md space-y-3 text-xs shadow-sm">
                  <h4 className="font-serif text-stone-900 font-semibold">
                    {lang === 'en'
                      ? `Official ${BRAND.name} Payment Accounts:`
                      : `Rekening Pembayaran Resmi ${BRAND.name}:`}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                    <div className="bg-[#FAF7F2] p-2.5 rounded border border-stone-200">
                      <p className="text-gold-700 font-bold">BCA</p>
                      <p className="text-stone-900 font-semibold">3901 0811 3456</p>
                      <p className="text-stone-500 text-[8px]">{BRAND.name}</p>
                    </div>
                    <div className="bg-[#FAF7F2] p-2.5 rounded border border-stone-200">
                      <p className="text-gold-700 font-bold">MANDIRI</p>
                      <p className="text-stone-900 font-semibold">8801 2811 3456</p>
                      <p className="text-stone-500 text-[8px]">{BRAND.name}</p>
                    </div>
                    <div className="bg-[#FAF7F2] p-2.5 rounded border border-stone-200">
                      <p className="text-gold-700 font-bold">BNI</p>
                      <p className="text-stone-900 font-semibold">9801 4081 1345</p>
                      <p className="text-stone-500 text-[8px]">{BRAND.name}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-[10px] font-sans">
                    {lang === 'en'
                      ? `*Note: Our concierge will confirm date availability first via WhatsApp (${BRAND.phoneDisplay}) before any payment is required.`
                      : `*Catatan: Tim concierge kami akan mengonfirmasi ketersediaan tanggal terlebih dahulu melalui WhatsApp (${BRAND.phoneDisplay}) sebelum transfer dilakukan.`}
                  </p>
                </div>

              </div>

              {/* Right Column Checkout summary */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-xl flex flex-col justify-between h-fit lg:sticky lg:top-4 shadow-sm">
                <div className="space-y-6">
                  <h3 className="font-serif text-lg text-stone-900 border-b border-stone-200 pb-3 mb-4 font-semibold tracking-wide">
                    {lang === 'en' ? 'Tour Summary' : 'Ringkasan Reservasi Tour'}
                  </h3>

                  <div className="space-y-4 text-xs font-mono text-stone-600">
                    <div className="flex justify-between gap-4">
                      <span>{lang === 'en' ? 'Package:' : 'Paket Tur:'}</span>
                      <span className="text-stone-900 font-bold font-serif text-right">{currentExp.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'en' ? 'Date:' : 'Tanggal:'}</span>
                      <span className="text-stone-900 font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'en' ? 'Guests:' : 'Peserta:'}</span>
                      <span className="text-stone-900 font-bold">
                        {guests} {lang === 'en' ? (guests === 1 ? 'Guest' : 'Guests') : 'Orang'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-stone-200 pt-4">
                      <span>Subtotal:</span>
                      <span className="text-stone-900 font-bold">{formatPrice(subtotal, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'en' ? 'Government Tax:' : 'Pajak Pemerintah:'}</span>
                      <span className="text-emerald-700 font-bold">
                        {lang === 'en' ? 'Included (Net)' : 'Termasuk (Net)'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-stone-200 pt-4 text-sm font-sans">
                      <span className="font-serif text-stone-900 font-semibold">Net Total:</span>
                      <span className="font-mono text-lg text-gold-700 font-extrabold">
                        {formatPrice(grandTotal, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-stone-200 mt-8 space-y-3">
                  <a
                    href={currentWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleFinalizeBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest font-bold py-4 rounded-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    id="btn-submit-payment"
                  >
                    <MessageCircle size={16} />
                    <span>{lang === 'en' ? 'Continue to WhatsApp' : 'Lanjutkan ke WhatsApp'}</span>
                  </a>

                  <div className="flex items-center justify-center space-x-2 text-[9px] text-stone-500 font-mono">
                    <ShieldCheck size={12} className="text-emerald-700" />
                    <span>{`DIRECT OFFICIAL WHATSAPP: ${BRAND.phoneDisplay}`}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS OFFICIAL E-TICKET & VOUCHER */}
          {step === 'success' && confirmedBooking && (
            <div className="space-y-8 text-left animate-fade-in" id="booking-success-layout">
              
              {/* Congratulations Header Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 md:p-8 text-center space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-emerald-900 font-medium tracking-wide">
                    {lang === 'en' ? 'Reservation Prepared for WhatsApp' : 'Pemesanan Siap Dikirim ke WhatsApp'}
                  </h3>
                  <p className="text-emerald-800 text-xs md:text-sm font-sans max-w-xl mx-auto leading-relaxed">
                    {lang === 'en'
                      ? `Your reservation voucher has been issued. If WhatsApp did not open automatically, click the button below to message ${BRAND.phoneDisplay} or copy your booking details.`
                      : `Voucher reservasi Anda telah diterbitkan. Jika WhatsApp belum terbuka otomatis, silakan klik tombol di bawah untuk mengirim pesan ke ${BRAND.phoneDisplay} atau salin detail pesanan.`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={currentWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>
                      {lang === 'en'
                        ? `Open WhatsApp (${BRAND.phoneDisplay})`
                        : `Buka WhatsApp (${BRAND.phoneDisplay})`}
                    </span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(confirmedBooking.waMessage || generateWhatsAppMessage());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                    <span>
                      {copied
                        ? (lang === 'en' ? 'Copied!' : 'Teks Tersalin!')
                        : (lang === 'en' ? 'Copy WA Message' : 'Salin Pesan WA')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Printable Luxury Voucher */}
              <div
                id="printable-luxury-voucher"
                className="bg-white border border-stone-200 rounded-xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-sm"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a75f_1px,transparent_1px),linear-gradient(to_bottom,#c5a75f_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.04]" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-200 pb-6">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-12 h-12 rounded-sm overflow-hidden bg-[#FAF7F2] border border-stone-200 p-1 flex items-center justify-center flex-shrink-0">
                        <img
                          src={BRAND.logoUrl}
                          alt={`${BRAND.name} Logo`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="font-serif text-2xl text-stone-900 font-bold tracking-widest uppercase">
                          {BRAND.name}
                        </span>
                        <span className="block text-[9px] font-mono tracking-[0.25em] text-gold-700 uppercase font-bold mt-0.5">
                          {lang === 'en' ? 'EXCLUSIVE PRIVATE TOUR & TRANSPORT' : 'LAYANAN TOUR PRIVAT & TRANSPORTASI'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#FAF7F2] p-2 rounded-sm border border-gold-500 flex items-center gap-3">
                      <div className="w-16 h-16 bg-[radial-gradient(#1c1917_2px,transparent_2px)] bg-[size:6px_6px]" />
                      <div className="text-left font-mono">
                        <span className="text-[8px] text-stone-500 block uppercase leading-none">VOUCHER CODE</span>
                        <span className="text-xs text-stone-900 font-bold block">{confirmedBooking.bookingCode}</span>
                        <span className="text-[8px] text-emerald-700 font-bold block mt-1">PENDING WA CONFIRM</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Tour Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-stone-500 block uppercase tracking-wider">
                        {lang === 'en' ? 'SELECTED PACKAGE' : 'PAKET PILIHAN'}
                      </span>
                      <span className="text-stone-900 font-serif font-bold text-sm block">{currentExp.title}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-500 block uppercase tracking-wider">
                        {lang === 'en' ? 'TOUR DATE' : 'TANGGAL TRIP'}
                      </span>
                      <span className="text-stone-900 text-sm font-bold block">{confirmedBooking.date}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-500 block uppercase tracking-wider">
                        {lang === 'en' ? 'LEAD GUEST' : 'PEMESAN UTAMA'}
                      </span>
                      <span className="text-stone-900 text-sm font-bold block">{confirmedBooking.fullName}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-500 block uppercase tracking-wider">
                        {lang === 'en' ? 'BOOKING CHANNEL' : 'METODE PESAN'}
                      </span>
                      <span className="text-stone-900 text-sm font-bold block">{confirmedBooking.paymentMethod}</span>
                    </div>
                  </div>

                  {/* PARTICIPANTS TICKETS GRID */}
                  <div className="space-y-4 pt-6 border-t border-stone-200">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold-700 font-bold">
                      {lang === 'en'
                        ? 'REGISTERED PASSENGER ROSTER (E-TICKET HOLDER)'
                        : 'DAFTAR NAMA PESERTA TERDAFTAR (E-TICKET HOLDER)'}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="success-participants-list">
                      {confirmedBooking.participants.map((part: Participant, i: number) => (
                        <div key={i} className="bg-[#FAF7F2] p-4 border border-stone-200 rounded flex flex-col justify-between">
                          <div className="text-left space-y-1">
                            <span className="text-[8px] font-mono text-stone-500 uppercase">PASS HOLDER #{i + 1}</span>
                            <p className="font-serif text-sm text-stone-900 font-bold">{part.name}</p>
                          </div>
                          <span className="inline-block mt-3 px-2 py-0.5 bg-white border border-gold-500/40 rounded text-[8px] font-mono font-bold text-gold-700 uppercase w-fit">
                            {getAgeLabel(part.ageCategory)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights and guidelines */}
                  <div className="bg-[#FAF7F2] p-5 border border-stone-200 rounded-sm text-left grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans text-stone-600 leading-relaxed">
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-stone-900">
                        {lang === 'en' ? 'Important Pickup Information:' : 'Informasi Penting Penjemputan:'}
                      </h5>
                      <p>
                        {lang === 'en'
                          ? `• Your private chauffeur will meet you in your hotel lobby at the scheduled departure time.`
                          : `• Supir VIP pribadi Anda akan menjemput di lobi hotel akomodasi sesuai jadwal keberangkatan.`}
                      </p>
                      <p>
                        {lang === 'en'
                          ? `• Our concierge will reconfirm pickup timing via WhatsApp (${BRAND.phoneDisplay}) 24 hours prior.`
                          : `• Tim concierge kami akan menghubungi via WhatsApp (${BRAND.phoneDisplay}) 1 hari sebelum perjalanan.`}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-stone-900">
                        {lang === 'en' ? 'Private Tour Comfort:' : 'Fasilitas Perjalanan:'}
                      </h5>
                      <p>
                        {lang === 'en'
                          ? '• Air-conditioned private vehicle, English-speaking driver, chilled water, and listed inclusions apply (attraction entrance tickets are excluded).'
                          : '• Mobil privat ber-AC, driver berpengalaman, air mineral, dan fasilitas sesuai paket tersedia (tidak termasuk tiket masuk objek wisata).'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? '• Please bring comfortable attire, swimwear, sunglasses, or sunscreen tailored to your itinerary.'
                          : '• Silakan siapkan pakaian santai, baju renang, kacamata hitam, atau pelindung matahari sesuai paket Anda.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-stone-200">
                    <span className="font-mono text-[9px] text-stone-500 uppercase">
                      {lang === 'en' ? 'Net Total Invoice' : 'Total Invoice Bersih'}
                    </span>
                    <span className="font-mono text-xl font-bold text-gold-700">
                      {formatPrice(confirmedBooking.totalPrice, currency)}
                    </span>
                  </div>

                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>{lang === 'en' ? 'Print E-Ticket' : 'Cetak E-Tiket (Print)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-sm transition-all cursor-pointer"
                >
                  {lang === 'en' ? 'Return Home' : 'Kembali ke Beranda'}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
