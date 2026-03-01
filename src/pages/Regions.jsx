import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend, Cell,
} from 'recharts';
import { regions } from '../data/mockData';

const metricLabels = {
  formalEmployment: 'Formal Employment',
  manufacturingVA: 'Manufacturing VA',
  exportComplexity: 'Export Complexity',
  energyReliability: 'Energy Reliability',
  smeCredit: 'SME Credit',
  landTitling: 'Land Titling',
};

const metricTargets = {
  formalEmployment: 55,
  manufacturingVA: 22,
  exportComplexity: 0.75,
  energyReliability: 95,
  smeCredit: 35,
  landTitling: 80,
};

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
        <div key={p.name} style={{ color: p.fill || p.color, display: 'flex', gap: '0.5rem' }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 700 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const radarData = Object.keys(metricLabels).map((key) => {
  const obj = { metric: metricLabels[key].split(' ')[0] };
  regions.forEach((r) => {
    const target = metricTargets[key];
    obj[r.name] = Math.round((r[key] / target) * 100);
  });
  return obj;
});

export default function Regions() {
  const [selectedMetric, setSelectedMetric] = useState('overallProgress');

  const barData = regions.map((r) => ({
    name: r.name.length > 15 ? r.name.slice(0, 15) + '.' : r.name,
    value: selectedMetric === 'overallProgress' ? r.overallProgress : r[selectedMetric],
    color: r.color,
    fullName: r.name,
  }));

  return (
    <div>
      <div className="section">
        <p className="section-sub">
          Tracking reform progress across five major emerging economy regions.
        </p>
      </div>

      {/* Regional Overview Cards */}
      <div className="section">
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {regions.map((region) => (
            <div key={region.id} className="card animate-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', background: region.color,
                }} />
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>{region.name}</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: region.color,
                }}>{region.overallProgress}%</span>
              </div>
              {Object.entries(metricLabels).map(([key, label]) => (
                <div key={key} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>
                      {region[key]}{key === 'exportComplexity' ? '' : key === 'manufacturingVA' || key === 'smeCredit' ? '% GDP' : '%'}
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 3 }}>
                    <div className="progress-fill" style={{
                      width: `${Math.min(100, (region[key] / metricTargets[key]) * 100)}%`,
                      background: region.color,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1rem' }}>
        {/* Bar Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Regional Comparison</h4>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.35rem 0.65rem',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontFamily: 'inherit',
              }}
            >
              <option value="overallProgress">Overall Progress</option>
              {Object.entries(metricLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="chart-container">
            <ResponsiveContainer>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="var(--text-muted)" fontSize={11} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Value">
                  {barData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar */}
        <div className="card">
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Multi-Metric Regional Profile</h4>
          <div className="chart-container">
            <ResponsiveContainer>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="65%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                {regions.slice(0, 3).map((r) => (
                  <Radar
                    key={r.id}
                    name={r.name}
                    dataKey={r.name}
                    stroke={r.color}
                    fill={r.color}
                    fillOpacity={0.08}
                    strokeWidth={1.5}
                  />
                ))}
                <Legend
                  wrapperStyle={{ fontSize: '0.7rem' }}
                  formatter={(val) => <span style={{ color: 'var(--text-secondary)' }}>{val}</span>}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
