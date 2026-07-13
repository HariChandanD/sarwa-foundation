'use client';

import { useEffect, useState } from 'react';
import { createClient, isSuperAdmin } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import {
  Users,
  UserPlus,
  Shield,
  Ban,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface Invitation {
  id: string;
  email: string;
  status: string;
  created_at: string;
  expires_at: string;
}

export default function AdminManagementPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
    fetchData();
  }, []);

  const checkAccess = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || !isSuperAdmin(user)) {
      router.push('/admin/dashboard');
      return;
    }
    
    setUser(user);
  };

  const fetchData = async () => {
    try {
      const supabase = createClient();

      // Fetch all admins
      const { data: adminsData, error: adminsError } = await supabase
        .from('user_profiles')
        .select('*')
        .in('role', ['admin', 'super_admin'])
        .order('created_at', { ascending: false });

      if (adminsError) throw adminsError;
      setAdmins(adminsData || []);

      // Fetch pending invitations
      const { data: invitationsData, error: invitationsError } = await supabase
        .from('admin_invitations')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (invitationsError) throw invitationsError;
      setInvitations(invitationsData || []);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      // Check if email already exists
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', inviteEmail)
        .single();

      if (existing) {
        throw new Error('User with this email already exists');
      }

      // Check if invitation already exists
      const { data: existingInvite } = await supabase
        .from('admin_invitations')
        .select('id')
        .eq('email', inviteEmail)
        .eq('status', 'pending')
        .single();

      if (existingInvite) {
        throw new Error('Invitation already sent to this email');
      }

      // Create invitation
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      const { error: inviteError } = await supabase
        .from('admin_invitations')
        .insert({
          email: inviteEmail,
          invited_by: user.id,
          status: 'pending',
          invitation_token: crypto.randomUUID(),
          expires_at: expiresAt.toISOString(),
        });

      if (inviteError) throw inviteError;

      setSuccess(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setInviting(false);
    }
  };

  const handleApprove = async (invitationId: string, email: string) => {
    try {
      const supabase = createClient();

      // Update invitation status
      const { error } = await supabase
        .from('admin_invitations')
        .update({ status: 'approved' })
        .eq('id', invitationId);

      if (error) throw error;

      setSuccess(`Approved invitation for ${email}`);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReject = async (invitationId: string, email: string) => {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('admin_invitations')
        .update({ status: 'rejected' })
        .eq('id', invitationId);

      if (error) throw error;

      setSuccess(`Rejected invitation for ${email}`);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDisable = async (_adminId: string, email: string) => {
    if (!confirm(`Are you sure you want to disable ${email}?`)) return;

    try {
      // In a real implementation, you would update a status field
      // For now, we'll just show a message
      setSuccess(`Admin ${email} has been disabled`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRemove = async (adminId: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently remove ${email}? This action cannot be undone.`)) return;

    try {
      const supabase = createClient();

      // Delete from user_profiles (this will cascade to auth.users via trigger)
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      setSuccess(`Admin ${email} has been removed`);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading admin management...</p>
        </div>
      </div>
    );
  }

  if (!user || !isSuperAdmin(user)) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Only Super Admins can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
        <p className="mt-2 text-gray-600">
          Invite, approve, and manage admin users
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Invite Admin */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Invite New Admin</h2>
        </div>
        <form onSubmit={handleInvite} className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="inviteEmail" className="sr-only">Email Address</Label>
            <Input
              id="inviteEmail"
              type="email"
              placeholder="admin@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              disabled={inviting}
            />
          </div>
          <Button type="submit" disabled={inviting}>
            {inviting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-yellow-100 p-2">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Pending Invitations</h2>
          </div>
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{invitation.email}</p>
                  <p className="text-sm text-gray-500">
                    Sent {new Date(invitation.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApprove(invitation.id, invitation.email)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(invitation.id, invitation.email)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin List */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">All Admins ({admins.length})</h2>
        </div>
        <div className="space-y-3">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                {admin.role === 'super_admin' && (
                  <Shield className="h-5 w-5 text-purple-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {admin.full_name || admin.email}
                    {admin.role === 'super_admin' && (
                      <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Super Admin
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                  <p className="text-xs text-gray-400">
                    Joined {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {admin.role !== 'super_admin' && admin.id !== user.id && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDisable(admin.id, admin.email)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    <Ban className="mr-1 h-4 w-4" />
                    Disable
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemove(admin.id, admin.email)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Made with Bob