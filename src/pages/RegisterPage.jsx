import { NavLink } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import './AuthPages.scss';

export function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <RegisterForm />
        <p className="auth-switch">
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </p>
      </div>
    </main>
  );
}
