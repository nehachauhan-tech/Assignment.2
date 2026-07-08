export default function Header({ lastUpdated, onRefresh, isLoading }) {
  const formatted = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Dashboard</h1>
        {formatted && (
          <span className="header__updated">Last updated {formatted}</span>
        )}
      </div>
      <div className="header__right">
        <div className="header__search">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input className="header__search-input" type="text" placeholder="Search symbol…" aria-label="Search" />
        </div>
        <button
          className={`header__refresh ${isLoading ? 'header__refresh--spinning' : ''}`}
          onClick={() => onRefresh()}
          disabled={isLoading}
          aria-label="Refresh data"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="header__notif" aria-label="Notifications">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="header__notif-badge">3</span>
        </button>
      </div>
    </header>
  );
}
