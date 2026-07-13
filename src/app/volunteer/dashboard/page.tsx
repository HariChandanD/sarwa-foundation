'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Heart,
  LogOut,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VolunteerProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  occupation: string;
  skills_experience: string;
  areas_of_interest: string;
  availability: string;
  why_volunteer: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  status: string;
  created_at: string;
}

export default function VolunteerDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<VolunteerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/volunteer/login');
        return;
      }

      // Fetch volunteer application/profile
      const { data: application, error: appError } = await supabase
        .from('volunteer_applications')
        .select('*')
        .eq('email', user.email)
        .single();

      if (appError) throw appError;
      setProfile(application);
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/volunteer/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-green-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Error Loading Profile</h2>
          <p className="mb-4 text-gray-600">{error || 'Profile not found'}</p>
          <Button onClick={() => router.push('/volunteer/login')}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Volunteer Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile.full_name}!</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <User className="h-4 w-4 text-gray-400" />
                      {profile.full_name}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {profile.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {profile.phone}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {profile.city}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      {profile.occupation}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Availability</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {profile.availability}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-gray-900">{profile.address}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Areas of Interest</label>
                  <p className="mt-1 text-gray-900">{profile.areas_of_interest}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Skills / Experience</label>
                  <p className="mt-1 text-gray-900">{profile.skills_experience}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Why I Volunteer</label>
                  <p className="mt-1 text-gray-900">{profile.why_volunteer}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Emergency Contact Name
                    </label>
                    <p className="mt-1 text-gray-900">{profile.emergency_contact_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Emergency Contact Phone
                    </label>
                    <p className="mt-1 text-gray-900">{profile.emergency_contact_phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Status</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    profile.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : profile.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Member since {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Quick Links */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Calendar className="mr-2 h-4 w-4" />
                  My Activities
                  <span className="ml-auto text-xs text-gray-500">(Coming Soon)</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Heart className="mr-2 h-4 w-4" />
                  Assigned Tasks
                  <span className="ml-auto text-xs text-gray-500">(Coming Soon)</span>
                </Button>
              </div>
            </div>

            {/* Help Card */}
            <div className="rounded-xl bg-green-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Need Help?</h3>
              <p className="mb-4 text-sm text-gray-600">
                Contact our volunteer coordinator for any questions or concerns.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:volunteers@sarwa.org">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Made with Bob