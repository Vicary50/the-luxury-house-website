import type { Metadata } from "next";
import { Inter, Playfair_Display, Merriweather } from "next/font/google";
import StructuredData from "@/components/SEO/StructuredData";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Luxury House | Premium Holiday Rental",
  description: "Experience comfort and luxury in every corner of our carefully curated spaces. The Luxury House offers premium holiday accommodation with private pool, elegant interiors, and world-class amenities.",
  keywords: ["luxury holiday rental", "vacation home", "private pool", "premium accommodation", "holiday let"],
  authors: [{ name: "The Luxury House" }],
  creator: "The Luxury House",
  publisher: "The Luxury House",
  metadataBase: new URL('https://theluxuryhouse.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "The Luxury House - Premium Holiday Rental",
    description: "Experience comfort and luxury in every corner of our carefully curated spaces",
    url: 'https://theluxuryhouse.uk',
    siteName: 'The Luxury House',
    images: [
      {
        url: '/images/Hero/Hero%20photo.jpg',
        width: 1200,
        height: 630,
        alt: 'The Luxury House Premium Holiday Rental',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Luxury House - Premium Holiday Rental",
    description: "Experience comfort and luxury in every corner of our carefully curated spaces",
    images: ['/images/Hero/Hero%20photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
