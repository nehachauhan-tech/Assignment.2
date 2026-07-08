import { useState, useRef, useCallback } from 'react';

const RANGES = ['1M', '3M', '6M', '1Y'];

export default function PerformanceChart({ history, isLoading }) {
  const [range, setRange] = useState('1Y');
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const data = history ?? [];

  const rangeMap = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12 };
  const sliced = data.slice(-rangeMap[range]);

  const W = 600, H = 200, PAD = { top: 16, right: 16, bottom: 32, left: 56 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const minV = sliced.length ? Math.min(...sliced.map(d => d.value)) * 0.995 : 0;
  const maxV = sliced.length ? Math.max(...sliced.map(d => d.value)) * 1.005 : 1;

  const xScale = i => PAD.left + (sliced.length > 1 ? (i / (sliced.length - 1)) * chartW : chartW / 2);
  const yScale = v => PAD.top + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const points = sliced.map((d, i) => `${xScale(i)},${yScale(d.value)}`).join(' ');
  const areaPoints = sliced.length
    ? `${xScale(0)},${PAD.top + chartH} ${points} ${xScale(sliced.length - 1)},${PAD.top + chartH}`
    : '';

  const yTicks = 4;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => minV + (i / yTicks) * (maxV - minV));

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current || !sliced.length) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const chartXRel = svgX - PAD.left;
    const idx = Math.round((chartXRel / chartW) * (sliced.length - 1));
    const clamped = Math.max(0, Math.min(sliced.length - 1, idx));
    const d = sliced[clamped];
    setTooltip({ x: xScale(clamped), y: yScale(d.value), month: d.month, value: d.value, idx: clamped });
  }, [sliced, chartW]);

  if (isLoading) {
    return (
      <div className="chart-card">
        <div className="chart-card__header">
          <div className="skeleton skeleton--text-md" style={{ width: 160 }} />
          <div className="skeleton skeleton--text-sm" style={{ width: 100 }} />
        </div>
        <div className="skeleton skeleton--chart" />
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Portfolio Performance</h3>
        <div className="chart-card__ranges">
          {RANGES.map(r => (
            <button
              key={r}
              className={`chart-range-btn ${range === r ? 'chart-range-btn--active' : ''}`}
              onClick={() => setRange(r)}
            >{r}</button>
          ))}
        </div>
      </div>
      <svg
        ref={svgRef}
        className="perf-chart"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        aria-label="Portfolio performance chart"
        role="img"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02"/>
          </linearGradient>
        </defs>

        {/* Y-axis grid + labels */}
        {yTickVals.map((v, i) => {
          const y = yScale(v);
          return (
            <g key={i}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4"/>
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
                {(v / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {sliced.map((d, i) => {
          if (sliced.length > 6 && i % 2 !== 0) return null;
          return (
            <text key={i} x={xScale(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {d.month}
            </text>
          );
        })}

        {/* Area */}
        {areaPoints && <polygon points={areaPoints} fill="url(#chartGrad)"/>}

        {/* Line */}
        {sliced.length > 1 && (
          <polyline points={points} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        )}

        {/* Tooltip crosshair */}
        {tooltip && (
          <>
            <line x1={tooltip.x} x2={tooltip.x} y1={PAD.top} y2={PAD.top + chartH} stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#6366f1" stroke="#fff" strokeWidth="2"/>
            <g>
              <rect
                x={Math.min(tooltip.x + 8, W - 100)}
                y={tooltip.y - 32}
                width="88"
                height="28"
                rx="6"
                fill="#1e293b"
                opacity=".92"
              />
              <text
                x={Math.min(tooltip.x + 52, W - 56)}
                y={tooltip.y - 14}
                textAnchor="middle"
                fontSize="11"
                fill="#f1f5f9"
                fontWeight="600"
              >
                ${(tooltip.value / 1000).toFixed(1)}k
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
