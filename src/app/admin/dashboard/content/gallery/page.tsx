'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { GalleryMedia } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Trash2, Edit, X, Video } from 'lucide-react';

export default function GalleryCMSPage() {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryMedia>>({
    title: '',
    description: '',
    media_url: '',
    media_type: 'image',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gallery_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.media_url) {
      setError('Media is required');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();

      if (editingId) {
        const { error } = await supabase
          .from('gallery_media')
          .update({
            title: formData.title,
            description: formData.description,
            media_url: formData.media_url,
            media_type: formData.media_type,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('gallery_media').insert({
          title: formData.title,
          description: formData.description,
          media_url: formData.media_url,
          media_type: formData.media_type,
          display_order: items.length,
        });

        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      resetForm();
      fetchItems();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save item';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: GalleryMedia) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      media_url: item.media_url,
      media_type: item.media_type,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('gallery_media').delete().eq('id', id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchItems();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete item';
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      media_url: '',
      media_type: 'image',
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
        <p className="mt-2 text-gray-600">Manage photos and videos</p>
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
            {editingId ? 'Edit Item' : 'Add New Item'}
          </h2>
          {editingId && (
            <Button onClick={resetForm} variant="ghost" size="sm">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Happy rescue moment"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Optional description..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="media_type">Media Type</Label>
            <select
              id="media_type"
              value={formData.media_type}
              onChange={(e) =>
                setFormData({ ...formData, media_type: e.target.value as 'image' | 'video' })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {formData.media_type === 'image' ? (
            <ImageUpload
              label="Image *"
              value={formData.media_url || ''}
              onChange={(url) => setFormData({ ...formData, media_url: url })}
              folder="gallery"
            />
          ) : (
            <div>
              <Label htmlFor="video_url">Video URL *</Label>
              <Input
                id="video_url"
                value={formData.media_url || ''}
                onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          )}

          <SaveButton onClick={handleSave} loading={saving} success={success}>
            {editingId ? 'Update Item' : 'Add Item'}
          </SaveButton>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          All Items ({items.length})
        </h2>

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No items yet. Add your first photo or video above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border border-gray-200"
              >
                {item.media_type === 'image' ? (
                  <img
                    src={item.media_url}
                    alt={item.title || 'Gallery image'}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title || 'Untitled'}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleEdit(item)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
