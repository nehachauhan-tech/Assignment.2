export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <div className="error-banner__icon">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="1.8"/>
          <path d="M12 8v4M12 16h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="error-banner__body">
        <p className="error-banner__title">Failed to load data</p>
        <p className="error-banner__msg">{message}</p>
      </div>
      <button className="error-banner__retry" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
