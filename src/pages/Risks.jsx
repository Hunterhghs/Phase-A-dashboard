import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { riskMonitor } from '../data/mockData';

const severityConfig = {
  high: { icon: AlertTriangle, color: 'var(--rose)', label: 'HIGH', bg: 'var(--rose-dim)' },
  medium: { icon: AlertCircle, color: 'var(--orange)', label: 'MEDIUM', bg: 'var(--orange-dim)' },
  low: { icon: Info, color: 'var(--emerald)', label: 'LOW', bg: 'var(--emerald-dim)' },
};

export default function Risks() {
  const highRisks = riskMonitor.filter((r) => r.severity === 'high');
  const mediumRisks = riskMonitor.filter((r) => r.severity === 'medium');
  const lowRisks = riskMonitor.filter((r) => r.severity === 'low');

  return (
    <div>
      <div className="section">
        <p className="section-sub">
          Six critical failure modes that could derail Phase A reforms. Active monitoring across all regions.
        </p>
      </div>

      {/* Summary */}
      <div className="section grid-3">
        {[
          { label: 'High Risk', count: highRisks.length, color: 'var(--rose)', bg: 'var(--rose-dim)' },
          { label: 'Medium Risk', count: mediumRisks.length, color: 'var(--orange)', bg: 'var(--orange-dim)' },
          { label: 'Low Risk', count: lowRisks.length, color: 'var(--emerald)', bg: 'var(--emerald-dim)' },
        ].map((s) => (
          <div key={s.label} className="card animate-in" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: s.color }}>{s.count}</div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: s.color,
              background: s.bg,
              display: 'inline-block',
              padding: '0.2rem 0.75rem',
              borderRadius: 4,
              marginTop: '0.25rem',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Risk Cards */}
      <div className="section">
        <h3 className="section-title">Active Risk Factors</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {riskMonitor.map((risk) => {
            const config = severityConfig[risk.severity];
            const Icon = config.icon;
            return (
              <div key={risk.id} className="risk-card animate-in">
                <div className={`risk-severity ${risk.severity}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <Icon size={16} style={{ color: config.color }} />
                    <span className="risk-name">{risk.name}</span>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: config.color,
                      background: config.bg,
                      padding: '0.15rem 0.4rem',
                      borderRadius: 3,
                    }}>
                      {config.label}
                    </span>
                  </div>
                  <div className="risk-desc">{risk.description}</div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Indicator: </span>
                      <span style={{ fontWeight: 600 }}>{risk.indicator}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Current: </span>
                      <span style={{ fontWeight: 700, color: risk.severity === 'high' ? 'var(--rose)' : risk.severity === 'medium' ? 'var(--orange)' : 'var(--emerald)' }}>
                        {risk.currentValue}{typeof risk.currentValue === 'number' ? '' : ''}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Threshold: </span>
                      <span style={{ fontWeight: 600 }}>{risk.threshold}</span>
                    </div>
                  </div>
                  <div className="risk-tags">
                    {risk.regions.map((region) => (
                      <span key={region} className="risk-tag">{region}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mitigation Framework */}
      <div className="section">
        <h3 className="section-title">Mitigation Strategies</h3>
        <div className="grid-2">
          {[
            {
              title: 'Cross-Ministry Coordination',
              desc: 'Institutionalize inter-ministerial reform committees with shared KPIs and accountability. Break siloed implementation.',
              risks: ['Siloed Reforms'],
              color: 'var(--blue)',
            },
            {
              title: 'Inclusive Growth Monitoring',
              desc: 'Track Gini of firm productivity and informal sector metrics. Ensure gains diffuse beyond export enclaves.',
              risks: ['Enclave Growth'],
              color: 'var(--teal)',
            },
            {
              title: 'Productive Credit Allocation',
              desc: 'Supervisory frameworks prioritizing investment lending over speculation. Alt-data underwriting for SMEs.',
              risks: ['Credit Misallocation'],
              color: 'var(--emerald)',
            },
            {
              title: 'Coalition Building',
              desc: 'Identify and manage rent-seeking resistance. Build reform coalitions with private sector and civil society allies.',
              risks: ['Political Economy Resistance'],
              color: 'var(--orange)',
            },
            {
              title: 'Manufacturing Pathway Protection',
              desc: 'Industrial policy supporting light manufacturing before service transition. Prevent premature deindustrialization.',
              risks: ['Premature Deindustrialization'],
              color: 'var(--purple)',
            },
            {
              title: 'Urban Planning Integration',
              desc: 'Infrastructure-aligned zoning, digitized cadastres, and density management converting urbanization into productivity.',
              risks: ['Urbanization Without Planning'],
              color: 'var(--rose)',
            },
          ].map((strategy) => (
            <div key={strategy.title} className="card animate-in" style={{ borderLeft: `3px solid ${strategy.color}` }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>{strategy.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                {strategy.desc}
              </p>
              <div className="risk-tags">
                {strategy.risks.map((r) => (
                  <span key={r} className="risk-tag" style={{ background: `${strategy.color}22`, color: strategy.color }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
