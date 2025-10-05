"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function HomeFooter() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-indigo-600">PortaBuild</div>

        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-600 transition-all">
            Features
          </a>
          <a href="#" className="hover:text-indigo-600 transition-all">
            Users
          </a>
          <a href="#" className="hover:text-indigo-600 transition-all">
            Contact
          </a>
        </div>

        <div className="flex gap-4 text-xl text-gray-600">
          <a href="#"><FiGithub /></a>
          <a href="#"><FiLinkedin /></a>
          <a href="#"><FiMail /></a>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} PortaBuild. All rights reserved.
      </p>
    </footer>
  );
}
