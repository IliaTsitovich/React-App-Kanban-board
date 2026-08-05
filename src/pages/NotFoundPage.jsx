import { NavLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>That page doesn&apos;t exist.</p>
      <NavLink to="/">Back to board</NavLink>
    </main>
  );
}
