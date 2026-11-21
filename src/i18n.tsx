import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'id';

export const BRAND = {
  name: 'GoUbudTrip',
  tagline: {
    en: 'Private Bali Ubud Tours & Adventures',
    id: 'Tur Privat & Petualangan Bali Ubud',
  },
  logoUrl: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1795085329/5ca8edac-43fa-4c98-a93b-9a71206f2a23.png',
  phoneDisplay: '+62 877-6102-2499',
  whatsappNumber: '6287761022499',
  email: 'goubudtrip@gmail.com',
  address: 'Jalan Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia',
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
