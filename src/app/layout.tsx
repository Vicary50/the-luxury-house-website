import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import StructuredData from "@/components/SEO/StructuredData";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Party House with Heated Pool, East Yorkshire | The Luxury House",
  description: "Five-bedroom luxury house 25 minutes from Beverley, with a heated pool, sauna and firepit terrace. Sleeps 15. Hen weekends, birthdays, race days and family stays.",
  keywords: ["party house East Yorkshire", "hen party house East Yorkshire", "large house to rent with pool Yorkshire", "accommodation near Beverley Racecourse", "holiday house sleeps 15"],
  authors: [{ name: "The Luxury House" }],
  creator: "The Luxury House",
  publisher: "The Luxury House",
  metadataBase: new URL('https://theluxuryhouse.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Party House with Heated Pool, East Yorkshire | The Luxury House",
    description: "Five-bedroom luxury house 25 minutes from Beverley, with a heated pool, sauna and firepit terrace. Sleeps 15. Hen weekends, birthdays, race days and family stays.",
    url: 'https://theluxuryhouse.uk',
    siteName: 'The Luxury House',
    images: [
      {
        url: '/images/Hero/Hero%20photo.jpg',
        width: 1200,
        height: 630,
        alt: 'The heated pool at The Luxury House, East Yorkshire',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Party House with Heated Pool, East Yorkshire | The Luxury House",
    description: "Five-bedroom luxury house 25 minutes from Beverley, with a heated pool, sauna and firepit terrace. Sleeps 15. Hen weekends, birthdays, race days and family stays.",
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
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Header />
        <Breadcrumbs />
        {children}
        <Footer />
      </body>
    </html>
  );
}
