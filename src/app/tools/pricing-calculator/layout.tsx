import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Field Service Pricing Calculator | Calculate Your Hourly Rate",
  description: "Free pricing calculator for field service contractors. Calculate your true hourly rate based on expenses, desired profit, and billable hours. Make more money.",
  openGraph: {
    title: "Field Service Pricing Calculator",
    description: "Calculate your true hourly rate and stop undercharging",
    url: "https://fieldserviceplaybook.com/tools/pricing-calculator",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools/pricing-calculator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
