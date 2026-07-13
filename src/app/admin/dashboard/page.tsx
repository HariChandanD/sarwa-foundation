'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import {
  Users,
  DollarSign,
  Calendar,
  AlertCircle,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  FileText,
} from 'lucide-react';

interface DashboardStats {
  totalVisitors: number;
  totalDonations: number;
  monthlyDonations: number;
  volunteers: number;
  events: number;
  pendingReports: number;
  pendingVolunteers: number;
  approvedVolunteers: number;
  rejectedVolunteers: number;
  totalNewsPosts: number;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  created_at: string;
  user_email: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 0,
    totalDonations: 0,
    monthlyDonations: 0,
    volunteers: 0,
    events: 0,
    pendingReports: 0,
    pendingVolunteers: 0,
    approvedVolunteers: 0,
    rejectedVolunteers: 0,
    totalNewsPosts: 0,
  });
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();

        // Fetch donations
        const { data: donations, error: donationsError } = await supabase
          .from('donations')
          .select('amount, created_at');

        if (donationsError) throw donationsError;

        // Calculate total donations
        const totalDonations =
          donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

        // Calculate monthly donations (current month)
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyDonations =
          donations
            ?.filter((d) => new Date(d.created_at) >= firstDayOfMonth)
            .reduce((sum, d) => sum + Number(d.amount), 0) || 0;

        // Fetch volunteer applications by status
        const { count: pendingCount } = await supabase
          .from('volunteer_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: approvedCount } = await supabase
          .from('volunteer_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        const { count: rejectedCount } = await supabase
          .from('volunteer_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'rejected');

        // Fetch contact messages count (as pending reports)
        const { count: messagesCount, error: messagesError } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true });

        if (messagesError) throw messagesError;

        // Fetch recent activity logs
        const { data: activities } = await supabase
          .from('activity_logs')
          .select('id, action, description, created_at, user_email')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentActivities(activities || []);

        setStats({
          totalVisitors: 12450, // Placeholder - would need analytics integration
          totalDonations: Math.round(totalDonations),
          monthlyDonations: Math.round(monthlyDonations),
          volunteers:
            (approvedCount || 0) + (pendingCount || 0) + (rejectedCount || 0),
          events: 8, // Placeholder - would need events table
          pendingReports: messagesCount || 0,
          pendingVolunteers: pendingCount || 0,
          approvedVolunteers: approvedCount || 0,
          rejectedVolunteers: rejectedCount || 0,
          totalNewsPosts: 0, // Placeholder - would need news/blog table
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Visitors',
      value: stats.totalVisitors.toLocaleString(),
      icon: Eye,
      color: 'bg-blue-500',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Donations',
      value: `₹${stats.totalDonations.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Monthly Donations',
      value: `₹${stats.monthlyDonations.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      trend: '+15.3%',
      trendUp: true,
    },
    {
      title: 'Volunteers',
      value: stats.volunteers.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500',
      trend: '+5.7%',
      trendUp: true,
    },
    {
      title: 'Events',
      value: stats.events.toLocaleString(),
      icon: Calendar,
      color: 'bg-orange-500',
      trend: '2 upcoming',
      trendUp: true,
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports.toLocaleString(),
      icon: AlertCircle,
      color: 'bg-red-500',
      trend: 'Needs attention',
      trendUp: false,
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingVolunteers.toLocaleString(),
      icon: Clock,
      color: 'bg-yellow-500',
      trend: 'Review required',
      trendUp: false,
    },
    {
      title: 'News Posts',
      value: stats.totalNewsPosts.toLocaleString(),
      icon: FileText,
      color: 'bg-indigo-500',
      trend: 'Published',
      trendUp: true,
    },
  ];

  const getActivityColor = (action: string) => {
    if (action.includes('approved') || action.includes('donation'))
      return 'bg-green-500';
    if (action.includes('rejected') || action.includes('disabled'))
      return 'bg-red-500';
    if (action.includes('pending') || action.includes('invited'))
      return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your NGO today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <span
                      className={`text-sm font-medium ${
                        card.trendUp ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {card.trend}
                    </span>
                  </div>
                </div>
                <div className={`rounded-xl ${card.color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          {recentActivities.length > 0 ? (
            <ul className="space-y-3">
              {recentActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start gap-3 text-sm"
                >
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${getActivityColor(activity.action)}`}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No recent activity</p>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">This Month</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600">Donation Goal</span>
                <span className="font-medium text-gray-900">
                  {Math.round((stats.monthlyDonations / 100000) * 100)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${Math.min((stats.monthlyDonations / 100000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                ₹{stats.monthlyDonations.toLocaleString()} of ₹1,00,000
              </p>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600">Volunteer Target</span>
                <span className="font-medium text-gray-900">
                  {Math.round((stats.volunteers / 250) * 100)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-purple-500"
                  style={{
                    width: `${Math.min((stats.volunteers / 250) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {stats.volunteers} of 250 volunteers
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <ul className="space-y-3">
            <li className="rounded-lg border border-gray-200 p-3">
              <p className="font-medium text-gray-900">Adoption Drive</p>
              <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
            </li>
            <li className="rounded-lg border border-gray-200 p-3">
              <p className="font-medium text-gray-900">Volunteer Training</p>
              <p className="text-sm text-gray-500">Dec 20, 2:00 PM</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
