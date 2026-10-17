import type { Metadata } from 'next';
import OccasionPage from '@/components/layout/OccasionPage';

export const metadata: Metadata = {
  title: 'Romantic Getaway with Heated Pool, East Yorkshire | The Luxury House',
  description: 'The poolside villa sleeps 2 and can be booked on its own: a lounge, kitchen, dining table and shower beside a heated outdoor pool, 25 minutes from Beverley.',
  alternates: { canonical: '/couples-retreat' },
};

export default function CouplesRetreatPage() {
  return (
    <OccasionPage
      guestBook={4}
      eyebrow="Romantic getaways · East Yorkshire"
      title="A weekend for two,"
      titleItalic="beside a heated pool."
      intro="The poolside villa sleeps 2 and can be booked on its own. It has its own lounge, kitchen, dining table and shower, steps from the heated outdoor pool, about 25 minutes from Beverley."
      spreads={[
        {
          image: '/images/Poolside%20villa/Poolside%20villa%20lounge%202.jpg',
          alt: 'The poolside villa lounge',
          eyebrow: 'The poolside villa',
          title: 'A lounge of your own,',
          titleItalic: 'by the water.',
          paragraphs: [
            'The villa has a lounge, a kitchen and a dining table, and a shower for after a swim.',
          ],
        },
        {
          image: '/images/Poolside%20villa/Poolside%20villa%20outside%20dining%20area.jpg',
          alt: 'The outdoor dining area beside the poolside villa',
          eyebrow: 'Outdoor dining',
          title: 'Lunch outside,',
          titleItalic: 'a swim after.',
          paragraphs: [
            'Eat at the villa’s outdoor dining area by the pool. The pool is heated and open from 8am to 10pm.',
            'For dinner out, Hull’s old town and the Yorkshire Wolds are close by; our activities guide has places to eat.',
          ],
          cta: true,
        },
      ]}
      factsTitle="The villa for two."
      facts={[
        ['Sleeps', '2 adults'],
        ['Villa', 'Lounge, kitchen, dining table, shower'],
        ['Pool', 'Heated, 8am to 10pm'],
        ['Beverley', '25 minutes by car'],
        ['Hull station', '8.3 miles'],
        ['Check-in', 'From 3pm'],
        ['Check-out', 'By 11am'],
      ]}
      faqs={[
        { question: 'Can we book just the villa?', answer: 'Yes. In the enquiry form, choose “Pool Villa & Heated Swimming Pool” as the accommodation type.' },
        { question: 'Where can we eat out?', answer: 'Our activities page lists restaurants and pubs in Hull and East Yorkshire.' },
      ]}
    />
  );
}
