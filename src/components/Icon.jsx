const PATHS = {
  menu: 'M3 6h18M3 12h18M3 18h18',
  search: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
  mic: 'M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM19 10v2a7 7 0 01-14 0v-2M12 19v3',
  create: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  home: 'M3 11l9-8 9 8M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10',
  shorts: 'M10 3l8 4.5v9L10 21l-2-1V4l2-1zM10 8v8l6-4-6-4z',
  subs: 'M4 6h16M6 10h12M8 14h8l-4 4-4-4z',
  channel: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1',
  history: 'M12 8v4l3 2M3 12a9 9 0 109-9 9 9 0 00-8 5M3 4v4h4',
  playlist: 'M3 6h13M3 12h13M3 18h9M17 12v7l5-3.5L17 12z',
  watchLater: 'M12 8v4l3 3M12 22a10 10 0 110-20 10 10 0 010 20z',
  liked: 'M7 10v11M2 12h5v9H2zM7 10l4-8a2 2 0 013 2l-1 6h6a2 2 0 012 2l-2 7a2 2 0 01-2 1H7',
  shopping: 'M6 2l-2 5v13a1 1 0 001 1h14a1 1 0 001-1V7l-2-5zM4 7h16M9 11a3 3 0 006 0',
  music: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z',
  movies: 'M4 4h16v16H4zM4 8h16M8 4v16M16 4v16',
  live: 'M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0M6 8a6 6 0 000 8M18 8a6 6 0 010 8M3 5a10 10 0 000 14M21 5a10 10 0 010 14',
  gaming: 'M6 12h4m-2-2v4M15 11h.01M18 13h.01M17 6H7a5 5 0 00-5 5l-1 5a2 2 0 003 2l2-3h8l2 3a2 2 0 003-2l-1-5a5 5 0 00-5-5z',
  news: 'M4 4h13v16H4zM17 8h3v10a2 2 0 01-2 2M7 8h7M7 12h7M7 16h4',
  close: 'M18 6L6 18M6 6l12 12',
};

export default function Icon({ name, size = 24, className }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
