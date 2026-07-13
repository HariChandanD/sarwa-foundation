// CMS Content Types

export interface HomepageHero {
  id: string;
  title: string;
  subtitle: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  hero_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  section_name: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface AboutContent {
  id: string;
  about_text: string;
  mission: string;
  vision: string;
  values: Value[];
  about_image_url?: string;
  mission_image_url?: string;
  vision_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  icon?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RescueStory {
  id: string;
  title: string;
  animal_name: string;
  story: string;
  rescue_date?: string;
  before_image_url?: string;
  after_image_url?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description?: string;
  cover_image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryMedia {
  id: string;
  album_id?: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  end_date?: string;
  location?: string;
  image_url?: string;
  registration_link?: string;
  is_registration_open: boolean;
  max_participants?: number;
  current_participants: number;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  google_maps_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  whatsapp_number?: string;
  created_at: string;
  updated_at: string;
}

export interface DonationSettings {
  id: string;
  qr_code_image_url?: string;
  upi_id?: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  razorpay_key_id?: string;
  razorpay_key_secret?: string;
  donation_message?: string;
  created_at: string;
  updated_at: string;
}

export interface FooterLink {
  title: string;
  url: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface FooterContent {
  id: string;
  copyright_text: string;
  footer_links: FooterLink[];
  social_links: SocialLinks;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  site_tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color: string;
  secondary_color: string;
  created_at: string;
  updated_at: string;
}

// Form types for creating/updating content
export type HomepageHeroInput = Omit<
  HomepageHero,
  'id' | 'created_at' | 'updated_at'
>;
export type ProgramInput = Omit<Program, 'id' | 'created_at' | 'updated_at'>;
export type RescueStoryInput = Omit<
  RescueStory,
  'id' | 'created_at' | 'updated_at'
>;
export type EventInput = Omit<Event, 'id' | 'created_at' | 'updated_at'>;
export type NewsArticleInput = Omit<
  NewsArticle,
  'id' | 'created_at' | 'updated_at'
>;
export type GalleryAlbumInput = Omit<
  GalleryAlbum,
  'id' | 'created_at' | 'updated_at'
>;
export type GalleryMediaInput = Omit<
  GalleryMedia,
  'id' | 'created_at' | 'updated_at'
>;

// Made with Bob
