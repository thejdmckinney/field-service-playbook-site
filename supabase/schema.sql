-- Newsletter Signups Table
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT NOT NULL, -- Which page they signed up from
  interests TEXT[], -- Array of topics they're interested in
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Lead Tracking Table
CREATE TABLE IF NOT EXISTS lead_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  business_type TEXT, -- handyman, electrician, plumber, pool, landscaping, other
  source TEXT NOT NULL, -- blog post slug, page path, or specific location
  action TEXT NOT NULL, -- newsletter_signup, trial_click, software_comparison, download_template, etc.
  metadata JSONB, -- Additional flexible tracking data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_email ON lead_tracking(email);
CREATE INDEX IF NOT EXISTS idx_lead_created ON lead_tracking(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_action ON lead_tracking(action);
CREATE INDEX IF NOT EXISTS idx_lead_source ON lead_tracking(source);

-- Enable Row Level Security
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tracking ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts (for public signups)
CREATE POLICY "Allow anonymous newsletter inserts" ON newsletter_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous lead inserts" ON lead_tracking
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policies: Allow authenticated reads (for admin dashboard later)
CREATE POLICY "Allow authenticated newsletter reads" ON newsletter_signups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated lead reads" ON lead_tracking
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_newsletter_signups_updated_at
  BEFORE UPDATE ON newsletter_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
