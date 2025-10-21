'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Mail, MapPin } from 'lucide-react';

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
      // Submit inquiry via email
      const formDataToSubmit = {
        ...formData,
        checkInDate: formData.checkInDate?.toISOString() || '',
        checkOutDate: formData.checkOutDate?.toISOString() || ''
      };

      // Send email notification
      const emailResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (emailResponse.ok) {
        setAvailabilityStatus('available');
      } else {
        console.error('Email sending failed');
        alert('There was an error sending your inquiry. Please try again or contact us directly at theluxuryhouseuk@gmail.com');
        setIsSubmitting(false);
        return;
      }

      // Show success message and reset form
      setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you soon.');
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

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error checking availability. Please try again or contact us directly.');
      setAvailabilityStatus(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Contact Us
          </h2>
          {/* Amber accent line */}
          <div className="w-16 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get in touch with us about your stay at The Luxury House and see an instant price estimate
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Telephone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="+44 7700 900000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Accommodation Type Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Accommodation Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.accommodationType}
                onChange={(e) => handleInputChange('accommodationType', e.target.value as 'entire-property' | 'poolhouse')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="entire-property">The Luxury House - Main House, Pool Villa, Heated Swimming Pool</option>
                <option value="poolhouse">Pool Villa & Heated Swimming Pool</option>
              </select>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Check In Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={formData.checkInDate}
                  onChange={(date) => handleInputChange('checkInDate', date)}
                  minDate={tomorrow}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholderText="Select check-in date"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Check Out Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={formData.checkOutDate}
                  onChange={(date) => handleInputChange('checkOutDate', date)}
                  minDate={formData.checkInDate ? new Date(formData.checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000) : tomorrow}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholderText="Select check-out date (min 2 nights)"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Nights
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold flex items-center justify-center">
                  {formData.checkInDate && formData.checkOutDate
                    ? Math.ceil((formData.checkOutDate.getTime() - formData.checkInDate.getTime()) / (1000 * 60 * 60 * 24))
                    : '-'}
                </div>
              </div>
            </div>

            {/* Guest Count Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Adults <span className="text-red-500">*</span>
                </label>
                <input
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Children (2-12 years)
                </label>
                <input
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    formData.accommodationType === 'poolhouse' && formData.numberOfAdults >= 3
                      ? 'bg-gray-200 cursor-not-allowed'
                      : ''
                  }`}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Infants (Under 2)
                </label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={formData.numberOfInfants}
                  onChange={(e) => handleInputChange('numberOfInfants', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Price Calculator Display */}
            {getPriceBreakdown() !== null && (() => {
              const breakdown = getPriceBreakdown()!;
              const totalGuests = formData.numberOfAdults + formData.numberOfChildren + formData.numberOfInfants;

              return (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6"
                >
                  {/* Top Section - Total Cost */}
                  <div className="text-center mb-4 pb-4 border-b-2 border-amber-200">
                    <p className="text-gray-600 text-sm mb-1">Estimated Total Cost</p>
                    <p className="text-4xl font-bold text-amber-700 mb-2">
                      £{breakdown.totalCost.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {breakdown.nights} nights • {totalGuests} guests
                    </p>
                    <p className="text-gray-600 text-sm">
                      £{Math.round(breakdown.perNightCost).toLocaleString()} per night
                    </p>
                  </div>

                  {/* Bottom Section - Calculation Details */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Calculation Details:</h4>

                    {/* Adults */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-1">
                        Adults {breakdown.adultsEntered < (formData.accommodationType === 'entire-property' ? 10 : 2)
                          ? `(${breakdown.adultsEntered} entered, min ${breakdown.adultsCharged} charged)`
                          : `(${breakdown.adultsCharged})`}
                      </p>
                      <p className="text-sm text-gray-600 font-mono">
                        {breakdown.adultsCharged} adults × £{formData.accommodationType === 'entire-property' ? '120' : '115'}/night × {breakdown.nights} {breakdown.nights === 1 ? 'night' : 'nights'} = £{breakdown.adultsCost.toLocaleString()}
                      </p>
                    </div>

                    {/* Children */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-1">
                        Children {formData.accommodationType === 'entire-property' && breakdown.childrenEntered > 0 && breakdown.childrenCharged === 0
                          ? `(${breakdown.childrenEntered > 1 ? 'first free' : 'free'}, ${breakdown.childrenCharged} charged)`
                          : breakdown.childrenEntered > breakdown.childrenCharged && formData.accommodationType === 'entire-property'
                          ? `(${breakdown.childrenEntered - breakdown.childrenCharged} free, ${breakdown.childrenCharged} charged)`
                          : breakdown.childrenCharged > 0
                          ? `(${breakdown.childrenCharged} charged)`
                          : '(0)'}
                      </p>
                      <p className="text-sm text-gray-600 font-mono">
                        {breakdown.childrenCharged > 0
                          ? `${breakdown.childrenCharged} child${breakdown.childrenCharged > 1 ? 'ren' : ''} × £${formData.accommodationType === 'entire-property' ? '50' : '115'}/night × ${breakdown.nights} ${breakdown.nights === 1 ? 'night' : 'nights'} = £${breakdown.childrenCost.toLocaleString()}`
                          : 'Free = £0'}
                      </p>
                    </div>

                    {/* Infants */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-1">
                        Infants ({breakdown.infantsEntered})
                      </p>
                      <p className="text-sm text-gray-600 font-mono">
                        Free = £0
                      </p>
                    </div>

                    {/* Total */}
                    <div className="pt-3 border-t-2 border-amber-300">
                      <p className="text-sm font-semibold text-gray-800 font-mono">
                        Total = £{breakdown.totalCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  availabilityStatus === 'available' 
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : availabilityStatus === 'unavailable'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : isSubmitting || availabilityStatus === 'checking'
                    ? 'bg-blue-600 text-white cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {availabilityStatus === 'checking' || isSubmitting
                  ? 'Checking availability...'
                  : availabilityStatus === 'available'
                  ? 'Available - Inquiry Sent!'
                  : availabilityStatus === 'unavailable'
                  ? 'Unavailable - But Inquiry Sent'
                  : 'Send Inquiry'
                }
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Get in Touch</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 p-4 rounded-full mb-4">
                  <Mail size={28} className="text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <a
                  href="mailto:theluxuryhouseuk@gmail.com"
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200 underline"
                >
                  theluxuryhouseuk@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 p-4 rounded-full mb-4">
                  <MapPin size={28} className="text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">
                  Beautiful East Yorkshire<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}