export function Title({ info, count }) {
  return (
    <p className="stat">
      <span className="stat-label">{info}</span>
      <span className="stat-count">{count ?? 0}</span>
    </p>
  );
}
