import { Layers, Globe2, Building2, Map, Zap, DollarSign } from 'lucide-react';

const iconMap = {
  layers: Layers,
  globe: Globe2,
  building: Building2,
  map: Map,
  zap: Zap,
  dollarSign: DollarSign,
};

export default function PillarCard({ pillar, onClick }) {
  const Icon = iconMap[pillar.icon] || Layers;
  const avgProgress = pillar.metrics.reduce((sum, m) => {
    if (m.inverse) {
      return sum + Math.max(0, Math.min(100, ((m.target ? (1 - m.value / 20) : 0) / (1 - m.target / 20)) * 100));
    }
    return sum + (m.value / m.target) * 100;
  }, 0) / pillar.metrics.length;

  return (
    <div className="pillar-card animate-in" onClick={onClick} style={{ borderTopColor: pillar.color }}>
      <div className="pillar-number">0{pillar.id}</div>
      <div
        className="pillar-icon"
        style={{ background: `${pillar.color}22` }}
      >
        <Icon size={20} style={{ color: pillar.color }} />
      </div>
      <div className="pillar-name">{pillar.name}</div>
      <div className="pillar-subtitle">{pillar.subtitle}</div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
        {pillar.description}
      </p>
      {pillar.metrics.slice(0, 2).map((metric) => (
        <div key={metric.name} style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{metric.name}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              {metric.value}{metric.unit === '%' || metric.unit === '% GDP' || metric.unit === '% digital' ? '%' : ` ${metric.unit}`}
            </span>
          </div>
          <div className="progress-bar" style={{ height: 4 }}>
            <div
              className="progress-fill"
              style={{
                width: `${metric.inverse
                  ? Math.min(100, Math.max(0, (1 - (metric.value - metric.target) / (20 - metric.target)) * 100))
                  : Math.min(100, (metric.value / metric.target) * 100)}%`,
                background: pillar.color,
              }}
            />
          </div>
        </div>
      ))}
      <div style={{
        marginTop: '1rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
      }}>
        <span style={{ color: 'var(--text-muted)' }}>Overall Progress</span>
        <span style={{ color: pillar.color, fontWeight: 700 }}>
          {Math.round(Math.min(100, avgProgress))}%
        </span>
      </div>
    </div>
  );
}
