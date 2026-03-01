import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { diffusionCascade, complementarityMatrix } from '../data/mockData';

const diffusionTrend = [
  { year: '2025', firms: 15, jobs: 8, households: 5, markets: 3, poverty: 2 },
  { year: '2026', firms: 22, jobs: 14, households: 8, markets: 5, poverty: 3 },
  { year: '2027', firms: 32, jobs: 22, households: 14, markets: 9, poverty: 5 },
  { year: '2028', firms: 42, jobs: 30, households: 20, markets: 13, poverty: 8 },
  { year: '2029', firms: 52, jobs: 38, households: 28, markets: 20, poverty: 13 },
  { year: '2030', firms: 62, jobs: 48, households: 36, markets: 28, poverty: 20 },
  { year: '2031', firms: 70, jobs: 56, households: 44, markets: 36, poverty: 28 },
  { year: '2032', firms: 78, jobs: 64, households: 52, markets: 44, poverty: 36 },
  { year: '2033', firms: 85, jobs: 72, households: 62, markets: 55, poverty: 48 },
  { year: '2034', firms: 92, jobs: 82, households: 72, markets: 65, poverty: 58 },
  { year: '2035', firms: 100, jobs: 92, households: 84, markets: 78, poverty: 72 },
];

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
      <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 700 }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Diffusion() {
  return (
    <div>
      <div className="section">
        <p className="section-sub">
          Success follows a five-step cascade: from firm scaling through job formalization to broad-based poverty reduction. Not enclave growth.
        </p>
      </div>

      {/* Cascade Flow */}
      <div className="section">
        <h3 className="section-title">The Inclusion Cascade</h3>
        <div className="cascade-flow">
          {diffusionCascade.map((step, idx) => (
            <div key={step.step} className="cascade-step" style={{ borderTopColor: step.color, borderTop: `3px solid ${step.color}` }}>
              <div className="cascade-step-number" style={{ color: step.color }}>{step.step}</div>
              <div className="cascade-step-name">{step.name}</div>
              <div className="cascade-step-desc">{step.description}</div>
              <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
                <div className="progress-fill" style={{ width: `${step.progress}%`, background: step.color }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: step.color, fontWeight: 700, marginTop: '0.25rem' }}>{step.progress}%</div>
              {idx < diffusionCascade.length - 1 && (
                <div className="cascade-arrow">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Diffusion Trend */}
      <div className="section">
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Cascade Progression (2025–2035)</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Each stage follows the prior, with lag effects creating a cascading wave of inclusion
          </p>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={diffusionTrend}>
                <defs>
                  {diffusionCascade.map((s) => (
                    <linearGradient key={s.step} id={`grad-${s.step}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="firms" stroke="#d4a843" fill="url(#grad-1)" strokeWidth={2} name="Firms Scale" />
                <Area type="monotone" dataKey="jobs" stroke="#3b82f6" fill="url(#grad-2)" strokeWidth={2} name="Jobs Formalize" />
                <Area type="monotone" dataKey="households" stroke="#14b8a6" fill="url(#grad-3)" strokeWidth={2} name="Households Invest" />
                <Area type="monotone" dataKey="markets" stroke="#10b981" fill="url(#grad-4)" strokeWidth={2} name="Markets Diffuse" />
                <Area type="monotone" dataKey="poverty" stroke="#8b5cf6" fill="url(#grad-5)" strokeWidth={2} name="Poverty Compresses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Complementarity Matrix */}
      <div className="section">
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Reform Complementarity</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            How reforms unlock each other, producing compounding gains when multiple constraints are relaxed simultaneously
          </p>
          <div className="comp-grid">
            {complementarityMatrix.map((item, idx) => (
              <div key={idx} className="comp-item">
                <span className="comp-from">{item.from}</span>
                <span className="comp-arrow">→</span>
                <span className="comp-to">{item.to}</span>
                <div className="comp-strength">
                  <div className="comp-strength-fill" style={{ width: `${item.strength * 100}%` }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', minWidth: 35, textAlign: 'right' }}>
                  {Math.round(item.strength * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anti-Pattern */}
      <div className="section">
        <div className="card" style={{ borderLeft: '3px solid var(--rose)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose)', marginBottom: '0.5rem' }}>
            Anti-Pattern: Enclave Growth
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            The framework explicitly rejects enclave growth where only a small set of export firms thrive while the broader
            economy remains informal. The diffusion cascade is designed to ensure gains flow beyond leading clusters
            into secondary cities, peri-urban regions, and connected rural economies.
          </p>
        </div>
      </div>
    </div>
  );
}
