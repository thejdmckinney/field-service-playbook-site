import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { client } from '@/sanity/lib/client';
import { PortableTextBlock } from 'sanity';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  featured?: boolean;
  content: string;
  featuredImage?: string;
  portableTextContent?: PortableTextBlock[];
}

// Fetch posts from Sanity
export async function getSanityPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    description,
    "date": publishedAt,
    category,
    author,
    readTime,
    featured,
    "featuredImage": featuredImage.asset->url,
    "portableTextContent": content
  }`;

  try {
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error('Error fetching Sanity posts:', error);
    return [];
  }
}

// Fetch MDX posts (legacy)
export async function getMDXPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        author: data.author,
        readTime: data.readTime,
        featured: data.featured || false,
        featuredImage: data.featuredImage,
        content,
      } as BlogPost;
    });

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get all posts (Sanity + MDX combined)
export async function getAllPosts(): Promise<BlogPost[]> {
  const sanityPosts = await getSanityPosts();
  const mdxPosts = await getMDXPosts();
  
  // Combine and sort by date
  const allPosts = [...sanityPosts, ...mdxPosts];
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get a single post by slug (checks Sanity first, then MDX)
export async function getPostBySlug(slug: string) {
  // Try Sanity first
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    "date": publishedAt,
    category,
    author,
    readTime,
    featured,
    "featuredImage": featuredImage.asset->url,
    content[] {
      ...,
      _type == "image" => {
        ...,
        "asset": {
          "url": asset->url
        }
      }
    }
  }`;

  try {
    const sanityPost = await client.fetch(query, { slug });
    
    if (sanityPost) {
      return {
        slug: sanityPost.slug,
        frontmatter: {
          title: sanityPost.title,
          description: sanityPost.description,
          date: sanityPost.date,
          category: sanityPost.category,
          author: sanityPost.author,
          readTime: sanityPost.readTime,
          featured: sanityPost.featured,
          featuredImage: sanityPost.featuredImage,
        },
        mdxSource: null,
        portableTextContent: sanityPost.content,
        isSanity: true,
      };
    }
  } catch (error) {
    console.error('Error fetching Sanity post:', error);
  }

  // Fall back to MDX
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    mdxSource: content, // Return raw MDX content for next-mdx-remote/rsc
    portableTextContent: null,
    isSanity: false,
  };
}
