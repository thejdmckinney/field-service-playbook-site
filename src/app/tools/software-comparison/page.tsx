import Link from "next/link";

export default function SoftwareComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/tools"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          ← Back to Tools
        </Link>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Field Service Management Software 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare the top FSM platforms to find the perfect fit for your handyman, 
            electrical, plumbing, pool service, or landscaping business.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-8">
          {softwareOptions.map((software) => (
            <div
              key={software.name}
              className={`border rounded-lg p-8 ${
                software.recommended
                  ? "border-blue-500 border-2 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              {software.recommended && (
                <div className="mb-4">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Recommended
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {software.name}
                  </h2>
                  <p className="text-gray-600">{software.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {software.price}
                  </div>
                  <div className="text-sm text-gray-500">{software.priceUnit}</div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {software.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best For:</h3>
                  <p className="text-gray-600">{software.bestFor}</p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 mt-4">Pros:</h3>
                  <ul className="space-y-1">
                    {software.pros.map((pro, idx) => (
                      <li key={idx} className="text-gray-600 text-sm">• {pro}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={software.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    software.recommended
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {software.cta}
                </a>
                {software.trial && (
                  <span className="px-6 py-3 text-sm text-gray-600 flex items-center">
                    {software.trial}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Not sure which software is right for you?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Try Creative Job Hub free for 14 days - no credit card required.
          </p>
          <Link
            href="/get-started"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}

const softwareOptions = [
  {
    name: "Creative Job Hub",
    description: "Modern, intuitive field service management built for small to medium businesses.",
    price: "$49",
    priceUnit: "per user/month",
    recommended: true,
    features: [
      "Easy scheduling & dispatch",
      "Mobile app for technicians",
      "Customer portal",
      "Invoicing & payments",
      "GPS tracking",
      "Inventory management",
    ],
    pros: [
      "Incredibly user-friendly",
      "Fast setup (< 1 hour)",
      "Excellent customer support",
      "No long-term contracts",
    ],
    bestFor: "Small to medium field service businesses looking for an affordable, easy-to-use solution.",
    cta: "Try Free for 14 Days",
    link: "#",
    trial: "No credit card required",
  },
  {
    name: "Jobber",
    description: "Popular FSM software with strong scheduling and quoting features.",
    price: "$69",
    priceUnit: "per user/month",
    recommended: false,
    features: [
      "Scheduling & dispatch",
      "Online booking",
      "Quoting & invoicing",
      "Client hub",
      "Route optimization",
      "Reporting",
    ],
    pros: [
      "Well-established platform",
      "Good mobile apps",
      "Decent integration options",
    ],
    bestFor: "Growing businesses that need solid scheduling and quoting tools.",
    cta: "Learn More",
    link: "https://getjobber.com",
    trial: "14-day free trial",
  },
  {
    name: "Housecall Pro",
    description: "Comprehensive platform with marketing automation features.",
    price: "$89",
    priceUnit: "per user/month",
    recommended: false,
    features: [
      "Scheduling",
      "Marketing automation",
      "Online booking",
      "Payment processing",
      "Customer management",
      "Job tracking",
    ],
    pros: [
      "Strong marketing features",
      "Good for home services",
      "Integrated payment processing",
    ],
    bestFor: "Home service businesses focused on marketing and customer acquisition.",
    cta: "Learn More",
    link: "https://www.housecallpro.com",
    trial: "14-day free trial",
  },
  {
    name: "ServiceTitan",
    description: "Enterprise-grade platform for large field service operations.",
    price: "$$$",
    priceUnit: "Custom pricing",
    recommended: false,
    features: [
      "Complete business management",
      "Advanced reporting",
      "Call booking",
      "Marketing tools",
      "Inventory & procurement",
      "Payroll integration",
    ],
    pros: [
      "Extremely feature-rich",
      "Great for large teams",
      "Powerful analytics",
    ],
    bestFor: "Large enterprises with 50+ employees and complex operations.",
    cta: "Request Demo",
    link: "https://www.servicetitan.com",
    trial: "Contact for pricing",
  },
];
