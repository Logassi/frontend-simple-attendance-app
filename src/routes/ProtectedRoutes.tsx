// routes/ProtectedRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../utils/store/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'employee'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has required role
  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role as 'admin' | 'employee')
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
