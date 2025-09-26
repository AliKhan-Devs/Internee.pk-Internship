import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="bg-zinc-950 text-zinc-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-24 pb-16 lg:pt-32 lg:pb-32">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="text-center lg:text-left lg:max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Manage Internships <br className="hidden md:inline" />
              with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                Efficiency & Ease
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0">
              InternshipMS helps organizations hire, manage, and train interns
              while providing students with a platform to showcase their
              potential.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-green-600/30 transition-transform transform hover:scale-105"
              >
                <span>Get Started Free</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold border border-zinc-700 text-white hover:bg-zinc-800 transition"
              >
                Already a User? Log In
              </Link>
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center rounded-md">
            <img
              src="https://info.ehl.edu/hubfs/Internship.jpg"
              alt="Internship Illustration"
              className="w-full max-w-lg drop-shadow-2xl animate-fadeIn rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Choose <span className="text-green-500">InternshipMS?</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              We simplify internship management by providing the right tools for
              organizations and students to succeed together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BriefcaseIcon className="h-6 w-6" />,
                title: "Internship Listings",
                desc: "Create and manage detailed internship opportunities with ease.",
              },
              {
                icon: <AcademicCapIcon className="h-6 w-6" />,
                title: "Application Tracking",
                desc: "Easily track and review all applications from one dashboard.",
              },
              {
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                title: "Task Management",
                desc: "Assign tasks, track progress, and ensure accountability.",
              },
              {
                icon: (
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                ),
                title: "Feedback System",
                desc: "Provide valuable feedback and manage communication smoothly.",
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-green-600 hover:shadow-lg hover:shadow-green-600/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial/CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed">
            “InternshipMS transformed our hiring process. We found and managed
            talent with unprecedented ease.”
          </blockquote>
          <cite className="mt-4 block text-sm opacity-80">
            — Jane Doe, HR Manager at TechCorp
          </cite>
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 text-lg rounded-full font-semibold shadow-lg hover:bg-zinc-100 transition"
            >
              Join Thousands of Satisfied Users
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo + Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IMS</span>
              </div>
              <span className="text-2xl font-bold text-white">
                InternshipMS
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Empowering the next generation of professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-green-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-green-500 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-green-500 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4 text-zinc-400">
              <a
                href="https://linkedin.com/alikhan-devs"
                className="hover:text-green-500"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/alikhan-devs"
                className="hover:text-green-500"
              >
                GitHub
              </a>
              <a
                href="https://facebook.com/alikhan-devs"
                className="hover:text-green-500"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} Internship Management System. All
            rights reserved.
          </p>
          <p>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
