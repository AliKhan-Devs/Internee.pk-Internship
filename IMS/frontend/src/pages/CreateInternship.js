"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { internshipService } from "../services/internshipService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  
  CalendarDays,
  Tag,
  FileText, // Corresponds to DocumentTextIcon
  Image,
  Plus,
} from "lucide-react";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

const CreateInternship = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await internshipService.createInternship(data);
      toast.success("Internship created successfully!");
      navigate("/internships");
    } catch (error) {
      toast.error("Failed to create internship");
    } finally {
      setLoading(false);
    }
  };

  const domains = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Digital Marketing",
    "Business Analysis",
  ];

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center mb-8">
        <Link
          to="/internships"
          className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg transition"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-zinc-50">
            Create New Internship
          </h1>
          <p className="text-zinc-400 text-sm">
            Add a new internship opportunity to the platform
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-zinc-800 border border-zinc-700 shadow-xl rounded-xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Internship Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              <BuildingOffice2Icon className="h-5 w-5 inline mr-2 text-green-400" />
              Internship Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full rounded-lg border ${
                errors.title ? "border-rose-500" : "border-zinc-700"
              } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              placeholder="e.g., Frontend Developer Intern"
            />
            {errors.title && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              <FileText className="h-5 w-5 inline mr-2 text-green-400" />
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className={`w-full rounded-lg border ${
                errors.description ? "border-rose-500" : "border-zinc-700"
              } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              placeholder="Describe the internship role..."
            />
            {errors.description && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Domain + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <Tag className="h-5 w-5 inline mr-2 text-green-400" />
                Domain
              </label>
              <select
                {...register("domain", { required: "Domain is required" })}
                className={`w-full rounded-lg border ${
                  errors.domain ? "border-rose-500" : "border-zinc-700"
                } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              >
                <option value="">Select a domain</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              {errors.domain && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.domain.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <Image className="h-5 w-5 inline mr-2 text-green-400" />
                Image URL (Optional)
              </label>
              <input
                type="url"
                {...register("imageUrl")}
                className="w-full rounded-lg border border-zinc-700 px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <CalendarDays className="h-5 w-5 inline mr-2 text-green-400" />
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className={`w-full rounded-lg border ${
                  errors.startDate ? "border-rose-500" : "border-zinc-700"
                } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <CalendarDays className="h-5 w-5 inline mr-2 text-green-400" />
                End Date
              </label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className={`w-full rounded-lg border ${
                  errors.endDate ? "border-rose-500" : "border-zinc-700"
                } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <CalendarDays className="h-5 w-5 inline mr-2 text-green-400" />
                Apply Due Date
              </label>
              <input
                type="date"
                {...register("applyDueDate", {
                  required: "Apply due date is required",
                })}
                className={`w-full rounded-lg border ${
                  errors.applyDueDate ? "border-rose-500" : "border-zinc-700"
                } px-4 py-2 bg-zinc-900 text-zinc-50 focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link
              to="/internships"
              className="px-6 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition flex items-center gap-2 ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <span>Creating...</span>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Create Internship
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInternship;