const TYPE_STYLES = {
  BUY: { label: 'Buy', cls: 'txn-badge--buy' },
  SELL: { label: 'Sell', cls: 'txn-badge--sell' },
  DIVIDEND: { label: 'Div.', cls: 'txn-badge--div' },
};

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function RecentTransactions({ transactions, isLoading }) {
  if (isLoading) {
    return (
      <div className="chart-card">
        <div className="skeleton skeleton--text-md" style={{ width: 170 }} />
        {[...Array(5)].map((_, i) => <div key={i} className="skeleton skeleton--row-sm" />)}
      </div>
    );
  }

  const data = transactions ?? [];

  if (!data.length) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Recent Transactions</h3>
        <div className="holdings-empty"><p>No transactions yet</p></div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Recent Transactions</h3>
      <ul className="txn-list">
        {data.map(t => {
          const style = TYPE_STYLES[t.type] ?? { label: t.type, cls: 'txn-badge--div' };
          const positive = t.type !== 'SELL';
          return (
            <li key={t.id} className="txn-item">
              <span className={`txn-badge ${style.cls}`}>{style.label}</span>
              <div className="txn-item__info">
                <span className="txn-item__symbol">{t.symbol}</span>
                {t.shares && <span className="txn-item__detail">{t.shares} shares @ {fmt(t.price)}</span>}
                {!t.shares && <span className="txn-item__detail">Dividend received</span>}
              </div>
              <div className="txn-item__right">
                <span className={`txn-item__total ${positive ? 'txn-item__total--pos' : 'txn-item__total--neg'}`}>
                  {positive ? '+' : '-'}{fmt(t.total)}
                </span>
                <span className="txn-item__date">{t.date}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
