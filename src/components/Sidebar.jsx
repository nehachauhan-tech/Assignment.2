import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".9"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".9"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".9"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".9"/>
    </svg>
  )},
  { id: 'portfolio', label: 'Portfolio', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M3 17l4-4 4 2 4-6 4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )},
  { id: 'markets', label: 'Markets', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 12h18M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )},
  { id: 'watchlist', label: 'Watchlist', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'transactions', label: 'Transactions', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M8 7h13M8 12h13M8 17h13M3 7h.01M3 12h.01M3 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'onboarding', label: 'Onboarding', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )},
];

export default function Sidebar({ activeTab, onTabChange }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#6366f1"/>
              <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!collapsed && <span className="sidebar__logo-text">FinBowl</span>}
        </div>
        <button className="sidebar__collapse-btn" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`sidebar__nav-item ${activeTab === item.id ? 'sidebar__nav-item--active' : ''}`}
                onClick={() => onTabChange(item.id)}
                title={collapsed ? item.label : undefined}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
                {activeTab === item.id && !collapsed && <span className="sidebar__nav-dot" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        {bottomItems.map(item => (
          <button key={item.id} className="sidebar__nav-item" title={collapsed ? item.label : undefined}>
            <span className="sidebar__nav-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
          </button>
        ))}
        <div className={`sidebar__user ${collapsed ? 'sidebar__user--collapsed' : ''}`}>
          <div className="sidebar__avatar">NC</div>
          {!collapsed && (
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Neha Chauhan</span>
              <span className="sidebar__user-role">Investor</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
