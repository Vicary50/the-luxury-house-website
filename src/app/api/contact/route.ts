import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimit';
import { escapeHtml } from '@/lib/escapeHtml';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, { limit: 5, windowMs: 60_000 });
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      telephone,
      accommodationType,
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfChildren,
      numberOfInfants
    } = body;

    // Validate required fields
    if (!name || !email || !telephone || !accommodationType || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Calculate nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Guest counts arrive as JSON and may be strings; coerce so the total is a
    // sum rather than a concatenation, and so they cannot carry markup.
    const adults = Number(numberOfAdults) || 0;
    const children = Number(numberOfChildren) || 0;
    const infants = Number(numberOfInfants) || 0;

    // Resend parses replyTo as `Display Name <addr>`; angle brackets or newlines
    // in an untrusted name break that parse and 422 the whole enquiry.
    const replyToName = String(name).replace(/[<>\r\n]/g, ' ').trim();

    const checkInLabel = checkIn.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const checkOutLabel = checkOut.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Format accommodation type for display
    const accommodationName = accommodationType === 'entire-property'
      ? 'The Luxury House - Main House, Pool Villa, Heated Swimming Pool'
      : 'Pool Villa & Heated Swimming Pool';

    // Prepare email content
    const emailHtml = `
      <h2>New Contact Form Inquiry</h2>
      <p><strong>From:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telephone:</strong> ${escapeHtml(telephone)}</p>

      <h3>Booking Details</h3>
      <p><strong>Accommodation:</strong> ${accommodationName}</p>
      <p><strong>Check-in:</strong> ${checkInLabel}</p>
      <p><strong>Check-out:</strong> ${checkOutLabel}</p>
      <p><strong>Number of nights:</strong> ${nights}</p>

      <h3>Guests</h3>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children (2-12 years):</strong> ${children}</p>
      <p><strong>Infants (under 2):</strong> ${infants}</p>
      <p><strong>Total guests:</strong> ${adults + children + infants}</p>

      <hr>
      <p style="color: #666; font-size: 12px;">This inquiry was submitted through the contact form at ${process.env.NEXT_PUBLIC_SITE_URL}</p>
    `;

    const confirmationHtml = `
      <h2>Thank you for your inquiry!</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>We have received your inquiry for ${accommodationName} and will get back to you as soon as possible.</p>

      <h3>Your Inquiry Details:</h3>
      <p><strong>Check-in:</strong> ${checkInLabel}</p>
      <p><strong>Check-out:</strong> ${checkOutLabel}</p>
      <p><strong>Guests:</strong> ${adults} adults, ${children} children, ${infants} infants</p>

      <p>We typically respond within 24 hours. If you have any urgent questions, please feel free to contact us directly at ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}.</p>

      <p>Best regards,<br>The Luxury House Team</p>

      <hr>
      <p style="color: #666; font-size: 12px;">The Luxury House | Beautiful East Yorkshire, United Kingdom</p>
    `;

    // Send email to property owner using Resend
    const { error: ownerEmailError } = await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'theluxuryhouseuk@gmail.com',
      replyTo: `${replyToName} <${email}>`,
      subject: `New Inquiry from ${name} - ${accommodationName}`,
      html: emailHtml
    });

    if (ownerEmailError) {
      console.error('Resend error:', ownerEmailError);
      return NextResponse.json(
        { error: 'Failed to send email', details: ownerEmailError },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: email,
      subject: 'Thank you for your inquiry - The Luxury House',
      html: confirmationHtml
    });

    return NextResponse.json({
      message: 'Inquiry sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
