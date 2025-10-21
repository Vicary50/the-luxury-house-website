export interface ImageData {
  id: string;
  src: string;
  alt: string;
  category: ImageCategory;
  title?: string;
  description?: string;
  featured?: boolean;
}

export type ImageCategory =
  | 'Bunk bed room'
  | 'Children\'s room'
  | 'Dining area'
  | 'Double room'
  | 'Firepit'
  | 'Kingsize bedroom'
  | 'Kitchen'
  | 'Living area'
  | 'Master bedroom'
  | 'Playroom'
  | 'Poolside villa'
  | 'Rear Kingsize bedroom'
  | 'Sitting room'
  | 'Swimming pool';

export interface Property {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: ImageData[];
  amenities: string[];
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  pricing: {
    nightlyRate: number;
    currency: string;
    minStay: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  jsonLd?: Record<string, unknown>;
}

// Booking System Types
export type AccommodationType = 'entire-property' | 'poolhouse-only';

export type SeasonType = 'peak' | 'high' | 'mid' | 'low';

export interface BookingDates {
  checkIn: Date;
  checkOut: Date;
  nights: number;
}

export interface GuestDetails {
  adults: number;
  children: number;
  infants: number;
  total: number;
}

export interface PricingFactors {
  accommodationType: AccommodationType;
  dates: BookingDates;
  guests: GuestDetails;
  isWeekend: boolean;
  season: SeasonType;
}

export interface PricingBreakdown {
  basePrice: number;
  seasonMultiplier: number;
  weekendSurcharge: number;
  guestSurcharge: number;
  subtotal: number;
  taxes: number;
  cleaningFee: number;
  total: number;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface BookingData {
  id?: string;
  accommodationType: AccommodationType;
  dates: BookingDates;
  guests: GuestDetails;
  pricing: PricingBreakdown;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  specialRequests?: string;
  status: 'draft' | 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD format
  isAvailable: boolean;
  accommodationType: AccommodationType;
  reason?: string; // If not available, reason why
}

export interface PricingConfig {
  basePrices: {
    entireProperty: {
      peak: number;
      high: number;
      mid: number;
      low: number;
    };
    poolhouseOnly: {
      peak: number;
      high: number;
      mid: number;
      low: number;
    };
  };
  multipliers: {
    weekend: number; // e.g., 1.2 for 20% surcharge
    extraGuest: number; // per guest over base capacity
  };
  fees: {
    cleaning: number;
    taxRate: number; // e.g., 0.1 for 10%
  };
  capacity: {
    entireProperty: {
      maxGuests: number;
      includedGuests: number;
    };
    poolhouseOnly: {
      maxGuests: number;
      includedGuests: number;
    };
  };
  seasons: {
    [key: string]: {
      start: string; // MM-DD format
      end: string; // MM-DD format
      type: SeasonType;
    };
  };
}