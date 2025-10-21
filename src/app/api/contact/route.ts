import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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

    // Format accommodation type for display
    const accommodationName = accommodationType === 'entire-property'
      ? 'The Luxury House - Main House, Pool Villa, Heated Swimming Pool'
      : 'Pool Villa & Heated Swimming Pool';

    // Send email to property owner
    const { data, error } = await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>', // You'll need to verify your domain with Resend
      to: [process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'theluxuryhouseuk@gmail.com'],
      replyTo: email,
      subject: `New Inquiry from ${name} - ${accommodationName}`,
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${telephone}</p>
        
        <h3>Booking Details</h3>
        <p><strong>Accommodation:</strong> ${accommodationName}</p>
        <p><strong>Check-in:</strong> ${checkIn.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Check-out:</strong> ${checkOut.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Number of nights:</strong> ${nights}</p>
        
        <h3>Guests</h3>
        <p><strong>Adults:</strong> ${numberOfAdults}</p>
        <p><strong>Children (2-12 years):</strong> ${numberOfChildren}</p>
        <p><strong>Infants (under 2):</strong> ${numberOfInfants}</p>
        <p><strong>Total guests:</strong> ${numberOfAdults + numberOfChildren + numberOfInfants}</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">This inquiry was submitted through the contact form at ${process.env.NEXT_PUBLIC_SITE_URL}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: [email],
      subject: 'Thank you for your inquiry - The Luxury House',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry for ${accommodationName} and will get back to you as soon as possible.</p>
        
        <h3>Your Inquiry Details:</h3>
        <p><strong>Check-in:</strong> ${checkIn.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Check-out:</strong> ${checkOut.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Guests:</strong> ${numberOfAdults} adults, ${numberOfChildren} children, ${numberOfInfants} infants</p>
        
        <p>We typically respond within 24 hours. If you have any urgent questions, please feel free to contact us directly at ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}.</p>
        
        <p>Best regards,<br>The Luxury House Team</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">The Luxury House | Beautiful East Yorkshire, United Kingdom</p>
      `,
    });

    return NextResponse.json({ 
      message: 'Inquiry sent successfully',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
