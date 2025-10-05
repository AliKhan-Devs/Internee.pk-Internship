
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { RiBuilding2Line } from "react-icons/ri";
import { MdOutlineHome, MdContactPhone } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaLayerGroup } from "react-icons/fa";

export default function HomeLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "#overview", icon: FaLayerGroup },
    { name: "Features", href: "/features", icon: HiOutlineSparkles },
    { name: "Users", href: "/users", icon: IoPeopleSharp },
    { name: "Contact", href: "#contact", icon: MdContactPhone },
  ];

  const bottomNavItems = [
    { name: "Home", href: "#overview", icon: MdOutlineHome },
    { name: "Features", href: "#features", icon: HiOutlineSparkles },
    { name: "Users", href: "/users", icon: IoPeopleSharp },
    { name: "Contact", href: "#contact", icon: MdContactPhone },
  ];

  return (
    <div className="flex bg-[#f3f7fb] text-gray-800">
      {/* ===== Desktop Navbar ===== */}
      <header className="hidden md:flex fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto w-full px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to={'/'}>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center gap-1">
            PortaBuild <RiBuilding2Line className="inline-block text-blue-500" />
          </h1></Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 font-medium hover:text-blue-600 transition-all after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-5 py-2 rounded-lg shadow-md transition-all font-semibold"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Create Portfolio
            </Button>
          </nav>
        </div>
      </header>

      {/* ===== Sidebar for Mobile ===== */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-blue-100 flex flex-col shadow-lg transform transition-transform duration-300 z-40 rounded-tr-3xl rounded-br-3xl overflow-hidden md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 text-2xl font-extrabold border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          PortaBuild <RiBuilding2Line className="inline" />
          <span className="text-xs font-normal block opacity-80 mt-1">
            Create. Customize. Launch.
          </span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-100">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-md"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Create Portfolio
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ===== Mobile Header (Hamburger) ===== */}
      <header className="md:hidden fixed top-0 w-full z-30 bg-white shadow-sm border-b border-blue-100 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition"
          >
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          <h1 className="text-xl font-bold text-gray-700 flex items-center gap-1">
            PortaBuild <RiBuilding2Line className="text-blue-500" />
          </h1>
        </div>
      </header>

      {/* ===== Main Body ===== */}
      <main className="flex-1 overflow-y-auto md:pb-0 w-full">
        {children}
      </main>

      {/* ===== Bottom Navbar (Mobile) ===== */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-blue-100 md:hidden flex justify-around items-center py-2 px-2 z-30">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-blue-600 transition-all"
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
