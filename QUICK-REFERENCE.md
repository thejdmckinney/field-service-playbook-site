# Quick Reference Card - Field Service Playbook

## 🚀 Deploy Now

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd /Users/jeremymckinney/field-service-playbook-site
vercel

# 3. Follow prompts to connect your account
```

## 📋 After Deployment

### 1. Add Google Verification Code
File: `/src/app/layout.tsx`
Line: ~60 (verification object)
```typescript
verification: {
  google: "your-actual-code-here", // Replace this
}
```

### 2. Submit to Google Search Console
- URL: https://search.google.com/search-console
- Add Property → URL prefix
- Verify with HTML tag method
- Submit sitemap: `https://fieldserviceplaybook.com/sitemap.xml`

### 3. Request Indexing (Priority Pages)
Use URL Inspection tool to request indexing for:
1. Homepage: `/`
2. Blog: `/blog`
3. Software Comparison: `/tools/software-comparison`
4. Top blog posts

## 📝 Weekly Tasks

### Monday (30 min)
- Check Google Search Console for errors
- Review performance metrics (clicks, impressions)
- Plan new blog post topic

### Wednesday (2-3 hours)
- Write new blog post
- Add to `/content/blog/your-post-title.mdx`
- Use existing posts as templates
- Include CTAs to Job Flow Hub

### Friday (15 min)
- Deploy new content: `vercel --prod`
- Request indexing for new post in Search Console
- Share on social media
- Send to email list (if you have one)

## 📊 Check These Metrics Monthly

### Google Search Console
- Total clicks (goal: month-over-month growth)
- Total impressions (goal: increasing)
- Average CTR (goal: 3-5%)
- Average position (goal: decreasing = better)
- Top performing pages
- Top search queries

### Supabase Dashboard
- Newsletter signups count
- Lead tracking records
- Most popular lead sources
- Email collection rate

### Your Goals
- Month 1: 100+ impressions/day
- Month 3: 500+ impressions/day, 20+ clicks/day
- Month 6: 2,000+ impressions/day, 100+ clicks/day

## 🆘 Common Issues

### "Page not indexed"
- Request indexing manually in Search Console
- Add internal links from other pages
- Check for noindex tags (shouldn't be any)
- Wait 48-72 hours

### "Newsletter form not working"
- Check Supabase RLS policies (should be TO public)
- Verify .env.local credentials are correct
- Check browser console for errors
- Test with different email addresses

### "Build failing"
- Run `npm run build` locally to see errors
- Check for TypeScript errors
- Verify all MDX frontmatter is valid
- Check all imports are correct

### "Slow performance"
- Run PageSpeed Insights
- Optimize images (WebP format, proper sizes)
- Check Core Web Vitals
- Minimize JavaScript bundles

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Google Search Console Help**: https://support.google.com/webmasters
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Support**: https://vercel.com/support

## 🎯 Your URLs

- **Production**: https://fieldserviceplaybook.com
- **Sitemap**: https://fieldserviceplaybook.com/sitemap.xml
- **Robots**: https://fieldserviceplaybook.com/robots.txt
- **Admin**: https://vercel.com/dashboard
- **Database**: https://supabase.com/dashboard
- **Search Console**: https://search.google.com/search-console

## ✍️ Blog Post Template

Create: `/content/blog/your-slug.mdx`

```mdx
---
title: "Your Compelling Title Here"
description: "130-150 character description with target keyword"
date: "2024-12-20"
category: "Revenue|Software|Marketing|Efficiency|Customer Service|Growth"
author: "Jeremy - Creative Constructors"
readTime: "8 min read"
featured: true
---

# Your Compelling Title Here

Hook paragraph that grabs attention and relates to the reader's problem.

## Main Section 1

Content with real examples, actionable tips...

### Subsection

More specific details...

---

## Main Section 2

More valuable content...

**Real numbers:** Show data and results

**Pro tip:** Insider advice

---

## Ready to streamline your business?

[Try Job Flow Hub Free →](https://creativejobhub.com)
```

## 🔐 Don't Forget

- [ ] .env.local → .env.production (for production deploy)
- [ ] Add Google verification code
- [ ] Test all forms after deployment
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics (optional)
- [ ] Create og-image.jpg (1200x630)
- [ ] Add logo.png
- [ ] Update social media links in schema

## 💰 Lead Generation Funnel

1. **Google Search** → Your blog post
2. **Read valuable content** → Trust built
3. **Newsletter signup** or **Calculator use** → Email captured
4. **Email sequence** → Nurture lead
5. **CTA to Job Flow Hub** → Trial signup 🎉

---

**You've got this!** Everything is set up. Just deploy, submit to Google, and start publishing consistently. 🚀
