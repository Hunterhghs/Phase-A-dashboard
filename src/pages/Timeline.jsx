import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { timelinePhases } from '../data/mockData';

const integrationData = [
  { year: '2025', digital: 20, trade: 15, energy: 12, land: 10, credit: 8, firms: 12 },
  { year: '2026', digital: 35, trade: 25, energy: 20, land: 18, credit: 15, firms: 20 },
  { year: '2027', digital: 50, trade: 38, energy: 30, land: 28, credit: 22, firms: 30 },
  { year: '2028', digital: 65, trade: 50, energy: 42, land: 40, credit: 32, firms: 42 },
  { year: '2029', digital: 75, trade: 60, energy: 55, land: 52, credit: 42, firms: 55 },
  { year: '2030', digital: 82, trade: 70, energy: 65, land: 62, credit: 52, firms: 65 },
  { year: '2031', digital: 87, trade: 78, energy: 74, land: 70, credit: 60, firms: 73 },
  { year: '2032', digital: 91, trade: 84, energy: 82, land: 77, credit: 68, firms: 80 },
  { year: '2033', digital: 94, trade: 88, energy: 88, land: 82, credit: 75, firms: 86 },
  { year: '2034', digital: 97, trade: 93, energy: 93, land: 88, credit: 82, firms: 92 },
  { year: '2035', digital: 100, trade: 97, energy: 97, land: 93, credit: 90, firms: 97 },
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

export default function Timeline() {
  return (
    <div>
      {/* Phase Breakdown */}
      <div className="section">
        <h3 className="section-title">Macro Pathway</h3>
        <p className="section-sub">
          From platform build-out to productive scaling: three sequenced phases over the decisive decade.
        </p>
        <div className="timeline-container">
          <div className="timeline-line" />
          {timelinePhases.map((phase) => (
            <div key={phase.id} className="timeline-item">
              <div className={`timeline-dot ${phase.status}`} style={{
                borderColor: phase.status === 'active' ? 'var(--gold)' : 'var(--text-muted)',
              }} />
              <div className="card" style={{ marginBottom: 0 }}>
                <div className="timeline-period">{phase.period}</div>
                <div className="timeline-title">{phase.name}</div>
                <div className="timeline-desc">{phase.description}</div>

                {/* Milestones */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Milestones
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {phase.milestones.map((m) => (
                      <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        {m.complete ? (
                          <CheckCircle2 size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                        ) : (
                          <Circle size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        )}
                        <span style={{ color: m.complete ? 'var(--text-primary)' : 'var(--text-muted)' }}>{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="progress-bar" style={{ marginTop: '1rem' }}>
                  <div className="progress-fill" style={{
                    width: `${phase.progress}%`,
                    background: phase.status === 'active' ? 'var(--gold)' : 'var(--text-muted)',
                  }} />
                </div>
                <div className="progress-label">
                  <span>{phase.progress}% complete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Chart */}
      <div className="section">
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Systems Integration Trajectory</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Projected build-out across six reform domains showing complementary acceleration
          </p>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={integrationData}>
                <defs>
                  <linearGradient id="gDigital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gTrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="2028" stroke="var(--gold)" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'Foundation →', position: 'top', fill: 'var(--gold)', fontSize: 10 }} />
                <ReferenceLine x="2032" stroke="var(--gold)" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'Scaling →', position: 'top', fill: 'var(--gold)', fontSize: 10 }} />
                <Area type="monotone" dataKey="digital" stroke="#3b82f6" fill="url(#gDigital)" strokeWidth={2} name="Digital Infra" />
                <Area type="monotone" dataKey="trade" stroke="#14b8a6" fill="url(#gTrade)" strokeWidth={2} name="Trade & Logistics" />
                <Area type="monotone" dataKey="energy" stroke="#f97316" fill="none" strokeWidth={1.5} name="Energy" />
                <Area type="monotone" dataKey="land" stroke="#f43f5e" fill="none" strokeWidth={1.5} name="Land Systems" />
                <Area type="monotone" dataKey="credit" stroke="#10b981" fill="none" strokeWidth={1.5} name="Credit" />
                <Area type="monotone" dataKey="firms" stroke="#d4a843" fill="none" strokeWidth={1.5} name="Firm Scaling" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Dates */}
      <div className="section">
        <h3 className="section-title">Key Integration Milestones</h3>
        <div className="grid-3">
          {[
            { year: '2025–2027', title: 'Digital Foundation', desc: 'Digital ID, payment rails, and registry systems reach operational nationwide coverage', color: '#3b82f6' },
            { year: '2027–2028', title: 'Trade Digitization', desc: 'Customs and port systems fully digitized with integrated clearance workflows', color: '#14b8a6' },
            { year: '2028–2030', title: 'Credit Infrastructure', desc: 'Alt-data underwriting and digital credit scoring operational for SME lending', color: '#10b981' },
            { year: '2029–2031', title: 'Energy Reliability', desc: 'Grid uptime exceeds 90% with smart metering and loss reduction programs', color: '#f97316' },
            { year: '2030–2032', title: 'Land Formalization', desc: 'Cadastre digitization and titling coverage reach critical mass for collateral lending', color: '#f43f5e' },
            { year: '2032–2035', title: 'Diffusion Phase', desc: 'Productivity spillovers flow into secondary cities and peri-urban economies', color: '#d4a843' },
          ].map((item) => (
            <div key={item.year} className="card animate-in">
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {item.year}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
