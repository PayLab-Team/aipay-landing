'use client';

import { cn } from '@/lib/utils';

interface AngledDividerProps {
  position?: 'top' | 'bottom';
  angle?: number;
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export function AngledDivider({
  position = 'top',
  angle = -3,
  fillColor,
  className,
  flip = false,
}: AngledDividerProps) {
  const actualAngle = flip ? -angle : angle;

  return (
    <div
      className={cn(
        'absolute left-0 right-0 h-20 overflow-hidden pointer-events-none',
        position === 'top' ? '-top-10' : '-bottom-10',
        className
      )}
      style={{
        transform: `skewY(${actualAngle}deg)`,
        transformOrigin: position === 'top' ? 'top left' : 'bottom left',
      }}
    >
      <div
        className={cn(
          'absolute inset-0',
          !fillColor && 'bg-white'
        )}
        style={fillColor ? { backgroundColor: fillColor } : undefined}
      />
    </div>
  );
}
