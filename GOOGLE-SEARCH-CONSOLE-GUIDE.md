# Google Search Console Setup Guide

## Step-by-Step Instructions for Submitting Your Site

### 1. Create Google Search Console Account

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property"
4. Choose "URL prefix" and enter: `https://fieldserviceplaybook.com`

### 2. Verify Ownership

**Option A: HTML Tag Method (Recommended for Next.js)**

1. Google will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR-CODE-HERE" />
   ```

2. Update `/src/app/layout.tsx`:
   ```typescript
   export const metadata: Metadata = {
     // ... existing metadata
     verification: {
       google: "YOUR-CODE-HERE", // Replace this with your actual code
     }
   };
   ```

3. Deploy your changes
4. Click "Verify" in Google Search Console

**Option B: DNS Verification** (if you have access to domain DNS)
1. Add TXT record to your domain DNS
2. Wait for DNS propagation (up to 48 hours)
3. Click "Verify"

### 3. Submit Your Sitemap

1. In Google Search Console, go to "Sitemaps" in the left menu
2. Enter your sitemap URL: `https://fieldserviceplaybook.com/sitemap.xml`
3. Click "Submit"
4. Wait 24-48 hours for Google to crawl

### 4. Request Indexing for Key Pages

**High Priority Pages (Request Immediately):**
- Homepage: `https://fieldserviceplaybook.com/`
- Blog: `https://fieldserviceplaybook.com/blog`
- Software Comparison: `https://fieldserviceplaybook.com/tools/software-comparison`

**How to Request Indexing:**
1. Use the URL Inspection tool (search icon at top)
2. Enter the URL
3. Click "Request Indexing"
4. Repeat for each priority page

**Note:** Google allows limited manual indexing requests per day. Prioritize your most important pages.

---

## Expected Timeline

### First 24 Hours
- Google will discover your sitemap
- Initial crawl may begin
- Some pages might appear in "Coverage" report

### 1-2 Weeks
- Most pages should be indexed
- You'll start seeing impressions in Performance report
- Crawl errors (if any) will appear

### 1-3 Months
- Rankings will start to stabilize
- You'll see which keywords are performing
- Traffic will begin growing organically

---

## Monitoring & Optimization

### Weekly Tasks
1. Check "Performance" tab for:
   - Total clicks and impressions
   - Top performing queries
   - Top performing pages
   - Average position

2. Review "Coverage" tab for:
   - Indexed pages count
   - Excluded pages
   - Errors or warnings

3. Check "Enhancements" tab for:
   - Mobile usability issues
   - Core Web Vitals
   - Any structured data errors

### Monthly Tasks
1. Analyze top performing content
2. Identify low-performing pages to improve
3. Find new keyword opportunities
4. Update old content based on search trends
5. Build internal links to underperforming pages

---

## Common Issues & Solutions

### Issue: "Discovered - currently not indexed"
**Cause:** Google found the page but hasn't crawled it yet  
**Solution:** 
- Request indexing manually
- Add internal links to the page from indexed pages
- Improve page quality and content length

### Issue: "Crawled - currently not indexed"
**Cause:** Google crawled it but decided not to index  
**Solution:**
- Improve content quality and uniqueness
- Add more valuable information
- Ensure proper meta tags
- Check for duplicate content issues

### Issue: "Excluded by 'noindex' tag"
**Cause:** Page has noindex directive  
**Solution:**
- Check your robots meta tags in metadata
- Verify no accidental noindex in your code

### Issue: "Soft 404"
**Cause:** Page returns 200 but appears to be an error page  
**Solution:**
- Ensure pages have substantial content
- Return proper 404 status codes for actual error pages

### Issue: No impressions after 2 weeks
**Cause:** Content may not be competitive or searchable  
**Solution:**
- Research better keywords
- Improve content depth and quality
- Build backlinks from other sites
- Share on social media for initial traction

---

## SEO Best Practices Moving Forward

### Content Strategy
1. **Publish Consistently**
   - Aim for 1-2 new blog posts per week
   - Update old content every 6 months
   - Respond to trending topics in your industry

2. **Target Long-Tail Keywords**
   - "best field service software for handyman" (specific)
   - vs "field service software" (too competitive)

3. **Answer Real Questions**
   - Use Google's "People Also Ask" section
   - Monitor Search Console for actual search queries
   - Create content based on what people are searching

### Technical Maintenance
1. **Monitor Site Speed**
   - Keep Core Web Vitals in "Good" range
   - Optimize images
   - Minimize JavaScript

2. **Fix Errors Immediately**
   - Check Search Console weekly
   - Fix any crawl errors
   - Update broken links

3. **Mobile-First**
   - Test all pages on mobile devices
   - Ensure buttons and forms work perfectly
   - Check readability on small screens

