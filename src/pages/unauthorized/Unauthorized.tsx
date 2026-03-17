// pages/Unauthorized.tsx
import { Link } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <Shield className="w-24 h-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-400 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
