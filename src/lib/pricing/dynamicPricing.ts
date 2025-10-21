import { AccommodationType } from '@/types';

// Import googleapis only on server side
type GoogleSheetsAPI = {
  auth: {
    GoogleAuth: new (config: {
      credentials: {
        client_email: string;
        private_key: string;
      };
      scopes: string[];
    }) => unknown;
  };
  sheets: (config: { version: string; auth: unknown }) => {
    spreadsheets: {
      values: {
        get: (params: {
          spreadsheetId: string;
          range: string;
        }) => Promise<{ data: { values?: string[][] } }>;
      };
    };
  };
};

let google: GoogleSheetsAPI | null = null;

async function getGoogleAPI(): Promise<GoogleSheetsAPI | null> {
  if (typeof window !== 'undefined') return null;
  
  if (google) return google;
  
  try {
    const googleapis = await import('googleapis');
    google = googleapis as unknown as GoogleSheetsAPI;
    return google;
  } catch (error) {
    console.warn('Google APIs not available:', error);
    return null;
  }
}

// Enhanced pricing interfaces
export interface BaseRate {
  accommodation: AccommodationType;
  weeknightBase: number;
  weekendBase: number;
  peakWeeknightBase: number;
  peakWeekendBase: number;
  minStayStandard: number;
  minStayPeak: number;
  priceFloor: number;
  priceCeiling: number;
}

export interface SeasonalPricing {
  season: string;
  startMonth: number;
  endMonth: number;
  weekdayMultiplier: number;
  weekendMultiplier: number;
  minStay: number;
  description: string;
}

export interface SpecialEvent {
  eventName: string;
  eventType: string;
  startDate?: string;
  endDate?: string;
  multiplier: number;
  flatFee: number;
  minNights: number;
  active: boolean;
  notes: string;
}

export interface LocalEvent {
  eventName: string;
  startDate: string;
  endDate: string;
  multiplier: number;
  active: boolean;
  location: string;
  notes: string;
}

export interface PricingRule {
  ruleType: string;
  condition: string;
  value: string;
  multiplier: number;
  flatFee: number;
  active: boolean;
  description: string;
}

export interface DynamicPricingBreakdown {
  basePrice: number;
  seasonalAdjustment: number;
  weekendSurcharge: number;
  specialEventSurcharge: number;
  guestSurcharge: number;
  lengthOfStayDiscount: number;
  lastMinuteDiscount: number;
  bookingWindowPremium: number;
  dayOfWeekSurcharge: number;
  flatFees: number;
  subtotal: number;
  cleaningFee: number;
  taxes: number;
  total: number;
  breakdown: Array<{
    description: string;
    amount: number;
    type: 'base' | 'multiplier' | 'discount' | 'surcharge' | 'fee';
  }>;
  minimumStay: number;
  appliedRules: string[];
}

class DynamicPricingEngine {
  private sheets: {
    spreadsheets: {
      values: {
        get: (params: {
          spreadsheetId: string;
          range: string;
        }) => Promise<{ data: { values?: string[][] } }>;
      };
    };
  } | null;
  private spreadsheetId: string;

  constructor() {
    this.sheets = null;
    this.spreadsheetId = '';
  }

  async initialize() {
    if (typeof window !== 'undefined') return;

    const googleAPI = await getGoogleAPI();
    
    if (googleAPI && process.env.GOOGLE_SHEETS_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEETS_ID) {
      try {
        const auth = new googleAPI.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_EMAIL,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        this.sheets = googleAPI.sheets({ version: 'v4', auth });
        this.spreadsheetId = process.env.GOOGLE_SHEETS_ID || '';
      } catch {
        console.log('Google Sheets not properly configured, will use fallback pricing');
        this.sheets = null;
        this.spreadsheetId = '';
      }
    } else {
      console.log('Google Sheets environment variables not set, using fallback pricing');
    }
  }

