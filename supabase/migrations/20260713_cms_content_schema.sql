-- CMS Content Management Schema
-- This migration creates all tables needed for the CMS

-- =====================================================
-- HOMEPAGE CONTENT
-- =====================================================

-- Hero Section
CREATE TABLE IF NOT EXISTS homepage_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  primary_cta_text TEXT NOT NULL,
  primary_cta_link TEXT NOT NULL,
  secondary_cta_text TEXT,
  secondary_cta_link TEXT,
  hero_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage Sections (for ordering and visibility)
CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ABOUT PAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  about_text TEXT NOT NULL,
  mission TEXT NOT NULL,
  vision TEXT NOT NULL,
  values JSONB NOT NULL DEFAULT '[]', -- Array of value objects {title, description}
  about_image_url TEXT,
  mission_image_url TEXT,
  vision_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROGRAMS
-- =====================================================

CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  icon TEXT, -- Icon name from lucide-react
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RESCUE STORIES
-- =====================================================

CREATE TABLE IF NOT EXISTS rescue_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  animal_name TEXT NOT NULL,
  story TEXT NOT NULL,
  rescue_date DATE,
  before_image_url TEXT,
  after_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- GALLERY
-- =====================================================

CREATE TABLE IF NOT EXISTS gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EVENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  image_url TEXT,
  registration_link TEXT,
  is_registration_open BOOLEAN DEFAULT false,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NEWS/BLOG
-- =====================================================

CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES user_profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CONTACT INFORMATION
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  google_maps_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  whatsapp_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- DONATION SETTINGS
-- =====================================================

CREATE TABLE IF NOT EXISTS donation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_image_url TEXT,
  upi_id TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  account_holder_name TEXT,
  razorpay_key_id TEXT,
  razorpay_key_secret TEXT,
  donation_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FOOTER CONTENT
-- =====================================================

CREATE TABLE IF NOT EXISTS footer_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  copyright_text TEXT NOT NULL,
  footer_links JSONB NOT NULL DEFAULT '[]', -- Array of {title, url}
  social_links JSONB NOT NULL DEFAULT '{}', -- Object with social media URLs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SITE SETTINGS (General)
-- =====================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'SARWA Foundation',
  site_tagline TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#10b981',
  secondary_color TEXT DEFAULT '#059669',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_programs_display_order ON programs(display_order);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_rescue_stories_featured ON rescue_stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_rescue_stories_display_order ON rescue_stories(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_media_album ON gallery_media(album_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_news_status ON news_articles(status);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(published_at);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news_articles(slug);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE homepage_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescue_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables
CREATE POLICY "Public can view active homepage hero" ON homepage_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view visible homepage sections" ON homepage_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view about content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public can view active programs" ON programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view rescue stories" ON rescue_stories FOR SELECT USING (true);
CREATE POLICY "Public can view active gallery albums" ON gallery_albums FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view gallery media" ON gallery_media FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view published news" ON news_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view contact info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public can view donation settings" ON donation_settings FOR SELECT USING (true);
CREATE POLICY "Public can view footer content" ON footer_content FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Admin write access (admins and super_admins can manage all content)
CREATE POLICY "Admins can manage homepage hero" ON homepage_hero FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage homepage sections" ON homepage_sections FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage about content" ON about_content FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage programs" ON programs FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage rescue stories" ON rescue_stories FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage gallery albums" ON gallery_albums FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage gallery media" ON gallery_media FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage events" ON events FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage news articles" ON news_articles FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage contact info" ON contact_info FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage donation settings" ON donation_settings FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage footer content" ON footer_content FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can manage site settings" ON site_settings FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_profiles.id = auth.uid() 
    AND user_profiles.role IN ('admin', 'super_admin')
  ));

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default homepage hero
INSERT INTO homepage_hero (title, subtitle, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link)
VALUES (
  'Every Life Deserves Love and Care',
  'Join us in our mission to rescue, rehabilitate, and rehome animals in need. Together, we can make a difference.',
  'Donate Now',
  '/donate',
  'Learn More',
  '/about'
) ON CONFLICT DO NOTHING;

-- Insert default homepage sections
INSERT INTO homepage_sections (section_name, display_order, is_visible) VALUES
  ('hero', 1, true),
  ('impact_stats', 2, true),
  ('featured_stories', 3, true),
  ('programs', 4, true),
  ('gallery_preview', 5, true),
  ('testimonials', 6, true),
  ('cta', 7, true)
ON CONFLICT (section_name) DO NOTHING;

-- Insert default about content
INSERT INTO about_content (about_text, mission, vision, values)
VALUES (
  'SARWA Foundation is dedicated to the welfare and protection of animals. We believe every animal deserves a life free from suffering and filled with love.',
  'To rescue, rehabilitate, and rehome animals in need while promoting compassion and responsible pet ownership in our community.',
  'A world where every animal is treated with dignity, respect, and compassion.',
  '[
    {"title": "Compassion", "description": "We treat every animal with kindness and empathy"},
    {"title": "Integrity", "description": "We operate with transparency and accountability"},
    {"title": "Excellence", "description": "We strive for the highest standards in animal care"},
    {"title": "Community", "description": "We work together to create lasting change"}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (address, phone, email, whatsapp_number)
VALUES (
  '123 Animal Welfare Street, City, State 12345',
  '+91 1234567890',
  'contact@sarwafoundation.org',
  '+911234567890'
) ON CONFLICT DO NOTHING;

-- Insert default footer content
INSERT INTO footer_content (copyright_text, footer_links, social_links)
VALUES (
  '© 2024 SARWA Foundation. All rights reserved.',
  '[
    {"title": "Privacy Policy", "url": "/privacy"},
    {"title": "Terms of Service", "url": "/terms"},
    {"title": "Contact Us", "url": "/contact"}
  ]'::jsonb,
  '{
    "facebook": "",
    "instagram": "",
    "twitter": "",
    "youtube": ""
  }'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (site_name, site_tagline)
VALUES (
  'SARWA Foundation',
  'Society for Advocacy of Rights and Welfare of Animals'
) ON CONFLICT DO NOTHING;

-- Insert default donation settings
INSERT INTO donation_settings (donation_message)
VALUES (
  'Your generous donation helps us continue our mission to rescue and care for animals in need. Every contribution makes a difference!'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_homepage_hero_updated_at BEFORE UPDATE ON homepage_hero
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON homepage_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rescue_stories_updated_at BEFORE UPDATE ON rescue_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_albums_updated_at BEFORE UPDATE ON gallery_albums
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_media_updated_at BEFORE UPDATE ON gallery_media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donation_settings_updated_at BEFORE UPDATE ON donation_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_footer_content_updated_at BEFORE UPDATE ON footer_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Made with Bob
