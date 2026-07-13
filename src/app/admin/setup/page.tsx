'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, User, Loader2, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function SuperAdminSetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [superAdminExists, setSuperAdminExists] = useState(false);

  useEffect(() => {
    checkSuperAdminExists();
  }, []);

  const checkSuperAdminExists = async () => {
    try {
      const supabase = createClient();
      
      // Check if any super admin exists
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('role', 'super_admin')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setSuperAdminExists(true);
        // Redirect to login if super admin already exists
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Error checking super admin:', err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Double-check that no super admin exists
      const { data: existingAdmin } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('role', 'super_admin')
        .limit(1);

      if (existingAdmin && existingAdmin.length > 0) {
        setError('Super Admin already exists. Please login instead.');
        setTimeout(() => router.push('/admin/login'), 2000);
        return;
      }

      // Create the super admin user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'super_admin',
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Success - redirect to dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to create Super Admin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Checking system status...</p>
        </div>
      </div>
    );
  }

  if (superAdminExists) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete</h2>
          <p className="text-gray-600 mb-4">Super Admin already exists. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 p-12 flex-col justify-between">
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
              <div className="text-sm opacity-90">Society for Animal Welfare</div>
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">
            Super Admin Setup
          </h1>
          <p className="text-xl text-white/90">
            Create the first Super Admin account to manage your NGO platform. This is a one-time setup process.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Super Admin Powers</h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Invite and manage Admin users</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Full access to all platform features</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Approve or reject admin invitations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Disable or remove admin accounts</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-white/60 text-sm">
          © 2024 Sarwa Society for Animal Welfare. All rights reserved.
        </div>
      </div>

      {/* Right Side - Setup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
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
                <div className="text-sm text-gray-600">Super Admin Setup</div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Super Admin</h2>
                  <p className="text-sm text-gray-600">One-time setup - Choose credentials carefully</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                  className="mt-2"
                  autoComplete="name"
                />
              </div>

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
                    placeholder="Minimum 8 characters"
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                    minLength={8}
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

              <div>
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  required
                  disabled={isLoading}
                  className="mt-2"
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This is a one-time setup. After creating the Super Admin account, 
                  this page will be permanently disabled. Future admins must be invited by the Super Admin.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Super Admin...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Create Super Admin Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to website
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure setup powered by Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob