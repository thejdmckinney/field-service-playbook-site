-- Re-enable RLS
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tracking ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous inserts" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON lead_tracking;
DROP POLICY IF EXISTS "Allow authenticated reads" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow authenticated reads" ON lead_tracking;
DROP POLICY IF EXISTS "Allow anonymous newsletter inserts" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow anonymous lead inserts" ON lead_tracking;
DROP POLICY IF EXISTS "Allow authenticated newsletter reads" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow authenticated lead reads" ON lead_tracking;
DROP POLICY IF EXISTS "Enable insert for anon users" ON newsletter_signups;
DROP POLICY IF EXISTS "Enable insert for anon users" ON lead_tracking;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON newsletter_signups;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON lead_tracking;
DROP POLICY IF EXISTS "newsletter_signups_insert_policy" ON newsletter_signups;
DROP POLICY IF EXISTS "lead_tracking_insert_policy" ON lead_tracking;
DROP POLICY IF EXISTS "newsletter_signups_select_policy" ON newsletter_signups;
DROP POLICY IF EXISTS "lead_tracking_select_policy" ON lead_tracking;

-- Create policies that explicitly allow public/anon role
CREATE POLICY "newsletter_signups_anon_insert" 
ON newsletter_signups 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "lead_tracking_anon_insert" 
ON lead_tracking 
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow authenticated users to read everything
CREATE POLICY "newsletter_signups_auth_select" 
ON newsletter_signups 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "lead_tracking_auth_select" 
ON lead_tracking 
FOR SELECT 
TO authenticated 
USING (true);
