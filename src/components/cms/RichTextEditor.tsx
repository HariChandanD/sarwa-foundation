'use client';

import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = 'Enter content...',
  rows = 10,
}: RichTextEditorProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <p className="text-xs text-gray-500">
        Supports plain text and line breaks
      </p>
    </div>
  );
}

// Made with Bob
