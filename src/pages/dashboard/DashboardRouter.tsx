// pages/dashboard/DashboardRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../../utils/store/useAuthStore';
import ProtectedRoute from '../../routes/ProtectedRoutes';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

// Redirect component based on user role
function DashboardRedirect() {
  const { user } = useAuthStore();

  if (user?.role_id === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // Default to employee dashboard
  return <Navigate to="/dashboard/employee" replace />;
}

export default function DashboardRouter() {
  return (
    <Routes>
      {/* Root dashboard path redirects based on role */}
      <Route index element={<DashboardRedirect />} />

      {/* Employee routes */}
      <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
        <Route path="employee" element={<EmployeeDashboard />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route
          path="admin/employees"
          element={<div>Employee Management</div>}
        />
        <Route path="admin/reports" element={<div>Reports</div>} />
        <Route path="admin/settings" element={<div>Settings</div>} />
      </Route>

      {/* for testing */}
      {/* <Route path="admin" element={<AdminDashboard />} />
      <Route path="employee" element={<EmployeeDashboard />} /> */}
    </Routes>
  );
}
