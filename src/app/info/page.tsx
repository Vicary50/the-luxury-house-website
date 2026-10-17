import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Guest Resources - The Luxury House',
  description: 'Guest resources for The Luxury House - Coming Soon',
};

export default function InfoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Guest resources"
        title="Coming soon."
        intro={<p>We&apos;re working on creating comprehensive guest resources for your stay at The Luxury House.</p>}
      >
        <Link
          href="/#faq"
          className="inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
        >
          Questions and house rules
        </Link>
      </PageHeader>
    </main>
  );
}
