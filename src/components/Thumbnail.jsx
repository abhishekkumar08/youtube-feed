import { useState } from 'react';

export default function Thumbnail({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`thumb-fallback ${className || ''}`} role="img" aria-label={alt}>
        <span>{alt?.slice(0, 1) || '▶'}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
