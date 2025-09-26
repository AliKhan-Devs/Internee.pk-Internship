import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { internshipService } from "../../services/internshipService";
import toast from "react-hot-toast";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  CalendarIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Import solid icons for a richer visual
import {
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  TagIcon as TagIconSolid,
} from "@heroicons/react/24/solid";

const Internships = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await internshipService.getAllInternships();
      setInternships(response.internships || []);
    } catch (error) {
      toast.error("Failed to fetch internships");
      console.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = !domainFilter || internship.domain === domainFilter;
    const matchesStatus = !statusFilter || internship.status === statusFilter;
    return matchesSearch && matchesDomain && matchesStatus;
  });

  const domains = [...new Set(internships.map((i) => i.domain))];

  // 🔹 Internship Card (Updated for dark theme)
  const InternshipCard = ({ internship }) => (
    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
      {/* Image */}
      <div className="aspect-video bg-zinc-700 overflow-hidden flex items-center justify-center">
        {internship.imageUrl ? (
          <img
            src={internship.imageUrl}
            alt={internship.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <BuildingOfficeIconSolid className="h-16 w-16 text-zinc-600" />
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-white text-xl group-hover:text-green-500 transition-colors truncate">
            {internship.title}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wider ${
              internship.status === "open"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {internship.status}
          </span>
        </div>

        <p className="text-zinc-400 mb-4 line-clamp-3 text-sm">
          {internship.description.length > 150
            ? `${internship.description.substring(0, 150)}...`
            : internship.description}
        </p>

        <div className="space-y-2 mb-6 text-sm">
          <div className="flex items-center space-x-2 text-zinc-500">
            <TagIconSolid className="h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">{internship.domain}</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-500">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(internship.startDate).toLocaleDateString()} -{" "}
              {new Date(internship.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Link
          to={`/internships/${internship._id}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-700 text-zinc-200 font-medium hover:bg-green-600 hover:text-white transition-colors text-sm"
        >
          <EyeIcon className="h-4 w-4" />
          View Details
        </Link>
      </div>
    </div>
  );

  // 🔹 Skeleton Loading Card (Updated for dark theme)
  const LoadingCard = () => (
    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-700"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
        <div className="h-12 bg-zinc-700 rounded w-full"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Available Internships
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Discover amazing internship opportunities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Available Internships ✨
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Find the perfect opportunity for you.
          </p>
        </div>
        {isAdmin && (
          <Link
            to="/internships/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm"
          >
            <PlusIcon className="h-5 w-5" />
            Create Internship
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 placeholder-zinc-500 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
            />
          </div>

          {/* Domain */}
          <div className="relative">
            <div className="absolute inset-y-0 right-4 flex items-center text-zinc-500 pointer-events-none">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none text-sm bg-green-600 "
            >
              <option className="bg-green-600 " value="">All Domains</option>
              {domains.map((domain) => (
                <option className="bg-green-600" key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="relative">
            <div className="absolute inset-y-0 right-4 flex items-center text-zinc-500 pointer-events-none">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none text-sm bg-green-600"
            >
              <option className="bg-green-600" value="">All Status</option>
              <option  className="bg-green-600" value="open">Open</option>
              <option  className="bg-green-600" value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(searchTerm || domainFilter || statusFilter) && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-700">
            {searchTerm && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-700 text-zinc-300 rounded-full">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="text-zinc-400 hover:text-white transition">
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            {domainFilter && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-700 text-zinc-300 rounded-full">
                Domain: {domainFilter}
                <button onClick={() => setDomainFilter("")} className="text-zinc-400 hover:text-white transition">
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-700 text-zinc-300 rounded-full">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("")} className="text-zinc-400 hover:text-white transition">
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setDomainFilter("");
                setStatusFilter("");
              }}
              className="text-sm text-green-500 hover:text-green-400 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <p>
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredInternships.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {internships.length}
          </span>{" "}
          internships
        </p>
      </div>

      {/* Results grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship._id} internship={internship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl bg-zinc-800 border border-zinc-700">
          <div className="w-24 h-24 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <BuildingOfficeIcon className="h-12 w-12 text-zinc-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No internships found
          </h3>
          <p className="text-zinc-400 mb-6">
            Try adjusting your search criteria or check back later
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setDomainFilter("");
              setStatusFilter("");
            }}
            className="inline-flex items-center px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-700 transition text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Internships;