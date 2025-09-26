"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  UserCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, isAdmin } = useAuth();

  // Show a loading/placeholder state if user data is not yet available
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-200 p-8">
        <div className="h-10 bg-zinc-800 rounded-lg w-72 animate-pulse mb-6"></div>
        <div className="bg-zinc-800 rounded-2xl p-6 md:p-8 h-96 animate-pulse border border-zinc-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 p-6 md:p-8 lg:p-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          My Profile
        </h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          View your account information and details.
        </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-700 shadow-xl">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 pb-8 border-b border-zinc-700">
            {/* Avatar & Role */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex-shrink-0">
                {user.profileImageUrl ? (
                  <img
                    className="h-32 w-32 rounded-full border-4 border-zinc-700 object-cover"
                    src={user.profileImageUrl}
                    alt={`${user.name} profile`}
                  />
                ) : (
                  <UserCircleIcon className="h-32 w-32 text-zinc-600" />
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {isAdmin ? (
                  <ShieldCheckIcon className="h-5 w-5 text-purple-400" />
                ) : (
                  <AcademicCapIcon className="h-5 w-5 text-green-400" />
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  isAdmin 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-green-600 text-white'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-zinc-400">
                  <EnvelopeIcon className="h-5 w-5" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-zinc-400">
                    <PhoneIcon className="h-5 w-5" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-500">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Last Update: {new Date(user.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400">
                  <UserIcon className="h-5 w-5 inline mr-2 text-green-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none cursor-not-allowed"
                />
              </div>
              
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400">
                  <EnvelopeIcon className="h-5 w-5 inline mr-2 text-green-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none cursor-not-allowed"
                />
              </div>
              
              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400">
                  <PhoneIcon className="h-5 w-5 inline mr-2 text-green-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone || 'Not provided'}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none cursor-not-allowed"
                />
              </div>
              
              {/* Role */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400">
                  {isAdmin ? (
                    <ShieldCheckIcon className="h-5 w-5 inline mr-2 text-purple-500" />
                  ) : (
                    <AcademicCapIcon className="h-5 w-5 inline mr-2 text-green-500" />
                  )}
                  Role
                </label>
                <input
                  type="text"
                  value={user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="mt-8 p-4 bg-zinc-700 border border-zinc-600 rounded-xl">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Profile Updates</h4>
                <p className="text-sm text-zinc-400">
                  To update your profile information, please contact the system administrator. 
                  This ensures data integrity and proper verification of changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;