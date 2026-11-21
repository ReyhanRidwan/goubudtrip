import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Globe, ChevronRight } from 'lucide-react';
import { BRAND, useLanguage } from '../i18n';
import { AppPage, getPathForRoute } from '../routes';

export type { AppPage };

type NavTabId = 'home' | 'tours' | 'custom-tour' | 'about' | 'gallery' | 'whyus' | 'contact';

interface NavbarProps {
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  onBookNow: () => void;
}

export default function Navbar({ activePage, setActivePage, onBookNow }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const menuItems: Array<{ id: NavTabId; label: string }> =
    lang === 'en'
      ? [
          { id: 'home', label: 'Home' },
          { id: 'tours', label: 'Tour Packages' },
          { id: 'custom-tour', label: 'Customize Tour' },
          { id: 'about', label: 'About' },
          { id: 'gallery', label: 'Gallery' },
          { id: 'whyus', label: 'Why Us' },
          { id: 'contact', label: 'Contact' },
        ]
      : [
          { id: 'home', label: 'Beranda' },
          { id: 'tours', label: 'Paket Tour' },
          { id: 'custom-tour', label: 'Custom Paket' },
          { id: 'about', label: 'Tentang Kami' },
          { id: 'gallery', label: 'Galeri' },
          { id: 'whyus', label: 'Keunggulan' },
          { id: 'contact', label: 'Kontak' },
        ];

  const isNavItemActive = (itemId: NavTabId) =>
    activePage === itemId || (itemId === 'tours' && activePage === 'tour-detail');

  const handleNavClick = (pageId: AppPage) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200 py-3.5 shadow-sm'
            : 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/70 py-3.5 lg:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Lockup */}
          <a
            href={getPathForRoute('home')}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 select-none group text-left cursor-pointer min-w-0 flex-shrink"
            id="nav-logo"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm overflow-hidden bg-white border border-gold-500/30 flex items-center justify-center p-0.5 shadow-sm group-hover:border-gold-600 transition-colors flex-shrink-0">
              <img
                src={BRAND.logoUrl}
                alt={`${BRAND.name} Logo`}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg md:text-xl tracking-wider text-stone-900 group-hover:text-gold-700 transition-colors duration-300 font-semibold truncate">
                {BRAND.name}
              </span>
              <span className="hidden sm:block font-sans text-[8px] uppercase tracking-[0.2em] text-gold-700 -mt-0.5 font-semibold group-hover:text-stone-900 transition-colors duration-300 truncate">
                {BRAND.tagline[lang]}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7" id="desktop-nav">
            {menuItems.map((item) => {
              const active = isNavItemActive(item.id);
              const href = getPathForRoute(item.id);
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`text-[11px] uppercase tracking-[0.18em] font-mono font-semibold transition-all duration-300 cursor-pointer relative py-1 whitespace-nowrap ${
                    active
                      ? 'text-gold-700 font-bold'
                      : 'text-stone-700 hover:text-gold-700'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Controls: Language Switcher + Book Now */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <div
              className="flex items-center bg-white border border-stone-200 rounded-sm p-0.5 font-mono text-[10px] shadow-xs"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                id="btn-lang-en"
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer font-bold ${
                  lang === 'en'
                    ? 'bg-gold-600 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('id')}
                id="btn-lang-id"
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer font-bold ${
                  lang === 'id'
                    ? 'bg-gold-600 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ID
              </button>
            </div>

            <button
              onClick={onBookNow}
              id="btn-nav-book"
              className="bg-gold-600 hover:bg-gold-700 text-white font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer rounded-sm active:scale-95 whitespace-nowrap"
            >
              {lang === 'en' ? 'Book Now' : 'Pesan Sekarang'}
            </button>
          </div>

          {/* Mobile Right Controls (Language Toggle + 3-Line Hamburger Menu) */}
          <div className="flex lg:hidden items-center space-x-2.5 flex-shrink-0">
            <div className="flex items-center bg-white border border-stone-200 rounded-sm p-0.5 font-mono text-[10px] shadow-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-sm font-bold cursor-pointer ${
                  lang === 'en' ? 'bg-gold-600 text-white' : 'text-stone-600'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`px-2 py-1 rounded-sm font-bold cursor-pointer ${
                  lang === 'id' ? 'bg-gold-600 text-white' : 'text-stone-600'
                }`}
              >
                ID
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-sm border border-stone-300 bg-white text-stone-900 hover:border-gold-600 hover:text-gold-700 transition-colors focus:outline-none shadow-xs cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              id="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Navigation Drawer (Rendered as sibling of header so fixed inset works reliably) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[64px] bottom-0 z-40 bg-[#FAF7F2] lg:hidden overflow-y-auto flex flex-col justify-between py-6 px-5 border-t border-stone-200 animate-fade-in shadow-2xl"
          id="mobile-nav-panel"
        >
          <div className="space-y-2 max-w-md w-full mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold px-2 pb-1">
              {lang === 'en' ? 'Page Navigation' : 'Navigasi Halaman'}
            </p>
            {menuItems.map((item) => {
              const active = isNavItemActive(item.id);
              const href = getPathForRoute(item.id);
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-md border transition-all cursor-pointer ${
                    active
                      ? 'bg-white border-gold-500 text-gold-700 shadow-xs'
                      : 'bg-white/70 border-stone-200 text-stone-800 hover:border-gold-400 hover:text-gold-700'
                  }`}
                >
                  <span className="text-sm uppercase tracking-[0.16em] font-mono font-bold">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-stone-400">
                      {href}
                    </span>
                    <ChevronRight
                      size={15}
                      className={active ? 'text-gold-600' : 'text-stone-400'}
                    />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col space-y-4 items-center pt-8 pb-4 max-w-md w-full mx-auto">
            <div className="flex items-center space-x-2 text-xs font-mono text-stone-600">
              <Globe size={13} className="text-gold-700" />
              <span>{lang === 'en' ? 'Language: English' : 'Bahasa: Indonesia'}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNow();
              }}
              className="w-full bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 transition-all rounded-sm shadow-md cursor-pointer"
            >
              {lang === 'en' ? 'Book Now' : 'Pesan Sekarang'}
            </button>

            <div className="flex items-center space-x-2 text-[9px] font-mono text-stone-500">
              <Sparkles size={11} className="text-gold-700" />
              <span>
                {lang === 'en'
                  ? `${BRAND.name} 24/7 Concierge Hotline`
                  : `Layanan Concierge 24/7 ${BRAND.name}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
