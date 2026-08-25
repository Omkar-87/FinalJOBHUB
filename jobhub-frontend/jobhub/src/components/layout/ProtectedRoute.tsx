import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { LoadingState } from '@/components/ui/States';

export function ProtectedRoute({ role }: { role: UserRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingState label="Loading JOBHUB…" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard'} replace />;
  }

  return <Outlet />;
}