### Link Building
1. **Internal Linking**
   - Link related blog posts to each other
   - Link from high-authority pages (like homepage) to new content
   - Use descriptive anchor text

2. **External Backlinks**
   - Guest post on industry sites
   - Get listed in directories (free and paid)
   - Partner with complementary businesses
   - Create shareable resources (infographics, calculators)

3. **Social Signals**
   - Share every new post on social media
   - Encourage sharing with social buttons
   - Build an email list and share new content

---

## Key Metrics to Track

### Search Performance (Google Search Console)
- **Total Clicks:** Actual visits from Google search
- **Total Impressions:** How many times your site appeared in search
- **Average CTR:** Clicks ÷ Impressions (aim for 3-5%)
- **Average Position:** Your average ranking (aim for positions 1-10)

### Top Performing Content
- Which blog posts get the most impressions?
- Which keywords drive the most clicks?
- Which pages have the highest CTR?
- Which pages have the lowest bounce rate?

### Growth Indicators
- Month-over-month increase in organic traffic
- Number of indexed pages growing
- Number of ranking keywords increasing
- Average position improving over time
- Click-through rate improving

---

## Quick Reference: Your URLs

### Main Pages
- Homepage: `https://fieldserviceplaybook.com/`
- Blog: `https://fieldserviceplaybook.com/blog`
- Tools: `https://fieldserviceplaybook.com/tools`

### Tools
- Pricing Calculator: `https://fieldserviceplaybook.com/tools/pricing-calculator`
- ROI Calculator: `https://fieldserviceplaybook.com/tools/roi-calculator`
- Software Comparison: `https://fieldserviceplaybook.com/tools/software-comparison`

### Blog Posts (Current)
- `https://fieldserviceplaybook.com/blog/increase-handyman-revenue`
- `https://fieldserviceplaybook.com/blog/best-field-service-software-2025`
- `https://fieldserviceplaybook.com/blog/get-more-customers-without-ads`
- `https://fieldserviceplaybook.com/blog/efficiency-hacks-field-service`
- `https://fieldserviceplaybook.com/blog/five-star-customer-service-field-service`
- `https://fieldserviceplaybook.com/blog/scale-field-service-business-100k-to-500k`

### Technical
- Sitemap: `https://fieldserviceplaybook.com/sitemap.xml`
- Robots.txt: `https://fieldserviceplaybook.com/robots.txt`

---

## Additional Tools to Set Up

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Import from Google Search Console (easiest method)
3. Submit sitemap: `https://fieldserviceplaybook.com/sitemap.xml`

### Google Analytics 4
1. Create GA4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to Next.js (consider using `@next/third-parties/google`)
4. Track custom events:
   - Newsletter signups
   - Calculator usage
   - Tool result views
   - Outbound clicks to Job Flow Hub

### PageSpeed Insights
- Test all key pages: https://pagespeed.web.dev/
- Aim for scores above 90 on:
  - Performance
  - Accessibility
  - Best Practices
  - SEO

---

## Questions to Ask Yourself Monthly

1. **Traffic:** Is organic traffic growing month-over-month?
2. **Rankings:** Are we ranking better for our target keywords?
3. **Content:** Which content performs best? Can we create more like it?
4. **Conversions:** Are visitors signing up for the newsletter?
5. **Engagement:** What's the average time on page? Can we improve it?
6. **Errors:** Are there any new crawl errors or issues?
7. **Competition:** What are competitors doing that we're not?
8. **Opportunities:** What new keywords should we target?

---

## Success Milestones

### Month 1
- ✅ Site submitted to Google Search Console
- ✅ All pages indexed
- ✅ No critical errors
- 🎯 Goal: 100+ impressions/day

### Month 3
- ✅ 10+ blog posts published
- ✅ Ranking for 50+ keywords
- ✅ Growing backlink profile
- 🎯 Goal: 500+ impressions/day, 20+ clicks/day

### Month 6
- ✅ 20+ blog posts published
- ✅ Ranking on page 1 for some target keywords
- ✅ Consistent traffic growth
- 🎯 Goal: 2,000+ impressions/day, 100+ clicks/day

### Month 12
- ✅ 50+ blog posts published
- ✅ Authority in field service niche
- ✅ Strong backlink profile
- 🎯 Goal: 5,000+ impressions/day, 300+ clicks/day

---

## Need Help?

### Resources
- [Google Search Central](https://developers.google.com/search)
- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

### When to Hire an SEO Expert
- If you're not seeing results after 6 months
- If you have technical issues you can't solve
- If you want to accelerate growth
- If you're in a very competitive niche

---

**Remember:** SEO is a marathon, not a sprint. Consistent, quality content + technical excellence = long-term organic traffic growth.

Good luck! 🚀
