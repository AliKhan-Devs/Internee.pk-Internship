// src/components/layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
          Portfolio Admin
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link to="/dashboard" className="block hover:text-indigo-400">
            Dashboard
          </Link>
          <Link to="/dashboard/profile" className="block hover:text-indigo-400">
            Profile
          </Link>
          <Link to="/dashboard/overview" className="block hover:text-indigo-400">
            Overview
          </Link>
          <Link to="/dashboard/theme" className="block hover:text-indigo-400">
            Theme
          </Link>
          <Link to="/dashboard/contact" className="block hover:text-indigo-400">
            Contact
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
