"use client";
import React, { useEffect, useState } from "react";
import { ClipboardList, Check, X, Clock, User, Briefcase, MinusCircle, CheckCircle, Clock3 } from "lucide-react";
import toast from "react-hot-toast";
import { applicationService } from "../services/applicationService";
import { Link } from "react-router-dom";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get status styles
  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-800 text-emerald-200";
      case "rejected":
        return "bg-rose-800 text-rose-200";
      case "withdrawn":
        return "bg-amber-800 text-amber-200";
      case "completed":
        return "bg-blue-800 text-blue-200";
      case "active":
        return "bg-teal-800 text-teal-200";
      default:
        return "bg-zinc-700 text-zinc-300";
    }
  };

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getAllApplications();
        setApplications(data.applications);
      } catch (error) {
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Handle status update
  const handleStatusChange = async (id, status) => {
    try {
      await applicationService.updateApplication(id, status);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
      toast.success(`Application marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <p className="text-zinc-400">Loading applications...</p>
      </div>
    );
  }

  if (!applications?.length) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-sm p-16">
          <div className="w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-50 mb-2">
            No Applications Found
          </h3>
          <p className="text-zinc-400">No students have applied yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-50">
            All Applications
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Manage internship applications from students
          </p>
        </div>

        {/* Table */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left">
              <thead className="bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> Applicant</span>
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Internship</span>
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Applied At</span>
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {applications.map((app) => (
                  <tr key={app._id} className="text-zinc-200 transition-colors duration-200 hover:bg-zinc-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/tasks/application/${app._id}`}>{app.userId?.name || "Unknown User"}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {app.InternshipId?.title || "Unknown Internship"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyles(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                      <button
                        onClick={() => handleStatusChange(app._id, "accepted")}
                        className="btn-action text-emerald-500 border border-emerald-500 hover:bg-emerald-500 hover:text-white"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        className="btn-action text-rose-500 border border-rose-500 hover:bg-rose-500 hover:text-white"
                      >
                        <MinusCircle className="h-4 w-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "completed")}
                        className="btn-action text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        <Check className="h-4 w-4" />
                        Completed
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "active")}
                        className="btn-action text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white"
                      >
                        <Clock3 className="h-4 w-4" />
                        Active
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;