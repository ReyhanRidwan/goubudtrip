import React, { useState } from 'react';
import { Star, MessageSquare, Check, User, Award, X, ExternalLink, MapPin } from 'lucide-react';
import { Review } from '../types';
import { getInitialReviews, getExperiences } from '../data';
import { BRAND, useLanguage } from '../i18n';

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
  const totalReviews = reviews.length;
  const avgRating = Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10;

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
    if (expId === 'custom-ubud-day-tour') {
      return lang === 'en' ? 'Customized Ubud Day Tour' : 'Tur Privat Custom Ubud';
    }
    const found = experiences.find((e) => e.id === expId);
    return found ? found.title : lang === 'en' ? 'Private Bali Expedition' : 'Ekspedisi Privat Bali';
  };

  return (
    <section id="reviews" className="py-24 bg-[#F3EDE2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Review Headers */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
            {lang === 'en' ? 'Guest Testimonials' : 'Testimoni Tamu'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-wide">
            {lang === 'en' ? 'Shared Chronicles of Splendor' : 'Cerita Perjalanan Tamu Kami'}
          </h2>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed font-light">
            {lang === 'en'
              ? 'Read verified reviews from international travelers, honeymooners, and families who explored the heart of Bali Ubud with GoUbudTrip.'
              : 'Baca ulasan terverifikasi dari wisatawan internasional, pasangan bulan madu, dan keluarga yang menjelajahi keindahan Bali Ubud bersama GoUbudTrip.'}
          </p>
        </div>

        {/* Testimonials aggregate statistics and interactive controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
          
          <div className="lg:col-span-4 bg-white border border-stone-200 p-6 rounded-xl text-center lg:text-left flex flex-col md:flex-row lg:flex-col items-center justify-around gap-6 shadow-sm">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500 block font-semibold">
                {lang === 'en' ? 'Average guest score' : 'Skor rata-rata tamu'}
              </span>
              <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                <span className="font-serif text-5xl font-bold text-gold-700">
                  {avgRating}
                </span>
                <span className="text-stone-500 text-lg">/ 5.0</span>
              </div>
              <div className="flex justify-center lg:justify-start items-center space-x-1.5 text-gold-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(avgRating) ? 'fill-gold-500 text-gold-500' : 'text-stone-300'}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-stone-500 block pt-1">
                {lang === 'en'
                  ? `Based on ${totalReviews} Google Maps reviews`
                  : `Berdasarkan ${totalReviews} ulasan Google Maps`}
              </span>
              <a
                href={BRAND.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700 hover:text-emerald-800 pt-1 transition-colors"
              >
                <MapPin size={12} />
                <span>{lang === 'en' ? 'View on Google Maps' : 'Lihat di Google Maps'}</span>
                <ExternalLink size={11} />
              </a>
            </div>

            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                id="btn-trigger-review-form"
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3.5 text-xs uppercase tracking-wider font-bold font-mono transition-colors rounded-sm cursor-pointer shadow-sm"
              >
                {lang === 'en' ? 'Share Your Experience' : 'Tulis Ulasan Anda'}
              </button>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-stone-200 rounded-xl shadow-sm">
            <div className="text-left">
              <h4 className="font-serif text-base text-stone-900 font-semibold">
                {lang === 'en' ? 'Filter Guest Reviews' : 'Filter Ulasan Tamu'}
              </h4>
              <p className="font-sans text-xs text-stone-600 mt-1">
                {lang === 'en' ? 'Show testimonials based on star ratings.' : 'Tampilkan testimoni berdasarkan rating bintang.'}
              </p>
            </div>
            
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gold-50 border border-gold-500/30 rounded-full flex items-center justify-center">
                      <User size={16} className="text-gold-700" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">
                        {r.name}
                      </h4>
                      {r.badgeLabel && (
                        <p className="font-mono text-[10px] text-stone-500 mt-0.5">
                          {r.badgeLabel}
                        </p>
                      )}
                      <p className="font-mono text-[9px] text-gold-700 tracking-wider uppercase mt-0.5 font-semibold">
                        {getExpLabel(r.experienceId)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center space-x-1 text-gold-500 justify-end">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={idx < r.rating ? 'fill-gold-500 text-gold-500' : 'text-stone-300'}
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
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 mt-4">
                  {r.source === 'google' ? (
                    <a
                      href={BRAND.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-wider font-mono text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
                    >
                      <MapPin size={11} className="stroke-[2.5]" />
                      <span>
                        {lang === 'en' ? 'Verified Google Maps Review' : 'Ulasan Asli Google Maps'}
                      </span>
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <div className="flex items-center space-x-1 text-[9px] uppercase tracking-wider font-mono text-emerald-700 font-semibold">
                      <Award size={10} className="stroke-[3]" />
                      <span>{lang === 'en' ? 'Verified GoUbudTrip Booking' : 'Pemesanan Terverifikasi GoUbudTrip'}</span>
                    </div>
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
