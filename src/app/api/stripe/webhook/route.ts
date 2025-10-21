import { NextRequest, NextResponse } from 'next/server';
import { handleStripeWebhook } from '@/lib/stripe/stripe';
import { updateBookingStatus } from '@/lib/sheets/googleSheets';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    const result = await handleStripeWebhook(body, signature);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Handle successful payment
    if (result.event?.type === 'checkout.session.completed') {
      const session = result.event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        // Update booking status to confirmed and payment status to paid
        await updateBookingStatus(bookingId, 'confirmed', 'paid');
        
        // Here you could also send a confirmation email
        console.log(`Booking ${bookingId} confirmed and payment completed`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}