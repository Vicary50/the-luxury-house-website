export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "The Luxury House",
    "description": "Experience luxury and tranquility at The Luxury House, our premium holiday rental home featuring private pool, elegant interiors, and world-class amenities.",
    "url": "https://theluxuryhouse.uk",
    "logo": "https://theluxuryhouse.uk/images/logo.png",
    "image": [
      "https://theluxuryhouse.uk/images/Hero/Hero%20photo.jpg",
      "https://theluxuryhouse.uk/images/Master%20bedroom/Master%20bedroom%201.jpg",
      "https://theluxuryhouse.uk/images/Swimming%20pool/Swimming%20pool%201.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "East Yorkshire",
      "addressRegion": "Yorkshire and the Humber"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "53.7676",
      "longitude": "-0.3274"
    },
    "telephone": "+44 7123 456789",
    "email": "theluxuryhouseuk@gmail.com",
    "priceRange": "£££",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Private Swimming Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Private Parking",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Kitchen",
        "value": true
      }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Newton Family"
        },
        "reviewBody": "Thank you. The whole of the Newton family, from 5 months to 75 years old had a wonderful stay in your lovely house.",
        "datePublished": "2025-08-22"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Merrick"
        },
        "reviewBody": "Thank you for having us in your lovely home to celebrate our hens! We can't wait to stay again!",
        "datePublished": "2025-08-24"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Family Guest"
        },
        "reviewBody": "What a great find! Such a hidden gem, lovely and spacious, just what we needed as a family. The boys enjoyed splashing around and using the pool. Highly recommended",
        "datePublished": "2024-05-19"
      }
    ],
    "offers": {
      "@type": "Offer",
      "category": "Accommodation",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 800,
        "maxPrice": 1500,
        "priceCurrency": "GBP",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 10,
          "unitText": "guests"
        }
      },
      "availability": "http://schema.org/InStock",
      "validFrom": "2024-01-01",
      "validThrough": "2025-12-31"
    },
    "hasMap": "https://maps.google.com/",
    "checkinTime": "15:00",
    "checkoutTime": "11:00",
    "numberOfRooms": "5",
    "petsAllowed": false,
    "smokingAllowed": false
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}