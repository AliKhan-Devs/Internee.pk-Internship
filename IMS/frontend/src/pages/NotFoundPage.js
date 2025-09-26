"use client";
import React from 'react';
import { ExclamationTriangleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-200 p-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-xl flex flex-col items-center">
          <div className="w-24 h-24 text-red-500 mb-6">
            <ExclamationTriangleIcon />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-zinc-300 mb-2">
            Page Not Found
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-6">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Go to Homepage</span>
            </a>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-700 text-zinc-300 rounded-lg font-medium hover:bg-zinc-600 transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;