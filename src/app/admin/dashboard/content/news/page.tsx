'use client';

import { Construction } from 'lucide-react';

export default function NewsCMSPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <Construction className="mx-auto mb-4 h-16 w-16 text-primary" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          News & Blog Management
        </h2>
        <p className="text-gray-600">
          Full CRUD interface for news articles coming soon
        </p>
      </div>
    </div>
  );
}

// Made with Bob
