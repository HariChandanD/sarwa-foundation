'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { HomepageHero } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function HomepageCMSPage() {
  const [hero, setHero] = useState<HomepageHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const supabase = createClient();
      let { data, error } = await supabase
        .from('homepage_hero')
        .select('*')
        .eq('is_active', true)
        .single();

      // If no record exists, create a default one
      if (error && error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabase
          .from('homepage_hero')
          .insert({
            title: 'Every Life Deserves Love and Care',
            subtitle: 'Join us in our mission to rescue, rehabilitate, and rehome animals in need.',
            primary_cta_text: 'Donate Now',
            primary_cta_link: '/donate',
            secondary_cta_text: 'Learn More',
            secondary_cta_link: '/about',
            is_active: true,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        data = newData;
      } else if (error) {
        throw error;
      }

      setHero(data);
    } catch (err) {
      console.error('Error fetching hero:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load homepage content';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hero) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('homepage_hero')
        .update({
          title: hero.title,
          subtitle: hero.subtitle,
          primary_cta_text: hero.primary_cta_text,
          primary_cta_link: hero.primary_cta_link,
          secondary_cta_text: hero.secondary_cta_text,
          secondary_cta_link: hero.secondary_cta_link,
          hero_image_url: hero.hero_image_url,
        })
        .eq('id', hero.id);

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
          <p className="text-gray-600">Loading homepage content...</p>
        </div>
      </div>
    );
  }

  if (!hero) {
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
            Homepage Content
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your homepage hero section and call-to-action buttons
          </p>
        </div>
        <SaveButton
          onClick={handleSave}
          loading={saving}
          success={success}
        />
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
            Changes saved successfully! The homepage will update immediately.
          </p>
        </div>
      )}

      {/* Hero Section */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Hero Section
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Hero Title *</Label>
            <Input
              id="title"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Every Life Deserves Love and Care"
              className="mt-2"
            />
          </div>

          {/* Subtitle */}
          <div>
            <Label htmlFor="subtitle">Hero Subtitle *</Label>
            <textarea
              id="subtitle"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              placeholder="Join us in our mission to rescue, rehabilitate, and rehome animals in need."
              rows={3}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Hero Image */}
          <ImageUpload
            label="Hero Background Image"
            value={hero.hero_image_url || ''}
            onChange={(url) => setHero({ ...hero, hero_image_url: url })}
            folder="homepage"
            aspectRatio="aspect-[21/9]"
          />

          {/* Primary CTA */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="primary_cta_text">Primary Button Text *</Label>
              <Input
                id="primary_cta_text"
                value={hero.primary_cta_text}
                onChange={(e) =>
                  setHero({ ...hero, primary_cta_text: e.target.value })
                }
                placeholder="Donate Now"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="primary_cta_link">Primary Button Link *</Label>
              <Input
                id="primary_cta_link"
                value={hero.primary_cta_link}
                onChange={(e) =>
                  setHero({ ...hero, primary_cta_link: e.target.value })
                }
                placeholder="/donate"
                className="mt-2"
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="secondary_cta_text">
                Secondary Button Text (Optional)
              </Label>
              <Input
                id="secondary_cta_text"
                value={hero.secondary_cta_text || ''}
                onChange={(e) =>
                  setHero({ ...hero, secondary_cta_text: e.target.value })
                }
                placeholder="Learn More"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="secondary_cta_link">
                Secondary Button Link (Optional)
              </Label>
              <Input
                id="secondary_cta_link"
                value={hero.secondary_cta_link || ''}
                onChange={(e) =>
                  setHero({ ...hero, secondary_cta_link: e.target.value })
                }
                placeholder="/about"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <SaveButton
          onClick={handleSave}
          loading={saving}
          success={success}
        />
      </div>
    </div>
  );
}

// Made with Bob
