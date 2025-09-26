import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { internshipService } from "../services/internshipService";
import { applicationService } from "../services/applicationService";
import { taskService } from "../services/taskService";
import { Link } from "react-router-dom";
import {Hand, Backpack, HandFist} from 'lucide-react'
import {
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  EyeIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  ClipboardDocumentCheckIcon, // Switched to outline version
} from "@heroicons/react/24/outline";



// Updated solid icons import
import {
  BriefcaseIcon,
  ChartBarSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { BiHappy } from "react-icons/bi";



const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalInternships: 0,
    myApplications: 0,
    myTasks: 0,
    recentInternships: [],
    totalApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (isAdmin) {
          const [internships, applications] = await Promise.all([
            internshipService.getAllInternships(),
            applicationService.getAllApplications(),
          ]);

          setStats({
            totalInternships: internships.internships?.length || 0,
            totalApplications: applications.applications?.length || 0,
            recentInternships: internships.internships?.slice(0, 5) || [],
          });
        } else {
          const [internships, applications, tasks] = await Promise.all([
            internshipService.getAllInternships(),
            applicationService.getMyApplications(),
            taskService.getMyTasks(),
          ]);

          setStats({
            totalInternships: internships.internships?.length || 0,
            myApplications: applications.applications?.length || 0,
            recentInternships: internships.internships?.slice(0, 5) || [],
            myTasks: tasks.tasks?.length || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAdmin]);

  /** ---------- Reusable Components ---------- */
  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div
      className={`rounded-3xl p-6 shadow-2xl text-white bg-gradient-to-br from-${color}-700 to-${color}-900 border border-${color}-600 transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-glow`}
    >
      <div className="flex items-center justify-between mb-3">
        {Icon && <Icon className={`h-12 w-12 text-green-600`} />}
        <h3 className="text-4xl font-extrabold">{value}</h3>
      </div>
      <p className="text-sm uppercase font-semibold text-white/70 tracking-wide">
        {title}
      </p>
      {description && (
        <p className="text-xs text-white/50 mt-1">{description}</p>
      )}
    </div>
  );

  const InternshipCard = ({ internship }) => (
    <div className="rounded-2xl bg-zinc-800 p-5 shadow-lg border border-zinc-700 hover:bg-zinc-700 transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-lg text-zinc-100 truncate">
          {internship.title}
        </h4>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            internship.status === "open"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {internship.status}
        </span>
      </div>
      <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
        {internship.description}
      </p>
      <div className="flex items-center gap-5 text-xs text-zinc-500 mb-5">
        <div className="flex items-center gap-2">
          <TagIcon className="h-4 w-4 text-zinc-500" />
          {internship.domain}
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-zinc-500" />
          {new Date(internship.startDate).toLocaleDateString()}
        </div>
      </div>
      <Link
        to={`/internships/${internship._id}`}
        className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-700 text-zinc-200 rounded-xl text-sm font-medium hover:bg-green-600 transition duration-300"
      >
        <EyeIcon className="h-4 w-4" />
        View Details
      </Link>
    </div>
  );

  /** ---------- Loading Skeleton ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-200 p-8 space-y-10">
        <div className="h-8 bg-zinc-800 rounded-lg w-72 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-zinc-800 h-40 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-6 bg-zinc-800 rounded-lg w-56 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-zinc-800 h-64 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-6 bg-zinc-800 rounded-lg w-48 animate-pulse"></div>
            <div className="rounded-2xl bg-zinc-800 h-64 animate-pulse"></div>
            <div className="rounded-2xl bg-zinc-800 h-48 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  /** ---------- Main Dashboard ---------- */
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 p-6 sm:p-8 md:p-10 space-y-12">
      {/* Header */}
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Welcome back, <span className="text-green-600">{user?.name}</span>! <BiHappy className="inline"/> 
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            {isAdmin
              ? "Here’s a quick overview of your internship management system."
              : "Let's track your progress and find your next opportunity."}
          </p>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 text-zinc-400 hover:text-green-500 transition"
        >
          <UserCircleIcon className="h-6 w-6" />
          <span className="font-semibold hidden sm:inline">View Profile</span>
        </Link>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Internships"
          value={stats.totalInternships}
          icon={BriefcaseIcon}
          color="white"
          description="Opportunities available for you"
        />
        {isAdmin ? (
          <StatCard
            title="Total Applications"
            value={stats.totalApplications || 0}
            icon={ClipboardDocumentCheckIcon}
            color="emerald"
            description="All applications in the system"
          />
        ) : (
          <StatCard
            title="My Applications"
            value={stats.myApplications}
            icon={ClipboardDocumentCheckIcon}
            color="emerald"
            description="Applications you have submitted"
          />
        )}
        <StatCard
          title="My Tasks"
          value={stats.myTasks || 0}
          icon={DocumentTextIcon}
          color="amber"
          description="Pending assignments"
        />
        <StatCard
          title="Progress"
          value="85%"
          icon={ChartBarSquareIcon}
          color="purple"
          description="Your overall completion rate"
        />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Internships */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Recent Internships
            </h2>
            <Link
              to="/internships"
              className="text-green-500 hover:text-green-400 transition flex items-center gap-2 text-sm font-medium"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {stats.recentInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.recentInternships.map((internship) => (
                <InternshipCard key={internship._id} internship={internship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-zinc-800 border border-zinc-700">
              <BuildingOfficeIcon className="h-14 w-14 text-zinc-600 mx-auto mb-4" />
              <p className="font-semibold text-zinc-300 text-lg">
                No internships available
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Check back later for new opportunities.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <aside className="space-y-6">
          <div className="rounded-2xl p-6 bg-zinc-800 shadow-lg border border-zinc-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link
                to="/internships"
                className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                <BriefcaseIcon className="h-5 w-5" />
                Browse Internships
              </Link>
              {isAdmin && (
                <Link
                  to="/internships/create"
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-zinc-600 text-zinc-200 hover:bg-zinc-700 transition"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create Internship
                </Link>
              )}
              <Link
                to={isAdmin ? "/applications" : "/my-applications"}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-zinc-600 text-zinc-200 hover:bg-zinc-700 transition"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5" />
                {isAdmin ? "View Applications" : "My Applications"}
              </Link>
            </div>
          </div>

          {/* Profile */}
          <div className="rounded-2xl p-6 bg-zinc-800 shadow-lg border border-zinc-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Your Profile
            </h3>
            <div className="flex items-center gap-4 mb-5">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-green-500`}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white text-lg">{user?.name}</p>
                <p className="text-sm text-green-600 capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Member since</span>
                <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Status</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white">
                  Active
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;