'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Mail, MapPin } from 'lucide-react';

const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft';
const fieldClass = 'w-full rounded-[2px] border border-hairline bg-paper px-4 py-3 text-ink placeholder:text-muted/70 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive';

interface ContactFormData {
  name: string;
  email: string;
  telephone: string;
  accommodationType: 'entire-property' | 'poolhouse';
  checkInDate: Date | null;
  checkOutDate: Date | null;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
}

export default function ReserveStaySection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    telephone: '',
    accommodationType: 'entire-property',
    checkInDate: null,
    checkOutDate: null,
    numberOfAdults: 2,
    numberOfChildren: 0,
    numberOfInfants: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'checking' | 'available' | 'unavailable' | null>(null);

  // Get price breakdown details for display
  const getPriceBreakdown = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return null;

    const nights = Math.ceil((formData.checkOutDate.getTime() - formData.checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return null;

    const actualNights = Math.max(nights, 2);
    const totalGuests = formData.numberOfAdults + formData.numberOfChildren;

    if (formData.accommodationType === 'entire-property') {
      const adultsCharged = Math.max(formData.numberOfAdults, 10);
      const childrenCharged = totalGuests > 10 ? Math.max(0, totalGuests - 10) : 0;

      const adultsCost = adultsCharged * 120 * actualNights;
      const childrenCost = childrenCharged * 50 * actualNights;
      const totalCost = adultsCost + childrenCost;

      return {
        adultsEntered: formData.numberOfAdults,
        adultsCharged,
        childrenEntered: formData.numberOfChildren,
        childrenCharged,
        infantsEntered: formData.numberOfInfants,
        nights: actualNights,
        adultsCost,
        childrenCost,
        totalCost,
        perNightCost: totalCost / actualNights
      };
    } else {
      // Pool Villa
      const adultsCharged = Math.max(formData.numberOfAdults, 2);
      const adultsCost = adultsCharged * 115 * actualNights;
      const childrenCost = 0; // Children are FREE for Pool Villa
      const totalCost = adultsCost;

      return {
        adultsEntered: formData.numberOfAdults,
        adultsCharged,
        childrenEntered: formData.numberOfChildren,
        childrenCharged: 0, // Children are FREE
        infantsEntered: formData.numberOfInfants,
        nights: actualNights,
        adultsCost,
        childrenCost,
        totalCost,
        perNightCost: totalCost / actualNights
      };
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | Date | null | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAvailabilityStatus('checking');

    // Validate form first
    if (!formData.name || !formData.email || !formData.telephone || !formData.checkInDate || !formData.checkOutDate) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      setAvailabilityStatus(null);
      return;
    }

    try {
      // Submit to our Resend-backed API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          telephone: formData.telephone,
          accommodationType: formData.accommodationType,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          numberOfAdults: formData.numberOfAdults,
          numberOfChildren: formData.numberOfChildren,
          numberOfInfants: formData.numberOfInfants
        })
      });

      if (response.ok) {
        setAvailabilityStatus('available');

        // Show success message and reset form
        setTimeout(() => {
          alert('Thank you for your enquiry! We will get back to you soon.');
          // Reset form after delay
          setFormData({
            name: '',
            email: '',
            telephone: '',
            accommodationType: 'entire-property',
            checkInDate: null,
            checkOutDate: null,
            numberOfAdults: 2,
            numberOfChildren: 0,
            numberOfInfants: 0
          });
          setAvailabilityStatus(null);
        }, 3000); // Show availability status for 3 seconds
      } else {
        alert('There was an error sending your enquiry. Please try again or contact us directly at theluxuryhouseuk@gmail.com');
        setAvailabilityStatus(null);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your enquiry. Please try again or contact us directly at theluxuryhouseuk@gmail.com');
      setAvailabilityStatus(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-stone py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Enquire</p>
          <h2 data-reveal className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
            Tell us
            <em className="block font-light">your dates.</em>
          </h2>
          <p className="mt-8 max-w-sm text-[1.0625rem] leading-[1.75] text-muted">
            Choose your dates and group size to see an estimate, then send the enquiry. We will be in touch to confirm availability.
          </p>

          <dl className="mt-10 space-y-6 border-t border-hairline pt-8">
            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-olive" strokeWidth={1.25} aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:theluxuryhouseuk@gmail.com" className="break-all text-ink underline underline-offset-4 transition-colors duration-300 hover:text-olive">
                    theluxuryhouseuk@gmail.com
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-olive" strokeWidth={1.25} aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">Location</dt>
                <dd className="mt-1 text-ink">East Yorkshire, United Kingdom</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="border border-hairline bg-paper p-6 sm:p-10 lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
              <label htmlFor="enquiry-name" className={labelClass}>
                Full name <span className="text-olive">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={fieldClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="enquiry-email" className={labelClass}>
                  Email address <span className="text-olive">*</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={fieldClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="enquiry-telephone" className={labelClass}>
                  Telephone number <span className="text-olive">*</span>
                </label>
                <input
                  id="enquiry-telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="+44 7700 900000"
                  className={fieldClass}
                  required
                />
              </div>
            </div>

            {/* Accommodation Type Selection */}
            <div>
              <label htmlFor="enquiry-accommodation" className={labelClass}>
                Accommodation type <span className="text-olive">*</span>
              </label>
              <select
                id="enquiry-accommodation"
                name="accommodationType"
                value={formData.accommodationType}
                onChange={(e) => handleInputChange('accommodationType', e.target.value as 'entire-property' | 'poolhouse')}
                className={fieldClass}
                required
              >
                <option value="entire-property">The Luxury House - Main House, Pool Villa, Heated Swimming Pool</option>
                <option value="poolhouse">Pool Villa & Heated Swimming Pool</option>
              </select>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="enquiry-check-in" className={labelClass}>
                  Check-in date <span className="text-olive">*</span>
                </label>
                <DatePicker
                  id="enquiry-check-in"
                  selected={formData.checkInDate}
                  onChange={(date) => handleInputChange('checkInDate', date)}
                  minDate={tomorrow}
                  className={fieldClass}
                  wrapperClassName="block w-full"
                  placeholderText="Select check-in date"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <label htmlFor="enquiry-check-out" className={labelClass}>
                  Check-out date <span className="text-olive">*</span>
                </label>
                <DatePicker
                  id="enquiry-check-out"
                  selected={formData.checkOutDate}
                  onChange={(date) => handleInputChange('checkOutDate', date)}
                  minDate={formData.checkInDate ? new Date(formData.checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000) : tomorrow}
                  className={fieldClass}
                  wrapperClassName="block w-full"
                  placeholderText="Select check-out date (min 2 nights)"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <p className={labelClass}>
                  Number of nights
                </p>
                <div className="flex w-full items-center justify-center rounded-[2px] border border-hairline bg-stone px-4 py-3 font-display text-xl text-ink">
                  {formData.checkInDate && formData.checkOutDate
                    ? Math.ceil((formData.checkOutDate.getTime() - formData.checkInDate.getTime()) / (1000 * 60 * 60 * 24))
                    : '-'}
                </div>
              </div>
            </div>

            {/* Guest Count Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="enquiry-adults" className={labelClass}>
                  Adults <span className="text-olive">*</span>
                </label>
                <input
                  id="enquiry-adults"
                  type="number"
                  min="1"
                  max={formData.accommodationType === 'poolhouse' ? 3 : undefined}
                  value={formData.numberOfAdults}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    // For pool villa, limit to 3 adults max
                    if (formData.accommodationType === 'poolhouse' && value > 3) {
                      return;
                    }
                    handleInputChange('numberOfAdults', value);
                  }}
                  className={fieldClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="enquiry-children" className={labelClass}>
                  Children (2-12 years)
                </label>
                <input
                  id="enquiry-children"
                  type="number"
                  min="0"
                  max={formData.accommodationType === 'poolhouse' ? Math.max(0, 3 - formData.numberOfAdults) : undefined}
                  value={formData.numberOfChildren}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    // For pool villa, ensure adults + children <= 3
                    if (formData.accommodationType === 'poolhouse' && formData.numberOfAdults + value > 3) {
                      return;
                    }
                    handleInputChange('numberOfChildren', value);
                  }}
                  disabled={formData.accommodationType === 'poolhouse' && formData.numberOfAdults >= 3}
                  className={`${fieldClass} disabled:cursor-not-allowed disabled:bg-stone disabled:text-muted`}
                />
              </div>
              <div>
                <label htmlFor="enquiry-infants" className={labelClass}>
                  Infants (under 2)
                </label>
                <input
                  id="enquiry-infants"
                  type="number"
                  min="0"
                  max="2"
                  value={formData.numberOfInfants}
                  onChange={(e) => handleInputChange('numberOfInfants', parseInt(e.target.value) || 0)}
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Price Calculator Display */}
            {getPriceBreakdown() !== null && (() => {
              const breakdown = getPriceBreakdown()!;
              const totalGuests = formData.numberOfAdults + formData.numberOfChildren + formData.numberOfInfants;

              return (
                <div className="border border-hairline bg-stone/60 p-6 sm:p-8" aria-live="polite">
                  {/* Top Section - Total Cost */}
                  <div className="mb-5 border-b border-hairline pb-5 text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">Estimated total cost</p>
                    <p className="mt-2 font-display text-5xl font-light text-ink">
                      £{breakdown.totalCost.toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {breakdown.nights} nights • {totalGuests} guests
                    </p>
                    <p className="text-sm text-muted">
                      £{Math.round(breakdown.perNightCost).toLocaleString()} per night
                    </p>
                  </div>

                  {/* Bottom Section - Calculation Details */}
                  <div className="text-sm tabular-nums">
                    <h4 className="mb-3 font-medium text-ink">Calculation details</h4>

                    {/* Adults */}
                    <div className="mb-3">
                      <p className="mb-1 text-ink-soft">
                        Adults {breakdown.adultsEntered < (formData.accommodationType === 'entire-property' ? 10 : 2)
                          ? `(${breakdown.adultsEntered} entered, min ${breakdown.adultsCharged} charged)`
                          : `(${breakdown.adultsCharged})`}
                      </p>
                      <p className="text-muted">
                        {breakdown.adultsCharged} adults × £{formData.accommodationType === 'entire-property' ? '120' : '115'}/night × {breakdown.nights} {breakdown.nights === 1 ? 'night' : 'nights'} = £{breakdown.adultsCost.toLocaleString()}
                      </p>
                    </div>

                    {/* Children */}
                    <div className="mb-3">
                      <p className="mb-1 text-ink-soft">
                        Children {formData.accommodationType === 'entire-property' && breakdown.childrenEntered > 0 && breakdown.childrenCharged === 0
                          ? `(${breakdown.childrenEntered > 1 ? 'first free' : 'free'}, ${breakdown.childrenCharged} charged)`
                          : breakdown.childrenEntered > breakdown.childrenCharged && formData.accommodationType === 'entire-property'
                          ? `(${breakdown.childrenEntered - breakdown.childrenCharged} free, ${breakdown.childrenCharged} charged)`
                          : breakdown.childrenCharged > 0
                          ? `(${breakdown.childrenCharged} charged)`
                          : '(0)'}
                      </p>
                      <p className="text-muted">
                        {breakdown.childrenCharged > 0
                          ? `${breakdown.childrenCharged} child${breakdown.childrenCharged > 1 ? 'ren' : ''} × £${formData.accommodationType === 'entire-property' ? '50' : '115'}/night × ${breakdown.nights} ${breakdown.nights === 1 ? 'night' : 'nights'} = £${breakdown.childrenCost.toLocaleString()}`
                          : 'Free = £0'}
                      </p>
                    </div>

                    {/* Infants */}
                    <div className="mb-3">
                      <p className="mb-1 text-ink-soft">
                        Infants ({breakdown.infantsEntered})
                      </p>
                      <p className="text-muted">
                        Free = £0
                      </p>
                    </div>

                    {/* Total */}
                    <div className="border-t border-hairline pt-3">
                      <p className="font-medium text-ink">
                        Total = £{breakdown.totalCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`min-h-14 w-full rounded-[2px] px-6 text-sm font-medium tracking-wide text-white transition-colors duration-300 ${
                  availabilityStatus === 'available'
                    ? 'bg-olive-deep'
                    : availabilityStatus === 'unavailable'
                    ? 'bg-ink'
                    : isSubmitting || availabilityStatus === 'checking'
                    ? 'cursor-not-allowed bg-ink-soft'
                    : 'bg-olive hover:bg-olive-deep'
                }`}
              >
                {availabilityStatus === 'checking' || isSubmitting
                  ? 'Sending message...'
                  : availabilityStatus === 'available'
                  ? 'Enquiry sent'
                  : availabilityStatus === 'unavailable'
                  ? 'Unavailable, but enquiry sent'
                  : 'Send enquiry'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
