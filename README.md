# FinBowl — Gracia Front-End Assignment

A production-ready React application built for the Gracia Global Advisory LLP front-end developer take-home assignment.

---

## Live Demo

Run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Tasks Completed

### Task 1 — FinBowl Financial Dashboard

A responsive financial dashboard with:

- **Portfolio Summary** — total value, day gain/loss, total return with directional indicators
- **Performance Chart** — interactive SVG line chart with hover tooltip and 1M / 3M / 6M / 1Y range selector
- **Allocation Donut** — SVG donut chart with Equities, Fixed Income, Commodities, Cash breakdown
- **Holdings Table** — sortable by any column, filterable by symbol/name, sector badges
- **Market Movers** — top gainers and losers with color-coded percentage changes
- **Recent Transactions** — Buy / Sell / Dividend history with type badges
- **Collapsible Sidebar** — icon-only collapsed mode, active state indicators
- **Real-world states**: skeleton loading screens, full error banner with retry, empty state for filtered holdings

**Demo controls** at the bottom of the dashboard let you trigger loading and error states for review.

### Task 2 — Customer Onboarding Flow

A 5-step tabbed customer creation flow accessible via the **Onboarding** nav item in the sidebar:

| Step | Contents |
|---|---|
| Customer Details | First/last name, DOB, gender, marital status, PAN (format validated), Aadhaar (12-digit validated), nationality |
| Contact Information | Email, mobile, alternate phone, full address with city/state/pincode/country |
| Financial Details | Account type, occupation, annual income, source of funds, bank details, IFSC (validated), optional nominee |
| Documents | Drag-and-drop upload zones for PAN, Aadhaar, address proof, photograph — with file preview & remove |
| Review & Submit | Full summary table of all fields across every tab, masked sensitive data, per-section edit buttons, consent checkbox |

After submission: success screen with a reference ID and option to start a new application.

---

## Stack

- **React 19** — function components + hooks throughout
- **Vite 8** — dev server and production build
- **Plain CSS** — no UI library, all styles hand-crafted
- **No external chart library** — all SVG charts written from scratch

## Project Structure

```
src/
├── components/
│   ├── onboarding/        # Task 2 — 5-step onboarding form
│   │   ├── OnboardingFlow.jsx
│   │   ├── FormField.jsx
│   │   ├── StepCustomerDetails.jsx
│   │   ├── StepContactInfo.jsx
│   │   ├── StepFinancialDetails.jsx
│   │   ├── StepDocuments.jsx
│   │   ├── StepReview.jsx
│   │   └── SuccessScreen.jsx
│   ├── AllocationChart.jsx
│   ├── ErrorBanner.jsx
│   ├── Header.jsx
│   ├── HoldingsTable.jsx
│   ├── MarketMovers.jsx
│   ├── PerformanceChart.jsx
│   ├── RecentTransactions.jsx
│   ├── Sidebar.jsx
│   └── StatCard.jsx
├── data/
│   └── mockData.js        # Mock portfolio data
├── hooks/
│   └── usePortfolioData.js  # Async data hook with loading/error states
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Bonus — API Integration

To connect Task 1 to a live API, the `usePortfolioData` hook already models the pattern:

```js
// Replace fakeFetch() with real fetch calls:
const res = await fetch('/api/portfolio/summary');
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
const data = await res.json();
```

- **Loading state** — `status: 'loading'` triggers shimmer skeletons on every card immediately, before any data arrives.
- **Error state** — any rejected promise sets `status: 'error'` and surfaces the message in the `ErrorBanner` with a retry button that re-invokes the hook.
- **Refresh** — the `refresh()` function is wired to the header refresh button; for auto-refresh, wrap it in a `setInterval` or use a library like SWR / React Query (`useSWR(url, fetcher, { refreshInterval: 30000 })`).
