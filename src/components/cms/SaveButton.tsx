'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Save, CheckCircle } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function SaveButton({
  onClick,
  loading = false,
  success = false,
  disabled = false,
  children = 'Save Changes',
}: SaveButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="min-w-[140px]"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : success ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
}

// Made with Bob
