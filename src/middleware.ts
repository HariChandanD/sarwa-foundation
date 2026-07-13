import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Admin routes protection (allow both admin and super_admin, but not setup page)
  if (path.startsWith('/admin') && !path.startsWith('/admin/login') && !path.startsWith('/admin/setup')) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin' && userRole !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Volunteer routes protection
  if (path.startsWith('/volunteer/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/volunteer/login', request.url));
    }

    const userRole = user.user_metadata?.role;
    if (userRole !== 'volunteer') {
      return NextResponse.redirect(new URL('/volunteer/login', request.url));
    }
  }

  // Redirect authenticated users away from login pages
  if (user) {
    const userRole = user.user_metadata?.role;

    if (path === '/admin/login' && (userRole === 'admin' || userRole === 'super_admin')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (path === '/volunteer/login' && userRole === 'volunteer') {
      return NextResponse.redirect(new URL('/volunteer/dashboard', request.url));
    }
    
    // Redirect away from setup if super admin already exists
    if (path === '/admin/setup' && (userRole === 'admin' || userRole === 'super_admin')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/volunteer/dashboard/:path*',
    '/volunteer/login',
  ],
};

// Made with Bob