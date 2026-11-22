import React, { useState } from 'react';
import { Star, MessageSquare, Check, Award, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Review } from '../types';
import { getInitialReviews, getExperiences } from '../data';
import { BRAND, useLanguage } from '../i18n';

function GoogleColorLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

const BASE_GOOGLE_REVIEWS_TOTAL = 142;

export default function ReviewsSection() {
  const { lang } = useLanguage();
  const baseReviews = getInitialReviews(lang);
  const experiences = getExperiences(lang);

  const [customReviews, setCustomReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Review Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newExpId, setNewExpId] = useState(experiences[0]?.id || 'snorkeling-waterfall');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const reviews = [...customReviews, ...baseReviews];
  const totalDisplayedReviews = reviews.length;
  const totalGoogleReviews = BASE_GOOGLE_REVIEWS_TOTAL + customReviews.length;
  const avgRating =
    Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalDisplayedReviews) * 10) / 10;

  const filteredReviews = reviews.filter(
    (r) => filterRating === 'all' || r.rating === filterRating
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setFormError(lang === 'en' ? 'Please enter your name.' : 'Mohon masukkan nama Anda.');
      return;
    }
    if (!newComment.trim()) {
      setFormError(lang === 'en' ? 'Please write your testimonial.' : 'Mohon tulis ulasan pengalaman Anda.');
      return;
    }

    setFormError('');
    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      name: newName,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      experienceId: newExpId,
      verified: true,
    };

    setCustomReviews([newReview, ...customReviews]);
    setFormSuccess(true);
    
    setTimeout(() => {
      setIsFormOpen(false);
      setFormSuccess(false);
      setNewName('');
      setNewComment('');
      setNewRating(5);
    }, 2000);
  };

  const getExpLabel = (expId: string) => {
    const found = experiences.find((e) => e.id === expId);
    return found ? found.title : lang === 'en' ? 'Private Bali Expedition' : 'Ekspedisi Privat Bali';
  };

  return (
    <section id="reviews" className="py-24 bg-[#F3EDE2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Review Headers */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
            {lang === 'en' ? 'Official Google Maps Reviews' : 'Ulasan Resmi Google Maps'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-wide">
            {lang === 'en' ? 'Shared Chronicles of Splendor' : 'Cerita Perjalanan Tamu Kami'}
          </h2>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-light">
            {lang === 'en'
              ? 'Read official Google Maps reviews from international travelers who explored the heart of Bali Ubud with Ketut Ajus & GoUbudTrip.'
              : 'Baca ulasan resmi dari Google Maps oleh wisatawan internasional yang menjelajahi Bali Ubud bersama Ketut Ajus & GoUbudTrip.'}
          </p>
        </div>

        {/* Official Google Reviews Summary Card + Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-stretch">

          {/* Official Google Business Review Card */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            {/* Subtle Google 4-color top bar */}
            <div className="h-1 w-full grid grid-cols-4">
              <div className="bg-[#4285F4]" />
              <div className="bg-[#EA4335]" />
              <div className="bg-[#FBBC05]" />
              <div className="bg-[#34A853]" />
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#FAF7F2] border border-stone-200 flex items-center justify-center shrink-0">
                    <GoogleColorLogo className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-sm font-bold text-stone-900 tracking-tight">
                        Google Reviews
                      </span>
                      <ShieldCheck size={14} className="text-[#4285F4]" />
                    </div>
                    <p className="font-sans text-xs text-stone-500">
                      {BRAND.name} · Ubud, Bali
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[9px] uppercase tracking-wider font-semibold shrink-0">
                  {lang === 'en' ? 'Verified' : 'Resmi'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 bg-[#FAF7F2] border border-stone-200/80 rounded-lg px-4 py-3.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-stone-900">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="font-mono text-xs text-stone-500">/ 5.0</span>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < Math.round(avgRating)
                            ? 'fill-[#FBBC05] text-[#FBBC05]'
                            : 'text-stone-300'
                        }
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[11px] text-stone-600 font-semibold mt-1">
                    {lang === 'en'
                      ? `Based on ${totalGoogleReviews} reviews`
                      : `Berdasarkan ${totalGoogleReviews} ulasan`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={BRAND.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 text-stone-800 px-4 py-3 text-[11px] uppercase tracking-wider font-bold font-mono transition-colors rounded-sm shadow-xs"
                >
                  <GoogleColorLogo className="w-4 h-4 shrink-0" />
                  <span>{lang === 'en' ? 'View on Google' : 'Lihat di Google'}</span>
                  <ExternalLink size={12} className="text-stone-500" />
                </a>

                {!isFormOpen && (
                  <button
                    onClick={() => setIsFormOpen(true)}
                    id="btn-trigger-review-form"
                    className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-3 text-[11px] uppercase tracking-wider font-bold font-mono transition-colors rounded-sm cursor-pointer shadow-sm"
                  >
                    {lang === 'en' ? 'Share Experience' : 'Tulis Ulasan'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter & Google Maps Highlights Card */}
          <div className="lg:col-span-7 bg-white p-6 border border-stone-200 rounded-xl shadow-sm flex flex-col justify-between gap-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h4 className="font-serif text-lg text-stone-900 font-semibold">
                  {lang === 'en' ? 'Featured Google Maps Testimonials' : 'Testimoni Pilihan Google Maps'}
                </h4>
                <p className="font-sans text-xs text-stone-600 mt-1">
                  {lang === 'en'
                    ? `Showing ${filteredReviews.length} featured stories from ${totalGoogleReviews} verified Google Maps reviews.`
                    : `Menampilkan ${filteredReviews.length} ulasan pilihan dari total ${totalGoogleReviews} ulasan resmi Google Maps.`}
                </p>
              </div>

              <div className="flex items-center gap-2 text-stone-500 shrink-0">
                <GoogleColorLogo className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                  Google Maps
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                {lang === 'en' ? 'Filter by Star Rating' : 'Filter Rating Bintang'}
              </span>

              <div className="flex flex-wrap gap-2" id="review-filters">
                <button
                  onClick={() => setFilterRating('all')}
                  className={`py-1.5 px-3.5 text-[10px] uppercase font-mono tracking-wider font-semibold border rounded-sm transition-all cursor-pointer ${
                    filterRating === 'all'
                      ? 'bg-gold-600 border-gold-600 text-white font-bold'
                      : 'bg-[#FAF7F2] border-stone-300 text-stone-700 hover:border-gold-600'
                  }`}
                >
                  {lang === 'en' ? 'All Ratings' : 'Semua Rating'} ({reviews.length})
                </button>
                {[5, 4, 3].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  return (
                    <button
                      key={star}
                      onClick={() => setFilterRating(star)}
                      className={`py-1.5 px-3.5 text-[10px] uppercase font-mono tracking-wider font-semibold border rounded-sm transition-all flex items-center space-x-1 cursor-pointer ${
                        filterRating === star
                          ? 'bg-gold-600 border-gold-600 text-white font-bold'
                          : 'bg-[#FAF7F2] border-stone-300 text-stone-700 hover:border-gold-600'
                      }`}
                    >
                      <span>{star} {lang === 'en' ? 'Stars' : 'Bintang'}</span>
                      <span className="opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-stone-100">
              {(lang === 'en'
                ? ['Custom Ubud Routes', 'Fluent English Guide', 'Balinese Culture Expert', 'Safe Private Driver']
                : ['Rute Ubud Kustom', 'Driver Fasih Inggris', 'Ahli Budaya Bali', 'Mobil Privat Nyaman']
              ).map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 bg-[#FAF7F2] border border-stone-200/80 rounded-sm px-2.5 py-2"
                >
                  <Check size={12} className="text-emerald-600 shrink-0" />
                  <span className="font-sans text-[11px] text-stone-700 font-medium truncate">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Testimonial Builder Form */}
        {isFormOpen && (
          <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-xl mb-12 text-left animate-fade-in relative overflow-hidden shadow-md" id="review-submission-box">
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gold-500/20 pointer-events-none" />

            {formSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center border border-emerald-500">
                  <Check size={20} />
                </div>
                <h4 className="font-serif text-lg text-stone-900">
                  {lang === 'en' ? 'Review Submitted' : 'Ulasan Terkirim'}
                </h4>
                <p className="font-sans text-xs text-stone-600">
                  {lang === 'en'
                    ? 'Thank you! Your review has been published to our guest ledger.'
                    : 'Terima kasih! Ulasan Anda telah ditambahkan ke daftar testimoni.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                  <h3 className="font-serif text-lg text-stone-900 font-medium flex items-center space-x-2">
                    <MessageSquare size={16} className="text-gold-600" />
                    <span>{lang === 'en' ? 'Write Your Testimonial' : 'Tulis Testimoni Anda'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-stone-500 hover:text-gold-700 p-1 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {formError && (
                  <p className="text-xs font-mono text-red-800 bg-red-50 border border-red-200 px-4 py-2 rounded-sm">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-700 font-semibold">
                          {lang === 'en' ? 'Your Name' : 'Nama Anda'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={lang === 'en' ? 'e.g. Sarah Jenkins' : 'Contoh: Budi Santoso'}
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-2.5 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-700 font-semibold">
                          {lang === 'en' ? 'Experience Taken' : 'Pengalaman yang Diambil'}
                        </label>
                        <select
                          value={newExpId}
                          onChange={(e) => setNewExpId(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-2.5 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 cursor-pointer"
                        >
                          {experiences.map((exp) => (
                            <option key={exp.id} value={exp.id}>
                              {exp.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-wider font-mono text-stone-700 font-semibold">
                        {lang === 'en' ? 'Your Testimonial Experience' : 'Cerita Pengalaman Anda'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={
                          lang === 'en'
                            ? 'Share highlights from your private Bali Ubud journey...'
                            : 'Ceritakan momen terbaik Anda menjelajahi Bali Ubud bersama kami...'
                        }
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-stone-300 px-4 py-2.5 text-sm text-stone-900 rounded-sm focus:outline-none focus:border-gold-600 resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-[#FAF7F2] border border-stone-200 p-5 rounded-lg flex flex-col justify-between text-center md:text-left">
                    <div className="space-y-3">
                      <span className="block text-[10px] uppercase tracking-widest font-mono text-stone-700 font-semibold">
                        {lang === 'en' ? 'Review Star Score' : 'Penilaian Bintang'}
                      </span>
                      <div className="flex justify-center md:justify-start items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="text-gold-500 hover:scale-110 transition-transform cursor-pointer p-1"
                          >
                            <Star
                              size={28}
                              className={star <= newRating ? 'fill-gold-500 text-gold-500' : 'text-stone-300'}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] text-gold-700 font-semibold uppercase tracking-wider pt-1">
                        {newRating === 5 && (lang === 'en' ? 'Absolutely Flawless (5/5)' : 'Sangat Sempurna (5/5)')}
                        {newRating === 4 && (lang === 'en' ? 'Curated Splendor (4/5)' : 'Sangat Memuaskan (4/5)')}
                        {newRating === 3 && (lang === 'en' ? 'Enjoyable Journey (3/5)' : 'Cukup Menyenangkan (3/5)')}
                        {newRating === 2 && (lang === 'en' ? 'Needs Improvement (2/5)' : 'Perlu Peningkatan (2/5)')}
                        {newRating === 1 && (lang === 'en' ? 'Poor Experience (1/5)' : 'Kurang Memuaskan (1/5)')}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-3 transition-colors rounded-sm cursor-pointer shadow-sm"
                      >
                        {lang === 'en' ? 'Publish Testimonial' : 'Kirim Testimoni'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Display grid of filtered reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="reviews-list-grid">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-stone-200 hover:border-gold-500/60 transition-all p-6 rounded-xl text-left flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 bg-gold-50 border border-gold-500/30 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-serif text-sm font-bold text-gold-800 uppercase">
                        {r.name.trim().charAt(0)}
                      </span>
                      {r.source === 'Google Maps' && (
                        <span
                          className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-xs"
                          title="Google Review"
                        >
                          <GoogleColorLogo className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">
                        {r.name}
                      </h4>
                      {r.reviewerMeta && (
                        <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                          {r.reviewerMeta}
                        </p>
                      )}
                      <p className="font-mono text-[9px] text-gold-700 tracking-wider uppercase mt-0.5 font-semibold">
                        {getExpLabel(r.experienceId)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center space-x-0.5 justify-end">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={
                            idx < r.rating
                              ? 'fill-[#FBBC05] text-[#FBBC05]'
                              : 'text-stone-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-stone-500 block mt-1">
                      {r.relativeDate ||
                        new Date(r.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-xs md:text-sm text-stone-700 leading-relaxed">
                  "{r.comment}"
                </p>
              </div>

              {r.verified && (
                <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-wider font-mono text-stone-600 font-semibold pt-4 border-t border-stone-200 mt-4">
                  <div className="flex items-center space-x-1.5">
                    {r.source === 'Google Maps' ? (
                      <GoogleColorLogo className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Award size={12} className="text-emerald-700 stroke-[2.5]" />
                    )}
                    <span className={r.source === 'Google Maps' ? 'text-stone-700' : 'text-emerald-700'}>
                      {r.source === 'Google Maps'
                        ? lang === 'en'
                          ? 'Posted on Google'
                          : 'Ulasan Resmi Google'
                        : lang === 'en'
                        ? 'Verified GoUbudTrip Booking'
                        : 'Pemesanan Terverifikasi GoUbudTrip'}
                    </span>
                  </div>
                  {r.source === 'Google Maps' && (
                    <a
                      href={BRAND.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[#4285F4] hover:text-gold-700 transition-colors"
                    >
                      <span>Google Maps</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
