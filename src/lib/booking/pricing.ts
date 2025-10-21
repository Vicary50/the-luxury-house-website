import { PricingConfig, PricingFactors, PricingBreakdown, SeasonType, AccommodationType } from '@/types';

// Pricing configuration - adjust these values according to your business model
export const pricingConfig: PricingConfig = {
  basePrices: {
    entireProperty: {
      peak: 500,    // Peak season (e.g., summer holidays, Christmas)
      high: 400,    // High season (e.g., weekends in summer)
      mid: 300,     // Mid season (e.g., spring/autumn)
      low: 250      // Low season (e.g., winter weekdays)
    },
    poolhouseOnly: {
      peak: 200,
      high: 180,
      mid: 150,
      low: 120
    }
  },
  multipliers: {
    weekend: 1.2,     // 20% surcharge for weekends
    extraGuest: 25    // £25 per extra guest per night
  },
  fees: {
    cleaning: 75,     // Fixed cleaning fee
    taxRate: 0.20     // 20% VAT
  },
  capacity: {
    entireProperty: {
      maxGuests: 15,
      includedGuests: 8  // Base price includes up to 8 guests
    },
    poolhouseOnly: {
      maxGuests: 3,
      includedGuests: 3  // Base price includes up to 3 guests
    }
  },
  seasons: {
    christmas: {
      start: '12-20',
      end: '01-05',
      type: 'peak'
    },
    summer: {
      start: '06-15',
      end: '08-31',
      type: 'peak'
    },
    easter: {
      start: '03-20',
      end: '04-10',
      type: 'high'
    },
    spring: {
      start: '03-01',
      end: '05-31',
      type: 'mid'
    },
    autumn: {
      start: '09-01',
      end: '11-30',
      type: 'mid'
    },
    winter: {
      start: '12-01',
      end: '02-28',
      type: 'low'
    }
  }
};

/**
 * Determines the season type for a given date
 */
export function getSeasonForDate(date: Date): SeasonType {
  const month = date.getMonth() + 1; // 0-indexed to 1-indexed
  const day = date.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  // Check each season to see if the date falls within it
  for (const [, season] of Object.entries(pricingConfig.seasons)) {
    if (isDateInSeason(dateStr, season.start, season.end)) {
      return season.type;
    }
  }
  
  // Default to mid season if no specific season found
  return 'mid';
}

/**
 * Helper function to check if a date falls within a season
 */
function isDateInSeason(date: string, start: string, end: string): boolean {
  // Handle year-crossing seasons (like Christmas)
  if (start > end) {
    return date >= start || date <= end;
  }
  return date >= start && date <= end;
}

/**
 * Checks if a date is a weekend (Friday, Saturday, Sunday)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0; // Friday, Saturday, Sunday
}

/**
 * Calculates the number of weekend nights in a date range
 */
export function getWeekendNights(checkIn: Date, checkOut: Date): number {
  let weekendNights = 0;
  const currentDate = new Date(checkIn);
  
  while (currentDate < checkOut) {
    if (isWeekend(currentDate)) {
      weekendNights++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return weekendNights;
}

/**
 * Gets the predominant season for a stay (most common season during the stay)
 */
export function getPredominantSeason(checkIn: Date, checkOut: Date): SeasonType {
  const seasonCounts: Record<SeasonType, number> = {
    peak: 0,
    high: 0,
    mid: 0,
    low: 0
  };
  
  const currentDate = new Date(checkIn);
  while (currentDate < checkOut) {
    const season = getSeasonForDate(currentDate);
    seasonCounts[season]++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Return the season with the most days
  return Object.entries(seasonCounts).reduce((a, b) => 
    seasonCounts[a[0] as SeasonType] > seasonCounts[b[0] as SeasonType] ? a : b
  )[0] as SeasonType;
}

/**
 * Helper function to convert accommodation type to config key
 */
function getConfigKey(accommodationType: AccommodationType): keyof typeof pricingConfig.basePrices {
  return accommodationType === 'entire-property' ? 'entireProperty' : 'poolhouseOnly';
}

/**
 * Main pricing calculation function
 */
export function calculatePricing(factors: PricingFactors): PricingBreakdown {
  const { accommodationType, dates, guests } = factors;
  const { nights } = dates;
  
  // Get base price for accommodation type and season
  const season = getPredominantSeason(dates.checkIn, dates.checkOut);
  const configKey = getConfigKey(accommodationType);
  const baseNightlyRate = pricingConfig.basePrices[configKey][season];
  const basePrice = baseNightlyRate * nights;
  
  // Calculate weekend surcharge
  const weekendNights = getWeekendNights(dates.checkIn, dates.checkOut);
  const weekendSurcharge = weekendNights * baseNightlyRate * (pricingConfig.multipliers.weekend - 1);
  
  // Calculate guest surcharge
  const capacity = pricingConfig.capacity[configKey];
  const extraGuests = Math.max(0, guests.total - capacity.includedGuests);
  const guestSurcharge = extraGuests * pricingConfig.multipliers.extraGuest * nights;
  
  // Calculate subtotal
  const subtotal = basePrice + weekendSurcharge + guestSurcharge;
  
  // Calculate fees
  const cleaningFee = pricingConfig.fees.cleaning;
  const taxes = subtotal * pricingConfig.fees.taxRate;
  
  // Calculate total
  const total = subtotal + cleaningFee + taxes;
  
  return {
    basePrice,
    seasonMultiplier: 1, // Could be used for dynamic seasonal adjustments
    weekendSurcharge,
    guestSurcharge,
    subtotal,
    taxes,
    cleaningFee,
    total
  };
}

/**
 * Validates if the number of guests is within limits for accommodation type
 */
export function validateGuestCount(guests: number, accommodationType: AccommodationType): boolean {
  const configKey = getConfigKey(accommodationType);
  const maxGuests = pricingConfig.capacity[configKey].maxGuests;
  return guests > 0 && guests <= maxGuests;
}

/**
 * Gets the maximum guest capacity for an accommodation type
 */
export function getMaxGuests(accommodationType: AccommodationType): number {
  const configKey = getConfigKey(accommodationType);
  return pricingConfig.capacity[configKey].maxGuests;
}

/**
 * Formats a price for display
 */
export function formatPrice(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

