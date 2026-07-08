export const portfolioSummary = {
  totalValue: 284750.42,
  dayChange: 3210.88,
  dayChangePct: 1.14,
  totalReturn: 42380.12,
  totalReturnPct: 17.48,
};

export const allocationData = [
  { label: 'Equities', value: 58, color: '#6366f1' },
  { label: 'Fixed Income', value: 22, color: '#22d3ee' },
  { label: 'Commodities', value: 10, color: '#f59e0b' },
  { label: 'Cash', value: 10, color: '#10b981' },
];

export const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 45, price: 192.53, change: 1.82, changePct: 0.95, value: 8663.85, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 378.85, change: 4.21, changePct: 1.12, value: 11365.50, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 18, price: 174.12, change: -1.34, changePct: -0.76, value: 3134.16, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 22, price: 198.44, change: 2.88, changePct: 1.47, value: 4365.68, sector: 'Consumer Disc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 60, price: 248.50, change: -5.30, changePct: -2.09, value: 14910.00, sector: 'Automotive' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 25, price: 875.40, change: 18.65, changePct: 2.18, value: 21885.00, sector: 'Technology' },
  { symbol: 'JPM', name: 'JPMorgan Chase', shares: 40, price: 202.15, change: 0.72, changePct: 0.36, value: 8086.00, sector: 'Financials' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 35, price: 158.70, change: -0.55, changePct: -0.35, value: 5554.50, sector: 'Healthcare' },
];

export const marketMovers = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.40, changePct: 2.18 },
  { symbol: 'META', name: 'Meta Platforms', price: 512.28, changePct: 1.94 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 198.44, changePct: 1.47 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, changePct: -2.09 },
  { symbol: 'BABA', name: 'Alibaba Group', price: 78.34, changePct: -1.82 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 648.92, changePct: -1.55 },
];

export const performanceHistory = [
  { month: 'Jan', value: 241200 },
  { month: 'Feb', value: 238500 },
  { month: 'Mar', value: 252800 },
  { month: 'Apr', value: 248100 },
  { month: 'May', value: 261400 },
  { month: 'Jun', value: 258900 },
  { month: 'Jul', value: 271300 },
  { month: 'Aug', value: 266800 },
  { month: 'Sep', value: 279500 },
  { month: 'Oct', value: 274200 },
  { month: 'Nov', value: 282100 },
  { month: 'Dec', value: 284750 },
];

export const recentTransactions = [
  { id: 1, type: 'BUY', symbol: 'NVDA', shares: 5, price: 856.75, date: '2024-12-10', total: 4283.75 },
  { id: 2, type: 'SELL', symbol: 'GOOGL', shares: 3, price: 175.46, date: '2024-12-08', total: 526.38 },
  { id: 3, type: 'BUY', symbol: 'JPM', shares: 10, price: 199.80, date: '2024-12-05', total: 1998.00 },
  { id: 4, type: 'DIVIDEND', symbol: 'JNJ', shares: null, price: null, date: '2024-12-01', total: 112.70 },
  { id: 5, type: 'BUY', symbol: 'AAPL', shares: 8, price: 188.20, date: '2024-11-28', total: 1505.60 },
];
