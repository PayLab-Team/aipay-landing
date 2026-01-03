'use client';

import { cn } from '@/lib/utils';

interface Logo {
  name: string;
  src?: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

export function LogoMarquee({
  logos,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: LogoMarqueeProps) {
  const speedClasses = {
    slow: 'animate-marquee',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  };

  const animationClass = direction === 'right'
    ? 'animate-marquee-reverse'
    : speedClasses[speed];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        className={cn(
          'flex gap-12 w-max',
          animationClass,
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 grayscale hover:grayscale-0 transition-all duration-300"
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
