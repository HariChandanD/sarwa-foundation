import { FileText, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaceholderContentPageProps {
  title: string;
  description: string;
  sections: {
    title: string;
    fields: {
      label: string;
      type: 'text' | 'textarea' | 'image';
      placeholder?: string;
      value?: string;
    }[];
  }[];
}

export function PlaceholderContentPage({
  title,
  description,
  sections,
}: PlaceholderContentPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" disabled>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {section.title}
              </h2>
            </div>
            <div className="space-y-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                      rows={4}
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                      disabled
                    />
                  ) : field.type === 'image' ? (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          {field.placeholder || 'Upload image'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                      disabled
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

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
                content will be implemented in the next phase. For now, content is
                managed directly in the codebase.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Current Features:</strong> View-only mode
              </p>
              <p className="text-sm text-gray-600">
                <strong>Coming Soon:</strong> Edit text, upload images, manage
                sections, preview changes, publish/draft system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob