import Icon from './Icon';
import { SIDEBAR_SECTIONS } from '../data/mockData';

export default function Sidebar({ open, collapsed, onClose }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} role="presentation" />}
      <nav
        className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${open ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        {SIDEBAR_SECTIONS.map((section, si) => (
          <div className="sidebar-section" key={section.title || si}>
            {section.title && !collapsed && <h3 className="sidebar-title">{section.title}</h3>}
            <ul>
              {section.items.map((item) => (
                <li key={item.label}>
                  <a href="#" className={`sidebar-link ${item.label === 'Home' ? 'active' : ''}`}>
                    <Icon name={item.icon} size={22} />
                    <span className="sidebar-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
