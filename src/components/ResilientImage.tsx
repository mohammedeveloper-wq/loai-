import { useState } from 'react';
import { HeartPulse } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

export function ResilientImage({ src, alt, className = '', fallbackTitle }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-stone-100 text-slate-600 p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <HeartPulse className="w-8 h-8 text-[#991B1B] mb-3 stroke-[1.5]" />
        <p className="font-display text-base font-medium text-slate-800 max-w-xs">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
