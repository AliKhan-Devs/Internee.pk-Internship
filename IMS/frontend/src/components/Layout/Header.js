import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

const Header = ({ onMenuToggle, sidebarOpen }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-zinc-900 border-b border-zinc-700 sticky top-0 z-40 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Menu Toggle */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <div className="hidden lg:block text-2xl font-extrabold text-green-500 tracking-wider ml-4">
              IMS
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-lg mx-4 md:mx-8 hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </form>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search */}
            <button
              onClick={() => {}}
              className="sm:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-zinc-800 transition"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-zinc-400 capitalize">{user?.role}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-800 rounded-xl shadow-xl border border-zinc-700 py-2 animate-fade-in-down">
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 mt-2 text-xs font-medium rounded-full ${
                        isAdmin
                          ? "bg-purple-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {isAdmin ? "Administrator" : "Intern"}
                    </span>
                  </div>

                  <button
                    onClick={handleProfile}
                    className="flex items-center w-full px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-3 text-zinc-400" /> Profile
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center w-full px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition"
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-3 text-zinc-400" /> Settings
                  </button>

                  <hr className="my-2 border-zinc-700" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-rose-500 hover:bg-zinc-700 transition"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-rose-500" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;