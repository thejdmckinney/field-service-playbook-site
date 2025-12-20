import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import Header from '@/components/Header';

// Category mapping for URL slugs to display names
const categoryMap: Record<string, { name: string; description: string; icon: string }> = {
  'revenue': {
    name: 'Revenue Growth',
    description: 'Proven strategies to boost your income and profitability',
    icon: '💰'
  },
  'marketing': {
    name: 'Marketing',
    description: 'Get more customers with effective marketing strategies',
    icon: '📈'
  },
  'efficiency': {
    name: 'Efficiency',
    description: 'Work smarter, not harder with time-saving techniques',
    icon: '⚡'
  },
  'customer-service': {
    name: 'Customer Service',
    description: 'Build loyalty and get more referrals from happy customers',
    icon: '⭐'
  },
  'software': {
    name: 'Software',
    description: 'Compare top field service management tools for your business',
    icon: '🛠️'
  },
  'growth': {
    name: 'Business Growth',
    description: 'Scale your operations and build a thriving company',
    icon: '🚀'
  }
};

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = categoryMap[category];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found - Field Service Playbook',
    };
  }

  return {
    title: `${categoryInfo.name} Articles - Field Service Playbook`,
    description: `${categoryInfo.description}. Expert tips and strategies for field service businesses.`,
    openGraph: {
      title: `${categoryInfo.name} Articles - Field Service Playbook`,
      description: categoryInfo.description,
      url: `https://fieldserviceplaybook.com/blog/category/${category}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://fieldserviceplaybook.com/blog/category/${category}`,
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryInfo = categoryMap[category];
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const allPosts = await getAllPosts();
  
  // Filter posts by category - match against various category name formats
  const filteredPosts = allPosts.filter(post => {
    const postCategory = post.category.toLowerCase();
    const categoryName = categoryInfo.name.toLowerCase();
    
    // Match exact, partial, or slug format
    return postCategory.includes(categoryName) || 
           categoryName.includes(postCategory) ||
           postCategory === category.replace('-', ' ');
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Category Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition"
          >
            ← All Articles
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{categoryInfo.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold">
              {categoryInfo.name}
            </h1>
          </div>
          <p className="text-xl text-blue-100">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No articles found in this category yet.</p>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="font-medium text-blue-600">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
