export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "The Luxury House",
    "description": "Five-bedroom luxury house in East Yorkshire, 25 minutes from Beverley, with a heated outdoor pool, sauna, firepit terrace and poolside villa. Sleeps 13 adults and 2 children under 12.",
    "url": "https://theluxuryhouse.uk",
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
    "email": "theluxuryhouseuk@gmail.com",
    "priceRange": "£££",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Heated outdoor swimming pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Sauna",
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