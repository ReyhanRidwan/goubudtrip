import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Clock,
  Car,
  Users,
  Calendar,
  MapPin,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  Compass,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { SubmittedBooking } from '../types';
import { formatPrice } from '../data';
import { BRAND, useLanguage } from '../i18n';

interface CustomTourSectionProps {
  onSubmitEmailBooking: (booking: SubmittedBooking) => void;
  isStandalonePage?: boolean;
  onBackHome?: () => void;
}

interface SpotOption {
  id: string;
  category: 'culture' | 'nature' | 'activity';
  nameEn: string;
  nameId: string;
  area: string;
}

interface DurationOption {
  id: 'half-day' | 'full-day' | 'extended-day';
  labelEn: string;
  labelId: string;
  hoursEn: string;
  hoursId: string;
  basePriceUsd: number;
  recommendedStops: number;
}

interface VehicleOption {
  id: 'mpv' | 'innova' | 'hiace';
  labelEn: string;
  labelId: string;
  capacityEn: string;
  capacityId: string;
  addonPriceUsd: number;
}

interface CustomAddonOption {
  id: string;
  labelEn: string;
  labelId: string;
  priceUsd: number;
}

const SPOT_OPTIONS: SpotOption[] = [
  // Ubud Culture & Temples
  {
    id: 'tirta-empul',
    category: 'culture',
    nameEn: 'Tirta Empul Water Purification Temple',
    nameId: 'Pura Tirta Empul (Ritual Melukat)',
    area: 'Tampaksiring, Ubud',
  },
  {
    id: 'monkey-forest',
    category: 'culture',
    nameEn: 'Sacred Monkey Forest Sanctuary',
    nameId: 'Sacred Monkey Forest Ubud',
    area: 'Ubud Center',
  },
  {
    id: 'ubud-palace-market',
    category: 'culture',
    nameEn: 'Ubud Royal Palace & Art Market',
    nameId: 'Puri Saren & Pasar Seni Ubud',
    area: 'Ubud Center',
  },
  {
    id: 'goa-gajah',
    category: 'culture',
    nameEn: 'Goa Gajah (Elephant Cave)',
    nameId: 'Goa Gajah (Situs Purbakala)',
    area: 'Bedulu, Ubud',
  },
  {
    id: 'celuk-village',
    category: 'culture',
    nameEn: 'Celuk Silver & Gold Craft Village',
    nameId: 'Desa Pengrajin Perak & Emas Celuk',
    area: 'Sukawati, Gianyar',
  },
  {
    id: 'taman-ayun',
    category: 'culture',
    nameEn: 'Taman Ayun Royal Temple',
    nameId: 'Pura Taman Ayun Mengwi',
    area: 'Mengwi',
  },
  // Waterfalls & Nature
  {
    id: 'tegalalang',
    category: 'nature',
    nameEn: 'Tegalalang Rice Terraces',
    nameId: 'Terasering Sawah Tegalalang',
    area: 'Tegallalang, Ubud',
  },
  {
    id: 'tegenungan',
    category: 'nature',
    nameEn: 'Tegenungan Waterfall',
    nameId: 'Air Terjun Tegenungan',
    area: 'Gianyar, Ubud',
  },
  {
    id: 'kanto-lampo',
    category: 'nature',
    nameEn: 'Kanto Lampo Waterfall',
    nameId: 'Air Terjun Kanto Lampo',
    area: 'Gianyar',
  },
  {
    id: 'tibumana',
    category: 'nature',
    nameEn: 'Tibumana Hidden Waterfall',
    nameId: 'Air Terjun Tibumana',
    area: 'Bangli',
  },
  {
    id: 'nungnung',
    category: 'nature',
    nameEn: 'Nungnung Waterfall (70m)',
    nameId: 'Air Terjun Nungnung (70m)',
    area: 'Petang, Badung',
  },
  {
    id: 'luwak-coffee',
    category: 'nature',
    nameEn: 'Traditional Balinese Coffee Plantation',
    nameId: 'Perkebunan Kopi Luwak Bali',
    area: 'Ubud Highlands',
  },
  // Adventure & Wellness
  {
    id: 'jungle-swing',
    category: 'activity',
    nameEn: 'Ubud Jungle Swing & Bird Nests',
    nameId: 'Ubud Jungle Swing & Spot Foto',
    area: 'Tegallalang, Ubud',
  },
  {
    id: 'atv-mud',
    category: 'activity',
    nameEn: 'Ubud ATV Quad Bike (Mud Track)',
    nameId: 'Ubud ATV Quad Bike (Trek Lumpur)',
    area: 'Ubud Jungle',
  },
  {
    id: 'ayung-rafting',
    category: 'activity',
    nameEn: 'Ayung River White Water Rafting',
    nameId: 'Rafting Sungai Ayung Ubud',
    area: 'Ayung River, Ubud',
  },
  {
    id: 'jungle-buggy',
    category: 'activity',
    nameEn: 'Polaris Jungle Buggy Adventure',
    nameId: 'Petualangan Polaris Jungle Buggy',
    area: 'Ubud Highlands',
  },
  {
    id: 'balinese-spa',
    category: 'activity',
    nameEn: '1-Hour Traditional Balinese Spa',
    nameId: 'Spa & Pijat Tradisional Bali (1 Jam)',
    area: 'Ubud Spa',
  },
  {
    id: 'cooking-class',
    category: 'activity',
    nameEn: 'Authentic Balinese Cooking Class',
    nameId: 'Kelas Memasak Autentik Bali',
    area: 'Ubud Village',
  },
];

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: 'half-day',
    labelEn: 'Half Day Tour',
    labelId: 'Half Day Tour',
    hoursEn: '4–5 Hours Private Charter',
    hoursId: 'Tur Privat 4–5 Jam',
    basePriceUsd: 35,
    recommendedStops: 3,
  },
  {
    id: 'full-day',
    labelEn: 'Full Day Tour',
    labelId: 'Full Day Tour',
    hoursEn: '8–10 Hours Private Charter',
    hoursId: 'Tur Privat 8–10 Jam',
    basePriceUsd: 48,
    recommendedStops: 5,
  },
  {
    id: 'extended-day',
    labelEn: 'Extended Full Day',
    labelId: 'Full Day Ekstra',
    hoursEn: 'Up to 12 Hours Private Charter',
    hoursId: 'Tur Privat Hingga 12 Jam',
    basePriceUsd: 60,
    recommendedStops: 7,
  },
];

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'mpv',
    labelEn: 'Private Comfort MPV',
    labelId: 'MPV Privat Nyaman',
    capacityEn: 'Avanza / Xpander • Max 5 Guests',
    capacityId: 'Avanza / Xpander • Maks. 5 Orang',
    addonPriceUsd: 0,
  },
  {
    id: 'innova',
    labelEn: 'VIP Toyota Innova Reborn',
    labelId: 'VIP Toyota Innova Reborn',
    capacityEn: 'Luxury Cabin • Max 6 Guests',
    capacityId: 'Kabin Mewah • Maks. 6 Orang',
    addonPriceUsd: 22,
  },
  {
    id: 'hiace',
    labelEn: 'Group Toyota Hiace',
    labelId: 'Toyota Hiace Rombongan',
    capacityEn: 'Minibus • Max 14 Guests',
    capacityId: 'Minibus • Maks. 14 Orang',
    addonPriceUsd: 48,
  },
];

