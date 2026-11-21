import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationGrid from './components/DestinationGrid';
import ActivitySection from './components/ActivitySection';
import ExperienceDetails from './components/ExperienceDetails';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Multi-page components
import TourCatalog from './components/TourCatalog';
import TourDetailPage from './components/TourDetailPage';
import CustomTourSection from './components/CustomTourSection';
import ThankYouPage from './components/ThankYouPage';
import AboutSection from './components/AboutSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';

import { BookingDetails, SubmittedBooking } from './types';
import { EXPERIENCES, getHeroExperiences } from './data';
import { LanguageProvider, useLanguage } from './i18n';
import {
  AppPage,
  getDocumentTitle,
  getPathForRoute,
  parsePathname,
} from './routes';

function AppContent() {
  const { lang } = useLanguage();
  const initialRoute = parsePathname(window.location.pathname);

  const [activePage, setActivePage] = useState<AppPage>(initialRoute.page);
  const [heroActiveIndex, setHeroActiveIndex] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedExperienceId, setPreSelectedExperienceId] = useState<string>(
    initialRoute.experienceId || EXPERIENCES[0]?.id || 'snorkeling-waterfall'
  );
  const [selectedDetailExperienceId, setSelectedDetailExperienceId] = useState<string>(
    initialRoute.experienceId || EXPERIENCES[0]?.id || 'snorkeling-waterfall'
  );
  const [submittedBooking, setSubmittedBooking] = useState<SubmittedBooking | null>(null);

  // Navigate to a named route (/home, /paket-tour, /<tour-slug>, etc.) with History API sync
  const navigateTo = useCallback(
    (page: AppPage, experienceId?: string, replace = false) => {
      if (experienceId) {
        setSelectedDetailExperienceId(experienceId);
      }
      setActivePage(page);

      const targetPath = getPathForRoute(
        page,
        experienceId || (page === 'tour-detail' ? selectedDetailExperienceId : undefined)
      );

      try {
        if (window.location.pathname !== targetPath) {
          if (replace) {
            window.history.replaceState({ page, experienceId }, '', targetPath);
          } else {
            window.history.pushState({ page, experienceId }, '', targetPath);
          }
        }
      } catch {
        // Ignore history restriction errors if running in restricted context
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedDetailExperienceId]
  );

  // Sync root "/" -> "/home" on initial load and listen for browser Back/Forward buttons
  useEffect(() => {
    try {
      const normalizedPath = getPathForRoute(initialRoute.page, initialRoute.experienceId);
      if (window.location.pathname === '/' || window.location.pathname !== normalizedPath) {
        window.history.replaceState(
          { page: initialRoute.page, experienceId: initialRoute.experienceId },
          '',
          normalizedPath
        );
      }
    } catch {
      // Ignore history restriction errors
    }

    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname);
      if (parsed.experienceId) {
        setSelectedDetailExperienceId(parsed.experienceId);
      }
      setActivePage(parsed.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep document title synchronized with current page / tour package
  useEffect(() => {
    document.title = getDocumentTitle(
      activePage,
      lang,
      activePage === 'tour-detail' ? selectedDetailExperienceId : undefined
    );
  }, [activePage, lang, selectedDetailExperienceId]);

  // Open booking modal preselected with a specific experience
  const handleOpenBooking = (experienceId: string) => {
    setPreSelectedExperienceId(experienceId);
    setIsBookingOpen(true);
  };

  // General booking click (pre-select current active experience in hero)
  const handleGeneralBookNow = () => {
    const heroList = getHeroExperiences('en');
    if (activePage === 'home') {
      const currentId =
        heroList[heroActiveIndex]?.id ||
        heroList[0]?.id ||
        EXPERIENCES[0]?.id;
      handleOpenBooking(currentId);
    } else if (activePage === 'tour-detail') {
      handleOpenBooking(selectedDetailExperienceId);
    } else {
      handleOpenBooking(heroList[0]?.id || EXPERIENCES[0]?.id);
    }
  };

  const handleBookingSuccess = (booking: BookingDetails) => {
    console.log('GoUbudTrip booking finalized:', booking);
  };

  // Open dedicated Tour Detail Page with named URL slug (e.g. /ubud-jungle-swing-balinese-spa)
  const handleViewDetails = (expId: string) => {
    navigateTo('tour-detail', expId);
  };

  // Redirect to Thank You Page once booking is submitted to WhatsApp
  const handleEmailBookingRedirect = (booking: SubmittedBooking) => {
    setSubmittedBooking(booking);
    navigateTo('thankyou');
  };

  const handleNavigateToContact = () => {
    navigateTo('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-stone-900 font-sans selection:bg-gold-500/20 selection:text-stone-900">
      
      {/* 1. Universal Luxury Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => navigateTo(page)}
        onBookNow={handleGeneralBookNow}
      />

      {/* 2. Page Content Switcher Router */}
      <main className="min-h-[80vh]">
        {activePage === 'home' && (
          <div className="animate-fade-in">
            {/* Showstopper Hero Carousel */}
            <HeroSection
              activeIndex={heroActiveIndex}
              setActiveIndex={setHeroActiveIndex}
              onExploreClick={(exp) => handleOpenBooking(exp.id)}
              onBookNowClick={handleGeneralBookNow}
              onViewDetails={handleViewDetails}
            />

            {/* Bespoke Curations: 3 Static Ubud Destination Photos */}
            <DestinationGrid />

            {/* Premium Outdoor Adventure & Wilderness Activities */}
            <ActivitySection
              onBookNow={handleOpenBooking}
              onViewDetails={handleViewDetails}
            />

            {/* Signature Activity Section */}
            <ExperienceDetails
              onBookNow={handleOpenBooking}
              onViewDetails={handleViewDetails}
            />

            {/* Customize Your Own Tour Builder */}
            <CustomTourSection onSubmitEmailBooking={handleEmailBookingRedirect} />

            {/* Testimonials Review section */}
            <ReviewsSection />
          </div>
        )}

        {activePage === 'tours' && (
          <div className="animate-fade-in">
            <TourCatalog
              onBookNow={handleOpenBooking}
              onViewDetails={handleViewDetails}
              onCustomizeTour={() => navigateTo('custom-tour')}
            />
          </div>
        )}

        {activePage === 'custom-tour' && (
          <div className="animate-fade-in">
            <CustomTourSection
              onSubmitEmailBooking={handleEmailBookingRedirect}
              isStandalonePage
              onBackHome={() => navigateTo('home')}
            />
          </div>
        )}

        {activePage === 'tour-detail' && (
          <div className="animate-fade-in">
            <TourDetailPage
              experienceId={selectedDetailExperienceId}
              onBackToTours={() => navigateTo('tours')}
              onSelectExperience={handleViewDetails}
              onSubmitEmailBooking={handleEmailBookingRedirect}
              onOpenFullModal={handleOpenBooking}
            />
          </div>
        )}

        {activePage === 'thankyou' && (
          <div className="animate-fade-in">
            <ThankYouPage
              booking={submittedBooking}
              onBackHome={() => navigateTo('home')}
              onBrowseTours={() => navigateTo('tours')}
            />
          </div>
        )}

        {activePage === 'about' && (
          <div className="animate-fade-in">
            <AboutSection />
          </div>
        )}

        {activePage === 'gallery' && (
          <div className="animate-fade-in">
            <GallerySection />
          </div>
        )}

        {activePage === 'whyus' && (
          <div className="animate-fade-in">
            <WhyUsSection onNavigateToContact={handleNavigateToContact} />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}
      </main>

      {/* 3. Universal Coordinates Footer */}
      <Footer />

      {/* 4. The Dynamic Booking & Checkout Modal System */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialExperienceId={preSelectedExperienceId}
        onBookingSuccess={handleBookingSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
