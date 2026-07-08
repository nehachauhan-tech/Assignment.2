import { useState, useEffect, useCallback } from 'react';
import {
  portfolioSummary,
  holdings,
  marketMovers,
  performanceHistory,
  recentTransactions,
  allocationData,
} from '../data/mockData';

// Simulates an API call with configurable delay and optional failure
function fakeFetch(data, delay = 1200, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch portfolio data. Please try again.'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

export function usePortfolioData() {
  const [state, setState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    data: null,
    error: null,
    lastUpdated: null,
  });

  const load = useCallback(async (simulateError = false) => {
    setState(s => ({ ...s, status: 'loading', error: null }));
    try {
      const [summary, holdingsData, movers, history, txns, allocation] = await Promise.all([
        fakeFetch(portfolioSummary, 800),
        fakeFetch(holdings, 1000),
        fakeFetch(marketMovers, 700),
        fakeFetch(performanceHistory, 900),
        fakeFetch(recentTransactions, 600),
        fakeFetch(allocationData, 650, simulateError),
      ]);
      setState({
        status: 'success',
        data: { summary, holdings: holdingsData, movers, history, transactions: txns, allocation },
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setState(s => ({ ...s, status: 'error', error: err.message }));
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { ...state, refresh: load };
}
