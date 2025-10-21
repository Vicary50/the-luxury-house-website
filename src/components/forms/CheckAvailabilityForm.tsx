'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
}

export default function CheckAvailabilityForm() {
  const [formData, setFormData] = useState<FormData>({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    infants: 0
  });

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to database later
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will check availability and get back to you soon.');
  };

  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold text-white mb-6">Check Availability</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Check In */}
        <div>
          <label className="block text-white font-medium mb-2">Check In</label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-white font-medium mb-2">Check Out</label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        {/* Adults */}
        <div>
          <label className="block text-white font-medium mb-2">Adults</label>
          <select
            value={formData.adults}
            onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1} className="bg-gray-800">
                {i + 1} {i === 0 ? 'Adult' : 'Adults'}
              </option>
            ))}
          </select>
        </div>

        {/* Children */}
        <div>
          <label className="block text-white font-medium mb-2">Children</label>
          <select
            value={formData.children}
            onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i} value={i} className="bg-gray-800">
                {i} {i === 1 ? 'Child' : 'Children'} (Ages 2-12)
              </option>
            ))}
          </select>
        </div>

        {/* Infants */}
        <div>
          <label className="block text-white font-medium mb-2">Infants</label>
          <select
            value={formData.infants}
            onChange={(e) => handleInputChange('infants', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i} className="bg-gray-800">
                {i} {i === 1 ? 'Infant' : 'Infants'} (Under 2)
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
}