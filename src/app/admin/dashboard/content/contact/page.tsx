'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { ContactInfo } from '@/types/cms';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactCMSPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const supabase = createClient();
      let { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      // If no record exists, create a default one
      if (error && error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabase
          .from('contact_info')
          .insert({
            address: '123 Animal Welfare Street, City, State 12345',
            phone: '+91 1234567890',
            email: 'contact@sarwafoundation.org',
            whatsapp_number: '+911234567890',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        data = newData;
      } else if (error) {
        throw error;
      }

      setContact(data);
    } catch (err) {
      console.error('Error fetching contact:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load contact information';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!contact) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_info')
        .update({
          address: contact.address,
          phone: contact.phone,
          email: contact.email,
          google_maps_url: contact.google_maps_url,
          facebook_url: contact.facebook_url,
          instagram_url: contact.instagram_url,
          twitter_url: contact.twitter_url,
          whatsapp_number: contact.whatsapp_number,
        })
        .eq('id', contact.id);

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
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Initializing content...</p>
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
            Contact Information
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your contact details and social media links
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

      {/* Basic Contact Info */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Address *</Label>
            <textarea
              id="address"
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
              rows={3}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                placeholder="+91 1234567890"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                placeholder="contact@sarwa.org"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              value={contact.whatsapp_number || ''}
              onChange={(e) =>
                setContact({ ...contact, whatsapp_number: e.target.value })
              }
              placeholder="+911234567890"
              className="mt-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Include country code without spaces
            </p>
          </div>
          <div>
            <Label htmlFor="maps">Google Maps URL</Label>
            <Input
              id="maps"
              value={contact.google_maps_url || ''}
              onChange={(e) =>
                setContact({ ...contact, google_maps_url: e.target.value })
              }
              placeholder="https://maps.google.com/..."
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Social Media Links
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input
              id="facebook"
              value={contact.facebook_url || ''}
              onChange={(e) =>
                setContact({ ...contact, facebook_url: e.target.value })
              }
              placeholder="https://facebook.com/..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input
              id="instagram"
              value={contact.instagram_url || ''}
              onChange={(e) =>
                setContact({ ...contact, instagram_url: e.target.value })
              }
              placeholder="https://instagram.com/..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              value={contact.twitter_url || ''}
              onChange={(e) =>
                setContact({ ...contact, twitter_url: e.target.value })
              }
              placeholder="https://twitter.com/..."
              className="mt-2"
            />
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
