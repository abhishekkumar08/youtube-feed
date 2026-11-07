import Thumbnail from './Thumbnail';

export default function ShortsSection({ shorts }) {
  return (
    <section className="shorts-section" aria-label="Shorts">
      <div className="shorts-header">
        <span className="shorts-logo">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path fill="#ff0000" d="M10 3l8 4.5v9L10 21l-2-1V4l2-1z" />
            <path fill="#fff" d="M10 8v8l6-4-6-4z" />
          </svg>
        </span>
        <h2>Shorts</h2>
      </div>
      <div className="shorts-row">
        {shorts.map((s) => (
          <a className="short-card" key={s.id} href="#">
            <div className="short-thumb-wrap">
              <Thumbnail className="short-thumb" src={s.thumbnail} alt={s.title} />
              {s.isNew && <span className="badge badge--new">New</span>}
            </div>
            <div className="short-info">
              <h3 className="short-title" title={s.title}>{s.title}</h3>
              <p className="short-stats">{s.views} views</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
