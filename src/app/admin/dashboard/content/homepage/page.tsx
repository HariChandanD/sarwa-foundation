'use client';

import { FileText, Image as ImageIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomepageContentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homepage Content</h1>
          <p className="mt-2 text-gray-600">
            Manage hero section, featured content, and homepage elements
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Main Heading
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                placeholder="Every Animal Deserves Love and Care"
                disabled
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Subheading
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                rows={3}
                placeholder="Join us in our mission to rescue, rehabilitate, and rehome animals in need..."
                disabled
              />
            </div>
          </div>
        </div>

        {/* Featured Images */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <ImageIcon className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Featured Images
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
              >
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Image {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Impact Statistics
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Animals Rescued', value: '500+' },
              { label: 'Successful Adoptions', value: '300+' },
              { label: 'Active Volunteers', value: '200+' },
              { label: 'Years of Service', value: '10+' },
            ].map((stat, i) => (
              <div key={i}>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {stat.label}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  defaultValue={stat.value}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Notice */}
        <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-yellow-100 p-2">
              <FileText className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Content Management Coming Soon
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                This is a placeholder page. Full CRUD functionality for managing
                homepage content will be implemented in the next phase. For now,
                content is managed directly in the codebase.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Current Features:</strong> View-only mode
              </p>
              <p className="text-sm text-gray-600">
                <strong>Coming Soon:</strong> Edit text, upload images, manage
                sections, preview changes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob