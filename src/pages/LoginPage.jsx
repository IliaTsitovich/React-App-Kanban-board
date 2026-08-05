import { NavLink } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import './AuthPages.scss';

export function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Log in</h1>
        <LoginForm />
        <p className="auth-switch">
          No account yet? <NavLink to="/register">Create one</NavLink>
        </p>
      </div>
    </main>
  );
}
