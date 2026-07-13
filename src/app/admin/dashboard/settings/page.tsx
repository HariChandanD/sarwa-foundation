'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import {
  Settings as SettingsIcon,
  Building2,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { logActivity, ActivityActions } from '@/lib/activity-logger';

interface SettingsData {
  id?: string;
  ngo_name: string;
  address: string;
  contact_number: string;
  email: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_holder_name: string;
  upi_id: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    ngo_name: '',
    address: '',
    contact_number: '',
    email: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    account_holder_name: '',
    upi_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setSettings(data);
      }
    } catch (err: any) {
      console.error('Error fetching settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof SettingsData, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('settings')
        .update({
          ngo_name: settings.ngo_name,
          address: settings.address,
          contact_number: settings.contact_number,
          email: settings.email,
          facebook_url: settings.facebook_url,
          twitter_url: settings.twitter_url,
          instagram_url: settings.instagram_url,
          linkedin_url: settings.linkedin_url,
          youtube_url: settings.youtube_url,
          bank_name: settings.bank_name,
          account_number: settings.account_number,
          ifsc_code: settings.ifsc_code,
          account_holder_name: settings.account_holder_name,
          upi_id: settings.upi_id,
        })
        .eq('id', settings.id);

      if (error) throw error;

      // Log activity
      await logActivity({
        action: ActivityActions.SETTINGS_UPDATED,
        description: 'Updated NGO settings',
        metadata: { settingsId: settings.id },
      });

      setSuccess('Settings updated successfully!');
      fetchSettings();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your NGO information and configuration
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="ngo_name">NGO Name *</Label>
              <Input
                id="ngo_name"
                value={settings.ngo_name}
                onChange={(e) => handleChange('ngo_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contact_number">Contact Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="contact_number"
                  type="tel"
                  className="pl-10"
                  value={settings.contact_number}
                  onChange={(e) => handleChange('contact_number', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="address"
                  className="pl-10"
                  rows={3}
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2">
              <SettingsIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Social Media Links</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="facebook_url"
                  type="url"
                  className="pl-10"
                  placeholder="https://facebook.com/your-ngo"
                  value={settings.facebook_url}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="twitter_url"
                  type="url"
                  className="pl-10"
                  placeholder="https://twitter.com/your-ngo"
                  value={settings.twitter_url}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="instagram_url"
                  type="url"
                  className="pl-10"
                  placeholder="https://instagram.com/your-ngo"
                  value={settings.instagram_url}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="linkedin_url"
                  type="url"
                  className="pl-10"
                  placeholder="https://linkedin.com/company/your-ngo"
                  value={settings.linkedin_url}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="youtube_url"
                  type="url"
                  className="pl-10"
                  placeholder="https://youtube.com/@your-ngo"
                  value={settings.youtube_url}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Bank & Payment Details</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input
                id="bank_name"
                value={settings.bank_name}
                onChange={(e) => handleChange('bank_name', e.target.value)}
                placeholder="State Bank of India"
              />
            </div>
            <div>
              <Label htmlFor="account_holder_name">Account Holder Name</Label>
              <Input
                id="account_holder_name"
                value={settings.account_holder_name}
                onChange={(e) => handleChange('account_holder_name', e.target.value)}
                placeholder="SARWA Society"
              />
            </div>
            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                id="account_number"
                value={settings.account_number}
                onChange={(e) => handleChange('account_number', e.target.value)}
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label htmlFor="ifsc_code">IFSC Code</Label>
              <Input
                id="ifsc_code"
                value={settings.ifsc_code}
                onChange={(e) => handleChange('ifsc_code', e.target.value)}
                placeholder="SBIN0001234"
              />
            </div>
            <div>
              <Label htmlFor="upi_id">UPI ID</Label>
              <Input
                id="upi_id"
                value={settings.upi_id}
                onChange={(e) => handleChange('upi_id', e.target.value)}
                placeholder="ngo@upi"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Made with Bob