const CUSTOM_ADDONS: CustomAddonOption[] = [
  {
    id: 'licensed-guide',
    labelEn: 'Licensed English-Speaking Tour Guide',
    labelId: 'Pemandu Wisata Berlisensi (Inggris/ID)',
    priceUsd: 19,
  },
  {
    id: 'private-photographer',
    labelEn: 'Private Travel Photographer (50+ Photos)',
    labelId: 'Fotografer Perjalanan Pribadi (50+ Foto)',
    priceUsd: 48,
  },
  {
    id: 'drone-4k',
    labelEn: 'Cinematic 4K Drone Highlight',
    labelId: 'Video Drone Sinematik 4K',
    priceUsd: 60,
  },
];

const PICKUP_TIME_OPTIONS = ['07:30 AM', '08:30 AM', '09:30 AM', '10:30 AM', '01:00 PM'];

const DEFAULT_CUSTOM_IMAGE =
  'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795164645/6891ca5e-738a-4df3-9dea-defdfb13acc2.png';

export default function CustomTourSection({
  onSubmitEmailBooking,
  isStandalonePage = false,
  onBackHome,
}: CustomTourSectionProps) {
  const { lang } = useLanguage();

  const [selectedSpotIds, setSelectedSpotIds] = useState<string[]>([
    'tegalalang',
    'tirta-empul',
    'tegenungan',
  ]);
  const [customPlaces, setCustomPlaces] = useState<string[]>([]);
  const [customPlaceInput, setCustomPlaceInput] = useState('');
  const [activeSpotTab, setActiveSpotTab] = useState<'all' | 'culture' | 'nature' | 'activity'>('all');

  const [durationId, setDurationId] = useState<'half-day' | 'full-day' | 'extended-day'>('full-day');
  const [vehicleId, setVehicleId] = useState<'mpv' | 'innova' | 'hiace'>('mpv');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const [tourDate, setTourDate] = useState('');
  const [pickupTime, setPickupTime] = useState('08:30 AM');
  const [guests, setGuests] = useState(2);
  const [pickupAddress, setPickupAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const selectedDuration =
    DURATION_OPTIONS.find((d) => d.id === durationId) || DURATION_OPTIONS[1];
  const selectedVehicle =
    VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];
  const selectedAddons = CUSTOM_ADDONS.filter((a) => selectedAddonIds.includes(a.id));

  const addonsTotalUsd = selectedAddons.reduce((sum, a) => sum + a.priceUsd, 0);
  const estimatedTotalUsd =
    selectedDuration.basePriceUsd + selectedVehicle.addonPriceUsd + addonsTotalUsd;

  const getSpotName = (spotId: string) => {
    const found = SPOT_OPTIONS.find((s) => s.id === spotId);
    if (!found) return spotId;
    return lang === 'en' ? found.nameEn : found.nameId;
  };

  // Ordered combined list: store order as tokens `spot:<id>` or `custom:<label>`
  const combinedItineraryItems = [
    ...selectedSpotIds.map((id) => ({
      key: `spot:${id}`,
      label: getSpotName(id),
      isCustom: false,
      id,
    })),
    ...customPlaces.map((name, idx) => ({
      key: `custom:${idx}:${name}`,
      label: name,
      isCustom: true,
      id: name,
    })),
  ];

  const toggleSpot = (spotId: string) => {
    setSelectedSpotIds((prev) =>
      prev.includes(spotId) ? prev.filter((id) => id !== spotId) : [...prev, spotId]
    );
    if (formError) setFormError(null);
  };

  const handleAddCustomPlace = () => {
    const trimmed = customPlaceInput.trim();
    if (!trimmed) return;
    if (!customPlaces.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      setCustomPlaces((prev) => [...prev, trimmed]);
    }
    setCustomPlaceInput('');
    if (formError) setFormError(null);
  };

  const handleRemoveItineraryItem = (item: { isCustom: boolean; id: string }) => {
    if (item.isCustom) {
      setCustomPlaces((prev) => prev.filter((p) => p !== item.id));
    } else {
      setSelectedSpotIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const moveSpot = (index: number, direction: -1 | 1) => {
    // Only reorder preset spots smoothly; if custom places exist, move within respective array
    if (index < selectedSpotIds.length) {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= selectedSpotIds.length) return;
      setSelectedSpotIds((prev) => {
        const copy = [...prev];
        const temp = copy[index];
        copy[index] = copy[targetIndex];
        copy[targetIndex] = temp;
        return copy;
      });
    } else {
      const customIdx = index - selectedSpotIds.length;
      const targetCustomIdx = customIdx + direction;
      if (targetCustomIdx < 0 || targetCustomIdx >= customPlaces.length) return;
      setCustomPlaces((prev) => {
        const copy = [...prev];
        const temp = copy[customIdx];
        copy[customIdx] = copy[targetCustomIdx];
        copy[targetCustomIdx] = temp;
        return copy;
      });
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const applyPreset = (preset: 'classic' | 'adventure' | 'half-day-ubud' | 'clear') => {
    if (preset === 'clear') {
      setSelectedSpotIds([]);
      setCustomPlaces([]);
      return;
    }
    if (preset === 'classic') {
      setDurationId('full-day');
      setSelectedSpotIds([
        'tegenungan',
        'celuk-village',
        'monkey-forest',
        'tegalalang',
        'luwak-coffee',
      ]);
    } else if (preset === 'adventure') {
      setDurationId('full-day');
      setSelectedSpotIds(['atv-mud', 'ayung-rafting', 'jungle-swing', 'balinese-spa']);
    } else if (preset === 'half-day-ubud') {
      setDurationId('half-day');
      setSelectedSpotIds(['tegalalang', 'jungle-swing', 'tirta-empul']);
    }
  };

  const visibleSpots =
    activeSpotTab === 'all'
      ? SPOT_OPTIONS
      : SPOT_OPTIONS.filter((s) => s.category === activeSpotTab);

  const buildSummaryStrings = (bookingCode: string) => {
    const stopsText =
      combinedItineraryItems.length > 0
        ? combinedItineraryItems.map((item, idx) => `${idx + 1}. ${item.label}`).join('\n')
        : lang === 'en'
        ? '- Flexible (Discuss with Driver)'
        : '- Fleksibel (Diskusi dengan Driver)';

    const addonsList = selectedAddons.map(
      (a) => `${lang === 'en' ? a.labelEn : a.labelId} (+${formatPrice(a.priceUsd, 'USD')})`
    );
    const formattedTotal = formatPrice(estimatedTotalUsd, 'USD');
    const durationTitle = lang === 'en' ? selectedDuration.labelEn : selectedDuration.labelId;
    const vehicleTitle = lang === 'en' ? selectedVehicle.labelEn : selectedVehicle.labelId;

    const waText =
      lang === 'en'
        ? `*CUSTOM TOUR PACKAGE REQUEST - ${BRAND.name.toUpperCase()}*
---------------------------------------
*Reference:* ${bookingCode}
*Trip Duration:* ${durationTitle} (${selectedDuration.hoursEn})
*Private Vehicle:* ${vehicleTitle} (${selectedVehicle.capacityEn})
*Preferred Date:* ${tourDate || 'Flexible'}
*Pickup Time:* ${pickupTime}
*Guests:* ${guests} Person(s)
*Hotel / Pickup Location:* ${pickupAddress.trim() || 'To be confirmed'}

*CUSTOM ROUTE / DESTINATIONS:*
${stopsText}

${addonsList.length > 0 ? `*OPTIONAL ADD-ONS:*\n${addonsList.map((x) => `• ${x}`).join('\n')}\n\n` : ''}*GUEST CONTACT:*
• Name: ${fullName.trim() || '-'}
• Email: ${email.trim() || '-'}
• WhatsApp: ${phone.trim() || '-'}
• Special Notes: ${notes.trim() || '-'}

---------------------------------------
*ESTIMATED BASE CHARTER:* ${formattedTotal}
_(Note: Entrance tickets & third-party activity fees are excluded unless requested separately)_
---------------------------------------

Hello ${BRAND.name} Team, I would like to request availability and a final quote for this customized tour itinerary!`
        : `*PERMINTAAN CUSTOM PAKET TOUR - ${BRAND.name.toUpperCase()}*
---------------------------------------
*Kode Referensi:* ${bookingCode}
*Durasi Paket:* ${durationTitle} (${selectedDuration.hoursId})
*Kendaraan Privat:* ${vehicleTitle} (${selectedVehicle.capacityId})
*Tanggal Tur:* ${tourDate || 'Fleksibel'}
*Jam Jemput:* ${pickupTime}
*Jumlah Peserta:* ${guests} Orang
*Hotel / Area Jemput:* ${pickupAddress.trim() || 'Akan dikonfirmasi'}

*RUTE / DESTINASI PILIHAN:*
${stopsText}

${addonsList.length > 0 ? `*LAYANAN TAMBAHAN:*\n${addonsList.map((x) => `• ${x}`).join('\n')}\n\n` : ''}*DATA PEMESAN:*
• Nama: ${fullName.trim() || '-'}
• Email: ${email.trim() || '-'}
• WhatsApp: ${phone.trim() || '-'}
• Catatan Khusus: ${notes.trim() || '-'}

---------------------------------------
*ESTIMASI TARIF DASAR CHARTER:* ${formattedTotal}
_(Catatan: Tarif dasar belum termasuk tiket masuk objek wisata / aktivitas berbayar)_
---------------------------------------

Halo Tim ${BRAND.name}, saya ingin mengajukan paket tour custom di atas dan menanyakan ketersediaan jadwal serta penawaran harga finalnya!`;

    const emailSubject =
      lang === 'en'
        ? `[${bookingCode}] Custom Tour Package Request (${durationTitle}) - ${fullName.trim() || 'Guest'}`
        : `[${bookingCode}] Permintaan Custom Paket Tour (${durationTitle}) - ${fullName.trim() || 'Tamu'}`;

    const emailBody = waText.replace(/\*/g, '');

    return {
      waHref: `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(waText)}`,
      emailMailtoHref: `mailto:${BRAND.email}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`,
      emailSubject,
      emailBody,
      addonsList,
      stopsText,
    };
  };

  const validateForm = (requireContactEmail: boolean) => {
    if (combinedItineraryItems.length === 0) {
      setFormError(
        lang === 'en'
          ? 'Please select at least 1 destination or add a custom spot for your itinerary.'
          : 'Mohon pilih minimal 1 destinasi atau tambahkan tempat tujuan custom Anda.'
      );
      return false;
    }
    if (requireContactEmail) {
      if (!fullName.trim()) {
        setFormError(
          lang === 'en' ? 'Please enter your full name.' : 'Mohon masukkan nama lengkap Anda.'
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
            ? 'Please enter your active WhatsApp number.'
            : 'Mohon masukkan nomor WhatsApp aktif Anda.'
        );
        return false;
      }
      if (!tourDate) {
        setFormError(
          lang === 'en'
            ? 'Please select your preferred tour date.'
            : 'Mohon pilih tanggal tur yang diinginkan.'
        );
        return false;
      }
    }
    setFormError(null);
    return true;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    const bookingCode = `GUT-CUSTOM-${Math.floor(100000 + Math.random() * 900000)}`;
    const { waHref, emailMailtoHref, emailSubject, emailBody, addonsList } =
      buildSummaryStrings(bookingCode);

    const routeLabels = combinedItineraryItems.map((i) => i.label).join(' → ');

    const submitted: SubmittedBooking = {
      bookingCode,
      experienceId: 'custom-tour-package',
      experienceTitle:
        lang === 'en'
          ? `Custom Tour Package: ${selectedDuration.labelEn} (${combinedItineraryItems.length} Stops)`
          : `Paket Tour Custom: ${selectedDuration.labelId} (${combinedItineraryItems.length} Destinasi)`,
      experienceImage: DEFAULT_CUSTOM_IMAGE,
      experienceLocation:
        pickupAddress.trim() ||
        (lang === 'en' ? 'Custom Bali & Ubud Route' : 'Rute Custom Bali & Ubud'),
      experienceDuration: `${
        lang === 'en' ? selectedDuration.hoursEn : selectedDuration.hoursId
      } • ${pickupTime}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      pickupAddress:
        pickupAddress.trim() ||
        (lang === 'en' ? 'Hotel Pickup in Bali' : 'Penjemputan Hotel di Bali'),
      date: tourDate,
      guests,
      addonsNames: [
        `${lang === 'en' ? selectedVehicle.labelEn : selectedVehicle.labelId}`,
        ...addonsList,
      ],
      specialNotes: `Route: ${routeLabels}${notes.trim() ? ` | Notes: ${notes.trim()}` : ''}`,
      totalPrice: estimatedTotalUsd,
      currency: 'USD',
      submittedAt: new Date().toISOString(),
      emailSubject,
      emailBody,
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

    onSubmitEmailBooking(submitted);
  };

  return (
    <section
      id="customize-tour"
      className={`${
        isStandalonePage ? 'pt-28 pb-24' : 'py-24 border-b border-stone-200'
      } bg-[#FAF7F2] relative overflow-hidden`}
    >
      {/* Ambient Warm Glow */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {isStandalonePage && onBackHome && (
          <div className="mb-8 flex justify-start">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-700 hover:text-gold-700 transition-colors cursor-pointer"
            >
              <span>← {lang === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}</span>
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-white border border-gold-500/30 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <SlidersHorizontal size={12} className="text-gold-600" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold">
              {lang === 'en' ? 'Customize Tour Package' : 'Customize Paket Tour'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-wide font-medium">
            {lang === 'en'
              ? 'Design Your Own Private Bali Ubud Itinerary'
              : 'Rancang Sendiri Paket Tour Bali Ubud Anda'}
          </h2>
          <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed mt-4 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Mix and match your favorite Bali Ubud temples, emerald rice terraces, hidden waterfalls, jungle swings, ATV tracks, or Balinese spa sessions. Choose your trip duration and private vehicle, see an instant USD estimate, and send your custom Ubud route directly to our concierge.'
              : 'Bebas kombinasikan destinasi terbaik Bali Ubud—pura suci, terasering sawah, air terjun tersembunyi, jungle swing, ATV, rafting, hingga spa. Pilih durasi serta mobil privatnya, lihat estimasi harga USD secara langsung, lalu kirim rute custom Ubud Anda ke tim kami.'}
          </p>
        </div>

        {/* Main 2-Column Interactive Customizer */}
        <form onSubmit={handleEmailSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Builder Steps */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* STEP 1: Pick Destinations & Activities */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                    {lang === 'en' ? 'Step 01' : 'Langkah 01'}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                    {lang === 'en'
                      ? 'Choose Your Destinations & Activities'
                      : 'Pilih Destinasi & Aktivitas Favorit'}
                  </h3>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyPreset('classic')}
                    className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#FAF7F2] hover:bg-gold-50 border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 rounded-sm transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Ubud Classic' : 'Ubud Klasik'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('adventure')}
                    className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#FAF7F2] hover:bg-gold-50 border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 rounded-sm transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'ATV & Adventure' : 'ATV & Adrenalin'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('half-day-ubud')}
                    className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#FAF7F2] hover:bg-gold-50 border border-stone-300 hover:border-gold-600 text-stone-800 hover:text-gold-700 rounded-sm transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Half Day Mix' : 'Setengah Hari'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('clear')}
                    className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#FAF7F2] hover:bg-red-50 border border-stone-300 text-stone-600 hover:text-red-700 hover:border-red-300 rounded-sm transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={10} />
                    <span>{lang === 'en' ? 'Reset' : 'Reset'}</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs for Destinations */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', en: 'All Spots', idLabel: 'Semua Tempat' },
                  { id: 'culture', en: 'Culture & Temples', idLabel: 'Budaya & Pura' },
                  { id: 'nature', en: 'Waterfalls & Nature', idLabel: 'Air Terjun & Alam' },
                  { id: 'activity', en: 'Activities & Spa', idLabel: 'Aktivitas & Spa' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSpotTab(tab.id as typeof activeSpotTab)}
                    className={`px-3.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      activeSpotTab === tab.id
                        ? 'bg-gold-600 text-white font-bold shadow-sm'
                        : 'bg-[#FAF7F2] text-stone-700 border border-stone-200 hover:border-gold-600'
                    }`}
                  >
                    {lang === 'en' ? tab.en : tab.idLabel}
                  </button>
                ))}
              </div>

              {/* Destinations Multi-Select Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {visibleSpots.map((spot) => {
                  const selectedIdx = selectedSpotIds.indexOf(spot.id);
                  const isSelected = selectedIdx !== -1;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => toggleSpot(spot.id)}
                      className={`flex items-start justify-between gap-3 p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gold-50 border-gold-600 shadow-sm'
                          : 'bg-[#FAF7F2] border-stone-200 hover:border-gold-500'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p
                          className={`font-sans text-xs font-semibold leading-snug ${
                            isSelected ? 'text-stone-900' : 'text-stone-800'
                          }`}
                        >
                          {lang === 'en' ? spot.nameEn : spot.nameId}
                        </p>
                        <p className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
                          <MapPin size={10} className="text-gold-600 flex-shrink-0" />
                          <span>{spot.area}</span>
                        </p>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold transition-colors ${
                          isSelected
                            ? 'bg-gold-600 text-white'
                            : 'bg-white border border-stone-300 text-stone-600'
                        }`}
                      >
                        {isSelected ? selectedIdx + 1 : <Plus size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Add Any Custom Spot / Request */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-stone-700 font-semibold">
                  {lang === 'en'
                    ? 'Want somewhere else? Add your own stop (e.g., Uluwatu, Nusa Dua, Kintamani, Beach Club):'
                    : 'Ingin tempat lain? Tambahkan destinasi custom Anda (mis. Uluwatu, Kintamani, Beach Club):'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customPlaceInput}
                    onChange={(e) => setCustomPlaceInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomPlace();
                      }
                    }}
                    placeholder={
                      lang === 'en'
                        ? 'Type any destination, cafe, or temple in Bali...'
                        : 'Ketik nama destinasi, kafe, atau pura di Bali...'
                    }
                    className="flex-1 bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomPlace}
                    className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-[10px] uppercase tracking-wider font-bold px-4 py-2.5 rounded-sm transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>{lang === 'en' ? 'Add' : 'Tambah'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2: Duration, Vehicle & Optional Extras */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-6 shadow-sm">
              <div className="border-b border-stone-200 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                  {lang === 'en' ? 'Step 02' : 'Langkah 02'}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {lang === 'en'
                    ? 'Choose Duration, Private Car & Add-Ons'
                    : 'Pilih Durasi, Mobil Privat & Layanan Tambahan'}
                </h3>
              </div>

              {/* Duration Selector */}
              <div className="space-y-2.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-stone-700 font-semibold flex items-center gap-1.5">
                  <Clock size={12} className="text-gold-600" />
                  <span>{lang === 'en' ? 'Tour Duration' : 'Durasi Perjalanan'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DURATION_OPTIONS.map((opt) => {
                    const active = durationId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDurationId(opt.id)}
                        className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-gold-50 border-gold-600 shadow-sm'
                            : 'bg-[#FAF7F2] border-stone-200 hover:border-gold-500'
                        }`}
                      >
                        <p className="font-serif text-sm text-stone-900 font-semibold">
                          {lang === 'en' ? opt.labelEn : opt.labelId}
                        </p>
                        <p className="font-sans text-[11px] text-stone-600 mt-0.5">
                          {lang === 'en' ? opt.hoursEn : opt.hoursId}
                        </p>
                        <p className="font-mono text-xs text-gold-700 font-bold mt-2">
                          {formatPrice(opt.basePriceUsd, 'USD')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vehicle Selector */}
              <div className="space-y-2.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-stone-700 font-semibold flex items-center gap-1.5">
                  <Car size={12} className="text-gold-600" />
                  <span>{lang === 'en' ? 'Private AC Vehicle + Driver & Fuel' : 'Mobil AC Privat + Driver & BBM'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VEHICLE_OPTIONS.map((veh) => {
                    const active = vehicleId === veh.id;
                    return (
                      <button
                        key={veh.id}
                        type="button"
                        onClick={() => setVehicleId(veh.id)}
                        className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-gold-50 border-gold-600 shadow-sm'
                            : 'bg-[#FAF7F2] border-stone-200 hover:border-gold-500'
                        }`}
                      >
                        <p className="font-serif text-sm text-stone-900 font-semibold">
                          {lang === 'en' ? veh.labelEn : veh.labelId}
                        </p>
                        <p className="font-sans text-[11px] text-stone-600 mt-0.5">
                          {lang === 'en' ? veh.capacityEn : veh.capacityId}
                        </p>
                        <p className="font-mono text-xs text-gold-700 font-bold mt-2">
                          {veh.addonPriceUsd === 0
                            ? lang === 'en'
                              ? 'Included'
                              : 'Sudah Termasuk'
                            : `+${formatPrice(veh.addonPriceUsd, 'USD')}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-2.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-stone-700 font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} className="text-gold-600" />
                  <span>{lang === 'en' ? 'Optional VIP Add-Ons' : 'Layanan Tambahan Opsional'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CUSTOM_ADDONS.map((addon) => {
                    const checked = selectedAddonIds.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-md border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          checked
                            ? 'bg-gold-50 border-gold-600 shadow-sm'
                            : 'bg-[#FAF7F2] border-stone-200 hover:border-gold-500'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-sans text-xs text-stone-900 font-medium leading-snug">
                            {lang === 'en' ? addon.labelEn : addon.labelId}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              checked
                                ? 'bg-gold-600 text-white'
                                : 'bg-white border border-stone-300'
                            }`}
                          >
                            {checked && <Check size={11} className="stroke-[3]" />}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-gold-700 font-bold mt-2">
                          +{formatPrice(addon.priceUsd, 'USD')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: Schedule & Guest Contact */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-5 shadow-sm">
              <div className="border-b border-stone-200 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                  {lang === 'en' ? 'Step 03' : 'Langkah 03'}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-medium">
                  {lang === 'en' ? 'Schedule & Guest Details' : 'Jadwal & Data Pemesan'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold flex items-center gap-1.5">
                    <Calendar size={11} className="text-gold-600" />
                    <span>{lang === 'en' ? 'Tour Date *' : 'Tanggal Tour *'}</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-gold-600 [color-scheme:light]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold flex items-center gap-1.5">
                    <Clock size={11} className="text-gold-600" />
                    <span>{lang === 'en' ? 'Pickup Time' : 'Jam Jemput'}</span>
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-gold-600"
                  >
                    {PICKUP_TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold flex items-center gap-1.5">
                    <Users size={11} className="text-gold-600" />
                    <span>{lang === 'en' ? 'Total Guests' : 'Jumlah Peserta'}</span>
                  </label>
                  <div className="flex items-center bg-[#FAF7F2] border border-stone-300 rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="px-3.5 py-2.5 text-stone-700 hover:bg-gold-100 font-mono text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono text-xs font-bold text-stone-900">
                      {guests} {lang === 'en' ? 'Guests' : 'Orang'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(14, g + 1))}
                      className="px-3.5 py-2.5 text-stone-700 hover:bg-gold-100 font-mono text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold">
                    {lang === 'en' ? 'Full Name *' : 'Nama Lengkap *'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g., Sarah Johnson' : 'Contoh: Budi Santoso'}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold">
                    {lang === 'en' ? 'WhatsApp / Phone Number *' : 'Nomor WhatsApp / HP *'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold">
                    {lang === 'en' ? 'Email Address *' : 'Alamat Email *'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold">
                    {lang === 'en' ? 'Hotel / Villa Pickup Area' : 'Hotel / Area Penjemputan'}
                  </label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'e.g., Padma Resort Ubud / Seminyak'
                        : 'Contoh: Hotel area Ubud / Kuta / Seminyak'
                    }
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-stone-700 font-semibold">
                  {lang === 'en'
                    ? 'Special Requests (Dietary / Child Seat / Itinerary Notes)'
                    : 'Catatan Khusus (Makanan / Baby Seat / Permintaan Rute)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? 'Let us know any dietary notes, child seat needs, or custom stop timing...'
                      : 'Tulis kebutuhan khusus seperti menu makanan, baby seat, atau jadwal kunjungan...'
                  }
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-sm px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Custom Itinerary & Price Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-stone-200 rounded-xl p-6 md:p-7 space-y-6 text-left shadow-xl shadow-stone-900/10">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                  {lang === 'en' ? 'Live Custom Blueprint' : 'Ringkasan Rute Custom'}
                </span>
                <h3 className="font-serif text-xl text-stone-900 font-medium mt-0.5">
                  {lang === 'en' ? 'Your Tailored Itinerary' : 'Rencana Perjalanan Anda'}
                </h3>
              </div>
              <Compass className="w-7 h-7 text-gold-600" />
            </div>

            {/* Ordered Route List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-600">
                <span>
                  {lang === 'en' ? 'Selected Stops' : 'Destinasi Dipilih'} (
                  {combinedItineraryItems.length})
                </span>
                <span className="text-gold-700 font-bold">
                  {lang === 'en' ? selectedDuration.labelEn : selectedDuration.labelId}
                </span>
              </div>

              {combinedItineraryItems.length === 0 ? (
                <div className="p-5 rounded-md border border-dashed border-stone-300 bg-[#FAF7F2] text-center space-y-1">
                  <p className="font-sans text-xs text-stone-700">
                    {lang === 'en'
                      ? 'No destinations selected yet.'
                      : 'Belum ada destinasi yang dipilih.'}
                  </p>
                  <p className="font-mono text-[10px] text-gold-700">
                    {lang === 'en'
                      ? 'Tap places on the left to build your route.'
                      : 'Klik destinasi di sebelah kiri untuk menyusun rute Anda.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {combinedItineraryItems.map((item, idx) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-2 bg-[#FAF7F2] border border-stone-200 rounded-md px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-gold-600 text-white font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-sans text-xs text-stone-800 font-medium truncate">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => moveSpot(idx, -1)}
                          aria-label="Move up"
                          className="p-1 text-stone-500 hover:text-gold-700 transition-colors cursor-pointer"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSpot(idx, 1)}
                          aria-label="Move down"
                          className="p-1 text-stone-500 hover:text-gold-700 transition-colors cursor-pointer"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryItem(item)}
                          aria-label="Remove stop"
                          className="p-1 text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {combinedItineraryItems.length > selectedDuration.recommendedStops && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md p-2.5 text-[11px] text-amber-900">
                  <AlertTriangle size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    {lang === 'en'
                      ? `You selected ${combinedItineraryItems.length} stops. Consider switching to a longer duration for a relaxed pace.`
                      : `Anda memilih ${combinedItineraryItems.length} destinasi. Disarankan memilih durasi Full Day / Ekstra agar perjalanan tetap santai.`}
                  </span>
                </div>
              )}
            </div>

            {/* USD Price Breakdown */}
            <div className="bg-[#FAF7F2] border border-stone-200 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span>
                  {lang === 'en' ? selectedDuration.labelEn : selectedDuration.labelId} (
                  {lang === 'en' ? 'Private Car + Driver + Fuel' : 'Mobil Privat + Driver + BBM'})
                </span>
                <span className="font-mono font-semibold text-stone-900">
                  {formatPrice(selectedDuration.basePriceUsd, 'USD')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-700">
                <span>{lang === 'en' ? selectedVehicle.labelEn : selectedVehicle.labelId}</span>
                <span className="font-mono font-semibold text-stone-900">
                  {selectedVehicle.addonPriceUsd === 0
                    ? lang === 'en'
                      ? 'Included'
                      : 'Gratis'
                    : formatPrice(selectedVehicle.addonPriceUsd, 'USD')}
                </span>
              </div>

              {selectedAddons.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between text-xs text-stone-700">
                  <span>{lang === 'en' ? addon.labelEn : addon.labelId}</span>
                  <span className="font-mono font-semibold text-stone-900">
                    +{formatPrice(addon.priceUsd, 'USD')}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                    {lang === 'en' ? 'Estimated Base Rate' : 'Estimasi Tarif Dasar'}
                  </span>
                  <span className="font-sans text-[10px] text-stone-500">
                    {lang === 'en' ? `For ${guests} Orang • Net Charter Rate (USD)` : `Untuk ${guests} Orang • Tarif Dasar USD`}
                  </span>
                </div>
                <span className="font-mono text-2xl font-bold text-gold-700">
                  {formatPrice(estimatedTotalUsd, 'USD')}
                </span>
              </div>

              <p className="font-sans text-[11px] text-stone-600 leading-relaxed pt-1">
                {lang === 'en'
                  ? 'Covers private AC vehicle, English-speaking driver, fuel & parking. Entrance tickets are excluded; optional activities (ATV, Rafting, Swing, Spa) can be arranged on request.'
                  : 'Mencakup mobil ber-AC privat, driver berpengalaman, BBM & parkir. Belum termasuk tiket masuk objek wisata; aktivitas tambahan (ATV, Rafting, Swing, Spa) dapat diatur sesuai permintaan.'}
              </p>
            </div>

            {formError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md p-3">
                <AlertTriangle size={15} className="text-red-600 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Button -> Direct WhatsApp */}
            <div className="space-y-2.5">
              <button
                type="submit"
                id="btn-custom-tour-whatsapp"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-[0.18em] font-bold py-4 px-5 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageCircle size={16} />
                <span>
                  {lang === 'en'
                    ? 'Send Custom Booking via WhatsApp'
                    : 'Kirim Booking Custom ke WhatsApp'}
                </span>
                <ExternalLink size={14} />
              </button>

              <p className="text-center font-mono text-[10px] text-stone-500 leading-relaxed">
                {lang === 'en'
                  ? `Directly opens WhatsApp (${BRAND.phoneDisplay}) with your tailored itinerary.`
                  : `Langsung diarahkan ke WhatsApp (${BRAND.phoneDisplay}) beserta detail rute custom Anda.`}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
