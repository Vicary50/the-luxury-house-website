import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimit';
import { escapeHtml } from '@/lib/escapeHtml';

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

    // Resend parses replyTo as `Display Name <addr>`; angle brackets or newlines
    // in an untrusted name break that parse and 422 the submission.
    const replyToName = String(name).replace(/[<>\r\n]/g, ' ').trim();
    const attachments = [{ filename: 'Signed_Terms.pdf', content: pdfBuffer }];

    const { error } = await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'theluxuryhouseuk@gmail.com',
      replyTo: `${replyToName} <${email}>`,
      subject: `Signed Terms & Conditions - ${name}`,
      html: `
        <h2>Signed Terms &amp; Conditions</h2>
        <p><strong>Lead Guest:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Date Signed:</strong> ${escapeHtml(dateSigned)}</p>
      `,
      attachments
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send signed terms', details: error },
        { status: 500 }
      );
    }

    // Give the signer their own copy of the contract they just signed.
    // Best-effort: the owner already holds the signed PDF, so a failure here
    // must not make the guest re-sign and send the owner a duplicate.
    const { error: copyError } = await resend.emails.send({
      from: 'The Luxury House <noreply@theluxuryhouse.uk>',
      to: email,
      subject: 'Your signed Terms & Conditions - The Luxury House',
      html: `
        <h2>Your signed Terms &amp; Conditions</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for signing our Terms &amp; Conditions. A copy of the document
        you signed is attached to this email for your records.</p>
        <p><strong>Date Signed:</strong> ${escapeHtml(dateSigned)}</p>
        <p>If you have any questions about these terms, reply to this email or
        contact us at ${escapeHtml(process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'theluxuryhouseuk@gmail.com')}.</p>
        <p>Best regards,<br>The Luxury House Team</p>
        <hr>
        <p style="color: #666; font-size: 12px;">The Luxury House | Beautiful East Yorkshire, United Kingdom</p>
      `,
      attachments
    });

    if (copyError) {
      console.error('Resend error sending signer copy:', copyError);
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
