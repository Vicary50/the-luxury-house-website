import type { Metadata } from 'next';
import OccasionPage from '@/components/layout/OccasionPage';

export const metadata: Metadata = {
  title: 'Birthday Party House to Rent, East Yorkshire | The Luxury House',
  description: 'Rent a whole house for a 30th, 40th, 50th or 60th birthday weekend in East Yorkshire. Sleeps 15, with a heated pool, sauna, firepit terrace and dining for 8.',
  alternates: { canonical: '/birthday-party-house' },
};

export default function BirthdayPartyHousePage() {
  return (
    <OccasionPage
      guestBook={2}
      eyebrow="Birthday house to rent · East Yorkshire"
      title="A birthday weekend"
      titleItalic="under one roof."
      intro="Rent the whole house for a 30th, 40th, 50th or 60th with family or friends. It sleeps 13 adults and 2 children under 12, with a heated pool, sauna, firepit terrace and poolside villa. Birthday celebrations are welcome when agreed with us at booking."
      spreads={[
        {
          image: '/images/Dining%20area/Dining%20area%201.jpg',
          alt: 'The dining room, with a long dark table, cream chairs and white orchids, and garden views through the window',
          eyebrow: 'The birthday dinner',
          title: 'One long table,',
          titleItalic: 'and everyone at it.',
          paragraphs: [
            'The dining room seats 8, and the kitchen island and the poolside villa’s dining table take the rest. Two living rooms, each with a wood-burning stove, mean the party and the quiet corner can both happen.',
          ],
        },
        {
          image: '/images/Swimming%20pool/Swimming%20pool%206.jpg',
          alt: 'The heated outdoor pool, with the poolside villa and lounge terrace beyond',
          eyebrow: 'Heated pool',
          title: 'A swim',
          titleItalic: 'before the cake.',
          paragraphs: [
            'The outdoor pool is heated and open from 8am to 10pm. Children swim with an adult watching, and the sauna is for over-18s.',
          ],
        },
        {
          image: '/images/Master%20bedroom/Master%20bedroom%202.jpg',
          alt: 'The master bedroom, with a large upholstered bed and soft grey linen',
          eyebrow: 'Bedrooms',
          title: 'Five bedrooms,',
          titleItalic: 'five bathrooms.',
          paragraphs: [
            'There is 1 king-size bed, 3 double beds, 1 single bed, 2 bunk beds and 2 double sofa beds. The house sleeps 13 adults, plus 2 children under 12 in the bunk beds.',
          ],
          cta: true,
        },
      ]}
      factsTitle="The house for a birthday."
      facts={[
        ['Sleeps', '13 adults and 2 children under 12'],
        ['Bedrooms', '5, with 5 bathrooms'],
        ['Dining', 'Seats 8'],
        ['Pool', 'Heated, 8am to 10pm'],
        ['Sauna', 'Over-18s'],
        ['Parking', 'Up to 5 cars, free EV charger'],
        ['Beverley', '25 minutes by car'],
        ['Check-in', 'From 3pm'],
        ['Check-out', 'By 11am'],
      ]}
      faqs={[
        { question: 'Can we celebrate a birthday at the house?', answer: 'Yes, when agreed with us at booking. Only the guests named on the booking may stay or visit, so extra guests for a party are not allowed.' },
        { question: 'Is the house suitable for children?', answer: 'Yes. There is a playroom, a bunk room and a children’s room. Children must be supervised at all times, especially around the pool, and they cannot use the sauna.' },
        { question: 'Can we bring decorations?', answer: 'Yes, but please do not use tape, Blu Tack or anything adhesive on the walls.' },
        { question: 'How do we book?', answer: 'Send an enquiry with your dates and numbers. A non-refundable deposit of £1,000 secures the booking, with the balance due 30 days before arrival.' },
      ]}
    />
  );
}
