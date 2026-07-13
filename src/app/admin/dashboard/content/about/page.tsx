'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { AboutContent, Value } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { RichTextEditor } from '@/components/cms/RichTextEditor';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AboutCMSPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const supabase = createClient();
      let { data, error } = await supabase
        .from('about_content')
        .select('*')
        .single();

      // If no record exists, create a default one
      if (error && error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabase
          .from('about_content')
          .insert({
            about_text: 'SARWA Foundation is dedicated to the welfare and protection of animals.',
            mission: 'To rescue, rehabilitate, and rehome animals in need.',
            vision: 'A world where every animal is treated with dignity and respect.',
            values: [
              { title: 'Compassion', description: 'We treat every animal with kindness' },
              { title: 'Integrity', description: 'We operate with transparency' },
            ],
          })
          .select()
          .single();

        if (insertError) throw insertError;
        data = newData;
      } else if (error) {
        throw error;
      }

      setAbout(data);
    } catch (err) {
      console.error('Error fetching about:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load about content';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!about) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('about_content')
        .update({
          about_text: about.about_text,
          mission: about.mission,
          vision: about.vision,
          values: about.values,
          about_image_url: about.about_image_url,
          mission_image_url: about.mission_image_url,
          vision_image_url: about.vision_image_url,
        })
        .eq('id', about.id);

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

  const addValue = () => {
    if (!about) return;
    setAbout({
      ...about,
      values: [...about.values, { title: '', description: '' }],
    });
  };

  const updateValue = (index: number, field: keyof Value, value: string) => {
    if (!about) return;
    const newValues = [...about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setAbout({ ...about, values: newValues });
  };

  const removeValue = (index: number) => {
    if (!about) return;
    setAbout({
      ...about,
      values: about.values.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading about content...</p>
        </div>
      </div>
    );
  }


  if (!about) {
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
          <h1 className="text-3xl font-bold text-gray-900">About Content</h1>
          <p className="mt-2 text-gray-600">
            Manage your about page content, mission, vision, and values
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

      {/* About Section */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          About Us
        </h2>
        <div className="space-y-6">
          <RichTextEditor
            label="About Text *"
            value={about.about_text}
            onChange={(value) => setAbout({ ...about, about_text: value })}
            rows={6}
          />
          <ImageUpload
            label="About Image"
            value={about.about_image_url || ''}
            onChange={(url) => setAbout({ ...about, about_image_url: url })}
            folder="about"
          />
        </div>
      </div>

      {/* Mission */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Mission</h2>
        <div className="space-y-6">
          <RichTextEditor
            label="Mission Statement *"
            value={about.mission}
            onChange={(value) => setAbout({ ...about, mission: value })}
            rows={4}
          />
          <ImageUpload
            label="Mission Image"
            value={about.mission_image_url || ''}
            onChange={(url) => setAbout({ ...about, mission_image_url: url })}
            folder="about"
          />
        </div>
      </div>

      {/* Vision */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Vision</h2>
        <div className="space-y-6">
          <RichTextEditor
            label="Vision Statement *"
            value={about.vision}
            onChange={(value) => setAbout({ ...about, vision: value })}
            rows={4}
          />
          <ImageUpload
            label="Vision Image"
            value={about.vision_image_url || ''}
            onChange={(url) => setAbout({ ...about, vision_image_url: url })}
            folder="about"
          />
        </div>
      </div>

      {/* Values */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Our Values</h2>
          <Button onClick={addValue} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Value
          </Button>
        </div>

        <div className="space-y-4">
          {about.values.map((value, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Value {index + 1}
                </span>
                <Button
                  onClick={() => removeValue(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={value.title}
                    onChange={(e) =>
                      updateValue(index, 'title', e.target.value)
                    }
                    placeholder="e.g., Compassion"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Description *</Label>
                  <textarea
                    value={value.description}
                    onChange={(e) =>
                      updateValue(index, 'description', e.target.value)
                    }
                    placeholder="Describe this value..."
                    rows={2}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          ))}

          {about.values.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              No values added yet. Click "Add Value" to get started.
            </p>
          )}
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
