import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BriefcaseIcon, AcademicCapIcon, ChatBubbleBottomCenterTextIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="bg-zinc-950 text-zinc-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pb-24 lg:pt-32 lg:pb-32 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 opacity-90"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            The Ultimate <br className="hidden md:inline"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600">Internship Management</span> Platform
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Streamline your internship programs from end-to-end. Manage applicants, assign tasks, and provide feedback, all in one seamless platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 animate-bounce-custom"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-3 text-white rounded-full font-semibold border border-zinc-700 hover:bg-zinc-800 transition"
            >
              Already a User? Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Features Designed for Success</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our platform offers a suite of tools to empower both organizations and interns.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-green-600 transition-colors duration-300">
              <div className="w-12 h-12 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Internship Listings</h3>
              <p className="text-zinc-400">
                Create and manage detailed internship opportunities, attracting the best talent.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-green-600 transition-colors duration-300">
              <div className="w-12 h-12 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <AcademicCapIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Application Tracking</h3>
              <p className="text-zinc-400">
                Easily track and review all applications from a centralized dashboard.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-green-600 transition-colors duration-300">
              <div className="w-12 h-12 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <RocketLaunchIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
              <p className="text-zinc-400">
                Assign and monitor tasks for each intern, ensuring progress and accountability.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-green-600 transition-colors duration-300">
              <div className="w-12 h-12 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Feedback System</h3>
              <p className="text-zinc-400">
                Provide valuable feedback and manage communication with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Call to Action Section */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl italic font-medium text-white leading-relaxed">
            "InternshipMS transformed our hiring process. We were able to find and manage incredible talent with unprecedented ease."
          </blockquote>
          <cite className="mt-4 block font-medium text-zinc-400">
            — Jane Doe, HR Manager at TechCorp
          </cite>
          <div className="mt-12">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg rounded-full font-semibold shadow-xl hover:bg-green-700 transition"
            >
              Join Thousands of Satisfied Users
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: App Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IMS</span>
              </div>
              <span className="text-2xl font-bold text-white">InternshipMS</span>
            </div>
            <p className="text-sm">
              Empowering the next generation of professionals.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-green-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com/alikhan-devs" className="hover:text-green-500 transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/alikhan-devs" className="hover:text-green-500 transition-colors">GitHub</a></li>
              <li><a href="https://github.com/alikhan-devs" className="hover:text-green-500 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Internship Management System. All rights reserved.</p>
          <p>
            <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;