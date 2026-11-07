import { useEffect } from 'react';
import Icon from './Icon';
import Thumbnail from './Thumbnail';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!video) return null;

  const meta = video.live
    ? video.views
    : [`${video.views} views`, video.age].filter(Boolean).join(' · ');

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close icon-btn" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="modal-player">
          <Thumbnail className="modal-thumb" src={video.thumbnail.replace(/\/\d+\/\d+$/, '/960/540')} alt={video.title} />
          <span className="modal-play">
            <svg viewBox="0 0 24 24" width="42" height="42" aria-hidden="true">
              <path fill="#fff" d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{video.title}</h2>
          <div className="modal-meta">
            <Thumbnail className="channel-avatar" src={video.avatar} alt={video.channel} />
            <div>
              <p className="modal-channel">{video.channel}</p>
              <p className="modal-stats">{meta}</p>
            </div>
          </div>
          <p className="modal-desc">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
