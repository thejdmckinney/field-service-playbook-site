import { MDXRemote } from 'next-mdx-remote/rsc';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';

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
  const { frontmatter, mdxSource, portableTextContent, isSanity } = await getPostBySlug(slug);

  // BlogPosting JSON-LD structured data
  const blogPostJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.featuredImage ? `https://fieldserviceplaybook.com${frontmatter.featuredImage}` : 'https://fieldserviceplaybook.com/field-service-blog-banner.jpg',
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Field Service Playbook',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fieldserviceplaybook.com/field-service-playbook-logo.jpg'
      }
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fieldserviceplaybook.com/blog/${slug}`
    },
    articleSection: frontmatter.category,
    keywords: `${frontmatter.category}, field service, contractor business, ${frontmatter.title}`,
    inLanguage: 'en-US',
    isAccessibleForFree: true
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://fieldserviceplaybook.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://fieldserviceplaybook.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': frontmatter.title,
        'item': `https://fieldserviceplaybook.com/blog/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <Header />
      
      {/* Banner Image */}
      <div className="relative w-full bg-gray-100">
        <Image 
          src="/field-service-blog-banner.jpg"
          alt="Field Service Playbook"
          width={1920}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          ← Back to articles
        </Link>
        
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
        <div className="bg-white rounded-lg shadow-sm p-8">
          {isSanity && portableTextContent ? (
            <PortableText 
              value={portableTextContent}
              components={{
                types: {
                  image: ({value}) => {
                    // Get the image URL from Sanity
                    const imageUrl = value.asset?.url;
                    
                    if (!imageUrl) {
                      console.log('Image value:', value);
                      return null;
                    }
                    
                    return (
                      <div className="my-8">
                        <img 
                          src={imageUrl}
                          alt={value.alt || 'Blog image'}
                          className="rounded-lg w-full"
                        />
                      </div>
                    );
                  },
                },
                block: {
                  h2: ({children}) => <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>,
                  normal: ({children}) => <p className="mb-4 leading-relaxed text-gray-800 text-lg">{children}</p>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700">{children}</blockquote>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="text-gray-800 text-lg leading-relaxed">{children}</li>,
                  number: ({children}) => <li className="text-gray-800 text-lg leading-relaxed">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                  em: ({children}) => <em className="italic text-gray-800">{children}</em>,
                  code: ({children}) => <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded font-mono text-sm">{children}</code>,
                  link: ({children, value}) => (
                    <a href={value.href} className="text-blue-600 hover:text-blue-700 underline font-medium" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                },
              }}
            />
          ) : (
            <div className="prose prose-lg prose-gray max-w-none">
              {mdxSource && (
                <MDXRemote 
                  source={mdxSource}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                    },
                  }}
                />
              )}
            </div>
          )}
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
