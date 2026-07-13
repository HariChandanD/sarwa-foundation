-- Fix CMS RLS Policies for Admin Access
-- This migration adds explicit SELECT policies for admins to read CMS content

-- Drop existing admin policies that use FOR ALL and recreate with specific operations
-- This ensures admins can SELECT even when content doesn't match public visibility rules

-- Programs: Admins can view all programs (not just active ones)
DROP POLICY IF EXISTS "Admins can view all programs" ON programs;
CREATE POLICY "Admins can view all programs" ON programs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Rescue Stories: Admins can view all stories
DROP POLICY IF EXISTS "Admins can view all rescue stories" ON rescue_stories;
CREATE POLICY "Admins can view all rescue stories" ON rescue_stories FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Gallery Media: Admins can view all media
DROP POLICY IF EXISTS "Admins can view all gallery media" ON gallery_media;
CREATE POLICY "Admins can view all gallery media" ON gallery_media FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Events: Admins can view all events
DROP POLICY IF EXISTS "Admins can view all events" ON events;
CREATE POLICY "Admins can view all events" ON events FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- News Articles: Admins can view all articles (including drafts)
DROP POLICY IF EXISTS "Admins can view all news articles" ON news_articles;
CREATE POLICY "Admins can view all news articles" ON news_articles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Homepage Hero: Admins can view all hero sections
DROP POLICY IF EXISTS "Admins can view all homepage hero" ON homepage_hero;
CREATE POLICY "Admins can view all homepage hero" ON homepage_hero FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- About Content: Admins can view all about content
DROP POLICY IF EXISTS "Admins can view all about content" ON about_content;
CREATE POLICY "Admins can view all about content" ON about_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Contact Info: Admins can view all contact info
DROP POLICY IF EXISTS "Admins can view all contact info" ON contact_info;
CREATE POLICY "Admins can view all contact info" ON contact_info FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Donation Settings: Admins can view all donation settings
DROP POLICY IF EXISTS "Admins can view all donation settings" ON donation_settings;
CREATE POLICY "Admins can view all donation settings" ON donation_settings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Footer Content: Admins can view all footer content
DROP POLICY IF EXISTS "Admins can view all footer content" ON footer_content;
CREATE POLICY "Admins can view all footer content" ON footer_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- Made with Bob