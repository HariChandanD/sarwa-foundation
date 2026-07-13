-- Create settings table for NGO configuration
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_name TEXT NOT NULL DEFAULT 'SARWA - Society for Advocacy of Rights and Welfare of Animals',
  address TEXT NOT NULL DEFAULT '24, 4th B main 4th Cross, Mahalakshmilayout, Bangalore, Karnataka 560086',
  contact_number TEXT NOT NULL DEFAULT '+91 9876543210',
  email TEXT NOT NULL DEFAULT 'contact@sarwa.org',
  facebook_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  account_holder_name TEXT,
  upi_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create index on settings
CREATE INDEX IF NOT EXISTS idx_settings_updated_at ON public.settings(updated_at DESC);

-- Insert default settings (only one row should exist)
INSERT INTO public.settings (
  ngo_name,
  address,
  contact_number,
  email,
  facebook_url,
  instagram_url,
  bank_name,
  account_number,
  ifsc_code,
  account_holder_name,
  upi_id
) VALUES (
  'SARWA - Society for Advocacy of Rights and Welfare of Animals',
  '24, 4th B main 4th Cross, Mahalakshmilayout, Bangalore, Karnataka 560086',
  '+91 9876543210',
  'contact@sarwa.org',
  'https://facebook.com/sarwa',
  'https://instagram.com/sarwa',
  'State Bank of India',
  '1234567890',
  'SBIN0001234',
  'SARWA Society',
  'sarwa@upi'
) ON CONFLICT DO NOTHING;

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes on activity_logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs(action);

-- Enable RLS on settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Settings policies
-- Allow admins to read settings
CREATE POLICY "Admins can read settings"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.user_id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Allow admins to update settings
CREATE POLICY "Admins can update settings"
  ON public.settings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.user_id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.user_id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Enable RLS on activity_logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Activity logs policies
-- Allow admins to read activity logs
CREATE POLICY "Admins can read activity logs"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.user_id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin')
    )
  );

-- Allow authenticated users to insert their own activity logs
CREATE POLICY "Users can insert activity logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create trigger to update settings updated_at
CREATE OR REPLACE FUNCTION update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION update_settings_updated_at();

-- Add status and last_login columns to user_profiles if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'user_profiles' AND column_name = 'status') THEN
    ALTER TABLE public.user_profiles ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
    ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_status_check 
      CHECK (status IN ('active', 'disabled'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'user_profiles' AND column_name = 'last_login') THEN
    ALTER TABLE public.user_profiles ADD COLUMN last_login TIMESTAMPTZ;
  END IF;
END $$;

-- Create index on user_profiles status
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON public.user_profiles(status);

-- Made with Bob
