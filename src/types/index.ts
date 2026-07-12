/**
 * Global type definitions for the application
 */

// Re-export Prisma types
export type {
  User,
  UserRole,
  UserStatus,
  Donation,
  DonationType,
  DonationStatus,
  PaymentMethod,
  Campaign,
  CampaignStatus,
  Animal,
  AnimalType,
  AnimalStatus,
  AnimalGender,
  Volunteer,
  VolunteerStatus,
  BlogPost,
  PostStatus,
  Category,
  Tag,
  Comment,
  ContactSubmission,
  SubmissionStatus,
  Media,
  MediaType,
  Page,
  SiteSetting,
} from '@prisma/client';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface DonationFormData {
  amount: number;
  type: 'ONE_TIME' | 'MONTHLY' | 'YEARLY';
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorAddress?: string;
  isAnonymous: boolean;
  message?: string;
  dedicatedTo?: string;
  campaignId?: string;
}

export interface VolunteerFormData {
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  city: string;
  state: string;
  pincode: string;
  occupation?: string;
  organization?: string;
  skills: string[];
  interests: string[];
  availability?: string;
  experience?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  images?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

export interface CampaignFormData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  goalAmount: number;
  startDate: Date;
  endDate?: Date;
  featuredImage?: string;
  images?: string[];
  videoUrl?: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  metaTitle?: string;
  metaDescription?: string;
}

export interface AnimalFormData {
  name?: string;
  type: 'DOG' | 'CAT' | 'COW' | 'BIRD' | 'WILDLIFE' | 'OTHER';
  breed?: string;
  age?: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  status: 'RESCUED' | 'IN_TREATMENT' | 'RECOVERING' | 'ADOPTED' | 'RELEASED' | 'DECEASED';
  location?: string;
  rescueDate: Date;
  medicalHistory?: string;
  currentCondition?: string;
  vaccinated: boolean;
  neutered: boolean;
  rescueStory?: string;
  featuredImage?: string;
  images?: string[];
  campaignId?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalDonations: number;
  totalDonors: number;
  totalAnimalsRescued: number;
  totalVolunteers: number;
  activeCampaigns: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    donorName: string;
    createdAt: Date;
  }>;
  recentAnimals: Array<{
    id: string;
    name?: string;
    type: string;
    status: string;
    rescueDate: Date;
  }>;
}

// Search & Filter Types
export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CampaignFilters extends SearchParams {
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface AnimalFilters extends SearchParams {
  type?: string;
  status?: string;
  rescueDateFrom?: Date;
  rescueDateTo?: Date;
}

export interface DonationFilters extends SearchParams {
  status?: string;
  type?: string;
  amountMin?: number;
  amountMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// Payment Types
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: string;
  status: string;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// SEO Types
export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

// Made with Bob
