import { Navigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export function ProtectedRoute({ children }) {
  const { profile } = useProfile();
  if (!profile) return <Navigate to="/profiles" replace />;
  return children;
}
