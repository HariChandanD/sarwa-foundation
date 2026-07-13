'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase-client';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  AlertCircle,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface VolunteerApplication {
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
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

type TabType = 'pending' | 'approved' | 'rejected';

export default function VolunteersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<VolunteerApplication | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .eq('status', activeTab)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleViewDetails = (application: VolunteerApplication) => {
    setSelectedApplication(application);
    setAdminNotes(application.admin_notes || '');
    setShowDetails(true);
    setError(null);
    setSuccess(null);
  };

  const handleApprove = async () => {
    if (!selectedApplication) return;

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      // Get current admin user
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        throw new Error('You must be logged in to approve applications');
      }

      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-12) + 'A1!';

      // Create auth user
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: selectedApplication.email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: selectedApplication.full_name,
          },
        });

      if (authError) throw authError;

      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          email: selectedApplication.email,
          full_name: selectedApplication.full_name,
          role: 'volunteer',
        });

      if (profileError) throw profileError;

      // Update application status
      const { error: updateError } = await supabase
        .from('volunteer_applications')
        .update({
          status: 'approved',
          user_id: authData.user.id,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: currentUser.id,
        })
        .eq('id', selectedApplication.id);

      if (updateError) throw updateError;

      setSuccess(
        `Application approved! Temporary password: ${tempPassword}\nPlease share this with the volunteer securely.`
      );

      // Refresh applications
      fetchApplications();

      // Close details after 5 seconds
      setTimeout(() => {
        setShowDetails(false);
        setSelectedApplication(null);
      }, 5000);
    } catch (err: any) {
      console.error('Error approving application:', err);
      setError(err.message || 'Failed to approve application');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedApplication) return;

    if (!confirm('Are you sure you want to reject this application?')) return;

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('volunteer_applications')
        .update({
          status: 'rejected',
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
        })
        .eq('id', selectedApplication.id);

      if (error) throw error;

      setSuccess('Application rejected successfully.');
      fetchApplications();

      setTimeout(() => {
        setShowDetails(false);
        setSelectedApplication(null);
      }, 2000);
    } catch (err: any) {
      console.error('Error rejecting application:', err);
      setError(err.message || 'Failed to reject application');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestMoreInfo = async () => {
    if (!selectedApplication) return;

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('volunteer_applications')
        .update({
          status: 'more_info_requested',
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
        })
        .eq('id', selectedApplication.id);

      if (error) throw error;

      setSuccess('More information requested. The applicant will be notified.');
      fetchApplications();

      setTimeout(() => {
        setShowDetails(false);
        setSelectedApplication(null);
      }, 2000);
    } catch (err: any) {
      console.error('Error requesting more info:', err);
      setError(err.message || 'Failed to request more information');
    } finally {
      setActionLoading(false);
    }
  };

  const tabs = [
    { id: 'pending' as TabType, label: 'Pending Applications', icon: Clock },
    {
      id: 'approved' as TabType,
      label: 'Approved Volunteers',
      icon: CheckCircle,
    },
    {
      id: 'rejected' as TabType,
      label: 'Rejected Applications',
      icon: XCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Volunteer Management
        </h1>
        <p className="mt-2 text-gray-600">
          Review and manage volunteer applications
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowDetails(false);
                  setSelectedApplication(null);
                }}
                className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </div>
      ) : applications.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No {activeTab} applications
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending'
                ? 'New applications will appear here'
                : `No ${activeTab} applications found`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {application.full_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Applied{' '}
                        {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {application.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {application.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {application.city}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      {application.occupation}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-gray-400" />
                      {application.areas_of_interest}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {application.availability}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewDetails(application)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>
                <p className="text-sm text-gray-500">
                  Submitted{' '}
                  {new Date(selectedApplication.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setSelectedApplication(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <p className="whitespace-pre-line text-sm text-green-800">
                  {success}
                </p>
              </div>
            )}

            {/* Application Details */}
            <div className="mb-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.full_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>
                  <p className="text-gray-900">{selectedApplication.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.occupation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.availability}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="text-gray-900">{selectedApplication.address}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Areas of Interest
                </label>
                <p className="text-gray-900">
                  {selectedApplication.areas_of_interest}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Skills / Experience
                </label>
                <p className="text-gray-900">
                  {selectedApplication.skills_experience}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Why Volunteer?
                </label>
                <p className="text-gray-900">
                  {selectedApplication.why_volunteer}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.emergency_contact_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Emergency Contact Phone
                  </label>
                  <p className="text-gray-900">
                    {selectedApplication.emergency_contact_phone}
                  </p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Admin Notes
                </label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  rows={3}
                  disabled={actionLoading}
                />
              </div>
            </div>

            {/* Actions */}
            {selectedApplication.status === 'pending' && (
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {actionLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Approve & Create Account
                </Button>
                <Button
                  onClick={handleRequestMoreInfo}
                  disabled={actionLoading}
                  variant="outline"
                  className="flex-1"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request More Info
                </Button>
                <Button
                  onClick={handleReject}
                  disabled={actionLoading}
                  variant="outline"
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
