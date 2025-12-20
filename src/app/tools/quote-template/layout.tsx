import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Quote Template Generator for Contractors | Field Service Playbook",
  description: "Create professional quotes and estimates in minutes. Free quote template for handyman, plumbing, HVAC, electrical, and landscaping businesses.",
  openGraph: {
    title: "Free Quote Template Generator for Contractors",
    description: "Create professional quotes and estimates in minutes with our free template",
    url: "https://fieldserviceplaybook.com/tools/quote-template",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools/quote-template",
  }
};

export default function QuoteTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
