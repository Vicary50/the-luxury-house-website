import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { BookingData } from '@/types';

// Initialize Stripe on the server side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// Initialize Stripe on the client side
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

/**
 * Create a payment intent for a booking
 */
export async function createPaymentIntent(booking: BookingData): Promise<Stripe.PaymentIntent> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booking.pricing.total * 100), // Convert to cents
    currency: 'gbp',
    metadata: {
      bookingId: booking.id || 'unknown',
      accommodationType: booking.accommodationType,
      checkIn: booking.dates.checkIn.toISOString(),
      checkOut: booking.dates.checkOut.toISOString(),
      guests: booking.guests.total.toString(),
      customerEmail: booking.customerInfo.email,
    },
    description: `The Luxury House booking - ${booking.accommodationType} for ${booking.dates.nights} nights`,
  });

  return paymentIntent;
}

/**
 * Create a Stripe Checkout session
 */
export async function createCheckoutSession(booking: BookingData): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `The Luxury House - ${booking.accommodationType === 'entire-property' ? 'Entire Property' : 'Poolhouse Only'}`,
            description: `${booking.dates.nights} nights for ${booking.guests.total} guests`,
            images: ['https://your-domain.com/images/hero-photo.jpg'], // Update with your actual image URLs
          },
          unit_amount: Math.round(booking.pricing.total * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking?step=2`,
    customer_email: booking.customerInfo.email,
    metadata: {
      bookingId: booking.id || 'unknown',
      accommodationType: booking.accommodationType,
      checkIn: booking.dates.checkIn.toISOString(),
      checkOut: booking.dates.checkOut.toISOString(),
      guests: booking.guests.total.toString(),
    },
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
  });

  return session;
}

/**
 * Retrieve a Stripe Checkout session
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(
  body: string,
  signature: string
): Promise<{ success: boolean; event?: Stripe.Event; error?: string }> {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful payment
        console.log('Payment successful for session:', session.id);
        // Update booking status in Google Sheets
        // Send confirmation email
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { success: true, event };
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Format price for display
 */
export function formatStripeAmount(amount: number, currency: string = 'gbp'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

/**
 * Validate Stripe webhook signature
 */
export function validateWebhookSignature(body: string, signature: string): boolean {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) return false;
    
    stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return true;
  } catch {
    return false;
  }
}