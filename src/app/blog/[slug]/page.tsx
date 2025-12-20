import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPostBySlug(slug);
  
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: [frontmatter.category],
      url: `https://fieldserviceplaybook.com/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: `https://fieldserviceplaybook.com/blog/${slug}`,
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, mdxSource } = await getPostBySlug(slug);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Field Service Playbook',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fieldserviceplaybook.com/logo.png'
      }
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fieldserviceplaybook.com/blog/${slug}`
    },
    articleSection: frontmatter.category,
    keywords: frontmatter.category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Image 
              src="/field-service-playbook-logo.jpg" 
              alt="Field Service Playbook"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Link>
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to articles
          </Link>
        </div>
        
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {frontmatter.category}
            </span>
            <span className="text-gray-500">{frontmatter.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {frontmatter.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-4">
            {frontmatter.description}
          </p>
          
          <div className="flex items-center gap-4 text-gray-500">
            <span>{frontmatter.author}</span>
            <span>•</span>
            <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8">
          <MDXRemote source={mdxSource} />
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Want More Tips Like This?
              </h3>
              <p className="text-gray-600">
                Join 2,500+ field service pros getting weekly strategies to grow their business.
              </p>
            </div>
            <div>
              <NewsletterForm 
                source={`blog-${slug}`}
                title="Subscribe for Free Tips"
                description="Practical advice, no spam. Unsubscribe anytime."
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">
            Ready to streamline your field service business?
          </h3>
          <p className="text-blue-100 mb-6">
            Creative Job Hub is built by a contractor, for contractors. No bloat, no BS, just tools that actually work.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://creativejobhub.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Start Free Trial
            </a>
            <Link 
              href="/tools/software-comparison"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Compare Software
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
