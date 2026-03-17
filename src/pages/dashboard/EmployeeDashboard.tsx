import { useState } from 'react';
// import Camera from '../../components/Camera'; // Your camera component
import useAuthStore from '../../utils/store/useAuthStore';

export default function EmployeeDashboard() {
  const { user } = useAuthStore();
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">
          Welcome, {user?.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Mark Attendance
            </h2>
            {/* <Camera /> */}
          </div>

          {/* Attendance History */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Attendance
            </h2>
            {/* History list */}
          </div>
        </div>
      </div>
    </div>
  );
}
