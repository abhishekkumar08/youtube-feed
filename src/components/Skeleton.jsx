export function VideoCardSkeleton() {
  return (
    <div className="video-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-thumb" />
      <div className="video-meta">
        <div className="skeleton skeleton-avatar" />
        <div className="video-text" style={{ flex: 1 }}>
          <div className="skeleton skeleton-line" style={{ width: '90%' }} />
          <div className="skeleton skeleton-line" style={{ width: '60%' }} />
          <div className="skeleton skeleton-line" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 8 }) {
  return (
    <div className="video-grid" role="status" aria-label="Loading videos">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
