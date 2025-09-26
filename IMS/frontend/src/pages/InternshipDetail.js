import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { internshipService } from "../services/internshipService";
import { applicationService } from "../services/applicationService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XMarkIcon as XMarkIconOutline,
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon as XMarkIconSolid,
  TagIcon,
  DocumentTextIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchInternshipDetails();
    checkApplicationStatus();
  }, [id, isAdmin]);

  const fetchInternshipDetails = async () => {
    try {
      setLoading(true);
      const response = await internshipService.getInternshipById(id);
      const fetchedInternship = response.internship;
      setInternship(fetchedInternship);
      // Reset the form with fetched data for editing
      reset({
        ...fetchedInternship,
        startDate: fetchedInternship.startDate.split("T")[0],
        endDate: fetchedInternship.endDate.split("T")[0],
        applyDueDate: fetchedInternship.applyDueDate.split("T")[0],
      });
    } catch (error) {
      toast.error("Failed to fetch internship details");
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    if (!isAdmin) {
      try {
        const response = await applicationService.getMyApplications();
        const appliedToThis = response.data?.find(
          (app) => app.InternshipId._id === id
        );
        setHasApplied(!!appliedToThis);
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      const response = await applicationService.applyForInternship(id);

      if (response.overdue) {
        toast.error(response.message || "The application deadline has passed.");
        return;
      }
      if (response.alreadyApplied) {
        toast.error(response.message || "You have already applied.");
        setAlreadyApplied(true);
        return;
      }
      toast.success(response.message || "Application submitted successfully!");
      setHasApplied(true);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to apply for internship.";
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await internshipService.deleteInternship(id);
        toast.success("Internship deleted successfully");
        navigate("/internships");
      } catch (error) {
        toast.error("Failed to delete internship");
      }
    }
  };

  const onSave = async (data) => {
    try {
      const updatedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        applyDueDate: new Date(data.applyDueDate).toISOString(),
      };
      await internshipService.updateInternship(id, updatedData);
      setInternship(updatedData);
      setIsEditing(false);
      toast.success("Internship updated successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update internship.";
      toast.error(message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset(internship); // Reset form to original values
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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-200 p-8 md:p-12 animate-pulse space-y-6">
        <div className="h-8 bg-zinc-800 rounded-lg w-32"></div>
        <div className="h-64 bg-zinc-800 rounded-xl"></div>
        <div className="h-6 bg-zinc-800 rounded-lg w-48"></div>
        <div className="h-4 bg-zinc-800 rounded-lg w-full"></div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-200 p-8">
        <div className="text-center py-16">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Internship not found
          </h2>
          <p className="text-zinc-400 mb-6">
            The internship you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/internships"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-colors duration-300"
          >
            Back to Internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 p-4 md:p-8 lg:p-12">
      <Link
        to="/internships"
        className="inline-flex items-center space-x-2 text-zinc-400 hover:text-green-400 transition-colors duration-300"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Internships</span>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Internship Info Card */}
          <div className="bg-zinc-800 shadow-xl rounded-2xl p-6 border border-zinc-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      <BuildingOfficeIcon className="h-5 w-5 inline mr-2 text-green-400" />
                      Internship Title
                    </label>
                    <input
                      type="text"
                      {...register("title", {
                        required: "Title is required",
                      })}
                      className={`w-full rounded-xl bg-zinc-700 text-white border ${
                        errors.title ? "border-red-500" : "border-zinc-600"
                      } px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                      placeholder="e.g., Frontend Developer Intern"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <h1 className="text-4xl font-extrabold text-white mb-2">
                    {internship.title}
                  </h1>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    internship.status === "open"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {internship.status?.toUpperCase()}
                </span>
              </div>
            </div>

            {internship.imageUrl && !isEditing && (
              <div className="aspect-video rounded-xl overflow-hidden mb-6 border-2 border-zinc-700">
                <img
                  src={internship.imageUrl}
                  alt={internship.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {isEditing && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  <PhotoIcon className="h-5 w-5 inline mr-2 text-green-400" />
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  {...register("imageUrl")}
                  className="w-full rounded-xl bg-zinc-700 text-white border border-zinc-600 px-4 py-2 focus:ring-2 focus:ring-green-500 transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                About this Internship
              </h3>
              {isEditing ? (
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    <DocumentTextIcon className="h-5 w-5 inline mr-2 text-green-400" />
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={6}
                    className={`w-full rounded-xl bg-zinc-700 text-white border ${
                      errors.description ? "border-red-500" : "border-zinc-600"
                    } px-4 py-2 focus:ring-2 focus:ring-green-500 transition`}
                    placeholder="Describe the internship role..."
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {internship.description}
                </p>
              )}
            </div>
          </div>

          {/* Internship Details Card */}
          <div className="bg-zinc-800 shadow-xl rounded-2xl border border-zinc-700">
            <div className="border-b border-zinc-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">
                Internship Details
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem
                icon={<CalendarIcon className="h-6 w-6 text-green-400" />}
                label="Start Date"
                value={
                  isEditing ? (
                    <input
                      type="date"
                      {...register("startDate", {
                        required: "Start date is required",
                      })}
                      className="bg-zinc-700 text-white px-2 py-1 rounded-md border border-zinc-600 focus:outline-none focus:border-green-500 transition"
                    />
                  ) : (
                    new Date(internship.startDate).toLocaleDateString()
                  )
                }
              />
              <DetailItem
                icon={<CalendarIcon className="h-6 w-6 text-green-400" />}
                label="End Date"
                value={
                  isEditing ? (
                    <input
                      type="date"
                      {...register("endDate", {
                        required: "End date is required",
                      })}
                      className="bg-zinc-700 text-white px-2 py-1 rounded-md border border-zinc-600 focus:outline-none focus:border-green-500 transition"
                    />
                  ) : (
                    new Date(internship.endDate).toLocaleDateString()
                  )
                }
              />
              <DetailItem
                icon={<UserIcon className="h-6 w-6 text-green-400" />}
                label="Created By"
                value={internship.createdBy?.name || "Admin"}
              />
              <DetailItem
                icon={<BuildingOfficeIcon className="h-6 w-6 text-green-400" />}
                label="Created On"
                value={new Date(internship.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Admin/Apply Actions Card */}
          <div className="bg-zinc-800 shadow-xl rounded-2xl p-6 border border-zinc-700">
            {isAdmin ? (
              <AdminActions
                onDelete={handleDelete}
                onEdit={() => setIsEditing(true)}
                onSave={handleSubmit(onSave)}
                onCancel={handleCancelEdit}
                isEditing={isEditing}
              />
            ) : (
              <ApplyActions
                internship={internship}
                hasApplied={hasApplied}
                applying={applying}
                onApply={handleApply}
                alreadyApplied={alreadyApplied}
              />
            )}
          </div>

          {/* Quick Info Card */}
          <div className="bg-zinc-800 shadow-xl rounded-2xl border border-zinc-700">
            <div className="border-b border-zinc-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">
                Quick Info
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <InfoRow
                label="Domain"
                value={
                  isEditing ? (
                    <select
                      {...register("domain", { required: "Domain is required" })}
                      className="bg-zinc-700 text-white border-b border-zinc-600 focus:outline-none focus:border-green-500 transition"
                    >
                      {domains.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  ) : (
                    internship.domain
                  )
                }
              />
              <InfoRow
                label="Status"
                value={
                  isEditing ? (
                    <select
                      {...register("status", { required: "Status is required" })}
                      className="bg-zinc-700 text-white border-b border-zinc-600 focus:outline-none focus:border-green-500 transition"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  ) : (
                    internship.status
                  )
                }
                badge={
                  internship.status === "open"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }
              />
              <InfoRow
                label="Duration"
                value={`${
                  Math.ceil(
                    (new Date(internship.endDate) -
                      new Date(internship.startDate)) /
                      (1000 * 60 * 60 * 24)
                  ) || 0
                } days`}
              />
              {isEditing && (
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Apply Due Date</span>
                  <input
                    type="date"
                    {...register("applyDueDate", {
                      required: "Apply due date is required",
                    })}
                    className="bg-zinc-700 text-white px-2 py-1 rounded-md border border-zinc-600 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    {icon}
    <div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  </div>
);

const InfoRow = ({ label, value, badge }) => (
  <div className="flex justify-between items-center text-zinc-400">
    <span>{label}</span>
    {badge ? (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge}`}>
        {/* {value.toUpperCase()} */}
        {value}
      </span>
    ) : (
      <span className="font-semibold text-white">{value}</span>
    )}
  </div>
);

