'use client';

import { cn } from '@/lib/utils';

interface LogoPlaceholderProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LogoPlaceholder({
  name,
  className,
  size = 'md',
}: LogoPlaceholderProps) {
  const sizes = {
    sm: 'w-24 h-8 text-xs',
    md: 'w-32 h-12 text-sm',
    lg: 'w-40 h-14 text-base',
  };

  return (
    <div
      className={cn(
        'rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center',
        'transition-all duration-300 hover:from-gray-50 hover:to-gray-100',
        sizes[size],
        className
      )}
    >
      <span className="text-gray-500 font-medium whitespace-nowrap px-2">
        {name}
      </span>
    </div>
  );
}
