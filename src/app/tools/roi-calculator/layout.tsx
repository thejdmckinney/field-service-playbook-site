import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FSM Software ROI Calculator | Calculate Time & Money Savings",
  description: "Free ROI calculator for field service management software. See how much time and money you'll save with Job Flow Hub vs manual processes.",
  openGraph: {
    title: "FSM Software ROI Calculator",
    description: "Calculate your return on investment from field service management software",
    url: "https://fieldserviceplaybook.com/tools/roi-calculator",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools/roi-calculator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
