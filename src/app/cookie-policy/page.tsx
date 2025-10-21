import type { Metadata } from "next";
import CookiePolicyContent from './CookiePolicyContent';

export const metadata: Metadata = {
  title: "Cookie Policy | The Luxury House Holiday Lets",
  description: "Cookie Policy for The Luxury House Holiday Lets. Learn how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}