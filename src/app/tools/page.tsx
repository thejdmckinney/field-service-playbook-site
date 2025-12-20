import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Field Service Business Tools & Calculators",
  description: "Free pricing calculator, ROI calculator, software comparison tool, and templates for field service contractors. Save time and make better business decisions.",
  openGraph: {
    title: "Free Field Service Business Tools & Calculators",
    description: "Free tools to help field service contractors grow their business",
    url: "https://fieldserviceplaybook.com/tools",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools",
  }
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Field Service Business Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free calculators, templates, and resources to help you manage and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow relative"
            >
              {tool.badge && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  tool.badge === 'New' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tool.badge}
                </div>
              )}
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {tool.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {tool.description}
              </p>
              {tool.badge === 'Coming Soon' ? (
                <button
                  disabled
                  className="inline-block px-6 py-2 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                >
                  {tool.cta}
                </button>
              ) : (
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {tool.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const tools = [
  {
    title: "Pricing Calculator",
    description: "Calculate the perfect hourly rate to hit your revenue goals and maximize profitability.",
    icon: "💰",
    slug: "pricing-calculator",
    cta: "Calculate Now",
    badge: "New",
  },
  {
    title: "ROI Calculator",
    description: "See how much money field service software could save your business every month.",
    icon: "�",
    slug: "roi-calculator",
    cta: "Calculate ROI",
    badge: "New",
  },
  {
    title: "Software Comparison Tool",
    description: "Compare features, pricing, and reviews of top field service management platforms.",
    icon: "�",
    slug: "software-comparison",
    cta: "Compare Now",
    badge: null,
  },
  {
    title: "Time Tracking Template",
    description: "Free spreadsheet template to track billable hours and job time.",
    icon: "⏱️",
    slug: "time-tracking",
    cta: "Download Template",
    badge: "Coming Soon",
  },
  {
    title: "Quote Template Generator",
    description: "Create professional quotes and estimates in minutes.",
    icon: "📄",
    slug: "quote-template",
    cta: "Generate Quote",
    badge: "Coming Soon",
  },
  {
    title: "Service Area Mapper",
    description: "Visualize and optimize your service coverage area.",
    icon: "🗺️",
    slug: "service-area-mapper",
    cta: "Map Your Area",
    badge: "Coming Soon",
  },
];
