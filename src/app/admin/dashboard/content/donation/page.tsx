'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { DonationSettings } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function DonationCMSPage() {
  const [donation, setDonation] = useState<DonationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDonation();
  }, []);

  const fetchDonation = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('donation_settings')
        .select('*')
        .single();

      if (error) throw error;
      setDonation(data);
    } catch (err) {
      console.error('Error fetching donation settings:', err);
      setError('Failed to load donation settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!donation) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('donation_settings')
        .update({
          qr_code_image_url: donation.qr_code_image_url,
          upi_id: donation.upi_id,
          bank_name: donation.bank_name,
          account_number: donation.account_number,
          ifsc_code: donation.ifsc_code,
          account_holder_name: donation.account_holder_name,
          razorpay_key_id: donation.razorpay_key_id,
          razorpay_key_secret: donation.razorpay_key_secret,
          donation_message: donation.donation_message,
        })
        .eq('id', donation.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save changes';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading donation settings...</p>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            No Content Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Donation Settings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage payment methods and donation information
          </p>
        </div>
        <SaveButton onClick={handleSave} loading={saving} success={success} />
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <p className="text-sm text-green-800">
            Changes saved successfully!
          </p>
        </div>
      )}

      {/* Donation Message */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Donation Message
        </h2>
        <div>
          <Label htmlFor="message">Message to Donors</Label>
          <textarea
            id="message"
            value={donation.donation_message || ''}
            onChange={(e) =>
              setDonation({ ...donation, donation_message: e.target.value })
            }
            rows={4}
            placeholder="Thank you for your generous donation..."
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* UPI Payment */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          UPI Payment
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="upi">UPI ID</Label>
            <Input
              id="upi"
              value={donation.upi_id || ''}
              onChange={(e) =>
                setDonation({ ...donation, upi_id: e.target.value })
              }
              placeholder="yourname@upi"
              className="mt-2"
            />
          </div>
          <ImageUpload
            label="QR Code Image"
            value={donation.qr_code_image_url || ''}
            onChange={(url) =>
              setDonation({ ...donation, qr_code_image_url: url })
            }
            folder="donation"
            aspectRatio="aspect-square"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Bank Transfer Details
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bank_name">Bank Name</Label>
            <Input
              id="bank_name"
              value={donation.bank_name || ''}
              onChange={(e) =>
                setDonation({ ...donation, bank_name: e.target.value })
              }
              placeholder="State Bank of India"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="account_holder">Account Holder Name</Label>
            <Input
              id="account_holder"
              value={donation.account_holder_name || ''}
              onChange={(e) =>
                setDonation({ ...donation, account_holder_name: e.target.value })
              }
              placeholder="SARWA Foundation"
              className="mt-2"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                id="account_number"
                value={donation.account_number || ''}
                onChange={(e) =>
                  setDonation({ ...donation, account_number: e.target.value })
                }
                placeholder="1234567890"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                value={donation.ifsc_code || ''}
                onChange={(e) =>
                  setDonation({ ...donation, ifsc_code: e.target.value })
                }
                placeholder="SBIN0001234"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Integration */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Razorpay Integration
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="razorpay_key">Razorpay Key ID</Label>
            <Input
              id="razorpay_key"
              value={donation.razorpay_key_id || ''}
              onChange={(e) =>
                setDonation({ ...donation, razorpay_key_id: e.target.value })
              }
              placeholder="rzp_live_..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="razorpay_secret">Razorpay Key Secret</Label>
            <Input
              id="razorpay_secret"
              type="password"
              value={donation.razorpay_key_secret || ''}
              onChange={(e) =>
                setDonation({ ...donation, razorpay_key_secret: e.target.value })
              }
              placeholder="••••••••"
              className="mt-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Keep this secret secure. Never share it publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <SaveButton onClick={handleSave} loading={saving} success={success} />
      </div>
    </div>
  );
}

// Made with Bob
