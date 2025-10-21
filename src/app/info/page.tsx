import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Guest Resources - The Luxury House',
  description: 'Guest resources for The Luxury House - Coming Soon',
};

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Coming Soon
          </h1>
          <div className="w-16 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            We&apos;re working on creating comprehensive guest resources for your stay at The Luxury House.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}