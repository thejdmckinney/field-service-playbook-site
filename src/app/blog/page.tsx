import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, type BlogPost } from '@/lib/blog';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "Field Service Business Blog - Expert Tips & Strategies",
  description: "Free actionable advice for plumbing, HVAC, electrical, handyman, and landscaping contractors. Marketing, efficiency, customer service, and growth strategies.",
  openGraph: {
    title: "Field Service Business Blog - Expert Tips & Strategies",
    description: "Free actionable advice for contractors to grow their field service business",
    url: "https://fieldserviceplaybook.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/blog",
  }
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // ItemList JSON-LD for blog listing
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': posts.slice(0, 10).map((post, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://fieldserviceplaybook.com/blog/${post.slug}`,
      'name': post.title
    }))
  };

  // Blog JSON-LD
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Field Service Playbook Blog',
    'description': 'Expert tips and strategies for field service contractors',
    'url': 'https://fieldserviceplaybook.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'Field Service Playbook',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://fieldserviceplaybook.com/png-logo-circle.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      
      <Header />
      
      {/* Banner Image */}
      <div className="relative w-full bg-gray-100">
        <Image 
          src="/field-service-blog-banner.jpg"
          alt="Field Service Playbook Blog"
          width={1920}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest Articles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
