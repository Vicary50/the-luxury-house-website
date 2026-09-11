import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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

    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

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
