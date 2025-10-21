import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe/stripe';
import { BookingData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Validate booking data
    if (!bookingData.id || !bookingData.accommodationType || !bookingData.dates || !bookingData.pricing) {
      return NextResponse.json(
        { error: 'Invalid booking data' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(bookingData);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}