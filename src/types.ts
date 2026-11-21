export interface ItineraryItem {
  time: string;
  title: string;
  desc: string;
}

export interface DiscountTier {
  minPersons: number;
  maxPersons: number;
  adultPrice: number;
  childrenPrice: number;
}

export interface Experience {
  id: string;
  category?: 'adventure' | 'culture' | 'activities';
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  bgImage: string;
  cardImage: string;
  images?: string[];
  pricePerPerson: number;
  currency?: 'IDR' | 'USD';
  discountTiers?: DiscountTier[];
  duration: string;
  isHalfDay?: boolean;
  location: string;
  difficulty: string;
  maxPeople?: number;
  minAge?: string;
  pickupLabel?: string;
  tourType?: string;
  groupSize?: string;
  languages?: string;
  tourNote?: string;
  pickupTimes?: string[];
  pickupLocations?: string;
  whatToBring?: string[];
  featureBadges?: string[];
  packageOptions?: { title: string; desc: string }[];
  whatToExpect?: string;
  meetingPoint?: string[];
  activityNotes?: string[];
  relatedTitle?: string;
  relatedExperienceId?: string;
  termsAndConditions?: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  rating: number;
  reviewCount: number;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUsd?: number;
}

export interface BookingDetails {
  id: string;
  experienceId: string;
  date: string;
  guests: number;
  addons: string[];
  fullName: string;
  email: string;
  phone: string;
  specialNotes: string;
  totalPrice: number;
  bookingCode: string;
  paymentMethod: string;
  cardNumber?: string;
  createdAt: string;
}

export interface SubmittedBooking {
  bookingCode: string;
  experienceId: string;
  experienceTitle: string;
  experienceImage: string;
  experienceLocation: string;
  experienceDuration: string;
  fullName: string;
  email: string;
  phone: string;
  pickupAddress: string;
  date: string;
  guests: number;
  addonsNames?: string[];
  specialNotes: string;
  totalPrice: number;
  currency?: 'IDR' | 'USD';
  submittedAt: string;
  emailSubject: string;
  emailBody: string;
  emailMailtoHref: string;
  waHref: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  experienceId: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'motorbike';
  image: string;
  passengers?: number;
  transmission: string;
  engine: string;
  priceWithDriverPerDay: number;
  priceWithoutDriverPerDay: number;
  description: string;
  features: string[];
}

