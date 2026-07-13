'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { RescueStory } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Trash2, Edit, X, Star } from 'lucide-react';

export default function StoriesCMSPage() {
  const [stories, setStories] = useState<RescueStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<RescueStory>>({
    title: '',
    animal_name: '',
    story: '',
    before_image_url: '',
    after_image_url: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('rescue_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (err) {
      console.error('Error fetching stories:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load stories';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.animal_name || !formData.story) {
      setError('Title, animal name, and story are required');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();

      if (editingId) {
        const { error } = await supabase
          .from('rescue_stories')
          .update({
            title: formData.title,
            animal_name: formData.animal_name,
            story: formData.story,
            before_image_url: formData.before_image_url,
            after_image_url: formData.after_image_url,
            is_featured: formData.is_featured,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('rescue_stories').insert({
          title: formData.title,
          animal_name: formData.animal_name,
          story: formData.story,
          before_image_url: formData.before_image_url,
          after_image_url: formData.after_image_url,
          is_featured: formData.is_featured,
          display_order: stories.length,
        });

        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      resetForm();
      fetchStories();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save story';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (story: RescueStory) => {
    setEditingId(story.id);
    setFormData({
      title: story.title,
      animal_name: story.animal_name,
      story: story.story,
      before_image_url: story.before_image_url,
      after_image_url: story.after_image_url,
      is_featured: story.is_featured,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('rescue_stories').delete().eq('id', id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchStories();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete story';
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      animal_name: '',
      story: '',
      before_image_url: '',
      after_image_url: '',
      is_featured: false,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rescue Stories</h1>
        <p className="mt-2 text-gray-600">Share inspiring rescue and recovery stories</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <p className="text-sm text-green-800">Changes saved successfully!</p>
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? 'Edit Story' : 'Add New Story'}
          </h2>
          {editingId && (
            <Button onClick={resetForm} variant="ghost" size="sm">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Story Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="From Streets to Safety"
              />
            </div>
            <div>
              <Label htmlFor="animal_name">Animal Name *</Label>
              <Input
                id="animal_name"
                value={formData.animal_name}
                onChange={(e) => setFormData({ ...formData, animal_name: e.target.value })}
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="story">Story *</Label>
            <textarea
              id="story"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              rows={6}
              placeholder="Tell the rescue story..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ImageUpload
              label="Before Image"
              value={formData.before_image_url || ''}
              onChange={(url) => setFormData({ ...formData, before_image_url: url })}
              folder="stories"
            />
            <ImageUpload
              label="After Image"
              value={formData.after_image_url || ''}
              onChange={(url) => setFormData({ ...formData, after_image_url: url })}
              folder="stories"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_featured" className="cursor-pointer">
              Featured Story (show on homepage)
            </Label>
          </div>

          <SaveButton onClick={handleSave} loading={saving} success={success}>
            {editingId ? 'Update Story' : 'Add Story'}
          </SaveButton>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          All Stories ({stories.length})
        </h2>

        {stories.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No stories yet. Add your first rescue story above.
          </p>
        ) : (
          <div className="space-y-3">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
              >
                {story.before_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={story.before_image_url}
                    alt={story.animal_name}
                    className="h-16 w-16 rounded object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{story.title}</h3>
                    {story.is_featured && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{story.animal_name}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(story)} variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(story.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