  private async getSheetData(sheetName: string, range: string): Promise<string[][]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!${range}`,
      });
      return response.data.values || [];
    } catch (error) {
      console.error(`Error fetching ${sheetName} data:`, error);
      return [];
    }
  }

  private async getBaseRates(): Promise<BaseRate[]> {
    const data = await this.getSheetData('Base_Rates', 'A2:I10');
    return data.map(row => ({
      accommodation: row[0] as AccommodationType,
      weeknightBase: parseFloat(row[1]) || 0,
      weekendBase: parseFloat(row[2]) || 0,
      peakWeeknightBase: parseFloat(row[3]) || 0,
      peakWeekendBase: parseFloat(row[4]) || 0,
      minStayStandard: parseInt(row[5]) || 2,
      minStayPeak: parseInt(row[6]) || 3,
      priceFloor: parseFloat(row[7]) || 0,
      priceCeiling: parseFloat(row[8]) || 9999,
    }));
  }

  private async getSeasonalPricing(): Promise<SeasonalPricing[]> {
    const data = await this.getSheetData('Seasonal_Pricing', 'A2:G10');
    return data.map(row => ({
      season: row[0] || '',
      startMonth: parseInt(row[1]) || 1,
      endMonth: parseInt(row[2]) || 12,
      weekdayMultiplier: parseFloat(row[3]) || 1.0,
      weekendMultiplier: parseFloat(row[4]) || 1.0,
      minStay: parseInt(row[5]) || 2,
      description: row[6] || '',
    }));
  }

  private async getSpecialEvents(): Promise<SpecialEvent[]> {
    const data = await this.getSheetData('Special_Events', 'A2:I50');
    return data.map(row => ({
      eventName: row[0] || '',
      eventType: row[1] || '',
      startDate: row[2] || undefined,
      endDate: row[3] || undefined,
      multiplier: parseFloat(row[4]) || 1.0,
      flatFee: parseFloat(row[5]) || 0,
      minNights: parseInt(row[6]) || 2,
      active: (row[7] || '').toUpperCase() === 'YES',
      notes: row[8] || '',
    }));
  }

  private async getLocalEvents(): Promise<LocalEvent[]> {
    const data = await this.getSheetData('Local_Events', 'A2:G30');
    return data.map(row => ({
      eventName: row[0] || '',
      startDate: row[1] || '',
      endDate: row[2] || '',
      multiplier: parseFloat(row[3]) || 1.0,
      active: (row[4] || '').toUpperCase() === 'YES',
      location: row[5] || '',
      notes: row[6] || '',
    }));
  }

  private async getPricingRules(): Promise<PricingRule[]> {
    const data = await this.getSheetData('Pricing_Rules', 'A2:G30');
    return data.map(row => ({
      ruleType: row[0] || '',
      condition: row[1] || '',
      value: row[2] || '',
      multiplier: parseFloat(row[3]) || 1.0,
      flatFee: parseFloat(row[4]) || 0,
      active: (row[5] || '').toUpperCase() === 'YES',
      description: row[6] || '',
    }));
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 5 || day === 6; // Friday or Saturday
  }

  private isFriday(date: Date): boolean {
    return date.getDay() === 5;
  }

  private isSaturday(date: Date): boolean {
    return date.getDay() === 6;
  }

  private getCurrentSeason(date: Date, seasonalPricing: SeasonalPricing[]): SeasonalPricing | null {
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    
    for (const season of seasonalPricing) {
      if (season.startMonth <= season.endMonth) {
        // Normal season (e.g., June-September)
        if (month >= season.startMonth && month <= season.endMonth) {
          return season;
        }
      } else {
        // Cross-year season (e.g., October-March)
        if (month >= season.startMonth || month <= season.endMonth) {
          return season;
        }
      }
    }
    
    return null;
  }

  private isDateInRange(date: Date, startDate: string, endDate: string): boolean {
    if (!startDate || !endDate) return false;
    
    const checkDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return checkDate >= start && checkDate <= end;
  }

  private getAdvanceBookingDays(checkInDate: Date): number {
    const today = new Date();
    const diffTime = checkInDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private calculateLengthOfStay(checkInDate: Date, checkOutDate: Date): number {
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async calculateDynamicPricing(
    accommodationType: AccommodationType,
    checkInDate: Date,
    checkOutDate: Date,
    guestCount: number,
    specialEventTypes: string[] = [],
    addOns: string[] = []
  ): Promise<DynamicPricingBreakdown> {
    // Check if Google Sheets is available
    if (!this.sheets || !this.spreadsheetId) {
      throw new Error('Google Sheets not configured - using fallback pricing');
    }

    // Fetch all pricing data
    const [baseRates, seasonalPricing, specialEvents, localEvents, pricingRules] = await Promise.all([
      this.getBaseRates(),
      this.getSeasonalPricing(),
      this.getSpecialEvents(),
      this.getLocalEvents(),
      this.getPricingRules()
    ]);

    const baseRate = baseRates.find(rate => rate.accommodation === accommodationType);
    if (!baseRate) {
      throw new Error(`Base rate not found for accommodation type: ${accommodationType}`);
    }

    const nights = this.calculateLengthOfStay(checkInDate, checkOutDate);
    const breakdown: DynamicPricingBreakdown['breakdown'] = [];
    const appliedRules: string[] = [];
    
    let totalPrice = 0;
    let minimumStay = baseRate.minStayStandard;

    // Calculate nightly rates
    for (let i = 0; i < nights; i++) {
      const currentDate = new Date(checkInDate);
      currentDate.setDate(currentDate.getDate() + i);
      
      // Start with base rate
      const isWeekendNight = this.isWeekend(currentDate);
      let nightlyRate = isWeekendNight ? baseRate.weekendBase : baseRate.weeknightBase;
      
      // Apply seasonal multiplier
      const season = this.getCurrentSeason(currentDate, seasonalPricing);
      if (season) {
        const seasonMultiplier = isWeekendNight ? season.weekendMultiplier : season.weekdayMultiplier;
        nightlyRate *= seasonMultiplier;
        minimumStay = Math.max(minimumStay, season.minStay);
        
        if (i === 0) { // Only add to breakdown once
          breakdown.push({
            description: `${season.season} season ${isWeekendNight ? 'weekend' : 'weekday'} adjustment`,
            amount: nightlyRate - (isWeekendNight ? baseRate.weekendBase : baseRate.weeknightBase),
            type: 'multiplier'
          });
          appliedRules.push(`${season.season} Season`);
        }
      }

      // Check for special events on this date
      for (const event of specialEvents) {
        if (!event.active) continue;
        
        let eventApplies = false;
        
        if (event.startDate && event.endDate) {
          // Date-specific events
          eventApplies = this.isDateInRange(currentDate, event.startDate, event.endDate);
        } else {
          // Event type-based (e.g., Hen/Stag party)
          eventApplies = specialEventTypes.includes(event.eventType);
        }
        
        if (eventApplies) {
          nightlyRate *= event.multiplier;
          minimumStay = Math.max(minimumStay, event.minNights);
          
          if (i === 0) { // Only add to breakdown once
            breakdown.push({
              description: `${event.eventName} surcharge`,
              amount: nightlyRate * (event.multiplier - 1),
              type: 'surcharge'
            });
            appliedRules.push(event.eventName);
          }
        }
      }

      // Check for local events
      for (const event of localEvents) {
        if (!event.active) continue;
        
        if (this.isDateInRange(currentDate, event.startDate, event.endDate)) {
          nightlyRate *= event.multiplier;
          
          if (i === 0) { // Only add to breakdown once
            breakdown.push({
              description: `${event.eventName} local event surcharge`,
              amount: nightlyRate * (event.multiplier - 1),
              type: 'surcharge'
            });
            appliedRules.push(`Local Event: ${event.eventName}`);
          }
        }
      }

      // Day-of-week surcharges
      if (this.isFriday(currentDate)) {
        const fridayRule = pricingRules.find(rule => 
          rule.ruleType === 'Day_Week' && rule.condition === 'Friday' && rule.active
        );
        if (fridayRule) {
          nightlyRate *= fridayRule.multiplier;
          if (i === 0) {
            breakdown.push({
              description: 'Friday surcharge',
              amount: nightlyRate * (fridayRule.multiplier - 1),
              type: 'surcharge'
            });
            appliedRules.push('Friday Surcharge');
          }
        }
      }

      if (this.isSaturday(currentDate)) {
        const saturdayRule = pricingRules.find(rule => 
          rule.ruleType === 'Day_Week' && rule.condition === 'Saturday' && rule.active
        );
        if (saturdayRule) {
          nightlyRate *= saturdayRule.multiplier;
          if (i === 0) {
            breakdown.push({
              description: 'Saturday surcharge',
              amount: nightlyRate * (saturdayRule.multiplier - 1),
              type: 'surcharge'
            });
            appliedRules.push('Saturday Surcharge');
          }
        }
      }

      // Apply price floor and ceiling
      nightlyRate = Math.max(nightlyRate, baseRate.priceFloor);
      nightlyRate = Math.min(nightlyRate, baseRate.priceCeiling);

      totalPrice += nightlyRate;
    }

    // Apply guest count surcharges
    const maxIncludedGuests = accommodationType === 'entire-property' ? 8 : 3;
    if (guestCount > maxIncludedGuests) {
      const guestRule = pricingRules.find(rule => {
        if (rule.ruleType !== 'Guest_Count' || !rule.active) return false;
        
        if (accommodationType === 'entire-property') {
          if (guestCount >= 9 && guestCount <= 12 && rule.condition === '9-12_guests') return true;
          if (guestCount >= 13 && guestCount <= 15 && rule.condition === '13-15_guests') return true;
        }
        
        return false;
      });

      if (guestRule) {
        const guestSurcharge = totalPrice * (guestRule.multiplier - 1);
        totalPrice *= guestRule.multiplier;
        breakdown.push({
          description: `${guestCount} guests surcharge`,
          amount: guestSurcharge,
          type: 'surcharge'
        });
        appliedRules.push(`${guestCount} Guests Surcharge`);
      }
    }

    // Apply length of stay discounts
    const lengthStayRule = pricingRules.find(rule => {
      if (rule.ruleType !== 'Length_Stay' || !rule.active) return false;
      
      if (nights >= 7 && nights <= 13 && rule.condition === '7-13_nights') return true;
      if (nights >= 14 && nights <= 27 && rule.condition === '14-27_nights') return true;
      if (nights >= 28 && rule.condition === '28+_nights') return true;
      
      return false;
    });

    let lengthOfStayDiscount = 0;
    if (lengthStayRule) {
      lengthOfStayDiscount = totalPrice * (1 - lengthStayRule.multiplier);
      totalPrice *= lengthStayRule.multiplier;
      breakdown.push({
        description: `${nights} nights length of stay discount`,
        amount: -lengthOfStayDiscount,
        type: 'discount'
      });
      appliedRules.push(`${nights} Nights Discount`);
    }

    // Apply last-minute booking discounts
    const advanceDays = this.getAdvanceBookingDays(checkInDate);
    const lastMinuteRule = pricingRules.find(rule => {
      if (rule.ruleType !== 'Last_Minute' || !rule.active) return false;
      
      if (advanceDays >= 1 && advanceDays <= 2 && rule.condition === '1-2_days') return true;
      if (advanceDays >= 3 && advanceDays <= 6 && rule.condition === '3-6_days') return true;
      if (advanceDays >= 7 && advanceDays <= 13 && rule.condition === '7-13_days') return true;
      
      return false;
    });

    let lastMinuteDiscount = 0;
    if (lastMinuteRule) {
      lastMinuteDiscount = totalPrice * (1 - lastMinuteRule.multiplier);
      totalPrice *= lastMinuteRule.multiplier;
      breakdown.push({
        description: `${advanceDays} days advance booking discount`,
        amount: -lastMinuteDiscount,
        type: 'discount'
      });
      appliedRules.push(`Last Minute Discount`);
    }

    // Calculate flat fees
    let totalFlatFees = 0;

    // Special event flat fees
    for (const event of specialEvents) {
      if (!event.active || event.flatFee === 0) continue;
      
      if (specialEventTypes.includes(event.eventType)) {
        totalFlatFees += event.flatFee;
        breakdown.push({
          description: event.eventName,
          amount: event.flatFee,
          type: 'fee'
        });
        appliedRules.push(`${event.eventName} Fee`);
      }
    }

    // Add-on fees
    for (const addOn of addOns) {
      const addOnRule = pricingRules.find(rule => 
        rule.ruleType === 'Add_On' && rule.condition === addOn && rule.active
      );
      
      if (addOnRule && addOnRule.flatFee > 0) {
        totalFlatFees += addOnRule.flatFee;
        breakdown.push({
          description: addOnRule.description,
          amount: addOnRule.flatFee,
          type: 'fee'
        });
        appliedRules.push(addOnRule.description);
      }
    }

    // Calculate final totals
    const subtotal = totalPrice + totalFlatFees;
    const cleaningFee = 75; // From original pricing
    const taxes = (subtotal + cleaningFee) * 0.20; // 20% VAT
    const finalTotal = subtotal + cleaningFee + taxes;

    return {
      basePrice: totalPrice,
      seasonalAdjustment: 0, // Included in basePrice calculation
      weekendSurcharge: 0, // Included in basePrice calculation
      specialEventSurcharge: 0, // Included in basePrice calculation
      guestSurcharge: 0, // Included in basePrice calculation
      lengthOfStayDiscount,
      lastMinuteDiscount,
      bookingWindowPremium: 0, // TODO: Implement if needed
      dayOfWeekSurcharge: 0, // Included in basePrice calculation
      flatFees: totalFlatFees,
      subtotal,
      cleaningFee,
      taxes,
      total: finalTotal,
      breakdown,
      minimumStay,
      appliedRules
    };
  }
}

const pricingEngineInstance = new DynamicPricingEngine();

// Initialize the engine once
let initPromise: Promise<void> | null = null;

export const dynamicPricingEngine = {
  async calculatePrice(...args: Parameters<DynamicPricingEngine['calculatePrice']>) {
    if (!initPromise) {
      initPromise = pricingEngineInstance.initialize();
    }
    await initPromise;
    return pricingEngineInstance.calculatePrice(...args);
  }
};