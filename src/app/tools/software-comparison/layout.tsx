import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Field Service Management Software Comparison | Creative Job Hub vs Competitors",
  description: "Compare Creative Job Hub with Jobber, Housecall Pro, ServiceTitan, and other FSM software. Features, pricing, and honest reviews from contractors.",
  openGraph: {
    title: "Field Service Management Software Comparison",
    description: "Compare the best field service management software for contractors",
    url: "https://fieldserviceplaybook.com/tools/software-comparison",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools/software-comparison",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
