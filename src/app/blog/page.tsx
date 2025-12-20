import Link from 'next/link';
import { getAllPosts, type BlogPost } from '@/lib/blog';
import type { Metadata } from 'next';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Field Service Playbook
          </h1>
          <p className="text-xl text-blue-100">
            Real strategies from real contractors. No BS.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
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
