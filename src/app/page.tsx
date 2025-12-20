import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/field-service-playbook-logo.jpg" 
              alt="Field Service Playbook Logo"
              width={120}
              height={120}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-gray-900">Field Service Playbook</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition">Blog</Link>
            <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition">Tools</Link>
            <Link 
              href="https://creativejobhub.com" 
              className="flex flex-col items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              target="_blank"
            >
              <span className="font-semibold">Try Creative Job Hub</span>
              <span className="text-xs text-blue-100">Built by a contractor, for contractors</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Field Service Playbook</span>
            <span className="block text-blue-600 mt-2">Grow Your Service Business</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Expert strategies, tips, and tools to help handymen, electricians, plumbers, 
            pool services, landscapers, and other field service businesses thrive.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Articles
            </Link>
            <Link
              href="/tools"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Popular Topics
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <Link
                href={topic.href}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join 2,500+ Service Pros Getting Our Weekly Tips
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Practical strategies to increase revenue, work smarter, and grow your field service business. 
              No fluff, just actionable advice from contractors who've been there.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Weekly revenue-boosting strategies
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Software reviews and tool recommendations
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Real case studies from field service businesses
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <NewsletterForm source="homepage" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover how the right field service management software can transform your operations.
          </p>
          <Link
            href="/tools/software-comparison"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Compare Top Software
          </Link>
        </div>
      </section>
    </div>
  );
}

const topics = [
  {
    title: "Increase Revenue",
    description: "Proven strategies to boost your income and profitability.",
    icon: "💰",
    href: "/blog/category/revenue",
  },
  {
    title: "Best Software",
    description: "Compare top field service management tools for your business.",
    icon: "🛠️",
    href: "/blog/category/software",
  },
  {
    title: "Marketing Tips",
    description: "Get more customers with effective marketing strategies.",
    icon: "📈",
    href: "/blog/category/marketing",
  },
  {
    title: "Efficiency Hacks",
    description: "Work smarter, not harder with time-saving techniques.",
    icon: "⚡",
    href: "/blog/category/efficiency",
  },
  {
    title: "Customer Service",
    description: "Build loyalty and get more referrals from happy customers.",
    icon: "⭐",
    href: "/blog/category/customer-service",
  },
  {
    title: "Business Growth",
    description: "Scale your operations and build a thriving company.",
    icon: "🚀",
    href: "/blog/category/growth",
  },
];

