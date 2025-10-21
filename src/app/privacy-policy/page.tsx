import type { Metadata } from "next";
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = {
  title: "Privacy Policy | The Luxury House Holiday Lets",
  description: "Privacy Policy for The Luxury House Holiday Lets. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}