import { Metadata } from 'next';
import ActivitiesClient from './ActivitiesClient';

export const metadata: Metadata = {
  title: "Things to Do in Hull & East Yorkshire | Activities Near The Luxury House",
  description: "Discover the best restaurants, attractions, and activities in Hull & East Yorkshire. From The Deep aquarium to award-winning restaurants, plan your perfect stay at The Luxury House.",
  keywords: [
    "Hull activities", 
    "East Yorkshire attractions", 
    "restaurants near Hull", 
    "things to do Hull", 
    "Yorkshire Wolds", 
    "Hull Old Town", 
    "The Deep aquarium",
    "holiday activities Yorkshire",
    "restaurants East Yorkshire",
    "attractions near The Luxury House"
  ],
  openGraph: {
    title: "Things to Do in Hull & East Yorkshire | The Luxury House",
    description: "Discover award-winning restaurants, historic attractions, and natural beauty in Hull & East Yorkshire during your stay at The Luxury House.",
    images: ['/images/Hero/Hero%20photo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hull & East Yorkshire Activities Guide | The Luxury House",
    description: "Explore the best restaurants, attractions, and activities in Hull & East Yorkshire during your luxury holiday stay.",
    images: ['/images/Hero/Hero%20photo.jpg'],
  },
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}