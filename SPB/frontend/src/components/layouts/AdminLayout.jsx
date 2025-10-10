"use client";

import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Folders,
  BarChart,
  Users,
  LogOut,
  Menu,
  X,
  Eye,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { RiBuilding2Line } from "react-icons/ri";
import { FaAddressCard, FaCertificate, FaHandHolding, FaLayerGroup, FaToolbox } from "react-icons/fa";
import { MdColorLens, MdContactPhone } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";


const AdminLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/profile", icon: FaAddressCard },
    { name: "Stats", path: "/stats", icon: IoStatsChart },
    { name: "Services", path: "/services", icon: FaHandHolding },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: FaToolbox },
    { name: "Education", path: "/education", icon: GraduationCap },
    { name: "Certificates", path: "/certificates", icon: FaCertificate },
    // { name: "Overview", path: "/overview", icon: FaLayerGroup },
    { name: "Theme", path: "/theme", icon: MdColorLens },
    { name: "Contact", path: "/contact", icon: MdContactPhone },
    // { name: "View Portfolio", path: `users/${user?.userName}`, icon: Eye },
  ];
  const bottomNavItems = [
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Services", path: "/services", icon: FaHandHolding },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Skills", path: "/skills", icon: FaToolbox },
    { name: "Education", path: "/education", icon: GraduationCap },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    const currentItem = navItems.find(
      (item) =>
        item.path === path || (path.startsWith(item.path + "/") && item.path !== "/")
    );
    if (currentItem) return currentItem.name;
    const segments = path.split("/").filter(Boolean);
    return segments.length >= 2
      ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1)
      : "Admin Panel";
  };

  return (
    <div className="flex h-screen bg-[#f3f7fb] text-gray-800">
      {/* Sidebar */}
      <aside
        className={`mb-14 md:mb-0 fixed md:relative inset-y-0 left-0 w-64 bg-white border-r border-blue-100 flex flex-col shadow-lg transform transition-transform duration-300 z-30  rounded-tr-3xl md:rounded-tr-none md:rounded-br-none overflow-hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 text-2xl font-extrabold border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          PortaBuild <RiBuilding2Line className="inline" />
          <span className="text-xs font-normal block opacity-80 mt-1">
            {user?.name} Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (location.pathname.startsWith(item.path) && item.path !== "/");
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm ${isActive
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Footer */}
        
        
        <div className="p-4 text-xs text-gray-500 border-t border-blue-100">
          <button
            onClick={logout}
            className="w-full cursor-pointer flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition duration-150 shadow-md"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
          <p className="mt-2">Admin v2.2.0</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-20 px-4 md:px-8 py-4 flex justify-between items-center border-b border-blue-100">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-2xl font-bold text-gray-700">{getPageTitle()}</h1>
          </div>

          {/* avator */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f3f7fb]">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t rounded-t-3xl border-blue-100 md:hidden flex justify-around items-center py-2 px-2 z-30">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs font-medium transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`}
            >
            <div className={`${isActive?"":"hidden"} w-[24px] h-[20px] absolute bg-transparent border-t-2 border-t-blue-600 rounded-t-full transition-appearence duration-300`}></div>
              <Icon className={`w-5 h-5 mb-1 mt-3 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
              {item.name}
            </Link>
          );
        })}

      </nav>
    </div>
  );
};

export default AdminLayout;