-- Add super_admin role and admin invitations system

-- Update user_profiles table to support super_admin role
ALTER TABLE public.user_profiles 
DROP CONSTRAINT IF EXISTS user_profiles_role_check;

ALTER TABLE public.user_profiles 
ADD CONSTRAINT user_profiles_role_check 
CHECK (role IN ('super_admin', 'admin', 'volunteer'));

-- Create admin_invitations table
CREATE TABLE IF NOT EXISTS public.admin_invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    invited_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
    invitation_token TEXT UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_invitations
-- Super admins can view all invitations
CREATE POLICY "Super admins can view all invitations"
    ON public.admin_invitations
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Super admins can create invitations
CREATE POLICY "Super admins can create invitations"
    ON public.admin_invitations
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Super admins can update invitations
CREATE POLICY "Super admins can update invitations"
    ON public.admin_invitations
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Super admins can delete invitations
CREATE POLICY "Super admins can delete invitations"
    ON public.admin_invitations
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Create system_settings table for tracking super admin setup
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Only super admins can read system settings
CREATE POLICY "Super admins can view system settings"
    ON public.system_settings
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Allow anonymous read for super_admin_exists check (needed for setup page)
CREATE POLICY "Anyone can check if super admin exists"
    ON public.system_settings
    FOR SELECT
    USING (setting_key = 'super_admin_exists');

-- Only super admins can update system settings
CREATE POLICY "Super admins can update system settings"
    ON public.system_settings
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Insert initial setting for super admin existence
INSERT INTO public.system_settings (setting_key, setting_value)
VALUES ('super_admin_exists', 'false')
ON CONFLICT (setting_key) DO NOTHING;

-- Create function to check if super admin exists
CREATE OR REPLACE FUNCTION public.check_super_admin_exists()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to mark super admin as created
CREATE OR REPLACE FUNCTION public.mark_super_admin_created()
RETURNS VOID AS $$
BEGIN
    UPDATE public.system_settings
    SET setting_value = 'true', updated_at = timezone('utc'::text, now())
    WHERE setting_key = 'super_admin_exists';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the handle_new_user function to support super_admin role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        COALESCE(NEW.raw_user_meta_data->>'role', 'volunteer')
    );
    
    -- If this is a super admin, mark it in system settings
    IF (NEW.raw_user_meta_data->>'role' = 'super_admin') THEN
        PERFORM public.mark_super_admin_created();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_invitations_email ON public.admin_invitations(email);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_status ON public.admin_invitations(status);
CREATE INDEX IF NOT EXISTS idx_admin_invitations_token ON public.admin_invitations(invitation_token);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);

-- Add comments
COMMENT ON TABLE public.admin_invitations IS 'Stores admin invitation requests from super admin';
COMMENT ON TABLE public.system_settings IS 'Stores system-wide settings and flags';
COMMENT ON FUNCTION public.check_super_admin_exists() IS 'Returns true if at least one super admin exists';
COMMENT ON FUNCTION public.mark_super_admin_created() IS 'Marks that a super admin has been created';

-- Made with Bob