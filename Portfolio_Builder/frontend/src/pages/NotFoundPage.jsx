"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="w-20 h-20 text-blue-500 mb-6 animate-pulse" />

        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        <div className="flex gap-4">
          <Link to="/">
            <Button size="lg" className="flex items-center gap-2">
              <Home className="w-5 h-5" /> Go Home
            </Button>
          </Link>

          <Link to="/users">
            <Button size="lg" variant="outline">
              Explore Portfolios
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-sm text-gray-500 dark:text-gray-400"
      >
        © {new Date().getFullYear()} PortaBuild — Crafted by Ali Khan
      </motion.div>
    </div>
  );
}
