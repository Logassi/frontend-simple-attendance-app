import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token'); // gonna change to get token from cookie? or headers?

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
