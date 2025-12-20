import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface NewsletterSignup {
  id?: string;
  email: string;
  name?: string;
  source: string; // Which page/form they signed up from
  interests?: string[]; // Topics they're interested in
  created_at?: string;
}

export interface LeadTracking {
  id?: string;
  email: string;
  name?: string;
  business_type?: string; // handyman, electrician, plumber, etc.
  source: string; // blog post, software comparison, homepage, etc.
  action: string; // newsletter_signup, trial_click, download, etc.
  metadata?: Record<string, any>; // Additional tracking data
  created_at?: string;
}
