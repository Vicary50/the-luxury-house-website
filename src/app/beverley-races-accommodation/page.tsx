import type { Metadata } from 'next';
import OccasionPage from '@/components/layout/OccasionPage';

export const metadata: Metadata = {
  title: 'Accommodation near Beverley Racecourse | The Luxury House',
  description: 'A luxury house for groups, 25 minutes from Beverley Racecourse. Sleeps 15, with a heated pool, sauna and firepit terrace for after the last race. Parking for 5 cars.',
  alternates: { canonical: '/beverley-races-accommodation' },
};

export default function BeverleyRacesPage() {
  return (
    <OccasionPage
      guestBook={5}
      eyebrow="Beverley Racecourse · 25 minutes"
      title="Race day at Beverley,"
      titleItalic="then home to the pool."
      intro="The Luxury House is a five-bedroom house about 25 minutes’ drive from Beverley and its racecourse, let as a whole for up to 13 adults and 2 children under 12. Come back from the races to a heated pool, a sauna and the fire tables on the terrace."
      spreads={[
        {
          image: '/images/Swimming%20pool/Swimming%20pool%201.jpg',
          alt: 'The heated pool with its roller cover, the paved terrace and the back of the house',
          eyebrow: 'After the races',
          title: 'Back for a swim,',
          titleItalic: 'before dinner.',
          paragraphs: [
            'The heated outdoor pool is open until 10pm, and the poolside villa has a lounge and shower for drying off.',
          ],
        },
        {
          image: '/images/Firepit/Fire%20pit%201.jpg',
          alt: 'The firepit terrace with its cushioned benches',
          eyebrow: 'Evenings',
          title: 'The day’s results,',
          titleItalic: 'talked over by the fire.',
          paragraphs: [
            'Cushioned benches wrap around the firepit terrace. Inside there are two living rooms with wood-burning stoves, and a dining room that seats 8.',
          ],
          cta: true,
        },
      ]}
      factsTitle="Getting to the races."
      facts={[
        ['Beverley Racecourse', 'About 25 minutes by car'],
        ['Race season', 'April to September'],
        ['Parking', 'Up to 5 cars, free EV charger'],
        ['Hull station', '8.3 miles'],
        ['Brough station', '6.9 miles'],
        ['Sleeps', '13 adults and 2 children under 12'],
        ['Check-in', 'From 3pm'],
        ['Check-out', 'By 11am'],
      ]}
      faqs={[
        { question: 'How far is the house from Beverley Racecourse?', answer: 'About 25 minutes by car. We do not publish the address; you receive it with directions before you arrive.' },
        { question: 'When are the race meetings?', answer: 'Beverley races from April to September. Check the fixture list on beverley-racecourse.co.uk, then send us an enquiry for those dates.' },
        { question: 'Is there parking for our cars?', answer: 'Yes, private parking for up to 5 cars, and a free EV charger.' },
        { question: 'How do we book?', answer: 'Send an enquiry with your dates and numbers. A non-refundable deposit of £1,000 secures the booking, with the balance due 30 days before arrival.' },
      ]}
    />
  );
}
