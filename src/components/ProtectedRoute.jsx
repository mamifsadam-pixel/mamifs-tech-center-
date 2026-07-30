import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// role: 'student' | 'staff'
export default function ProtectedRoute({ role, children }) {
  const { staffUser, student, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center badge-mono text-sm text-slate-ink/60">
        Loading…
      </div>
    );
  }

  if (role === 'student' && !student) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'staff' && !staffUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
