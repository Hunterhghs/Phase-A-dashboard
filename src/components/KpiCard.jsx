import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ kpi }) {
  const progress = kpi.trend === 'down'
    ? ((kpi.target && kpi.value) ? Math.max(0, Math.min(100, ((11 - kpi.value) / (11 - kpi.target)) * 100)) : 50)
    : ((kpi.value / kpi.target) * 100);

  return (
    <div className="card animate-in">
      <div className="card-header">
        <span className="card-title">{kpi.name}</span>
        <span
          className="pillar-icon"
          style={{ background: `${kpi.color}22`, width: 32, height: 32 }}
        >
          {kpi.trend === 'up' ? (
            <TrendingUp size={16} style={{ color: kpi.color }} />
          ) : (
            <TrendingDown size={16} style={{ color: kpi.color }} />
          )}
        </span>
      </div>
      <div className="card-value">
        {kpi.value}
        <span className="card-unit">{kpi.unit}</span>
      </div>
      <span className={`card-change ${kpi.trend === 'down' && kpi.change.startsWith('-') ? 'positive' : kpi.trend === 'up' ? 'positive' : 'negative'}`}>
        {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {kpi.change}
      </span>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(100, progress)}%`,
            background: kpi.color,
          }}
        />
      </div>
      <div className="progress-label">
        <span>Current</span>
        <span>Target: {kpi.target} {kpi.unit}</span>
      </div>
    </div>
  );
}
