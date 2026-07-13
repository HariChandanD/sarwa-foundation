'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSuperAdminSetup = useCallback(async () => {
    try {
      const supabase = createClient();

      // Check if any super admin or admin exists
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .in('role', ['super_admin', 'admin'])
        .limit(1);

      if (error) throw error;

      // If no admin exists at all, redirect to setup
      if (!data || data.length === 0) {
        router.push('/admin/setup');
        return;
      }
    } catch (err) {
      console.error('Error checking setup:', err);
    } finally {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    checkSuperAdminSetup();
  }, [checkSuperAdminSetup]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const supabase = createClient();

      // Sign in with Supabase Auth
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      // Check if user has admin or super_admin role
      const userRole = data.user?.user_metadata?.role;

      if (userRole !== 'admin' && userRole !== 'super_admin') {
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin credentials required.');
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-primary to-primary/80 p-12 lg:flex lg:w-1/2">
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
          <h1 className="text-4xl font-bold text-white">Admin Portal</h1>
          <p className="text-xl text-white/90">
            Manage your NGO operations, track donations, coordinate volunteers,
            and make a bigger impact.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex-1 rounded-lg bg-white/20 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Animals Rescued</div>
            </div>
            <div className="flex-1 rounded-lg bg-white/20 p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-sm text-white/80">Active Volunteers</div>
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
                <div className="text-sm text-gray-600">Admin Portal</div>
              </div>
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Admin Login
                  </h2>
                  <p className="text-sm text-gray-600">
                    Access your admin dashboard
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
                  placeholder="admin@sarwafoundation.org"
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
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary py-6 text-lg hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Sign In as Admin
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-600">
                Are you a volunteer?{' '}
                <Link
                  href="/volunteer/login"
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
