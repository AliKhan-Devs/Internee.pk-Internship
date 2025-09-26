import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon, ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';

const PublicLayout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Navbar */}
      <nav className="bg-zinc-950/70 backdrop-blur-sm sticky top-0 z-50 py-4 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IMS</span>
            </div>
            <span className="text-2xl font-bold text-white hidden sm:block">InternshipMS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-zinc-400 hover:text-green-500 font-medium transition-colors">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-zinc-400 hover:text-green-500 font-medium transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 transition"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-zinc-400 hover:text-green-500 font-medium transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-white bg-green-600 rounded-lg text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-500 text-center py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2024 Internship Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;