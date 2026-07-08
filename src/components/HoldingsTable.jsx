import { useState } from 'react';

const COLS = [
  { key: 'symbol', label: 'Symbol' },
  { key: 'price', label: 'Price' },
  { key: 'changePct', label: 'Change' },
  { key: 'shares', label: 'Shares' },
  { key: 'value', label: 'Market Value' },
  { key: 'sector', label: 'Sector' },
];

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

export default function HoldingsTable({ holdings, isLoading }) {
  const [sort, setSort] = useState({ key: 'value', dir: 'desc' });
  const [search, setSearch] = useState('');

  function toggleSort(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' });
  }

  if (isLoading) {
    return (
      <div className="holdings-card">
        <div className="holdings-card__header">
          <div className="skeleton skeleton--text-md" style={{ width: 120 }} />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton skeleton--row" />
        ))}
      </div>
    );
  }

  const data = holdings ?? [];
  const filtered = data.filter(h =>
    h.symbol.toLowerCase().includes(search.toLowerCase()) ||
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const v = a[sort.key] > b[sort.key] ? 1 : -1;
    return sort.dir === 'asc' ? v : -v;
  });

  const SortIcon = ({ colKey }) => {
    if (sort.key !== colKey) return <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M8 15l4 4 4-4M8 9l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".3"/></svg>;
    return (
      <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
        <path d={sort.dir === 'asc' ? "M8 15l4-10 4 10" : "M8 9l4 10 4-10"} stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className="holdings-card">
      <div className="holdings-card__header">
        <h3 className="chart-card__title">Holdings</h3>
        <div className="holdings-card__search">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Filter holdings…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Filter holdings"
          />
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="holdings-empty">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#475569" strokeWidth="1.5"/>
            <path d="M8 12h8M12 8v8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p>No holdings found</p>
        </div>
      ) : (
        <div className="holdings-table-wrap">
          <table className="holdings-table">
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} onClick={() => toggleSort(c.key)} className="holdings-table__th">
                    {c.label} <SortIcon colKey={c.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(h => {
                const pos = h.changePct >= 0;
                return (
                  <tr key={h.symbol} className="holdings-table__row">
                    <td>
                      <div className="holdings-symbol">
                        <span className="holdings-symbol__badge">{h.symbol.slice(0, 2)}</span>
                        <div>
                          <span className="holdings-symbol__ticker">{h.symbol}</span>
                          <span className="holdings-symbol__name">{h.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="holdings-table__num">{fmt(h.price)}</td>
                    <td>
                      <span className={`holdings-change ${pos ? 'holdings-change--up' : 'holdings-change--down'}`}>
                        {pos ? '+' : ''}{h.changePct.toFixed(2)}%
                      </span>
                    </td>
                    <td className="holdings-table__num">{h.shares}</td>
                    <td className="holdings-table__num holdings-table__num--bold">{fmt(h.value)}</td>
                    <td><span className="holdings-sector">{h.sector}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
