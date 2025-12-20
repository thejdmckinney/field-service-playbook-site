# Field Service Playbook - Copilot Instructions

## Project Overview
Content marketing website for fieldserviceplaybook.com targeting field service businesses (handymen, electricians, plumbers, pool services, landscaping). Acts as a funnel for Job Flow Hub SaaS product.

## Tech Stack
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Turbopack for fast development
- MDX for blog content (next-mdx-remote, gray-matter)

## Content Strategy
- Blog articles on revenue growth, software comparisons, marketing, efficiency, customer service, and business growth
- Free tools including calculators, templates, and software comparison
- CTAs throughout the site leading to Job Flow Hub free trial

## Development Guidelines
- Use TypeScript for all new components
- Follow Next.js 16 App Router conventions
- Keep SEO best practices in mind (meta tags, semantic HTML, performance)
- Maintain clean, readable Tailwind classes
- Prioritize mobile-responsive design

## Key Pages
- `/` - Homepage with hero and topic cards
- `/blog` - Blog listing page (dynamically loads from MDX files)
- `/blog/[slug]` - Individual blog posts (MDX-powered)
- `/tools` - Tools directory
- `/tools/software-comparison` - FSM software comparison (features Job Flow Hub)

## Blog System
- Blog posts are written in MDX format
- Location: `/content/blog/*.mdx`
- Utilities: `/lib/blog.ts` provides `getAllPosts()` and `getPostBySlug()`
- Frontmatter includes: title, description, date, category, author, readTime, featured

## Next Steps for Content
1. Write actual blog post content for each topic area
2. Add metadata and SEO optimization
3. Integrate with Job Flow Hub actual URLs
4. Add email capture forms
5. Set up analytics tracking
