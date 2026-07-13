'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Program } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  X,
  GripVertical,
} from 'lucide-react';

export default function ProgramsCMSPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Program>>({
    title: '',
    description: '',
    long_description: '',
    image_url: '',
    icon: 'Heart',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();

      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('programs')
          .update({
            title: formData.title,
            description: formData.description,
            long_description: formData.long_description,
            image_url: formData.image_url,
            icon: formData.icon,
            is_active: formData.is_active,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        // Create new
        const maxOrder = programs.length > 0
          ? Math.max(...programs.map(p => p.display_order))
          : -1;

        const { error } = await supabase.from('programs').insert({
          title: formData.title,
          description: formData.description,
          long_description: formData.long_description,
          image_url: formData.image_url,
          icon: formData.icon,
          display_order: maxOrder + 1,
          is_active: formData.is_active,
        });

        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      resetForm();
      fetchPrograms();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save program';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (program: Program) => {
    setEditingId(program.id);
    setFormData({
      title: program.title,
      description: program.description,
      long_description: program.long_description,
      image_url: program.image_url,
      icon: program.icon,
      is_active: program.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('programs').delete().eq('id', id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchPrograms();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete program';
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      long_description: '',
      image_url: '',
      icon: 'Heart',
      display_order: 0,
      is_active: true,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
        <p className="mt-2 text-gray-600">
          Add, edit, and manage your organization's programs
        </p>
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
          <p className="text-sm text-green-800">Changes saved successfully!</p>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? 'Edit Program' : 'Add New Program'}
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
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Animal Rescue"
            />
          </div>

          <div>
            <Label htmlFor="description">Short Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              placeholder="Brief description for cards..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="long_description">Full Description</Label>
            <textarea
              id="long_description"
              value={formData.long_description || ''}
              onChange={(e) =>
                setFormData({ ...formData, long_description: e.target.value })
              }
              rows={4}
              placeholder="Detailed description..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <ImageUpload
            label="Program Image"
            value={formData.image_url || ''}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            folder="programs"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Active (visible on website)
            </Label>
          </div>

          <SaveButton onClick={handleSave} loading={saving} success={success}>
            {editingId ? 'Update Program' : 'Add Program'}
          </SaveButton>
        </div>
      </div>

      {/* Programs List */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          All Programs ({programs.length})
        </h2>

        {programs.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No programs yet. Add your first program above.
          </p>
        ) : (
          <div className="space-y-3">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
              >
                <GripVertical className="h-5 w-5 text-gray-400" />
                
                {program.image_url && (
                  <img
                    src={program.image_url}
                    alt={program.title}
                    className="h-16 w-16 rounded object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">
                      {program.title}
                    </h3>
                    {!program.is_active && (
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{program.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(program)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(program.id)}
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
