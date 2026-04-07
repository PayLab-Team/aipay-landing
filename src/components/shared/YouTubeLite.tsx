'use client';

import { useState } from 'react';
import Image from 'next/image';

interface YouTubeLiteProps {
  videoId: string;
  title: string;
  className?: string;
}

export function YouTubeLite({ videoId, title, className }: YouTubeLiteProps) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="relative w-full h-full group cursor-pointer bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 896px"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-black/70 group-hover:bg-red-600 transition-colors duration-200 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 translate-x-0.5" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
