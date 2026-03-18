import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../utils/store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Get auth state and actions from store
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setProfileMenuIsOpen(false);
    setMobileMenuIsOpen(false);
    // Redirect to home page after logout
    navigate('/');
    // Optional: Show logout success message
  };

  // Get user initials for avatar
  const getUserInitials = (): string => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  // Close all menus when navigating
  const handleNavigation = () => {
    setProfileMenuIsOpen(false);
    setMobileMenuIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" onClick={handleNavigation}>
            <div className="flex items-center space-x-1 group cursor-pointer">
              <div>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-medium">
                <span>Attendance</span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/record-attendance"
              className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors"
              onClick={handleNavigation}
            >
              Record Attendance
            </Link>
            <Link
              to="/report"
              className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors"
              onClick={handleNavigation}
            >
              Report
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors"
              onClick={handleNavigation}
            >
              About
            </Link>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Logged In State
              <div className="relative">
                <button
                  onClick={() => setProfileMenuIsOpen(!profileMenuIsOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {getUserInitials()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {profileMenuIsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                      onClick={handleNavigation}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                      onClick={handleNavigation}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                      onClick={handleNavigation}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-slate-800" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-800 w-full text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Logged Out State
              <>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors"
                  onClick={handleNavigation}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  onClick={handleNavigation}
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuIsOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
            <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {/* Mobile Navigation Links */}
              <Link
                to="/record-attendance"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={handleNavigation}
              >
                Record Attendance
              </Link>
              <Link
                to="/report"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={handleNavigation}
              >
                Report
              </Link>
              <Link
                to="/about"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={handleNavigation}
              >
                About
              </Link>

              {/* Mobile Auth Links */}
              <hr className="border-slate-800" />
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-gray-400 hover:text-white"
                    onClick={handleNavigation}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-gray-400 hover:text-white"
                    onClick={handleNavigation}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block text-gray-400 hover:text-white"
                    onClick={handleNavigation}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-400 hover:text-white"
                    onClick={handleNavigation}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center"
                    onClick={handleNavigation}
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
