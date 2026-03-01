import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import PillarCard from '../components/PillarCard';
import { pillars } from '../data/mockData';

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
          <span style={{ fontWeight: 700 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const trendKeys = {
  1: [
    { key: 'agriculture', name: 'Agriculture Productivity', color: '#10b981' },
    { key: 'manufacturing', name: 'Manufacturing VA', color: '#3b82f6' },
    { key: 'services', name: 'Services Share', color: '#8b5cf6' },
  ],
  2: [
    { key: 'portDwell', name: 'Port Dwell Time', color: '#f43f5e' },
    { key: 'customs', name: 'Customs Clearance', color: '#f97316' },
    { key: 'payments', name: 'Payment Interop.', color: '#14b8a6' },
  ],
  3: [
    { key: 'formal', name: 'Formal Employment', color: '#d4a843' },
    { key: 'firmSize', name: 'Median Firm Size', color: '#3b82f6' },
    { key: 'survival', name: '5yr Survival Rate', color: '#10b981' },
  ],
  4: [
    { key: 'titling', name: 'Land Titling', color: '#f43f5e' },
    { key: 'cadastre', name: 'Cadastre Digitization', color: '#8b5cf6' },
    { key: 'density', name: 'Urban Density Index', color: '#f97316' },
  ],
  5: [
    { key: 'uptime', name: 'Grid Uptime', color: '#f97316' },
    { key: 'losses', name: 'T&D Losses', color: '#f43f5e' },
    { key: 'renewable', name: 'Renewable Share', color: '#10b981' },
  ],
  6: [
    { key: 'credit', name: 'SME Credit / GDP', color: '#10b981' },
    { key: 'npl', name: 'NPL Rate', color: '#f43f5e' },
    { key: 'altData', name: 'Alt-Data Underwriting', color: '#3b82f6' },
  ],
};

export default function Pillars() {
  const [selectedPillar, setSelectedPillar] = useState(null);

  return (
    <div>
      {!selectedPillar ? (
        <>
          <div className="section">
            <p className="section-sub">
              Six complementary reform pillars driving structural transformation across emerging economies.
            </p>
          </div>
          <div className="grid-3">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                onClick={() => setSelectedPillar(pillar)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={() => setSelectedPillar(null)}
            style={{
              background: 'none',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              padding: '0.5rem 1rem',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'inherit',
            }}
          >
            ← Back to Pillars
          </button>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: 900,
                fontFamily: 'Playfair Display, serif',
                color: selectedPillar.color,
                opacity: 0.3,
              }}>
                0{selectedPillar.id}
              </span>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Playfair Display, serif' }}>
                  {selectedPillar.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedPillar.subtitle}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {selectedPillar.description}
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Metrics */}
            <div className="card">
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Key Metrics</h4>
              {selectedPillar.metrics.map((metric) => (
                <div key={metric.name} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{metric.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      {metric.value} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {metric.target} {metric.unit}</span>
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${metric.inverse
                          ? Math.min(100, Math.max(0, (1 - (metric.value - metric.target) / (20 - metric.target)) * 100))
                          : Math.min(100, (metric.value / metric.target) * 100)}%`,
                        background: selectedPillar.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Chart */}
            <div className="card">
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Projected Trends (2025–2035)</h4>
              <div className="chart-container">
                <ResponsiveContainer>
                  <LineChart data={selectedPillar.trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: '0.75rem' }}
                      formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
                    />
                    {trendKeys[selectedPillar.id]?.map((tk) => (
                      <Line
                        key={tk.key}
                        type="monotone"
                        dataKey={tk.key}
                        stroke={tk.color}
                        strokeWidth={2}
                        dot={false}
                        name={tk.name}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
