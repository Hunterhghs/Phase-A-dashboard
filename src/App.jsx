import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Pillars from './pages/Pillars';
import Timeline from './pages/Timeline';
import Regions from './pages/Regions';
import Risks from './pages/Risks';
import Diffusion from './pages/Diffusion';
import './styles/index.css';

const pages = {
  overview: { component: Overview, title: 'Overview', sub: 'Phase A performance at a glance' },
  pillars: { component: Pillars, title: 'Reform Pillars', sub: 'Six structural transformation pillars' },
  timeline: { component: Timeline, title: 'Timeline', sub: 'Macro pathway from foundation to diffusion' },
  regions: { component: Regions, title: 'Regional Analysis', sub: 'Performance across emerging economies' },
  diffusion: { component: Diffusion, title: 'Diffusion Cascade', sub: 'Productivity-led inclusion pathway' },
  risks: { component: Risks, title: 'Risk Monitor', sub: 'Failure modes & political economy tracking' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { component: PageComponent, title, sub } = pages[currentPage];

  return (
    <div className="app-layout">
      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div
        className={`mobile-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
      />

      <div className="main-content">
        <Header title={title} sub={sub} />
        <div className="page-content">
          <PageComponent />
        </div>
      </div>
    </div>
  );
}
