import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm lg:text-base"
            >
              Aezakmi
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm lg:text-base"
            >
              Aezakmi
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm lg:text-base"
            >
              Aezakmi
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm lg:text-base"
            >
              Aezakmi
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 " />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 " />
            )}
          </button>
        </div>

        {mobileMenuIsOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
            <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              <a
                href="#"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Aezakmi
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Aezakmi
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Aezakmi
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white text-sm lg:text-base"
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Aezakmi
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
