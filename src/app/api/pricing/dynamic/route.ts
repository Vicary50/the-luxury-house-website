import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      accommodationType,
      checkInDate,
      checkOutDate,
      guestCount
    } = body;

    // Validate required fields
    if (!accommodationType || !checkInDate || !checkOutDate || !guestCount) {
      return NextResponse.json(
        { error: 'Missing required fields: accommodationType, checkInDate, checkOutDate, guestCount' },
        { status: 400 }
      );
    }

    // Convert dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validate dates
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Use static pricing calculation for now (Google Sheets integration for production)
    console.log('Using static pricing calculation');
    const { calculatePricing } = await import('@/lib/booking/pricing');
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const pricingFactors = {
      accommodationType,
      dates: { checkIn, checkOut, nights },
      guests: { 
        adults: Math.max(1, guestCount - 1), 
        children: Math.min(guestCount - 1, 1), 
        infants: 0, 
        total: guestCount 
      },
      isWeekend: false,
      season: 'mid' as const
    };
    const staticPricing = calculatePricing(pricingFactors);
    
    // Convert to dynamic pricing format for consistent API response
    const pricingBreakdown = {
      basePrice: staticPricing.basePrice,
      seasonalAdjustment: 0,
      weekendSurcharge: staticPricing.weekendSurcharge,
      specialEventSurcharge: 0,
      guestSurcharge: staticPricing.guestSurcharge,
      lengthOfStayDiscount: 0,
      lastMinuteDiscount: 0,
      bookingWindowPremium: 0,
      dayOfWeekSurcharge: 0,
      flatFees: 0,
      subtotal: staticPricing.subtotal,
      cleaningFee: staticPricing.cleaningFee,
      taxes: staticPricing.taxes,
      total: staticPricing.total,
      breakdown: [
        { description: `Accommodation (${nights} nights)`, amount: staticPricing.basePrice, type: 'base' as const },
        { description: 'Weekend surcharge', amount: staticPricing.weekendSurcharge, type: 'surcharge' as const },
        { description: 'Guest surcharge', amount: staticPricing.guestSurcharge, type: 'surcharge' as const },
        { description: 'Cleaning fee', amount: staticPricing.cleaningFee, type: 'fee' as const },
        { description: 'Taxes', amount: staticPricing.taxes, type: 'fee' as const }
      ],
      minimumStay: 2,
      appliedRules: ['Static Pricing System']
    };

    return NextResponse.json({
      success: true,
      pricing: pricingBreakdown,
      summary: {
        accommodation: accommodationType,
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
        nights: Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)),
        guests: guestCount,
        total: pricingBreakdown.total,
        minimumStay: pricingBreakdown.minimumStay
      }
    });

  } catch (error) {
    console.error('Dynamic pricing calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate pricing', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Example usage endpoint
  
  // Example usage endpoint
  return NextResponse.json({
    message: 'Dynamic Pricing API',
    usage: {
      method: 'POST',
      endpoint: '/api/pricing/dynamic',
      body: {
        accommodationType: 'entire-property | poolhouse-only',
        checkInDate: '2025-08-23',
        checkOutDate: '2025-08-26',
        guestCount: 8,
        specialEventTypes: ['Hen/Stag Party', 'Birthday/Anniversary'],
        addOns: ['Early_Checkin', 'Late_Checkout']
      }
    },
    availableEventTypes: [
      'Hen/Stag Party',
      'Birthday/Anniversary',
      'Wedding Party',
      'Corporate Event'
    ],
    availableAddOns: [
      'Early_Checkin',
      'Late_Checkout',
      'Winter_Pool',
      'Extra_Cleaning'
    ]
  });
}