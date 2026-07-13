'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Heart,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function VolunteerLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const supabase = createClient();

      // First check if there's an application for this email
      const { data: application } = await supabase
        .from('volunteer_applications')
        .select('status')
        .eq('email', email)
        .single();

      // If no application exists, try to sign in (for existing volunteers)
      if (!application) {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          throw new Error('No volunteer account found. Please apply first.');
        }

        // Check if user has volunteer role
        const userRole = data.user?.user_metadata?.role;

        if (userRole !== 'volunteer') {
          await supabase.auth.signOut();
          throw new Error('Access denied. Volunteer credentials required.');
        }

        // Redirect to volunteer dashboard
        router.push('/volunteer/dashboard');
        router.refresh();
        return;
      }

      // Check application status
      if (application.status === 'pending') {
        throw new Error(
          'Your application is under review. We will notify you once it has been processed.'
        );
      } else if (application.status === 'rejected') {
        throw new Error(
          'Your volunteer application was not approved. Please contact us for more information.'
        );
      } else if (application.status === 'more_info_requested') {
        throw new Error(
          'We need more information about your application. Please check your email.'
        );
      } else if (application.status === 'approved') {
        // Try to sign in
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) throw signInError;

        // Check if user has volunteer role
        const userRole = data.user?.user_metadata?.role;

        if (userRole !== 'volunteer') {
          await supabase.auth.signOut();
          throw new Error('Access denied. Volunteer credentials required.');
        }

        // Redirect to volunteer dashboard
        router.push('/volunteer/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-green-600 to-green-700 p-12 lg:flex lg:w-1/2">
        <div>
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image
              src="/logo.png"
              alt="Sarwa Society for Animal Welfare"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <div className="text-2xl font-bold">SARWA</div>
              <div className="text-sm opacity-90">
                Society for Animal Welfare
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Volunteer Portal</h1>
          <p className="text-xl text-white/90">
            Access your volunteer dashboard, view assignments, and track your
            impact in animal welfare.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex-1 rounded-lg bg-white/20 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-sm text-white/80">Active Volunteers</div>
            </div>
            <div className="flex-1 rounded-lg bg-white/20 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/80">Hours Contributed</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60">
          © 2024 Sarwa Society for Animal Welfare. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Sarwa Society for Animal Welfare"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">SARWA</div>
                <div className="text-sm text-gray-600">Volunteer Portal</div>
              </div>
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Volunteer Login
                  </h2>
                  <p className="text-sm text-gray-600">
                    Access your volunteer dashboard
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="volunteer@example.com"
                  required
                  disabled={isLoading}
                  className="mt-2"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  href="/volunteer/forgot-password"
                  className="text-sm text-green-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 py-6 text-lg hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Sign In as Volunteer
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/volunteer"
                  className="font-medium text-green-600 hover:underline"
                >
                  Apply to volunteer
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Are you an admin?{' '}
                <Link
                  href="/admin/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to website
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure login powered by Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
