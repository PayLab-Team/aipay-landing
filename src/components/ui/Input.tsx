'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-gray-500">{hint}</p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
