import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Attendance from "../pages/record-attendance/Attendance";
import ProtectedRoute from "./ProtectedRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/record-attendance" element={<Attendance />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test2" element={<test2 />} />
          <Route path="/test3" element={<test3 />} />
          <Route path="/test4" element={<test4 />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
