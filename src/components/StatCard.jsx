function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
}

function fmtCompact(n) {
  if (Math.abs(n) >= 1000) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(n);
  }
  return fmt(n);
}

export function StatCard({ label, value, change, changePct, prefix = '$', isLoading }) {
  if (isLoading) {
    return (
      <div className="stat-card stat-card--skeleton">
        <div className="skeleton skeleton--text-sm" />
        <div className="skeleton skeleton--text-lg" />
        <div className="skeleton skeleton--text-sm" />
      </div>
    );
  }

  const positive = change >= 0;

  return (
    <div className="stat-card">
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{prefix}{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}</span>
      <div className={`stat-card__change ${positive ? 'stat-card__change--up' : 'stat-card__change--down'}`}>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d={positive ? "M12 19V5M5 12l7-7 7 7" : "M12 5v14M5 12l7 7 7-7"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{fmtCompact(Math.abs(change))} ({Math.abs(changePct).toFixed(2)}%)</span>
      </div>
    </div>
  );
}
