export default function Header({ title, sub }) {
  return (
    <header className="page-header">
      <div>
        <h2>{title}</h2>
        <div className="header-sub">{sub}</div>
      </div>
      <div className="header-actions">
        <span className="header-badge badge-active">
          <span className="pulse-dot" />
          Foundation Lock-In
        </span>
      </div>
    </header>
  );
}
