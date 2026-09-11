import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_PDF_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, { limit: 3, windowMs: 60_000 });
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } }
      );
    }

    const formData = await request.formData();
    const name = formData.get('Name') as string;
    const email = formData.get('email') as string;
    const dateSigned = formData.get('Date Signed') as string;
    const pdfFile = formData.get('Signed_Terms_PDF') as File | null;

    if (!name || !email || !pdfFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (pdfFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Signed terms must be a PDF' },
        { status: 400 }
      );
    }

    if (pdfFile.size > MAX_PDF_BYTES) {
      return NextResponse.json(
        { error: 'Signed terms PDF is too large' },
        { status: 413 }
      );
    }

    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

    // Reject anything that is not really a PDF regardless of declared type.
    if (pdfBuffer.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return NextResponse.json(
        { error: 'Signed terms must be a PDF' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'theluxuryhouseuk@gmail.com',
      replyTo: `${name} <${email}>`,
      subject: `Signed Terms & Conditions - ${name}`,
      html: `
        <h2>Signed Terms &amp; Conditions</h2>
        <p><strong>Lead Guest:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date Signed:</strong> ${dateSigned}</p>
      `,
      attachments: [
        {
          filename: 'Signed_Terms.pdf',
          content: pdfBuffer
        }
      ]
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send signed terms', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Signed terms sent successfully' });

  } catch (error) {
    console.error('Sign-terms submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process signed terms' },
      { status: 500 }
    );
  }
}
