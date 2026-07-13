'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { FooterContent, FooterLink } from '@/types/cms';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function FooterCMSPage() {
  const [footer, setFooter] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const supabase = createClient();
      let { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .single();

      // If no record exists, create a default one
      if (error && error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabase
          .from('footer_content')
          .insert({
            copyright_text: '© 2024 SARWA Foundation. All rights reserved.',
            footer_links: [
              { title: 'Privacy Policy', url: '/privacy' },
              { title: 'Terms of Service', url: '/terms' },
            ],
            social_links: {
              facebook: '',
              instagram: '',
              twitter: '',
              youtube: '',
            },
          })
          .select()
          .single();

        if (insertError) throw insertError;
        data = newData;
      } else if (error) {
        throw error;
      }

      setFooter(data);
    } catch (err) {
      console.error('Error fetching footer:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load footer content';
      setError(errorMessage);
    } finally{
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!footer) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('footer_content')
        .update({
          copyright_text: footer.copyright_text,
          footer_links: footer.footer_links,
          social_links: footer.social_links,
        })
        .eq('id', footer.id);

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

  const addLink = () => {
    if (!footer) return;
    setFooter({
      ...footer,
      footer_links: [...footer.footer_links, { title: '', url: '' }],
    });
  };

  const updateLink = (index: number, field: keyof FooterLink, value: string) => {
    if (!footer) return;
    const newLinks = [...footer.footer_links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooter({ ...footer, footer_links: newLinks });
  };

  const removeLink = (index: number) => {
    if (!footer) return;
    setFooter({
      ...footer,
      footer_links: footer.footer_links.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading footer content...</p>
        </div>
      </div>
    );
  }

  if (!footer) {
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
          <h1 className="text-3xl font-bold text-gray-900">Footer Content</h1>
          <p className="mt-2 text-gray-600">
            Manage footer copyright, links, and social media
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

      {/* Copyright */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Copyright Text
        </h2>
        <div>
          <Label htmlFor="copyright">Copyright Notice *</Label>
          <Input
            id="copyright"
            value={footer.copyright_text}
            onChange={(e) =>
              setFooter({ ...footer, copyright_text: e.target.value })
            }
            placeholder="© 2024 SARWA Foundation. All rights reserved."
            className="mt-2"
          />
        </div>
      </div>

      {/* Footer Links */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Footer Links</h2>
          <Button onClick={addLink} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>

        <div className="space-y-4">
          {footer.footer_links.map((link, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Link {index + 1}
                </span>
                <Button
                  onClick={() => removeLink(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={link.title}
                    onChange={(e) =>
                      updateLink(index, 'title', e.target.value)
                    }
                    placeholder="Privacy Policy"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>URL *</Label>
                  <Input
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    placeholder="/privacy"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          ))}

          {footer.footer_links.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              No links added yet. Click "Add Link" to get started.
            </p>
          )}
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
              value={footer.social_links.facebook || ''}
              onChange={(e) =>
                setFooter({
                  ...footer,
                  social_links: {
                    ...footer.social_links,
                    facebook: e.target.value,
                  },
                })
              }
              placeholder="https://facebook.com/..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input
              id="instagram"
              value={footer.social_links.instagram || ''}
              onChange={(e) =>
                setFooter({
                  ...footer,
                  social_links: {
                    ...footer.social_links,
                    instagram: e.target.value,
                  },
                })
              }
              placeholder="https://instagram.com/..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              value={footer.social_links.twitter || ''}
              onChange={(e) =>
                setFooter({
                  ...footer,
                  social_links: {
                    ...footer.social_links,
                    twitter: e.target.value,
                  },
                })
              }
              placeholder="https://twitter.com/..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input
              id="youtube"
              value={footer.social_links.youtube || ''}
              onChange={(e) =>
                setFooter({
                  ...footer,
                  social_links: {
                    ...footer.social_links,
                    youtube: e.target.value,
                  },
                })
              }
              placeholder="https://youtube.com/..."
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
