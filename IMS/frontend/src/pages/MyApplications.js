import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { applicationService } from "../services/applicationService";
import toast from "react-hot-toast";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon as CheckCircleIconSolid,
  XMarkIcon as XMarkIconSolid,
  ClockIcon as ClockIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
} from "@heroicons/react/24/solid";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationService.getMyApplications();
      setApplications(response.applications || []);
    } catch (error) {
      toast.error("Failed to fetch your applications");
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return {
          icon: <CheckCircleIconSolid className="h-5 w-5 text-emerald-500" />,
          badge: "bg-emerald-600 text-white",
        };
      case "rejected":
        return {
          icon: <XMarkIconSolid className="h-5 w-5 text-rose-500" />,
          badge: "bg-rose-600 text-white",
        };
      case "applied":
        return {
          icon: <ClockIconSolid className="h-5 w-5 text-amber-500" />,
          badge: "bg-amber-500 text-white",
        };
      case "completed":
        return {
          icon: <ClipboardDocumentListIconSolid className="h-5 w-5 text-sky-500" />,
          badge: "bg-sky-600 text-white",
        };
      default:
        return {
          icon: <ClipboardDocumentListIconSolid className="h-5 w-5 text-zinc-500" />,
          badge: "bg-zinc-700 text-zinc-300",
        };
    }
  };

  const ApplicationCard = ({ application }) => {
    const statusConfig = getStatusConfig(application.status);
    const internship = application.InternshipId;

    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">
                  {internship?.title}
                </h3>
                <p className="text-green-500 text-sm font-medium">
                  {internship?.domain}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {statusConfig.icon}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusConfig.badge}`}
              >
                {application.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 mb-4 line-clamp-2">
            {internship?.description}
          </p>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                Applied: {new Date(application.appliedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {new Date(internship?.startDate).toLocaleDateString()} -{" "}
                {new Date(internship?.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Accepted Message */}
          {application.status === "accepted" && (
            <div className="p-4 bg-emerald-900 border border-emerald-700 rounded-xl mb-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircleIconSolid className="h-5 w-5" />
                <span className="font-semibold">Congratulations!</span>
              </div>
              <p className="text-emerald-500 text-sm mt-2">
                Your application has been accepted. Check your email for further instructions.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <a
              href={`/my-tasks/internship/${application?._id}`}
              className="text-green-600 hover:text-green-400 font-medium text-sm flex items-center gap-1 transition"
            >
              <span>View Tasks</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            {application.status === "applied" && (
              <span className="text-xs text-zinc-500">Under review</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const LoadingCard = () => (
    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-zinc-700 rounded-xl"></div>
          <div>
            <div className="h-6 bg-zinc-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-zinc-700 rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 bg-zinc-700 rounded-full w-20"></div>
      </div>
      <div className="h-4 bg-zinc-700 rounded mb-2"></div>
      <div className="h-4 bg-zinc-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-10">
        <Header />
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Header />

      {/* Applications */}
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <StatusLegend />
    </div>
  );
};

// Header
const Header = () => (
  <div>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">My Applications ✨</h1>
    <p className="text-zinc-400 mt-2 text-sm sm:text-base">
      Track the status of your internship applications.
    </p>
  </div>
);

// Empty State
const EmptyState = () => (
  <div className="text-center py-20 rounded-2xl bg-zinc-800 border border-zinc-700">
    <div className="w-24 h-24 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6">
      <ClipboardDocumentListIcon className="h-12 w-12 text-zinc-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">
      No applications found
    </h3>
    <p className="text-zinc-400 mb-6">
      You haven’t applied for any internships yet.
    </p>
    <a
      href="/internships"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
    >
      <BuildingOfficeIcon className="h-5 w-5" />
      <span>Browse Internships</span>
    </a>
  </div>
);

// Status Legend
const StatusLegend = () => (
  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl p-6">
    <h3 className="text-lg font-bold text-white mb-4">
      Application Status Guide
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <LegendItem
        icon={<ClockIconSolid className="h-6 w-6 text-amber-500" />}
        label="APPLIED"
        desc="Under review"
        badge="bg-amber-500 text-white"
      />
      <LegendItem
        icon={<CheckCircleIconSolid className="h-6 w-6 text-emerald-500" />}
        label="ACCEPTED"
        desc="Congratulations!"
        badge="bg-emerald-600 text-white"
      />
      <LegendItem
        icon={<XMarkIconSolid className="h-6 w-6 text-rose-500" />}
        label="REJECTED"
        desc="Not selected"
        badge="bg-rose-600 text-white"
      />
      <LegendItem
        icon={<ClipboardDocumentListIconSolid className="h-6 w-6 text-sky-500" />}
        label="COMPLETED"
        desc="Internship completed"
        badge="bg-sky-600 text-white"
      />
    </div>
  </div>
);

const LegendItem = ({ icon, label, desc, badge }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-full bg-zinc-700">
      {icon}
    </div>
    <div>
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${badge}`}
      >
        {label}
      </span>
      <p className="text-sm text-zinc-400 mt-1">{desc}</p>
    </div>
  </div>
);

export default MyApplications;