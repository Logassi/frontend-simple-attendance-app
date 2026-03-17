import { Users, Calendar, Clock, Settings } from 'lucide-react';
import useAuthStore from '../../utils/store/useAuthStore';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">
          Admin Dashboard, {user?.name}
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Employees', value: '156', icon: Users },
            { label: 'Present Today', value: '142', icon: Clock },
            { label: 'On Leave', value: '8', icon: Calendar },
            { label: 'Pending Requests', value: '12', icon: Settings },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/90 rounded-xl p-6 border border-slate-800"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Attendance Review */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Today's Attendance
            </h2>
            {/* Attendance table/list */}
          </div>

          {/* Employee Management */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Employees
            </h2>
            {/* Employee list with edit buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}
