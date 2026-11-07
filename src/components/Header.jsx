import Icon from './Icon';

export default function Header({ onToggleSidebar, query, onQueryChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" aria-label="Toggle sidebar" onClick={onToggleSidebar}>
          <Icon name="menu" />
        </button>
        <a className="logo" href="#" aria-label="YouTube home">
          <span className="logo-mark">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path fill="#ff0000" d="M23 7.2a3 3 0 00-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 001 7.2 31 31 0 00.5 12 31 31 0 001 16.8a3 3 0 002.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 002.1-2.1A31 31 0 0023.5 12 31 31 0 0023 7.2z" />
              <path fill="#fff" d="M9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
            </svg>
          </span>
          <span className="logo-text">Premium</span>
        </a>
      </div>

      <form className="header-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="search-box">
          <input
            type="text"
            aria-label="Search"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => onQueryChange('')}
            >
              <Icon name="close" size={20} />
            </button>
          )}
          <button type="submit" className="search-submit" aria-label="Search">
            <Icon name="search" size={22} />
          </button>
        </div>
        <button type="button" className="icon-btn mic-btn" aria-label="Search with voice">
          <Icon name="mic" size={22} />
        </button>
      </form>

      <div className="header-right">
        <button className="pill-btn" aria-label="Create">
          <Icon name="create" size={22} />
          <span>Create</span>
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Icon name="bell" size={22} />
        </button>
        <button className="avatar-btn" aria-label="Account">
          <span className="avatar-initial">A</span>
        </button>
      </div>
    </header>
  );
}
