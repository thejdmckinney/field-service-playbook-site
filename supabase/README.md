# Supabase Setup Instructions

## 1. Run the Database Migration

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to execute the SQL

This will create:
- `newsletter_signups` table
- `lead_tracking` table
- Appropriate indexes for performance
- Row Level Security (RLS) policies
- Auto-update triggers

## 2. Verify Tables Were Created

1. Go to **Table Editor** in Supabase
2. You should see:
   - `newsletter_signups`
   - `lead_tracking`

## 3. Test the Newsletter Signup

The newsletter form is now integrated on:
- Homepage (`/`) - Full form with name and email
- Blog posts (`/blog/[slug]`) - After article content
- Coming soon: Blog listing page, tools pages

## 4. View Your Signups

In Supabase:
1. Go to **Table Editor**
2. Click on `newsletter_signups` to see all signups
3. Click on `lead_tracking` to see all tracked actions

## 5. Newsletter Form Features

### Automatic Lead Tracking
Every newsletter signup automatically:
- Stores email and name in `newsletter_signups`
- Tracks the action in `lead_tracking` with:
  - Source (which page they signed up from)
  - User agent and referrer
  - Timestamp

### Duplicate Prevention
- Emails are unique in `newsletter_signups`
- Users see friendly error if already subscribed

### Form States
- Loading state while submitting
- Success message on signup
- Error handling for network issues
- Validation for email format

## 6. Lead Tracking API

Use `/api/track-lead` to track other actions like:
- Trial button clicks
- Software comparison views
- Template downloads
- Tool usage

Example:
```javascript
fetch('/api/track-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
    business_type: 'handyman',
    source: 'software-comparison',
    action: 'trial_click',
    metadata: {
      software: 'Job Flow Hub',
      plan: 'free-trial'
    }
  })
});
```

## 7. Next Steps

### Email Integration (Optional)
Consider integrating with:
- **Resend** - Transactional emails
- **SendGrid** - Email marketing
- **Mailchimp** - Newsletter automation
- **ConvertKit** - Creator email platform

### Analytics Dashboard
Build an admin dashboard to view:
- Total signups over time
- Conversion rates by source
- Most popular blog posts
- Lead quality scores

### A/B Testing
Test different:
- Form placements
- Copy variations
- CTA buttons
- Incentives (free templates, guides, etc.)

## Database Schema

### newsletter_signups
- `id` (UUID) - Primary key
- `email` (TEXT) - Unique, required
- `name` (TEXT) - Optional
- `source` (TEXT) - Where they signed up
- `interests` (TEXT[]) - Array of interests
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### lead_tracking
- `id` (UUID) - Primary key
- `email` (TEXT) - Required
- `name` (TEXT) - Optional
- `business_type` (TEXT) - handyman, electrician, etc.
- `source` (TEXT) - Page or location
- `action` (TEXT) - What they did
- `metadata` (JSONB) - Flexible additional data
- `created_at` (TIMESTAMP)
