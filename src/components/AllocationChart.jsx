export default function AllocationChart({ allocation, isLoading }) {
  if (isLoading) {
    return (
      <div className="chart-card">
        <div className="skeleton skeleton--text-md" style={{ width: 140 }} />
        <div className="skeleton skeleton--donut" />
      </div>
    );
  }

  const data = allocation ?? [];
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 56;
  const innerR = 36;
  const gap = 2;

  let cumulative = 0;
  const total = data.reduce((s, d) => s + d.value, 0);

  const slices = data.map(d => {
    const start = (cumulative / total) * 360 - 90;
    cumulative += d.value;
    const end = (cumulative / total) * 360 - 90;
    return { ...d, startDeg: start, endDeg: end };
  });

  function polarToXY(deg, radius) {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  }

  function slicePath(startDeg, endDeg) {
    const gapRad = (gap / (2 * Math.PI * r)) * 360;
    const s = startDeg + gapRad / 2;
    const e = endDeg - gapRad / 2;
    const [x1, y1] = polarToXY(s, r);
    const [x2, y2] = polarToXY(e, r);
    const [x3, y3] = polarToXY(e, innerR);
    const [x4, y4] = polarToXY(s, innerR);
    const large = e - s > 180 ? 1 : 0;
    return [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');
  }

  return (
    <div className="chart-card chart-card--allocation">
      <h3 className="chart-card__title">Allocation</h3>
      <div className="allocation__body">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Asset allocation donut chart" role="img">
          {slices.map((s, i) => (
            <path key={i} d={slicePath(s.startDeg, s.endDeg)} fill={s.color}/>
          ))}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="13" fill="#94a3b8">Total</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="15" fontWeight="700" fill="#f1f5f9">284k</text>
        </svg>
        <ul className="allocation__legend">
          {data.map((d, i) => (
            <li key={i} className="allocation__legend-item">
              <span className="allocation__legend-dot" style={{ background: d.color }} />
              <span className="allocation__legend-label">{d.label}</span>
              <span className="allocation__legend-pct">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
