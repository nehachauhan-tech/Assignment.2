import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { StatCard } from './components/StatCard';
import PerformanceChart from './components/PerformanceChart';
import AllocationChart from './components/AllocationChart';
import HoldingsTable from './components/HoldingsTable';
import MarketMovers from './components/MarketMovers';
import RecentTransactions from './components/RecentTransactions';
import ErrorBanner from './components/ErrorBanner';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { usePortfolioData } from './hooks/usePortfolioData';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { status, data, error, lastUpdated, refresh } = usePortfolioData();

  const isLoading = status === 'loading' || status === 'idle';

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="main">
        <Header lastUpdated={lastUpdated} onRefresh={refresh} isLoading={isLoading} activeTab={activeTab} />

        {activeTab === 'onboarding' ? (
          <div className="content content--onboarding">
            <OnboardingFlow />
          </div>
        ) : (
          <div className="content">
            {status === 'error' && (
              <ErrorBanner message={error} onRetry={refresh} />
            )}

            {/* Stat cards row */}
            <div className="stats-grid">
              <StatCard
                label="Total Portfolio Value"
                value={data?.summary.totalValue ?? 0}
                change={data?.summary.dayChange ?? 0}
                changePct={data?.summary.dayChangePct ?? 0}
                isLoading={isLoading}
              />
              <StatCard
                label="Day's Gain / Loss"
                value={Math.abs(data?.summary.dayChange ?? 0)}
                change={data?.summary.dayChange ?? 0}
                changePct={data?.summary.dayChangePct ?? 0}
                isLoading={isLoading}
              />
              <StatCard
                label="Total Return"
                value={data?.summary.totalReturn ?? 0}
                change={data?.summary.totalReturn ?? 0}
                changePct={data?.summary.totalReturnPct ?? 0}
                isLoading={isLoading}
              />
            </div>

            {/* Charts row */}
            <div className="charts-grid">
              <PerformanceChart history={data?.history} isLoading={isLoading} />
              <AllocationChart allocation={data?.allocation} isLoading={isLoading} />
            </div>

            {/* Holdings + movers row */}
            <div className="lower-grid">
              <HoldingsTable holdings={data?.holdings} isLoading={isLoading} />
              <div className="lower-grid__right">
                <MarketMovers movers={data?.movers} isLoading={isLoading} />
                <RecentTransactions transactions={data?.transactions} isLoading={isLoading} />
              </div>
            </div>

            {/* Demo: simulate error state */}
            {status === 'success' && (
              <div className="demo-bar">
                <span>Demo controls:</span>
                <button className="demo-btn demo-btn--error" onClick={() => refresh(true)}>
                  Simulate API Error
                </button>
                <button className="demo-btn" onClick={() => refresh(false)}>
                  Reload Data
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
