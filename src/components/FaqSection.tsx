import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getFaqs } from '../data';
import { useLanguage } from '../i18n';

export default function FaqSection() {
  const { lang } = useLanguage();
  const faqs = getFaqs(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF7F2] border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-700 font-semibold">
            {lang === 'en' ? 'Common Inquiries' : 'Pertanyaan Umum'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium tracking-wide">
            {lang === 'en' ? 'Expedition Directives & FAQs' : 'Panduan & Tanya Jawab'}
          </h2>
          <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
            {lang === 'en'
              ? 'Everything you need to plan your private Bali vacation with complete peace of mind.'
              : 'Semua informasi penting untuk merencanakan liburan privat Anda di Bali dengan tenang.'}
          </p>
        </div>

        <div className="space-y-4 text-left" id="faq-accordion-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-stone-200 hover:border-gold-500/40 rounded-sm overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 focus:outline-none text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
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
    </section>
  );
}
