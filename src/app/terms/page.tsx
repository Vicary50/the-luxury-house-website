import type { Metadata } from "next";
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: "Terms & Conditions | The Luxury House Holiday Lets",
  description: "Comprehensive Terms and Conditions for booking and staying at The Luxury House Holiday Lets. Read our detailed booking policies, cancellation terms, house rules, and safety requirements.",
};

export default function TermsPage() {
  return <TermsContent />;
}