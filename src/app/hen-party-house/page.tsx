import type { Metadata } from 'next';
import OccasionPage from '@/components/layout/OccasionPage';

export const metadata: Metadata = {
  title: 'Hen Party House with Heated Pool, East Yorkshire | The Luxury House',
  description: 'A hen party house in East Yorkshire for up to 13 adults, with a heated pool, sauna, firepit terrace and five bedrooms. 25 minutes from Beverley, close to Hull.',
  alternates: { canonical: '/hen-party-house' },
};

export default function HenPartyHousePage() {
  return (
    <OccasionPage
      guestBook={3}
      eyebrow="Hen party house · East Yorkshire"
      title="A hen weekend"
      titleItalic="with the pool to yourselves."
      intro="The Luxury House is a five-bedroom house let as a whole, for hen groups of up to 13 adults. There is a heated outdoor pool, a sauna, a firepit terrace and a poolside villa. Hen weekends are welcome when agreed with us at booking."
      spreads={[
        {
          image: '/images/Swimming%20pool/Swimming%20pool%201.jpg',
          alt: 'The heated pool with its roller cover, the paved terrace and the back of the house',
          eyebrow: 'Heated pool and sauna',
          title: 'Afternoons',
          titleItalic: 'by the pool.',
          paragraphs: [
            'The outdoor pool is heated and open from 8am to 10pm. Loungers line the terrace, and the poolside villa has its own kitchen and shower for drinks and drying off.',
            'The sauna is for over-18s, in sessions of up to 25 minutes.',
          ],
        },
        {
          image: '/images/Dining%20area/Dining%20area%203.jpg',
          alt: 'The dining table laid for dinner',
          eyebrow: 'Kitchen and dining',
          title: 'Dinner for the bride,',
          titleItalic: 'then the fire.',
          paragraphs: [
            'Cook together at the kitchen island with the range cooker behind it. The dining table seats 8, and two living rooms give the group room to spread out.',
          ],
        },
        {
          image: '/images/Firepit/Fire%20pit%204.jpg',
          alt: 'A fire table burning on the terrace at the back of the house',
          eyebrow: 'Evenings',
          title: 'Late nights',
          titleItalic: 'around the fire tables.',
          paragraphs: [
            'Cushioned benches wrap around the firepit terrace, sheltered by a tall hedge. Quiet hours run from 10pm to 8am, so the music moves indoors after ten.',
          ],
          cta: true,
        },
      ]}
      factsTitle="The house for a hen weekend."
      facts={[
        ['Sleeps', 'Up to 13 adults'],
        ['Bedrooms', '5, with 5 bathrooms'],
        ['Pool', 'Heated, 8am to 10pm'],
        ['Sauna', 'Over-18s'],
        ['Parking', 'Up to 5 cars'],
        ['Beverley', '25 minutes by car'],
        ['Hull station', '8.3 miles'],
        ['Check-in', 'From 3pm'],
        ['Check-out', 'By 11am'],
      ]}
      faqs={[
        { question: 'Are hen parties allowed?', answer: 'Yes. Hen weekends are welcome when agreed with us at booking. Only the guests named on the booking may stay or visit, and other parties or events are not allowed.' },
        { question: 'Is there an age limit?', answer: 'The lead guest must be at least 21, and we do not accept groups made up entirely of people under 25.' },
        { question: 'Can we play music?', answer: 'Yes, indoors. Quiet hours are 10pm to 8am, and there is no amplified music outdoors during them.' },
        { question: 'Can we decorate the house?', answer: 'Yes, but please do not use tape, Blu Tack or anything adhesive on the walls.' },
        { question: 'How do we book?', answer: 'Send an enquiry with your dates and numbers. A non-refundable deposit of £1,000 secures the booking, with the balance due 30 days before arrival.' },
      ]}
    />
  );
}
