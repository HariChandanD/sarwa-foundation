'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Event } from '@/types/cms';
import { ImageUpload } from '@/components/cms/ImageUpload';
import { SaveButton } from '@/components/cms/SaveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Trash2, Edit, X, Calendar } from 'lucide-react';

export default function EventsCMSPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image_url: '',
    status: 'upcoming',
    is_registration_open: false,
    current_participants: 0,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.event_date) {
      setError('Title, description, and event date are required');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();

      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update({
            title: formData.title,
            description: formData.description,
            event_date: formData.event_date,
            end_date: formData.end_date,
            location: formData.location,
            image_url: formData.image_url,
            registration_link: formData.registration_link,
            is_registration_open: formData.is_registration_open,
            max_participants: formData.max_participants,
            status: formData.status,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('events').insert({
          title: formData.title,
          description: formData.description,
          event_date: formData.event_date,
          end_date: formData.end_date,
          location: formData.location,
          image_url: formData.image_url,
          registration_link: formData.registration_link,
          is_registration_open: formData.is_registration_open,
          max_participants: formData.max_participants,
          current_participants: 0,
          status: formData.status || 'upcoming',
        });

        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      resetForm();
      fetchEvents();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save event';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      end_date: event.end_date,
      location: event.location,
      image_url: event.image_url,
      registration_link: event.registration_link,
      is_registration_open: event.is_registration_open,
      max_participants: event.max_participants,
      status: event.status,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchEvents();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete event';
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      image_url: '',
      status: 'upcoming',
      is_registration_open: false,
      current_participants: 0,
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      past: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || styles.upcoming;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="mt-2 text-gray-600">Manage upcoming and past events</p>
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
            {editingId ? 'Edit Event' : 'Add New Event'}
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
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Annual Adoption Drive"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Event details..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="event_date">Event Date *</Label>
              <Input
                id="event_date"
                type="datetime-local"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date || ''}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City Park, Main Street"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'upcoming' | 'ongoing' | 'past' | 'cancelled',
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="registration_link">Registration Link</Label>
              <Input
                id="registration_link"
                value={formData.registration_link || ''}
                onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                placeholder="https://forms.google.com/..."
              />
            </div>
            <div>
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                value={formData.max_participants || ''}
                onChange={(e) =>
                  setFormData({ ...formData, max_participants: parseInt(e.target.value) || undefined })
                }
                placeholder="100"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_registration_open"
              checked={formData.is_registration_open}
              onChange={(e) =>
                setFormData({ ...formData, is_registration_open: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_registration_open" className="cursor-pointer">
              Registration Open
            </Label>
          </div>

          <ImageUpload
            label="Event Image"
            value={formData.image_url || ''}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            folder="events"
          />

          <SaveButton onClick={handleSave} loading={saving} success={success}>
            {editingId ? 'Update Event' : 'Add Event'}
          </SaveButton>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          All Events ({events.length})
        </h2>

        {events.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No events yet. Add your first event above.
          </p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
              >
                {event.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="h-16 w-16 rounded object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadge(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.event_date).toLocaleDateString()}
                    </span>
                    {event.location && <span>{event.location}</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(event)} variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(event.id)}
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
