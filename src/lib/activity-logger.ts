import { createClient } from '@/lib/supabase-client';

export interface ActivityLogData {
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity(data: ActivityLogData): Promise<void> {
  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.warn('No user found for activity logging');
      return;
    }

    // Get user profile for role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      console.warn('No profile found for activity logging');
      return;
    }

    // Insert activity log
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      user_email: user.email || 'unknown',
      user_role: profile.role,
      action: data.action,
      description: data.description,
      metadata: data.metadata || null,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw - activity logging should not break the main flow
  }
}

// Predefined action types for consistency
export const ActivityActions = {
  // Admin actions
  ADMIN_INVITED: 'admin_invited',
  ADMIN_APPROVED: 'admin_approved',
  ADMIN_REJECTED: 'admin_rejected',
  ADMIN_DISABLED: 'admin_disabled',
  ADMIN_ENABLED: 'admin_enabled',
  ADMIN_REMOVED: 'admin_removed',
  ADMIN_PASSWORD_RESET: 'admin_password_reset',

  // Volunteer actions
  VOLUNTEER_APPLIED: 'volunteer_applied',
  VOLUNTEER_APPROVED: 'volunteer_approved',
  VOLUNTEER_REJECTED: 'volunteer_rejected',
  VOLUNTEER_INFO_REQUESTED: 'volunteer_info_requested',

  // Settings actions
  SETTINGS_UPDATED: 'settings_updated',

  // Donation actions
  DONATION_RECEIVED: 'donation_received',

  // Auth actions
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',

  // Content actions
  CONTENT_UPDATED: 'content_updated',
} as const;

// Made with Bob
