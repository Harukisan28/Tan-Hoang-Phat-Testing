interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
}: ResponsiveImageProps) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      sizes={sizes}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
