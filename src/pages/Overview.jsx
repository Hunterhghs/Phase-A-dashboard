import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, Legend,
} from 'recharts';
import KpiCard from '../components/KpiCard';
import { kpiData, pillars, regions, diffusionCascade, timelinePhases } from '../data/mockData';

const overallTrend = [
  { year: '2025', progress: 15, target: 15 },
  { year: '2026', progress: 22, target: 24 },
  { year: '2027', progress: 32, target: 33 },
  { year: '2028', progress: 40, target: 42 },
  { year: '2029', progress: 50, target: 52 },
  { year: '2030', progress: 60, target: 62 },
  { year: '2031', progress: 68, target: 72 },
  { year: '2032', progress: 76, target: 80 },
  { year: '2033', progress: 84, target: 88 },
  { year: '2034', progress: 91, target: 94 },
  { year: '2035', progress: 100, target: 100 },
];

const pillarRadar = pillars.map((p) => {
  const avg = p.metrics.reduce((sum, m) => {
    if (m.inverse) return sum + Math.min(100, Math.max(0, (1 - (m.value - m.target) / (20 - m.target)) * 100));
    return sum + (m.value / m.target) * 100;
  }, 0) / p.metrics.length;
  return { name: p.name.split(' ')[0], progress: Math.round(Math.min(100, avg)), fullName: p.name };
});

const regionPie = regions.map((r) => ({
  name: r.name,
  value: r.overallProgress,
  color: r.color,
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-medium)',
      borderRadius: 8,
      padding: '0.75rem 1rem',
      fontSize: '0.8rem',
    }}>
      <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, display: 'flex', gap: '0.5rem' }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 700 }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Overview() {
  return (
    <div>
      {/* Phase Progress Summary */}
      <div className="section">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {timelinePhases.map((phase) => (
            <div key={phase.id} className="card" style={{ flex: '1 1 280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: phase.status === 'active' ? 'var(--gold)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {phase.period}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 4,
                  background: phase.status === 'active' ? 'var(--gold-dim)' : 'rgba(255,255,255,0.05)',
                  color: phase.status === 'active' ? 'var(--gold)' : 'var(--text-muted)',
                  fontWeight: 600,
                }}>
                  {phase.status === 'active' ? 'ACTIVE' : 'UPCOMING'}
                </span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{phase.name}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{
                  width: `${phase.progress}%`,
                  background: phase.status === 'active' ? 'var(--gold)' : 'var(--text-muted)',
                }} />
              </div>
              <div className="progress-label">
                <span>{phase.progress}% complete</span>
                <span>{phase.milestones.filter(m => m.complete).length}/{phase.milestones.length} milestones</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="section">
        <h3 className="section-title">Key Performance Indicators</h3>
        <div className="grid-4">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="section grid-2" style={{ gap: '1rem' }}>
        {/* Overall Progress */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Phase A Progress Trajectory</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Actual vs. target progress toward 2035 goals
          </p>
          <div className="chart-container">
            <ResponsiveContainer>
              <AreaChart data={overallTrend}>
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4a843" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#d4a843" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="target" stroke="#3b82f6" fill="url(#targetGrad)" strokeWidth={1.5} strokeDasharray="5 5" name="Target" />
                <Area type="monotone" dataKey="progress" stroke="#d4a843" fill="url(#progressGrad)" strokeWidth={2} name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pillar Radar */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Pillar Performance</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Relative progress across six reform pillars
          </p>
          <div className="chart-container">
            <ResponsiveContainer>
              <RadarChart data={pillarRadar} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Progress" dataKey="progress" stroke="#d4a843" fill="#d4a843" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="section grid-2" style={{ gap: '1rem' }}>
        {/* Regional Progress */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '1rem' }}>Regional Progress</h3>
          {regions.map((region) => (
            <div key={region.id} className="region-bar-container">
              <div className="region-bar-header">
                <span className="region-name">{region.name}</span>
                <span className="region-value" style={{ color: region.color }}>{region.overallProgress}%</span>
              </div>
              <div className="region-bar">
                <div className="region-bar-fill" style={{ width: `${region.overallProgress}%`, background: region.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Diffusion Cascade */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Diffusion Cascade</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Productivity-led inclusion pathway progress
          </p>
          {diffusionCascade.map((step) => (
            <div key={step.step} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: `${step.color}22`, color: step.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 800, flexShrink: 0,
                }}>
                  {step.step}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{step.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 700, color: step.color }}>{step.progress}%</span>
              </div>
              <div className="progress-bar" style={{ marginLeft: '2.25rem', marginTop: 0 }}>
                <div className="progress-fill" style={{ width: `${step.progress}%`, background: step.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
