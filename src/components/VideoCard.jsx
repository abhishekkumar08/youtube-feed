import Thumbnail from './Thumbnail';

export default function VideoCard({ video, onOpen }) {
  const meta = video.live
    ? video.views
    : [`${video.views} views`, video.age].filter(Boolean).join(' · ');

  return (
    <button className="video-card" onClick={() => onOpen(video)}>
      <div className="thumb-wrap">
        <Thumbnail className="thumb" src={video.thumbnail} alt={video.title} />
        {video.live ? (
          <span className="badge badge--live">LIVE</span>
        ) : (
          video.duration && <span className="badge badge--time">{video.duration}</span>
        )}
      </div>
      <div className="video-meta">
        <Thumbnail className="channel-avatar" src={video.avatar} alt={video.channel} />
        <div className="video-text">
          <h3 className="video-title" title={video.title}>{video.title}</h3>
          <p className="video-channel">{video.channel}</p>
          <p className="video-stats">{meta}</p>
        </div>
      </div>
    </button>
  );
}
