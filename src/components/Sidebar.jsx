import {
  LayoutDashboard,
  Layers,
  Clock,
  Globe2,
  ArrowRightLeft,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'pillars', label: 'Reform Pillars', icon: Layers },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'regions', label: 'Regional Analysis', icon: Globe2 },
  { id: 'diffusion', label: 'Diffusion Cascade', icon: ArrowRightLeft },
  { id: 'risks', label: 'Risk Monitor', icon: AlertTriangle },
];

export default function Sidebar({ currentPage, onNavigate, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <h1>Phase A</h1>
        <div className="brand-period">2025 – 2035</div>
        <div className="brand-sub">Economic Diffusion Dashboard</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Dashboard</div>
        {navItems.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            className={`nav-item ${currentPage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            {label}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="https://phasea.hheuristics.com" target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} />
          Phase A Framework
        </a>
      </div>
    </aside>
  );
}
