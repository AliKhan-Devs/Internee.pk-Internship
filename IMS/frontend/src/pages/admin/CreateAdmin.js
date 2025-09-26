"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  UserPlusIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const CreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Mock function to simulate the API call. Replace with your actual authService.createAdmin
  const createAdmin = async (data) => {
    console.log("Simulating API call to create admin with data:", data);
    return new Promise((resolve) => setTimeout(() => {
      toast.success("Admin created successfully!");
      resolve({ success: true });
    }, 1500));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await createAdmin(data);
      if (result.success) {
        setSuccess(true);
        reset();
      }
    } catch (error) {
      toast.error('Error creating admin. Please check the form data.');
      console.error('Error creating admin:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-900 text-zinc-200">
        <div className="bg-zinc-800 rounded-2xl p-8 max-w-lg w-full text-center border border-zinc-700 shadow-xl">
          <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Created Successfully!</h2>
          <p className="text-zinc-400 mb-6">
            The new admin account has been created.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-base rounded-lg font-medium hover:bg-green-700 transition mx-auto"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Create Another Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-900 text-zinc-200">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Create New Admin
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Create a new administrator account for the system.
          </p>
        </header>
        
        <div className="bg-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-700 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                <UserIcon className="h-5 w-5 inline mr-2 text-green-500" />
                Admin Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                <EnvelopeIcon className="h-5 w-5 inline mr-2 text-green-500" />
                Email Address
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                <PhoneIcon className="h-5 w-5 inline mr-2 text-green-500" />
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                <LockClosedIcon className="h-5 w-5 inline mr-2 text-green-500" />
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="p-4 bg-zinc-700 border border-zinc-600 rounded-xl">
              <div className="flex items-start space-x-3">
                <UserPlusIcon className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Important Note</h4>
                  <p className="text-sm text-zinc-400">
                    Make sure to share the login credentials securely with the new admin. 
                    They will be able to manage all system features.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-base rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Admin...</span>
                </>
              ) : (
                <>
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Create Admin Account</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;