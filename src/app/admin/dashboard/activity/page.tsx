'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Activity, User, Calendar, Filter, AlertCircle } from 'lucide-react';

interface ActivityLog {
  id: string;
  user_email: string;
  user_role: string;
  action: string;
  description: string;
  created_at: string;
  metadata: Record<string, unknown> | null;
}

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const fetchActivities = useCallback(async () => {
    try {
      const supabase = createClient();

      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Apply filter if not 'all'
      if (filter !== 'all') {
        query = query.eq('user_role', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setActivities(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const getActionColor = (action: string) => {
    if (action.includes('approved') || action.includes('donation'))
      return 'bg-green-100 text-green-700';
    if (
      action.includes('rejected') ||
      action.includes('disabled') ||
      action.includes('removed')
    )
      return 'bg-red-100 text-red-700';
    if (action.includes('pending') || action.includes('invited'))
      return 'bg-yellow-100 text-yellow-700';
    if (action.includes('updated') || action.includes('enabled'))
      return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === 'super_admin') return 'bg-purple-100 text-purple-700';
    if (role === 'admin') return 'bg-blue-100 text-blue-700';
    if (role === 'volunteer') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading activity log...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="mt-2 text-gray-600">
            Track all actions and changes in the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Users</option>
            <option value="super_admin">Super Admins</option>
            <option value="admin">Admins</option>
            <option value="volunteer">Volunteers</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Activity List */}
      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-500">Last 100 activities</p>
            </div>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600">No activity logs found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-6 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-gray-100 p-2">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {activity.user_email}
                      </span>
                      <span
                        className={`rounded px-2 py-1 text-xs ${getRoleBadgeColor(activity.user_role)}`}
                      >
                        {activity.user_role.replace('_', ' ')}
                      </span>
                      <span
                        className={`rounded px-2 py-1 text-xs ${getActionColor(activity.action)}`}
                      >
                        {activity.action.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-gray-700">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatTimeAgo(activity.created_at)}</span>
                      </div>
                      <span>
                        {new Date(activity.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm text-blue-800">
            <p className="mb-1 font-medium">Activity Log Information</p>
            <p>
              This log shows the last 100 activities in the system. Activities
              are automatically recorded when users perform actions like
              approving volunteers, updating settings, or managing admins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
