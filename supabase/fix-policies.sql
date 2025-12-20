-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON lead_tracking;
DROP POLICY IF EXISTS "Allow authenticated reads" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow authenticated reads" ON lead_tracking;
DROP POLICY IF EXISTS "Allow anonymous newsletter inserts" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow anonymous lead inserts" ON lead_tracking;
DROP POLICY IF EXISTS "Allow authenticated newsletter reads" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow authenticated lead reads" ON lead_tracking;

-- Create new policies with unique names for both anon and authenticated
CREATE POLICY "Enable insert for anon users" ON newsletter_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable insert for anon users" ON lead_tracking
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON newsletter_signups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users" ON lead_tracking
  FOR SELECT
  TO authenticated
  USING (true);
