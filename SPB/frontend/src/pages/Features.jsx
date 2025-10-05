"use client";

import { Button } from "@/components/ui/button";
import HomeNav from "@/components/layouts/HomeNav";
import HomeFooter from "@/components/layouts/HomeFooter";
import {
  FiUsers,
  FiEdit,
  FiEye,
  FiBarChart2,
  FiSettings,
  FiLayers,
  FiSmartphone,
  FiCode,
  FiArrowRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import desktopPng from '../../public/desktop.JPG'
import dashboardJpg from '../../public/dashboard.JPG'
export default function Features() {
  const features = [
    {
      title: "Explore Before You Create",
      icon: <FiUsers className="text-blue-600 text-3xl" />,
      desc: "Even without logging in, visitors can explore existing portfolios, filter by most viewed, and get inspired by live user examples.",
    },
    {
      title: "Dashboard for Creators",
      icon: <FiBarChart2 className="text-green-600 text-3xl" />,
      desc: "Once logged in, users get a powerful dashboard to manage everything — from analytics and stats to portfolio design.",
    },
    {
      title: "Manage Every Section",
      icon: <FiEdit className="text-purple-600 text-3xl" />,
      desc: "Easily update your hero, about, stats, services, projects, certificates, skills, and contact sections — all from one place.",
    },
    {
      title: "Instant Theme Switching",
      icon: <FiLayers className="text-pink-600 text-3xl" />,
      desc: "Choose from professional themes and switch your portfolio’s look in a single click — no coding needed.",
    },
    {
      title: "Fully Responsive Everywhere",
      icon: <FiSmartphone className="text-orange-500 text-3xl" />,
      desc: "Manage or view your portfolio from any device — PortaBuild adapts perfectly to mobiles, tablets, and desktops.",
    },
    {
      title: "View Analytics & Growth",
      icon: <FiEye className="text-cyan-600 text-3xl" />,
      desc: "Track your portfolio performance — daily, weekly, and lifetime view statistics with visual graphs.",
    },
  ];

  return (
    <>
      <HomeNav />
      <div className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="text-center px-6 py-16 max-w-5xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Build Your Portfolio. <span className="text-blue-600">Effortlessly.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            PortaBuild lets you create, customize, and launch a professional portfolio — all from your dashboard. No coding required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            <Button onClick={() => (window.location.href = "/users")}>
              Explore Users
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/register")}
            >
              Get Started <FiArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all bg-white"
            >
              <div className="flex items-center gap-3 mb-3">{f.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Section - Manage Portfolio */}
        <section className="max-w-6xl mx-auto px-6 mt-24 space-y-6 text-center">
          <h2 className="text-3xl font-bold">
            Manage Every <span className="text-blue-600">Section</span> Seamlessly
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From hero banners to education, every section of your portfolio is customizable. Upload images, edit descriptions, and pick icons using our intuitive dropdowns — your control panel for everything.
          </p>
          <img
            src={dashboardJpg}
            alt="Dashboard preview"
            className="rounded-xl shadow-lg mx-auto border border-gray-200 mt-6"
          />
        </section>

        {/* Section - Live Portfolios */}
        <section className="max-w-6xl mx-auto px-6 mt-24 space-y-6 text-center">
          <h2 className="text-3xl font-bold">
            Live <span className="text-blue-600">Portfolios</span> Instantly
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Each user gets a unique URL like <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">portabuild.com/users/username</span> — instantly live, responsive, and beautiful.
          </p>
          <img
            src={desktopPng}
            alt="Portfolio preview"
            className="rounded-xl shadow-lg mx-auto border border-gray-200 mt-6"
          />
        </section>

        {/* Call to Action */}
        <section className="mt-24 text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Start Building Your Portfolio Today 🚀
          </h2>
          <p className="text-gray-600 mb-6">
            Join hundreds of creators already showcasing their work with PortaBuild.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => (window.location.href = "/register")}>
              Create My Account
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/users")}
            >
              Explore Portfolios
            </Button>
          </div>
        </section>
      </div>
      <HomeFooter />
    </>
  );
}
