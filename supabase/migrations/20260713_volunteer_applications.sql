-- Create volunteer_applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  occupation TEXT NOT NULL,
  skills_experience TEXT NOT NULL,
  areas_of_interest TEXT NOT NULL,
  availability TEXT NOT NULL,
  why_volunteer TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'more_info_requested')),
  admin_notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create index for faster queries
CREATE INDEX idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX idx_volunteer_applications_user_id ON volunteer_applications(user_id);
CREATE INDEX idx_volunteer_applications_created_at ON volunteer_applications(created_at DESC);

-- Enable RLS
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public application)
CREATE POLICY "Anyone can submit volunteer application"
  ON volunteer_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Admins and Super Admins can view all applications
CREATE POLICY "Admins can view all volunteer applications"
  ON volunteer_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Policy: Volunteers can view their own application
CREATE POLICY "Volunteers can view their own application"
  ON volunteer_applications
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.email = volunteer_applications.email
      AND user_profiles.role = 'volunteer'
    )
  );

-- Policy: Admins and Super Admins can update applications
CREATE POLICY "Admins can update volunteer applications"
  ON volunteer_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Policy: Admins and Super Admins can delete applications
CREATE POLICY "Admins can delete volunteer applications"
  ON volunteer_applications
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_volunteer_application_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_volunteer_application_timestamp
  BEFORE UPDATE ON volunteer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_volunteer_application_updated_at();

-- Made with Bob