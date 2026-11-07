import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryBar from './components/CategoryBar';
import VideoCard from './components/VideoCard';
import ShortsSection from './components/ShortsSection';
import VideoModal from './components/VideoModal';
import { FeedSkeleton } from './components/Skeleton';
import useDebounce from './hooks/useDebounce';
import { VIDEOS, SHORTS } from './data/mockData';
import './App.css';

const PAGE_SIZE = 12;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => !window.matchMedia('(max-width: 792px)').matches,
  );
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedQuery = useDebounce(query, 300);

  // Reset paging when the active filter changes (render-time reset — no effect needed).
  const filterKey = `${debouncedQuery.trim().toLowerCase()}|${category}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 792px)');
    const sync = (e) => setSidebarOpen(!e.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const filteredVideos = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return VIDEOS.filter((v) => {
      const matchesCategory = category === 'All' || v.category === category;
      const matchesQuery =
        !q || v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [debouncedQuery, category]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + PAGE_SIZE);
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const showShorts = category === 'All' && !debouncedQuery.trim();
  const isEmpty = !loading && filteredVideos.length === 0;

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <div className="app">
      <Header
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        query={query}
        onQueryChange={setQuery}
      />

      <div className="app-body">
        <Sidebar
          open={sidebarOpen}
          collapsed={!sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={`content ${sidebarOpen ? '' : 'content--wide'}`}>
          <CategoryBar selected={category} onSelect={setCategory} />

          {loading ? (
            <FeedSkeleton count={8} />
          ) : isEmpty ? (
            <div className="empty-state" role="status">
              <div className="empty-emoji">🔍</div>
              <h2>No results found</h2>
              <p>Try different keywords or remove the “{category}” filter.</p>
              {(query || category !== 'All') && (
                <button className="pill-btn empty-reset" onClick={resetFilters}>
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <VideoGridTop videos={visibleVideos} showShorts={showShorts} onOpen={setSelectedVideo} />
              {hasMore && (
                <div ref={sentinelRef} className="load-more" role="status" aria-label="Loading more videos">
                  <span className="spinner" />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

function VideoGridTop({ videos, showShorts, onOpen }) {
  if (!showShorts) {
    return (
      <div className="video-grid">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  const firstRow = videos.slice(0, 4);
  const rest = videos.slice(4);

  return (
    <>
      <div className="video-grid">
        {firstRow.map((v) => (
          <VideoCard key={v.id} video={v} onOpen={onOpen} />
        ))}
      </div>
      <ShortsSection shorts={SHORTS} />
      {rest.length > 0 && (
        <div className="video-grid">
          {rest.map((v) => (
            <VideoCard key={v.id} video={v} onOpen={onOpen} />
          ))}
        </div>
      )}
    </>
  );
}
