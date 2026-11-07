import { useRef } from 'react';
import { CATEGORIES } from '../data/mockData';

export default function CategoryBar({ selected, onSelect }) {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <div className="category-bar">
      <button className="cat-arrow cat-arrow--left" aria-label="Scroll categories left" onClick={() => scrollBy(-1)}>
        ‹
      </button>
      <div className="category-scroller" ref={scrollerRef} role="tablist" aria-label="Category filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selected === cat}
            className={`chip ${selected === cat ? 'chip--active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button className="cat-arrow cat-arrow--right" aria-label="Scroll categories right" onClick={() => scrollBy(1)}>
        ›
      </button>
    </div>
  );
}
