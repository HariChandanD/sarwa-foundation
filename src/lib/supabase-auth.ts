import { createBrowserClient } from '@supabase/ssr';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Client-side Supabase client for authentication
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Server-side Supabase client for authentication
export const createServerClient = async () => {
  const cookieStore = await cookies();
  
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};

// User roles
export enum UserRole {
  ADMIN = 'admin',
  VOLUNTEER = 'volunteer',
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  full_name: string;
  role: UserRole;
}

// Helper function to get user role from metadata
export const getUserRole = (user: any): UserRole | null => {
  return user?.user_metadata?.role || null;
};

// Helper function to check if user has required role
export const hasRole = (user: any, requiredRole: UserRole): boolean => {
  const userRole = getUserRole(user);
  return userRole === requiredRole;
};

// Helper function to check if user is admin
export const isAdmin = (user: any): boolean => {
  return hasRole(user, UserRole.ADMIN);
};

// Helper function to check if user is volunteer
export const isVolunteer = (user: any): boolean => {
  return hasRole(user, UserRole.VOLUNTEER);
};

// Made with Bob