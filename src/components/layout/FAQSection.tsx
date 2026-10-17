import Link from 'next/link';
import type { ReactNode } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string | ReactNode;
}

const FAQS: FAQ[] = [
  {
    id: 1,
    question: "What are the check in and check out times?",
    answer: "Check-in is from 3:00 PM and check-out must be completed by 11:00 AM on the day of departure. Late check-outs may incur additional charges. We may be able to accommodate early check-in or late check-out requests with advance notice, subject to availability."
  },
  {
    id: 2,
    question: "How many cars can park at the property?",
    answer: "The property offers private parking for up to 5 cars."
  },
  {
    id: 3,
    question: "Is the house suitable for children?",
    answer: "Yes, the house is family-friendly. However, children must be supervised at all times, especially around the swimming pool and outdoor areas. Children are not permitted to use the sauna."
  },
  {
    id: 4,
    question: "Are pets allowed?",
    answer: "No pets are allowed in the property. Failure to adhere to this will result in immediate cancellation without refund."
  },
  {
    id: 5,
    question: "Are hen parties allowed?",
    answer: "We welcome hen parties. However, unauthorised celebrations, gatherings, large parties, or events are prohibited and may result in immediate termination of the booking without a refund."
  },
  {
    id: 6,
    question: "How many guests can sit at the dining table?",
    answer: "There is seating for 8 guests."
  },
  {
    id: 12,
    question: "What are the sleeping arrangements?",
    answer: "There is 1 king-size bed, 3 double beds, 1 single bed, 2 bunk beds and 2 double sofa beds. The house sleeps 14 adults and 2 children under 12."
  },
  {
    id: 7,
    question: "Can you recommend any local places to eat out?",
    answer: (
      <span>
        Please see our{' '}
        <Link href="/activities" className="text-ink underline underline-offset-4 hover:text-olive">
          Activities & Experiences page
        </Link>
        .
      </span>
    )
  },
  {
    id: 8,
    question: "Are there any house rules we need to be aware of?",
    answer: "Key house rules include: maximum occupancy of 14 adults and 2 children under 12, no smoking indoors, no pets, quiet hours between 10:00 PM and 8:00 AM, and supervision required for children around the pool. Please treat the property with respect."
  },
  {
    id: 9,
    question: "What is the nearest train station?",
    answer: "Brough station (6.9 miles) and Hull station (8.3 miles)."
  },
  {
    id: 10,
    question: "Will you hold a damage deposit during our stay?",
    answer: "Yes, a refundable security deposit of £500 is required to cover any damages or additional cleaning. This will be refunded within 7 days after departure, provided there is no damage or excessive cleaning required."
  },
  {
    id: 11,
    question: "How do I book?",
    answer: "You can make a reservation using our booking form on this website. A non-refundable deposit of £1000 is payable to confirm your booking, with the remaining balance due 30 days before arrival."
  }
];

// Summary of the rules already stated in the answers below; edit both together.
const HOUSE_RULES = [
  ['Check-in', 'From 3:00 PM'],
  ['Check-out', 'By 11:00 AM'],
  ['Smoking', 'Not indoors'],
  ['Pets', 'Not allowed'],
  ['Quiet hours', '10:00 PM to 8:00 AM'],
  ['Children', 'Supervised at all times, especially around the pool'],
  ['Security deposit', '£500, refundable'],
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Before you book</p>
          <h2 data-reveal className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
            Questions
            <em className="block font-light">and house rules.</em>
          </h2>

          <dl data-reveal className="mt-10 border-t border-hairline">
            {HOUSE_RULES.map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-hairline py-3 text-[0.9375rem]">
                <dt className="text-ink">{term}</dt>
                <dd className="text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Native <details>: keyboard, focus and open state come from the browser. */}
        <div className="border-t border-hairline lg:col-span-7 lg:col-start-6">
          {FAQS.map((faq) => (
            <details key={faq.id} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[1.375rem] leading-snug text-ink transition-colors duration-300 hover:text-olive [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="mt-1 text-2xl font-light leading-none text-olive transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">+</span>
              </summary>
              <p className="max-w-2xl pb-7 text-[1.0625rem] leading-[1.75] text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
