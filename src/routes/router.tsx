import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage/Homepage';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Attendance from '../pages/record-attendance/Attendance';
import ProtectedRoute from './ProtectedRoutes';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DashboardRouter from '../pages/dashboard/DashboardRouter';
import { ApiTest } from '../pages/test-connection/ApiTest';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <div className="h-20"></div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/record-attendance" element={<Attendance />} />
          <Route path="/dashboard/*" element={<DashboardRouter />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test2" element={<test2 />} />
          <Route path="/test3" element={<test3 />} />
          <Route path="/test4" element={<test4 />} /> */}
        </Route>
        {/* <Route path="/test" element={<ApiTest />} /> */}
      </Routes>
      <div className="h-20"></div>
      <Footer />
    </BrowserRouter>
  );
}
