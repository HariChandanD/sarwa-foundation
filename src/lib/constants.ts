/**
 * Application-wide constants
 */

// Site Configuration
export const SITE_CONFIG = {
  name: 'Animal Welfare NGO',
  description: 'Saving Lives, One Paw at a Time',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/animalwelfarengo',
    facebook: 'https://facebook.com/animalwelfarengo',
    instagram: 'https://instagram.com/animalwelfarengo',
    linkedin: 'https://linkedin.com/company/animalwelfarengo',
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@animalwelfare.org',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-1234567890',
    address: '123 Animal Street, City, State - 123456',
  },
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/animals', label: 'Animals' },
  { href: '/blog', label: 'Blog' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/contact', label: 'Contact' },
] as const;

// Donation Amounts (in INR)
export const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
] as const;

// Animal Types
export const ANIMAL_TYPES = [
  { value: 'DOG', label: 'Dog' },
  { value: 'CAT', label: 'Cat' },
  { value: 'COW', label: 'Cow' },
  { value: 'BIRD', label: 'Bird' },
  { value: 'WILDLIFE', label: 'Wildlife' },
  { value: 'OTHER', label: 'Other' },
] as const;

// Animal Status
export const ANIMAL_STATUS = [
  { value: 'RESCUED', label: 'Rescued', color: 'blue' },
  { value: 'IN_TREATMENT', label: 'In Treatment', color: 'yellow' },
  { value: 'RECOVERING', label: 'Recovering', color: 'orange' },
  { value: 'ADOPTED', label: 'Adopted', color: 'green' },
  { value: 'RELEASED', label: 'Released', color: 'purple' },
  { value: 'DECEASED', label: 'Deceased', color: 'gray' },
] as const;

// User Roles
export const USER_ROLES = [
  { value: 'USER', label: 'User' },
  { value: 'VOLUNTEER', label: 'Volunteer' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
] as const;

// Campaign Status
export const CAMPAIGN_STATUS = [
  { value: 'DRAFT', label: 'Draft', color: 'gray' },
  { value: 'ACTIVE', label: 'Active', color: 'green' },
  { value: 'PAUSED', label: 'Paused', color: 'yellow' },
  { value: 'COMPLETED', label: 'Completed', color: 'blue' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
] as const;

// Volunteer Skills
export const VOLUNTEER_SKILLS = [
  'Animal Care',
  'Veterinary',
  'Fundraising',
  'Social Media',
  'Photography',
  'Event Management',
  'Teaching',
  'Transportation',
  'Administrative',
  'Legal',
  'Marketing',
  'Web Development',
] as const;

// File Upload Limits
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocTypes: ['application/pdf'],
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96],
} as const;

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  displayLong: 'MMMM dd, yyyy',
  displayWithTime: 'MMM dd, yyyy HH:mm',
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// API Routes
export const API_ROUTES = {
  donations: '/api/donations',
  campaigns: '/api/campaigns',
  animals: '/api/animals',
  volunteers: '/api/volunteers',
  blog: '/api/blog',
  contact: '/api/contact',
  auth: '/api/auth',
  upload: '/api/upload',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  donation: 'Thank you for your donation!',
  volunteer: 'Your volunteer application has been submitted.',
  contact: 'Your message has been sent successfully.',
  update: 'Updated successfully.',
  delete: 'Deleted successfully.',
  create: 'Created successfully.',
} as const;

// Social Share
export const SOCIAL_SHARE = {
  twitter: (url: string, text: string) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  whatsapp: (url: string, text: string) =>
    `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  url: /^https?:\/\/.+/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

// Feature Flags
export const FEATURES = {
  donations: process.env.NEXT_PUBLIC_ENABLE_DONATIONS === 'true',
  volunteers: process.env.NEXT_PUBLIC_ENABLE_VOLUNTEER_REGISTRATION === 'true',
  blog: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
} as const;

// Made with Bob