const AdminActions = ({ onDelete, onEdit, onSave, onCancel, isEditing }) => {
  if (isEditing) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Editing Mode</h3>
        <button
          onClick={onSave}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <CheckIcon className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
        <button
          onClick={onCancel}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-zinc-600 text-zinc-400 rounded-lg hover:bg-zinc-700 transition"
        >
          <XMarkIconSolid className="h-4 w-4" />
          <span>Cancel</span>
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Admin Actions</h3>
      <button
        onClick={onEdit}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-green-600 text-green-400 rounded-lg hover:bg-green-900/20 transition"
      >
        <PencilIcon className="h-4 w-4" />
        <span>Edit Internship</span>
      </button>
      <button
        onClick={onDelete}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <TrashIcon className="h-4 w-4" />
        <span>Delete Internship</span>
      </button>
    </div>
  );
};

const ApplyActions = ({
  internship,
  hasApplied,
  applying,
  onApply,
  alreadyApplied,
}) => {
  if (alreadyApplied) {
    return (
      <div className="p-4 bg-yellow-900 border border-yellow-700 rounded-xl">
        <div className="flex items-center space-x-2 text-yellow-400 mb-2">
          <CheckCircleIcon className="h-5 w-5" />
          <span className="font-semibold">Already Applied</span>
        </div>
        <p className="text-sm text-yellow-300">
          You have already applied for an internship which is not completed yet or you are trying to apply for the same internship again.
        </p>
      </div>
    );
  }
  if (hasApplied) {
    return (
      <div className="p-4 bg-green-900 border border-green-700 rounded-xl">
        <div className="flex items-center space-x-2 text-green-400 mb-2">
          <CheckCircleIcon className="h-5 w-5" />
          <span className="font-semibold">Application Submitted</span>
        </div>
        <p className="text-sm text-green-300">
          Your application has been submitted successfully.
        </p>
      </div>
    );
  }

  if (internship.status !== "open") {
    return (
      <div className="p-4 bg-zinc-700 border border-zinc-600 rounded-xl">
        <div className="flex items-center space-x-2 text-zinc-400 mb-2">
          <XMarkIconOutline className="h-5 w-5" />
          <span className="font-semibold">Applications Closed</span>
        </div>
        <p className="text-sm text-zinc-500">
          This internship is no longer accepting applications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-zinc-700 border border-zinc-600 rounded-xl">
        <div className="flex items-center space-x-2 text-green-400 mb-2">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <span className="font-semibold">Ready to Apply?</span>
        </div>
        <p className="text-sm text-zinc-400">
          Make sure you meet the requirements before submitting your application.
        </p>
      </div>

      <button
        onClick={onApply}
        disabled={applying}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:bg-green-800 disabled:cursor-not-allowed"
      >
        {applying ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
            <span>Applying...</span>
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            <span>Apply for Internship</span>
          </>
        )}
      </button>
    </div>
  );
};

export default InternshipDetail;