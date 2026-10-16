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