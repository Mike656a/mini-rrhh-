// src/components/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const sessionExpired = useAuthStore(state => state.sessionExpired);

  if (!isAuthenticated) {
    return <Navigate to="/401" replace state={{ reason: sessionExpired ? 'session' : 'required' }} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;