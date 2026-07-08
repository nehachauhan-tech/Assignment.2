export default function MarketMovers({ movers, isLoading }) {
  if (isLoading) {
    return (
      <div className="chart-card">
        <div className="skeleton skeleton--text-md" style={{ width: 140 }} />
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton skeleton--row-sm" />)}
      </div>
    );
  }

  const data = movers ?? [];
  const gainers = [...data].filter(m => m.changePct > 0).sort((a, b) => b.changePct - a.changePct);
  const losers = [...data].filter(m => m.changePct < 0).sort((a, b) => a.changePct - b.changePct);
  const sorted = [...gainers, ...losers];

  return (
    <div className="chart-card chart-card--movers">
      <h3 className="chart-card__title">Market Movers</h3>
      <ul className="movers-list">
        {sorted.map(m => {
          const pos = m.changePct >= 0;
          return (
            <li key={m.symbol} className="mover-item">
              <div className="mover-item__left">
                <span className="mover-item__symbol">{m.symbol}</span>
                <span className="mover-item__name">{m.name}</span>
              </div>
              <div className="mover-item__right">
                <span className="mover-item__price">${m.price.toFixed(2)}</span>
                <span className={`mover-item__change ${pos ? 'mover-item__change--up' : 'mover-item__change--down'}`}>
                  {pos ? '+' : ''}{m.changePct.toFixed(2)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
