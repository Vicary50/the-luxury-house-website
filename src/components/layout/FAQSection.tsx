'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string | ReactNode;
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
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
      question: "Are stag and hen parties allowed?",
      answer: "We welcome stag and hen parties. However, unauthorised celebrations, gatherings, large parties, or events are prohibited and may result in immediate termination of the booking without a refund."
    },
    {
      id: 6,
      question: "How many guests can sit at the dining table?",
      answer: "There is seating for 8 guests."
    },
    {
      id: 7,
      question: "Can you recommend any local places to eat out?",
      answer: (
        <span>
          Please see our{' '}
          <a 
            href="#amenities" 
            className="text-amber-600 hover:text-amber-700 underline"
          >
            Activities & Experiences page
          </a>
          .
        </span>
      )
    },
    {
      id: 8,
      question: "Are there any house rules we need to be aware of?",
      answer: "Key house rules include: maximum occupancy of 16 guests (14 adults, 2 children), no smoking indoors, no pets, quiet hours between 10:00 PM and 8:00 AM, and supervision required for children around the pool. Please treat the property with respect."
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

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            HOUSE FAQS
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700 font-medium pr-4">
                  {faq.question}
                </span>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openFAQ === faq.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}