'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getPlaceholderImage } from '@/lib/images';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    // Fallback to placeholder image if the original fails to load
    setImageSrc(getPlaceholderImage(width, height, alt));
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageProps = {
    src: imageSrc,
    alt,
    onError: handleError,
    onLoad: handleLoad,
    className: `transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    } ${className}`,
    priority,
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    ...(fill ? { fill: true } : { width, height }),
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image {...imageProps} alt={alt} />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
}